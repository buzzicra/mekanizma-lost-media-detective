# ADR-0001 — Uygulama scaffoldı ve doğrulama tabanı

- Durum: Kabul edildi
- Tarih: 2026-09-02

## Bağlam

Repo yalnız koordinasyon belgeleri içeriyordu. Build ve Quality görevlerinin ortak `package.json`, uygulama giriş noktası, dosya düzeni ve gerçek doğrulama komutları yoktu.

## Karar

Next.js 16 App Router, React 19, strict TypeScript, Tailwind CSS 4 ve Zod 4 kullanılacak. Unit/component testleri Vitest + Testing Library; tarayıcı smoke ve erişilebilirlik kontrolleri Playwright + axe ile çalışacak. Paket yöneticisi pnpm, Node alt sınırı `20.9.0` olacak. Kilitli sürümlerin kaynak kaydı `pnpm-lock.yaml`dır.

## Sonuçlar

- Her final görev aynı kurulum ve komutları kullanır.
- Next.js build artık lint çalıştırmadığı için CI `lint` ve `build` adımlarını ayrı yürütür.
- Auth, DB, API ve deploy bu karara dahil değildir; ayrı güvenlik ve mimari kapı ister.
- Uygulama `standalone` çıktı üretebilir fakat bu karar tek başına canlı dağıtım kanıtı değildir.
