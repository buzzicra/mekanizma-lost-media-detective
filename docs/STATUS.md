# Final kodlama sprinti — durum

**Snapshot:** 2 Eylül 2026

**Aktif düzen:** 2 ürün hattı, 6 katılımcı, kişi başına 1 final kodlama taskı

**Uygulama tabanı:** `main` commit `49be8c6`; Next.js + strict TypeScript + Tailwind + Zod + Vitest + Playwright

## Evidence hattı

| Task | Owner | Reviewer | Verifier | Canlı durum |
| --- | --- | --- | --- | --- |
| [FINAL-EVID-01](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/14) | Taylan | Cemresu | Batıncan | Ready — model/helper ve unit test başlayabilir |
| [FINAL-EVID-02](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/15) | Batıncan | Taylan | Cemresu | Blocked by #14 — plan hazırlanabilir |
| [FINAL-EVID-03](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/16) | Cemresu | Batıncan | Taylan | Blocked by #14 + #15 — test matrisi hazırlanabilir |

Taylan teknik koordinasyonu, Batıncan UI kalite standardını, Cemresu QA/retest ve final kalite kararını da taşır. Bu ek sorumluluk başka Ownerın dosyasını sessizce değiştirme yetkisi vermez.

## Case hattı

| Task | Owner | Reviewer | Verifier | Canlı durum |
| --- | --- | --- | --- | --- |
| [FINAL-CASE-01](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/17) | Kerim | Burak | Emir | Ready — schema/validation ve unit test başlayabilir |
| [FINAL-CASE-02](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/18) | Emir | Kerim | Burak | Blocked by #17 — plan hazırlanabilir |
| [FINAL-CASE-03](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/19) | Burak | Emir | Kerim | Blocked by #17 + #18 — test matrisi hazırlanabilir |

Burakın GitHub daveti hâlâ kabul edilmediyse #19 assignee alanı boş kalır. Planı issue yorumunda hazırlayabilir; kod/PR için daveti kabul eder veya fork kullanır.

## Bugün başlayabilen kod

- Taylan: #14
- Kerim: #17

Batıncan, Cemresu, Emir ve Burakın da final görevleri verilmiştir. Bugünkü doğru iş; kendi issue'sunu okumak, agentla plan/test matrisi çıkarmak, dependency handoffunu beklemektir.

## Kapanış kapısı

```text
Owner teslimi
→ Reviewer kararı
→ Verifier kanıtı
→ Bora + Codex son kontrolü
→ PASS veya PASS WITH HANDOFF
```

Katılımcı sprinti bittikten sonra kalan entegrasyon, app route, API, DB, auth, ürün QA ve release çalışması Bora + Codex tarafından tamamlanır.

## Tarihsel kayıt

- #2 ve #5 kabul edilmiş contract kaynaklarıdır.
- #3, #4, #6 ve #7 final görevler tarafından supersede edilip kapatıldı.
- #8, #9 ve #10 rapor/moderasyon hattında park edildi.
