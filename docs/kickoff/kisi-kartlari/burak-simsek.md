# Burak Şimşek - Kişisel görev kartı

**GitHub:** `@Burak98-lab`
**Pod:** Pod 2 - Vaka Formu
**Task 1:** `CASE-CONTRACT-01` Verifier
**Task 2:** `CASE-BUILD-01` Verifier
**Task 3:** `CASE-QUALITY-01` Owner
**Ekip:** Kerim ve Emir

## Şu an neredesin?

Repo admin davetin bekliyor. Issue #8'e bıraktığın Report doğrulaması korunuyor; güncel görevin Kerim'in Issue #2 contractını test edilebilirlik açısından incelemek.

## Sırayla görevlerin

### Görev 1: GitHub davetini kabul et

Branch, PR ve issue atamalarını kullanabilmek için `@Burak98-lab` davetini kabul et.

### Görev 2: Contract test matrisi çıkar

Her form alanı için geçerli örnek, geçersiz örnek, sınır ve beklenen hata mesajını yaz.

### Görev 3: State'leri test cümlesine çevir

Başlangıç, kısmi, invalid, submitting, parent error ve valid-data durumlarının her biri tek beklenen sonuca bağlansın.

### Görev 4: Contract kararını Issue #2'ye yaz

`TEST EDİLEBİLİR` veya `REVİZYON GEREKLİ` seç. Belirsizlik varsa bölüm numarası ve eksik beklenen sonucu yaz.

### Görev 5: Build senaryolarını bağımsız çalıştır

Boş form, tek hatalı alan, çok hatalı alan, sınır değeri ve geçerli form yolunu dene.

### Görev 6: Loading ve parent error davranışını dene

Çift submit engelleniyor mu, hata veriyi koruyor mu, teknik detay sızıyor mu kontrol et.

### Görev 7: Klavye, focus ve 375 px kontrolü yap

Tab sırası, ilk hataya focus, görünür focus, Enter submit ve mobil taşma kanıtını kaydet.

### Görev 8: Quality taskını sahiplen

`CASE-QUALITY-01` açıldığında acceptance-test tablosunu, gerçek komutları, PASS/FAIL sonucunu, bilinen sınırları ve server dilimi handoff'unu üret.

## Bitti ölçütün

- Issue #2'de gerekçeli test edilebilirlik kararı var.
- Belirli commit/PR üzerinde bağımsız normal ve hata sonucu var.
- Komut, exit code, klavye ve mobil kanıtı kayıtlı.
- Quality handoff'u tamam.
