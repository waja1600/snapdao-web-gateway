
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ShoppingCart, Users, Truck, Globe } from "lucide-react";

export const ServiceCards = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleServiceClick = (route: string) => {
    if (user) {
      navigate(route);
    } else {
      navigate("/login");
    }
  };

  const services = [
    {
      icon: ShoppingCart,
      title: language === 'en' ? 'Cooperative Buying' : 'الشراء التعاوني',
      description: language === 'en' 
        ? 'Join groups to buy products or services in bulk and get better deals with collective purchasing power.'
        : 'انضم إلى مجموعات لشراء منتجات أو خدمات بكميات واحصل على صفقات أفضل بقوة الشراء الجماعي.',
      route: "/cooperative-buying",
      color: "bg-primary",
      gradient: "from-primary to-primary/80"
    },
    {
      icon: Globe,
      title: language === 'en' ? 'Cooperative Marketing' : 'التسويق التعاوني',
      description: language === 'en'
        ? 'Collaborate with others to create smart marketing campaigns and share costs for maximum impact.'
        : 'تعاون مع آخرين لإنشاء حملات تسويقية ذكية وتقاسم التكاليف لتحقيق أقصى تأثير.',
      route: "/cooperative-marketing",
      color: "bg-dao-green",
      gradient: "from-dao-green to-green-400"
    },
    {
      icon: Users,
      title: language === 'en' ? 'Freelancers Portal' : 'بوابة المستقلين',
      description: language === 'en'
        ? 'Showcase your skills, participate in collaborative tasks, and build your professional network.'
        : 'اعرض مهاراتك، شارك في مهام تعاونية، وابن شبكتك المهنية.',
      route: "/freelancer-management",
      color: "bg-purple-500",
      gradient: "from-purple-500 to-purple-400"
    },
    {
      icon: Truck,
      title: language === 'en' ? 'Suppliers Portal' : 'بوابة الموردين',
      description: language === 'en'
        ? 'Submit competitive offers to active groups and expand your business reach effectively.'
        : 'قدم عروض تنافسية للمجموعات النشطة ووسع نطاق عملك بفعالية.',
      route: "/supplier-sourcing",
      color: "bg-orange-500",
      gradient: "from-orange-500 to-orange-400"
    }
  ];

  return (
    <section className="section-spacing bg-background">
      <div className="container-responsive">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold text-foreground mb-4 ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'en' ? 'Main Service Gateways' : 'البوابات الأساسية للخدمات'}
          </h2>
          <p className={`text-lg text-muted-foreground max-w-2xl mx-auto ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'en' 
              ? 'Choose from our comprehensive suite of business collaboration tools'
              : 'اختر من مجموعة أدوات التعاون التجاري الشاملة لدينا'
            }
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="card-hover border-2 hover:border-primary/20 group">
              <CardHeader className="text-center pb-4">
                <div className={`w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  <service.icon className="w-10 h-10 text-white" />
                </div>
                <CardTitle className={`text-xl text-foreground group-hover:text-primary transition-colors ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className={`mb-6 min-h-[80px] flex items-center text-muted-foreground ${language === 'ar' ? 'font-arabic text-right' : ''}`}>
                  {service.description}
                </CardDescription>
                <Button 
                  className="w-full gradient-primary shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={() => handleServiceClick(service.route)}
                >
                  {language === 'en' ? 'Start Now' : 'ابدأ الآن'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
