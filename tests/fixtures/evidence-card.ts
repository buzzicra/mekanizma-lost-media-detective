import type { EvidenceCardData } from "@/features/evidence/model/evidence-card";

export const evidenceFixtures = {
  NEW: {
    claim:
      "Bu kayıt, 1990'ların sonunda yayımlanan kayıp bir çocuk programı olabilir.",
    rationale:
      "Jenerikte tarif edilen mavi ayı ve kanal bilgisi kullanıcının hatırladığı ayrıntılarla örtüşüyor.",
    sourceUrl: "https://archive.org/details/example-record",
    status: "NEW",
  },
  POSSIBLE: {
    claim: "Arşiv kaydı aynı animasyon serisine ait güçlü bir aday olabilir.",
    rationale:
      "Yayın yılı, dil ve bölüm açıklaması vaka formundaki üç ayrı ayrıntıyla eşleşiyor.",
    sourceUrl: "https://example.org/research/candidate",
    status: "POSSIBLE",
    statusReason: "İki ayrıntı doğrulandı; bölüm görüntüsü bekleniyor.",
  },
  REJECTED: {
    claim: "Adayın adı benziyor fakat başka bir yapım olduğu anlaşıldı.",
    rationale:
      "İlk aramada aynı dönem ve kanal nedeniyle bu kaydın ilgili olabileceği düşünüldü.",
    sourceUrl: "https://example.com/rejected-candidate",
    status: "REJECTED",
    statusReason: "Karakter ve yayın ülkesi vaka ayrıntılarıyla uyuşmuyor.",
  },
  VERIFIED: {
    claim: "Aranan içerik bu arşiv kaydındaki programdır.",
    rationale:
      "Bölüm görüntüsü, jenerik ve yayın tarihi bağımsız kaynaklarla eşleştirildi.",
    sourceUrl: "https://archive.org/details/verified-example",
    status: "VERIFIED",
    statusReason: "Vaka sahibi görüntüyü doğruladı.",
  },
} as const satisfies Record<string, EvidenceCardData>;

export const invalidSourceFixture: EvidenceCardData = {
  ...evidenceFixtures.NEW,
  sourceUrl: "javascript:alert('unsafe')",
};
