'use client';

import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

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
    // This effect should only run on the client
    if (typeof window !== 'undefined') {
        const browserLang = navigator.language.split('-')[0];
        const initialLocale = ['es', 'ca', 'en', 'de'].includes(browserLang) ? (browserLang as Locale) : 'es';
        setLocale(initialLocale);
    }
  }, []);

  useEffect(() => {
    loadTranslations(locale).then(() => setLoaded(true));
  }, [locale]);
  
  const setLocale = (newLocale: Locale) => {
    if (newLocale !== locale) {
      setLoaded(false);
      setLocaleState(newLocale);
    }
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
    [locale, loaded] // Add loaded dependency
  );
  
  if (!loaded) {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center space-y-4">
            <Skeleton className="h-16 w-full" />
            <div className="container flex-1 p-8">
                <Skeleton className="h-32 w-full" />
                <div className="grid grid-cols-3 gap-4 mt-8">
                    <Skeleton className="h-64" />
                    <Skeleton className="h-64" />
                    <Skeleton className="h-64" />
                </div>
            </div>
        </div>
    )
  }

  return (
    <TranslationContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </TranslationContext.Provider>
  );
};
