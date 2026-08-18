# TASK-ID — Kısa, sonuç odaklı başlık

## Sahiplik

- Pod:
- Owner:
- Reviewer:
- Verifier:
- Boyut: S / M

## Kullanıcı sonucu

> [Kim], [hangi durumda], [hangi işi] tamamlayabilecek.

## Bağlam

- İlgili ürün bölümü:
- Mimari/veri/API referansı:
- Benzer mevcut kod:
- İlgili karar kaydı:

## Değişiklik sınırı

### Değiştirilebilir

- `path/to/file-or-folder`

### Değiştirilemez

-

## Gereksinimler

1.
2.
3.

## Non-goal

-
-

## Kabul kriterleri

- [ ] Başarılı kullanıcı yolu:
- [ ] Loading/empty/error/success:
- [ ] Geçersiz input:
- [ ] Auth/ownership negatif yolu:
- [ ] Mobile/keyboard davranışı:
- [ ] Log/hata mesajında secret/PII yok:

## Veri ve güvenlik etkisi

- Auth/role:
- API contract:
- DB/migration:
- PII:
- Upload/external URL:
- Rate limit/idempotency:

Bu alanlardan biri değişiyorsa Bora/security checkpoint onayı:

## Bağımlılıklar

- `depends_on`:
- `blocks`:
- Başka pod handoff'u:

## Agent çalışma talimatı

1. Repo talimatlarını ve referans dosyaları oku.
2. `git status --short` ile mevcut değişiklikleri gör.
3. Yalnız değişiklik sınırında çalış.
4. Contract değiştirme ihtiyacında dur ve raporla.
5. Normal + hata yolunu test et.
6. Diff, komut, exit code ve kalan riski teslim et.

## Doğrulama

```bash
# Bu taska uygun gerçek komutlar issue açılırken yazılacak.
```

## Beklenen kanıt

- Test çıktısı:
- UI screenshot/video:
- API/DB kanıtı:
- A11y/perf kanıtı:

## Bitti sayılmaz, eğer

- acceptance kanıtlanmadıysa;
- reviewer/verifier yoksa;
- typecheck/test/build gerekli olduğu hâlde koşmadıysa;
- contract/doc güncel değilse;
- bilinen güvenlik riski saklandıysa.

