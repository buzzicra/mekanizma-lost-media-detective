# Pod 2 — Kanıt ve Çözüm

## Ekip

| Rol | Kişi |
|---|---|
| Lead / Contract | Taylan Akgün |
| Builder / Integration | Batıncan Kantar |
| Quality / OSS Handoff | Cemresu Demir |

## İlk dilimin kullanıcı sonucu

> Kullanıcı, bir adayın ne olduğunu, kaynağını, gerekçesini ve mevcut değerlendirme durumunu tek kartta anlayabilecek.

## Sıra

```text
EVID-CONTRACT-01 — Taylan
        ↓ kabul
EVID-BUILD-01 — Batıncan
        ↓ kabul
EVID-QUALITY-01 — Cemresu
```

Yalnız üstteki aktif task çalışılır. Altındaki tasklar `Blocked` kalır.

---

## EVID-CONTRACT-01 — Kanıt kartı contractı

**Durum:** Şimdi aktif  
**Owner:** Taylan  
**Reviewer:** Batıncan  
**Verifier:** Cemresu  
**Depends on:** Yok  
**Blocks:** `EVID-BUILD-01`

### Taylan ne teslim edecek?

1. Kartın kullanıcı sonucu ve non-goal.
2. Görünen alanlar:
   - iddia/claim: 10–500 karakter;
   - kaynak URL: HTTP/HTTPS;
   - gerekçe/rationale: 30–2.000 karakter;
   - durum;
   - Elendi durumunda zorunlu durum gerekçesi.
3. Durum matrisi:
   - `NEW` → Yeni;
   - `POSSIBLE` → Olası;
   - `REJECTED` → Elendi;
   - `VERIFIED` → Doğrulandı.
4. Elenen kartın silinmeyip gerekçesiyle görünmesi.
5. Dış link davranışı: yalnız HTTP(S), yeni sekme, güvenli `rel`; server URL'yi fetch etmez.
6. Component prop/type taslağı. DB veya mutation contractı değil.
7. Bu taskta yapılmayacaklar: kanıt ekleme, durum değiştirme, auth, DB, URL preview/fetch.

### Review ve verify

- Batıncan: Dört durum ve uzun metinler componentte uygulanabilir mi?
- Cemresu: Her durum ve güvenli/geçersiz link ayrı test edilebilir mi?

### Bitiş kanıtı

- Contract linki.
- Dört durum tablosu.
- Batıncan review sonucu.
- Cemresu test edilebilirlik sonucu.
- Açık blocker/karar listesi.

---

## EVID-BUILD-01 — Kanıt kartı componenti

**Durum:** `EVID-CONTRACT-01` bitene kadar Blocked  
**Owner:** Batıncan  
**Reviewer:** Taylan  
**Verifier:** Cemresu  
**Destek:** Bora ilk iki döngü co-driver  
**Depends on:** `EVID-CONTRACT-01`  
**Blocks:** `EVID-QUALITY-01`

### Batıncan ne teslim edecek?

- Claim, source, rationale ve status gösteren component.
- Dört durum için metin + görsel işaret; yalnız renk kullanılmaz.
- `REJECTED` kart ve gerekçesinin görünürlüğü.
- Güvenli dış link davranışı.
- Geçersiz URL'nin tıklanabilir link olmaması.
- Uzun metin ve 375 px davranışı.
- Component fixture/testleri; production data pathinde mock yok.

### Bitiş kanıtı

- Diff/PR.
- Dört status screenshotı veya kısa video.
- Test/typecheck/lint komutları ve exit code'ları.
- Taylan review sonucu.
- Cemresu güvenli/geçersiz link doğrulaması.

---

## EVID-QUALITY-01 — Durum, link ve OSS handoff

**Durum:** `EVID-BUILD-01` bitene kadar Blocked  
**Owner:** Cemresu  
**Reviewer:** Batıncan  
**Verifier:** Taylan  
**Depends on:** `EVID-BUILD-01`  
**Blocks:** Sonraki evidence create/server dilimi

### Cemresu ne teslim edecek?

- Dört status için davranış testi.
- Elendi gerekçesi görünürlük testi.
- HTTP(S), bozuk URL ve izin verilmeyen şema testleri.
- Link keyboard erişimi ve güvenli yeni sekme kontrolü.
- Uzun metin/mobile kontrolü.
- Test komutları, bilinen sınırlar ve sonraki evidence taskına handoff.

### Bitiş kanıtı

- Acceptance → test eşleştirmesi.
- Test çıktısı ve exit code'lar.
- Ekran kanıtı.
- Batıncan review, Taylan verifier sonucu.
