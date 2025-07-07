
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  ShoppingCart, 
  Megaphone, 
  Building2, 
  TrendingUp, 
  Truck, 
  Users, 
  UserCheck, 
  Wrench, 
  Package, 
  Gavel, 
  FileText, 
  Handshake 
} from "lucide-react";

export const MainPortalsSection = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePortalClick = (route: string) => {
    if (user) {
      navigate(route);
    } else {
      navigate("/register");
    }
  };

  const portals = [
    {
      icon: ShoppingCart,
      title: language === 'en' ? 'Cooperative Purchasing' : 'الشراء التعاوني',
      description: language === 'en' 
        ? 'Join buying groups to reduce costs through bulk purchasing power and smart negotiations.'
        : 'انضم إلى مجموعات الشراء لتقليل التكاليف من خلال قوة الشراء بالجملة والمفاوضات الذكية.',
      route: "/cooperative-buying",
      gradient: "from-primary to-primary/80",
      activeGroups: 156,
      status: language === 'en' ? 'Seeking Members' : 'يبحث عن أعضاء',
      kycRequired: true,
      pointsRequired: true
    },
    {
      icon: Megaphone,
      title: language === 'en' ? 'Cooperative Marketing' : 'التسويق التعاوني',
      description: language === 'en'
        ? 'Create collaborative marketing campaigns and share advertising costs for maximum impact.'
        : 'أنشئ حملات تسويقية تعاونية وشارك تكاليف الإعلان لتحقيق أقصى تأثير.',
      route: "/cooperative-marketing",
      gradient: "from-dao-green to-green-400",
      activeGroups: 89,
      status: language === 'en' ? 'Active Campaign' : 'حملة نشطة',
      kycRequired: true,
      pointsRequired: true
    },
    {
      icon: Building2,
      title: language === 'en' ? 'Company Formation' : 'تأسيس الشركات',
      description: language === 'en'
        ? 'Form companies individually or in groups with smart legal frameworks and documentation.'
        : 'قم بتأسيس الشركات فردياً أو في مجموعات مع أطر قانونية ذكية ووثائق.',
      route: "/company-formation",
      gradient: "from-purple-500 to-purple-400",
      activeGroups: 45,
      status: language === 'en' ? 'Review Process' : 'عملية مراجعة',
      kycRequired: false,
      pointsRequired: false
    },
    {
      icon: TrendingUp,
      title: language === 'en' ? 'Investment Groups' : 'مجموعات الاستثمار',
      description: language === 'en'
        ? 'Create or join investment groups for collective funding and risk sharing opportunities.'
        : 'أنشئ أو انضم إلى مجموعات الاستثمار للتمويل الجماعي وفرص تقاسم المخاطر.',
      route: "/investment-gateway",
      gradient: "from-dao-blue to-blue-400",
      activeGroups: 78,
      status: language === 'en' ? 'Funding Round' : 'جولة تمويل',
      kycRequired: true,
      pointsRequired: true
    },
    {
      icon: Truck,
      title: language === 'en' ? 'Suppliers' : 'الموردون',
      description: language === 'en'
        ? 'Connect with verified suppliers and submit competitive offers to active purchasing groups.'
        : 'تواصل مع موردين معتمدين وقدم عروض تنافسية للمجموعات الشرائية النشطة.',
      route: "/supplier-sourcing",
      gradient: "from-orange-500 to-orange-400",
      activeGroups: 234,
      status: language === 'en' ? 'Awaiting Supply' : 'في انتظار التوريد',
      kycRequired: true,
      pointsRequired: true
    },
    {
      icon: Users,
      title: language === 'en' ? 'Freelancers' : 'المستقلون',
      description: language === 'en'
        ? 'Showcase skills, take MCP assessments, and connect with businesses seeking talent.'
        : 'اعرض مهاراتك، خذ تقييمات MCP، وتواصل مع الشركات التي تبحث عن المواهب.',
      route: "/freelancer-management",
      gradient: "from-indigo-500 to-indigo-400",
      activeGroups: 187,
      status: language === 'en' ? 'Available' : 'متاح',
      kycRequired: false,
      pointsRequired: false,
      mcpRequired: true
    },
    {
      icon: UserCheck,
      title: language === 'en' ? 'Freelancer Groups' : 'مجموعات المستقلين',
      description: language === 'en'
        ? 'Form collaborative freelancer teams to tackle larger projects and share resources.'
        : 'كون فرق متعاونة من المستقلين لمعالجة مشاريع أكبر ومشاركة الموارد.',
      route: "/freelancer-groups",
      gradient: "from-cyan-500 to-cyan-400",
      activeGroups: 56,
      status: language === 'en' ? 'Team Building' : 'بناء الفريق',
      kycRequired: false,
      pointsRequired: false,
      mcpRequired: true
    },
    {
      icon: Wrench,
      title: language === 'en' ? 'Service Providers' : 'مقدمو الخدمات',
      description: language === 'en'
        ? 'Offer professional services and connect with businesses needing specialized expertise.'
        : 'قدم خدمات مهنية وتواصل مع الشركات التي تحتاج خبرة متخصصة.',
      route: "/service-providers",
      gradient: "from-emerald-500 to-emerald-400",
      activeGroups: 123,
      status: language === 'en' ? 'Service Ready' : 'جاهز للخدمة',
      kycRequired: false,
      pointsRequired: false
    },
    {
      icon: Package,
      title: language === 'en' ? 'Product Listings' : 'قوائم المنتجات',
      description: language === 'en'
        ? 'Browse and list products in our marketplace with group buying opportunities.'
        : 'تصفح وأدرج المنتجات في السوق مع فرص الشراء الجماعي.',
      route: "/product-listings",
      gradient: "from-pink-500 to-pink-400",
      activeGroups: 301,
      status: language === 'en' ? 'New Listings' : 'قوائم جديدة',
      kycRequired: false,
      pointsRequired: false
    },
    {
      icon: Gavel,
      title: language === 'en' ? 'Arbitration & Documentation' : 'التحكيم والتوثيق',
      description: language === 'en'
        ? 'Secure dispute resolution and IPFS-based documentation for all business transactions.'
        : 'حل النزاعات الآمن والتوثيق المبني على IPFS لجميع المعاملات التجارية.',
      route: "/arbitration-ipfs",
      gradient: "from-dao-red to-red-400",
      activeGroups: 23,
      status: language === 'en' ? 'Available' : 'متاح',
      kycRequired: false,
      pointsRequired: false
    },
    {
      icon: FileText,
      title: language === 'en' ? 'Arbitration Requests' : 'طلبات التحكيم',
      description: language === 'en'
        ? 'File dispute requests with transparent timelines and blockchain-secured decisions.'
        : 'قدم طلبات النزاعات مع جداول زمنية شفافة وقرارات مؤمنة بالبلوك تشين.',
      route: "/arbitration-requests",
      gradient: "from-amber-500 to-amber-400",
      activeGroups: 12,
      status: language === 'en' ? 'Processing' : 'قيد المعالجة',
      kycRequired: false,
      pointsRequired: false
    },
    {
      icon: Handshake,
      title: language === 'en' ? 'Smart Negotiation Solutions' : 'حلول التفاوض الذكية',
      description: language === 'en'
        ? 'AI-powered negotiation tools using Harvard frameworks for optimal business outcomes.'
        : 'أدوات التفاوض المدعومة بالذكاء الاصطناعي باستخدام أطر هارفارد للحصول على أفضل النتائج التجارية.',
      route: "/smart-negotiation",
      gradient: "from-violet-500 to-violet-400",
      activeGroups: 67,
      status: language === 'en' ? 'Active Sessions' : 'جلسات نشطة',
      kycRequired: false,
      pointsRequired: false
    }
  ];

  return (
    <section className="section-spacing bg-background">
      <div className="container-responsive">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-5xl font-bold text-foreground mb-6 ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'en' ? 'Business Portal Ecosystem' : 'نظام بوابات الأعمال البيئي'}
          </h2>
          <p className={`text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'en' 
              ? 'Choose from 12 specialized portals designed to transform how businesses collaborate, purchase, and grow together'
              : 'اختر من 12 بوابة متخصصة مصممة لتحويل كيفية تعاون الشركات والشراء والنمو معاً'
            }
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {portals.map((portal, index) => (
            <Card key={index} className="card-hover border-2 hover:border-primary/20 group relative overflow-hidden">
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${portal.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <CardHeader className="relative z-10 pb-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${portal.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  <portal.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className={`text-lg text-center text-foreground group-hover:text-primary transition-colors ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {portal.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="relative z-10 text-center space-y-4">
                <CardDescription className={`min-h-[80px] flex items-center text-muted-foreground leading-relaxed ${language === 'ar' ? 'font-arabic text-right' : ''}`}>
                  {portal.description}
                </CardDescription>
                
                {/* Group Info */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">
                      {language === 'en' ? 'Active Groups:' : 'المجموعات النشطة:'}
                    </span>
                    <span className="font-semibold text-foreground">{portal.activeGroups}</span>
                  </div>
                  
                  <Badge variant="secondary" className="w-full justify-center">
                    {portal.status}
                  </Badge>
                </div>

                {/* Requirements */}
                <div className="flex flex-wrap gap-1 justify-center">
                  {portal.kycRequired && (
                    <Badge variant="outline" className="text-xs">
                      {language === 'en' ? 'KYC' : 'التحقق'}
                    </Badge>
                  )}
                  {portal.pointsRequired && (
                    <Badge variant="outline" className="text-xs">
                      {language === 'en' ? 'Points' : 'نقاط'}
                    </Badge>
                  )}
                  {portal.mcpRequired && (
                    <Badge variant="outline" className="text-xs">
                      {language === 'en' ? 'MCP Test' : 'اختبار MCP'}
                    </Badge>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-4">
                  <Button 
                    className="w-full gradient-primary shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={() => handlePortalClick(portal.route)}
                  >
                    {language === 'en' ? 'Join' : 'انضم'}
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 text-xs hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      onClick={() => handlePortalClick(portal.route + '/offers')}
                    >
                      {language === 'en' ? 'Submit Offer' : 'قدم عرض'}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex-1 text-xs hover:bg-muted transition-all duration-300"
                      onClick={() => handlePortalClick(portal.route + '/contact')}
                    >
                      {language === 'en' ? 'Contact' : 'اتصل'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
