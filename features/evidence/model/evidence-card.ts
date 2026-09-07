export const EVIDENCE_STATUSES = [
  "NEW",
  "POSSIBLE",
  "REJECTED",
  "VERIFIED",
] as const;

export type EvidenceStatus = (typeof EVIDENCE_STATUSES)[number];

type EvidenceCardBase = {
  claim: string;
  sourceUrl: string;
  rationale: string;
};

export type EvidenceCardData =
  | (EvidenceCardBase & {
      status: "REJECTED";
      statusReason: string;
    })
  | (EvidenceCardBase & {
      status: Exclude<EvidenceStatus, "REJECTED">;
      statusReason?: string | null;
    });

export type SafeEvidenceSource =
  | {
      isSafe: true;
      href: string;
      domain: string;
    }
  | {
      isSafe: false;
    };

export function hasVisibleEvidenceText(
  value: string | null | undefined,
): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function parseEvidenceSource(sourceUrl: string): SafeEvidenceSource {
  const candidate = sourceUrl.trim();

  if (candidate.length === 0) {
    return { isSafe: false };
  }

  try {
    const url = new URL(candidate);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return { isSafe: false };
    }

    if (url.hostname.length === 0) {
      return { isSafe: false };
    }

    return {
      isSafe: true,
      href: url.href,
      domain: url.hostname.replace(/^www\./, ""),
    };
  } catch {
    return { isSafe: false };
  }
}
