import type { EvidenceStatus } from "@/features/evidence/model/evidence-card";
import { translateEvidenceStatus } from "@/lib/i18n/evidence-card";
import type { Locale } from "@/lib/i18n/messages";

import styles from "./evidence-card.module.css";

const statusMarks: Record<EvidenceStatus, string> = {
  NEW: "+",
  POSSIBLE: "?",
  REJECTED: "×",
  VERIFIED: "✓",
};

type EvidenceStatusBadgeProps = {
  status: EvidenceStatus;
  locale?: Locale;
};

export function EvidenceStatusBadge({
  status,
  locale = "tr",
}: EvidenceStatusBadgeProps) {
  return (
    <span className={styles.statusBadge} data-status={status}>
      <span className={styles.statusMark} aria-hidden="true">
        {statusMarks[status]}
      </span>
      {translateEvidenceStatus(locale, status)}
    </span>
  );
}
