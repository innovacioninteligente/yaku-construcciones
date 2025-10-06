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

const translationsCache: { [key in Locale]?: any } = {};

async function loadTranslations(locale: Locale) {
  if (!translationsCache[locale]) {
    try {
      const module = await import(`@/locales/${locale}.json`);
      translationsCache[locale] = module.default;
    } catch (error) {
      console.error(`Could not load translations for locale: ${locale}`, error);
      translationsCache[locale] = {}; // fallback to empty to avoid repeated failed loads
    }
  }
  return translationsCache[locale];
}

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>('es');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // This effect should only run on the client
    if (typeof window !== 'undefined') {
        const browserLang = navigator.language.split('-')[0];
        const initialLocale = ['es', 'ca', 'en', 'de'].includes(browserLang) ? (browserLang as Locale) : 'es';
        
        setIsLoaded(false);
        loadTranslations(initialLocale).then(() => {
            setLocale(initialLocale);
            setIsLoaded(true);
        });
    }
  }, []);

  const handleSetLocale = (newLocale: Locale) => {
    if (newLocale !== locale) {
      setIsLoaded(false);
      loadTranslations(newLocale).then(() => {
        setLocale(newLocale);
        setIsLoaded(true);
      });
    }
  };
  
  const t = useCallback((key: string): string => {
      const currentTranslations = translationsCache[locale];
      if (!isLoaded || !currentTranslations) {
        return key;
      }
      const keys = key.split('.');
      let result = currentTranslations;
      for (const k of keys) {
        result = result?.[k];
        if (result === undefined) {
          return key; // Return the key itself if translation not found
        }
      }
      return typeof result === 'string' ? result : key;
    },
    [locale, isLoaded]
  );
  
  if (!isLoaded) {
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
    <TranslationContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>
      {children}
    </TranslationContext.Provider>
  );
};
