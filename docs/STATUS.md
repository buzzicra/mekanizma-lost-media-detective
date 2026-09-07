# Final kodlama sprinti — durum

**Snapshot:** 7 Eylül 2026

**Aktif düzen:** Katılımcı sprinti bitti; altı issue açık, kalan uygulama entegrasyonu Bora + Codex hattında

**Uygulama tabanı:** `main` commit `f3200fd3`; Next.js + strict TypeScript + Tailwind + Zod + Vitest + Playwright

## Evidence hattı

| Task | Owner | Reviewer | Verifier | Canlı durum |
| --- | --- | --- | --- | --- |
| [FINAL-EVID-01](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/14) | Taylan | Cemresu | Batıncan | Maintainer entegrasyonunda; issue açık |
| [FINAL-EVID-02](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/15) | Batıncan | Taylan | Cemresu | Maintainer entegrasyonunda; issue açık |
| [FINAL-EVID-03](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/16) | Cemresu | Batıncan | Taylan | Maintainer entegrasyonunda; issue açık |

Taylan teknik koordinasyonu, Batıncan UI kalite standardını, Cemresu QA/retest ve final kalite kararını da taşır. Bu ek sorumluluk başka Ownerın dosyasını sessizce değiştirme yetkisi vermez.

## Case hattı

| Task | Owner | Reviewer | Verifier | Canlı durum |
| --- | --- | --- | --- | --- |
| [FINAL-CASE-01](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/17) | Kerim | Burak | Emir | Schema entegre; issue açık |
| [FINAL-CASE-02](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/18) | Emir | Kerim | Burak | Maintainer UI entegrasyonunda; issue açık |
| [FINAL-CASE-03](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/19) | Burak | Emir | Kerim | Test paketi entegre; issue açık |

Burakın GitHub daveti hâlâ kabul edilmediyse #19 assignee alanı boş kalır. Planı issue yorumunda hazırlayabilir; kod/PR için daveti kabul eder veya fork kullanır.

## Çalışan dilimler

- `/evidence`: dört kanıt durumu, kaynak güvenlik kontrolü, eksik içerik fallbackleri.
- `/cases/new`: on alan, locale-aware validation, error summary, focus, submitting ve parent error davranışı.
- `/`: iki route'a gerçek bağlantı ve dürüst geliştirme durumu.

Bu dilimler UI/validation seviyesindedir. Veri kaydı, auth, API, DB, upload ve production deploy bağlı değildir.

## Kapanış kapısı

```text
Owner teslimi
→ Reviewer kararı
→ Verifier kanıtı
→ Bora + Codex son kontrolü
→ PASS veya PASS WITH HANDOFF
```

Issue'lar bu entegrasyonda otomatik kapanmaz. PR açıklamasında `Closes` kullanılmaz.

## Tarihsel kayıt

- #2 ve #5 kabul edilmiş contract kaynaklarıdır.
- #3, #4, #6 ve #7 final görevler tarafından supersede edilip kapatıldı.
- #8, #9 ve #10 rapor/moderasyon hattında park edildi.
