# Roller ve task akışı

## Üç şapka

### Owner

Kendi final taskının kod ve kanıtından sorumludur. Planı yazar, yalnız dosya alanında diff üretir, agent çıktısını okur, komutları çalıştırır.

### Reviewer

Contract, scope ve dosya sınırını kontrol eder. Plan aşamasında devreye girer; PR sonunda gerekçeli `APPROVE` veya `CHANGES REQUESTED` verir.

### Verifier

Ownerın iddiasını belirli commit üzerinde bağımsız dener. Görünür davranışı, invalid/hata yolunu, klavye/focus ve 375 px sonucunu kanıtlar.

## Evidence görevleri

| Task | Owner | Reviewer | Verifier | Dependency |
| --- | --- | --- | --- | --- |
| FINAL-EVID-01 | Taylan | Cemresu | Batıncan | Scaffold hazır |
| FINAL-EVID-02 | Batıncan | Taylan | Cemresu | FINAL-EVID-01 handoff |
| FINAL-EVID-03 | Cemresu | Batıncan | Taylan | FINAL-EVID-01 + 02 |

## Case görevleri

| Task | Owner | Reviewer | Verifier | Dependency |
| --- | --- | --- | --- | --- |
| FINAL-CASE-01 | Kerim | Burak | Emir | Scaffold hazır |
| FINAL-CASE-02 | Emir | Kerim | Burak | FINAL-CASE-01 handoff |
| FINAL-CASE-03 | Burak | Emir | Kerim | FINAL-CASE-01 + 02 |

## Task nasıl ilerler?

1. Owner `main`i günceller ve kişisel branch açar.
2. Aktif issue, `AGENTS.md` ve kaynak contract tamamen okunur.
3. İlk agent turu yalnız dosya/public API/test planıdır.
4. Plan issueya yazılır; Reviewer scope ve çakışmayı kontrol eder.
5. Dependency Ready ise Owner küçük dilimler halinde kodlar.
6. Owner diffi açıklar; format/lint/typecheck/test/build çalıştırır.
7. Reviewer gerekçeli karar verir.
8. Verifier belirli commit/PR üzerinde bağımsız kontrol yapar.
9. Bora + Codex son kapıyı geçer; `PASS` veya `PASS WITH HANDOFF` verir.

## Reviewer formatı

```text
Karar: APPROVE / CHANGES REQUESTED
İncelediğim commit/PR:
Contract uyumu:
Scope ve dosya sınırı:
Eksik veya risk:
İstenen somut düzeltme:
```

## Verifier formatı

```text
Karar: PASS / FAIL / BLOCKED
Denediğim commit/PR:
Komutlar ve exit code:
Normal yol:
Invalid veya hata yolu:
Klavye, focus ve 375 px:
Kanıt linki:
```
