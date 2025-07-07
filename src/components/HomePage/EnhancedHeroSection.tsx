
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, Users, TrendingUp, Shield, Globe } from "lucide-react";

export const EnhancedHeroSection = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  const stats = [
    {
      icon: Users,
      value: "10,000+",
      label: language === 'en' ? 'Active Members' : 'عضو نشط',
      color: "text-primary"
    },
    {
      icon: TrendingUp,
      value: "85%",
      label: language === 'en' ? 'Cost Savings' : 'توفير في التكاليف',
      color: "text-dao-green"
    },
    {
      icon: Shield,
      value: "100%",
      label: language === 'en' ? 'Secure Transactions' : 'معاملات آمنة',
      color: "text-dao-blue"
    },
    {
      icon: Globe,
      value: "50+",
      label: language === 'en' ? 'Countries' : 'دولة',
      color: "text-purple-600"
    }
  ];

  return (
    <section className="relative section-spacing bg-gradient-to-br from-background via-primary/5 to-dao-green/5 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-dao-green rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-dao-blue rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container-responsive relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Hero Badge */}
          <div className="inline-flex items-center px-6 py-3 mb-8 bg-primary/10 border border-primary/20 rounded-full">
            <span className="text-primary font-semibold text-sm">
              {language === 'en' ? '🚀 Revolutionary Business Platform' : '🚀 منصة الأعمال الثورية'}
            </span>
          </div>

          {/* Main Hero Content */}
          <div className="mb-12">
            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight ${language === 'ar' ? 'font-arabic' : ''}`}>
              <span className="text-foreground">
                {language === 'en' ? 'Transform Your Business with ' : 'حول عملك مع '}
              </span>
              <span className="gradient-text bg-gradient-to-r from-primary via-dao-green to-dao-blue bg-clip-text text-transparent">
                {language === 'en' ? 'Smart Group Solutions' : 'الحلول الجماعية الذكية'}
              </span>
            </h1>
            
            <p className={`text-xl md:text-2xl text-muted-foreground mb-10 max-w-4xl mx-auto leading-relaxed ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'en'
                ? 'Join the world\'s most advanced platform for cooperative purchasing, group marketing, company formation, and smart business collaboration. Reduce costs by up to 85% through intelligent group dynamics.'
                : 'انضم إلى أكثر المنصات تقدماً في العالم للشراء التعاوني والتسويق الجماعي وتأسيس الشركات والتعاون التجاري الذكي. قلل التكاليف بنسبة تصل إلى 85% من خلال الديناميكيات الجماعية الذكية.'
              }
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
            <Button 
              size="lg" 
              className="text-lg px-10 py-6 gradient-primary shadow-xl hover:shadow-2xl transition-all duration-300 group"
              onClick={handleGetStarted}
            >
              {language === 'en' ? 'Get Started Now' : 'ابدأ الآن'}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-10 py-6 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              onClick={() => navigate("/how-it-works")}
            >
              {language === 'en' ? 'Watch Demo' : 'شاهد العرض التوضيحي'}
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`inline-flex items-center justify-center w-16 h-16 ${stat.color} bg-current/10 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
