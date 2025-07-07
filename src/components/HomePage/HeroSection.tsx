
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const HeroSection = () => {
  const { language } = useLanguage();
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
    <section className="section-spacing bg-gradient-to-br from-background via-muted/20 to-primary/5">
      <div className="container-responsive text-center">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <div className="w-full max-w-md mx-auto h-64 gradient-hero rounded-2xl flex items-center justify-center mb-8 shadow-lg">
              <div className="text-7xl">🤝</div>
            </div>
          </div>
          
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-foreground leading-tight ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'en' 
              ? 'Smart Contracting Platform Between Buyers, Suppliers & Freelancers'
              : 'منصة التعاقد الذكي بين المشترين والموردين والمستقلين'
            }
          </h1>
          
          <p className={`text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'en'
              ? 'Join groups, negotiate better deals, and connect with trusted suppliers and skilled freelancers in a secure, transparent environment designed for success.'
              : 'انضم إلى المجموعات، تفاوض على صفقات أفضل، وتواصل مع موردين موثوقين ومستقلين ماهرين في بيئة آمنة وشفافة مصممة للنجاح.'
            }
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              className="text-lg px-10 py-4 gradient-primary shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={handleStartNow}
            >
              {language === 'en' ? 'Start Now' : 'ابدأ الآن'}
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-10 py-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              onClick={() => navigate("/how-it-works")}
            >
              {language === 'en' ? 'Learn How' : 'تعلم كيف'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
