# Güvenlik politikası

## Güvenlik açığı bildirme

Aktif sömürülebilir güvenlik açıklarını public issue olarak paylaşmayın. GitHub repository sayfasındaki **Security → Report a vulnerability** kanalını kullanın. Bu kanal henüz aktif değilse maintainer `@buzzicra` ile özel kanaldan iletişime geçin.

## Public issue'ya yazılmaması gerekenler

- API anahtarı, token, parola veya gerçek `.env` içeriği
- E-posta, telefon, adres veya başka kişisel veri
- Gerçek kullanıcı oturumu veya production verisi
- Açığı sömürmeye yarayan hassas adımlar

## Proje kuralları

- Secretlar client koduna girmez.
- Kullanıcı girdisi sistem sınırında doğrulanır.
- Auth ve ownership kontrolleri server tarafında yapılır.
- Hata mesajları iç sistem detayını sızdırmaz.
- Güvenlik etkili auth, DB, migration, upload, CORS veya webhook değişikliği Bora onayı gerektirir.
