# Batıncan Kantar - Kişisel görev kartı

> **2 Eylül final güncellemesi:** Aktif görevin [FINAL-EVID-02 / Issue #15](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/15). Evidence Card UI kodu ve UI kalite sahipliği sende. #14 handoffuna kadar plan hazırla; kod başlatma. Aşağıdaki eski görevler tarihsel kayıttır.

**GitHub:** `@btncnkntr`
**Pod:** Pod 1 - Kanıt Kartı
**Task 1:** `EVID-CONTRACT-01` Reviewer
**Task 2:** `EVID-BUILD-01` Owner / Builder
**Ekip:** Taylan ve Cemresu

## Şu an neredesin?

Contract için uygulanabilirlik onayını verdin. Build henüz blocked; Cemresu kararı, Bora + Codex gate'i ve ortak scaffold bekleniyor.

## Sırayla görevlerin

### Görev 1: Review kararını koru

Taylan r2'yi değiştirirse yalnız değişen bölümü tekrar kontrol et. Kararın hangi sürüme bağlı olduğu açık kalsın.

### Görev 2: Build kapısını kontrol et

Issue #6 `status:ready` olmadan, contract kapanmadan ve scaffold açıklanmadan branch açma.

### Görev 3: Küçük dosya planı yaz

Değişecek dosyalar, her dosyanın nedeni, ilk component dilimi, test dosyası, dokunulmayacak alanlar ve blocker riski yazılı olsun.

### Görev 4: Planı Taylan'a review ettir

Taylan planın r2 contractı eksiksiz karşıladığını veya somut düzeltme gerektiğini yazar.

### Görev 5: Kanıt kartının temelini geliştir

Claim, rationale, source ve status bilgi sırasını kur. Dekorasyon değil, okunabilir davranış önce gelir.

### Görev 6: Dört status ve edge case'leri ekle

`NEW`, `POSSIBLE`, `REJECTED`, `VERIFIED`; boş alan; uzun metin; boş/bozuk/izin verilmeyen URL senaryolarını görünür yap.

### Görev 7: Güvenlik ve erişilebilirliği tamamla

Yalnız HTTP(S) link; güvenli yeni sekme; görünür focus; invalid source tıklanamaz; status yalnız renkle anlatılmaz; 375 px'te taşma olmaz.

### Görev 8: Test, PR ve handoff hazırla

Gerçek test/typecheck/lint komutlarını çalıştır. PR'a ekranlar, exit code, yapılmayan işler, bilinen sınırlar ve `EVID-QUALITY-01` handoff'u ekle.

## Bitti ölçütün

- Dört status çalışan componentte görünür.
- Safe/invalid URL testleri var.
- Taylan review'u ve Cemresu bağımsız PASS sonucu var.
- PR ve handoff kanıtı tamam.
