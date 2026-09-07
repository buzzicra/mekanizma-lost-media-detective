import { z } from "zod";

import {
  CASE_FORM_ERROR_KEYS,
  type CaseFormErrorKey,
} from "@/lib/i18n/case-form";

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

export type CaseFormField = keyof CaseFormInput;

export type CaseFormFieldErrors = Partial<
  Record<CaseFormField, readonly CaseFormErrorKey[]>
>;

export type CaseFormValidationResult =
  | { success: true; data: ValidCaseFormData }
  | {
      success: false;
      fieldErrors: CaseFormFieldErrors;
      formErrors: readonly CaseFormErrorKey[];
    };

const CASE_FORM_FIELDS = [
  "title",
  "mediaType",
  "contentLanguage",
  "rememberedDetails",
  "seenOn",
  "yearUnknown",
  "yearFrom",
  "yearTo",
  "previousSearches",
  "safetyConfirmed",
] as const satisfies readonly CaseFormField[];

const caseFormFieldSet = new Set<string>(CASE_FORM_FIELDS);
const caseFormErrorKeySet = new Set<string>(
  Object.values(CASE_FORM_ERROR_KEYS),
);

const fallbackErrorByField: Record<CaseFormField, CaseFormErrorKey> = {
  title: CASE_FORM_ERROR_KEYS.titleRequired,
  mediaType: CASE_FORM_ERROR_KEYS.mediaTypeInvalid,
  contentLanguage: CASE_FORM_ERROR_KEYS.contentLanguageInvalid,
  rememberedDetails: CASE_FORM_ERROR_KEYS.rememberedDetailsRequired,
  seenOn: CASE_FORM_ERROR_KEYS.seenOnRequired,
  yearUnknown: CASE_FORM_ERROR_KEYS.yearRequired,
  yearFrom: CASE_FORM_ERROR_KEYS.yearFromInteger,
  yearTo: CASE_FORM_ERROR_KEYS.yearToInteger,
  previousSearches: CASE_FORM_ERROR_KEYS.previousSearchesRequired,
  safetyConfirmed: CASE_FORM_ERROR_KEYS.safetyConfirmedRequired,
};

function trimmedBoundedString(
  requiredError: CaseFormErrorKey,
  lengthError: CaseFormErrorKey,
  minimum: number,
  maximum: number,
) {
  return z
    .string({ error: requiredError })
    .transform((value) => value.trim())
    .superRefine((value, context) => {
      if (value.length === 0) {
        context.addIssue({ code: "custom", message: requiredError });
        return;
      }

      if (value.length < minimum || value.length > maximum) {
        context.addIssue({ code: "custom", message: lengthError });
      }
    });
}

function isValidLanguageTag(value: string): boolean {
  if (value.length === 0) {
    return false;
  }

  try {
    return Intl.getCanonicalLocales(value).length === 1;
  } catch {
    return false;
  }
}

type ParsedYear =
  { kind: "empty" } | { kind: "invalid" } | { kind: "valid"; value: number };

const integerPattern = /^[+-]?\d+$/;

function parseYear(value: string): ParsedYear {
  const normalizedValue = value.trim();

  if (normalizedValue.length === 0) {
    return { kind: "empty" };
  }

  if (!integerPattern.test(normalizedValue)) {
    return { kind: "invalid" };
  }

  const parsedValue = Number(normalizedValue);

  if (!Number.isSafeInteger(parsedValue)) {
    return { kind: "invalid" };
  }

  return { kind: "valid", value: parsedValue };
}

const rawCaseFormSchema = z.strictObject({
  title: trimmedBoundedString(
    CASE_FORM_ERROR_KEYS.titleRequired,
    CASE_FORM_ERROR_KEYS.titleLength,
    12,
    120,
  ),
  mediaType: z.enum(MEDIA_TYPES, {
    error: CASE_FORM_ERROR_KEYS.mediaTypeInvalid,
  }),
  contentLanguage: z
    .string({ error: CASE_FORM_ERROR_KEYS.contentLanguageInvalid })
    .transform((value) => value.trim())
    .superRefine((value, context) => {
      if (!isValidLanguageTag(value)) {
        context.addIssue({
          code: "custom",
          message: CASE_FORM_ERROR_KEYS.contentLanguageInvalid,
        });
      }
    }),
  rememberedDetails: trimmedBoundedString(
    CASE_FORM_ERROR_KEYS.rememberedDetailsRequired,
    CASE_FORM_ERROR_KEYS.rememberedDetailsLength,
    80,
    5_000,
  ),
  seenOn: trimmedBoundedString(
    CASE_FORM_ERROR_KEYS.seenOnRequired,
    CASE_FORM_ERROR_KEYS.seenOnLength,
    2,
    200,
  ),
  yearUnknown: z.boolean({ error: CASE_FORM_ERROR_KEYS.yearRequired }),
  yearFrom: z.string({ error: CASE_FORM_ERROR_KEYS.yearFromInteger }),
  yearTo: z.string({ error: CASE_FORM_ERROR_KEYS.yearToInteger }),
  previousSearches: trimmedBoundedString(
    CASE_FORM_ERROR_KEYS.previousSearchesRequired,
    CASE_FORM_ERROR_KEYS.previousSearchesLength,
    1,
    2_000,
  ),
  safetyConfirmed: z.literal(true, {
    error: CASE_FORM_ERROR_KEYS.safetyConfirmedRequired,
  }),
});

export const caseFormSchema = rawCaseFormSchema
  .superRefine((value, context) => {
    if (value.yearUnknown) {
      return;
    }

    const yearFrom = parseYear(value.yearFrom);
    const yearTo = parseYear(value.yearTo);

    if (yearFrom.kind === "empty" && yearTo.kind === "empty") {
      context.addIssue({
        code: "custom",
        message: CASE_FORM_ERROR_KEYS.yearRequired,
        path: ["yearUnknown"],
      });
    }

    if (yearFrom.kind === "invalid") {
      context.addIssue({
        code: "custom",
        message: CASE_FORM_ERROR_KEYS.yearFromInteger,
        path: ["yearFrom"],
      });
    }

    if (yearTo.kind === "invalid") {
      context.addIssue({
        code: "custom",
        message: CASE_FORM_ERROR_KEYS.yearToInteger,
        path: ["yearTo"],
      });
    }

    if (
      yearFrom.kind === "valid" &&
      yearTo.kind === "valid" &&
      yearTo.value < yearFrom.value
    ) {
      context.addIssue({
        code: "custom",
        message: CASE_FORM_ERROR_KEYS.yearToRange,
        path: ["yearTo"],
      });
    }
  })
  .transform((value): ValidCaseFormData => {
    const normalizedData: ValidCaseFormData = {
      title: value.title,
      mediaType: value.mediaType,
      contentLanguage: value.contentLanguage,
      rememberedDetails: value.rememberedDetails,
      seenOn: value.seenOn,
      yearUnknown: value.yearUnknown,
      previousSearches: value.previousSearches,
      safetyConfirmed: value.safetyConfirmed,
    };

    if (!value.yearUnknown) {
      const yearFrom = parseYear(value.yearFrom);
      const yearTo = parseYear(value.yearTo);

      if (yearFrom.kind === "valid") {
        normalizedData.yearFrom = yearFrom.value;
      }

      if (yearTo.kind === "valid") {
        normalizedData.yearTo = yearTo.value;
      }
    }

    return normalizedData;
  });

function isCaseFormField(value: PropertyKey): value is CaseFormField {
  return typeof value === "string" && caseFormFieldSet.has(value);
}

function isCaseFormErrorKey(value: string): value is CaseFormErrorKey {
  return caseFormErrorKeySet.has(value);
}

function addUniqueError(
  errors: CaseFormErrorKey[],
  error: CaseFormErrorKey,
): void {
  if (!errors.includes(error)) {
    errors.push(error);
  }
}

export function validateCaseForm(input: unknown): CaseFormValidationResult {
  const result = caseFormSchema.safeParse(input);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const mutableFieldErrors: Partial<Record<CaseFormField, CaseFormErrorKey[]>> =
    {};
  const formErrors: CaseFormErrorKey[] = [];

  for (const issue of result.error.issues) {
    if (issue.code === "unrecognized_keys") {
      addUniqueError(formErrors, CASE_FORM_ERROR_KEYS.formUnknownField);
      continue;
    }

    const pathHead = issue.path[0];

    if (!isCaseFormField(pathHead)) {
      addUniqueError(formErrors, CASE_FORM_ERROR_KEYS.formInvalid);
      continue;
    }

    const fieldError = isCaseFormErrorKey(issue.message)
      ? issue.message
      : fallbackErrorByField[pathHead];
    const errorsForField = mutableFieldErrors[pathHead] ?? [];

    addUniqueError(errorsForField, fieldError);
    mutableFieldErrors[pathHead] = errorsForField;
  }

  const fieldErrors: CaseFormFieldErrors = {};

  for (const field of CASE_FORM_FIELDS) {
    const errorsForField = mutableFieldErrors[field];

    if (errorsForField) {
      fieldErrors[field] = errorsForField;
    }
  }

  return { success: false, fieldErrors, formErrors };
}
