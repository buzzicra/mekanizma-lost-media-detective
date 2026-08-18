# REPORT-BUILD-01 - Rapor formu componenti

**Pod:** Pod 3 - Güven ve Süreklilik  
**Durum:** Blocked  
**Owner:** Kerim Taşçı  
**Reviewer:** Emir Kaan Çatı  
**Verifier:** Deniz  
**Depends on:** `REPORT-CONTRACT-01`  
**Blocks:** `REPORT-QUALITY-01`

## Kullanıcı sonucu

Kullanıcı rapor nedenini ve detayını erişilebilir form/dialog içinde hazırlayabilir.

## Teslim

- Yedi neden ve 10-1.000 karakter detay alanı.
- Typed `onSubmit`; API/DB çağrısı yok.
- `isSubmitting`, parent error ve parent success durumları.
- Invalid input ve ilk hataya focus.
- Escape/focus return, 375 px ve klavye davranışı.
- Normal + invalid component testleri.

## Acceptance criteria

- [ ] `REPORT-CONTRACT-01` Done ve handoff edilmiş.
- [ ] Fake timeout veya fake success yok.
- [ ] Invalid durumda ilk hataya focus gidiyor.
- [ ] Loading sırasında tekrar submit engelleniyor.
- [ ] Parent error/success ayrı gösteriliyor.
- [ ] Klavye ve 375 px davranışı kullanılabilir.

## Bitiş kanıtı

- Diff/PR ve loading/error/success ekran kanıtı.
- Test/typecheck/lint komutları ve exit codelar.
- Reviewer kararı.
- Verifier keyboard/focus sonucu.
