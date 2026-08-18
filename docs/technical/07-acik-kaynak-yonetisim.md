# 07 — Açık Kaynak Yönetişimi

## 1. Amaç

Bu proje eğitim grubunun kapalı ödevi değil, dışarıdan kurulabilen ve katkı alınabilen açık kaynak üründür. Kod, issue, PR, release ve teknik kararlar mümkün olduğunca public yürür. Kullanıcı e-postaları, taslaklar, credentiallar, özel toplantılar ve yayınlanmamış kişisel bilgiler public değildir.

## 2. Lisans

Hedef lisans: **GNU Affero General Public License v3.0 (AGPL-3.0)**.

Temel operasyonel sonuç:

- Repo kökünde tam `LICENSE` metni bulunur.
- README lisansı açıkça belirtir.
- Ağ üzerinden değiştirilmiş sürüm sunanların kaynak yükümlülüğü AGPL koşullarına göre değerlendirilir.
- Üçüncü parti dependency ve asset lisansları AGPL ile uyumluluk açısından kontrol edilir.
- Katılımcılar kendi yazmadıkları kod, görsel veya içerikleri lisans/provenance olmadan eklemez.
- Ürün arayüzünde kaynak kodu bağlantısı görünür olur.

Bu belge hukuki görüş değildir. Şirket veya ticari dağıtım öncesi lisans hukukçusu incelemesi gerekebilir.

Referanslar: [AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.html), [GNU GPL FAQ](https://www.gnu.org/licenses/gpl-faq.en.html).

## 3. Katkı onayı — DCO

CLA yerine Developer Certificate of Origin kullanılır. Her commit sign-off taşır:

```bash
git commit -s -m "feat: add evidence status transition"
```

Sign-off, contributor'ın katkıyı sunma hakkı olduğunu beyan eder. İmza satırı Git identity ile uyumlu olmalıdır. CI veya DCO GitHub App eksik sign-off'u engeller.

Referans: [Developer Certificate of Origin](https://developercertificate.org/) ve [DCO GitHub App](https://github.com/apps/dco).

## 4. NDA sınırı

NDA yalnız şu özel alanlar için düşünülebilir:

- kapalı toplantıda paylaşılan kişisel bilgiler;
- e-posta, credential, erişim bilgisi;
- henüz açıklanmamış iş/operasyon planı;
- katılımcıların özel agent transcriptleri;
- güvenlik açığının coordinated disclosure süresi.

Şunlar NDA kapsamına sokulmamalıdır:

- public repo kodu;
- public issue ve PR'lar;
- public teknik belgeler;
- açıkça yayınlanmış proje adı, özellikleri ve release'ler;
- AGPL ile dağıtılan materyal.

NDA, açık kaynak lisansının verdiği hakları sonradan gizlice daraltmak için kullanılmaz. Metin hazırlanırken hukuk incelemesi gerekir.

## 5. Repo içinde bulunacak dosyalar

```text
README.md
LICENSE
CONTRIBUTING.md
CODE_OF_CONDUCT.md
SECURITY.md
GOVERNANCE.md
CHANGELOG.md
docs/architecture.md
docs/glossary.md
docs/decisions/
.github/
  ISSUE_TEMPLATE/
  pull_request_template.md
  CODEOWNERS
```

## 6. Roller

### Baş maintainer — Bora

- ürün ve mimari sınırında final karar;
- release yetkisi;
- güvenlik/private disclosure yönetimi;
- maintainer atama/çıkarma;
- anlaşmazlık çözümü;
- ortak kontrat ve migration final review.

### Pod leadleri — reviewer/area maintainer

- kendi alanının issue triage ve review'u;
- pod sözleşmesinin korunması;
- newcomer tasklarının küçültülmesi;
- alan dokümanlarının güncelliği.

### Contributors

- DCO sign-off;
- task kapsamı ve davranış kuralları;
- test ve doküman sorumluluğu;
- secret/PII paylaşmama.

Maintainer rolü commit sayısına göre otomatik verilmez; düzenli kaliteli review, güvenilirlik ve topluluk davranışı gerekir.

## 7. Branch koruması

`main` için:

- direct push kapalı;
- force push kapalı;
- en az 1 onay;
- gerekli CI kontrolleri;
- DCO kontrolü;
- unresolved conversation kalmaması;
- branch güncelliği veya merge queue;
- auth, schema, upload, security ve deployment alanlarında CODEOWNERS onayı.

Bora dahil kimse kendi PR'ını tek başına merge etmez.

## 8. CODEOWNERS başlangıcı

Gerçek GitHub kullanıcı adları repo kurulurken doldurulur.

```text
/features/discovery/                 @pod1-lead
/components/search/                  @pod1-lead
/components/case-create/             @pod1-lead
/features/case-workspace/            @pod2-lead
/components/evidence/                @pod2-lead
/features/trust/                     @pod3-lead
/components/moderation/              @pod3-lead
/server/auth/                         @bora
/server/db/                           @bora
/server/storage/                      @bora
/supabase/migrations/                 @bora
/Dockerfile                           @bora
/.github/workflows/                   @bora
/SECURITY.md                          @bora
```

## 9. Issue sınıfları

| Etiket | Kullanım |
|---|---|
| `good-first-issue` | Tek dosya/tek davranış, setup dışında blocker yok |
| `help-wanted` | Dış katkıya açık, bağlamı tamam |
| `pod:discovery` | Pod 1 alanı |
| `pod:research` | Pod 2 alanı |
| `pod:trust` | Pod 3 alanı |
| `area:core` | Bora/ortak kontrat review'u |
| `security` | Public ayrıntı vermeden triage |
| `accessibility` | A11y kabul kriteri |
| `blocked` | Blocker ve owner yazılı |
| `decision-needed` | ADR/contract kararı |
| `release-blocker` | v0.1'i durdurur |

Security vulnerability issue olarak public açılmamalıdır; `SECURITY.md` private bildirim yolu verir.

## 10. PR standardı

Her PR açıklaması:

```text
Task:
Problem:
Ne değişti:
Ne değişmedi:
Kabul kriteri kanıtı:
Doğrulama komutları + exit code:
UI ise ekran görüntüsü/video:
Migration/env/API etkisi:
Güvenlik ve PII etkisi:
Rollback/disable yolu:
Bilinen sınırlar:
DCO: tüm commitler signed-off
```

Review sırası:

1. İstenen davranış ve kapsam
2. Auth/permission/data sınırı
3. Error/loading/empty/success
4. Test ve kanıt
5. Kod okunabilirliği
6. Docs ve operasyon etkisi

Stil tartışması formatter/linter'a bırakılır; review kullanıcı etkisine odaklanır.

## 11. Karar kayıtları

ADR gereken konu örnekleri:

- DB tablo/enum değişikliği;
- auth/session veya role değişikliği;
- yeni dış servis;
- public/private veri sınırı;
- upload veya URL fetch;
- AI/search algoritması;
- deployment kilidi;
- lisans/yönetişim.

ADR kısa formatı:

```text
# ADR-00X — Başlık
Durum: proposed | accepted | superseded
Bağlam:
Karar:
Alternatifler:
Sonuçlar/riskler:
Etkilenen kontratlar:
Onaylayanlar:
Tarih:
```

## 12. Security disclosure

`SECURITY.md` şunları belirtir:

- desteklenen sürümler;
- private bildirim kanalı;
- gerekli yeniden üretme bilgisi;
- secret/PII göndermeme uyarısı;
- ilk yanıt hedefi;
- coordinated disclosure yaklaşımı;
- teşekkür politikası; ödül vaadi yoksa açıkça yok.

Güvenlik raporu kanıtlanmadan public issue'ya dönüştürülmez. Fix release edilince gerekli ölçüde şeffaf advisory yayınlanır.

## 13. Release yönetişimi

- Semantic versioning yaklaşımı.
- Release commit/tag immutable.
- Changelog kullanıcı etkisini anlatır.
- Known limitations gizlenmez.
- Migration ve rollback notu release'e eklenir.
- Teknik release ile gerçek vaka çözüm deneyi ayrı yazılır.
- Public paylaşım Ghost/Buzzicra tarafından manuel onayla yapılır; otomatik hesap paylaşımı yok.

## 14. Topluluk güvenliği

- Code of Conduct tüm katılımcılar ve public contributorlar için geçerli.
- Moderasyon kararı kişinin teknik seviyesine veya popülerliğine göre değişmez.
- Yeni başlayan kişinin “anlamadım” demesi review sebebidir, ayıp değildir.
- Kişisel agent transcriptleri varsayılan public değildir; yalnız redakte ve açık rızalı öğrenim kaydı paylaşılır.
- Kullanıcı vakaları eğitim materyaline ancak açık izin ve PII kontrolüyle girer.

## 15. Açık kaynak release kabulü

- Temiz makinede README ile kurulum doğrulandı.
- Lisans ve üçüncü parti attribution tamam.
- DCO check aktif.
- Branch protection ve CODEOWNERS aktif.
- Issue/PR şablonları anlaşılır.
- En az üç `good-first-issue` gerçek, küçük ve blockersız.
- Güvenlik bildirim yolu çalışıyor.
- Kaynak kod bağlantısı çalışan üründe görünür.

