# Mekanizma Proje A — Buradan Başlayın

Bu paket doğrudan katılımcılar içindir. Anket puanı, özel not veya seviye sıralaması içermez.

## Proje

İlk projemiz Lost Media Detective. İnsanların adını hatırlamadığı bir video, oyun, reklam, web sitesi, şarkı veya başka bir içeriği kaynaklı kanıtlarla birlikte bulmasına yardım eden açık kaynak bir uygulama yapıyoruz.

## Çalışma biçimi

Üç pod var. Her pod bir kullanıcı sonucunu sahipleniyor:

- Pod 1: Kullanıcı arar; bulamazsa anlaşılır bir formdan vaka açar.
- Pod 2: Araştırmacı kaynaklı kanıt ekler; adaylar değerlendirilir; vaka çözüme gider.
- Pod 3: Kullanıcı katkısını takip eder; riskli içeriği raporlar; güven akışı kayıtlı ilerler.

Her pod ilk dilimi aynı sırayla tamamlar:

```text
1. Contract taskı → Ne yapacağımızı kesinleştirir.
2. Build taskı → Kararı çalışan özelliğe çevirir.
3. Quality taskı → Davranışı test eder, kanıtlar ve devreder.
```

Pod başına aynı anda yalnız bir task aktiftir. Bir task kabul edilmeden sıradaki başlamaz.

## Şu an aktif olan tasklar

| Pod | Aktif task | Owner | Reviewer | Verifier |
|---|---|---|---|---|
| Pod 1 | `CASE-CONTRACT-01` | Arden | Alp | Burak |
| Pod 2 | `EVID-CONTRACT-01` | Taylan | Batıncan | Cemresu |
| Pod 3 | `REPORT-CONTRACT-01` | Emir | Kerim | Deniz |

Alp, Batıncan ve Kerim şu an boşta değildir. Contractın uygulanabilirliğini review eder. Burak, Cemresu ve Deniz de contractın test edilebilirliğini doğrular. Contract kabul edilince Builder taskı açılır.

## Hangi dosyayı okuyacağım?

1. Bu dosyayı oku.
2. [Roller ve task akışı](./02-ROLLER-VE-TASK-AKISI.md) dosyasını oku.
3. Kendi pod dosyanı oku:
   - [Pod 1](./03-POD-1-KEŞİF-VE-VAKA-AÇMA.md)
   - [Pod 2](./04-POD-2-KANIT-VE-ÇÖZÜM.md)
   - [Pod 3](./05-POD-3-GÜVEN-VE-SÜREKLİLİK.md)
4. `kisi-kartlari/` klasöründen kendi adını aç.
5. Yalnız kartında “Şu an” yazan işi yap.

## Bir taskın özeti

Her task şu sorulara cevap verir:

- Kullanıcı task sonunda ne yapabilecek?
- Owner kim?
- Reviewer ve verifier kim?
- Hangi dosyalar değişebilir?
- Bu taskta özellikle ne yapılmayacak?
- Başarılı ve hatalı davranış nasıl ölçülecek?
- Hangi task bitmeden bu iş başlayamaz?
- Bittiğini hangi kanıt gösterecek?

Bu sorulardan biri cevapsızsa task kodlanmaya hazır değildir.

## Önemli sınır

İlk üç taskta auth, DB migration, upload, production config veya deployment değişmez. Ortak schema/contract ihtiyacı çıkarsa pod kendi başına karar vermez; taskta blocker açar ve Bora'ya getirir.

