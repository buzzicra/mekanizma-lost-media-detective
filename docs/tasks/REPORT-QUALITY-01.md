# REPORT-QUALITY-01 - Form durumları ve handoff

**Pod:** Pod 3 - Güven ve Süreklilik  
**Durum:** Blocked  
**Owner:** Deniz  
**Reviewer:** Kerim Taşçı  
**Verifier:** Emir Kaan Çatı  
**Depends on:** `REPORT-BUILD-01`  
**Blocks:** Sonraki report create/server dilimi

## Kullanıcı sonucu

Rapor formunun sınır, hata, loading, klavye ve mobil davranışları kanıtlanmış olur.

## Teslim

- Neden seçilmediğinde invalid testi.
- 9, 10, 1.000 ve 1.001 karakter sınır testleri.
- Loading sırasında çift-submit engeli.
- Parent error/success testleri.
- Keyboard, focus, Escape, focus-return ve mobile kanıtı.
- Sonraki server-report taskına handoff.

## Acceptance criteria

- [ ] `REPORT-BUILD-01` Done ve handoff edilmiş.
- [ ] Alt/üst sınır değerleri doğrulanmış.
- [ ] Loading/error/success yolları çalıştırılmış.
- [ ] Keyboard/focus/Escape/focus-return kanıtı var.
- [ ] Mobile görünüm kayıtlı.

## Bitiş kanıtı

- Acceptance → test eşleştirmesi.
- Test çıktıları ve exit codelar.
- Ekran kanıtı.
- Reviewer ve Verifier kararları.
