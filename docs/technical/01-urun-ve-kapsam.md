# 01 — Ürün ve Kapsam

## 1. Problem

İnsanlar yıllar önce gördükleri bir video, reklam, oyun, internet sitesi, ses kaydı, çizgi film, görsel veya başka bir medya içeriğinin adını hatırlamayabilir. Ellerinde başlık veya URL değil; sahne, dönem, dil, platform, renk, söz, karakter veya his gibi dağınık parçalar vardır.

Bugünkü çözüm çoğunlukla forumlarda serbest metin açmak ve yorumları takip etmektir. Sonuçlar şu nedenlerle kaybolur:

- başlangıç mesajı kritik ayrıntıları içermez;
- aynı aday tekrar tekrar önerilir;
- elenen adayların neden elendiği kalıcı değildir;
- çözüm, uzun yorum zincirinde gömülür;
- yalnız bağlantı bırakılır ve bağlantı zamanla ölür;
- vaka çözülse bile yapılandırılmış biçimde işaretlenmez;
- benzer vakalar birbirini bulamaz.

Lost Media Detective bu problemi forum gibi daha çok konuşma üreterek değil, araştırma sürecini yapılandırarak çözer.

## 2. Hedef kullanıcılar

### Birincil: arayan kişi

Bir içeriği hatırlıyor fakat adını veya kaynağını bilmiyor. Teknik araştırma bilgisi olmak zorunda değil. Aktivasyon anı: arama yaptıktan sonra benzer vakayı bulması veya geçerli bir vaka yayınlaması.

### İkincil: araştırmacı

Başkalarının vakalarına aday ve kaynak ekleyen gönüllü. Değeri: daha önce denenmiş adayları görür, çalışmayı tekrar etmez, katkısı çözüme bağlanır.

### Operasyonel: moderatör

Raporları, kişisel veri riskini, spam'i, kötüye kullanımı ve vaka birleştirmelerini yönetir. Çözüm üzerinde yalnız istisnai durumda vaka sahibi yerine karar verir.

## 3. Jobs to Be Done

> “Aklımda kalan birkaç ayrıntıdan yola çıkarak içeriği bulmak, daha önce denenmiş yanlış adayları tekrar denememek ve bulduğumuz cevabın neden doğru olduğunu kaynaklarıyla görmek istiyorum.”

## 4. Ürün ilkeleri

1. **Önce ara, sonra vaka aç.** Yinelenen içerik üretimini azaltır.
2. **Kaynak yoksa kanıt yok.** Bağlantısız tahmin, kanıt kartı sayılmaz.
3. **Elendi bilgisi de değerlidir.** Elenen kayıt silinmez; gerekçesi görünür.
4. **Çözüm görünür olmalıdır.** Doğrulanmış cevap sayfanın başında ve kalıcıdır.
5. **Kişisel veri araştırma girdisi değildir.** Kayıp kişi veya doxxing kullanımına izin verilmez.
6. **AI yardımcı olabilir, otorite olamaz.** v0.1 AI'sız değer üretir.
7. **Açık kaynak kod, açık kullanıcı verisi demek değildir.** E-posta ve taslaklar korunur.

## 5. Ana kullanıcı yolculuğu

### 5.1 Arama ve benzer vaka

1. Kullanıcı hatırladığı kelimeleri arar.
2. Medya türü, dil, ülke/platform ve tahmini yıl filtrelerini seçebilir.
3. Sonuçlar açıklanabilir eşleşme sinyalleriyle listelenir: başlık, metin, yıl veya etiket benzerliği.
4. Kullanıcı benzer vakayı açar.
5. Uygun vaka yoksa “Yeni vaka oluştur” yoluna geçer.

Arama hesap gerektirmez. Kullanıcının sorgusu loglarda ham ve süresiz tutulmaz.

### 5.2 Vaka oluşturma

1. Giriş yapmamış kullanıcı kimlik doğrulamaya yönlendirilir; form girdisi tarayıcıda geçici korunur.
2. Kullanıcı medya türünü seçer.
3. Ortak zorunlu alanlar gösterilir.
4. Medya türüne özel isteğe bağlı alanlar açılır.
5. Yayınlamadan önce benzer vakalar tekrar gösterilir.
6. Kullanıcı eşleşme yoksa devam eder.
7. Taslak kaydedilir veya vaka yayınlanır.

### 5.3 Kanıt ekleme

1. Araştırmacı bir vakayı açar.
2. Daha önce denenmiş adayları okur.
3. İddia, kaynak URL'si ve kısa gerekçe girer.
4. İsteğe bağlı kanıt görseli ekler.
5. Kart `Yeni` durumunda yayınlanır.
6. Vaka sahibi veya moderatör kartı `Olası`, `Elendi` ya da `Doğrulandı` olarak sınıflandırır.

### 5.4 Çözüm

1. Vaka sahibi güçlü adayı seçer.
2. Nihai içerik adı, çözüm gerekçesi ve doğrulayıcı kaynak girilir.
3. Vaka `Çözüldü` olur.
4. Çözüm özeti public sayfanın üstünde görünür.
5. İlgili katkı sahiplerine uygulama içi bildirim gider.
6. Vaka sahibi yoksa moderatör audit kaydıyla çözebilir veya çözümü geri alabilir.

## 6. Bilgi mimarisi

### Public

- Ana sayfa ve arama
- Arama sonuçları
- Vaka detay sayfası
- Çözülmüş vakalar
- Proje hakkında, kullanım kuralları, gizlilik, katkı ve kaynak kodu

### Giriş gerekli

- Vaka oluşturma/düzenleme
- Kanıt ekleme/düzenleme
- Kanıt değerlendirme
- Vaka çözme
- Bildirimler
- Profil ve kendi katkıları
- İçerik raporlama

### Moderatör

- Rapor kuyruğu
- İçerik redaksiyonu/soft delete
- Yinelenen vaka birleştirme
- Çözüm müdahalesi
- Audit geçmişi

## 7. Vaka formu

### Zorunlu ortak alanlar

| Alan | Kural |
|---|---|
| Başlık | 12–120 karakter; PII uyarısı; çözüm adını bilmeyi gerektirmez |
| Medya türü | Video, ses, görsel, oyun, web sitesi, reklam, film/dizi, kitap/dergi, diğer |
| Vaka dili | ISO dil etiketi; arayüz dilinden bağımsız |
| Hatırlanan ayrıntı | 80–5.000 karakter |
| Nerede görüldü? | Platform/kanal/mekân; 2–200 karakter |
| Tahmini dönem | Yıl aralığı veya “bilmiyorum” |
| Önceki aramalar | “Yok” seçeneği dahil; denenmiş kelime/aday özeti |
| Kullanım onayı | Kayıp kişi olmadığını ve üçüncü kişi özel verisi paylaşmadığını onaylar |

### İsteğe bağlı ortak alanlar

- Ülke/bölge
- Hatırlanan söz veya ses
- Görsel özellikler
- Karakter, nesne veya olay
- İçeriğin muhtemel yayın dönemi
- İlişkili URL veya ekran görüntüsü

### Medya türüne özel örnekler

| Tür | Alan örnekleri |
|---|---|
| Video/film | süre, animasyon/canlı çekim, sahne, kanal/platform |
| Ses/müzik | vokal, enstrüman, tempo, söz parçası, radyo/platform |
| Oyun | platform, kamera açısı, grafik tarzı, oynanış mekaniği |
| Web sitesi | yaklaşık domain, tasarım, etkileşim, erişim yılı |
| Reklam | marka kategorisi, slogan parçası, mecra, ülke |
| Görsel | renk, kompozisyon, karakter/nesne, görüldüğü yer |

Tür özelindeki alanlar `media_specific_details` içinde sürümlü JSON olarak tutulur. Yeni alan için tablo yapısı değiştirilmez; uygulama şeması ve form sürümü güncellenir.

## 8. Durum makineleri

### Vaka

```text
OPEN ──ilk nitelikli kanıt──> RESEARCHING
OPEN ──sahip/mod seçimi─────> STRONG_CANDIDATE
RESEARCHING ────────────────> STRONG_CANDIDATE
STRONG_CANDIDATE ─doğrulama> SOLVED
STRONG_CANDIDATE ─reddet────> RESEARCHING
SOLVED ─mod geri alma───────> RESEARCHING
```

`MERGED` kullanıcı akışındaki bir araştırma durumu değil, sistem durumudur. Birleştirilmiş URL canonical vakaya kalıcı yönlenir.

### Kanıt

```text
NEW ───────> POSSIBLE
NEW ───────> REJECTED
POSSIBLE ──> VERIFIED
POSSIBLE ──> REJECTED
REJECTED ──yeni gerekçe────> POSSIBLE
VERIFIED ──mod geri alma───> POSSIBLE
```

Her durum değişimi aktör, zaman, önceki durum, yeni durum ve gerekçeyle kaydedilir.

## 9. Yetki matrisi

| İşlem | Ziyaretçi | Üye | İçerik sahibi | Moderatör |
|---|---:|---:|---:|---:|
| Public vaka ara/oku | Evet | Evet | Evet | Evet |
| Taslak oku | Hayır | Yalnız kendi | Evet | Gerektiğinde |
| Vaka oluştur | Hayır | Evet | Evet | Evet |
| Vaka düzenle | Hayır | Hayır | Evet | Redaksiyon |
| Kanıt ekle | Hayır | Evet | Evet | Evet |
| Kendi kanıt metnini düzenle | Hayır | Kendi kaydı | Kendi kaydı | Evet |
| Kanıt durumunu belirle | Hayır | Hayır | Evet | Evet |
| Vakayı çöz | Hayır | Hayır | Evet | Fallback |
| Raporla | Hayır | Evet | Evet | Evet |
| Vakaları birleştir | Hayır | Hayır | Hayır | Evet |
| Soft delete/redaksiyon | Hayır | Hayır | Kendi taslağı | Evet |

## 10. Dil ve erişilebilirlik

- Navigasyon, form etiketleri, hata mesajları, e-postalar ve sistem durumları TR/EN sunulur.
- Kullanıcı içeriği otomatik çevrilmez.
- Her vakada içerik dili etiketi zorunludur.
- Form hata özeti ve alan hataları ekran okuyucuyla ilişkilendirilir.
- Tüm ana akışlar klavyeyle tamamlanır.
- Renk tek durum göstergesi olmaz; rozetlerde metin/ikon bulunur.
- Hedef: WCAG 2.2 AA.

## 11. Arama deneyimi

### Sıralama sinyalleri

1. Başlık ve çözüm adında tam/kelime eşleşmesi
2. Hatırlanan ayrıntılarda full-text rank
3. Başlık ve hatırlanan sözlerde trigram benzerliği
4. Medya türü, dil, yıl, ülke/platform örtüşmesi
5. Çözülmüş veya doğrulanmış içeriğin kalite sinyali

Sonuç “AI bunu seçti” gibi açıklanmaz. Arayüz, örneğin “başlık benzer”, “aynı dönem” veya “aynı medya türü” sinyalini gösterebilir.

### Boş sonuç

- Yazım önerisi
- Filtreleri temizleme
- Daha geniş yıl aralığı
- Yeni vaka oluşturma CTA'sı
- Vaka açmadan önce girilen sorguyu formun ayrıntı alanına taşıma

## 12. İçerik ve güven kuralları

- Kayıp kişi, adres, telefon, e-posta, plaka, kullanıcı hesabı takibi veya hedef gösterme yasaktır.
- Bulunan medya dosyası yeniden yüklenmez; yasal kaynak bağlantısı ve araştırma gerekçesi tutulur.
- Kullanıcının yüklediği kanıt görseli için paylaşım hakkı onayı gerekir.
- Dış URL sunucu tarafından otomatik açılmaz/fetch edilmez; v0.1 link önizlemesi yapmaz.
- Çıplak link kanıt sayılmaz; kısa gerekçe zorunludur.
- Rapor nedeni: kişisel veri, taciz/doxxing, spam, telif, zararlı içerik, yanlış kategori, diğer.

## 13. P0 / P1 / P2

### P0 — v0.1 release için zorunlu

- TR/EN arayüz iskeleti
- Google OAuth ve e-posta OTP
- Public arama ve filtreler
- Benzer vaka kontrolü
- Taslak ve public vaka oluşturma
- Vaka liste/detay sayfası
- Kaynaklı kanıt kartı ve durumları
- Vaka çözüm akışı
- Profilin temel katkı görünümü
- Uygulama içi bildirimler
- Raporlama ve temel moderasyon kuyruğu
- Duplicate birleştirme ve canonical yönlendirme
- Güvenli görsel yükleme
- Audit log
- Docker dağıtımı, health check, CI ve temel gözlemlenebilirlik
- README, lisans, katkı, DCO, davranış kuralları ve güvenlik bildirimi

### P1 — v0.2 adayı

- GitHub ile giriş
- Daha ayrıntılı moderasyon otomasyonu
- Gelişmiş kaydedilmiş aramalar
- Kullanıcıların takip ettiği vakalar
- İzinli sağlayıcılardan kontrollü metadata alma
- AI destekli benzerlik/özet; yalnız eval ve açıklanabilir fallback ile

### P2 — sonraki sürümler

- Native mobil istemci
- Federasyon veya bağımsız topluluk örnekleri
- Gelişmiş araştırma koleksiyonları
- İtibar sistemi; kötüye kullanım modeli kanıtlandıktan sonra

## 14. Başarı metrikleri

| Metrik | Tanım | İlk hedef |
|---|---|---:|
| Search-to-match | Arama sonrası mevcut vaka açan oran | Ölçüm baseline'ı |
| Search-to-case | Arama sonrası geçerli vaka yayınlayan oran | Ölçüm baseline'ı |
| Evidence rate | Public vaka başına kaynaklı kanıt | ≥ 1 pilotta |
| Resolution rate | Çözülen public vaka / uygun vaka | Pilot gözlemi |
| Time to first evidence | Vaka yayını ile ilk geçerli kanıt arası | Pilot gözlemi |
| Duplicate avoidance | Benzer sonuçtan dolayı vazgeçilen yeni vaka | İzlenir |
| Search p95 | Arama uçtan uca sunucu süresi | < 1 sn hedef |
| Abuse response | Kritik PII raporunun ele alınma süresi | Operasyon hedefi belirlenir |

Baseline olmadan yüzdelik ürün iddiası yapılmaz. İlk pilotun amacı ölçüm tabanı oluşturmaktır.

## 15. Kabul senaryoları

1. Ziyaretçi Türkçe bir sorguyla public vakaları arar ve sonuç açar.
2. Sonuç bulamayan kişi Google veya e-posta koduyla giriş yapar; form girdisini kaybetmez.
3. Kullanıcı yönlendirmeli formu doldurur, benzer vakaları görür, yine de özgün vakayı yayınlar.
4. Başka üye kaynak URL'si ve gerekçeyle kanıt ekler; çıplak URL reddedilir.
5. Vaka sahibi kanıtı olası yapar, sonra doğrular ve vakayı çözer.
6. Bir kullanıcı PII içeren içeriği raporlar; moderatör redakte eder; audit kaydı oluşur.
7. Moderatör yinelenen vakayı eski vakaya birleştirir; eski URL canonical vakaya yönlenir; katkılar kaybolmaz.
8. Yetkisiz kullanıcı başka kişinin taslağını okuyamaz veya değiştiremez.
9. Geçersiz, büyük veya sahte MIME'lı dosya yüklenmez.
10. Dış kaynak erişilemez hâle geldiğinde kanıt gerekçesi ve kaynak URL geçmişi kaybolmaz.

