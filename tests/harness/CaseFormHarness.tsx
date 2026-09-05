import React, { useState } from "react";
import type {
  CaseFormInput,
  CaseFormProps,
  ValidCaseFormData,
} from "../fixtures/case-form";

export type CaseFormHarnessProps = {
  /**
   * Test edilecek form bileşeni.
   */
  FormComponent: React.ComponentType<CaseFormProps>;
  /**
   * Başlangıç değerleri.
   */
  initialValues?: Partial<CaseFormInput>;
  /**
   * Başlangıçta submitsonucu simülasyonu.
   */
  initialSubmitError?: string | null;
  /**
   * onSubmit tetiklendiğinde çağrılacak callback.
   */
  onSubmit?: (data: ValidCaseFormData) => void | Promise<void>;
  /**
   * Simüle edilmiş submit gecikmesi (ms).
   */
  simulateDelayMs?: number;
};

/**
 * CaseFormHarness
 *
 * CaseForm bileşenini izole bir üst (parent) bileşen içinde çalıştırarak
 * submitting durumu, çift submit engelleme ve parent error sonrası form
 * değerlerinin korunması senaryolarını doğrulamak için kullanılan test aracıdır.
 */
export function CaseFormHarness({
  FormComponent,
  initialValues,
  initialSubmitError = null,
  onSubmit,
  simulateDelayMs = 0,
}: CaseFormHarnessProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(
    initialSubmitError,
  );
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmittedData, setLastSubmittedData] =
    useState<ValidCaseFormData | null>(null);

  const handleSubmit = async (data: ValidCaseFormData) => {
    setSubmissionCount((prev) => prev + 1);
    setLastSubmittedData(data);
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (simulateDelayMs > 0) {
        await new Promise((resolve) => setTimeout(resolve, simulateDelayMs));
      }
      if (onSubmit) {
        await onSubmit(data);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div data-testid="case-form-harness">
      <div data-testid="harness-controls" style={{ display: "none" }}>
        <button
          type="button"
          data-testid="trigger-parent-error"
          onClick={() =>
            setSubmitError(
              "Sunucu hatası: Vaka kaydedilemedi. Lütfen tekrar deneyin.",
            )
          }
        >
          Simulate Parent Error
        </button>
        <button
          type="button"
          data-testid="clear-parent-error"
          onClick={() => setSubmitError(null)}
        >
          Clear Parent Error
        </button>
        <span data-testid="submission-count">{submissionCount}</span>
        <span data-testid="submitting-state">{String(isSubmitting)}</span>
        <pre data-testid="last-submitted-json">
          {lastSubmittedData ? JSON.stringify(lastSubmittedData) : ""}
        </pre>
      </div>

      <FormComponent
        initialValues={initialValues}
        isSubmitting={isSubmitting}
        submitError={submitError}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
