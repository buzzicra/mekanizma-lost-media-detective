# FINAL-CASE-01 — Vaka formu schema ve validation

- **GitHub:** [Issue #17](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/17)
- **Durum:** Ready
- **Pod:** Case / Vaka Formu
- **Owner:** Kerim (`@kerimtasci`)
- **Reviewer:** Burak
- **Verifier:** Emir
- **Depends on:** Ortak scaffold PR #13 ve kabul edilmiş #2 contract — Done
- **Blocks:** `FINAL-CASE-02`

## Kullanıcı sonucu

Ham form girdisi tek, typed ve testli validation girişinden geçer; UI alan bazlı hataları güvenilir şekilde gösterebilir.

## Teslim

- `features/case-create/model/case-form.ts`
- `lib/schemas/case-form.ts`
- `lib/i18n/case-form.ts`
- `tests/unit/case-form-schema.test.ts`
- Emir için public API/hata handoffu

## Acceptance criteria

- [ ] Ham `CaseFormInput` ile geçerli `ValidCaseFormData` ayrılmış.
- [ ] #2 contractındaki metin sınırları ve `safetyConfirmed=true` uygulanıyor.
- [ ] `contentLanguage` sabit eksik allowlist değil, geçerli dil etiketi olarak doğrulanıyor.
- [ ] `yearUnknown=true` stale yıl değerlerini outputtan temizliyor.
- [ ] Bilinen yılda en az bir tam sayı var; iki yılda `yearTo >= yearFrom`.
- [ ] Kesin alt/üst yıl sınırı uydurulmuyor.
- [ ] Alan bazlı i18n hata keyleri deterministik.
- [ ] Boundary, whitespace, dil, yıl, safety ve normalize output testli.
- [ ] React/API/DB/auth/test-harness/config dosyaları değişmiyor.

## Bitiş kanıtı

- Plan + alan/kural/hata/test matrisi
- PR ve DCO sign-off commit
- `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`
- Burak Reviewer kararı
- Emir Verifier kararı
- Emir için import ve hata okuma handoffu
- Bora + Codex final gate
