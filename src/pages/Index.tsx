import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { FileText, Search, Users, ShoppingCart, Briefcase, Globe, ChevronDown, User, Truck, Shield } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const { t, language, setLanguage } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [protocolType, setProtocolType] = useState<string>("all");
  const [serviceType, setServiceType] = useState<string>("all");
  
  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };
  
  const services = [
    {
      icon: ShoppingCart,
      title: language === 'en' ? 'Cooperative Buying Portal' : 'بوابة الشراء التعاوني',
      description: language === 'en' ? 'Join groups for cooperative buying and get better deals.' : 'انضم إلى مجموعات للشراء التعاوني واحصل على عروض أفضل.',
      route: "/cooperative-buying"
    },
    {
      icon: Users,
      title: language === 'en' ? 'Freelancers Portal' : 'بوابة المستقلين',
      description: language === 'en' ? 'Connect with skilled freelancers for your project needs.' : 'تواصل مع المستقلين المهرة لتلبية احتياجات مشروعك.',
      route: "/freelancers"
    },
    {
      icon: Briefcase,
      title: language === 'en' ? 'Suppliers Portal' : 'بوابة الموردين',
      description: language === 'en' ? 'Find reliable suppliers for your business requirements.' : 'ابحث عن موردين موثوقين لمتطلبات عملك.',
      route: "/suppliers"
    }
  ];
  
  const roles = [
    {
      icon: Users,
      title: language === 'en' ? 'Company/Group' : 'شركة / مجموعة',
      description: language === 'en' ? 'Create contracts, request freelancers, vote, and manage contracts.' : 'إنشاء العقود، طلب مستقلين، التصويت، إدارة العقود.',
      color: 'blue'
    },
    {
      icon: User,
      title: language === 'en' ? 'Freelancer' : 'مستقل',
      description: language === 'en' ? 'Submit offers, complete tasks, and get rated.' : 'تقديم العروض، تنفيذ المهام، الحصول على تقييمات.',
      color: 'green'
    },
    {
      icon: Truck,
      title: language === 'en' ? 'Supplier' : 'مورّد',
      description: language === 'en' ? 'Offer products or services to groups with a dedicated interface.' : 'عرض السلع أو الخدمات للمجموعات، واجهة مخصصة داخل نفس الحساب.',
      color: 'purple'
    },
    {
      icon: Shield,
      title: language === 'en' ? 'Internal Supervisor' : 'المشرف الداخلي',
      description: language === 'en' ? 'Monitor contract progress without voting rights (appointed by the platform).' : 'مراقبة سير العقود دون صلاحية التصويت (يُعين تلقائيًا من المنصة).',
      color: 'gray',
      disabled: true
    }
  ];
  
  return (
    <div className={`min-h-screen bg-gradient-to-b from-gray-50 to-white ${language === 'ar' ? 'text-right' : 'text-left'}`}>
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">ForGPO</h1>
        </div>
        <div className="flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink className="px-3 py-2 text-sm font-medium" href="/about">
                  {language === 'en' ? 'About Us' : 'من نحن'}
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="px-3 py-2 text-sm font-medium" href="/how-it-works">
                  {language === 'en' ? 'How It Works' : 'كيف تعمل المنصة'}
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="px-3 py-2 text-sm font-medium" href="/faq">
                  {language === 'en' ? 'FAQ' : 'الأسئلة الشائعة'}
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="px-3 py-2 text-sm font-medium" href="/contact">
                  {language === 'en' ? 'Contact Us' : 'اتصل بنا'}
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
            >
              <Globe className="h-5 w-5" />
            </Button>
            
            <Select onValueChange={(value) => console.log("Country selected:", value)}>
              <SelectTrigger className="w-[120px]">
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
              onClick={() => navigate("/login")}
            >
              {t('login')}
            </Button>
            <Button onClick={() => navigate("/register")}>
              {t('register')}
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        <div className={`max-w-3xl mx-auto text-center ${language === 'ar' ? 'rtl' : ''}`}>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {language === 'en' ? 'Collaborative Services Platform' : 'منصة خدمات تعاونية'}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {language === 'en' 
              ? 'Connect with groups, freelancers, and suppliers for better deals and efficient transactions.'
              : 'تواصل مع المجموعات والمستقلين والموردين للحصول على صفقات أفضل ومعاملات أكثر كفاءة.'}
          </p>
          
          {/* Search and filter section */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-12">
            <div className="flex flex-col md:flex-row gap-4">
              <Input 
                className="flex-grow" 
                placeholder={language === 'en' ? 'Search for services...' : 'البحث عن الخدمات...'}
              />
              
              <Select value={protocolType} onValueChange={setProtocolType}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder={language === 'en' ? 'Protocol Type' : 'نوع البروتوكول'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {language === 'en' ? 'All' : 'الكل'}
                  </SelectItem>
                  <SelectItem value="web2">Web2</SelectItem>
                  <SelectItem value="web3">Web3</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={serviceType} onValueChange={setServiceType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={language === 'en' ? 'Service Type' : 'نوع الخدمة'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {language === 'en' ? 'All' : 'الكل'}
                  </SelectItem>
                  <SelectItem value="freelancers">
                    {language === 'en' ? 'Freelancers' : 'المستقلين'}
                  </SelectItem>
                  <SelectItem value="cooperative">
                    {language === 'en' ? 'Cooperative Buying' : 'الشراء التعاوني'}
                  </SelectItem>
                  <SelectItem value="suppliers">
                    {language === 'en' ? 'Suppliers' : 'الموردين'}
                  </SelectItem>
                </SelectContent>
              </Select>
              
              <Button>
                <Search className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Search' : 'بحث'}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Service cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <service.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Button variant="outline" onClick={() => navigate(service.route)} className="w-full">
                {language === 'en' ? 'Explore' : 'استكشاف'}
              </Button>
            </div>
          ))}
        </div>
        
        {/* User Roles Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-center mb-8">
            {language === 'en' ? 'Choose Your Role' : 'اختر دورك'}
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
            {language === 'en' 
              ? 'Select the role that best describes your needs on our platform.'
              : 'اختر الدور الذي يناسب احتياجاتك على منصتنا.'}
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role, index) => {
              const colorClasses = {
                blue: "bg-blue-100 text-blue-600",
                green: "bg-green-100 text-green-600",
                purple: "bg-purple-100 text-purple-600",
                gray: "bg-gray-100 text-gray-600"
              };
              
              const iconColorClass = colorClasses[role.color as keyof typeof colorClasses] || colorClasses.blue;
              
              return (
                <Card key={index} className={role.disabled ? "opacity-60 cursor-not-allowed" : "hover:shadow-md cursor-pointer"}>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className={`h-14 w-14 rounded-full ${iconColorClass} flex items-center justify-center mb-4 mt-4`}>
                      <role.icon className="h-7 w-7" />
                    </div>
                    <CardTitle className="mb-2">{role.title}</CardTitle>
                    <CardDescription className="mb-6">{role.description}</CardDescription>
                    <Button 
                      className="w-full" 
                      disabled={role.disabled}
                      onClick={() => role.disabled ? null : navigate("/register", { state: { role: role.title } })}
                    >
                      {language === 'en' ? 'Register as ' + role.title : 'تسجيل كـ ' + role.title}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
        
        {/* New Call to Action Section */}
        <div className="mt-24 bg-blue-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-6">
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
        </div>
      </main>
      
      <footer className="bg-gray-50 mt-20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">{language === 'en' ? 'ForGPO' : 'ForGPO'}</h3>
              <p className="text-gray-600 mb-4">
                {language === 'en' 
                  ? 'Connecting businesses, freelancers, and suppliers for efficient collaboration.'
                  : 'ربط الشركات والمستقلين والموردين للتعاون الفعال.'}
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">{language === 'en' ? 'Quick Links' : 'روابط سريعة'}</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="text-gray-600 hover:text-blue-600">{language === 'en' ? 'About Us' : 'من نحن'}</a></li>
                <li><a href="/how-it-works" className="text-gray-600 hover:text-blue-600">{language === 'en' ? 'How It Works' : 'كيف تعمل المنصة'}</a></li>
                <li><a href="/faq" className="text-gray-600 hover:text-blue-600">{language === 'en' ? 'FAQ' : 'الأسئلة الشائعة'}</a></li>
                <li><a href="/contact" className="text-gray-600 hover:text-blue-600">{language === 'en' ? 'Contact Us' : 'اتصل بنا'}</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">{language === 'en' ? 'Services' : 'الخدمات'}</h3>
              <ul className="space-y-2">
                <li><a href="/cooperative-buying" className="text-gray-600 hover:text-blue-600">{language === 'en' ? 'Cooperative Buying' : 'الشراء التعاوني'}</a></li>
                <li><a href="/freelancers" className="text-gray-600 hover:text-blue-600">{language === 'en' ? 'Freelancers' : 'المستقلين'}</a></li>
                <li><a href="/suppliers" className="text-gray-600 hover:text-blue-600">{language === 'en' ? 'Suppliers' : 'الموردين'}</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">{language === 'en' ? 'Legal' : 'قانوني'}</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-600">{language === 'en' ? 'Terms of Service' : 'شروط الخدمة'}</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">{language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-8 text-center text-gray-600">
            <p>© 2025 ForGPO. {language === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
