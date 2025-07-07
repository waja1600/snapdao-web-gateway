
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Globe, MapPin, DollarSign, Clock, Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { EnhancedHeroSection } from "@/components/HomePage/EnhancedHeroSection";
import { MainPortalsSection } from "@/components/HomePage/MainPortalsSection";
import { FooterSection } from "@/components/HomePage/FooterSection";
import { EnhancedHeader } from "@/components/HomePage/EnhancedHeader";

const Index = () => {
  const { language, setLanguage } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  
  return (
    <div className={`min-h-screen bg-background ${language === 'ar' ? 'text-right font-arabic' : 'text-left'}`}>
      <EnhancedHeader />
      
      <main>
        <EnhancedHeroSection />
        <MainPortalsSection />
        
        {/* Call to Action Section */}
        <section className="section-spacing bg-gradient-to-br from-muted/30 via-background to-primary/5">
          <div className="container-responsive text-center">
            <div className="max-w-4xl mx-auto p-8 bg-card/80 backdrop-blur-sm rounded-2xl shadow-xl border border-border/50">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground gradient-text">
                {language === 'en' ? 'Ready to Transform Your Business?' : 'هل أنت مستعد لتحويل عملك؟'}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {language === 'en' 
                  ? 'Join thousands of businesses and professionals already using GPO WORLD to streamline collaboration, reduce costs, and achieve unprecedented results through smart group purchasing and cooperative solutions.'
                  : 'انضم إلى آلاف الشركات والمهنيين الذين يستخدمون GPO WORLD بالفعل لتبسيط التعاون وتقليل التكاليف وتحقيق نتائج غير مسبوقة من خلال الشراء الجماعي الذكي والحلول التعاونية.'}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate("/register")}
                  className="gradient-primary text-lg px-10 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {language === 'en' ? 'Create Account Now' : 'أنشئ حسابك الآن'}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate("/how-it-works")}
                  className="text-lg px-10 py-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  {language === 'en' ? 'Learn How It Works' : 'تعلم كيف تعمل المنصة'}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <FooterSection />
    </div>
  );
};

export default Index;
