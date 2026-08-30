# Roller ve task akışı

## Üç şapka

### Owner

Taskın çıktısından sorumlu kişi. Planı yazar, küçük diff üretir, agent çıktısını okur, kanıtı toplar.

### Reviewer

Taskın sınırını korur. Contract uygulanabilir mi, dosya planı doğru mu, diff gereksiz alana taşıyor mu diye kontrol eder. Owner yerine kod yazmaz.

### Verifier

Davranışı bağımsız dener. Normal ve hata yolunu, klavye/focus davranışını ve 375 px görünümü test eder. Owner'ın kanıtını tekrar etmek verify değildir.

## Pod 1 maintainer devralması

| Task | Owner | Reviewer | Verifier |
|---|---|---|---|
| `EVID-CONTRACT-01` | Taylan | Batıncan | Cemresu |
| `EVID-BUILD-01` | `buzzicra` + Codex | Bora | Codex + CI |
| `EVID-QUALITY-01` | `buzzicra` + Codex | Bora | Codex + CI |

Contract satırı tamamlanmış katkı geçmişidir. Build ve Quality satırları dağılan ekipten yeni iş beklemez. Codex uygulama/otomatik kanıt üretir; Bora scope, diff ve nihai kabulü kontrol eder.

## Pod 2 rol dönüşümü

| Task | Owner | Reviewer | Verifier |
|---|---|---|---|
| `CASE-CONTRACT-01` | Kerim | Emir | Burak |
| `CASE-BUILD-01` | Emir | Kerim | Burak |
| `CASE-QUALITY-01` | Burak | Emir | Kerim |

## Task nasıl ilerler?

1. Owner aktif issue'yu ve teknik kaynağı okur.
2. Kullanıcı sonucunu, scope'u ve non-goalları kendi cümlesiyle yazar.
3. Kod taskıysa önce 5-8 maddelik dosya planı paylaşır.
4. Reviewer planı kontrol eder.
5. Owner küçük dilim üretir; diff'i okur.
6. Reviewer gerekçeli karar verir.
7. Verifier belirli commit/PR üzerinde bağımsız kontrol yapar.
8. Pod Lead üç kanıtı Bora'ya getirir.
9. Bora + Codex son kapıyı geçerse sonraki task açılır.

## Karar formatları

Reviewer:

```text
Karar: APPROVE / CHANGES REQUESTED
Contract uyumu:
Scope ve dosya sınırı:
Eksik veya risk:
İstenen somut düzeltme:
```

Verifier:

```text
Karar: PASS / FAIL / BLOCKED
Denediğim commit veya PR:
Komutlar ve exit code:
Normal yol:
Invalid veya hata yolu:
Klavye ve 375 px:
Kanıt linki:
```
