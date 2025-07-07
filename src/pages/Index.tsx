
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
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
import { HeroSection } from "@/components/HomePage/HeroSection";
import { ServiceCards } from "@/components/HomePage/ServiceCards";
import { SearchSection } from "@/components/HomePage/SearchSection";
import { OpenDealsCards } from "@/components/HomePage/OpenDealsCards";
import { FooterSection } from "@/components/HomePage/FooterSection";

const Index = () => {
  const { language, setLanguage } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };
  
  return (
    <div className={`min-h-screen bg-background ${language === 'ar' ? 'text-right font-arabic' : 'text-left'}`}>
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container-responsive">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">GPO</span>
              </div>
              <h1 className="text-2xl font-bold text-primary">GPOsaas</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink 
                      className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors" 
                      href="/about"
                    >
                      {language === 'en' ? 'About Us' : 'من نحن'}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink 
                      className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors" 
                      href="/how-it-works"
                    >
                      {language === 'en' ? 'How It Works' : 'كيف تعمل المنصة'}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink 
                      className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors" 
                      href="/contact"
                    >
                      {language === 'en' ? 'Support & Help' : 'الدعم والمساعدة'}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleLanguage}
                  title={language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
                  className="hover:bg-muted"
                >
                  <Globe className="h-5 w-5" />
                </Button>
                
                <Select onValueChange={(value) => console.log("Country selected:", value)}>
                  <SelectTrigger className="w-[140px] border-input">
                    <SelectValue placeholder={language === 'en' ? 'Country' : 'الدولة'} />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="sa">
                      {language === 'en' ? 'Saudi Arabia' : 'السعودية'}
                    </SelectItem>
                    <SelectItem value="ae">
                      {language === 'en' ? 'UAE' : 'الإمارات'}
                    </SelectItem>
                    <SelectItem value="eg">
                      {language === 'en' ? 'Egypt' : 'مصر'}
                    </SelectItem>
                    <SelectItem value="other">
                      {language === 'en' ? 'Other' : 'أخرى'}
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  onClick={() => navigate("/login")}
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  {language === 'en' ? 'Login' : 'تسجيل الدخول'}
                </Button>
                <Button 
                  onClick={() => navigate("/register")}
                  className="gradient-primary"
                >
                  {language === 'en' ? 'Register' : 'التسجيل'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main>
        <HeroSection />
        <ServiceCards />
        <SearchSection />
        <OpenDealsCards />
        
        {/* Call to Action Section */}
        <section className="section-spacing bg-muted/30">
          <div className="container-responsive text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                {language === 'en' ? 'Ready to Get Started?' : 'هل أنت مستعد للبدء؟'}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {language === 'en' 
                  ? 'Join thousands of businesses and professionals already using our platform to streamline their collaboration and achieve better results together.'
                  : 'انضم إلى آلاف الشركات والمهنيين الذين يستخدمون منصتنا بالفعل لتبسيط تعاونهم وتحقيق نتائج أفضل معاً.'}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate("/register")}
                  className="gradient-primary text-lg px-8 py-3"
                >
                  {language === 'en' ? 'Register Now' : 'سجل الآن'}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate("/how-it-works")}
                  className="text-lg px-8 py-3 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  {language === 'en' ? 'Learn More' : 'اعرف المزيد'}
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
