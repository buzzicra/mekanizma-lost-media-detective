import { describe, expect, it } from "vitest";

import {
  CASE_FORM_ERROR_KEYS,
  MEDIA_TYPES,
  translateCaseFormError,
  type CaseFormErrorKey,
  validateCaseForm,
  type CaseFormField,
  type CaseFormInput,
} from "@/features/case-create/model/case-form";

function validInput(overrides: Partial<CaseFormInput> = {}): CaseFormInput {
  return {
    title: "Çocukken izlediğim çizgi film",
    mediaType: "FILM_TV",
    contentLanguage: "tr-TR",
    rememberedDetails: "a".repeat(80),
    seenOn: "Ulusal bir televizyon kanalı",
    yearUnknown: false,
    yearFrom: "2003",
    yearTo: "2005",
    previousSearches: "Arama motorlarında karakterleri tarif ettim.",
    safetyConfirmed: true,
    ...overrides,
  };
}

function expectFieldError(
  input: unknown,
  field: CaseFormField,
  errorKey: CaseFormErrorKey,
): void {
  const result = validateCaseForm(input);

  expect(result.success).toBe(false);

  if (!result.success) {
    expect(result.fieldErrors[field]).toContain(errorKey);
  }
}

describe("caseFormSchema", () => {
  it("bütün medya türlerini kabul eder", () => {
    for (const mediaType of MEDIA_TYPES) {
      expect(validateCaseForm(validInput({ mediaType })).success).toBe(true);
    }
  });

  it("metinleri trim eder, içeriği korur, yılları sayıya çevirir ve inputu değiştirmez", () => {
    const input = validInput({
      title: "  Çocukken  izlediğim çizgi film  ",
      contentLanguage: "  en-US  ",
      rememberedDetails: `  ${"a".repeat(80)}  `,
      seenOn: "  VHS kaset  ",
      yearFrom: "  +0007  ",
      yearTo: "  0009  ",
      previousSearches: "  Yok  ",
    });
    const originalInput = structuredClone(input);

    const result = validateCaseForm(input);

    expect(result).toEqual({
      success: true,
      data: {
        title: "Çocukken  izlediğim çizgi film",
        mediaType: "FILM_TV",
        contentLanguage: "en-US",
        rememberedDetails: "a".repeat(80),
        seenOn: "VHS kaset",
        yearUnknown: false,
        yearFrom: 7,
        yearTo: 9,
        previousSearches: "Yok",
        safetyConfirmed: true,
      },
    });
    expect(input).toEqual(originalInput);
  });

  it.each([
    [11, false],
    [12, true],
    [120, true],
    [121, false],
  ])("başlık için %i karakter sınırını uygular", (length, isValid) => {
    expect(
      validateCaseForm(validInput({ title: "a".repeat(length) })).success,
    ).toBe(isValid);
  });

  it.each([
    ["title", CASE_FORM_ERROR_KEYS.titleRequired],
    ["rememberedDetails", CASE_FORM_ERROR_KEYS.rememberedDetailsRequired],
    ["seenOn", CASE_FORM_ERROR_KEYS.seenOnRequired],
    ["previousSearches", CASE_FORM_ERROR_KEYS.previousSearchesRequired],
  ] as const)(
    "whitespace-only %s alanında yalnız required hatası üretir",
    (field, requiredError) => {
      const result = validateCaseForm(validInput({ [field]: "   " }));

      expect(result.success).toBe(false);

      if (!result.success) {
        expect(result.fieldErrors[field]).toEqual([requiredError]);
        expect(result.formErrors).toEqual([]);
      }
    },
  );

  it.each([
    [79, false],
    [80, true],
    [5_000, true],
    [5_001, false],
  ])(
    "hatırlanan ayrıntı için %i karakter sınırını uygular",
    (length, isValid) => {
      expect(
        validateCaseForm(validInput({ rememberedDetails: "a".repeat(length) }))
          .success,
      ).toBe(isValid);
    },
  );

  it.each([
    [1, false],
    [2, true],
    [200, true],
    [201, false],
  ])("görüldüğü yer için %i karakter sınırını uygular", (length, isValid) => {
    expect(
      validateCaseForm(validInput({ seenOn: "a".repeat(length) })).success,
    ).toBe(isValid);
  });

  it.each([
    ["   ", false],
    ["Yok", true],
    ["a".repeat(2_000), true],
    ["a".repeat(2_001), false],
  ])("önceki arama sınırını uygular", (previousSearches, isValid) => {
    expect(validateCaseForm(validInput({ previousSearches })).success).toBe(
      isValid,
    );
  });

  it.each(["tr", "en-US", "zh-Hant-TW"])(
    "geçerli %s dil etiketini allowlist olmadan kabul eder",
    (contentLanguage) => {
      expect(validateCaseForm(validInput({ contentLanguage })).success).toBe(
        true,
      );
    },
  );

  it.each(["", "tr_TR", "en--US", "not a language"])(
    "geçersiz %j dil etiketini reddeder",
    (contentLanguage) => {
      expectFieldError(
        validInput({ contentLanguage }),
        "contentLanguage",
        CASE_FORM_ERROR_KEYS.contentLanguageInvalid,
      );
    },
  );

  it("yearUnknown true iken geçersiz stale yılları yok sayar ve outputtan çıkarır", () => {
    const result = validateCaseForm(
      validInput({
        yearUnknown: true,
        yearFrom: "ondalık 20.5",
        yearTo: "bilinmiyor",
      }),
    );

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.yearUnknown).toBe(true);
      expect(result.data).not.toHaveProperty("yearFrom");
      expect(result.data).not.toHaveProperty("yearTo");
    }
  });

  it("yearUnknown false iken en az bir yıl ister", () => {
    expectFieldError(
      validInput({ yearUnknown: false, yearFrom: " ", yearTo: "" }),
      "yearUnknown",
      CASE_FORM_ERROR_KEYS.yearRequired,
    );
  });

  it.each([
    [{ yearFrom: "2001", yearTo: "" }, { yearFrom: 2001 }],
    [{ yearFrom: "", yearTo: "2001" }, { yearTo: 2001 }],
  ])("tek bir geçerli yılı kabul eder", (years, expectedYears) => {
    const result = validateCaseForm(validInput(years));

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data).toMatchObject(expectedYears);
    }
  });

  it.each([
    ["20.5", "yearFrom", CASE_FORM_ERROR_KEYS.yearFromInteger],
    ["1e3", "yearFrom", CASE_FORM_ERROR_KEYS.yearFromInteger],
    ["abc", "yearFrom", CASE_FORM_ERROR_KEYS.yearFromInteger],
    ["9007199254740992", "yearFrom", CASE_FORM_ERROR_KEYS.yearFromInteger],
    ["20.5", "yearTo", CASE_FORM_ERROR_KEYS.yearToInteger],
    ["1e3", "yearTo", CASE_FORM_ERROR_KEYS.yearToInteger],
  ] as const)("%s değerini %s alanında reddeder", (year, field, errorKey) => {
    expectFieldError(validInput({ [field]: year }), field, errorKey);
  });

  it("negatif yıllara mutlak ürün sınırı eklemez", () => {
    const result = validateCaseForm(
      validInput({ yearFrom: "-10", yearTo: "+0005" }),
    );

    expect(result).toMatchObject({
      success: true,
      data: { yearFrom: -10, yearTo: 5 },
    });
  });

  it("eşit yıl aralığını kabul eder", () => {
    expect(
      validateCaseForm(validInput({ yearFrom: "2005", yearTo: "2005" }))
        .success,
    ).toBe(true);
  });

  it("ters yıl aralığı hatasını yearTo alanına bağlar", () => {
    expectFieldError(
      validInput({ yearFrom: "2005", yearTo: "2001" }),
      "yearTo",
      CASE_FORM_ERROR_KEYS.yearToRange,
    );
  });

  it.each([false, "true", 1])(
    "literal true olmayan %j safety değerini reddeder",
    (safetyConfirmed) => {
      expectFieldError(
        { ...validInput(), safetyConfirmed },
        "safetyConfirmed",
        CASE_FORM_ERROR_KEYS.safetyConfirmedRequired,
      );
    },
  );

  it("bilinmeyen enum değerini alan hatasıyla reddeder", () => {
    expectFieldError(
      { ...validInput(), mediaType: "PODCAST" },
      "mediaType",
      CASE_FORM_ERROR_KEYS.mediaTypeInvalid,
    );
  });

  it("bilinmeyen top-level alanı sessizce silmek yerine form hatası üretir", () => {
    const result = validateCaseForm({ ...validInput(), ownerId: "unexpected" });

    expect(result).toEqual({
      success: false,
      fieldErrors: {},
      formErrors: [CASE_FORM_ERROR_KEYS.formUnknownField],
    });
  });

  it("object olmayan girdide kararlı ve teknik detaysız form hatası döndürür", () => {
    expect(validateCaseForm(null)).toEqual({
      success: false,
      fieldErrors: {},
      formErrors: [CASE_FORM_ERROR_KEYS.formInvalid],
    });
  });

  it("çoklu alan hatalarını contract sırasıyla döndürür", () => {
    const result = validateCaseForm(
      validInput({
        title: "kısa",
        mediaType: "",
        seenOn: "x",
        safetyConfirmed: false,
      }),
    );

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(Object.keys(result.fieldErrors)).toEqual([
        "title",
        "mediaType",
        "seenOn",
        "safetyConfirmed",
      ]);
    }
  });

  it("hata keylerini locale-aware kullanıcı metnine çevirir", () => {
    expect(translateCaseFormError("tr", CASE_FORM_ERROR_KEYS.yearToRange)).toBe(
      "Bitiş yılı başlangıç yılından önce olamaz.",
    );
    expect(translateCaseFormError("en", CASE_FORM_ERROR_KEYS.yearToRange)).toBe(
      "End year cannot be earlier than start year.",
    );
  });
});
