
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
    // If user is already logged in, redirect to dashboard
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };
  
  return (
    <div className={`min-h-screen bg-white ${language === 'ar' ? 'text-right' : 'text-left'}`}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-blue-600">GPOsaas</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink className="px-3 py-2 text-sm font-medium hover:text-blue-600" href="/about">
                    {language === 'en' ? 'About Us' : 'من نحن'}
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="px-3 py-2 text-sm font-medium hover:text-blue-600" href="/how-it-works">
                    {language === 'en' ? 'How It Works' : 'كيف تعمل المنصة'}
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="px-3 py-2 text-sm font-medium hover:text-blue-600" href="/contact">
                    {language === 'en' ? 'Support & Help' : 'الدعم والمساعدة'}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleLanguage}
                title={language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
              >
                <Globe className="h-5 w-5" />
              </Button>
              
              <Select onValueChange={(value) => console.log("Country selected:", value)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder={language === 'en' ? 'Country' : 'الدولة'} />
                </SelectTrigger>
                <SelectContent>
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
                onClick={() => navigate("/register")}
              >
                {language === 'en' ? 'Login' : 'تسجيل الدخول'}
              </Button>
              <Button onClick={() => navigate("/register")}>
                {language === 'en' ? 'Register' : 'التسجيل'}
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Service Cards */}
        <ServiceCards />
        
        {/* Search Section */}
        <SearchSection />
        
        {/* Open Deals Cards */}
        <OpenDealsCards />
        
        {/* Call to Action Section */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              {language === 'en' ? 'Ready to Get Started?' : 'هل أنت مستعد للبدء؟'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              {language === 'en' 
                ? 'Join thousands of businesses and professionals already using our platform to streamline their collaboration.'
                : 'انضم إلى آلاف الشركات والمهنيين الذين يستخدمون منصتنا بالفعل لتبسيط تعاونهم.'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" onClick={() => navigate("/register")}>
                {language === 'en' ? 'Register Now' : 'سجل الآن'}
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/how-it-works")}>
                {language === 'en' ? 'Learn More' : 'اعرف المزيد'}
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export default Index;
