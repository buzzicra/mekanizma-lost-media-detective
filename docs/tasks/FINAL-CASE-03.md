# FINAL-CASE-03 — Vaka formu otomatik kalite paketi

- **GitHub:** [Issue #19](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/19)
- **Durum:** Blocked — #17 ve #18 entegrasyonu bekleniyor
- **Pod:** Case / Vaka Formu
- **Owner:** Burak (`@Burak98-lab`)
- **Reviewer:** Emir
- **Verifier:** Kerim
- **Depends on:** `FINAL-CASE-01`, `FINAL-CASE-02`
- **Blocks:** Case hattı final kalite kararı

## Kullanıcı sonucu

Vaka formunun validation, submit, hata, focus, klavye ve 375 px davranışı tekrar çalıştırılabilir testlerle kanıtlanır.

## Teslim

- `tests/fixtures/case-form.ts`
- `tests/components/case-form.test.tsx`
- `tests/a11y/case-form.a11y.test.tsx`
- `tests/e2e/case-form.smoke.spec.ts`
- Gerekirse yalnız test altında harness
- AC-01..AC-17 izlenebilirlik tablosu

## Acceptance criteria

- [ ] Deterministik valid/min/max/invalid/yıl/safety/submitting/parent-error fixtureları var.
- [ ] On label, valid/invalid submit, inline error, summary ve ilk invalid focus testli.
- [ ] `yearUnknown`, çift submit ve parent error sonrası veri koruma testli.
- [ ] Testler CSS class/private state yerine kullanıcı davranışına bakıyor.
- [ ] A11y, klavye ve 375 px overflow kanıtı var.
- [ ] AC-01..AC-17 belirli test, sonuç ve commite bağlı.
- [ ] `FAIL`, `BLOCKED` ve `NOT RUN` gizlenmiyor.
- [ ] Production schema/component ve ortak config değişmiyor.

## Bitiş kanıtı

- AC-01..AC-17 plan matrisi
- PR ve DCO sign-off commit
- İlgili testler + `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm test:e2e`
- Emir Reviewer kararı
- Kerim Verifier kararı
- Bora + Codex final gate

Repo daveti kabul edilmediyse issueya blocker yazılır; fork PR kabul edilir.
