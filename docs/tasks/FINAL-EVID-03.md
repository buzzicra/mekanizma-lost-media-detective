# FINAL-EVID-03 — Evidence otomatik kalite paketi

- **GitHub:** [Issue #16](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/16)
- **Durum:** Blocked — #14 ve #15 entegrasyonu bekleniyor
- **Pod:** Evidence / Kanıt Kartı
- **Owner:** Cemresu (`@cecesue`)
- **Reviewer:** Batıncan
- **Verifier:** Taylan
- **Depends on:** `FINAL-EVID-01`, `FINAL-EVID-02`
- **Blocks:** Evidence hattı final kalite kararı

## Kullanıcı sonucu

Evidence Cardın durum, kaynak, uzun/boş içerik, erişilebilirlik ve 375 px davranışı tekrar çalıştırılabilir testlerle kanıtlanır.

## Teslim

- `tests/fixtures/evidence-card.ts`
- `tests/components/evidence-card.test.tsx`
- `tests/a11y/evidence-card.a11y.test.tsx`
- `tests/e2e/evidence-card.smoke.spec.ts`
- Gerekirse yalnız test altında harness
- Acceptance, bug ve retest tablosu

## Acceptance criteria

- [ ] Dört status, rejected reason, boş/uzun metin ve tüm URL sınıfları fixturelarda.
- [ ] Testler class/private state yerine görünür davranışa bakıyor.
- [ ] Unsafe URL link üretmiyor; network çağrısı yok.
- [ ] Semantik, accessible name, focus ve axe kanıtı var.
- [ ] 375 px overflow ve klavye smoke mevcut.
- [ ] Her FAIL doğru Owner, commit, tekrar üretme ve retestle kayıtlı.
- [ ] P0/P1 açıkken PASS verilmiyor; `NOT RUN` gizlenmiyor.
- [ ] Production model/component ve ortak config değişmiyor.

## Bitiş kanıtı

- Test matrisi ve plan yorumu
- PR ve DCO sign-off commit
- İlgili test komutları + `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm test:e2e`
- Batıncan Reviewer kararı
- Taylan Verifier kararı
- Commitlere bağlı final EVID kalite notu
- Bora + Codex final gate
