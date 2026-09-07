import type { Locale } from "@/lib/i18n/messages";

import type { EvidenceStatus } from "@/features/evidence/model/evidence-card";

export const evidenceStatusMessages: Record<
  Locale,
  Record<EvidenceStatus, string>
> = {
  tr: {
    NEW: "Yeni",
    POSSIBLE: "Olası",
    REJECTED: "Elendi",
    VERIFIED: "Doğrulandı",
  },
  en: {
    NEW: "New",
    POSSIBLE: "Possible",
    REJECTED: "Rejected",
    VERIFIED: "Verified",
  },
};

const turkishMessages = {
  rationaleLabel: "Gerekçe",
  statusReasonLabel: "Durum gerekçesi",
  sourceLabel: "Kaynak",
  openSource: "Kaynağı aç",
  claimMissing: "İddia belirtilmemiş",
  rationaleMissing: "Gerekçe belirtilmemiş",
  statusReasonMissing: "Durum gerekçesi belirtilmemiş",
  sourceInvalid: "Geçersiz kaynak bağlantısı",
} as const;

export type EvidenceMessageKey = keyof typeof turkishMessages;

const englishMessages: Record<EvidenceMessageKey, string> = {
  rationaleLabel: "Rationale",
  statusReasonLabel: "Status rationale",
  sourceLabel: "Source",
  openSource: "Open source",
  claimMissing: "Claim not provided",
  rationaleMissing: "Rationale not provided",
  statusReasonMissing: "Status rationale not provided",
  sourceInvalid: "Invalid source link",
};

const evidenceMessages: Record<Locale, Record<EvidenceMessageKey, string>> = {
  tr: turkishMessages,
  en: englishMessages,
};

export function translateEvidence(
  locale: Locale,
  key: EvidenceMessageKey,
): string {
  return evidenceMessages[locale][key];
}

export function translateEvidenceStatus(
  locale: Locale,
  status: EvidenceStatus,
): string {
  return evidenceStatusMessages[locale][status];
}
