"use client";

import { useState } from "react";

import type { ValidCaseFormData } from "@/features/case-create/model/case-form";

import { CaseForm } from "./CaseForm";
import styles from "./case-form-demo.module.css";

export function CaseFormDemo() {
  const [validatedData, setValidatedData] = useState<ValidCaseFormData | null>(
    null,
  );

  return (
    <div className={styles.workspace}>
      <CaseForm onSubmit={(data) => setValidatedData(data)} />

      {validatedData ? (
        <aside className={styles.result} role="status" aria-live="polite">
          <p className={styles.code}>VALIDATION / PASS</p>
          <h2>Form verisi geçerli</h2>
          <p>
            Aşağıdaki çıktı yalnız validation kanıtıdır. Vaka kaydedilmedi veya
            yayınlanmadı.
          </p>
          <dl>
            <div>
              <dt>Başlık</dt>
              <dd>{validatedData.title}</dd>
            </div>
            <div>
              <dt>Tür</dt>
              <dd>{validatedData.mediaType}</dd>
            </div>
            <div>
              <dt>Dil</dt>
              <dd>{validatedData.contentLanguage}</dd>
            </div>
            <div>
              <dt>Dönem</dt>
              <dd>
                {validatedData.yearUnknown
                  ? "Bilinmiyor"
                  : [validatedData.yearFrom, validatedData.yearTo]
                      .filter((year) => year !== undefined)
                      .join("–")}
              </dd>
            </div>
          </dl>
        </aside>
      ) : null}
    </div>
  );
}
