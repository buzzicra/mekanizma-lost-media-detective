# Pod 3 — Güven ve Süreklilik

## Ekip

| Rol | Kişi |
|---|---|
| Lead / Contract | Emir Kaan Çatı |
| Builder / Integration | Kerim Taşçı |
| Quality / Coordination | Deniz |

## İlk dilimin kullanıcı sonucu

> Kullanıcı, riskli bir vaka veya kanıt için neden seçip açıklama yazarak rapor hazırlayabilecek.

## Sıra

```text
REPORT-CONTRACT-01 — Emir
        ↓ kabul
REPORT-BUILD-01 — Kerim
        ↓ kabul
REPORT-QUALITY-01 — Deniz
```

Yalnız üstteki aktif task çalışılır. Altındaki tasklar `Blocked` kalır.

---

## REPORT-CONTRACT-01 — Rapor formu contractı

**Durum:** Şimdi aktif  
**Owner:** Emir  
**Reviewer:** Kerim  
**Verifier:** Deniz  
**Depends on:** Yok  
**Blocks:** `REPORT-BUILD-01`

### Emir ne teslim edecek?

1. Formun kullanıcı sonucu ve non-goal.
2. Hedef contractı: tek hedef; vaka veya kanıt. İki hedef aynı anda olmaz.
3. Rapor nedenleri:
   - kişisel veri;
   - taciz/doxxing;
   - spam;
   - telif;
   - zararlı içerik;
   - yanlış kategori;
   - diğer.
4. Detay: 10–1.000 karakter.
5. Durumlar: başlangıç, invalid, gönderiliyor, parent error, parent success.
6. UI-local input/output type taslağı.
7. Erişilebilir dialog davranışı: başlangıç focusu, Escape, kapandıktan sonra focus return.
8. Bu taskta yapılmayacaklar: API, auth, permission, rate limit, DB, moderation kuyruğu.

### Review ve verify

- Kerim: Contract mevcut dialog/form patterniyle uygulanabilir mi?
- Deniz: Invalid, loading, error, success ve focus davranışları ayrı test edilebilir mi?

### Bitiş kanıtı

- Contract linki.
- Form state tablosu.
- Kerim review sonucu.
- Deniz test edilebilirlik sonucu.
- Açık blocker/karar listesi.

---

## REPORT-BUILD-01 — Rapor formu componenti

**Durum:** `REPORT-CONTRACT-01` bitene kadar Blocked  
**Owner:** Kerim  
**Reviewer:** Emir  
**Verifier:** Deniz  
**Depends on:** `REPORT-CONTRACT-01`  
**Blocks:** `REPORT-QUALITY-01`

### Kerim ne teslim edecek?

- Yedi neden ve 10–1.000 karakter detay alanı.
- Typed `onSubmit`; bu task API/DB çağrısı yapmaz.
- `isSubmitting`, parent `submitError`, parent `isSubmitted` durumları.
- Fake timeout veya fake success olmaması.
- Invalid input ve ilk hataya focus.
- Mevcut dialog patterni varsa Escape/focus return.
- 375 px ve keyboard davranışı.
- Normal + invalid component testleri.

### Bitiş kanıtı

- Diff/PR.
- Loading/error/success ekran kanıtı.
- Test/typecheck/lint komutları ve exit code'ları.
- Emir review sonucu.
- Deniz keyboard/focus doğrulaması.

---

## REPORT-QUALITY-01 — Form durumları ve handoff

**Durum:** `REPORT-BUILD-01` bitene kadar Blocked  
**Owner:** Deniz  
**Reviewer:** Kerim  
**Verifier:** Emir  
**Depends on:** `REPORT-BUILD-01`  
**Blocks:** Sonraki report create/server dilimi

### Deniz ne teslim edecek?

- Neden seçilmediğinde invalid testi.
- 9, 10, 1.000 ve 1.001 karakter sınır testleri.
- Loading sırasında çift submit engeli.
- Parent error ve parent success testleri.
- Keyboard, focus, Escape ve focus return kontrolü.
- Mobile görünüm kanıtı.
- Komutlar, bilinen sınırlar ve server report taskına handoff.

### Bitiş kanıtı

- Acceptance → test eşleştirmesi.
- Test çıktıları ve exit code'lar.
- Ekran kanıtı.
- Kerim review, Emir verifier sonucu.
