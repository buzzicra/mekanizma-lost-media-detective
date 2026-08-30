# İlk dikey dilim durum takibi

**Snapshot:** 30 Ağustos 2026
**Aktif düzen:** 2 ürün hattı, 3 aktif katılımcı + Pod 1 maintainer devralması, 6 task
**Uygulama kodu:** Henüz yok; repo doküman ve koordinasyon aşamasında

## Pod 1 - Kanıt Kartı

| Task | Owner | Reviewer | Verifier | Canlı durum |
|---|---|---|---|---|
| [`EVID-CONTRACT-01`](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/5) | Taylan | Batıncan | Cemresu | Done - üç insan katkısı tamamlandı; maintainer addendum eski pod adı, kırık kaynak ve scaffold blockerını düzeltti |
| [`EVID-BUILD-01`](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/6) | `buzzicra` + Codex | Bora | Codex + CI | Ready - ilk adım ortak app scaffold ve gerçek kontrol komutları |
| [`EVID-QUALITY-01`](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/7) | `buzzicra` + Codex | Bora | Codex + CI | Blocked - build bekleniyor |

### Pod 1 sonraki hareket

Pod 1 dağıldı. Taylan, Batıncan ve Cemresu'nun Contract katkıları korunur; yeni görev beklenmez. `buzzicra` + Codex `EVID-BUILD-01` için önce ortak scaffold kararını ve dosya planını çıkarır.

## Pod 2 - Vaka Formu

| Task | Owner | Reviewer | Verifier | Canlı durum |
|---|---|---|---|---|
| [`CASE-CONTRACT-01`](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/2) | Kerim | Maintainer kabulü | Maintainer kabulü | Done - Kerim r1 teslim etti; Bora maintainer kararıyla ilk taskı geçirdi |
| [`CASE-BUILD-01`](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/3) | Emir | Kerim | Burak | Ready - ilk adım repo/scaffold incelemesi ve dosya planı |
| [`CASE-QUALITY-01`](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/4) | Burak | Emir | Kerim | Blocked - build bekleniyor |

### Pod 2 sonraki hareket

Emir `CASE-BUILD-01` için önce kod üretmeden repo/scaffold incelemesi ve dosya planı paylaşır. İçerik dili sabit allowlist değildir; geçerli BCP 47/ISO etiketi olarak ele alınır. Yıl için bu UI diliminde tam sayı ve ters aralık kontrolü yapılır; mutlak ürün sınırı sonraki shared/domain kararına bırakılır.

## Park edilen hat

`REPORT-CONTRACT-01`, `REPORT-BUILD-01` ve `REPORT-QUALITY-01` güncel iki-pod pilotunun dışındadır. Emir'in contract çalışması ve Burak'ın test edilebilirlik yorumu issue geçmişinde korunur. Bu hat Bora yeni bir dönem açmadan ilerlemez.

## Task geçiş şartı

```text
Owner teslimi
-> İnsan Reviewer kararı
-> İnsan Verifier kanıtı
-> Pod Lead issue/PR linkini Bora'ya iletir
-> Bora + Codex son kanıt kontrolü
-> Sonraki task Ready
```

Pod 2 normal insan kapılarını korur. Pod 1 devralmasında istisna açıkça kaydedilir: Codex uygulama/otomatik kanıt üretir, Bora nihai kabul verir.
