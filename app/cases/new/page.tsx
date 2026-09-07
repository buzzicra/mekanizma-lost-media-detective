import type { Metadata } from "next";
import Link from "next/link";

import { CaseFormDemo } from "@/components/case-create/CaseFormDemo";

export const metadata: Metadata = {
  title: "Yeni vaka formu — Mekanizma",
  description:
    "Yarım hatırlanan bir medya içeriğini yapılandırılmış vaka formuna dönüştür.",
};

export default function NewCasePage() {
  return (
    <main className="workbench-shell" id="main-content">
      <nav className="workbench-nav" aria-label="Sayfa yolu">
        <Link href="/">Mekanizma</Link>
        <span aria-hidden="true">/</span>
        <span>Yeni vaka</span>
      </nav>

      <header className="workbench-header">
        <p className="eyebrow">CASE / NEW</p>
        <h1>Hatırladığın parçaları araştırılabilir bir vakaya çevir.</h1>
        <p>
          Form yalnız arayüz ve validation dilimini gösterir. Auth, kayıt ve
          yayınlama henüz bağlı değildir.
        </p>
      </header>

      <CaseFormDemo />
    </main>
  );
}
