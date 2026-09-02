import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="eyebrow">404</p>
      <h1>Bu sayfa henüz bulunamadı.</h1>
      <p>Bağlantıyı kontrol et ya da başlangıç sayfasına dön.</p>
      <Link href="/">Başlangıca dön</Link>
    </main>
  );
}
