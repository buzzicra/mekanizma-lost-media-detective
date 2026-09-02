# Final Sprint Ortak Scaffold Planı

## Amaç

Altı final kodlama görevinin aynı çalışan taban üzerinde, dosya sahipliği çakışmadan başlayabilmesi.

## En küçük yararlı çıktı

- Next.js App Router, React ve strict TypeScript tabanı
- Tailwind CSS ve key tabanlı `tr` / `en` metin sözlüğü
- Zod runtime doğrulama bağımlılığı
- Vitest + Testing Library unit/component altyapısı
- Playwright masaüstü ve 375 px E2E altyapısı
- Otomatik erişilebilirlik smoke kontrolü
- PR'da çalışan docs, lint, typecheck, test, build ve E2E kapıları

## Kapsam dışı

- Auth, DB, API, server action ve upload
- Gerçek vaka veya kanıt verisi
- Production deploy
- Final görevlerde katılımcılara ait component, schema ve test kodu

## Dosya sahipliği sınırı

Scaffold ortak tabandır. Final görev Owner'ları yalnız kendi issue'larında yazan dosya sınırında çalışır. Ortak config, dependency veya CI değişikliği gerekiyorsa doğrudan değiştirmek yerine issue'ya blocker notu ekler.

## Kabul kriterleri

1. `pnpm install --frozen-lockfile` temiz kurulumda geçer.
2. `pnpm lint`, `pnpm typecheck`, `pnpm test` ve `pnpm build` exit `0` döner.
3. `pnpm test:e2e` masaüstü ve 375 px projelerinde geçer.
4. Ana sayfa proje durumunu dürüstçe açıklar; bitmemiş özellik varmış gibi davranmaz.
5. CI, docs doğrulamasına ek olarak gerçek uygulama kapılarını çalıştırır.

## Riskler

- Final task issue'ları scaffold merge edilmeden başlatılırsa dosya sahipliği tekrar çakışır.
- Katılımcı ortak config dosyalarını değiştirirse paralel PR'larda merge conflict oluşur.
- Playwright browser kurulumu yapılmazsa E2E komutu uygulama hatası olmadan da çalışamaz.
