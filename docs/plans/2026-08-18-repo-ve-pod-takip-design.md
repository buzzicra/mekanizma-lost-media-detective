# Repo ve pod takip tasarımı

## Karar

Tek public GitHub repository kullanılır. WhatsApp bildirim kanalıdır; task, karar, blocker, kanıt ve handoff GitHub'da tutulur.

## İlk kapsam

- Üç pod
- Dokuz katılımcı
- Pod başına Contract, Build ve Quality olmak üzere üç task
- Toplam dokuz başlangıç taskı
- Pod başına WIP limiti 1
- Her task geçişinde Owner, Reviewer ve Verifier şapkaları döner

Bu dokuz task bütün ürün backlog'u değildir. İlk çalışan arayüz dilimini ve ekip çalışma düzenini kanıtlar. Uzun dönem tasklar teknik DAG'de bekler; ilk dilim bitmeden issue olarak açılmaz.

## Takip yüzeyi

- Her task tek GitHub issue'dur.
- İlk dilim tek milestone altında izlenir.
- Sabit pod, task türü ve durum etiketleri kullanılır.
- Pinned tracker issue pod sırasını ve tamamlanma durumunu gösterir.
- Her değişiklik task ID taşıyan branch ve PR ile gelir.

## Bildirim kapısı

Owner teslimi tek başına Bora bildirimi üretmez. Reviewer onayı ve Verifier kanıtı tamamlanınca Pod Lead issue/PR linkiyle Bora'ya ulaşır. Bora ve Codex kanıtı birlikte inceler; bu son kapı geçmeden sıradaki task açılmaz. Lead yoksa aktif task Ownerı aynı görevi üstlenir.

Başlangıç agent promptları public repoya konmaz. Bora'nın yerel özel çalışma dosyasında tutulur.

## Başarı ölçütü

İlk dilim başarılı sayılırsa üç podun her biri Contract → Build → Quality zincirini gerçek issue, PR, review, verification ve handoff kanıtıyla tamamlamıştır.
