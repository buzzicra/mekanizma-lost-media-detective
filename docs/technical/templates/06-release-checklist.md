# Release Candidate Checklist

## Kimlik

- Sürüm:
- Commit/tag adayı:
- Tarih:
- Release owner:
- Preview/staging URL:
- Feature freeze tarihi:

## Ürün akışı

- [ ] Public arama ve filtre
- [ ] Benzer vaka kontrolü
- [ ] Auth + form state recovery
- [ ] Draft → publish
- [ ] Public vaka detayı
- [ ] Evidence create + status
- [ ] Strong candidate + solve/reopen
- [ ] Profile + notifications
- [ ] Report + moderation
- [ ] Duplicate preview/merge + canonical redirect

## UI durumları

- [ ] Loading
- [ ] Empty + CTA
- [ ] Error + retry/eylem
- [ ] Success feedback
- [ ] Invalid input
- [ ] Unauthorized/forbidden
- [ ] 375 / 768 / 1280+
- [ ] TR / EN

## Doğrulama kanıtı

| Gate | Komut/senaryo | Exit/sonuç | Kanıt linki | Owner |
|---|---|---:|---|---|
| Lint |  |  |  |  |
| Typecheck |  |  |  |  |
| Unit |  |  |  |  |
| Integration/RLS |  |  |  |  |
| Build |  |  |  |  |
| E2E |  |  |  |  |
| A11y |  |  |  |  |
| Security |  |  |  |  |
| Container |  |  |  |  |
| Search perf |  |  |  |  |

## Güvenlik

- [ ] OAuth redirect allowlist
- [ ] OTP single-use/rate-limit
- [ ] Session rotation/logout
- [ ] Moderator MFA/recent-auth
- [ ] IDOR/permission negatif testleri
- [ ] Upload signature/size/EXIF/image-bomb
- [ ] User URL server tarafından fetch edilmiyor
- [ ] Secret client bundle/loglarda yok
- [ ] PII report/redaction/cache purge
- [ ] Dependency/secret/SAST sonucu incelendi

## Operasyon

- [ ] Env adları doğrulandı; değerler loglanmadı
- [ ] Migration preview'da geçti
- [ ] Taze backup var
- [ ] Restore kanıtı güncel
- [ ] Liveness/readiness geçti
- [ ] Structured logs + error monitoring
- [ ] Rollback image/tag belli
- [ ] Production SMTP/auth sağlayıcı handshake

## Açık kaynak ve docs

- [ ] LICENSE AGPL-3.0
- [ ] README clean install
- [ ] CONTRIBUTING + DCO
- [ ] CODE_OF_CONDUCT
- [ ] SECURITY private disclosure
- [ ] CHANGELOG/release notes
- [ ] Known limitations
- [ ] Source-code link UI'da

## SEO

- [ ] Unique title/description/canonical
- [ ] Draft/mod/merged `noindex`
- [ ] Sitemap yalnız public aktif vakalar
- [ ] Robots doğru
- [ ] Merge redirect doğru
- [ ] Kaldırılan içerik 404/410 kararı

## Açık blockerlar

| ID | Seviye | Owner | Karar |
|---|---|---|---|
|  | P0/P1/P2 |  |  |

## Release kararı

- [ ] GO
- [ ] NO-GO
- [ ] Koşullu

Karar gerekçesi:

Onaylayan reviewerlar:

