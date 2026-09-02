import type { Locale } from "@/lib/i18n/messages";

export const CASE_FORM_ERROR_KEYS = {
  titleRequired: "caseForm.error.title.required",
  titleLength: "caseForm.error.title.length",
  mediaTypeInvalid: "caseForm.error.mediaType.invalid",
  contentLanguageInvalid: "caseForm.error.contentLanguage.invalid",
  rememberedDetailsRequired: "caseForm.error.rememberedDetails.required",
  rememberedDetailsLength: "caseForm.error.rememberedDetails.length",
  seenOnRequired: "caseForm.error.seenOn.required",
  seenOnLength: "caseForm.error.seenOn.length",
  yearRequired: "caseForm.error.year.required",
  yearFromInteger: "caseForm.error.yearFrom.integer",
  yearToInteger: "caseForm.error.yearTo.integer",
  yearToRange: "caseForm.error.yearTo.range",
  previousSearchesRequired: "caseForm.error.previousSearches.required",
  previousSearchesLength: "caseForm.error.previousSearches.length",
  safetyConfirmedRequired: "caseForm.error.safetyConfirmed.required",
  formInvalid: "caseForm.error.form.invalid",
  formUnknownField: "caseForm.error.form.unknownField",
} as const;

export type CaseFormErrorKey =
  (typeof CASE_FORM_ERROR_KEYS)[keyof typeof CASE_FORM_ERROR_KEYS];

const turkishCaseFormMessages: Record<CaseFormErrorKey, string> = {
  [CASE_FORM_ERROR_KEYS.titleRequired]: "Başlık zorunlu.",
  [CASE_FORM_ERROR_KEYS.titleLength]: "Başlık 12-120 karakter olmalı.",
  [CASE_FORM_ERROR_KEYS.mediaTypeInvalid]: "Bir medya türü seçin.",
  [CASE_FORM_ERROR_KEYS.contentLanguageInvalid]:
    "Geçerli bir içerik dili seçin.",
  [CASE_FORM_ERROR_KEYS.rememberedDetailsRequired]:
    "Hatırlanan ayrıntı zorunlu.",
  [CASE_FORM_ERROR_KEYS.rememberedDetailsLength]:
    "Hatırlanan ayrıntı 80-5.000 karakter olmalı.",
  [CASE_FORM_ERROR_KEYS.seenOnRequired]: "Görüldüğü yer zorunlu.",
  [CASE_FORM_ERROR_KEYS.seenOnLength]: "Görüldüğü yer 2-200 karakter olmalı.",
  [CASE_FORM_ERROR_KEYS.yearRequired]:
    'Bir yıl girin veya "Bilmiyorum" seçeneğini işaretleyin.',
  [CASE_FORM_ERROR_KEYS.yearFromInteger]:
    "Başlangıç yılı geçerli bir tam sayı olmalı.",
  [CASE_FORM_ERROR_KEYS.yearToInteger]:
    "Bitiş yılı geçerli bir tam sayı olmalı.",
  [CASE_FORM_ERROR_KEYS.yearToRange]:
    "Bitiş yılı başlangıç yılından önce olamaz.",
  [CASE_FORM_ERROR_KEYS.previousSearchesRequired]:
    'Önceki aramalarınızı yazın veya "Yok" seçeneğini kullanın.',
  [CASE_FORM_ERROR_KEYS.previousSearchesLength]:
    "Önceki aramalar en fazla 2.000 karakter olabilir.",
  [CASE_FORM_ERROR_KEYS.safetyConfirmedRequired]:
    "Devam etmek için güvenlik onayını vermelisiniz.",
  [CASE_FORM_ERROR_KEYS.formInvalid]: "Form verisi geçerli değil.",
  [CASE_FORM_ERROR_KEYS.formUnknownField]:
    "Formda desteklenmeyen bir alan var.",
};

const englishCaseFormMessages: Record<CaseFormErrorKey, string> = {
  [CASE_FORM_ERROR_KEYS.titleRequired]: "Title is required.",
  [CASE_FORM_ERROR_KEYS.titleLength]:
    "Title must be between 12 and 120 characters.",
  [CASE_FORM_ERROR_KEYS.mediaTypeInvalid]: "Select a media type.",
  [CASE_FORM_ERROR_KEYS.contentLanguageInvalid]:
    "Select a valid content language.",
  [CASE_FORM_ERROR_KEYS.rememberedDetailsRequired]:
    "Remembered details are required.",
  [CASE_FORM_ERROR_KEYS.rememberedDetailsLength]:
    "Remembered details must be between 80 and 5,000 characters.",
  [CASE_FORM_ERROR_KEYS.seenOnRequired]: "Where you saw it is required.",
  [CASE_FORM_ERROR_KEYS.seenOnLength]:
    "Where you saw it must be between 2 and 200 characters.",
  [CASE_FORM_ERROR_KEYS.yearRequired]:
    'Enter a year or select "I don\'t know".',
  [CASE_FORM_ERROR_KEYS.yearFromInteger]: "Start year must be a valid integer.",
  [CASE_FORM_ERROR_KEYS.yearToInteger]: "End year must be a valid integer.",
  [CASE_FORM_ERROR_KEYS.yearToRange]:
    "End year cannot be earlier than start year.",
  [CASE_FORM_ERROR_KEYS.previousSearchesRequired]:
    'Describe your previous searches or select "None".',
  [CASE_FORM_ERROR_KEYS.previousSearchesLength]:
    "Previous searches must be at most 2,000 characters.",
  [CASE_FORM_ERROR_KEYS.safetyConfirmedRequired]:
    "You must provide the safety confirmation to continue.",
  [CASE_FORM_ERROR_KEYS.formInvalid]: "The form data is invalid.",
  [CASE_FORM_ERROR_KEYS.formUnknownField]:
    "The form contains an unsupported field.",
};

export const caseFormMessages: Record<
  Locale,
  Record<CaseFormErrorKey, string>
> = {
  tr: turkishCaseFormMessages,
  en: englishCaseFormMessages,
};

export function translateCaseFormError(
  locale: Locale,
  key: CaseFormErrorKey,
): string {
  return caseFormMessages[locale][key];
}
