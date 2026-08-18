# 06 — Kalite, Güvenlik ve Release

## 1. Release ilkesi

“Kod yazıldı” release değildir. v0.1 ancak gerçek ana akış, güvenlik sınırı, erişilebilirlik, performans, operasyon ve dokümantasyon birlikte doğrulanınca çıkar.

## 2. Test katmanları

| Katman | Ne test eder? | Örnek |
|---|---|---|
| Unit | Saf domain kuralı | Durum geçişi, score, slug, permission |
| Component | UI davranışı ve a11y | Form hatası, rozet, dialog focus |
| Integration | DB, RLS, repository, transaction | Yetkisiz taslak erişimi, solve atomikliği |
| Contract | Route/action input-output | 400/401/403/404/409 ve error envelope |
| E2E | Kullanıcı yolculuğu | Ara → vaka aç → kanıt → çöz |
| Security | Kötü niyetli input/yetki | IDOR, upload spoof, URL şeması |
| Performance | Arama ve public sayfa | 10k vaka p95, Core Web Vitals |
| Recovery | Backup/restore ve rollback | Migration sonrası geri dönüş |

## 3. Kritik E2E senaryoları

### E2E-01 — Arama ve vaka yayınlama

1. Ziyaretçi arama yapar.
2. Filtre uygular.
3. Sonuç bulamaz; vaka açmaya geçer.
4. Giriş yapar; form girdisi korunur.
5. Zorunlu alan hatasını görür.
6. Benzer vaka kontrolünü görür.
7. Public vaka yayınlar.
8. Çıkış yaptıktan sonra vaka sayfası açılır.

### E2E-02 — Kanıt ve çözüm

1. İkinci üye public vakayı açar.
2. Çıplak URL göndermeye çalışır; reddedilir.
3. Kaynak + gerekçeyle kanıt ekler.
4. Vaka sahibi bildirim alır.
5. Kanıtı olası, sonra doğrulanmış yapar.
6. Vakayı çözer.
7. Public sayfada çözüm özeti görünür.

### E2E-03 — Rapor ve moderasyon

1. Üye PII riski raporlar.
2. Moderator MFA ile kuyruğa girer.
3. İçeriği redakte eder.
4. Rapor çözülür.
5. Audit event oluşur.
6. Public cache eski PII içeriğini göstermez.

### E2E-04 — Duplicate merge

1. Moderator iki vakayı karşılaştırır.
2. Preview veri etkisini gösterir.
3. Eski vaka canonical seçilir.
4. Merge çalışır; katkılar korunur.
5. Eski URL `308` yönlenir.
6. Arama tek canonical sonucu gösterir.

## 4. Güvenlik modeli

### Tehdit yüzeyi

- auth/session ele geçirme;
- IDOR ve başka kullanıcının taslak/kanıtını değiştirme;
- spam ve otomasyon;
- doxxing/kişisel veri yayınlama;
- zararlı veya sahte görsel upload;
- dış URL üzerinden SSRF/open redirect/XSS;
- stored XSS içeren vaka/kanıt metni;
- service role veya provider secret sızıntısı;
- moderation yetkisinin kötüye kullanımı;
- merge/solve transactionında veri kaybı;
- arama query'siyle pahalı DB tüketimi.

### Temel kontroller

| Risk | Kontrol |
|---|---|
| IDOR | Her domain işleminde actor + resource ownership/role |
| XSS | Framework escaping; rich HTML yok; URL allowlist; sanitize edilmiş render |
| SQL injection | Parametreli query/query builder; raw input birleştirme yok |
| SSRF | v0.1 kullanıcı URL'sini server fetch etmez |
| Open redirect | Sabit internal redirect allowlist |
| CSRF | SameSite cookie + framework origin kontrolü + mutasyon koruması |
| Session | Secure/HttpOnly cookie, rotation, kısa risk penceresi |
| Moderator takeover | MFA/passkey, recent-auth, audit |
| Secret leak | Server-only env; client bundle/CI log kontrolü |
| Spam | Katmanlı rate limit, idempotency, rapor/ban |
| Upload | Boyut, file signature, decode/re-encode, EXIF strip, random key |
| PII | Form uyarısı, rapor önceliği, redaksiyon, cache purge |
| Data loss | Transaction, soft delete, merge snapshot, backup/restore |
| DoS search | Min query, max limit, timeout, index, rate limit |

## 5. Auth doğrulama kapısı

- OAuth redirect allowlist local/preview/prod için ayrı.
- PKCE akışı network testinde doğrulanır.
- OTP 10 dakika hedefi, tek kullanım ve deneme limiti test edilir.
- Account enumeration mesajı üretilmez.
- Login sonrası session ID/token rotation doğrulanır.
- Logout cookie/session'ı geçersiz kılar.
- Disabled/suspended kullanıcı mutasyon yapamaz.
- Moderator route hem UI hem server'da role kontrol eder.
- MFA olmadan kritik moderation komutu reddedilir.

## 6. Upload doğrulama kapısı

Test dosyaları:

- geçerli küçük JPG/PNG/WebP;
- 5 MB sınır altı/üstü;
- `.jpg` uzantılı başka dosya;
- yanlış MIME;
- aşırı piksel boyutlu image bomb;
- EXIF GPS içeren görsel;
- bozuk/truncated image;
- aynı object/finalize tekrar isteği;
- başka kullanıcının upload intent'i;
- süresi dolmuş intent.

Kabul edilen dosyada EXIF/GPS kalmadığı byte/metadata kontrolüyle kanıtlanır.

## 7. PII ve içerik güvenliği

### Önleyici

- Form açıkça “kayıp kişi ve üçüncü kişi özel verisi girmeyin” der.
- Telefon/e-posta/adres gibi yüksek güvenli patternlerde publish öncesi uyarı/engelleme.
- Kullanıcıya redakte ederek devam yolu.
- Public slug'a hassas metin taşınmaması.

### Reaktif

- PII/doxxing raporu yüksek priority.
- Moderator redaksiyonu tüm görünüm ve cache'te etkili.
- Original değer yalnız gerekli, erişimi sınırlı audit snapshot'ta; mümkünse hash/redakte.
- Kritik olay için operasyon runbook'u ve sorumlu kişi.

Otomatik filtre yanılabilir; tek başına güvenlik garantisi değildir.

## 8. Erişilebilirlik kapısı

- WCAG 2.2 AA hedefi.
- 375, 768, 1280+ genişliklerde ana akış.
- Klavyeyle login sonrası arama, form, evidence, solve, report.
- Görünür focus; focus trap yalnız dialog içinde.
- Form error summary + alan ilişkisi.
- Loading durumu screen-reader duyurusu; gereksiz canlı bölge yok.
- Status renk yanında metin/ikon.
- Kontrast otomatik + manuel kontrol.
- Reduced motion desteği.
- 200% zoom'da yatay zorunlu scroll yok (uygun veri tabloları hariç).

Otomatik axe taraması manuel klavye ve screen-reader smoke testinin yerine geçmez.

## 9. Performans hedefleri

| Alan | Hedef |
|---|---:|
| Search p95 | < 1.000 ms, 10.000 vaka |
| Public case server response p95 | < 800 ms başlangıç hedefi |
| LCP | < 2,5 sn hedef |
| CLS | < 0,1 |
| INP | < 200 ms hedef |
| JS | Ana public akışta gereksiz client bundle yok |
| Upload | 5 MB limit; ilerleme ve timeout mesajı |

Ölçüm cihazı, bağlantı ve veri seti rapora yazılır. Local güçlü makine sonucu production iddiası olarak sunulmaz.

## 10. SEO/GEO kapısı

- Her public vaka için benzersiz title/description ve canonical.
- Draft, hidden, merged source ve moderation sayfaları `noindex`.
- Merge eski URL → canonical vaka.
- `sitemap.xml` yalnız public aktif vakalar.
- `robots.txt` private/moderation yollarını indeks dışı tutar; güvenlik kontrolü yerine kullanılmaz.
- Çözülmüş vaka sayfasında çözüm, kaynak ve tarih görünür metindir.
- Structured data yalnız görünür içerikle tam uyumlu olduğunda eklenir; unsupported rich result iddiası yok.
- Kaynak bağlantılarında güvenli external-link özellikleri.
- Kaldırılmış içerik için uygun `404/410` kararı ve tombstone.
- Search Console/Bing doğrulaması dış hesap erişimi varsa yapılır; yoksa external gate olarak belgelenir.

## 11. CI kapıları

PR'da önerilen sıra:

```text
format/check
→ lint
→ typecheck
→ unit/component
→ integration + DB/RLS
→ build
→ E2E smoke
→ accessibility smoke
→ dependency/secret/SAST scan
→ container build
```

Main/release'te ek:

- tüm E2E;
- migration temiz DB testi;
- Docker health testi;
- search performance smoke;
- image upload security seti;
- production env-name validation;
- SBOM/dependency raporu;
- backup restore smoke veya son doğrulanmış restore kanıtı.

## 12. Operasyon

### Health

- Liveness yalnız process döngüsünü ölçer.
- Readiness DB ve gerekli provider erişimini kısa timeoutla test eder.
- Health response secret, DB URL veya provider detayını göstermez.

### Backup

- Migration/release öncesi taze backup.
- Günlük DB backup hedefi; provider planına göre doğrulanır.
- Storage obje envanteri ve DB attachment ilişkisi birlikte düşünülür.
- Restore ayrı preview ortamında periyodik test edilir.
- “Backup var” restore kanıtı olmadan yeterli değildir.

### Incident minimumu

1. Etki ve veri sınıfını belirle.
2. Gerekirse yazma trafiğini sınırla.
3. Secret şüphesinde rotate et; değeri loglama.
4. PII cache'i purge et.
5. Audit/request ID ile kapsam çıkar.
6. Düzeltme ve postmortem kaydı oluştur.

## 13. Release stratejisi

### Feature freeze

Release candidate kapısından sonra yeni özellik alınmaz. Yalnız:

- P0/P1 bug;
- auth/güvenlik;
- ana akış UX kırığı;
- veri bütünlüğü;
- ciddi erişilebilirlik/performance;
- release dokümanı.

### Migration sırası

1. Taze backup doğrula.
2. Backward-compatible migration çalıştır.
3. Migration check ve yeni/eskı kod uyumunu doğrula.
4. Container deploy et.
5. Readiness + smoke test.
6. Gerekirse feature flag aç.
7. Metrics/log/error izleme.

### Rollback

- App image önceki immutable tag'e döner.
- Destructive migration release ile aynı anda yapılmaz.
- Yeni kolon/tablolar önceki kodu kırmamalıdır.
- Veri mutationı geri alınamıyorsa forward-fix ve snapshot prosedürü önceden yazılır.

## 14. v0.1 release checklist

### Ürün

- [ ] Arama → vaka → kanıt → çözüm gerçek veriyle çalışıyor
- [ ] TR/EN system UI tamam
- [ ] Duplicate ve report akışı çalışıyor
- [ ] En az bir public gerçek pilot vaka var; rıza/provenance belli

### Güvenlik

- [ ] Auth/session/role negatif testleri geçti
- [ ] Moderator MFA/recent-auth geçti
- [ ] Upload güvenlik seti geçti
- [ ] Service role client bundle ve loglarda yok
- [ ] PII rapor/redaksiyon/cache purge denendi
- [ ] Dependency, secret ve SAST taraması incelendi

### Kalite

- [ ] Lint/typecheck/tests/build exit 0
- [ ] Ana E2E senaryoları geçti
- [ ] WCAG klavye/axe/manual smoke geçti
- [ ] Search 10k vaka p95 hedefi ölçüldü
- [ ] 375/768/1280+ browser QA yapıldı

### Operasyon

- [ ] Docker non-root başlıyor
- [ ] Liveness/readiness geçiyor
- [ ] Migration preview'da doğrulandı
- [ ] Backup ve restore kanıtı güncel
- [ ] Log/error monitoring PII redaksiyonu doğrulandı
- [ ] Rollback adımları prova edildi

### Açık kaynak

- [ ] AGPL-3.0 LICENSE
- [ ] README clean install ile çalışıyor
- [ ] CONTRIBUTING + DCO + CODE_OF_CONDUCT + SECURITY
- [ ] Source-code link UI'da görünür
- [ ] Release notes, known limitations ve demo kanıtı hazır

## 15. Teknik başarı ile deney başarısını ayırma

Teknik release yukarıdaki kapılarla ekibin kontrolündedir. Bir gerçek vakanın çözülmesi kullanıcı/topluluk katılımına bağlı dış deneydir. Teknik v0.1, dış deney sonucu henüz gelmedi diye sahte çözüm üretmez; dış deney de testler geçmeden “ürün hazır” sayılmaz.

