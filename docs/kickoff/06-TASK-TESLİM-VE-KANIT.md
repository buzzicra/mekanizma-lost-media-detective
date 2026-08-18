# Task Teslimi ve Kanıt

## Task başlamadan

- [ ] Task `Ready` mi?
- [ ] Tek owner, farklı reviewer ve verifier belli mi?
- [ ] Önceki task `Done` mı?
- [ ] Değiştirilebilir ve değiştirilemez alanlar belli mi?
- [ ] Normal ve hata yolu yazılı mı?
- [ ] Agent önce inspect yapacak mı?

## Owner teslimi

Owner şu başlıklarla teslim eder:

```text
Task:
Kullanıcı sonucu:
Değişen dosyalar:
Ne değişti:
Ne değişmedi:
Acceptance kanıtı:
Çalıştırılan komutlar ve exit code'lar:
Screenshot/video:
Bilinen sınırlar:
Sonraki taskı açan handoff:
```

## Reviewer kontrolü

- [ ] Diff task sınırında mı?
- [ ] Contract ve acceptance karşılanıyor mu?
- [ ] Gereksiz dependency veya ortak schema değişikliği var mı?
- [ ] Owner diff'i açıklayabiliyor mu?
- [ ] Hata ve loading davranışı unutulmuş mu?
- [ ] Değişiklik talebi veya onay gerekçeli mi?

## Verifier kontrolü

- [ ] Normal kullanıcı yolu çalıştı mı?
- [ ] En az bir invalid/error yolu çalıştı mı?
- [ ] Mobile/keyboard/focus kriteri varsa denendi mi?
- [ ] Gerçek komut ve exit code kaydedildi mi?
- [ ] Kanıt başka birinin de kontrol edebileceği biçimde mi?
- [ ] Geçmeyen kriter açıkça `Fail` yazıldı mı?

## Bitti sayılmaz

Şunlardan biri varsa task `Done` olmaz:

- acceptance maddesi kanıtsız;
- reviewer veya verifier yok;
- agent çıktısı okunmadan kabul edilmiş;
- gerekli test/typecheck/lint çalışmamış;
- fake success veya production mock kullanılmış;
- scope sessizce büyümüş;
- bilinen risk saklanmış;
- sıradaki kişiye neyin devredildiği belli değil.

