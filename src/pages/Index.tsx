
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Globe, Clock, MapPin, DollarSign } from "lucide-react";
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
  const { t, language, setLanguage } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const currentTime = new Date().toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };
  
  return (
    <div className={`min-h-screen bg-white ${language === 'ar' ? 'text-right' : 'text-left'}`}>
      {/* Enhanced Top Bar */}
      <div className="bg-gray-100 border-b py-2 px-4">
        <div className="container mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              <Select defaultValue="sa">
                <SelectTrigger className="h-8 w-[120px] border-none bg-transparent">
                  <SelectValue />
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
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <Select defaultValue="sar">
                <SelectTrigger className="h-8 w-[80px] border-none bg-transparent">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sar">SAR</SelectItem>
                  <SelectItem value="usd">USD</SelectItem>
                  <SelectItem value="eur">EUR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{currentTime}</span>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="h-8 px-2"
            >
              {language === 'en' ? 'العربية' : 'English'}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-blue-600">GPOsaas</h1>
            <span className="text-sm text-gray-500 bg-blue-50 px-2 py-1 rounded">
              {language === 'en' ? 'Smart Cooperation Platform' : 'منصة التعاون الذكي'}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    {language === 'en' ? 'Services' : 'الخدمات'}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-2">
                      <NavigationMenuLink className="block p-3 rounded-md hover:bg-gray-50" href="/cooperative-buying">
                        <div className="text-sm font-medium">{language === 'en' ? 'Group Buying' : 'الشراء الجماعي'}</div>
                        <div className="text-xs text-gray-600">{language === 'en' ? 'Join buying groups' : 'انضم لمجموعات الشراء'}</div>
                      </NavigationMenuLink>
                      <NavigationMenuLink className="block p-3 rounded-md hover:bg-gray-50" href="/cooperative-marketing">
                        <div className="text-sm font-medium">{language === 'en' ? 'Marketing' : 'التسويق'}</div>
                        <div className="text-xs text-gray-600">{language === 'en' ? 'Collaborative campaigns' : 'حملات تسويقية'}</div>
                      </NavigationMenuLink>
                      <NavigationMenuLink className="block p-3 rounded-md hover:bg-gray-50" href="/freelancers">
                        <div className="text-sm font-medium">{language === 'en' ? 'Freelancers' : 'المستقلون'}</div>
                        <div className="text-xs text-gray-600">{language === 'en' ? 'Find skilled professionals' : 'ابحث عن محترفين'}</div>
                      </NavigationMenuLink>
                      <NavigationMenuLink className="block p-3 rounded-md hover:bg-gray-50" href="/suppliers">
                        <div className="text-sm font-medium">{language === 'en' ? 'Suppliers' : 'الموردون'}</div>
                        <div className="text-xs text-gray-600">{language === 'en' ? 'Submit your offers' : 'قدم عروضك'}</div>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
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
                  <NavigationMenuLink className="px-3 py-2 text-sm font-medium hover:text-blue-600" href="/support">
                    {language === 'en' ? 'Support' : 'الدعم'}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center gap-2">
              {!user ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/login")}
                  >
                    {t('login')}
                  </Button>
                  <Button onClick={() => navigate("/register")}>
                    {t('register')}
                  </Button>
                </>
              ) : (
                <Button onClick={() => navigate("/dashboard")}>
                  {language === 'en' ? 'Dashboard' : 'لوحة التحكم'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Search Section - Above Service Cards */}
        <SearchSection />
        
        {/* Service Cards - 4 Gateway Cards */}
        <ServiceCards />
        
        {/* Open Deals Cards */}
        <OpenDealsCards />
        
        {/* Call to Action Section */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              {language === 'en' ? 'Ready to Start Your Journey?' : 'هل أنت مستعد لبدء رحلتك؟'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              {language === 'en' 
                ? 'Join thousands of businesses and professionals already using our platform to achieve better deals through smart cooperation.'
                : 'انضم إلى آلاف الشركات والمهنيين الذين يستخدمون منصتنا للحصول على صفقات أفضل من خلال التعاون الذكي.'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" onClick={() => navigate("/register")}>
                {language === 'en' ? 'Start Free Today' : 'ابدأ مجاناً اليوم'}
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/how-it-works")}>
                {language === 'en' ? 'Watch Demo' : 'شاهد العرض التوضيحي'}
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      {/* Enhanced Footer */}
      <FooterSection />
    </div>
  );
};

export default Index;
