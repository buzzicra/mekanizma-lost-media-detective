/**
 * CASE-CONTRACT-01 & FINAL-CASE-03 Vaka Formu Fixture Seti
 *
 * Bu dosya FINAL-CASE-03 testleri için deterministik, tekrar kullanılabilir
 * test verilerini içerir. Production ortamında kullanılmaz.
 * Flaky testleri önlemek için dinamik (tarih/random) veri içermez.
 */

export const MEDIA_TYPES = [
  "VIDEO",
  "AUDIO",
  "IMAGE",
  "GAME",
  "WEBSITE",
  "ADVERTISEMENT",
  "FILM_TV",
  "PRINT",
  "OTHER",
] as const;

export type MediaType = (typeof MEDIA_TYPES)[number];

export type CaseFormInput = {
  title: string;
  mediaType: MediaType | "";
  contentLanguage: string;
  rememberedDetails: string;
  seenOn: string;
  yearUnknown: boolean;
  yearFrom: string;
  yearTo: string;
  previousSearches: string;
  safetyConfirmed: boolean;
};

export type ValidCaseFormData = {
  title: string;
  mediaType: MediaType;
  contentLanguage: string;
  rememberedDetails: string;
  seenOn: string;
  yearUnknown: boolean;
  yearFrom?: number;
  yearTo?: number;
  previousSearches: string;
  safetyConfirmed: true;
};

export type CaseFormProps = {
  initialValues?: Partial<CaseFormInput>;
  isSubmitting?: boolean;
  submitError?: string | null;
  onSubmit: (data: ValidCaseFormData) => void | Promise<void>;
};

/**
 * 1. Tamamen geçerli ve eksiksiz form verisi
 */
export const validCaseFormFixture: CaseFormInput = {
  title: "Kayıp Çizgi Film 90lar",
  mediaType: "FILM_TV",
  contentLanguage: "tr",
  rememberedDetails:
    "Cumartesi sabahları TRT 1'de yayınlanan, mavi renkli bir ayının maceralarını anlatan animasyon serisi.",
  seenOn: "TRT 1 Televizyon Kanalı",
  yearUnknown: false,
  yearFrom: "1994",
  yearTo: "1998",
  previousSearches:
    "TRT arşivleri ve eski gazete televizyon ekleri tarandı fakat adı bulunamadı.",
  safetyConfirmed: true,
};

/**
 * Beklenen normalize submit çıktısı (validCaseFormFixture için)
 */
export const expectedValidCaseFormData: ValidCaseFormData = {
  title: "Kayıp Çizgi Film 90lar",
  mediaType: "FILM_TV",
  contentLanguage: "tr",
  rememberedDetails:
    "Cumartesi sabahları TRT 1'de yayınlanan, mavi renkli bir ayının maceralarını anlatan animasyon serisi.",
  seenOn: "TRT 1 Televizyon Kanalı",
  yearUnknown: false,
  yearFrom: 1994,
  yearTo: 1998,
  previousSearches:
    "TRT arşivleri ve eski gazete televizyon ekleri tarandı fakat adı bulunamadı.",
  safetyConfirmed: true,
};

/**
 * 2. Minimum sınır değerindeki geçerli form (Boundary Min)
 * - title: 12 karakter
 * - rememberedDetails: 80 karakter
 * - seenOn: 2 karakter
 * - previousSearches: 3 karakter ("Yok")
 * - yearFrom: tek yıl
 */
export const minBoundaryCaseFormFixture: CaseFormInput = {
  title: "123456789012",
  mediaType: "OTHER",
  contentLanguage: "en",
  rememberedDetails: "a".repeat(80),
  seenOn: "ab",
  yearUnknown: false,
  yearFrom: "2000",
  yearTo: "",
  previousSearches: "Yok",
  safetyConfirmed: true,
};

/**
 * 3. Maksimum sınır değerindeki geçerli form (Boundary Max)
 * - title: 120 karakter
 * - rememberedDetails: 5000 karakter
 * - seenOn: 200 karakter
 * - previousSearches: 2000 karakter
 * - yearFrom / yearTo: eşit yıl aralığı
 */
export const maxBoundaryCaseFormFixture: CaseFormInput = {
  title: "a".repeat(120),
  mediaType: "GAME",
  contentLanguage: "tr-TR",
  rememberedDetails: "a".repeat(5000),
  seenOn: "a".repeat(200),
  yearUnknown: false,
  yearFrom: "2026",
  yearTo: "2026",
  previousSearches: "a".repeat(2000),
  safetyConfirmed: true,
};

/**
 * 4. Yıl bilinmiyor akışı (yearUnknown: true)
 * Stale veya geçersiz yıl girdileri bulunsa dahi yok sayılmalıdır.
 */
export const yearUnknownCaseFormFixture: CaseFormInput = {
  ...validCaseFormFixture,
  title: "Eski Bilinmeyen Web Sitesi",
  mediaType: "WEBSITE",
  yearUnknown: true,
  yearFrom: "stale-2001",
  yearTo: "invalid-year",
};

/**
 * 5. Tek yıl geçerli örnekleri
 */
export const singleYearFromFixture: CaseFormInput = {
  ...validCaseFormFixture,
  yearUnknown: false,
  yearFrom: "1999",
  yearTo: "",
};

export const singleYearToFixture: CaseFormInput = {
  ...validCaseFormFixture,
  yearUnknown: false,
  yearFrom: "",
  yearTo: "2005",
};

/**
 * 6. Ters yıl aralığı örneği (yearFrom > yearTo) - Invalid
 */
export const reversedYearRangeFixture: CaseFormInput = {
  ...validCaseFormFixture,
  yearUnknown: false,
  yearFrom: "2005",
  yearTo: "2001",
};

/**
 * 7. İki yıl da boş ama yearUnknown=false - Invalid
 */
export const bothYearsEmptyFixture: CaseFormInput = {
  ...validCaseFormFixture,
  yearUnknown: false,
  yearFrom: "",
  yearTo: "",
};

/**
 * 8. Yıl alanlarında ondalık / geçersiz metin - Invalid
 */
export const nonIntegerYearFixture: CaseFormInput = {
  ...validCaseFormFixture,
  yearUnknown: false,
  yearFrom: "1999.5",
  yearTo: "2000",
};

/**
 * 9. Güvenlik onayı verilmemiş (safetyConfirmed: false) - Invalid
 */
export const safetyUnconfirmedFixture: CaseFormInput = {
  ...validCaseFormFixture,
  safetyConfirmed: false,
};

/**
 * 10. Boş form başlangıç durumu
 */
export const emptyCaseFormFixture: CaseFormInput = {
  title: "",
  mediaType: "",
  contentLanguage: "",
  rememberedDetails: "",
  seenOn: "",
  yearUnknown: false,
  yearFrom: "",
  yearTo: "",
  previousSearches: "",
  safetyConfirmed: false,
};

/**
 * 11. Her zorunlu alan için tek tek bozuk (invalid) örnekler
 */
export const invalidSingleFieldFixtures: Record<
  keyof CaseFormInput,
  {
    input: CaseFormInput;
    invalidField: keyof CaseFormInput;
    description: string;
  }
> = {
  title: {
    input: { ...validCaseFormFixture, title: "Kısa başlık" }, // 11 kr
    invalidField: "title",
    description: "Başlık 12 karakterden kısa olduğunda invalid",
  },
  mediaType: {
    input: { ...validCaseFormFixture, mediaType: "" },
    invalidField: "mediaType",
    description: "Medya türü seçilmediğinde invalid",
  },
  contentLanguage: {
    input: { ...validCaseFormFixture, contentLanguage: "not_a_language" },
    invalidField: "contentLanguage",
    description: "Geçersiz dil etiketi verildiğinde invalid",
  },
  rememberedDetails: {
    input: { ...validCaseFormFixture, rememberedDetails: "a".repeat(79) }, // 79 kr
    invalidField: "rememberedDetails",
    description: "Hatırlanan ayrıntı 80 karakterden kısa olduğunda invalid",
  },
  seenOn: {
    input: { ...validCaseFormFixture, seenOn: "a" }, // 1 kr
    invalidField: "seenOn",
    description: "Görüldüğü yer 2 karakterden kısa olduğunda invalid",
  },
  yearUnknown: {
    input: {
      ...validCaseFormFixture,
      yearUnknown: false,
      yearFrom: "",
      yearTo: "",
    },
    invalidField: "yearUnknown",
    description: "Yıl bilinmiyor seçili değilken iki yıl da boşsa invalid",
  },
  yearFrom: {
    input: {
      ...validCaseFormFixture,
      yearUnknown: false,
      yearFrom: "ondalık_veya_metin",
    },
    invalidField: "yearFrom",
    description: "Başlangıç yılı tam sayı olmadığında invalid",
  },
  yearTo: {
    input: {
      ...validCaseFormFixture,
      yearUnknown: false,
      yearFrom: "2010",
      yearTo: "2000",
    },
    invalidField: "yearTo",
    description: "Bitiş yılı başlangıç yılından küçük olduğunda invalid",
  },
  previousSearches: {
    input: { ...validCaseFormFixture, previousSearches: "   " },
    invalidField: "previousSearches",
    description: "Önceki aramalar boş/whitespace olduğunda invalid",
  },
  safetyConfirmed: {
    input: { ...validCaseFormFixture, safetyConfirmed: false },
    invalidField: "safetyConfirmed",
    description: "Güvenlik onayı verilmediğinde invalid",
  },
};

/**
 * 12. Parent error ve Submitting senaryoları için harness fixture verileri
 */
export const submittingHarnessScenario = {
  initialValues: validCaseFormFixture,
  isSubmitting: true,
  submitError: null,
};

export const parentErrorHarnessScenario = {
  initialValues: validCaseFormFixture,
  isSubmitting: false,
  submitError: "Sunucu bağlantısı kurulamadı. Lütfen tekrar deneyin.",
};
