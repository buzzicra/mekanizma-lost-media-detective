# Katkı rehberi

## 1. Issue seç

Yalnız `status:ready` etiketli ve dependency'si tamamlanmış issue alınır. Pod başına aynı anda yalnız bir task aktiftir.

## 2. Branch aç

```bash
git switch main
git pull --ff-only
git switch -c task/CASE-CONTRACT-01-kisa-aciklama
```

## 3. Agenta önce inceleme yaptır

İlk turda kod isteme. `AGENTS.md`, aktif issue, ilgili dokümanlar, repo durumu, mevcut patternler ve gerçek doğrulama komutları incelenir. Dosya sınırını ve doğrulama planını issue'ya yaz. Başlangıç promptları maintainer tarafından özel olarak yönetilir; public repoya eklenmez.

## 4. Küçük diff üret

Yalnız issue kapsamındaki dosyaları değiştir. Yeni dependency, ortak schema veya güvenlik sınırı gerekiyorsa blocker aç.

## 5. Kanıtla

Issue ve PR'da gerçek komutları, exit codeları, ekran kanıtını ve bilinen sınırları paylaş.

## 6. DCO ile commit et

```bash
git add <yalnızca-task-dosyaları>
git commit -s -m "feat: kısa ve net açıklama"
```

`-s`, commit mesajına Developer Certificate of Origin sign-off ekler.

## 7. PR aç

PR şablonunu eksiksiz doldur. Owner teslim eder; Reviewer kapsamı inceler; Verifier kabul kriterlerini dener. Son geçiş kararını Bora, Codex ile birlikte kanıt üzerinden verir.
