import { useLocales } from 'expo-localization';
import { useMemo } from 'react';

import {
  getTranslations,
  resolveLanguage,
  translate,
  translateStat,
  translateType,
  type Translate,
} from '@/services/i18n';

// The texts in the phone's language (French or English) and its decimal separator. Re-renders when the system
// language changes.
export function useTranslation() {
  const [locale] = useLocales();
  const language = resolveLanguage(locale.languageCode);
  const decimalSeparator = locale.decimalSeparator ?? '.';

  return useMemo(() => {
    const translations = getTranslations(language);
    const t: Translate = (key, params) => translate(translations, key, params);
    return {
      t,
      language,
      decimalSeparator,
      statName: (name: string) => translateStat(t, name),
      typeName: (name: string) => translateType(t, name),
    };
  }, [language, decimalSeparator]);
}
