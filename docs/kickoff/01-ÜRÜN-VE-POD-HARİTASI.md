# Ürün ve Pod Haritası

## Problem

Bir içeriği hatırlayıp adını hatırlamamak kolay. Genellikle elimizde parçalar var: yaklaşık yıl, bir replik, görüntü, platform, karakter, ses veya reklamın geçtiği yer. Bugünkü arama araçları bu dağınık hatırayı düzgün bir araştırma vakasına çevirmiyor.

Lost Media Detective şu döngüyü kuruyor:

```text
Hatıra → Vaka → Kaynaklı kanıt → Değerlendirme → Çözüm
```

Temel kurallar:

- Kaynak yoksa kayıt kanıt sayılmaz.
- Elenen aday silinmez; neden elendiği görünür.
- AI yardımcı olabilir, son kararı vermez.
- Kişisel veri araştırma girdisi değildir.
- Açık kaynak kod, açık kullanıcı verisi demek değildir.

## Pod 1 — Keşif ve vaka açma

Kullanıcı sonucu:

> “Hatırladığım şeyi aradım. Benzer vaka bulamayınca geçerli bir vaka açabildim.”

İlk dilim: yönlendirmeli vaka formu.

Bu podun ileride sahip olacağı alanlar:

- arama ve filtreler;
- benzer vaka kontrolü;
- vaka formu ve validation;
- taslak;
- yayınlama öncesi güvenlik onayı.

## Pod 2 — Kanıt ve çözüm

Kullanıcı sonucu:

> “Vakaya kaynak ve gerekçeyle aday ekledim; adayın durumunu gördüm; doğru aday çözüme bağlandı.”

İlk dilim: kaynaklı kanıt kartı.

Bu podun ileride sahip olacağı alanlar:

- public vaka detayı;
- kanıt ekleme ve düzenleme;
- Yeni, Olası, Elendi, Doğrulandı durumları;
- kanıt değerlendirme;
- çözüm özeti.

## Pod 3 — Güven ve süreklilik

Kullanıcı sonucu:

> “Riskli içeriği raporladım; katkımı ve sonucu takip edebildim.”

İlk dilim: içerik raporlama formu.

Bu podun ileride sahip olacağı alanlar:

- profil ve katkılar;
- bildirimler;
- içerik raporlama;
- moderasyon kuyruğu;
- audit geçmişi;
- yinelenen vaka birleştirme.

## Neden frontend/backend diye bölünmedik?

Bir pod yalnız ekran, başka pod yalnız API yaparsa kimse kullanıcı sonucunun tamamını sahiplenmez. Burada pod sınırı teknoloji değil kullanıcı işidir. İlerleyen tasklarda aynı pod kendi alanının UI, doğrulama, server davranışı, testi ve dokümantasyonunu birlikte teslim eder.

