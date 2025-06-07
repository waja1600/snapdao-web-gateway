
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const HeroSection = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleStartNow = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="relative py-20 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="w-full h-64 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg flex items-center justify-center mb-8">
            <div className="text-6xl">🤝</div>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-800">
          {language === 'en' 
            ? 'Smart Contracting Platform Between Buyers, Suppliers & Freelancers'
            : 'منصة التعاقد الذكي بين المشترين والموردين والمستقلين'
          }
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          {language === 'en'
            ? 'Join groups, negotiate better deals, and connect with trusted suppliers and skilled freelancers in a secure environment.'
            : 'انضم إلى المجموعات، تفاوض على صفقات أفضل، وتواصل مع موردين موثوقين ومستقلين ماهرين في بيئة آمنة.'
          }
        </p>
        
        <Button 
          size="lg" 
          className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700"
          onClick={handleStartNow}
        >
          {language === 'en' ? 'Start Now' : 'ابدأ الآن'}
        </Button>
      </div>
    </section>
  );
};
