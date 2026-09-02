# Agent çalışma kuralları

Bu repo yeni başlayan katılımcıların agentlarla birlikte çalıştığı açık kaynak bir eğitim projesidir.

## Kaynak doğruluğu

Çelişki halinde sıralama:

1. Güvenlik ve veri koruma kuralları
2. `docs/technical/03-veri-modeli.md`
3. `docs/technical/04-api-ve-is-akislari.md`
4. `docs/technical/01-urun-ve-kapsam.md`
5. Aktif GitHub issue
6. Eski workshop notları

## Task disiplini

- Yalnız `status:ready` veya `status:in-progress` task üzerinde çalış.
- Dependency `Done` değilse implementasyona başlama.
- Pod başına WIP limiti 1.
- İlk agent turu inceleme ve dosya planıdır; kod üretmez.
- Owner, Reviewer ve Verifier farklı kişilerdir.
- Scope dışı işi sessizce ekleme; yeni issue veya blocker aç.
- Ortak auth, DB, storage, migration, CI veya güvenlik sınırı Bora onayı olmadan değişmez.

## Kod ve kanıt

- Branch: `task/<task-id>-kisa-aciklama`
- Küçük, okunabilir diff üret.
- Loading, error, empty/invalid ve success durumlarını ele al.
- Gerçek test/typecheck/lint/build komutlarını çalıştır.
- Çalışmayan veya bulunmayan gate'i başarılı gösterme.
- Secret, kişisel veri veya production verisi commit etme.
- Production yolunda fake success veya mock veri kullanma.
- Commitleri `git commit -s` ile DCO sign-off içerecek biçimde oluştur.

## Teslim

PR açıklaması task ID, kullanıcı sonucu, değişen dosyalar, acceptance kanıtı, komutlar, ekran kanıtı, bilinen sınırlar ve handoff içermelidir.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
