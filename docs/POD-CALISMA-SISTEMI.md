# Pod çalışma sistemi

## Kısa cevap

İki aktif pod var. Her pod üç taskı sırayla tamamlar:

```text
Contract -> Build -> Quality
```

Aynı podda iki task birlikte başlamaz. WIP limiti 1'dir.

## Aktif ekip

| Pod | Contract Lead | Builder | Quality | Bora'ya ulaşan kişi |
|---|---|---|---|---|
| Pod 1 - Kanıt Kartı | Taylan | Batıncan | Cemresu | Taylan |
| Pod 2 - Vaka Formu | Kerim | Emir | Burak | Kerim |

## Roller her taskta döner

| Task | Owner | Reviewer | Verifier |
|---|---|---|---|
| Contract | Contract Lead | Builder | Quality |
| Build | Builder | Contract Lead | Quality |
| Quality | Quality | Builder | Contract Lead |

### Owner

- Kullanıcı sonucunu kendi cümlesiyle açıklar.
- Önce repo ve dosya planı çıkarır.
- Küçük diff üretir; her dosyanın neden değiştiğini anlatır.
- Komut, exit code, ekran ve bilinen sınırları teslim eder.

### Reviewer

- İlk kez PR sonunda değil, dosya planında devreye girer.
- Contract uyumu, scope, dosya sınırı ve gereksiz altyapı değişikliğini kontrol eder.
- `APPROVE` veya `CHANGES REQUESTED` kararını gerekçeyle yazar.
- Owner yerine işi tamamlamaz.

### Verifier

- Owner'ın ekran görüntüsünü tekrar paylaşmaz; belirli commit veya PR'ı bağımsız dener.
- Normal, invalid/hata, klavye/focus ve 375 px yolunu kontrol eder.
- `PASS`, `FAIL` veya `BLOCKED` kararını kanıtla yazar.

## Task yaşam döngüsü

```text
Draft -> Ready -> In Progress -> Review -> Verify -> Done
                    \-> Blocked -/
```

1. Dependency tamamlanınca issue `status:ready` olur.
2. Owner branch açar: `task/<TASK-ID>-kisa-aciklama`.
3. İlk agent turu yalnız inceleme ve 5-8 maddelik dosya planıdır.
4. Reviewer planı kontrol eder.
5. Owner küçük dilimler halinde uygular ve diff'i okur.
6. Reviewer gerekçeli karar verir.
7. Verifier bağımsız test yapar.
8. Pod Lead issue/PR linkini Bora'ya iletir.
9. Bora + Codex kanıt kapısı geçerse task `Done`, sonraki task `Ready` olur.

## Bitiş kanıtı

- Issue ve PR linki
- Değişen dosyaların kısa açıklaması
- Normal ve hata/invalid ekranı
- Gerçek komutlar ve exit code
- Reviewer kararı
- Verifier kararı
- Bilinen sınırlar
- Sonraki task için handoff

## 20/40 blocker kuralı

20 dakika aynı yerde dönüyorsanız issue'ya yazın:

```text
Beklediğimiz davranış:
Gördüğümüz davranış:
Denediklerimiz:
Eksik karar, erişim veya bağımlılık:
Bu çözülünce ilk yapacağımız:
```

40 dakikada çözülmezse Pod Lead Bora'ya issue linkiyle ulaşır. Scope sessizce büyütülmez.
