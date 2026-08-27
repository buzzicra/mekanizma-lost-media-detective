# Pod 2 - Vaka Formu

## Ekip

| Koltuk | Kişi |
|---|---|
| Contract Lead / Pod Lead | Kerim Taşçı |
| Builder | Emir Kaan Çatı (`@CodeAThing`) |
| Quality | Burak Şimşek |

## Task 1 - CASE-CONTRACT-01

**Owner:** Kerim
**Reviewer:** Emir
**Verifier:** Burak
**Canlı durum:** Ready; Owner teslimi yok.

Kerim contractta şunları netleştirir:

- Form alanları ve required/optional ayrımı
- Her alanın sınırı ve validation mesajı
- Başlangıç, kısmi, invalid, submitting, parent error ve valid-data durumları
- İlk hatalı alana focus ve yalnız-klavye davranışı
- 375 px davranışı
- UI-local input/output type taslağı
- Auth, API, DB, autosave, publish ve benzer-vaka sorgusu non-goalları

Emir ek ürün kararı vermeden formu planlayabildiğini, Burak her kuralı test cümlesine çevirebildiğini Issue #2'de gerekçeyle yazar.

## Task 2 - CASE-BUILD-01

**Owner:** Emir
**Reviewer:** Kerim
**Verifier:** Burak
**Durum:** Contract gate ve ortak scaffold bekleniyor.

Emir erişilebilir form componentini geliştirir. Typed `onSubmit`, validation, ilk hataya focus, submitting, parent error, klavye ve 375 px davranışı görünür olmalıdır. API veya DB çağrısı eklenmez.

## Task 3 - CASE-QUALITY-01

**Owner:** Burak
**Reviewer:** Emir
**Verifier:** Kerim

Burak acceptance-test eşleştirmesini sahiplenir. Normal, invalid, loading, parent error, klavye/focus ve mobil yollarını bağımsız kanıtlar. Bilinen sınırlar sonraki vaka/server dilimine handoff edilir.

## Pod Lead ne zaman Bora'ya gelir?

Owner teslimi, Reviewer kararı ve Verifier kararı aynı issue altında görünür olduğunda Kerim issue/PR linkiyle Bora'ya gelir.
