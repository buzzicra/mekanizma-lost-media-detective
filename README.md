# Mekanizma — Lost Media Detective

Mekanizma topluluğunun birlikte geliştirdiği açık kaynak Lost Media Detective uygulaması.

Kullanıcı yarım hatırladığı medya içeriği için yapılandırılmış vaka açar. Topluluk kaynak bağlantılı kanıtlar ekler; elenen, olası ve doğrulanan adaylar görünür bir araştırma kaydına dönüşür.

## Şu an neredeyiz?

- Ortak Next.js/TypeScript/test scaffoldı [PR #13](https://github.com/buzzicra/mekanizma-lost-media-detective/pull/13) ile `main`e alındı.
- Altı katılımcının birer final kodlama görevi var.
- Evidence ve Case hatları paralel ilerler; her hattın kendi içinde dependency sırası vardır.
- Auth, DB, API, upload, deploy ve kalan ürün entegrasyonu Bora + Codex hattında kalır.
- Ana takip yüzeyi: [Final kodlama sprinti trackerı](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/1).

## Final görevler

| Hat      | Sıra                                                                                                                                                                                                                                                                  | Owner                       | Durum                                    |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ---------------------------------------- |
| Evidence | [FINAL-EVID-01](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/14) → [FINAL-EVID-02](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/15) → [FINAL-EVID-03](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/16) | Taylan → Batıncan → Cemresu | #14 Ready; diğerleri dependency bekliyor |
| Case     | [FINAL-CASE-01](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/17) → [FINAL-CASE-02](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/18) → [FINAL-CASE-03](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/19) | Kerim → Emir → Burak        | #17 Ready; diğerleri dependency bekliyor |

Blocked durum görev olmadığı anlamına gelmez. Sonraki Owner planını ve test matrisini hazırlar; bağlı public API/handoff gelmeden kod yazmaz.

## İlk yapacağın şey

1. [Buradan başlayın](./docs/kickoff/00-BURADAN-BASLAYIN.md) belgesini aç.
2. [Pod çalışma sistemini](./docs/POD-CALISMA-SISTEMI.md) oku.
3. Kendi final issue'nu aç; dosya sahipliğini ve dependency'yi kontrol et.
4. `main`de scaffold commitinin (`49be8c6` veya daha yeni) bulunduğunu doğrula.
5. İlk agent turunda kod isteme; repo incelemesi, dosya planı ve test eşlemesi iste.
6. Reviewer planı gördükten sonra yalnız kendi dosya alanında kodla.

## Temel kapı

```text
Owner kod + kanıt
→ Reviewer kapsam/contract kararı
→ Verifier bağımsız davranış kanıtı
→ Bora + Codex final gate
```

`Agent yaptı` kanıt değildir. Diff okunur; gerçek komutlar çalıştırılır; normal ve hata yolu görülür.

## Repo haritası

- [`app/`](./app/) — uygulama giriş noktaları ve global stiller
- `components/` — final UI görevlerinin sahip olacağı bileşen alanı
- `features/` — final model görevlerinin sahip olacağı domain/UI-local alan
- [`lib/i18n/`](./lib/i18n/) — tip güvenli `tr` / `en` metin düzeni
- [`tests/`](./tests/) — unit/component ve Playwright E2E kontrolleri
- [`docs/STATUS.md`](./docs/STATUS.md) — güncel ilerleme ve bekleyen kapılar
- [`docs/tasks/`](./docs/tasks/) — aktif final task briefleri ve tarihsel tasklar
- [Katkı rehberi](./CONTRIBUTING.md)
- [Güvenlik politikası](./SECURITY.md)

## Yerel kurulum

Node.js `20.9+` ve pnpm `10.27.0` gerekir.

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm exec playwright install chromium
pnpm dev
```

## Doğrulama komutları

```bash
python3 scripts/validate_repo.py
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

Bu komutlardan biri çalışmıyorsa görev tamamlanmış sayılmaz. Issue daha dar veya ek bir komut yazıyorsa issue önceliklidir.

## Lisans

[GNU Affero General Public License v3.0](./LICENSE). Her commit DCO sign-off içermelidir.
