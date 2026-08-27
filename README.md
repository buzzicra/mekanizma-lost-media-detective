# Mekanizma - Lost Media Detective

Mekanizma topluluğunun birlikte geliştirdiği açık kaynak Lost Media Detective uygulaması.

Kullanıcı yarım hatırladığı medya içeriği için yapılandırılmış vaka açar. Topluluk kaynak bağlantılı kanıtlar ekler; elenen, olası ve doğrulanan adaylar görünür bir araştırma kaydına dönüşür.

## Şu an neredeyiz?

Aktif pilot düzeni:

- 2 pod
- 6 katılımcı
- Pod başına `Contract -> Build -> Quality` sırasıyla 3 task
- Toplam 6 aktif başlangıç taskı
- Pod başına WIP limiti 1

Repo henüz uygulama scaffold'u içermiyor. Build taskları, ilgili contract insan kapısı ve Bora + Codex kontrolü geçmeden başlamaz.

Canlı takip: [İlk Dikey Dilim - 2 Pod / 6 Task](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/1)

## Aktif podlar

| Pod | Kullanıcı sonucu | Ekip | Task sırası |
|---|---|---|---|
| Pod 1 - Kanıt Kartı | Claim, kaynak, gerekçe ve durumun güvenli kartta görünmesi | Taylan, Batıncan, Cemresu | `EVID-CONTRACT-01` -> `EVID-BUILD-01` -> `EVID-QUALITY-01` |
| Pod 2 - Vaka Formu | Alan, validation, focus, loading ve hata durumları çalışan form | Kerim, Emir, Burak | `CASE-CONTRACT-01` -> `CASE-BUILD-01` -> `CASE-QUALITY-01` |

Rapor/moderasyon hattı ürün backlog'unda korunur; bu pilotta aktif pod değildir. Eski `REPORT-*` issue'ları yapılan emeği kaybetmemek için `status:parked` durumunda tutulur.

## İlk yapacağın şey

1. [Buradan başlayın](./docs/kickoff/00-BURADAN-BASLAYIN.md) belgesini aç.
2. [Pod çalışma sistemini](./docs/POD-CALISMA-SISTEMI.md) oku.
3. Kendi [kişisel görev kartını](./docs/kickoff/kisi-kartlari/) aç.
4. Yalnız `status:ready` veya `status:in-progress` issue üzerinde çalış.
5. İlk agent turunda kod isteme; repo incelemesi ve dosya planı iste.
6. Owner, Reviewer ve Verifier kanıtı tamamlanmadan sonraki taska geçme.

## Roller nasıl döner?

| Task | Owner | Reviewer | Verifier |
|---|---|---|---|
| Contract | Contract Lead | Builder | Quality |
| Build | Builder | Contract Lead | Quality |
| Quality | Quality | Builder | Contract Lead |

Owner üretir. Reviewer kapsam ve doğruluğu kontrol eder. Verifier davranışı bağımsız dener. Bora + Codex kapısı bu iki insan kontrolünün yerine geçmez.

## Repo haritası

- [`docs/STATUS.md`](./docs/STATUS.md) - Güncel ilerleme ve bekleyen kapılar
- [`docs/tasks/`](./docs/tasks/) - Altı aktif taskın tekil briefleri
- [`docs/kickoff/`](./docs/kickoff/) - Pod ve kişi rehberleri
- [`docs/technical/`](./docs/technical/) - Ürün, mimari, veri ve uzun dönem backlog
- [Katkı rehberi](./CONTRIBUTING.md)
- [Güvenlik politikası](./SECURITY.md)

## Temel kural

```text
Owner teslimi -> Reviewer kararı -> Verifier kanıtı -> Bora + Codex kapısı -> Sonraki task
```

`Agent yaptı` kanıt değildir. Diff okunur; gerçek komutlar çalıştırılır; normal ve hata yolu görülür.

## Lisans

[GNU Affero General Public License v3.0](./LICENSE). Her commit DCO sign-off içermelidir.
