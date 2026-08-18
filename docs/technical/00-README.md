# Lost Media Detective — Proje A Teknik Kaynak Paketi

**Belge durumu:** Uygulama öncesi teknik kaynak · v0.1  
**Son güncelleme:** 17 Ağustos 2026  
**Ekip:** 9 katılımcı + Bora (baş maintainer ve entegrasyon sorumlusu)  
**Lisans hedefi:** AGPL-3.0  
**Dağıtım hedefi:** Provider-neutral Docker; ilk ortam Railway veya Render

## 1. Bu paket ne işe yarar?

Bu klasör Proje A'nın tek teknik kaynak paketidir. Ürün kapsamı, mimari, veri modeli, servis kontratları, pod sahipliği, iş sırası, kalite kapıları ve ekip şablonları burada tanımlanır.

Eski workshop belgelerindeki 17 kişi, 5 pod, Vercel, üç durumlu vaka modeli veya sabit workshop takvimi varsayımları bu paket için geçerli değildir. Güncel kararlar bu paketteki belgelerdir.

## 2. Okuma sırası

1. [Ürün ve kapsam](./01-urun-ve-kapsam.md)
2. [Teknik mimari](./02-teknik-mimari.md)
3. [Veri modeli](./03-veri-modeli.md)
4. [API ve iş akışları](./04-api-ve-is-akislari.md)
5. [Pod planı ve bağımlılıklar](./05-pod-plani-ve-bagimliliklar.md)
6. [Kalite, güvenlik ve release](./06-kalite-guvenlik-release.md)
7. [Açık kaynak yönetişimi](./07-acik-kaynak-yonetisim.md)
8. [Uygulama planı ve task DAG](./08-uygulama-plani-task-dag.md)
9. [Builder şablonları](./templates/)

## 3. Tek cümlelik ürün tanımı

Adını veya kaynağını hatırlamadığı bir medya içeriğini arayan kişi, hatırladığı ayrıntılarla yapılandırılmış bir vaka açar; topluluk kaynak bağlantılı kanıt kartları ekler; elenen, olası ve doğrulanan adaylar kalıcı bir araştırma kaydına dönüşür.

## 4. Kilit kararlar

| Alan | Karar |
|---|---|
| Problem | Kişinin gördüğü/duyduğu fakat adını bilmediği içeriği bulması |
| Kapsam dışı ayrım | Bilinen ama fiziksel olarak kayıp medya arşivi değil |
| Ana akış | Ara → benzer vakaları gör → yoksa yönlendirmeli vaka aç → kanıt ekle → çözümü doğrula |
| Vaka durumları | Açık → Araştırılıyor → Güçlü aday → Çözüldü |
| Kanıt durumları | Yeni → Olası / Elendi → Doğrulandı |
| Kimlik | Google OAuth + tek kullanımlık e-posta kodu |
| Görünürlük | Yayındaki vakalar açık ve indekslenebilir; taslaklar özel |
| Dil | Arayüz TR/EN; vaka kendi dilinde ve dil etiketi zorunlu |
| Arama | PostgreSQL full-text + `pg_trgm` + filtreler |
| AI | v0.1'de AI arama, özetleme veya otomatik web tarama yok |
| Dosya | Kanıt URL'si + isteğe bağlı JPG/PNG/WebP, en çok 5 MB |
| Bildirim | Uygulama içi; e-posta yalnız kimlik doğrulama kodu için |
| Moderasyon | Hemen yayın + rapor + kuyruk + audit log + soft delete |
| Hosting | Next.js standalone Docker; Vercel bağımlılığı yok |
| Açık kaynak | AGPL-3.0 + her committe DCO sign-off |
| Ekip | 3 pod × 3 kişi; Bora ortak mimari, güvenlik ve entegrasyon |
| Toplantı | Her pod Bora ile ayrı gün/saat; toplantılar üretim ve entegrasyon odaklı |

## 5. Kaynak doğruluğu sırası

Çelişki olduğunda şu sıra uygulanır:

1. Güvenlik ve veri koruma kuralları
2. `03-veri-modeli.md` içindeki enum ve veri kontratları
3. `04-api-ve-is-akislari.md` içindeki yetki ve iş akışı kuralları
4. `01-urun-ve-kapsam.md` içindeki ürün kapsamı
5. Task/PR içeriği
6. Eski workshop notları

Kontrat değişikliği tek pod kararıyla yapılmaz. Karar kaydı açılır; etkilenen podlar ve Bora onaylar; veri modeli, API ve task DAG aynı PR'da güncellenir.

## 6. Sürüm tanımı

### Teknik release başarısı

Bir gerçek vaka şu hattı uçtan uca tamamlar:

`arama → vaka oluşturma → kaynaklı kanıt → kanıt değerlendirmesi → çözüm doğrulama → açık çözüm sayfası`

Ana akış testleri, typecheck, lint, build, erişilebilirlik ve güvenlik kapıları geçmeden v0.1 etiketi basılmaz.

### Dış deney başarısı

En az bir gerçek vaka, topluluğun eklediği kaynaklı kanıtla çözülür. Bu ürünün dış dünyadaki etki ölçütüdür; teknik release kapısından ayrı raporlanır.

## 7. Net kapsam dışı maddeler

- Kayıp kişi arama, yüz tanıma veya gerçek kişi takibi
- Telifli bulunan içeriği platformda barındırma
- Otomatik scraping, arşiv tarama veya link önizleme fetch'i
- AI/LLM zorunlu özellikleri
- Mesajlaşma, canlı sohbet, puan, rozet, ödül ve sıralama
- Native mobil uygulama
- Proje B'nin agent çıktı doğrulama özellikleri
- Ücretli üyelik ve ödeme

## 8. Terimler

| Terim | Anlam |
|---|---|
| Vaka | Kullanıcının aradığı içeriğe ait yapılandırılmış araştırma kaydı |
| Kanıt kartı | Bir aday iddia, kaynak URL'si, gerekçe ve durumdan oluşan kayıt |
| Çözüm | Vaka sahibinin veya moderatörün doğruladığı nihai içerik kimliği |
| Canonical vaka | Yinelenen vakaların bağlandığı ana kayıt |
| Pod | Uçtan uca bir ürün diliminin sahibi üç kişilik ekip |
| Owner | Task sonucundan tek sorumlu kişi |
| Reviewer | Diff ve kontratı inceleyen kişi |
| Verifier | Kabul kriterlerini kullanıcı gibi deneyip kanıtlayan kişi |
| Release gate | Sürümün çıkabilmesi için geçmesi gereken doğrulama kümesi |

## 9. Resmî teknik referanslar

- [Next.js deployment](https://nextjs.org/docs/app/getting-started/deploying)
- [Next.js self-hosting](https://nextjs.org/docs/app/guides/self-hosting)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Google OAuth](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [PostgreSQL full-text search](https://www.postgresql.org/docs/current/datatype-textsearch.html)
- [PostgreSQL text search ranking](https://www.postgresql.org/docs/current/textsearch-controls.html)
- [`pg_trgm`](https://www.postgresql.org/docs/17/pgtrgm.html)
- [OAuth 2.0 Security Best Current Practice](https://www.rfc-editor.org/rfc/rfc9700.html)
- [NIST SP 800-63B](https://pages.nist.gov/800-63-4/sp800-63b.html)
- [AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.html)
- [Developer Certificate of Origin](https://developercertificate.org/)

