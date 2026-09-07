import type {
  CaseFormField,
  CaseFormFieldErrors,
} from "@/features/case-create/model/case-form";
import { translateCaseFormError } from "@/lib/i18n/case-form";
import {
  translateCaseFormUi,
  type CaseFormUiKey,
} from "@/lib/i18n/case-form-ui";
import type { Locale } from "@/lib/i18n/messages";

import styles from "./case-form.module.css";

const orderedFields: readonly CaseFormField[] = [
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
];

const fieldLabelKeys: Record<CaseFormField, CaseFormUiKey> = {
  title: "titleLabel",
  mediaType: "mediaTypeLabel",
  contentLanguage: "contentLanguageLabel",
  rememberedDetails: "rememberedDetailsLabel",
  seenOn: "seenOnLabel",
  yearUnknown: "yearUnknownLabel",
  yearFrom: "yearFromLabel",
  yearTo: "yearToLabel",
  previousSearches: "previousSearchesLabel",
  safetyConfirmed: "safetyConfirmedLabel",
};

export const caseFormFieldIds: Record<CaseFormField, string> = {
  title: "case-title",
  mediaType: "case-media-type",
  contentLanguage: "case-content-language",
  rememberedDetails: "case-remembered-details",
  seenOn: "case-seen-on",
  yearUnknown: "case-year-unknown",
  yearFrom: "case-year-from",
  yearTo: "case-year-to",
  previousSearches: "case-previous-searches",
  safetyConfirmed: "case-safety-confirmed",
};

export function getFirstInvalidField(
  fieldErrors: CaseFormFieldErrors,
): CaseFormField | undefined {
  return orderedFields.find((field) => fieldErrors[field]?.length);
}

type CaseFormErrorSummaryProps = {
  fieldErrors: CaseFormFieldErrors;
  locale: Locale;
};

export function CaseFormErrorSummary({
  fieldErrors,
  locale,
}: CaseFormErrorSummaryProps) {
  const fieldsWithErrors = orderedFields.filter(
    (field) => fieldErrors[field]?.length,
  );

  if (fieldsWithErrors.length === 0) {
    return null;
  }

  return (
    <section className={styles.errorSummary} role="alert" aria-atomic="true">
      <h2>{translateCaseFormUi(locale, "errorSummaryTitle")}</h2>
      <p>{translateCaseFormUi(locale, "errorSummaryIntro")}</p>
      <ul>
        {fieldsWithErrors.map((field) => {
          const firstError = fieldErrors[field]?.[0];

          if (!firstError) {
            return null;
          }

          return (
            <li key={field}>
              <button
                type="button"
                onClick={() =>
                  document.getElementById(caseFormFieldIds[field])?.focus()
                }
              >
                <strong>
                  {translateCaseFormUi(locale, fieldLabelKeys[field])}:
                </strong>{" "}
                {translateCaseFormError(locale, firstError)}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
