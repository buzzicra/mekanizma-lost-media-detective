# Tasarım Yönü — Araştırma Dosyası

## Ürün anlamı

Lost Media Detective; sosyal akış değil, birlikte tutulan araştırma dosyasıdır. Arayüzün hatırlatması gereken şey “kart kataloğu + kanıt masası”: sakin, okunabilir, kaynak odaklı, durumları kaybetmeyen.

## Referanslardan alınan ilkeler

- [Internet Archive](https://archivesupport.zendesk.com/hc/en-us/articles/360016403272-Managing-and-Editing-Your-Items-A-Basic-Guide): tek item çevresinde metadata ve sahiplik netliği.
- [Are.na](https://www.are.na/about): içerik bloklarını düşük gürültüyle biriktirme, bağlama ve birlikte çalışma.
- [Library of Congress Digital Collections](https://www.loc.gov/research-centers/manuscript/collections/digital-collections/): koleksiyon, dönem ve format bilgisini araştırma bağlamı olarak öne çıkarma.
- [Lost Media Wiki](https://lostmediawiki.com/Home): vaka ve durum dilinin topluluk araştırmasını yönlendirmesi.

Kompozisyon, marka öğesi veya asset kopyalanmaz. Yalnız bilgi hiyerarşisi ve provenance ilkeleri alınır.

## Art direction

**Araştırma dosyası.** Sıcak kâğıt yüzeyi, koyu mürekkep, fosforlu işaret ve pas tonlu uyarı. Büyük serif başlıklar “arşiv kaydı” hissi verir; monospace mikro metinler status, alan kodu ve kaynak bilgisini ayırır. Kartlar yuvarlak SaaS kutuları değil, çizgili dosya parçalarıdır.

## Tokenlar

```css
:root {
  --ink: #18211b;
  --paper: #f1eddf;
  --paper-deep: #e4deca;
  --acid: #dcff48;
  --rust: #a73f27;
  --blue: #2d5f73;
  --line: rgba(24, 33, 27, 0.26);
  --muted: #536057;
  --danger-surface: #f6d7cd;
  --success-surface: #d8e8cf;

  --font-display: "Iowan Old Style", "Palatino Linotype", "Book Antiqua", Palatino, serif;
  --font-body: "Avenir Next", Avenir, "Segoe UI", sans-serif;
  --font-code: "SFMono-Regular", Consolas, "Liberation Mono", monospace;

  --space-1: 0.375rem;
  --space-2: 0.75rem;
  --space-3: 1rem;
  --space-4: 1.5rem;
  --space-5: 2rem;
  --space-6: 3rem;

  --radius-control: 0.2rem;
  --radius-panel: 0;
  --focus: 3px solid var(--rust);
}
```

## Davranış

- Desktop içerik ölçüsü en çok `76rem`; form okuma ölçüsü en çok `48rem`.
- 375 px tek sütun; 768 px alan grupları; 1280 px açıklama + iş yüzeyi dengesi.
- Kart üst çizgisi statusa göre değişebilir; metin etiketi ve işaret zorunludur.
- Input yüksekliği en az 44 px; label kontrolün üstünde kalır.
- Hata yalnız renkle anlatılmaz; metin + `aria-invalid` + summary kullanılır.
- Hover küçük yön değişimi/underline olabilir; animasyon 160 ms altında, reduced-motion'da kapalıdır.
- Uzun kullanıcı metni `overflow-wrap:anywhere`; truncate yoktur.

## İmza öğesi

Her yüzeyde küçük monospace “dosya kodu” görünür: `EVIDENCE / 01`, `CASE / NEW`. Kullanıcıya ürünün araştırma kaydı mantığını hatırlatır; dekor olarak çoğaltılmaz.
