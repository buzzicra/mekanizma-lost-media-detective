# Roller ve Task Akışı

## Sabit pod rolleri

İlk iki üretim döngüsünde üç rol sabit kalır.

### Lead / Contract

Lead önce işin ne olduğunu kesinleştirir:

- kullanıcı sonucu;
- kapsam ve yapılmayacaklar;
- alanlar, durumlar ve kurallar;
- diğer tasklarla bağımlılık;
- ölçülebilir kabul kriterleri.

Lead yalnız toplantı yöneten kişi değildir. Domain, durum geçişi ve contract tasklarında kod veya teknik doküman teslim eder.

### Builder / Integration

Builder kabul edilmiş contractı çalışan özelliğe çevirir:

- repodaki mevcut patternleri inceler;
- agentla dosya planı çıkarır;
- yalnız izin verilen alanda değişiklik yapar;
- diff'i açıklar;
- ilgili test/typecheck/lint komutlarını çalıştırır.

Builder poddaki bütün kodu tek başına yazmaz. Build ve entegrasyon tasklarının owner'ıdır.

### Quality / Handoff

Quality davranışın gerçekten çalıştığını kanıtlar:

- normal ve hatalı senaryolar;
- component veya davranış testleri;
- keyboard, focus ve mobile kontrolleri;
- komutlar ve exit code'lar;
- bilinen sınırlar;
- sonraki taska handoff.

Quality yalnız manuel testçi değildir. Test, erişilebilirlik, dokümantasyon ve release tasklarının owner'ıdır.

## Her taskta şapkalar

Sabit rol ile task şapkası aynı şey değildir:

| Task türü | Owner | Reviewer | Verifier |
|---|---|---|---|
| Contract/domain | Lead | Builder | Quality |
| Build/integration | Builder | Lead | Quality |
| Quality/a11y/release | Quality | Builder | Lead |

Owner taskı teslim eder. Reviewer kapsamı ve doğruluğu inceler. Verifier sonucu kriterlere göre dener. Üçü de taskta aktiftir.

## Kısa sözlük

| Terim | Bu projede anlamı |
|---|---|
| Scope | Taskın dokunabileceği alan. Bunun dışı yeni task veya karar gerektirir. |
| Non-goal | Bu taskta bilerek yapılmayacak şey. “Unuttuk” değil, kapsam dışı bıraktık. |
| Contract | İki parça arasındaki anlaşma: hangi veri girer, hangi durumlar oluşur, hangi çıktı beklenir. |
| Acceptance criteria | Taskın geçtiğini gözle görülür biçimde ispatlayan maddeler. |
| Dependency / depends on | Bu task başlamadan bitmesi gereken iş. |
| Blocks | Bu task bitmeden başlayamayan sonraki iş. |
| Blocker | Owner'ın kendi scope'unda çözemediği, ilerlemeyi durduran somut engel. |
| Diff | Branchte yapılan ekleme, silme ve değişikliklerin tamamı. |
| Handoff | Biten işin sonraki task sahibine bıraktığı contract, kullanım ve test bilgisi. |
| Fixture | Test/component geliştirmede kullanılan kontrollü örnek veri; production verisi değildir. |
| UI-local type | Yalnız componentin aldığı/verdiği veri şekli. DB şeması veya ortak sistem kontratı değildir. |
| Parent error/success | Componentin dışındaki gerçek işlemden gelen hata veya başarı durumu. Component fake sonuç üretmez. |
| Exit code | Komutun sonucu. `0` başarı; farklı değer hata veya başarısız gate demektir. |

Bir terim taskta geçiyorsa pod üyeleri aynı anlamı kullanır. Anlaşılmayan terim varsayımla doldurulmaz; issue'da sorulur.

## Task yaşam döngüsü

```text
Draft → Ready → In Progress → Review → Verify → Done
                    ↘ Blocked ↗
```

- `Draft`: Task yazılıyor; eksik alan var.
- `Ready`: Owner, kapsam, acceptance, bağımlılık ve kanıt belli.
- `In Progress`: Owner çalışıyor; podda başka task açılmaz.
- `Review`: Reviewer scope ve çözümü kontrol ediyor.
- `Verify`: Verifier normal ve hata yolunu kanıtlıyor.
- `Done`: Kriterler geçti; sıradaki task açılabilir.
- `Blocked`: İlerlemeyi durduran somut engel ve karar sahibi yazılı.

## Agentla çalışma sırası

### 1. Önce incele

Agent ilk turda kod yazmaz. Repo talimatlarını, mevcut patternleri, `git status` çıktısını, olası dosyaları ve gerçek doğrulama komutlarını bulur.

### 2. Planı podla kontrol et

Owner dosya planını taska koyar. Reviewer kapsamı, verifier test edilebilirliği kontrol eder. Onay gelmeden implement aşamasına geçilmez.

### 3. Küçük diff üret

Yalnız onaylanan dosyalar değişir. Yeni dependency, shared schema veya riskli altyapı ihtiyacında kapsam sessizce büyütülmez; blocker açılır.

### 4. Diff'i okuyun

“Agent yaptı” açıklama değildir. Owner hangi davranışın hangi dosyada değiştiğini ve nedenini anlatır.

### 5. Kanıtlayın

Normal yol, hata yolu ve taska uygun komutlar çalışır. Test scripti yoksa uydurulmaz; eksik gate açıkça yazılır.

## 20/40 kuralı

20 dakika ilerleme yoksa taska şunlar yazılır:

```text
Beklenen:
Olan:
Denenen:
Hata veya kanıt:
Tahmin edilen blocker:
```

Navigator/Reviewer ile bakılır. 40 dakikada çözülmezse Bora scope, contract veya ortak çekirdek kararı verir. Task sessizce genişletilmez.
