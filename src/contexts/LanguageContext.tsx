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
  proposalNotFound: {
    en: 'Proposal not found',
    ar: 'لم يتم العثور على الاقتراح'
  },
  backToProposals: {
    en: 'Back to Proposals',
    ar: 'العودة إلى المقترحات'
  },
  createProposal: {
    en: 'Get started by creating a new proposal.',
    ar: 'ابدأ بإنشاء اقتراح جديد.'
  },
  createdOn: {
    en: 'Created on',
    ar: 'تم الإنشاء في'
  },
  noVotesCastYet: {
    en: 'No votes have been cast yet.',
    ar: 'لم يتم الإدلاء بأي أصوات بعد.'
  },
  totalVotes: {
    en: 'Total votes',
    ar: 'إجمالي الأصوات'
  },
  votes: {
    en: 'votes',
    ar: 'أصوات'
  },
  active: {
    en: 'active',
    ar: 'نشط'
  },
  closed: {
    en: 'closed',
    ar: 'مغلق'
  },
  allStatus: {
    en: 'All status',
    ar: 'جميع الحالات'
  },
  filterByStatus: {
    en: 'Filter by status',
    ar: 'تصفية حسب الحالة'
  },
  selectOption: {
    en: 'Please select an option to vote',
    ar: 'الرجاء تحديد خيار للتصويت'
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
  },
  
  // Arbitration
  arbitration: {
    en: 'Arbitration',
    ar: 'التحكيم'
  },
  disputeResolution: {
    en: 'Dispute Resolution',
    ar: 'حل المنازعات'
  },
  activeDisputes: {
    en: 'Active Disputes',
    ar: 'المنازعات النشطة'
  },
  resolvedDisputes: {
    en: 'Resolved Disputes',
    ar: 'المنازعات المحلولة'
  },
  pending: {
    en: 'Pending',
    ar: 'قيد الانتظار'
  },
  inProgress: {
    en: 'In Progress',
    ar: 'قيد التنفيذ'
  },
  resolved: {
    en: 'Resolved',
    ar: 'تم الحل'
  },
  disputeTitle1: {
    en: 'Payment Dispute for Project X',
    ar: 'نزاع الدفع للمشروع إكس'
  },
  disputeDesc1: {
    en: 'Dispute regarding delayed payment for completed services in the internal tender contract.',
    ar: 'نزاع بشأن تأخير الدفع للخدمات المكتملة في عقد المناقصة الداخلية.'
  },
  disputeTitle2: {
    en: 'Contract Terms Violation',
    ar: 'انتهاك شروط العقد'
  },
  disputeDesc2: {
    en: 'Alleged violation of service quality terms in external tender contract.',
    ar: 'انتهاك مزعوم لشروط جودة الخدمة في عقد المناقصة الخارجية.'
  },
  disputeTitle3: {
    en: 'Delivery Timeline Dispute',
    ar: 'نزاع جدول التسليم'
  },
  disputeDesc3: {
    en: 'Resolved dispute regarding project delivery timeline for external contract.',
    ar: 'تم حل النزاع المتعلق بجدول زمني لتسليم المشروع للعقد الخارجي.'
  },
  contractReference: {
    en: 'Contract Reference',
    ar: 'مرجع العقد'
  },
  viewDetails: {
    en: 'View Details',
    ar: 'عرض التفاصيل'
  },
  initiateArbitration: {
    en: 'Initiate Arbitration',
    ar: 'بدء التحكيم'
  },
  viewArbitrationProcess: {
    en: 'View Arbitration Process',
    ar: 'عرض عملية التحكيم'
  },
  viewResolution: {
    en: 'View Resolution',
    ar: 'عرض القرار'
  },
  resolvedDate: {
    en: 'Resolved Date',
    ar: 'تاريخ الحل'
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
