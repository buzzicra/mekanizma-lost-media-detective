# CASE-CONTRACT-01 - Vaka formu contractı

**Pod:** Pod 1 - Keşif ve Vaka Açma  
**Durum:** Ready / ilk aktif task  
**Owner:** Arden Olgundemir  
**Reviewer:** Alp Kılıç  
**Verifier:** Burak Şimşek  
**Depends on:** Yok  
**Blocks:** `CASE-BUILD-01`

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
