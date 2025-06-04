
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Building, Users, Handshake, Scale, FileText, Clock, MapPin, DollarSign } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { internationalBusinessService } from "@/services/international-business-service";

const EnhancedIndex = () => {
  const { t, language, setLanguage } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const serviceGateways = internationalBusinessService.getServiceGateways();
  const jurisdictions = internationalBusinessService.getJurisdictions();

  const getServiceIcon = (serviceId: string) => {
    switch (serviceId) {
      case 'cooperative_buying': return <Users className="h-8 w-8 text-blue-600" />;
      case 'cooperative_marketing': return <Handshake className="h-8 w-8 text-green-600" />;
      case 'company_formation': return <Building className="h-8 w-8 text-purple-600" />;
      case 'supplier_sourcing': return <FileText className="h-8 w-8 text-orange-600" />;
      case 'freelancer_management': return <Users className="h-8 w-8 text-cyan-600" />;
      case 'arbitration_ipfs': return <Scale className="h-8 w-8 text-red-600" />;
      default: return <Globe className="h-8 w-8 text-gray-600" />;
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-white ${language === 'ar' ? 'text-right' : 'text-left'}`}>
      {/* Enhanced Header */}
      <header className="bg-white/95 backdrop-blur border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <Globe className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-600">GPO Platform</h1>
                <p className="text-xs text-gray-600">
                  {language === 'en' ? 'Unified Smart Collaboration Hub' : 'مركز التعاون الذكي الموحد'}
                </p>
              </div>
            </div>
            
            {/* Real-time Info Bar */}
            <div className="hidden md:flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{new Date().toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>GMT+2</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span>USD</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      {language === 'en' ? 'Standards' : 'المعايير'}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="p-4 w-80">
                        <h4 className="font-medium mb-2">
                          {language === 'en' ? 'International Standards' : 'المعايير الدولية'}
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div>• Harvard Business School Methodology</div>
                          <div>• WTO Trade Rules</div>
                          <div>• UNCITRAL Model Law</div>
                          <div>• ISO 44001 Collaborative Management</div>
                          <div>• ICC International Commercial Terms</div>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink className="px-3 py-2 text-sm font-medium hover:text-blue-600" href="/about">
                      {language === 'en' ? 'About' : 'حول المنصة'}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <Button variant="ghost" size="icon" onClick={toggleLanguage}>
                <Globe className="h-5 w-5" />
              </Button>
              
              <Select>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder={language === 'en' ? 'Region' : 'المنطقة'} />
                </SelectTrigger>
                <SelectContent>
                  {jurisdictions.map(jurisdiction => (
                    <SelectItem key={jurisdiction.code} value={jurisdiction.code}>
                      {jurisdiction.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => navigate("/login")}>
                  {language === 'en' ? 'Login' : 'تسجيل الدخول'}
                </Button>
                <Button onClick={() => navigate("/register")}>
                  {language === 'en' ? 'Register' : 'إنشاء حساب'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">
              {language === 'en' 
                ? 'International Business Collaboration Platform' 
                : 'منصة التعاون التجاري الدولي'}
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              {language === 'en' 
                ? 'Built on Harvard Business School principles, WTO standards, and UNCITRAL frameworks for transparent, efficient global commerce'
                : 'مبنية على مبادئ كلية هارفارد للأعمال ومعايير منظمة التجارة العالمية وإطار عمل الأونسيترال للتجارة العالمية الشفافة والفعالة'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                {language === 'en' ? 'Start Collaboration' : 'ابدأ التعاون'}
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                {language === 'en' ? 'View Platform Demo' : 'مشاهدة عرض المنصة'}
              </Button>
            </div>
          </div>
        </section>

        {/* Service Gateways */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {language === 'en' ? 'Service Gateways' : 'بوابات الخدمة'}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {language === 'en'
                  ? 'Each gateway follows international business standards and legal frameworks'
                  : 'كل بوابة تتبع المعايير التجارية الدولية والأطر القانونية المعتمدة'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceGateways.map(gateway => (
                <Card key={gateway.id} className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-600">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      {getServiceIcon(gateway.id)}
                      <Badge variant="secondary">{gateway.framework.standard}</Badge>
                    </div>
                    <CardTitle className="text-lg">{gateway.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-1">
                        {language === 'en' ? 'Business Objective' : 'الهدف التجاري'}
                      </h4>
                      <p className="text-sm text-gray-600">{gateway.businessObjective}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-1">
                        {language === 'en' ? 'Legal Model' : 'النموذج القانوني'}
                      </h4>
                      <p className="text-sm text-gray-600">{gateway.legalModel}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-1">
                        {language === 'en' ? 'Workflow Steps' : 'خطوات سير العمل'}
                      </h4>
                      <div className="text-xs text-gray-500">
                        {gateway.workflowSteps.slice(0, 3).map((step, index) => (
                          <span key={index} className="inline-block mr-2">
                            {index + 1}. {step}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button 
                      className="w-full mt-4" 
                      onClick={() => navigate(`/${gateway.id.replace('_', '-')}`)}
                    >
                      {language === 'en' ? 'Enter Gateway' : 'دخول البوابة'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Legal Framework Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {language === 'en' ? 'Supported Jurisdictions' : 'الولايات القضائية المدعومة'}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jurisdictions.map(jurisdiction => (
                <Card key={jurisdiction.code} className="text-center">
                  <CardHeader>
                    <CardTitle className="text-lg">{jurisdiction.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-gray-600">{jurisdiction.companyLaw}</p>
                    <div className="flex justify-center gap-2">
                      {jurisdiction.arbitrationSupported && (
                        <Badge variant="outline">Arbitration</Badge>
                      )}
                      {jurisdiction.digitalSignatureValid && (
                        <Badge variant="outline">Digital Signature</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              {language === 'en' ? 'Ready to Transform Your Business?' : 'مستعد لتطوير أعمالك؟'}
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              {language === 'en'
                ? 'Join the global community of businesses using our platform for intelligent collaboration'
                : 'انضم إلى المجتمع العالمي من الشركات التي تستخدم منصتنا للتعاون الذكي'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                {language === 'en' ? 'Create Account' : 'إنشاء حساب'}
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                {language === 'en' ? 'Schedule Demo' : 'جدولة عرض تجريبي'}
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">GPO Platform</h3>
              <p className="text-sm text-gray-400">
                {language === 'en'
                  ? 'International business collaboration built on academic excellence'
                  : 'التعاون التجاري الدولي المبني على التميز الأكاديمي'}
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">
                {language === 'en' ? 'Standards' : 'المعايير'}
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Harvard Business School</li>
                <li>WTO Guidelines</li>
                <li>UNCITRAL Model Law</li>
                <li>ISO 44001</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">
                {language === 'en' ? 'Services' : 'الخدمات'}
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>{language === 'en' ? 'Group Buying' : 'الشراء الجماعي'}</li>
                <li>{language === 'en' ? 'Company Formation' : 'تأسيس الشركات'}</li>
                <li>{language === 'en' ? 'Arbitration' : 'التحكيم'}</li>
                <li>{language === 'en' ? 'Contract Management' : 'إدارة العقود'}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">
                {language === 'en' ? 'Contact' : 'اتصل بنا'}
              </h4>
              <p className="text-sm text-gray-400">
                support@gpo-platform.com
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 GPO Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EnhancedIndex;
