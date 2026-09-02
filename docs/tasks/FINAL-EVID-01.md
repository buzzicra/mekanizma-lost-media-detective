# FINAL-EVID-01 — Evidence model ve güvenli kaynak helperı

**GitHub:** [Issue #14](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/14)  
**Durum:** Ready  
**Pod:** Evidence / Kanıt Kartı  
**Owner:** Taylan (`@taylanakgn`)  
**Reviewer:** Cemresu  
**Verifier:** Batıncan  
**Depends on:** Ortak scaffold PR #13 — Done  
**Blocks:** `FINAL-EVID-02`

## Kullanıcı sonucu

Evidence Card güvenilir, typed ve kayıpsız görünür veri alır; yalnız güvenli HTTP(S) kaynaklar tıklanabilir olur.

## Teslim

- `features/evidence/model/evidence-card.ts`
- `lib/i18n/evidence-card.ts`
- `tests/unit/evidence-card-model.test.ts`
- Batıncan için public API ve kullanım handoffu

## Acceptance criteria

- [ ] `NEW`, `POSSIBLE`, `REJECTED`, `VERIFIED` durumları typed.
- [ ] `REJECTED` reason dolu/boş davranışı i18n key ile belirli.
- [ ] Boş claim/rationale fallbacki var; uzun kullanıcı metni değişmiyor.
- [ ] Yalnız `http:` ve `https:` linklenebilir.
- [ ] Boş, bozuk, `javascript:`, `data:` ve `file:` kaynaklar reddediliyor.
- [ ] Helper network isteği yapmıyor.
- [ ] Dört status, fallbackler ve URL sınıfları unit testli.
- [ ] Component, API, DB, auth ve ortak config değişmiyor.

## Bitiş kanıtı

- Plan yorumu ve Reviewer plan kararı
- PR ve DCO sign-off commit
- `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`
- Cemresu Reviewer kararı
- Batıncan Verifier kararı
- Bora + Codex final gate
