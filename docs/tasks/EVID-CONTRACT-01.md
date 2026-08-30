# EVID-CONTRACT-01 - Kanıt kartı contractı

**Pod:** Pod 1 - Kanıt Kartı
**Durum:** Done - 30 Ağustos 2026 maintainer kabulü
**Owner:** Taylan Akgün
**Reviewer:** Batıncan Kantar
**Verifier:** Cemresu Demir
**Depends on:** Yok
**Blocks:** `EVID-BUILD-01`

## Kullanıcı sonucu

Kullanıcı bir adayın iddiasını, kaynağını, gerekçesini ve değerlendirme durumunu tek kartta anlayabilir.

## Teslim

- Claim, source URL, rationale, status ve status-reason alanları.
- `NEW`, `POSSIBLE`, `REJECTED`, `VERIFIED` durum matrisi.
- Elenen kartın gerekçesiyle görünmeye devam etmesi.
- Güvenli HTTP(S) dış-link davranışı; server fetch etmez.
- Component prop/type taslağı; DB/mutation contractı değil.

## Acceptance criteria

- [ ] Dört durumun metni ve görsel işareti açık.
- [ ] Durum yalnız renkle anlatılmıyor.
- [ ] `REJECTED` gerekçesi zorunlu ve görünür.
- [ ] Geçersiz/izin verilmeyen URL davranışı test edilebilir.
- [ ] Kanıt ekleme, mutation, auth, DB ve URL preview kapsam dışı.
- [ ] Reviewer ve Verifier kararları issue'da.

## Bitiş kanıtı

- Contract ve durum tablosu.
- Reviewer uygulanabilirlik kararı.
- Verifier test edilebilirlik kararı.
- Açık karar/blocker listesi.

## Maintainer addendum

- Güncel hat adı `Pod 1 - Kanıt Kartı`dır.
- Güncel kickoff kaynağı `docs/kickoff/03-POD-1-KANIT-KARTI.md` dosyasıdır.
- Repo app scaffold'u, package manager ve gerçek test komutları içermiyor. Bu eksik, `EVID-BUILD-01` başlangıcındaki ortak blocker ve ilk plan maddesidir.
- Taylan Owner teslimi, Batıncan Reviewer onayı ve Cemresu Verifier kararı Issue #5'te korunur.
