# Taylan Akgün - Kişisel görev kartı

**GitHub:** `@taylanakgn`
**Pod:** Pod 1 - Kanıt Kartı
**Task 1:** `EVID-CONTRACT-01` Owner / Contract Lead
**Task 2:** `EVID-BUILD-01` Reviewer / Pod Lead
**Ekip:** Batıncan ve Cemresu

## Şu an neredesin?

Contract r2 teslimin Issue #5'te. Batıncan uygulanabilirlik onayı verdi. Contractı tekrar büyütmek yerine Cemresu'nun bağımsız test edilebilirlik kararını bekliyorsun.

## Sırayla görevlerin

### Görev 1: Contract teslimini sabitle

r2'nin geçerli teslim olduğunu Issue #5'te kısa handoff ile belirt. Yeni karar yoksa metni değiştirme.

### Görev 2: Cemresu'nun Verifier kararını al

Cemresu her acceptance maddesini PASS/FAIL testine çevirebildiğini yazmalı. Eksik bulursa yalnız ilgili bölümü revize et.

### Görev 3: Bora + Codex kapısını çağır

Owner teslimi, Batıncan kararı ve Cemresu kararı aynı issue altında olduğunda üç bağlantıyı Bora'ya getir.

### Görev 4: Build geçişini kaydet

Gate geçerse `EVID-CONTRACT-01` kapanır, `EVID-BUILD-01` Ready olur. Batıncan artık Owner; sen Reviewer olursun.

### Görev 5: Batıncan'ın dosya planını incele

Dosya nedenleri, ilk küçük component dilimi, test dosyası, non-goallar ve blocker riski plan içinde görünmeli.

### Görev 6: Diff'i contractla karşılaştır

Dört status, `REJECTED` gerekçesi, safe/invalid URL, uzun metin, i18n ve 375 px davranışını kontrol et.

### Görev 7: Scope'u koru

Evidence yaratma, status mutation, auth, API, DB, URL fetch veya shared altyapı değişikliği görürsen gerekçeli düzeltme iste.

### Görev 8: Podu kapıya taşı

Batıncan PR'ı ve Cemresu bağımsız sonucu hazır olduğunda scope kararı + PR + verify kanıtını Bora'ya getir.

## Bitti ölçütün

- Contract insan kapısı ve Bora + Codex kontrolü kayıtlı.
- Build PR'ı contract sınırında.
- Reviewer kararın gerekçeli.
- Cemresu sonucu ve sonraki handoff görünür.
