
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { translations, TranslationKey } from '@/translations';

export type Language = 'en' | 'ar';

export interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Get from localstorage, fallback to browser language preference, or default to English
    const saved = localStorage.getItem('language') as Language;
    if (saved) return saved;
    
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'ar' ? 'ar' : 'en';
  });
  
  useEffect(() => {
    // Save to localStorage whenever language changes
    localStorage.setItem('language', language);
    
    // Update document direction
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    
    // Update body class
    if (language === 'ar') {
      document.body.classList.add('font-arabic');
    } else {
      document.body.classList.remove('font-arabic');
    }
  }, [language]);
  
  const t = (key: string): string => {
    const translationKey = key as TranslationKey;
    if (!translations[translationKey]) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translations[translationKey][language];
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Export the useLanguage hook from here to maintain backward compatibility
export { useTranslation as useLanguage } from '@/hooks/useTranslation';
