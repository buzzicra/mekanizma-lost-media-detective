# İlk dikey dilim durum takibi

## Kesin kapsam

- Toplam 9 task
- Pod başına 3 task
- Pod başına WIP limiti 1
- Task sırası: Contract → Build → Quality
- İnsan kapısı: Owner + Reviewer + Verifier
- Son kapı: Bora + Codex

## Pod 1 - Keşif ve Vaka Açma

- [ ] `CASE-CONTRACT-01` - Arden Owner / Alp Reviewer / Burak Verifier
- [ ] `CASE-BUILD-01` - Alp Owner / Arden Reviewer / Burak Verifier
- [ ] `CASE-QUALITY-01` - Burak Owner / Alp Reviewer / Arden Verifier

## Pod 2 - Kanıt ve Çözüm

- [ ] `EVID-CONTRACT-01` - Taylan Owner / Batıncan Reviewer / Cemresu Verifier
- [ ] `EVID-BUILD-01` - Batıncan Owner / Taylan Reviewer / Cemresu Verifier
- [ ] `EVID-QUALITY-01` - Cemresu Owner / Batıncan Reviewer / Taylan Verifier

## Pod 3 - Güven ve Süreklilik

- [ ] `REPORT-CONTRACT-01` - Emir Owner / Kerim Reviewer / Deniz Verifier
- [ ] `REPORT-BUILD-01` - Kerim Owner / Emir Reviewer / Deniz Verifier
- [ ] `REPORT-QUALITY-01` - Deniz Owner / Kerim Reviewer / Emir Verifier

## Task geçiş şartı

```text
Owner teslimi
→ İnsan Reviewer kararı
→ İnsan Verifier kanıtı
→ Pod Lead issue/PR linkini Bora'ya iletir
→ Bora + Codex son kanıt kontrolü
→ Sonraki task Ready
```

Codex insan Reviewer veya Verifier yerine geçmez.
