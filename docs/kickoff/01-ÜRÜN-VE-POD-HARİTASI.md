# Ürün ve pod haritası

## Ne yapıyoruz?

Lost Media Detective, adını bilmediği bir medya içeriğini arayan kişinin hatırladığı ayrıntılarla vaka açmasını ve topluluğun kaynaklı kanıtlarla araştırmasına yardım etmesini sağlar.

İlk pilot bütün ürünü bitirmeye çalışmaz. İki görünür, test edilebilir arayüz dilimi üretir.

## Pod 1 - Kanıt Kartı

Kullanıcı tek kartta şunları anlayacak:

- İddia ne?
- Kaynak nerede?
- Bu kaynak neden anlamlı?
- Kanıt `NEW`, `POSSIBLE`, `REJECTED` veya `VERIFIED` durumlarından hangisinde?
- Elendiyse gerekçe ne?

Bu pod evidence oluşturma, status değiştirme, API veya DB yapmaz. İlk dilim read-only componenttir.

## Pod 2 - Vaka Formu

Kullanıcı şu davranışları görecek:

- Contractta tanımlanan vaka alanları
- Anlaşılır validation mesajları
- İlk hatalı alana focus
- Loading ve parent error durumları
- Klavye ve 375 px kullanım

Bu pod ilk dilimde auth, API, DB, autosave veya publish yapmaz. Form geçerli typed veriyi parent'a teslim eder.

## Neden iki pod?

- Altı kişilik ekipte herkesin rolü net kalır.
- Her pod tek kullanıcı sonucu üzerinden ilerler.
- Contract, build ve quality görevleri sırayla öğrenilir.
- Aynı dosyada gereksiz çakışma azalır.
- Rapor/moderasyon gibi daha riskli işler temel çalışma düzeni oturduktan sonra açılır.

## Ortak sınır

Auth, DB, migration, storage, CI ve shared güvenlik altyapısı Bora'nın entegrasyon alanıdır. Pod bunlara ihtiyaç duyarsa değişikliği gizlice yapmaz; blocker açar.
