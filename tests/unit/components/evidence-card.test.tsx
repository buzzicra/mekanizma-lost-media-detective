import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EvidenceCard } from "@/components/evidence/EvidenceCard";
import {
  evidenceFixtures,
  invalidSourceFixture,
} from "@/tests/fixtures/evidence-card";

describe("EvidenceCard", () => {
  it.each([
    ["NEW", "Yeni"],
    ["POSSIBLE", "Olası"],
    ["REJECTED", "Elendi"],
    ["VERIFIED", "Doğrulandı"],
  ] as const)("%s durumunu metin ve işaretle gösterir", (status, label) => {
    const { container } = render(
      <EvidenceCard {...evidenceFixtures[status]} />,
    );

    expect(screen.getByText(label)).toBeInTheDocument();
    expect(container.querySelector("[aria-hidden='true']")).toBeInTheDocument();
  });

  it("elenen kartta bütün içerik ve durum gerekçesi görünür kalır", () => {
    const fixture = evidenceFixtures.REJECTED;
    render(<EvidenceCard {...fixture} />);

    expect(screen.getByRole("heading", { name: fixture.claim })).toBeVisible();
    expect(screen.getByText(fixture.rationale)).toBeVisible();
    expect(screen.getByText(fixture.statusReason)).toBeVisible();
    expect(screen.getByRole("link", { name: /kaynağı aç/i })).toHaveAttribute(
      "href",
      fixture.sourceUrl,
    );
  });

  it("güvenli kaynağı yeni sekmede güvenli rel ile açar", () => {
    render(<EvidenceCard {...evidenceFixtures.NEW} />);

    const link = screen.getByRole("link", { name: /kaynağı aç/i });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByText("archive.org")).toBeVisible();
  });

  it("unsafe kaynağı pasif metin yapar ve focus hedefi üretmez", () => {
    render(<EvidenceCard {...invalidSourceFixture} />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText("Geçersiz kaynak bağlantısı")).toBeVisible();
  });

  it("boş zorunlu metinlerde locale-aware fallback gösterir", () => {
    render(
      <EvidenceCard
        claim="  "
        rationale=""
        sourceUrl=""
        status="REJECTED"
        statusReason="   "
      />,
    );

    expect(screen.getByText("İddia belirtilmemiş")).toBeVisible();
    expect(screen.getByText("Gerekçe belirtilmemiş")).toBeVisible();
    expect(screen.getByText("Durum gerekçesi belirtilmemiş")).toBeVisible();
    expect(screen.getByText("Geçersiz kaynak bağlantısı")).toBeVisible();
  });

  it("opsiyonel boş durum gerekçesi bölümünü üretmez", () => {
    render(<EvidenceCard {...evidenceFixtures.NEW} statusReason="  " />);

    expect(screen.queryByText("Durum gerekçesi")).not.toBeInTheDocument();
  });

  it("uzun kullanıcı metnini kırpmaz", () => {
    const longClaim = "uzun-kanıt ".repeat(90);
    const longRationale = "ayrıntılı-gerekçe ".repeat(180);

    render(
      <EvidenceCard
        {...evidenceFixtures.POSSIBLE}
        claim={longClaim}
        rationale={longRationale}
      />,
    );

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      longClaim.trim(),
    );
    expect(screen.getByText(longRationale.trim())).toHaveTextContent(
      longRationale.trim(),
    );
  });

  it("İngilizce locale system copy kullanır", () => {
    render(<EvidenceCard {...evidenceFixtures.VERIFIED} locale="en" />);

    expect(screen.getByText("Verified")).toBeVisible();
    expect(screen.getByRole("link", { name: /open source/i })).toBeVisible();
  });
});
