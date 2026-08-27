# İlk dikey dilim durum takibi

**Snapshot:** 27 Ağustos 2026
**Aktif düzen:** 2 pod, 6 kişi, 6 task
**Uygulama kodu:** Henüz yok; repo doküman ve koordinasyon aşamasında

## Pod 1 - Kanıt Kartı

| Task | Owner | Reviewer | Verifier | Canlı durum |
|---|---|---|---|---|
| [`EVID-CONTRACT-01`](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/5) | Taylan | Batıncan | Cemresu | Owner r2 teslim etti; Reviewer onayladı; Verifier kararı bekleniyor |
| [`EVID-BUILD-01`](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/6) | Batıncan | Taylan | Cemresu | Blocked - contract gate bekleniyor |
| [`EVID-QUALITY-01`](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/7) | Cemresu | Batıncan | Taylan | Blocked - build bekleniyor |

### Pod 1 sonraki hareket

Cemresu `EVID-CONTRACT-01` için bağımsız `TEST EDİLEBİLİR` veya `REVİZYON GEREKLİ` kararı bırakır. Sonra Taylan issue linkini Bora'ya getirir. Bora + Codex kapısı geçerse contract kapanır ve build açılır.

## Pod 2 - Vaka Formu

| Task | Owner | Reviewer | Verifier | Canlı durum |
|---|---|---|---|---|
| [`CASE-CONTRACT-01`](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/2) | Kerim | Emir | Burak | Ready - Owner teslimi yok |
| [`CASE-BUILD-01`](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/3) | Emir | Kerim | Burak | Blocked - contract gate bekleniyor |
| [`CASE-QUALITY-01`](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/4) | Burak | Emir | Kerim | Blocked - build bekleniyor |

### Pod 2 sonraki hareket

Kerim `CASE-CONTRACT-01` teslimini issue'ya yazar. Emir uygulanabilirlik review'u, Burak test edilebilirlik kararı bırakır. Üçü tamamlanınca Kerim issue linkini Bora'ya getirir.

## Park edilen hat

`REPORT-CONTRACT-01`, `REPORT-BUILD-01` ve `REPORT-QUALITY-01` güncel iki-pod pilotunun dışındadır. Emir'in contract çalışması ve Burak'ın test edilebilirlik yorumu issue geçmişinde korunur. Bu hat Bora yeni bir dönem açmadan ilerlemez.

## Task geçiş şartı

```text
Owner teslimi
-> İnsan Reviewer kararı
-> İnsan Verifier kanıtı
-> Pod Lead issue/PR linkini Bora'ya iletir
-> Bora + Codex son kanıt kontrolü
-> Sonraki task Ready
```

Codex insan Reviewer veya Verifier yerine geçmez.
