export const locales = ["tr", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "tr";

const turkishMessages = {
  "home.eyebrow": "Mekanizma açık kaynak projesi",
  "home.title": "Kayıp bir içeriği birlikte bulmanın yolu.",
  "home.description":
    "Yarım hatırladığın filmi, oyunu, şarkıyı ya da internet içeriğini yapılandırılmış bir vakaya dönüştür. Topluluk, kaynaklı kanıtlarla ihtimalleri daraltsın.",
  "home.status": "İlk dikey dilim hazırlanıyor",
  "home.evidence.title": "Kanıt kartı",
  "home.evidence.description":
    "İddia, kaynak, gerekçe ve doğrulama durumu tek yerde okunur.",
  "home.case.title": "Vaka formu",
  "home.case.description":
    "Hatırlanan ayrıntılar açık alanlar ve anlaşılır doğrulama kurallarıyla toplanır.",
  "home.github": "Projeyi GitHub'da incele",
} as const;

export type MessageKey = keyof typeof turkishMessages;

const englishMessages: Record<MessageKey, string> = {
  "home.eyebrow": "Mekanizma open-source project",
  "home.title": "A shared path to finding lost media.",
  "home.description":
    "Turn a half-remembered film, game, song, or piece of internet media into a structured case. Let the community narrow the possibilities with sourced evidence.",
  "home.status": "First vertical slice in progress",
  "home.evidence.title": "Evidence card",
  "home.evidence.description":
    "Read the claim, source, rationale, and verification status in one place.",
  "home.case.title": "Case form",
  "home.case.description":
    "Capture remembered details through clear fields and understandable validation rules.",
  "home.github": "View the project on GitHub",
};

export const messages: Record<Locale, Record<MessageKey, string>> = {
  tr: turkishMessages,
  en: englishMessages,
};

export function translate(locale: Locale, key: MessageKey): string {
  return messages[locale][key];
}
