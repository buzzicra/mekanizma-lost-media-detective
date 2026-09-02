# CASE-CONTRACT-01 - Vaka formu contractı

**Pod:** Pod 2 - Vaka Formu
**Durum:** Done - 30 Ağustos 2026 maintainer kabulü
**Owner:** Kerim Taşçı
**Reviewer:** Emir Kaan Çatı (`@CodeAThing`)
**Verifier:** Burak Şimşek
**Depends on:** Yok
**Blocks:** `FINAL-CASE-01`, `FINAL-CASE-02`

## Kullanıcı sonucu

Kullanıcı, hatırladığı içerik için geçerli vaka formunu anlayarak doldurabilir.

## Teslim

- Kullanıcı sonucu, scope ve non-goallar.
- Alan/validation tablosu: başlık, medya türü, dil, hatırlanan ayrıntı, görüldüğü yer, dönem, önceki aramalar ve güvenlik onayı.
- Başlangıç, kısmi, invalid, gönderiliyor, hata ve geçerli-veri durumları.
- UI-local input/output type taslağı; DB şeması değil.
- Build dosya sınırı ve açık karar/blocker listesi.

## Acceptance criteria

- [ ] Builder yoruma ihtiyaç duymadan form alanlarını ve durumlarını anlayabiliyor.
- [ ] Her alanın required/optional durumu, sınırı ve hata davranışı yazılı.
- [ ] Normal ve invalid-input senaryoları gözlenebilir.
- [ ] Auth, API, DB, autosave, publish ve benzer-vaka sorgusu açıkça kapsam dışı.
- [ ] Reviewer uygulanabilirlik, Verifier test edilebilirlik kararını issue'ya yazdı.

## Bitiş kanıtı

- Contract linki veya issue içeriği.
- Reviewer kararı.
- Verifier kararı.
- Açık karar ve blocker listesi.

## Maintainer kabul notu

- Kerim'in r1 Owner teslimi ilk UI dilimi için kabul edildi.
- `contentLanguage` sabit ve eksik bir allowlist yerine geçerli BCP 47/ISO dil etiketi olarak ele alınır.
- Bu UI diliminde yıl girdileri tam sayı ve `yearTo >= yearFrom` kuralıyla doğrulanır. Mutlak alt/üst yıl sınırı shared/domain kararıdır.
- App scaffold ve gerçek kontrol komutları PR #13 ile tamamlandı; güncel kod geçişi `FINAL-CASE-01` ile başlar.
