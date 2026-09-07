import type { Locale } from "@/lib/i18n/messages";

const turkishMessages = {
  titleLabel: "Başlık",
  titleHint: "Çözümün adını bilmek zorunda değilsin. 12-120 karakter.",
  mediaTypeLabel: "Medya türü",
  mediaTypePlaceholder: "Bir tür seç",
  contentLanguageLabel: "İçerik dili",
  contentLanguageHint: "BCP 47 dil etiketi kullan: tr, en, tr-TR gibi.",
  rememberedDetailsLabel: "Hatırlanan ayrıntı",
  rememberedDetailsHint:
    "Sahne, karakter, renk, söz veya hissi anlat. En az 80 karakter.",
  seenOnLabel: "Görüldüğü yer",
  seenOnHint: "Platform, kanal veya mekân.",
  periodLegend: "Tahmini dönem",
  yearUnknownLabel: "Dönemi bilmiyorum",
  yearFromLabel: "Başlangıç yılı",
  yearToLabel: "Bitiş yılı",
  previousSearchesLabel: "Önceki aramalar",
  previousSearchesHint: 'Hiç aramadıysan "Yok" yazabilirsin.',
  safetyConfirmedLabel:
    "Girdiğim içerik kayıp kişi araştırması değildir; üçüncü kişiye ait adres, telefon, e-posta veya başka özel veri paylaşmıyorum.",
  safetyHint: "Bu onay verilmeden form doğrulanamaz.",
  errorSummaryTitle: "Formda düzeltmen gereken alanlar var",
  errorSummaryIntro: "Aşağıdaki alanları kontrol et:",
  parentErrorTitle: "Form gönderilemedi",
  submitIdle: "Formu doğrula ve gönderime hazırla",
  submitBusy: "Form hazırlanıyor…",
  submittingAnnouncement: "Form doğrulanıyor. Lütfen bekle.",
  nonPersistenceNote: "UI doğrulaması yapılır; bu dilimde veri kaydedilmez.",
  requiredMarker: "zorunlu",
} as const;

export type CaseFormUiKey = keyof typeof turkishMessages;

const englishMessages: Record<CaseFormUiKey, string> = {
  titleLabel: "Title",
  titleHint: "You do not need to know the answer. Use 12-120 characters.",
  mediaTypeLabel: "Media type",
  mediaTypePlaceholder: "Select a type",
  contentLanguageLabel: "Content language",
  contentLanguageHint: "Use a BCP 47 language tag such as tr, en, or en-US.",
  rememberedDetailsLabel: "Remembered details",
  rememberedDetailsHint:
    "Describe scenes, characters, colors, words, or feelings. At least 80 characters.",
  seenOnLabel: "Where you saw it",
  seenOnHint: "Platform, channel, or place.",
  periodLegend: "Estimated period",
  yearUnknownLabel: "I do not know the period",
  yearFromLabel: "Start year",
  yearToLabel: "End year",
  previousSearchesLabel: "Previous searches",
  previousSearchesHint: 'Enter "None" if you have not searched yet.',
  safetyConfirmedLabel:
    "This is not a missing-person search, and I am not sharing another person's address, phone number, email, or other private data.",
  safetyHint: "The form cannot be validated without this confirmation.",
  errorSummaryTitle: "Some fields need your attention",
  errorSummaryIntro: "Review these fields:",
  parentErrorTitle: "The form could not be submitted",
  submitIdle: "Validate and prepare form for submission",
  submitBusy: "Preparing form…",
  submittingAnnouncement: "The form is being validated. Please wait.",
  nonPersistenceNote:
    "This slice validates the UI only; it does not save data.",
  requiredMarker: "required",
};

const messages: Record<Locale, Record<CaseFormUiKey, string>> = {
  tr: turkishMessages,
  en: englishMessages,
};

const mediaTypeMessages: Record<Locale, Record<string, string>> = {
  tr: {
    VIDEO: "Video",
    AUDIO: "Ses / müzik",
    IMAGE: "Görsel",
    GAME: "Oyun",
    WEBSITE: "Web sitesi",
    ADVERTISEMENT: "Reklam",
    FILM_TV: "Film / dizi / çizgi film",
    PRINT: "Kitap / dergi / basılı içerik",
    OTHER: "Diğer",
  },
  en: {
    VIDEO: "Video",
    AUDIO: "Audio / music",
    IMAGE: "Image",
    GAME: "Game",
    WEBSITE: "Website",
    ADVERTISEMENT: "Advertisement",
    FILM_TV: "Film / TV / animation",
    PRINT: "Book / magazine / print",
    OTHER: "Other",
  },
};

export function translateCaseFormUi(
  locale: Locale,
  key: CaseFormUiKey,
): string {
  return messages[locale][key];
}

export function translateMediaType(locale: Locale, value: string): string {
  return mediaTypeMessages[locale][value] ?? value;
}
