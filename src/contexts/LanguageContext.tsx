
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'ar';

interface TranslationDictionary {
  [key: string]: {
    en: string;
    ar: string;
  };
}

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations: TranslationDictionary = {
  // Navigation
  dashboard: {
    en: 'Dashboard',
    ar: 'لوحة التحكم'
  },
  projects: {
    en: 'Projects',
    ar: 'المشاريع'
  },
  proposals: {
    en: 'Proposals',
    ar: 'المقترحات'
  },
  voting: {
    en: 'Voting',
    ar: 'التصويت'
  },
  members: {
    en: 'Members',
    ar: 'الأعضاء'
  },
  
  // Common actions
  submit: {
    en: 'Submit',
    ar: 'إرسال'
  },
  cancel: {
    en: 'Cancel',
    ar: 'إلغاء'
  },
  create: {
    en: 'Create',
    ar: 'إنشاء'
  },
  update: {
    en: 'Update',
    ar: 'تحديث'
  },
  delete: {
    en: 'Delete',
    ar: 'حذف'
  },
  
  // Form labels
  name: {
    en: 'Name',
    ar: 'الاسم'
  },
  email: {
    en: 'Email',
    ar: 'البريد الإلكتروني'
  },
  description: {
    en: 'Description',
    ar: 'الوصف'
  },
  
  // Proposals
  newProposal: {
    en: 'New Proposal',
    ar: 'اقتراح جديد'
  },
  proposalTitle: {
    en: 'Proposal Title',
    ar: 'عنوان الاقتراح'
  },
  choices: {
    en: 'Choices',
    ar: 'الخيارات'
  },
  choice: {
    en: 'Choice',
    ar: 'خيار'
  },
  addChoice: {
    en: 'Add Choice',
    ar: 'إضافة خيار'
  },
  castVote: {
    en: 'Cast Vote',
    ar: 'تصويت'
  },
  results: {
    en: 'Results',
    ar: 'النتائج'
  },
  voteOnProposal: {
    en: 'Vote on Proposal',
    ar: 'التصويت على الاقتراح'
  },
  
  // Auth
  login: {
    en: 'Login',
    ar: 'تسجيل الدخول'
  },
  logout: {
    en: 'Logout',
    ar: 'تسجيل الخروج'
  },
  password: {
    en: 'Password',
    ar: 'كلمة المرور'
  },
  
  // Loading state
  loading: {
    en: 'Loading...',
    ar: 'جاري التحميل...'
  },
  
  // Utilities
  vote: {
    en: 'Vote',
    ar: 'تصويت'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

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
    if (!translations[key]) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translations[key][language];
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
