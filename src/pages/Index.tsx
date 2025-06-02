
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { FileText, Vote, Globe, Users, Search } from "lucide-react";

const Index = () => {
  const { t, language, setLanguage } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };
  
  const features = [
    {
      icon: Search,
      title: "استكشاف المنصة",
      description: "استكشف المقترحات والمشاريع عبر البروتوكولات والشبكات المختلفة."
    },
    {
      icon: FileText,
      title: "إنشاء المقترحات",
      description: "إنشاء وإدارة المقترحات لمؤسستك بسهولة."
    },
    {
      icon: Vote,
      title: "نظام التصويت",
      description: "نظام تصويت آمن لاتخاذ القرارات الجماعية."
    },
    {
      icon: Users,
      title: "إدارة الأعضاء",
      description: "إدارة الأعضاء وأدوارهم داخل مؤسستك بسهولة."
    }
  ];
  
  return (
    <div className={`min-h-screen bg-gradient-to-b from-gray-50 to-white ${language === 'ar' ? 'text-right' : 'text-left'}`}>
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">SnapDAO</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
          >
            <Globe className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/login")}
          >
            {t('login')}
          </Button>
          <Button onClick={() => navigate("/register")}>
            {t('register')}
          </Button>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        <div className={`max-w-3xl mx-auto text-center ${language === 'ar' ? 'rtl' : ''}`}>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {language === 'en' ? 'Decentralized Governance Platform' : 'منصة حوكمة لامركزية'}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {language === 'en' 
              ? 'Create proposals, vote on decisions, and manage your organization with our powerful DAO tools.'
              : 'قم بإنشاء مقترحات والتصويت على القرارات وإدارة مؤسستك باستخدام أدوات DAO القوية.'}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/explore")}>
              {language === 'en' ? 'Explore' : 'استكشف'}
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/login")}>
              {language === 'en' ? 'Sign In' : 'تسجيل الدخول'}
            </Button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>
      
      <footer className="bg-gray-50 mt-20 py-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2025 SnapDAO. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
