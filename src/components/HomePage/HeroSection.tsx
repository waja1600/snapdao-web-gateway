
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AIPromptBox } from "@/components/ai/AIPromptBox";

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
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-800">
          {language === 'en' 
            ? 'Smart Contracting Platform Between Buyers, Suppliers & Freelancers'
            : 'منصة التعاقد الذكي بين المشترين والموردين والمستقلين'
          }
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          {language === 'en'
            ? 'Join groups, negotiate better deals, and connect with trusted suppliers and skilled freelancers in a secure environment.'
            : 'انضم إلى المجموعات، تفاوض على صفقات أفضل، وتواصل مع موردين موثوقين ومستقلين ماهرين في بيئة آمنة.'
          }
        </p>
        
        {/* AI Prompt Box */}
        <div className="mb-8">
          <AIPromptBox />
        </div>
        
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
