# FINAL-CASE-02 — Vaka Formu arayüzü

- **GitHub:** [Issue #18](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/18)
- **Durum:** Blocked — #17 public API/handoff bekleniyor
- **Pod:** Case / Vaka Formu
- **Owner:** Emir (`@CodeAThing`)
- **Reviewer:** Kerim
- **Verifier:** Burak
- **Depends on:** `FINAL-CASE-01`
- **Blocks:** `FINAL-CASE-03`

## Kullanıcı sonucu

Kullanıcı on alanlı vaka formunu klavye ve mobilde kullanır; hatayı anlar, ilk hataya gider, submitting/parent error sırasında verisini kaybetmez.

## Teslim

- `components/case-create/CaseForm.tsx`
- `components/case-create/CaseFormFields.tsx`
- `components/case-create/CaseFormErrorSummary.tsx`
- Gerekirse yalnız component klasöründe stil dosyası
- Burak için test seam/handoff notu

## Acceptance criteria

- [ ] Contracttaki on alan görünür label ve tutarlı id/name taşıyor.
- [ ] Kerimin validationı import ediliyor; component içinde kopyalanmıyor.
- [ ] Invalid submit `onSubmit` çağırmıyor; valid submit typed veriyi bir kez veriyor.
- [ ] Inline hatalar ve error summary aynı kaynaktan geliyor.
- [ ] İlk invalid alan focus alıyor; klavye sırası mantıklı.
- [ ] `yearUnknown`, submitting/double-submit ve parent error sonrası veri koruma çalışıyor.
- [ ] 375 px yatay scroll yok; renk tek hata sinyali değil.
- [ ] API/fake success/route/schema/test/config değişikliği yok.

## Bitiş kanıtı

- Component/prop/focus planı ve Kerim plan reviewu
- PR ve DCO sign-off commit
- `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`
- 375 px + invalid/submitting/parent-error ekran kanıtları
- Kerim Reviewer kararı
- Burak Verifier kararı
- Bora + Codex final gate
