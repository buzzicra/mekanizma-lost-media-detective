# EVID-BUILD-01 - Kanıt kartı componenti

**Pod:** Pod 1 - Kanıt Kartı
**Durum:** Blocked
**Owner:** Batıncan Kantar
**Reviewer:** Taylan Akgün
**Verifier:** Cemresu Demir
**Depends on:** `EVID-CONTRACT-01`
**Blocks:** `EVID-QUALITY-01`

## Kullanıcı sonucu

Kullanıcı claim, kaynak, gerekçe ve durumu güvenli ve erişilebilir bir kartta görebilir.

## Teslim

- Claim/source/rationale/status componenti.
- Dört durum için metin ve görsel işaret.
- `REJECTED` gerekçe görünürlüğü.
- Güvenli dış link; geçersiz URL link değildir.
- Uzun metin ve 375 px davranışı.
- Fixture ve component testleri.

## Acceptance criteria

- [ ] `EVID-CONTRACT-01` Done ve handoff edilmiş.
- [ ] Dört status doğru metin/görselle gösteriliyor.
- [ ] HTTP(S) link güvenli yeni sekmede açılıyor.
- [ ] Geçersiz URL tıklanabilir değil.
- [ ] Uzun metin ve 375 px görünüm bozulmuyor.
- [ ] Production veri yolunda mock/fake success yok.

## Bitiş kanıtı

- Diff/PR ve dört status ekran kanıtı.
- Test/typecheck/lint komutları ve exit codelar.
- Reviewer kararı.
- Verifier güvenli/geçersiz link sonucu.
