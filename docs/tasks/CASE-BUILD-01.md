# CASE-BUILD-01 - Form shell ve validation UI

**Pod:** Pod 2 - Vaka Formu
**Durum:** Ready
**Owner:** Emir Kaan Çatı (`@CodeAThing`)
**Reviewer:** Kerim Taşçı
**Verifier:** Burak Şimşek
**Depends on:** `CASE-CONTRACT-01`
**Blocks:** `CASE-QUALITY-01`

## Kullanıcı sonucu

Kullanıcı, contractta tanımlanan alanları ve doğrulama hatalarını erişilebilir bir formda görebilir.

## Teslim

- Koddan önce repo/scaffold incelemesi ve 5-8 maddelik dosya planı.
- Erişilebilir form componenti.
- Typed `onSubmit`; DB/API çağrısı yok.
- Invalid mesajları ve ilk hataya focus.
- `isSubmitting` ve parent submit-error davranışı.
- 375 px ve klavye davranışı.
- Normal ve invalid-input component testleri.

## Acceptance criteria

- [ ] `CASE-CONTRACT-01` Done ve handoff edilmiş.
- [ ] Tüm contract alanları ve kuralları arayüzde karşılanıyor.
- [ ] Submit loading ve parent error ayrı görünür.
- [ ] İlk invalid alana focus taşınıyor.
- [ ] 375 px görünüm ve yalnız-klavye akışı kullanılabilir.
- [ ] Normal ve invalid testleri geçiyor.

## Bitiş kanıtı

- Diff/PR ve ekran kanıtı.
- Gerçek test/typecheck/lint komutları ve exit codelar.
- Reviewer kararı.
- Verifier normal + invalid senaryo sonucu.
