# Mekanizma - Lost Media Detective

Mekanizma topluluğunun birlikte geliştirdiği açık kaynak Lost Media Detective uygulaması.

Bir kullanıcı yarım hatırladığı medya içeriği için yapılandırılmış vaka açar. Topluluk kaynak bağlantılı kanıtlar ekler; elenen, olası ve doğrulanan adaylar görünür bir araştırma kaydına dönüşür.

## Şu an neredeyiz?

Uygulama koduna geçmeden önce ilk çalışan dikey dilimi hazırlıyoruz.

- 3 pod
- 9 katılımcı
- Pod başına 3 başlangıç taskı
- Toplam 9 başlangıç taskı
- Pod başına aynı anda yalnız 1 aktif task

Bu 9 task bütün proje değildir. İlk arayüz dilimidir. Uzun dönem task DAG'i [teknik planda](./docs/technical/08-uygulama-plani-task-dag.md) tutulur.

Canlı ilerleme: [İlk Dikey Dilim - 9 Task tracker](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/1)

## Podlar

| Pod | Sonuç | Lead / Bora iletişimi | İlk sıra |
|---|---|---|---|
| Pod 1 | Yönlendirmeli vaka formu | Arden Olgundemir | `CASE-CONTRACT-01` → `CASE-BUILD-01` → `CASE-QUALITY-01` |
| Pod 2 | Kaynaklı kanıt kartı | Taylan Akgün | `EVID-CONTRACT-01` → `EVID-BUILD-01` → `EVID-QUALITY-01` |
| Pod 3 | Güvenli rapor formu | Emir Kaan Çatı | `REPORT-CONTRACT-01` → `REPORT-BUILD-01` → `REPORT-QUALITY-01` |

## Başlama sırası

1. [Buradan başlayın](./docs/kickoff/00-BURADAN-BASLAYIN.md).
2. [Pod çalışma sistemini](./docs/POD-CALISMA-SISTEMI.md) okuyun.
3. Yalnız `status:ready` etiketli issue üzerinde çalışın.
4. Owner tesliminden sonra Reviewer ve Verifier kararını issue'ya yazar.
5. Üç kontrol tamamlanınca Pod Lead issue/PR linkiyle Bora'ya ulaşır.
6. Bora ve Codex kanıt kapısını birlikte kontrol eder; sonra sıradaki task açılır.

## Her taskta roller değişir

| Task türü | Owner | Reviewer | Verifier |
|---|---|---|---|
| Contract | Lead / Contract | Builder / Integration | Quality / Handoff |
| Build | Builder / Integration | Lead / Contract | Quality / Handoff |
| Quality | Quality / Handoff | Builder / Integration | Lead / Contract |

Reviewer ve Verifier yalnız isim değildir. İkisi issue'ya gerekçeli karar ve kontrol kanıtı bırakır. Bora + Codex kapısı bu iki insan kontrolünün yerine geçmez; son geçiş kontrolüdür.

## Repo haritası

- [`docs/tasks/`](./docs/tasks/) - İlk dokuz taskın tekil briefleri
- [`docs/kickoff/`](./docs/kickoff/) - Yeni başlayanlara yönelik pod ve kişi rehberleri
- [`docs/technical/`](./docs/technical/) - Ürün, mimari, veri ve uzun dönem task DAG'i
- [`docs/plans/`](./docs/plans/) - Onaylanmış işletim kararları
- [Katkı rehberi](./CONTRIBUTING.md)
- [Güvenlik politikası](./SECURITY.md)

## Temel kural

```text
Owner teslimi → Reviewer onayı → Verifier kanıtı → Bora + Codex kapısı → Sonraki task
```

`Agent yaptı` kanıt değildir. Diff okunur; gerçek komutlar çalıştırılır; ekran ve hata yolu görülür.

## Lisans

[GNU Affero General Public License v3.0](./LICENSE). Her commit DCO sign-off içermelidir.
