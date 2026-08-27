# Kerim Taşçı - Kişisel görev kartı

**GitHub:** `@kerimtasci`
**Pod:** Pod 2 - Vaka Formu
**Task 1:** `CASE-CONTRACT-01` Owner / Contract Lead
**Task 2:** `CASE-BUILD-01` Reviewer
**Task 3:** `CASE-QUALITY-01` Verifier
**Ekip:** Emir ve Burak

## Şu an neredesin?

Issue #2 Ready; henüz yeni contract teslimi yok. İlk hareket sende. Report hattındaki eski çalışmaya devam etmiyorsun.

## Sırayla görevlerin

### Görev 1: Kaynakları oku

Issue #2, veri modeli `cases`, API draft/publish ayrımı, kalite belgesindeki form/focus kuralları ve aktif task briefini oku.

### Görev 2: Alan ve validation contractını yaz

Alan adı, tip, required/optional, sınır, hata mesajı ve hangi kullanıcı sonucunu desteklediğini tabloya dök.

### Görev 3: State ve focus davranışını netleştir

Başlangıç, kısmi, invalid, submitting, parent error ve valid-data durumlarını; ilk hataya focus ve klavye davranışını yaz.

### Görev 4: Scope ve non-goalları kilitle

Auth, API, DB, autosave, publish, benzer-vaka sorgusu ve shared altyapının bu taskta yapılmayacağını açıkça yaz.

### Görev 5: Emir ve Burak kararlarını al

Emir uygulanabilirlik, Burak test edilebilirlik kararını Issue #2'ye gerekçeyle bırakmalı.

### Görev 6: Bora + Codex gate'ini çağır

Contract, review, verify ve açık karar/blocker linklerini tek mesajla Bora'ya getir.

### Görev 7: Emir'in build planını review et

Dosya nedenleri, küçük component dilimi, validation/test yolu, dokunulmayacak alan ve blocker riskini contractla karşılaştır.

### Görev 8: Quality aşamasında bağımsız verify yap

Burak'ın kalite paketini belirli commit üzerinde yeniden çalıştır. Sonucu komut, exit code ve PASS/FAIL gerekçesiyle kaydet.

## Bitti ölçütün

- Issue #2 kendi başına uygulanabilir ve test edilebilir.
- Emir ve Burak kararları kayıtlı.
- Build planı contract sınırında.
- Quality sonucu bağımsız kanıtlı.
