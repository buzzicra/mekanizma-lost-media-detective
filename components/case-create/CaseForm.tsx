"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";

import type {
  CaseFormField,
  CaseFormFieldErrors,
  CaseFormInput,
  ValidCaseFormData,
} from "@/features/case-create/model/case-form";
import { validateCaseForm } from "@/features/case-create/model/case-form";
import { translateCaseFormUi } from "@/lib/i18n/case-form-ui";
import type { Locale } from "@/lib/i18n/messages";

import {
  CaseFormErrorSummary,
  caseFormFieldIds,
  getFirstInvalidField,
} from "./CaseFormErrorSummary";
import { CaseFormFields } from "./CaseFormFields";
import styles from "./case-form.module.css";

const emptyCaseForm: CaseFormInput = {
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

export type CaseFormProps = {
  initialValues?: Partial<CaseFormInput>;
  isSubmitting?: boolean;
  submitError?: string | null;
  onSubmit: (data: ValidCaseFormData) => void | Promise<void>;
  locale?: Locale;
};

export function CaseForm({
  initialValues,
  isSubmitting = false,
  submitError = null,
  onSubmit,
  locale = "tr",
}: CaseFormProps) {
  const [values, setValues] = useState<CaseFormInput>(() => ({
    ...emptyCaseForm,
    ...initialValues,
  }));
  const [fieldErrors, setFieldErrors] = useState<CaseFormFieldErrors>({});
  const [internalSubmitting, setInternalSubmitting] = useState(false);
  const parentErrorRef = useRef<HTMLDivElement>(null);
  const submissionInFlight = useRef(false);

  const effectiveSubmitting = isSubmitting || internalSubmitting;

  useEffect(() => {
    if (submitError) {
      parentErrorRef.current?.focus();
    }
  }, [submitError]);

  const handleChange = <Field extends CaseFormField>(
    field: Field,
    value: CaseFormInput[Field],
  ) => {
    const nextValues = { ...values, [field]: value };

    setValues(nextValues);

    if (fieldErrors[field]) {
      const result = validateCaseForm(nextValues);
      setFieldErrors(result.success ? {} : result.fieldErrors);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (effectiveSubmitting || submissionInFlight.current) {
      return;
    }

    const result = validateCaseForm(values);

    if (!result.success) {
      setFieldErrors(result.fieldErrors);
      const firstInvalidField = getFirstInvalidField(result.fieldErrors);

      if (firstInvalidField) {
        document.getElementById(caseFormFieldIds[firstInvalidField])?.focus();
      }

      return;
    }

    setFieldErrors({});
    submissionInFlight.current = true;
    setInternalSubmitting(true);

    try {
      await onSubmit(result.data);
    } finally {
      submissionInFlight.current = false;
      setInternalSubmitting(false);
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      noValidate
      aria-busy={effectiveSubmitting}
    >
      {submitError ? (
        <div
          ref={parentErrorRef}
          className={styles.parentError}
          role="alert"
          tabIndex={-1}
        >
          <strong>{translateCaseFormUi(locale, "parentErrorTitle")}</strong>
          <p>{submitError}</p>
        </div>
      ) : null}

      <CaseFormErrorSummary fieldErrors={fieldErrors} locale={locale} />
      <CaseFormFields
        values={values}
        fieldErrors={fieldErrors}
        locale={locale}
        onChange={handleChange}
      />

      <div className={styles.submitRow}>
        <p className={styles.submitNote}>
          {translateCaseFormUi(locale, "nonPersistenceNote")}
        </p>
        <button type="submit" disabled={effectiveSubmitting}>
          {translateCaseFormUi(
            locale,
            effectiveSubmitting ? "submitBusy" : "submitIdle",
          )}
        </button>
      </div>

      {effectiveSubmitting ? (
        <p className={styles.srOnly} role="status" aria-live="polite">
          {translateCaseFormUi(locale, "submittingAnnouncement")}
        </p>
      ) : null}
    </form>
  );
}
