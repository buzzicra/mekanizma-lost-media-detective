# Pod 1 — Keşif ve Vaka Açma

## Ekip

| Rol | Kişi |
|---|---|
| Lead / Contract | Arden Olgundemir |
| Builder / Integration | Alp Kılıç |
| Quality / Handoff | Burak Şimşek |

## İlk dilimin kullanıcı sonucu

> Kullanıcı, hatırladığı içerik için geçerli bir vaka formunu anlayarak doldurabilecek.

## Sıra

```text
CASE-CONTRACT-01 — Arden
        ↓ kabul
CASE-BUILD-01 — Alp
        ↓ kabul
CASE-QUALITY-01 — Burak
```

Yalnız üstteki aktif task çalışılır. Altındaki tasklar `Blocked` kalır.

---

## CASE-CONTRACT-01 — Vaka formu contractı

**Durum:** Şimdi aktif  
**Owner:** Arden  
**Reviewer:** Alp  
**Verifier:** Burak  
**Depends on:** Yok  
**Blocks:** `CASE-BUILD-01`

### Arden ne teslim edecek?

Builder'ın yoruma ihtiyaç duymadan uygulayabileceği kısa bir form contractı:

1. Kullanıcı sonucu ve non-goal.
2. Alan tablosu:
   - başlık: 12–120 karakter;
   - medya türü: video, ses, görsel, oyun, web sitesi, reklam, film/dizi, kitap/dergi, diğer;
   - içerik dili;
   - hatırlanan ayrıntı: 80–5.000 karakter;
   - görüldüğü yer: 2–200 karakter;
   - tahmini dönem veya “bilmiyorum”;
   - önceki aramalar veya “yok”;
   - kişisel veri/kayıp kişi güvenlik onayı.
3. Form durumları: başlangıç, kısmi, invalid, gönderiliyor, submit hatası, geçerli veri hazır.
4. UI-local input/output type taslağı. DB şeması değil.
5. İlk build taskının dosya sınırı.
6. Normal ve invalid-input kabul kriterleri.
7. Bu taskta yapılmayacaklar: auth, API, DB, autosave, publish, benzer vaka sorgusu.

### Review ve verify

- Alp: “Bu contract mevcut stackle S boyutta uygulanabilir mi?” diye kontrol eder.
- Burak: “Her kural gözlenebilir ve test edilebilir mi?” diye kontrol eder.
- İki kontrol tamamlanmadan contract `Done` olmaz.

### Bitiş kanıtı

- Contract dosyası veya issue bölümü linki.
- Alp review sonucu.
- Burak test edilebilirlik sonucu.
- Açık karar veya blocker listesi.

---

## CASE-BUILD-01 — Form shell ve validation UI

**Durum:** `CASE-CONTRACT-01` bitene kadar Blocked  
**Owner:** Alp  
**Reviewer:** Arden  
**Verifier:** Burak  
**Depends on:** `CASE-CONTRACT-01`  
**Blocks:** `CASE-QUALITY-01`

### Alp ne teslim edecek?

- Contracttaki alanları gösteren erişilebilir form componenti.
- Typed `onSubmit` callback'i; bu task DB/API çağrısı yapmaz.
- Invalid input mesajları ve ilk hataya focus.
- `isSubmitting` ve parent'tan gelen submit error davranışı.
- 375 px görünüm ve klavye kullanımı.
- En az bir normal ve bir invalid-input component testi.

### Bitiş kanıtı

- Diff/PR.
- Screenshot veya kısa ekran kaydı.
- Gerçek test/typecheck/lint komutları ve exit code'ları.
- Arden review sonucu.
- Burak normal + invalid senaryo sonucu.

---

## CASE-QUALITY-01 — Form kalite ve handoff

**Durum:** `CASE-BUILD-01` bitene kadar Blocked  
**Owner:** Burak  
**Reviewer:** Alp  
**Verifier:** Arden  
**Depends on:** `CASE-BUILD-01`  
**Blocks:** Sonraki vaka formu/server dilimi

### Burak ne teslim edecek?

- Contract maddelerini test senaryolarına bağlayan tablo.
- Eksik alan, sınır değer, loading ve submit error testleri.
- Keyboard/focus ve 375 px kontrolü.
- Eksikse küçük test/a11y düzeltmeleri.
- Geçen komutlar, bilinen sınırlar ve sonraki vaka taskına handoff.

### Bitiş kanıtı

- Acceptance → test eşleştirme tablosu.
- Test çıktıları ve exit code'lar.
- Ekran kanıtı.
- Alp review, Arden verifier sonucu.
