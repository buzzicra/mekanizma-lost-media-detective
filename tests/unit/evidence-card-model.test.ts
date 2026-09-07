import { describe, expect, it, vi } from "vitest";

import {
  EVIDENCE_STATUSES,
  hasVisibleEvidenceText,
  parseEvidenceSource,
} from "@/features/evidence/model/evidence-card";

describe("evidence card model", () => {
  it("dört kanıt durumunu sabit sırayla sunar", () => {
    expect(EVIDENCE_STATUSES).toEqual([
      "NEW",
      "POSSIBLE",
      "REJECTED",
      "VERIFIED",
    ]);
  });

  it.each([
    ["https://www.archive.org/details/example", "archive.org"],
    ["http://example.com/path?q=1", "example.com"],
  ])("HTTP(S) kaynağını güvenli link verisine çevirir", (url, domain) => {
    expect(parseEvidenceSource(url)).toMatchObject({
      isSafe: true,
      domain,
    });
  });

  it.each([
    "",
    "   ",
    "not-a-url",
    "javascript:alert(1)",
    "data:text/html,hello",
    "file:///tmp/evidence.txt",
  ])("izin verilmeyen kaynağı linklenebilir yapmaz: %s", (url) => {
    expect(parseEvidenceSource(url)).toEqual({ isSafe: false });
  });

  it("kaynak ayrıştırırken network isteği yapmaz", () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    parseEvidenceSource("https://archive.org/details/example");

    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });

  it("yalnız whitespace metni görünür içerik saymaz", () => {
    expect(hasVisibleEvidenceText("kanıt")).toBe(true);
    expect(hasVisibleEvidenceText("  ")).toBe(false);
    expect(hasVisibleEvidenceText(null)).toBe(false);
  });
});
