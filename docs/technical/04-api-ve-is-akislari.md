# 04 — API ve İş Akışları

## 1. Kontrat yaklaşımı

Uygulama Next.js Server Actions ve Route Handlers kullanabilir. Podların bağlı olduğu şey HTTP ayrıntısı değil, stabil domain kontratıdır.

```text
UI → transport adapter → domain service → repository
```

Her yazma işlemi:

```text
auth → rate limit → validate → authorize → execute transaction → audit → notify → response
```

## 2. Ortak kurallar

- JSON request/response; upload hariç.
- Runtime doğrulama zorunlu.
- Bilinmeyen alanlar reddedilir veya şemaya göre temizlenir; sessizce DB'ye yazılmaz.
- Zamanlar ISO 8601 UTC.
- Kimlikler UUID; public URL'de slug + kısa ID kullanılabilir.
- Listeleme cursor pagination kullanır.
- Mutasyonlarda `Idempotency-Key` desteklenir.
- Error response `code`, kullanıcı mesajı, opsiyonel `fieldErrors`, `requestId` taşır.
- `404`, yetkisiz kişinin özel kaynağın varlığını anlamasını engellemek için bazı durumlarda `403` yerine kullanılabilir.

## 3. Public sorgular

### `GET /api/search`

**Auth:** Yok  
**Rate limit:** IP/anon session bazlı 30 istek/dakika başlangıç değeri  
**Query:**

```ts
type SearchQuery = {
  q: string;                 // 2–200
  mediaType?: MediaType;
  language?: string;
  countryRegion?: string;
  yearFrom?: number;
  yearTo?: number;
  status?: "OPEN" | "RESEARCHING" | "STRONG_CANDIDATE" | "SOLVED";
  cursor?: string;
  limit?: number;            // 1–50, default 20
};
```

**Response:** sonuç view model'i, eşleşme sinyalleri, `nextCursor`, toplam tahmini değilse uydurulmaz.

**Edge caseler:** kısa query, ters yıl aralığı, aşırı filtre, timeout, boş sonuç, Unicode ve TR karakterleri.

### `GET /api/cases/:slug`

**Auth:** Public içerik için yok  
**Davranış:**

- Public ve aktif vaka → `200`
- Merge edilmiş vaka → canonical URL'ye `308`
- Taslak/hidden/soft deleted → yetkisiz için `404`
- Bulunamadı → kontrollü `404`

Response yalnız public profile alanlarını ve görünür kanıtları taşır.

## 4. Vaka komutları

### `POST /api/cases/drafts`

**Auth:** Member  
**Rate limit:** kullanıcı başına 10/saat başlangıç değeri  
**Amaç:** formu private taslak kaydetme.

```ts
type CreateCaseDraftInput = {
  title?: string;
  mediaType?: MediaType;
  contentLanguage?: string;
  countryRegion?: string;
  seenOn?: string;
  yearFrom?: number;
  yearTo?: number;
  yearUnknown?: boolean;
  rememberedDetails?: string;
  rememberedQuote?: string;
  previousSearches?: string;
  mediaSpecificDetails?: unknown;
  formSchemaVersion: 1;
};
```

Taslak için alanlar kısmi olabilir; server yine tip, boyut ve zararlı içerik sınırlarını doğrular.

### `POST /api/cases/:id/similar`

**Auth:** Owner  
**Amaç:** yayın öncesi benzer vaka sonuçlarını döndürme.  
**Kural:** Sonuç, yayınlamayı zorla engellemez. Client sonuç gösterdiğini ve kullanıcının devam kararını yayın isteğine ekler.

### `POST /api/cases/:id/publish`

**Auth:** Owner  
**Headers:** `Idempotency-Key`  
**Transaction:** doğrulama + publish + status event + audit.

```ts
type PublishCaseInput = {
  similarCheckToken: string;
  duplicateDecision: "NO_MATCH" | "CONTINUE_ANYWAY";
  safetyConfirmed: true;
};
```

Kontroller:

- tüm zorunlu alanlar;
- başlık/slug PII ve reserved terim kontrolü;
- kayıp kişi/doxxing güvenlik sinyali;
- benzer vaka kontrolünün güncelliği;
- visibility önce draft;
- aynı idempotency key tekrarında aynı sonuç.

### `PATCH /api/cases/:id`

**Auth:** Owner; moderator redaksiyon için ayrı komut kullanır.  
**Concurrency:** `version` veya `updatedAt` optimistic lock.  
**Kural:** Çözülmüş vaka düzenlemesi çözüm bütünlüğünü bozmaz; kritik alan değişiklikleri audit edilir.

## 5. Kanıt komutları

### `POST /api/cases/:id/evidence`

**Auth:** Member  
**Rate limit:** kullanıcı başına 20/saat, vaka başına burst limiti  
**Headers:** `Idempotency-Key`

```ts
type CreateEvidenceInput = {
  claim: string;       // 10–500
  sourceUrl: string;   // http/https
  rationale: string;   // 30–2.000
  attachmentId?: string;
};
```

Kural:

- çıplak URL/reason'sız kayıt reddedilir;
- private/local/file/javascript/data URL şemaları reddedilir;
- server URL'yi fetch etmez;
- attachment aynı kullanıcıya ait, accepted ve henüz bağlanmamış olmalıdır;
- merged/hidden/deleted vakaya ekleme yapılmaz;
- vaka `OPEN` ise aynı transactionda `RESEARCHING` olur.

### `PATCH /api/evidence/:id`

**Auth:** Evidence author  
**Kural:** Claim/rationale/source düzeltilebilir; verified evidence düzenlenirse durum `NEW` veya `POSSIBLE`e düşürülür ve yeniden değerlendirme gerekir. Moderator redaksiyon yolu ayrıdır.

### `POST /api/evidence/:id/status`

**Auth:** Case owner veya moderator  
**Input:** hedef status + gerekçe  
**Kural:** Geçiş tablosuna uymayan değişiklik `409 INVALID_STATUS_TRANSITION`; `REJECTED` için gerekçe zorunlu.

## 6. Çözüm komutları

### `POST /api/cases/:id/solve`

**Auth:** Case owner; moderator fallback  
**MFA:** Moderator kritik eylemi için yakın tarihli doğrulama  
**Transaction:** solution + case state + event + notifications + audit.

```ts
type SolveCaseInput = {
  evidenceId?: string;
  canonicalName: string;
  sourceUrl: string;
  explanation: string;
};
```

Kurallar:

- vaka public, aktif ve merge edilmemiş;
- evidence verilmişse aynı vakaya ait ve `POSSIBLE` veya `VERIFIED` durumunda;
- kaynak ve açıklama zorunlu;
- `POSSIBLE` çözüm kanıtı aynı transactionda `VERIFIED` yapılır; evidence yoksa neden evidence'sız çözüldüğü audit edilir;
- tekrar istek aynı çözümü üretir; farklı çözüm `409`.

### `POST /api/cases/:id/reopen`

**Auth:** Moderator  
**Input:** gerekçe  
**Davranış:** aktif solution revoke edilir; vaka `RESEARCHING`; ilgili kişiler bildirilir; audit zorunlu.

## 7. Duplicate akışı

### `POST /api/moderation/cases/:sourceId/merge`

**Auth:** Moderator + MFA/recent auth  
**Input:** `canonicalCaseId`, gerekçe, dry-run sonucu hash'i  
**Ön kontrol:**

- iki vaka farklı;
- canonical aktif/public;
- source zaten merge değil;
- merge cycle oluşmuyor;
- canonical tercihen daha eski;
- iki vakanın sahip ve katkı listesi çıkarılmış.

### İki aşama

1. `POST .../merge-preview`: taşınacak evidence, solution conflict, slug ve bildirim etkisini gösterir.
2. `POST .../merge`: preview hash aynıysa transaction çalışır.

Başarılı merge sonrası eski URL canonical vakaya yönlenir. Veri kopyalanıp unutulmaz; origin case kimliği korunur.

## 8. Upload akışı

### `POST /api/uploads/evidence/intents`

**Auth:** Member  
**Input:** filename, client MIME, byte size, target case ID, rights confirmation  
**Output:** upload ID, rastgele storage key, kısa ömürlü upload izni.

### `POST /api/uploads/evidence/:id/finalize`

**Auth:** Intent owner  
**İş:** gerçek obje boyutu, signature, decode, dimensions, malware/image bomb sınırı, re-encode/EXIF temizliği. Başarılıysa `accepted`; değilse güvenli hata ve obje cleanup.

Upload intent TTL dolunca background cleanup veya periyodik job orphan objeyi kaldırır.

## 9. Rapor ve moderasyon

### `POST /api/reports`

**Auth:** Member  
**Input:** tek hedef, reason, details  
**Rate limit:** spam'i engeller; aynı aktör/hedef/reason aktifken duplicate oluşturmaz.

PII ve doxxing raporları yüksek önceliklidir. Otomatik gizleme yalnız açık yüksek güvenli kurallar için değerlendirilir; aksi durumda kuyruk.

### `GET /api/moderation/reports`

**Auth:** Moderator  
**Filtre:** status, priority, reason, cursor.  
**Response:** yalnız görev için gereken veri; reporter e-postası yok.

### `POST /api/moderation/reports/:id/actions`

```ts
type ModerationActionInput = {
  action:
    | "DISMISS"
    | "REDACT"
    | "HIDE"
    | "RESTORE"
    | "SOFT_DELETE"
    | "WARN_USER"
    | "SUSPEND_USER";
  reason: string;
  redactionPatch?: unknown;
};
```

Her aksiyon için allowlist ve role kontrolü vardır. Raw patch doğrudan DB'ye uygulanmaz; action özel schema kullanılır.

## 10. Profil ve bildirim

### `GET /api/profiles/:handle`

Public profil yalnız handle, display name, bio, avatar ve public katkı özetini döndürür. E-posta, auth provider, moderation geçmişi ve özel taslak görünmez.

### `GET /api/notifications`

**Auth:** Owner  
**Pagination:** cursor  
**Filter:** unread/all.

### `POST /api/notifications/:id/read`

**Auth:** Recipient  
**Idempotent:** zaten okunduysa `200`.

## 11. Domain service kontratları

```ts
interface CaseService {
  createDraft(actor: Actor, input: CreateCaseDraftInput): Promise<CaseDraftView>;
  findSimilar(actor: Actor, caseId: string): Promise<SimilarCaseResult[]>;
  publish(actor: Actor, caseId: string, input: PublishCaseInput): Promise<CaseView>;
  update(actor: Actor, caseId: string, input: UpdateCaseInput): Promise<CaseView>;
  solve(actor: Actor, caseId: string, input: SolveCaseInput): Promise<CaseView>;
}

interface EvidenceService {
  create(actor: Actor, caseId: string, input: CreateEvidenceInput): Promise<EvidenceView>;
  update(actor: Actor, evidenceId: string, input: UpdateEvidenceInput): Promise<EvidenceView>;
  changeStatus(actor: Actor, evidenceId: string, input: ChangeEvidenceStatusInput): Promise<EvidenceView>;
}
```

Gerçek implementasyonda `Actor` istemciden alınmaz; doğrulanmış session'dan üretilir.

## 12. Rate-limit başlangıç matrisi

Bu değerler pilot başlangıcıdır; metrics sonrası ayarlanır.

| İşlem | Limit anahtarı | Başlangıç |
|---|---|---:|
| Public search | IP/anon | 30/dk |
| OTP gönder | e-posta hash + IP | 3/15 dk |
| OTP doğrula | challenge + IP | 5/challenge |
| Draft oluştur | user | 10/saat |
| Vaka yayınla | user | 5/gün |
| Kanıt ekle | user | 20/saat |
| Upload intent | user | 10/saat |
| Raporla | user | 10/gün |
| Moderation | moderator | Anomali izleme; kaba limit |

Limit cevabı `Retry-After` döndürür. Fail-open/fail-closed kararı işleme göre belirlenir: auth ve upload koruması fail-closed; public search kontrollü degrade olabilir.

## 13. Transaction sınırları

Tek transaction gerekenler:

- vaka yayınlama + status event + audit;
- kanıt ekleme + `OPEN→RESEARCHING` geçişi + notification;
- evidence status + event + notification;
- solve/reopen;
- merge + ilişkilerin taşınması + redirect state + audit;
- moderasyon redaksiyon/hide + report resolution + audit.

Analytics transaction dışında ve başarısızlığı ana işlemi bozmayacak şekilde çalışır. Audit kritik eylemde transaction içindedir.

## 14. Hata ve retry davranışı

| Hata | Kullanıcı deneyimi | Retry |
|---|---|---|
| Validation | Alan yanında açık hata | Kullanıcı düzeltir |
| Auth expired | Form state korunur, tekrar giriş | Bir kez |
| Conflict/version | Güncel veri gösterilir | Kullanıcı kararı |
| Rate limit | Ne zaman deneyebileceği | `Retry-After` |
| DB transient | Genel hata + request ID | Güvenli/idempotent ise sınırlı |
| Storage failure | Upload başarısız, tekrar seç | Yeni intent |
| Provider OAuth | Sağlayıcı hatası + email OTP alternatifi | Manuel |
| Search timeout | Filtre daralt + yeniden dene | Kontrollü |

Kör retry mutasyonları çoğaltmaz; idempotency key zorunlu akışlarda korunur.

## 15. Kontrat testi matrisi

Her mutasyon için en az:

1. başarılı yetkili istek;
2. auth yok;
3. yanlış sahip/rol;
4. geçersiz input;
5. var olmayan veya private kaynak;
6. invalid state transition;
7. duplicate/idempotent tekrar;
8. dependency/DB hata dönüşümü;
9. audit ve notification yan etkisi;
10. hassas hata detayının sızmaması.
