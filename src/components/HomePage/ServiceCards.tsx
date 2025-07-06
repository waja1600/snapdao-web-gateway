
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
        ? 'Join groups to buy products or services in bulk and get better deals.'
        : 'انضم إلى مجموعات لشراء منتجات أو خدمات بكميات واحصل على صفقات أفضل.',
      route: "/cooperative-buying",
      color: "bg-blue-500"
    },
    {
      icon: Globe,
      title: language === 'en' ? 'Cooperative Marketing' : 'التسويق التعاوني',
      description: language === 'en'
        ? 'Collaborate with others to create smart marketing campaigns.'
        : 'تعاون مع آخرين لإنشاء حملات تسويقية ذكية.',
      route: "/cooperative-marketing",
      color: "bg-green-500"
    },
    {
      icon: Users,
      title: language === 'en' ? 'Freelancers Portal' : 'بوابة المستقلين',
      description: language === 'en'
        ? 'Showcase your skills or participate in collaborative tasks.'
        : 'اعرض مهاراتك أو شارك في مهام تعاونية.',
      route: "/freelancers",
      color: "bg-purple-500"
    },
    {
      icon: Truck,
      title: language === 'en' ? 'Suppliers Portal' : 'بوابة الموردين',
      description: language === 'en'
        ? 'Submit your offers to groups ready for negotiation.'
        : 'قدم عروضك للمجموعات الجاهزة للتفاوض.',
      route: "/suppliers",
      color: "bg-orange-500"
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          {language === 'en' ? 'Main Service Gateways' : 'البوابات الأساسية للخدمات'}
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 min-h-[60px]">
                  {service.description}
                </CardDescription>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleServiceClick(service.route)}
                >
                  {language === 'en' ? 'Start' : 'ابدأ'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
