# Pod çalışma sistemi

## Kısa cevap

İki ürün hattı, altı kişi, kişi başına tek final kodlama görevi var:

```text
Evidence: Taylan model/helper → Batıncan UI → Cemresu kalite
Case:     Kerim schema       → Emir UI      → Burak kalite
```

Herkes görevini bugün alır. İlk kişi kodlayabilir; ikinci ve üçüncü kişi agent planını/test matrisini hazırlar, dependency handoffundan sonra kodlar.

## Görev ve rol haritası

| Task | Owner | Reviewer | Verifier |
| --- | --- | --- | --- |
| FINAL-EVID-01 | Taylan | Cemresu | Batıncan |
| FINAL-EVID-02 | Batıncan | Taylan | Cemresu |
| FINAL-EVID-03 | Cemresu | Batıncan | Taylan |
| FINAL-CASE-01 | Kerim | Burak | Emir |
| FINAL-CASE-02 | Emir | Kerim | Burak |
| FINAL-CASE-03 | Burak | Emir | Kerim |

### Owner

- Issueyu ve kaynak contractı okur.
- İlk agent turunda kod değil, dosya/API/test planı ister.
- Yalnız issue'daki dosya alanında kodlar.
- Diffi anlayıp gerçek komut/exit code ile teslim eder.

### Reviewer

- Plan aşamasında dosya sınırı ve contract uyumunu kontrol eder.
- PR sonunda `APPROVE` veya `CHANGES REQUESTED` yazar.
- Owner yerine işi tamamlamaz.

### Verifier

- Belirli commit/PR üzerinde davranışı bağımsız dener.
- Normal, invalid/hata, klavye/focus ve 375 px kanıtını kontrol eder.
- `PASS`, `FAIL` veya `BLOCKED` kararını kanıtla yazar.

## Task yaşam döngüsü

```text
Blocked (plan hazırlanabilir)
→ dependency handoff
→ Ready
→ In Progress
→ Review
→ Verify
→ Bora + Codex gate
→ Done / PASS WITH HANDOFF
```

## Agent çalışma döngüsü

1. `git status` ve güncel `main` kontrolü.
2. Kişisel branch açma.
3. Agentla repo + issue + contract okuma.
4. Dosya sınırı, public API ve acceptance-test planını issueya yazma.
5. Reviewer plan kontrolü.
6. Küçük dilimler halinde kodlama.
7. Diffi satır satır okuma; scope dışını geri alma.
8. Gerçek format/lint/typecheck/test/build kanıtı.
9. Reviewer + Verifier kararı.
10. Bora + Codex final kontrolü.

## Ortak config kuralı

`package.json`, lockfile, TypeScript/Next/Vitest/Playwright configleri ve CI ortak maintainer alanıdır. Görev yeni dependency veya config değişikliği gerektiriyorsa kişi sessizce değiştirmez; issueya blocker yazar.

## 20/40 blocker kuralı

20 dakika aynı yerde dönülüyorsa issueya şunlar yazılır:

```text
Beklenen davranış:
Görülen davranış:
Denenenler:
Eksik karar, erişim veya bağımlılık:
Bu çözülünce ilk hareket:
```

40 dakikada çözülmezse Bora'ya issue linkiyle gidilir. Scope sessizce büyütülmez.

## Bitiş kanıtı

- Issue ve PR linki
- Task ID + kullanıcı sonucu
- Değişen dosyalar ve nedenleri
- Acceptance → test/ekran eşlemesi
- Gerçek komutlar ve exit code
- Reviewer kararı
- Verifier kararı
- Bilinen sınırlar ve Bora + Codex handoffu
