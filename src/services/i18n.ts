import { en, type TranslationKey, type Translations } from '@/constants/translations/en';
import { fr } from '@/constants/translations/fr';
import { formatLabel, formatName } from '@/services/pokemon';

export type Language = 'en' | 'fr';

export type TranslationParams = Record<string, string | number>;

export type Translate = (key: TranslationKey, params?: TranslationParams) => string;

const DICTIONARIES: Record<Language, Translations> = { en, fr };

// The phone's first language ("fr", "en", "de"...). Anything but French is English.
export function resolveLanguage(languageCode: string | null): Language {
  return languageCode === 'fr' ? 'fr' : 'en';
}

export function getTranslations(language: Language): Translations {
  return DICTIONARIES[language];
}

// The text for `key` in `translations`, English when it is missing there. "{name}" is replaced by params.name.
export function translate(translations: Translations, key: TranslationKey, params: TranslationParams = {}): string {
  const text = translations[key] ?? en[key];
  return text.replace(/\{(\w+)\}/g, (placeholder, name: string) =>
    name in params ? String(params[name]) : placeholder,
  );
}

function isTranslationKey(key: string): key is TranslationKey {
  return key in en;
}

// "special-attack" -> "Special Attack" / "Attaque Spé.". A stat the app does not know keeps the PokeAPI name.
export function translateStat(t: Translate, name: string): string {
  const key = `stat.${name}`;
  return isTranslationKey(key) ? t(key) : formatLabel(name);
}

// "grass" -> "Grass" / "Plante". A type the app does not know keeps the PokeAPI name.
export function translateType(t: Translate, name: string): string {
  const key = `type.${name}`;
  return isTranslationKey(key) ? t(key) : formatName(name);
}
