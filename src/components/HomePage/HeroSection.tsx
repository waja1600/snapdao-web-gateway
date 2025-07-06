
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
    <section className="relative section-spacing px-4 text-center bg-gradient-to-br from-gpo-primary/5 to-gpo-secondary/10">
      <div className="container-responsive">
        <div className="mb-8">
          <div className="w-full h-64 bg-gradient-to-r from-gpo-primary/10 to-gpo-secondary/10 rounded-lg flex items-center justify-center mb-8 border border-border shadow-[var(--shadow-card)]">
            <div className="text-6xl animate-bounce">🤝</div>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
          {language === 'en' 
            ? 'Smart Contracting Platform Between Buyers, Suppliers & Freelancers'
            : 'منصة التعاقد الذكي بين المشترين والموردين والمستقلين'
          }
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          {language === 'en'
            ? 'Join groups, negotiate better deals, and connect with trusted suppliers and skilled freelancers in a secure environment.'
            : 'انضم إلى المجموعات، تفاوض على صفقات أفضل، وتواصل مع موردين موثوقين ومستقلين ماهرين في بيئة آمنة.'
          }
        </p>
        
        <Button 
          size="lg" 
          className="text-lg px-8 py-4 bg-gpo-primary hover:bg-gpo-primary-dark text-white shadow-[var(--shadow-gpo)]"
          onClick={handleStartNow}
        >
          {language === 'en' ? 'Start Now' : 'ابدأ الآن'}
        </Button>
      </div>
    </section>
  );
};
