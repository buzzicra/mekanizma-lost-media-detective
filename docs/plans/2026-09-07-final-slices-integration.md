# Final Dilimler Entegrasyon Planı

> Tarih: 2026-09-07 | Durum: IN PROGRESS | Çıktı: local çalışan uygulama + GitHub PR

## 0. Kapsam

- **Problem:** Final sprintte altı task açıldı; yalnız vaka schema/validation teslimi merge adayı, diğer kullanıcıya görünür dilimler eksik veya kırık.
- **Hedef kullanıcı:** Belirsiz bir medya hatırasını vaka formuna döken kişi; kaynaklı bir adayı kanıt kartında değerlendiren araştırmacı.
- **En küçük yararlı çıktı:** Evidence Card ve Case Form gerçek route'larda çalışır; tüm contract durumları testlerle kanıtlanır.
- **Kapsam:** `FINAL-EVID-01..03`, `FINAL-CASE-01..03`, iki route, ilgili i18n/stil/test ve dürüst entegrasyon dokümanı.
- **Kapsam dışı:** Auth, DB, API, persistence, gerçek publish, kanıt mutationı, upload, production deploy.
- **Sabit karar:** GitHub issue'ları açık kalır. Tamamlanma kanıtı PR ve CI üzerinden izlenir.
- **Kanıt ilkesi:** Fake başarı yok; persistence bağlanmadıysa UI bunu açıkça söyler.

**Gate 0:** PASS — kabul edilmiş Issue #2/#5 contractları ve final task dosyaları yeterince açık.

## 1. Ürün sonucu ve kabul

| ID | Sistem davranışı | Gözlenebilir geçiş |
|---|---|---|
| R1 | Evidence Card dört durumu, tam metni ve güvenli kaynağı gösterir | Component + browser testleri geçer |
| R2 | Unsafe/bozuk kaynak link olmaz; hiçbir network fetch yapılmaz | Unit spy ve DOM kontrolü geçer |
| R3 | Vaka formu on alanı doğru sırada ve locale-aware gösterir | Component ve E2E label kontrolleri geçer |
| R4 | Invalid submit tüm hataları gösterir, ilk invalid alana odaklanır | Unit + E2E focus testi geçer |
| R5 | Valid submit normalize typed veri üretir; double submit engellenir | Unit testleri geçer |
| R6 | Parent error ve submitting durumları veriyi korur | Rerender testleri geçer |
| R7 | 375/768/1280 genişliklerinde yatay taşma yoktur | Playwright viewport kontrolleri geçer |
| R8 | Ana sayfa iki çalışan dilime gider; durum metni gerçeği söyler | Browser smoke geçer |

## 2. Durum matrisi

| Yüzey | Başlangıç | Invalid/bozuk | Bekleme | Parent error | Başarılı UI sonucu |
|---|---|---|---|---|---|
| Evidence Card | Dört status | Eksik metin fallbacki, invalid link pasif | N/A; read-only | N/A | Kaynak + gerekçe okunur |
| Case Form | Boş/initial values | Inline + summary + focus | Disabled submit + duyuru | Değer korunur + alert | Normalize payload önizlemesi; kayıt yapılmadığı açık |

## 3. Mimari

```text
app/evidence/page.tsx
  -> components/evidence/EvidenceCard.tsx
  -> features/evidence/model/evidence-card.ts
  -> lib/i18n/evidence-card.ts

app/cases/new/page.tsx
  -> components/case-create/CaseFormDemo.tsx
  -> components/case-create/CaseForm.tsx
  -> features/case-create/model/case-form.ts
  -> lib/schemas/case-form.ts
```

- Server/API/DB sınırı eklenmez.
- Evidence URL helper yalnız parse eder; fetch etmez.
- Case form tek schema kaynağı kullanır; component validation kuralı kopyalamaz.
- Route wrapper yalnız UI sonucu gösterir; kayıt/publish olmuş gibi davranmaz.

## 4. Task DAG

| Sıra | Dilim | Bağımlılık | Dosya sahipliği | Doğrulama |
|---:|---|---|---|---|
| 1 | Kerim schema teslimini entegre et | Scaffold | `features/case-create`, `lib/schemas`, `lib/i18n`, schema test | Unit 52/52 |
| 2 | Evidence model/helper + test | Scaffold | `features/evidence`, `lib/i18n`, unit test | Unit |
| 3 | Evidence UI | 2 | `components/evidence` | Component + a11y |
| 4 | Case UI | 1 | `components/case-create` | Component + focus |
| 5 | Katılımcı test paketini entegre edip düzelt | 1 + 4 | `tests/**/case-form*` | Unit + browser |
| 6 | Route + responsive entegrasyon | 3 + 4 | `app/evidence`, `app/cases/new`, CSS | E2E 375/768/1280 |
| 7 | Regresyon + doküman | Tümü | README/status/plan | full gates |

## 5. Tasarım ve erişilebilirlik

- Art direction ve tokenlar: [`../design-tokens.md`](../design-tokens.md)
- Her input görünür label, kararlı `id/name`, açıklama ve hata ilişkisi taşır.
- Error summary alan hatalarını tekrarlar; ilk hata linki/focus davranışı doğrudan kontrole gider.
- Status renk + metin + şekil ile ayrılır.
- Klavye sırası DOM sırasıdır; görünür focus bütün interaktif yüzeylerde korunur.
- Reduced-motion desteklenir; motion görev tamamlamayı geciktirmez.

## 6. Doğrulama matrisi

| Gate | Komut/prosedür | Beklenen |
|---|---|---|
| Format | `pnpm format:check` | exit 0 |
| Lint | `pnpm lint` | exit 0 |
| Type | `pnpm typecheck` | exit 0 |
| Unit/component | `pnpm test` | exit 0 |
| Build | `pnpm build` | exit 0 |
| Browser/a11y | `pnpm test:e2e` | iki Playwright projesi geçer |
| Repo contract | `python3 scripts/validate_repo.py` | exit 0 |
| Security | URL scheme/no-fetch + secret diff kontrolü | blocker yok |

## 7. Riskler

- Burak test paketi gerçek `CaseForm` olmadan yazılmıştır; ambient module stub kaldırılacaktır.
- Eski testler acceptance isimleri taşısa da bazı sınırları/assertionları kanıtlamıyor; davranış bazlı tamamlanacaktır.
- E2E route'u final taskın değil maintainer entegrasyonunun parçasıdır; persistence yokluğu açıkça gösterilecektir.
- Production deploy ve gerçek kullanıcı verisi bu PR'ın kanıtı değildir.

## 8. Ship ve postmortem

- Ship yüzeyi: `codex/complete-mvp` branch'i ve tek entegrasyon PR'ı.
- Issue'lar otomatik kapanmayacak; PR body `Closes` kullanmayacak.
- Merge/publish kararı ayrı maintainer kapısıdır.
- Sonuç, komut exit kodları ve kalan riskler bu belgeye eklenecektir.
