# REPORT-CONTRACT-01 - Rapor formu contractı

**Pod:** Pod 3 - Güven ve Süreklilik  
**Durum:** Ready / ilk aktif task  
**Owner:** Emir Kaan Çatı  
**Reviewer:** Kerim Taşçı  
**Verifier:** Deniz  
**Depends on:** Yok  
**Blocks:** `REPORT-BUILD-01`

## Kullanıcı sonucu

Kullanıcı riskli vaka veya kanıt için neden seçip açıklama yazarak rapor hazırlayabilir.

## Teslim

- Tek hedef contractı: vaka veya kanıt.
- Yedi rapor nedeni ve 10-1.000 karakter detay kuralı.
- Başlangıç, invalid, gönderiliyor, parent-error ve parent-success durumları.
- UI-local input/output type taslağı.
- Dialog başlangıç focusu, Escape ve focus-return davranışı.
- API, auth, permission, rate limit, DB ve moderation kuyruğu non-goalları.

## Acceptance criteria

- [ ] İki hedef aynı anda seçilemiyor.
- [ ] Neden ve detay sınırları açık.
- [ ] Loading/error/success parenttan gelen gerçek durumlar.
- [ ] Dialog klavye/focus davranışı gözlenebilir.
- [ ] Reviewer ve Verifier kararları issue'da.

## Bitiş kanıtı

- Contract ve form-state tablosu.
- Reviewer uygulanabilirlik kararı.
- Verifier test edilebilirlik kararı.
- Açık karar/blocker listesi.
