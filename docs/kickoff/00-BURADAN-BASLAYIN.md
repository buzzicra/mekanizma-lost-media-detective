# Buradan başlayın

Bu repo iki aktif podla ilerliyor. Her pod önce contractı netleştirir, sonra componenti geliştirir, son olarak kalite ve handoff taskını tamamlar.

## Aktif ekipler

| Pod | Contract Lead | Builder | Quality |
|---|---|---|---|
| Pod 1 - Kanıt Kartı | Taylan | Batıncan | Cemresu |
| Pod 2 - Vaka Formu | Kerim | Emir | Burak |

## Bugün ne yapılıyor?

### Pod 1

Taylan `EVID-CONTRACT-01` r2 teslimini yaptı. Batıncan uygulanabilirlik onayı verdi. Cemresu contractı bağımsız test cümlelerine çevirip Verifier kararını [Issue #5](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/5) altında yazacak.

`EVID-BUILD-01` henüz başlamaz. Cemresu kararı ve Bora + Codex kapısı beklenir.

### Pod 2

Kerim `CASE-CONTRACT-01` Owner'ıdır. İlk işi kod yazmak değil; vaka formunun alan, validation, state, focus ve scope kurallarını [Issue #2](https://github.com/buzzicra/mekanizma-lost-media-detective/issues/2) altında teslim etmektir.

Emir uygulanabilirlik review'u, Burak test edilebilirlik kararı verir. Sonra Bora + Codex kapısı açılır.

## Okuma sırası

1. [Ürün ve pod haritası](./01-ÜRÜN-VE-POD-HARİTASI.md)
2. [Roller ve task akışı](./02-ROLLER-VE-TASK-AKISI.md)
3. Kendi pod rehberin:
   - [Pod 1 - Kanıt Kartı](./03-POD-1-KANIT-KARTI.md)
   - [Pod 2 - Vaka Formu](./04-POD-2-VAKA-FORMU.md)
4. Kendi [kişisel görev kartın](./kisi-kartlari/)
5. Aktif GitHub issue

## Başlamadan dört kapı

- Doğru GitHub hesabınla repo erişimin var.
- Yalnız kendi aktif issue'na çalışıyorsun.
- Dependency tamamlanmış; issue `status:ready` veya `status:in-progress`.
- Değişiklikten önce repo incelemesi ve dosya planı yaptın.

Bir kapı eksikse gizlice başka işe geçme. Blocker'ı issue'ya yaz; Pod Lead üzerinden Bora'ya taşı.

## Park edilen işler

`REPORT-*` issue'ları bu pilotta aktif değildir. Emir ve Burak'ın Issue #8 altındaki çalışması silinmedi; sonraki dönem için korunuyor. Bora yeniden açmadan bu hatta devam edilmez.
