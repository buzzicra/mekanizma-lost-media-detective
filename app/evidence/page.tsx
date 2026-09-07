import type { Metadata } from "next";
import Link from "next/link";

import { EvidenceCard } from "@/components/evidence/EvidenceCard";

export const metadata: Metadata = {
  title: "Kanıt kartı — Mekanizma",
  description:
    "Bir lost media adayının iddiasını, kaynağını, gerekçesini ve durumunu birlikte oku.",
};

export default function EvidencePage() {
  return (
    <main className="workbench-shell" id="main-content">
      <nav className="workbench-nav" aria-label="Sayfa yolu">
        <Link href="/">Mekanizma</Link>
        <span aria-hidden="true">/</span>
        <span>Kanıt kartı</span>
      </nav>

      <header className="workbench-header evidence-intro">
        <p className="eyebrow">EVIDENCE / VIEW</p>
        <h1>Bir aday, kaynağı ve neden elendiğiyle birlikte yaşar.</h1>
        <p>
          Aşağıdaki kayıt contract davranışını gösteren açıkça işaretlenmiş bir
          örnektir. Link önizlemesi veya uzak kaynak isteği yapılmaz.
        </p>
      </header>

      <section className="evidence-example" aria-labelledby="example-heading">
        <div className="example-note">
          <p>ÖRNEK KAYIT / 01</p>
          <h2 id="example-heading">Elendi bilgisi neden kaybolmuyor?</h2>
          <p>
            Yanlış adayın gerekçesi görünür kalır; aynı araştırma tekrar
            yapılmaz. Kart kaynak gösterir, sonucu uydurmaz.
          </p>
        </div>

        <EvidenceCard
          claim="1990'larda yayımlanan Mavi Ayı adlı çizgi film aranan yapım olabilir."
          rationale="Yayın dönemi ve ana karakterin rengi vaka sahibinin hatırladığı ayrıntılarla ilk bakışta örtüşüyordu."
          sourceUrl="https://archive.org/details/animationandcartoons"
          status="REJECTED"
          statusReason="Kaynak kaydındaki yapım farklı bir ülkede yayımlanmış; tarif edilen jenerik ve yan karakterler uyuşmuyor."
        />
      </section>

      <p className="next-route">
        Sıradaki dilim: <Link href="/cases/new">Yeni vaka formunu aç</Link>
      </p>
    </main>
  );
}
