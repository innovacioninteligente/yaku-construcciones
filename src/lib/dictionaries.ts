import 'server-only'

type Locale = 'es' | 'en' | 'de' | 'ca';

const dictionaries = {
  en: () => import('@/locales/en.json').then((module) => module.default),
  de: () => import('@/locales/de.json').then((module) => module.default),
  es: () => import('@/locales/es.json').then((module) => module.default),
  ca: () => import('@/locales/ca.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => {
    const loader = dictionaries[locale] || dictionaries.es;
    return loader();
};
