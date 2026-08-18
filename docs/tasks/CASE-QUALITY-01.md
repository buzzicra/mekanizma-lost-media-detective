# CASE-QUALITY-01 - Form kalite ve handoff

**Pod:** Pod 1 - Keşif ve Vaka Açma  
**Durum:** Blocked  
**Owner:** Burak Şimşek  
**Reviewer:** Alp Kılıç  
**Verifier:** Arden Olgundemir  
**Depends on:** `CASE-BUILD-01`  
**Blocks:** Sonraki vaka formu/server dilimi

## Kullanıcı sonucu

Vaka formunun normal, hatalı, klavye ve mobil yolları kanıtlanmış olur.

## Teslim

- Acceptance → test eşleştirme tablosu.
- Eksik alan, sınır değer, loading ve submit-error testleri.
- Keyboard/focus ve 375 px kontrolü.
- Gerekirse küçük test/a11y düzeltmeleri.
- Bilinen sınırlar ve sonraki taska handoff.

## Acceptance criteria

- [ ] `CASE-BUILD-01` Done ve handoff edilmiş.
- [ ] Her contract maddesi en az bir gözlenebilir senaryoya bağlı.
- [ ] Normal ve invalid/error yolları çalıştırılmış.
- [ ] Klavye, focus ve 375 px kanıtı mevcut.
- [ ] Başarısız kontrol varsa açıkça Fail yazılmış.

## Bitiş kanıtı

- Test tablosu ve çıktılar.
- Komutlar ve exit codelar.
- Ekran kanıtı.
- Reviewer ve Verifier kararları.
