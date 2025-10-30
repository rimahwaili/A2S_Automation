import fr from '../i18n/fr.json';
import en from '../i18n/en.json';


export type SupportedLang = 'fr' | 'en';

export const translations: Record<SupportedLang, typeof fr> = {
  fr,
  en,
};

export const getLang = (): SupportedLang => {
  const envLang = process.env.LANG || '';
  return envLang.includes('fr') ? 'fr' : 'en';
};
