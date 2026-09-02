# FINAL-EVID-02 — Evidence Card arayüzü

**GitHub:** [Issue #15](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/15)  
**Durum:** Blocked — #14 public API/handoff bekleniyor  
**Pod:** Evidence / Kanıt Kartı  
**Owner:** Batıncan (`@btncnkntr`)  
**Reviewer:** Taylan  
**Verifier:** Cemresu  
**Depends on:** `FINAL-EVID-01`  
**Blocks:** `FINAL-EVID-03`

## Kullanıcı sonucu

Kullanıcı claim, kaynak, gerekçe ve doğrulama durumunu erişilebilir, güvenli ve mobilde bozulmayan tek kartta okur.

## Teslim

- `components/evidence/EvidenceCard.tsx`
- `components/evidence/EvidenceStatusBadge.tsx`
- Gerekirse yalnız component klasöründe stil dosyası
- 375, 768 ve 1280 px state kanıtları

## Acceptance criteria

- [ ] Dört status yalnız renkle değil metin/işaretle ayrılıyor.
- [ ] `REJECTED` claim, rationale, source ve reason kaybolmuyor.
- [ ] Taylanın public model/helper API'si import ediliyor; kopyalanmıyor.
- [ ] Geçerli kaynak güvenli yeni sekme linki; invalid kaynak link/focus hedefi değil.
- [ ] Uzun metin truncate edilmiyor, 375 px yatay scroll yok.
- [ ] Klavye ve görünür focus çalışıyor.
- [ ] Productiona demo/mock route eklenmiyor.
- [ ] Model/test/config/API/DB/auth dosyaları değişmiyor.

## Bitiş kanıtı

- Plan yorumu ve Taylan plan reviewu
- PR ve DCO sign-off commit
- `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`
- 375/768/1280 ekran kanıtları
- Taylan Reviewer kararı
- Cemresu Verifier/retest kararı
- Bora + Codex final gate
