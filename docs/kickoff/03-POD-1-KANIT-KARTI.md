# Pod 1 - Kanıt Kartı

> **2 Eylül güncellemesi:** Aktif sıra `FINAL-EVID-01` (#14) → `FINAL-EVID-02` (#15) → `FINAL-EVID-03` (#16). Aşağıdaki eski Contract/Build/Quality planı tarihsel kayıttır.

## Ekip

| Koltuk | Kişi |
|---|---|
| Tamamlanmış Contract katkıları | Taylan Akgün, Batıncan Kantar, Cemresu Demir |
| Aktif implementation owner | `buzzicra` + Codex |
| Review ve nihai kabul | Bora |
| Otomatik doğrulama | Codex + CI |

Pod 1 katılımcı ekibi dağıldı. Üç kişinin Contract emeği issue geçmişinde korunur; kendilerinden yeni Build veya Quality görevi beklenmez.

## Task 1 - EVID-CONTRACT-01

**Owner:** Taylan
**Reviewer:** Batıncan
**Verifier:** Cemresu
**Canlı durum:** Done. Owner r2 teslimi, Reviewer onayı ve Verifier kararı mevcut. Maintainer addendum güncel pod adını, kaynak dosyayı ve scaffold blockerını kilitledi.

Contract şu davranışları netleştirir:

- Claim, source, rationale, status ve status reason
- Dört statusun anlamı
- `REJECTED` gerekçesinin görünürlüğü
- Boş ve limit dışı metin davranışı
- HTTP(S), bozuk URL ve izin verilmeyen scheme davranışı
- i18n, klavye ve 375 px sınırları
- Auth, mutation, API, DB ve URL preview non-goalları

Cemresu test edilebilirlik kararını Issue #5'e bıraktı. Task maintainer kararıyla kapandı.

## Task 2 - EVID-BUILD-01

**Owner:** `buzzicra` + Codex
**Reviewer:** Bora
**Verifier:** Codex + CI
**Durum:** Ready. İlk adım ortak scaffold, dosya planı ve gerçek kontrol komutlarıdır.

Beklenen sonuç read-only Evidence Card componentidir. Dört status, güvenli dış link, invalid source, uzun metin ve mobil davranış görünür olmalıdır. Evidence oluşturma veya status mutation bu taska eklenmez.

## Task 3 - EVID-QUALITY-01

**Owner:** `buzzicra` + Codex
**Reviewer:** Bora
**Verifier:** Codex + CI
**Durum:** Blocked; EVID-BUILD-01 bekleniyor.

Maintainer hattı acceptance-test eşleştirmesini ve bağımsız kalite paketini üretir. Dört status, rejected reason, güvenli/geçersiz URL, klavye, focus, uzun metin ve 375 px kanıtlanır. Bilinen sınırlar sonraki server dilimine handoff edilir.

## Pod Lead ne zaman Bora'ya gelir?

Codex diff, komut ve ekran kanıtını issue/PR'a bağlar. Bora scope ve kanıtı kabul etmeden task kapanmaz.
