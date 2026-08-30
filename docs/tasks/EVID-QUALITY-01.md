# EVID-QUALITY-01 - Durum, link ve OSS handoff

**Pod:** Pod 1 - Kanıt Kartı
**Durum:** Blocked
**Owner:** `buzzicra` + Codex
**Reviewer:** Bora
**Verifier:** Codex + CI
**Depends on:** `EVID-BUILD-01`
**Blocks:** Sonraki evidence create/server dilimi

## Kullanıcı sonucu

Kanıt kartının durum, bağlantı, uzun metin, klavye ve mobil davranışları kanıtlanmış olur.

## Teslim

- Dört status davranış testi.
- Elendi gerekçesi görünürlük testi.
- HTTP(S), bozuk URL ve izin verilmeyen şema testleri.
- Link klavye erişimi ve güvenli yeni sekme kontrolü.
- Uzun metin/mobile kanıtı ve OSS handoff.

## Acceptance criteria

- [ ] `EVID-BUILD-01` Done ve handoff edilmiş.
- [ ] Dört status senaryosu geçiyor.
- [ ] Elendi gerekçesi kaybolmuyor.
- [ ] Güvenli ve geçersiz bağlantı yolları doğrulanmış.
- [ ] Klavye, uzun metin ve mobil kontrolü kayıtlı.

## Bitiş kanıtı

- Acceptance → test eşleştirmesi.
- Test çıktıları ve exit codelar.
- Ekran kanıtı.
- Reviewer ve Verifier kararları.
