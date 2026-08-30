# Cemresu Demir - Kişisel görev kartı

> **30 Ağustos güncellemesi:** Pod 1 dağıldı. Contract Verifier katkın tamamlandı ve korunuyor; aşağıdaki görevler tarihsel plan kaydıdır. Senden yeni Build/Quality görevi beklenmiyor.

**GitHub:** `@cecesue`
**Pod:** Pod 1 - Kanıt Kartı
**Task 1:** `EVID-CONTRACT-01` Verifier
**Task 2:** `EVID-BUILD-01` Verifier
**Task 3:** `EVID-QUALITY-01` Owner
**Ekip:** Taylan ve Batıncan

## Şu an neredesin?

Takımı bekleten tek insan kapısı senin contract Verifier kararın. Taylan r2 teslim etti, Batıncan onayladı.

## Sırayla görevlerin

### Görev 1: r2 acceptance listesini çıkar

Her madde için girdi, eylem, beklenen sonuç ve PASS/FAIL ölçütü yaz.

### Görev 2: Belirsiz davranışları işaretle

Bir cümle tek beklenen sonuç üretmiyorsa bölüm numarasıyla Taylan'a geri dön. Yeni ürün kararı verme.

### Görev 3: Contract kararını Issue #5'e yaz

`TEST EDİLEBİLİR` veya `REVİZYON GEREKLİ` seç. Özellikle dört status, rejected reason, boş/uzun metin, safe/invalid URL, klavye ve 375 px'i gerekçelendir.

### Görev 4: Build test planını hazırla

Issue #6 açıldığında normal, invalid, klavye/focus, 375 px ve URL kötü kullanım senaryolarını ayrı gruplara böl.

### Görev 5: Dört statusu bağımsız dene

Owner fixture'ını kopyalamakla yetinme. Her statusun metnini, görsel işaretini ve görünür içeriğini kontrol et.

### Görev 6: URL güvenliğini dene

HTTP, HTTPS, boş değer, bozuk URL, `javascript:`, `data:` ve `file:` senaryolarını çalıştır.

### Görev 7: Erişilebilirlik ve mobil kontrolü yap

Tab/Enter, görünür focus, statusun renk dışı anlamı, uzun metin ve 375 px yatay taşma kontrolünü kaydet.

### Görev 8: Quality taskını sahiplen

`EVID-QUALITY-01` açıldığında acceptance-test tablosunu, tekrar üretilebilir komutları, PASS/FAIL sonucunu ve sonraki server dilimi handoff'unu hazırla.

## Bitti ölçütün

- Issue #5'te gerekçeli contract kararı var.
- Belirli commit/PR üzerinde bağımsız sonuç var.
- Komutlar, exit code ve ekran kanıtı kayıtlı.
- FAIL varsa tekrar üretme adımı açık.
