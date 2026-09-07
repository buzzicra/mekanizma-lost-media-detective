import type {
  CaseFormField,
  CaseFormFieldErrors,
  CaseFormInput,
} from "@/features/case-create/model/case-form";
import {
  MEDIA_TYPES,
  translateCaseFormError,
} from "@/features/case-create/model/case-form";
import {
  translateCaseFormUi,
  translateMediaType,
} from "@/lib/i18n/case-form-ui";
import type { Locale } from "@/lib/i18n/messages";

import { caseFormFieldIds } from "./CaseFormErrorSummary";
import styles from "./case-form.module.css";

type CaseFormFieldsProps = {
  values: CaseFormInput;
  fieldErrors: CaseFormFieldErrors;
  locale: Locale;
  onChange: <Field extends CaseFormField>(
    field: Field,
    value: CaseFormInput[Field],
  ) => void;
};

function describedBy(
  field: CaseFormField,
  hasHint: boolean,
  hasError: boolean,
) {
  const ids = [
    hasHint ? `${caseFormFieldIds[field]}-hint` : null,
    hasError ? `${caseFormFieldIds[field]}-error` : null,
  ].filter(Boolean);

  return ids.length > 0 ? ids.join(" ") : undefined;
}

function FieldError({
  field,
  fieldErrors,
  locale,
}: {
  field: CaseFormField;
  fieldErrors: CaseFormFieldErrors;
  locale: Locale;
}) {
  const firstError = fieldErrors[field]?.[0];

  if (!firstError) {
    return null;
  }

  return (
    <p id={`${caseFormFieldIds[field]}-error`} className={styles.fieldError}>
      <span aria-hidden="true">!</span>
      {translateCaseFormError(locale, firstError)}
    </p>
  );
}

export function CaseFormFields({
  values,
  fieldErrors,
  locale,
  onChange,
}: CaseFormFieldsProps) {
  return (
    <div className={styles.fields}>
      <div className={styles.field}>
        <label htmlFor={caseFormFieldIds.title}>
          {translateCaseFormUi(locale, "titleLabel")}
          <span className={styles.required}>
            {translateCaseFormUi(locale, "requiredMarker")}
          </span>
        </label>
        <p id={`${caseFormFieldIds.title}-hint`} className={styles.hint}>
          {translateCaseFormUi(locale, "titleHint")}
        </p>
        <input
          id={caseFormFieldIds.title}
          name="title"
          value={values.title}
          onChange={(event) => onChange("title", event.target.value)}
          aria-invalid={Boolean(fieldErrors.title)}
          aria-describedby={describedBy(
            "title",
            true,
            Boolean(fieldErrors.title),
          )}
          autoComplete="off"
        />
        <FieldError field="title" fieldErrors={fieldErrors} locale={locale} />
      </div>

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label htmlFor={caseFormFieldIds.mediaType}>
            {translateCaseFormUi(locale, "mediaTypeLabel")}
            <span className={styles.required}>
              {translateCaseFormUi(locale, "requiredMarker")}
            </span>
          </label>
          <select
            id={caseFormFieldIds.mediaType}
            name="mediaType"
            value={values.mediaType}
            onChange={(event) =>
              onChange(
                "mediaType",
                event.target.value as CaseFormInput["mediaType"],
              )
            }
            aria-invalid={Boolean(fieldErrors.mediaType)}
            aria-describedby={describedBy(
              "mediaType",
              false,
              Boolean(fieldErrors.mediaType),
            )}
          >
            <option value="">
              {translateCaseFormUi(locale, "mediaTypePlaceholder")}
            </option>
            {MEDIA_TYPES.map((mediaType) => (
              <option key={mediaType} value={mediaType}>
                {translateMediaType(locale, mediaType)}
              </option>
            ))}
          </select>
          <FieldError
            field="mediaType"
            fieldErrors={fieldErrors}
            locale={locale}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor={caseFormFieldIds.contentLanguage}>
            {translateCaseFormUi(locale, "contentLanguageLabel")}
            <span className={styles.required}>
              {translateCaseFormUi(locale, "requiredMarker")}
            </span>
          </label>
          <p
            id={`${caseFormFieldIds.contentLanguage}-hint`}
            className={styles.hint}
          >
            {translateCaseFormUi(locale, "contentLanguageHint")}
          </p>
          <input
            id={caseFormFieldIds.contentLanguage}
            name="contentLanguage"
            value={values.contentLanguage}
            onChange={(event) =>
              onChange("contentLanguage", event.target.value)
            }
            aria-invalid={Boolean(fieldErrors.contentLanguage)}
            aria-describedby={describedBy(
              "contentLanguage",
              true,
              Boolean(fieldErrors.contentLanguage),
            )}
            placeholder="tr"
            autoComplete="off"
          />
          <FieldError
            field="contentLanguage"
            fieldErrors={fieldErrors}
            locale={locale}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor={caseFormFieldIds.rememberedDetails}>
          {translateCaseFormUi(locale, "rememberedDetailsLabel")}
          <span className={styles.required}>
            {translateCaseFormUi(locale, "requiredMarker")}
          </span>
        </label>
        <p
          id={`${caseFormFieldIds.rememberedDetails}-hint`}
          className={styles.hint}
        >
          {translateCaseFormUi(locale, "rememberedDetailsHint")}
        </p>
        <textarea
          id={caseFormFieldIds.rememberedDetails}
          name="rememberedDetails"
          value={values.rememberedDetails}
          onChange={(event) =>
            onChange("rememberedDetails", event.target.value)
          }
          aria-invalid={Boolean(fieldErrors.rememberedDetails)}
          aria-describedby={describedBy(
            "rememberedDetails",
            true,
            Boolean(fieldErrors.rememberedDetails),
          )}
          rows={7}
        />
        <FieldError
          field="rememberedDetails"
          fieldErrors={fieldErrors}
          locale={locale}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor={caseFormFieldIds.seenOn}>
          {translateCaseFormUi(locale, "seenOnLabel")}
          <span className={styles.required}>
            {translateCaseFormUi(locale, "requiredMarker")}
          </span>
        </label>
        <p id={`${caseFormFieldIds.seenOn}-hint`} className={styles.hint}>
          {translateCaseFormUi(locale, "seenOnHint")}
        </p>
        <input
          id={caseFormFieldIds.seenOn}
          name="seenOn"
          value={values.seenOn}
          onChange={(event) => onChange("seenOn", event.target.value)}
          aria-invalid={Boolean(fieldErrors.seenOn)}
          aria-describedby={describedBy(
            "seenOn",
            true,
            Boolean(fieldErrors.seenOn),
          )}
          autoComplete="off"
        />
        <FieldError field="seenOn" fieldErrors={fieldErrors} locale={locale} />
      </div>

      <fieldset className={styles.period}>
        <legend>{translateCaseFormUi(locale, "periodLegend")}</legend>
        <label
          className={styles.checkRow}
          htmlFor={caseFormFieldIds.yearUnknown}
        >
          <input
            id={caseFormFieldIds.yearUnknown}
            name="yearUnknown"
            type="checkbox"
            checked={values.yearUnknown}
            onChange={(event) => onChange("yearUnknown", event.target.checked)}
            aria-invalid={Boolean(fieldErrors.yearUnknown)}
            aria-describedby={describedBy(
              "yearUnknown",
              false,
              Boolean(fieldErrors.yearUnknown),
            )}
          />
          <span>{translateCaseFormUi(locale, "yearUnknownLabel")}</span>
        </label>
        <FieldError
          field="yearUnknown"
          fieldErrors={fieldErrors}
          locale={locale}
        />

        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label htmlFor={caseFormFieldIds.yearFrom}>
              {translateCaseFormUi(locale, "yearFromLabel")}
            </label>
            <input
              id={caseFormFieldIds.yearFrom}
              name="yearFrom"
              value={values.yearFrom}
              onChange={(event) => onChange("yearFrom", event.target.value)}
              disabled={values.yearUnknown}
              aria-invalid={Boolean(fieldErrors.yearFrom)}
              aria-describedby={describedBy(
                "yearFrom",
                false,
                Boolean(fieldErrors.yearFrom),
              )}
              inputMode="numeric"
              autoComplete="off"
            />
            <FieldError
              field="yearFrom"
              fieldErrors={fieldErrors}
              locale={locale}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor={caseFormFieldIds.yearTo}>
              {translateCaseFormUi(locale, "yearToLabel")}
            </label>
            <input
              id={caseFormFieldIds.yearTo}
              name="yearTo"
              value={values.yearTo}
              onChange={(event) => onChange("yearTo", event.target.value)}
              disabled={values.yearUnknown}
              aria-invalid={Boolean(fieldErrors.yearTo)}
              aria-describedby={describedBy(
                "yearTo",
                false,
                Boolean(fieldErrors.yearTo),
              )}
              inputMode="numeric"
              autoComplete="off"
            />
            <FieldError
              field="yearTo"
              fieldErrors={fieldErrors}
              locale={locale}
            />
          </div>
        </div>
      </fieldset>

      <div className={styles.field}>
        <label htmlFor={caseFormFieldIds.previousSearches}>
          {translateCaseFormUi(locale, "previousSearchesLabel")}
          <span className={styles.required}>
            {translateCaseFormUi(locale, "requiredMarker")}
          </span>
        </label>
        <p
          id={`${caseFormFieldIds.previousSearches}-hint`}
          className={styles.hint}
        >
          {translateCaseFormUi(locale, "previousSearchesHint")}
        </p>
        <textarea
          id={caseFormFieldIds.previousSearches}
          name="previousSearches"
          value={values.previousSearches}
          onChange={(event) => onChange("previousSearches", event.target.value)}
          aria-invalid={Boolean(fieldErrors.previousSearches)}
          aria-describedby={describedBy(
            "previousSearches",
            true,
            Boolean(fieldErrors.previousSearches),
          )}
          rows={4}
        />
        <FieldError
          field="previousSearches"
          fieldErrors={fieldErrors}
          locale={locale}
        />
      </div>

      <div className={styles.safetyBox}>
        <label
          className={styles.checkRow}
          htmlFor={caseFormFieldIds.safetyConfirmed}
        >
          <input
            id={caseFormFieldIds.safetyConfirmed}
            name="safetyConfirmed"
            type="checkbox"
            checked={values.safetyConfirmed}
            onChange={(event) =>
              onChange("safetyConfirmed", event.target.checked)
            }
            aria-invalid={Boolean(fieldErrors.safetyConfirmed)}
            aria-describedby={describedBy(
              "safetyConfirmed",
              true,
              Boolean(fieldErrors.safetyConfirmed),
            )}
          />
          <span>{translateCaseFormUi(locale, "safetyConfirmedLabel")}</span>
        </label>
        <p
          id={`${caseFormFieldIds.safetyConfirmed}-hint`}
          className={styles.hint}
        >
          {translateCaseFormUi(locale, "safetyHint")}
        </p>
        <FieldError
          field="safetyConfirmed"
          fieldErrors={fieldErrors}
          locale={locale}
        />
      </div>
    </div>
  );
}
