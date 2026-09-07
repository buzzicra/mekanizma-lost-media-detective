import type { EvidenceCardData } from "@/features/evidence/model/evidence-card";
import {
  hasVisibleEvidenceText,
  parseEvidenceSource,
} from "@/features/evidence/model/evidence-card";
import { translateEvidence } from "@/lib/i18n/evidence-card";
import type { Locale } from "@/lib/i18n/messages";

import { EvidenceStatusBadge } from "./EvidenceStatusBadge";
import styles from "./evidence-card.module.css";

export type EvidenceCardProps = EvidenceCardData & {
  locale?: Locale;
};

export function EvidenceCard({
  claim,
  rationale,
  sourceUrl,
  status,
  statusReason,
  locale = "tr",
}: EvidenceCardProps) {
  const source = parseEvidenceSource(sourceUrl);
  const shouldShowStatusReason =
    status === "REJECTED" || hasVisibleEvidenceText(statusReason);

  return (
    <article className={styles.card} data-evidence-status={status}>
      <header className={styles.header}>
        <p className={styles.fileCode}>EVIDENCE / 01</p>
        <EvidenceStatusBadge status={status} locale={locale} />
      </header>

      <h2 className={styles.claim}>
        {hasVisibleEvidenceText(claim)
          ? claim
          : translateEvidence(locale, "claimMissing")}
      </h2>

      <section
        className={styles.section}
        aria-label={translateEvidence(locale, "rationaleLabel")}
      >
        <h3>{translateEvidence(locale, "rationaleLabel")}</h3>
        <p className={!hasVisibleEvidenceText(rationale) ? styles.missing : ""}>
          {hasVisibleEvidenceText(rationale)
            ? rationale
            : translateEvidence(locale, "rationaleMissing")}
        </p>
      </section>

      {shouldShowStatusReason ? (
        <section
          className={styles.section}
          aria-label={translateEvidence(locale, "statusReasonLabel")}
        >
          <h3>{translateEvidence(locale, "statusReasonLabel")}</h3>
          <p
            className={
              !hasVisibleEvidenceText(statusReason) ? styles.missing : ""
            }
          >
            {hasVisibleEvidenceText(statusReason)
              ? statusReason
              : translateEvidence(locale, "statusReasonMissing")}
          </p>
        </section>
      ) : null}

      <section
        className={styles.source}
        aria-label={translateEvidence(locale, "sourceLabel")}
      >
        <h3>{translateEvidence(locale, "sourceLabel")}</h3>
        {source.isSafe ? (
          <div className={styles.sourceRow}>
            <span className={styles.domain}>{source.domain}</span>
            <a href={source.href} target="_blank" rel="noopener noreferrer">
              {translateEvidence(locale, "openSource")}
              <span aria-hidden="true"> ↗</span>
            </a>
          </div>
        ) : (
          <p className={styles.missing}>
            {translateEvidence(locale, "sourceInvalid")}
          </p>
        )}
      </section>
    </article>
  );
}
