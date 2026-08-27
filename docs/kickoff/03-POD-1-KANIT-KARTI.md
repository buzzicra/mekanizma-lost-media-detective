# Pod 1 - Kanıt Kartı

## Ekip

| Koltuk | Kişi |
|---|---|
| Contract Lead / Pod Lead | Taylan Akgün |
| Builder | Batıncan Kantar |
| Quality | Cemresu Demir |

## Task 1 - EVID-CONTRACT-01

**Owner:** Taylan
**Reviewer:** Batıncan
**Verifier:** Cemresu
**Canlı durum:** Owner r2 teslimi ve Reviewer onayı var; Verifier kararı bekleniyor.

Contract şu davranışları netleştirir:

- Claim, source, rationale, status ve status reason
- Dört statusun anlamı
- `REJECTED` gerekçesinin görünürlüğü
- Boş ve limit dışı metin davranışı
- HTTP(S), bozuk URL ve izin verilmeyen scheme davranışı
- i18n, klavye ve 375 px sınırları
- Auth, mutation, API, DB ve URL preview non-goalları

Cemresu her acceptance maddesini bağımsız PASS/FAIL senaryosuna çevirebildiğini Issue #5'te belirtmeden task kapanmaz.

## Task 2 - EVID-BUILD-01

**Owner:** Batıncan
**Reviewer:** Taylan
**Verifier:** Cemresu
**Durum:** Contract gate ve ortak scaffold bekleniyor.

Beklenen sonuç read-only Evidence Card componentidir. Dört status, güvenli dış link, invalid source, uzun metin ve mobil davranış görünür olmalıdır. Evidence oluşturma veya status mutation bu taska eklenmez.

## Task 3 - EVID-QUALITY-01

**Owner:** Cemresu
**Reviewer:** Batıncan
**Verifier:** Taylan

Cemresu acceptance-test eşleştirmesini ve bağımsız kalite paketini sahiplenir. Dört status, rejected reason, güvenli/geçersiz URL, klavye, focus, uzun metin ve 375 px kanıtlanır. Bilinen sınırlar sonraki server dilimine handoff edilir.

## Pod Lead ne zaman Bora'ya gelir?

Owner teslimi, Reviewer kararı ve Verifier kararı aynı issue altında görünür olduğunda Taylan issue/PR linkiyle Bora'ya gelir.
