'use client';

import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';

type Locale = 'es' | 'ca' | 'en' | 'de';

interface TranslationContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

export const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const translations: { [key in Locale]?: any } = {};

async function loadTranslations(locale: Locale) {
  if (!translations[locale]) {
    try {
      const module = await import(`@/locales/${locale}.json`);
      translations[locale] = module.default;
    } catch (error) {
      console.error(`Could not load translations for locale: ${locale}`, error);
      translations[locale] = {}; // fallback to empty
    }
  }
  return translations[locale];
}

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>('es');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    const initialLocale = ['es', 'ca', 'en', 'de'].includes(browserLang) ? (browserLang as Locale) : 'es';
    setLocale(initialLocale);
  }, []);

  useEffect(() => {
    loadTranslations(locale).then(() => setLoaded(true));
  }, [locale]);
  
  const setLocale = (newLocale: Locale) => {
    setLoaded(false);
    setLocaleState(newLocale);
  };

  const t = useCallback(
    (key: string): string => {
      const keys = key.split('.');
      let result = translations[locale];
      for (const k of keys) {
        result = result?.[k];
        if (result === undefined) {
          return key; // Return the key itself if translation not found
        }
      }
      return result || key;
    },
    [locale]
  );
  
  if (!loaded) {
    return null; // Or a loading spinner
  }

  return (
    <TranslationContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </TranslationContext.Provider>
  );
};
