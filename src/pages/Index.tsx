
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, MapPin, DollarSign, Clock, Calendar, Users, ShoppingCart, Briefcase, Percent } from "lucide-react";
import { EnhancedHeroSection } from "@/components/HomePage/EnhancedHeroSection";
import { FooterSection } from "@/components/HomePage/FooterSection";
import { EnhancedHeader } from "@/components/HomePage/EnhancedHeader";

const Index = () => {
  const { language, setLanguage } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    groupType: '',
    country: '',
    status: '',
    role: ''
  });

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // Mock data for demonstration
  const featuredOpportunities = [
    {
      id: "1",
      title: language === 'en' ? 'Medical Equipment Group Purchase' : 'شراء جماعي لمعدات طبية',
      type: 'group_buying',
      country: language === 'en' ? 'Saudi Arabia' : 'السعودية',
      status: 'forming',
      members: 8,
      maxMembers: 15,
      description: language === 'en' ? 'Bulk purchase of medical equipment with 20% discount' : 'شراء بالجملة لمعدات طبية بخصم 20%',
      action: 'join'
    },
    {
      id: "2",
      title: language === 'en' ? 'Digital Marketing Campaign' : 'حملة تسويق رقمي',
      type: 'marketing',
      country: language === 'en' ? 'UAE' : 'الإمارات',
      status: 'active',
      members: 12,
      maxMembers: 12,
      description: language === 'en' ? 'Collaborative marketing campaign for small businesses' : 'حملة تسويق تعاونية للأعمال الصغيرة',
      action: 'offer'
    },
    {
      id: "3",
      title: language === 'en' ? 'Software Development Service' : 'خدمة تطوير البرمجيات',
      type: 'freelancer',
      country: language === 'en' ? 'Egypt' : 'مصر',
      status: 'seeking_freelancers',
      budget: '$5,000',
      description: language === 'en' ? 'Mobile app development for e-commerce platform' : 'تطوير تطبيق موبايل لمنصة التجارة الإلكترونية',
      action: 'service'
    },
    {
      id: "4",
      title: language === 'en' ? 'Bulk Tea Export Discount' : 'خصم تصدير الشاي بالجملة',
      type: 'discount_offer',
      country: language === 'en' ? 'India' : 'الهند',
      status: 'active',
      basePrice: 100,
      discount: '10-15%',
      minMembers: 5,
      currentMembers: 3,
      expiry: '2025-02-28',
      description: language === 'en' ? 'Premium tea export with tiered discounts' : 'تصدير شاي فاخر مع خصومات متدرجة',
      action: 'discount'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'forming': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'seeking_freelancers': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap = {
      forming: { en: 'Forming', ar: 'قيد التكوين' },
      active: { en: 'Active', ar: 'نشط' },
      seeking_freelancers: { en: 'Seeking Freelancers', ar: 'يطلب مستقلين' }
    };
    return statusMap[status as keyof typeof statusMap]?.[language] || status;
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'join': return <Users className="w-4 h-4" />;
      case 'offer': return <ShoppingCart className="w-4 h-4" />;
      case 'service': return <Briefcase className="w-4 h-4" />;
      case 'discount': return <Percent className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const getActionText = (action: string) => {
    const actionMap = {
      join: { en: 'Join Group', ar: 'انضم للمجموعة' },
      offer: { en: 'Submit Offer', ar: 'قدم عرض' },
      service: { en: 'Provide Service', ar: 'قدم خدمة' },
      discount: { en: 'Join Discount Offer', ar: 'انضم لعرض الخصم' }
    };
    return actionMap[action as keyof typeof actionMap]?.[language] || action;
  };

  const handleAction = (opportunity: any) => {
    if (user) {
      navigate(`/group-details/${opportunity.id}`);
    } else {
      navigate("/register");
    }
  };

  return (
    <div className={`min-h-screen bg-background ${language === 'ar' ? 'text-right font-arabic' : 'text-left'}`}>
      <EnhancedHeader />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground gradient-text">
              {language === 'en' ? 'The Future of Collective Business' : 'مستقبل الأعمال التعاونية'}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {language === 'en' 
                ? 'Join groups, submit offers, provide services, and participate in exclusive discount programs'
                : 'انضم للمجموعات، قدم العروض، قدم الخدمات، وشارك في برامج الخصم الحصرية'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate("/register")}
                className="gradient-primary text-lg px-8 py-4"
              >
                {language === 'en' ? 'Get Started' : 'ابدأ الآن'}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => navigate("/how-it-works")}
                className="text-lg px-8 py-4"
              >
                {language === 'en' ? 'Learn How' : 'تعلم كيف'}
              </Button>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 px-4 bg-card border-b">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select value={filters.groupType} onValueChange={(value) => setFilters(prev => ({...prev, groupType: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'en' ? 'Group Type' : 'نوع المجموعة'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="group_buying">{language === 'en' ? 'Group Buying' : 'الشراء الجماعي'}</SelectItem>
                  <SelectItem value="marketing">{language === 'en' ? 'Marketing' : 'التسويق'}</SelectItem>
                  <SelectItem value="freelancer">{language === 'en' ? 'Freelancer' : 'مستقل'}</SelectItem>
                  <SelectItem value="discount_offer">{language === 'en' ? 'Discount Offers' : 'عروض الخصم'}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.country} onValueChange={(value) => setFilters(prev => ({...prev, country: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'en' ? 'Country' : 'البلد'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="saudi">{language === 'en' ? 'Saudi Arabia' : 'السعودية'}</SelectItem>
                  <SelectItem value="uae">{language === 'en' ? 'UAE' : 'الإمارات'}</SelectItem>
                  <SelectItem value="egypt">{language === 'en' ? 'Egypt' : 'مصر'}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({...prev, status: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'en' ? 'Status' : 'الحالة'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="forming">{language === 'en' ? 'Forming' : 'قيد التكوين'}</SelectItem>
                  <SelectItem value="active">{language === 'en' ? 'Active' : 'نشط'}</SelectItem>
                  <SelectItem value="seeking">{language === 'en' ? 'Seeking Members' : 'يطلب أعضاء'}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.role} onValueChange={(value) => setFilters(prev => ({...prev, role: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'en' ? 'Your Role' : 'دورك'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">{language === 'en' ? 'Member' : 'عضو'}</SelectItem>
                  <SelectItem value="supplier">{language === 'en' ? 'Supplier' : 'مورد'}</SelectItem>
                  <SelectItem value="freelancer">{language === 'en' ? 'Freelancer' : 'مستقل'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              {language === 'en' ? 'Featured Opportunities' : 'الفرص المميزة'}
            </h2>
            <p className="text-gray-600 text-center mb-12">
              {language === 'en' 
                ? 'Discover groups, offers, services, and exclusive discount programs'
                : 'اكتشف المجموعات والعروض والخدمات وبرامج الخصم الحصرية'}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredOpportunities.map((opportunity) => (
                <Card key={opportunity.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleAction(opportunity)}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <Badge className={getStatusColor(opportunity.status)}>
                        {getStatusText(opportunity.status)}
                      </Badge>
                      <div className="text-xs text-gray-500 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {opportunity.country}
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-tight">{opportunity.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <CardDescription className="text-sm">{opportunity.description}</CardDescription>
                    
                    {opportunity.action === 'join' && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        {opportunity.members}/{opportunity.maxMembers} {language === 'en' ? 'members' : 'عضو'}
                      </div>
                    )}

                    {opportunity.action === 'service' && opportunity.budget && (
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="w-4 h-4 mr-2" />
                        {opportunity.budget}
                      </div>
                    )}

                    {opportunity.action === 'discount' && (
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Percent className="w-4 h-4 mr-2" />
                          {opportunity.discount} {language === 'en' ? 'discount' : 'خصم'}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="w-4 h-4 mr-2" />
                          {opportunity.currentMembers}/{opportunity.minMembers} {language === 'en' ? 'joined' : 'منضم'}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          {language === 'en' ? 'Expires' : 'ينتهي'}: {new Date(opportunity.expiry).toLocaleDateString()}
                        </div>
                      </div>
                    )}

                    <Button className="w-full" variant="outline">
                      {getActionIcon(opportunity.action)}
                      <span className="ml-2">{getActionText(opportunity.action)}</span>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="section-spacing bg-gradient-to-br from-muted/30 via-background to-primary/5">
          <div className="container-responsive text-center">
            <div className="max-w-4xl mx-auto p-8 bg-card/80 backdrop-blur-sm rounded-2xl shadow-xl border border-border/50">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground gradient-text">
                {language === 'en' ? 'Ready to Transform Your Business?' : 'هل أنت مستعد لتحويل عملك؟'}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {language === 'en' 
                  ? 'Join thousands of businesses and professionals already using GPO WORLD to streamline collaboration, reduce costs, and achieve unprecedented results.'
                  : 'انضم إلى آلاف الشركات والمهنيين الذين يستخدمون GPO WORLD بالفعل لتبسيط التعاون وتقليل التكاليف وتحقيق نتائج غير مسبوقة.'}
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
