
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Languages = 'en' | 'ar';

type TranslationsType = {
  [key in Languages]: {
    [key: string]: string;
  };
};

const translations: TranslationsType = {
  en: {
    // Navigation
    overview: "Overview",
    projects: "Projects",
    proposals: "Proposals",
    voting: "Voting",
    members: "Members",
    dashboard: "Dashboard",
    
    // Actions
    submit: "Submit",
    cancel: "Cancel",
    create: "Create",
    edit: "Edit",
    delete: "Delete",
    add: "Add",
    
    // Proposal
    newProposal: "New Proposal",
    proposalTitle: "Proposal Title",
    description: "Description",
    choices: "Choices",
    addChoice: "Add choice",
    choice: "Choice",
    viewDetails: "View Details",
    
    // Voting
    voteOnProposal: "Vote on Proposal",
    castVote: "Cast Vote",
    yes: "Yes",
    no: "No",
    results: "Results",
    
    // Projects
    manageProjects: "Manage Projects",
    newProject: "New Project",
    searchProjects: "Search projects",
    project: "Project",
    status: "Status",
    dueDate: "Due Date",
    actions: "Actions",
    active: "Active",
    completed: "Completed",
    
    // Agreement
    collectiveAgreement: "Collective Agreement",
    agreementText: "Agreement Text",
    agreeAndSign: "I agree and sign the contract",
    password: "Password",
    enterOTPCode: "Enter OTP Code",
    signContract: "Sign Contract",
    company: "Company",
    registrationNumber: "Registration Number",
    
    // Authentication
    login: "Login",
    register: "Register",
    email: "Email",
    password: "Password",
    forgotPassword: "Forgot Password?",
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: "Already have an account?",
    
    // Misc
    loading: "Loading...",
    error: "Error",
    success: "Success",
  },
  ar: {
    // Navigation
    overview: "نظرة عامة",
    projects: "المشاريع",
    proposals: "المقترحات",
    voting: "التصويت",
    members: "الأعضاء",
    dashboard: "لوحة التحكم",
    
    // Actions
    submit: "إرسال",
    cancel: "إلغاء",
    create: "إنشاء",
    edit: "تعديل",
    delete: "حذف",
    add: "إضافة",
    
    // Proposal
    newProposal: "مقترح جديد",
    proposalTitle: "عنوان المقترح",
    description: "الوصف",
    choices: "الخيارات",
    addChoice: "إضافة خيار",
    choice: "خيار",
    viewDetails: "عرض التفاصيل",
    
    // Voting
    voteOnProposal: "التصويت على المقترح",
    castVote: "الإدلاء بصوتك",
    yes: "نعم",
    no: "لا",
    results: "النتائج",
    
    // Projects
    manageProjects: "إدارة المشاريع",
    newProject: "مشروع جديد",
    searchProjects: "بحث في المشاريع",
    project: "المشروع",
    status: "الحالة",
    dueDate: "تاريخ الاستحقاق",
    actions: "الإجراءات",
    active: "نشط",
    completed: "مكتمل",
    
    // Agreement
    collectiveAgreement: "اتفاقية عقد الجماعي",
    agreementText: "نص العقد...",
    agreeAndSign: "أوافق وأوقع على العقد",
    password: "كلمة المرور",
    enterOTPCode: "أدخل رمز التحقق المرسل",
    signContract: "توقيع العقد",
    company: "الشركة",
    registrationNumber: "رقم التسجيل",
    
    // Authentication
    login: "تسجيل الدخول",
    register: "تسجيل جديد",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    forgotPassword: "نسيت كلمة المرور؟",
    dontHaveAccount: "ليس لديك حساب؟",
    alreadyHaveAccount: "لديك حساب بالفعل؟",
    
    // Misc
    loading: "جاري التحميل...",
    error: "خطأ",
    success: "نجاح",
  }
};

interface LanguageContextType {
  language: Languages;
  setLanguage: (language: Languages) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Languages>('en');

  useEffect(() => {
    // Set document direction based on language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Save language preference to localStorage
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    // Load language preference from localStorage on initial render
    const savedLanguage = localStorage.getItem('language') as Languages;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguage(savedLanguage);
    } else {
      // Detect browser language if no saved preference
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'ar') {
        setLanguage('ar');
      }
    }
  }, []);

  const translate = (key: string): string => {
    if (translations[language][key]) {
      return translations[language][key];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translate }}>
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
