# Pod çalışma sistemi

## Kısa cevap

Her podun üç başlangıç taskı vardır:

```text
Contract → Build → Quality
```

Üç task aynı anda başlamaz. Pod başına WIP limiti 1'dir.

## Her taskta üç kişi de çalışır

| Şapka | Sorumluluk |
|---|---|
| Owner | Çıktıyı üretir, açıklar ve kanıtlar. |
| Reviewer | Scope, doğruluk ve uygulanabilirliği inceler. |
| Verifier | Kabul kriterlerini kullanıcı gibi dener ve sonucu kaydeder. |

Sabit pod rolü ile task şapkası farklıdır. Roller her task değişiminde aşağıdaki gibi döner:

| Task türü | Owner | Reviewer | Verifier |
|---|---|---|---|
| Contract | Lead | Builder | Quality |
| Build | Builder | Lead | Quality |
| Quality | Quality | Builder | Lead |

Bu dönüşüm ilk üç taskın tamamında zorunludur. Aynı kişi Owner ve Reviewer/Verifier olamaz.

## Task yaşam döngüsü

```text
Draft → Ready → In Progress → Review → Verify → Done
                    ↘ Blocked ↗
```

1. Lead/Owner task briefini netleştirir.
2. Dependency tamamlanınca issue `status:ready` olur.
3. Owner branch açar; agentla önce repo incelemesi ve dosya planı çıkarır.
4. Reviewer planı ve sonra diffi kontrol eder.
5. Verifier normal ve hata yolunu dener.
6. Owner yorumları kapatır; kanıtı tamamlar.
7. Pod Lead issue/PR linkiyle Bora'ya ulaşır.
8. Bora ve Codex issue, diff, acceptance, komut ve ekran kanıtını birlikte kontrol eder.
9. İnsan Reviewer/Verifier kararları ve Bora + Codex kapısı geçince sıradaki task açılır.

## Bora'ya kim ulaşır?

| Pod | Birincil iletişim |
|---|---|
| Pod 1 | Arden Olgundemir |
| Pod 2 | Taylan Akgün |
| Pod 3 | Emir Kaan Çatı |

Lead yoksa aktif task Ownerı ulaşır. Owner yalnız “bitirdim” dediğinde Bora'ya gidilmez; Reviewer ve Verifier kararı beklenir. Codex insan Reviewer veya Verifier yerine geçmez; Bora'nın son kanıt kontrolüne yardım eder.

## 20/40 blocker kuralı

20 dakika ilerleme yoksa issue'ya şunlar yazılır:

```text
Beklenen:
Olan:
Denenen:
Hata veya kanıt:
Tahmin edilen blocker:
```

40 dakikada çözülmezse Pod Lead Bora'yı issue linkiyle çağırır. Scope sessizce büyütülmez.
