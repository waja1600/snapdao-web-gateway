
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/Layout";
import { ArrowRight, Users, Building, UserCheck, CheckCircle, Clock, Globe } from "lucide-react";

const ServiceLanding = () => {
  const { service } = useParams();
  const { language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [selectedType, setSelectedType] = useState<'group' | 'solo' | null>(null);

  const serviceConfig = {
    'cooperative-buying': {
      title: language === 'en' ? 'Group Buying' : 'الشراء الجماعي',
      description: language === 'en' 
        ? 'Join forces with other buyers to get better prices and terms from suppliers.'
        : 'انضم مع مشترين آخرين للحصول على أسعار وشروط أفضل من الموردين.',
      icon: Users,
      color: 'bg-blue-500',
      benefits: [
        { 
          title: language === 'en' ? 'Better Prices' : 'أسعار أفضل',
          description: language === 'en' ? 'Save 15-40% through bulk purchasing' : 'وفر 15-40% من خلال الشراء بالجملة'
        },
        {
          title: language === 'en' ? 'Quality Assurance' : 'ضمان الجودة',
          description: language === 'en' ? 'Verified suppliers and quality control' : 'موردون معتمدون وضبط جودة'
        },
        {
          title: language === 'en' ? 'Risk Sharing' : 'تقاسم المخاطر',
          description: language === 'en' ? 'Shared responsibility and reduced individual risk' : 'مسؤولية مشتركة وتقليل المخاطر الفردية'
        }
      ]
    },
    'cooperative-marketing': {
      title: language === 'en' ? 'Cooperative Marketing' : 'التسويق التعاوني',
      description: language === 'en' 
        ? 'Collaborate on marketing campaigns to reach wider audiences at lower costs.'
        : 'تعاون في الحملات التسويقية للوصول لجمهور أوسع بتكلفة أقل.',
      icon: Globe,
      color: 'bg-green-500',
      benefits: [
        {
          title: language === 'en' ? 'Cost Efficiency' : 'فعالية التكلفة',
          description: language === 'en' ? 'Share marketing costs with partners' : 'تقاسم تكاليف التسويق مع الشركاء'
        },
        {
          title: language === 'en' ? 'Wider Reach' : 'وصول أوسع',
          description: language === 'en' ? 'Access combined audience networks' : 'الوصول لشبكات جمهور مشتركة'
        },
        {
          title: language === 'en' ? 'Creative Synergy' : 'تناغم إبداعي',
          description: language === 'en' ? 'Benefit from diverse perspectives' : 'الاستفادة من وجهات نظر متنوعة'
        }
      ]
    },
    'freelancers': {
      title: language === 'en' ? 'Freelancers Portal' : 'بوابة المستقلين',
      description: language === 'en' 
        ? 'Find skilled freelancers or offer your services to growing businesses.'
        : 'ابحث عن مستقلين ماهرين أو قدم خدماتك للشركات النامية.',
      icon: UserCheck,
      color: 'bg-purple-500',
      benefits: [
        {
          title: language === 'en' ? 'Verified Talent' : 'مواهب معتمدة',
          description: language === 'en' ? 'Pre-screened freelancers with proven track records' : 'مستقلون مفحوصون مسبقاً بسجل إنجازات مثبت'
        },
        {
          title: language === 'en' ? 'Secure Payments' : 'مدفوعات آمنة',
          description: language === 'en' ? 'Escrow protection for all transactions' : 'حماية الضمان لجميع المعاملات'
        },
        {
          title: language === 'en' ? 'Project Management' : 'إدارة المشاريع',
          description: language === 'en' ? 'Built-in tools for collaboration' : 'أدوات مدمجة للتعاون'
        }
      ]
    },
    'suppliers': {
      title: language === 'en' ? 'Suppliers Portal' : 'بوابة الموردين',
      description: language === 'en' 
        ? 'Connect with buying groups and offer your products to multiple buyers at once.'
        : 'تواصل مع مجموعات الشراء وقدم منتجاتك لعدة مشترين في آن واحد.',
      icon: Building,
      color: 'bg-orange-500',
      benefits: [
        {
          title: language === 'en' ? 'Bulk Orders' : 'طلبات بالجملة',
          description: language === 'en' ? 'Access to large volume orders' : 'الوصول لطلبات بكميات كبيرة'
        },
        {
          title: language === 'en' ? 'Competitive Edge' : 'ميزة تنافسية',
          description: language === 'en' ? 'Showcase your capabilities to multiple buyers' : 'اعرض قدراتك لعدة مشترين'
        },
        {
          title: language === 'en' ? 'Long-term Partnerships' : 'شراكات طويلة المدى',
          description: language === 'en' ? 'Build lasting relationships with buyer groups' : 'بناء علاقات دائمة مع مجموعات المشترين'
        }
      ]
    }
  };

  const currentService = serviceConfig[service as keyof typeof serviceConfig];

  if (!currentService) {
    navigate('/');
    return null;
  }

  const handleStart = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!selectedType) {
      return;
    }

    // Navigate to creation form with service and type
    navigate(`/create-group?service=${service}&type=${selectedType}`);
  };

  const ServiceIcon = currentService.icon;

  return (
    <Layout sidebar={false}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Hero Section */}
        <div className="relative py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`w-20 h-20 ${currentService.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
              <ServiceIcon className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              {currentService.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {currentService.description}
            </p>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {currentService.benefits.map((benefit, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Action Section */}
        <div className="py-16 bg-white">
          <div className="max-w-2xl mx-auto px-4">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">
                  {language === 'en' ? 'How would you like to proceed?' : 'كيف تريد المتابعة؟'}
                </CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Choose whether you want to create a group or work solo'
                    : 'اختر ما إذا كنت تريد إنشاء مجموعة أو العمل منفرداً'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Group Option */}
                <Card 
                  className={`cursor-pointer transition-all ${
                    selectedType === 'group' 
                      ? 'ring-2 ring-blue-500 bg-blue-50' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedType('group')}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${selectedType === 'group' ? 'bg-blue-500' : 'bg-gray-300'} rounded-full flex items-center justify-center`}>
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            {language === 'en' ? 'Create/Join Group' : 'إنشاء/انضمام لمجموعة'}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {language === 'en' 
                              ? 'Collaborate with others for better results'
                              : 'تعاون مع الآخرين لنتائج أفضل'}
                          </p>
                        </div>
                      </div>
                      <Badge variant={selectedType === 'group' ? 'default' : 'secondary'}>
                        {language === 'en' ? 'Recommended' : 'مُوصى'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Solo Option */}
                <Card 
                  className={`cursor-pointer transition-all ${
                    selectedType === 'solo' 
                      ? 'ring-2 ring-blue-500 bg-blue-50' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedType('solo')}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${selectedType === 'solo' ? 'bg-blue-500' : 'bg-gray-300'} rounded-full flex items-center justify-center`}>
                          <UserCheck className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            {language === 'en' ? 'Work Solo' : 'العمل منفرداً'}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {language === 'en' 
                              ? 'Direct access to suppliers/freelancers'
                              : 'وصول مباشر للموردين/المستقلين'}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">
                        {language === 'en' ? 'Individual' : 'فردي'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Start Button */}
                <Button 
                  onClick={handleStart}
                  disabled={!selectedType}
                  className="w-full mt-6"
                  size="lg"
                >
                  {language === 'en' ? 'Start Now' : 'ابدأ الآن'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                {!user && (
                  <p className="text-center text-sm text-gray-600 mt-4">
                    {language === 'en' 
                      ? 'You will be redirected to login/register first'
                      : 'ستتم إعادة توجيهك لتسجيل الدخول/التسجيل أولاً'}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-12">
              {language === 'en' ? 'Platform Statistics' : 'إحصائيات المنصة'}
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">5,000+</div>
                <div className="text-gray-600">{language === 'en' ? 'Active Members' : 'عضو نشط'}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">1,200+</div>
                <div className="text-gray-600">{language === 'en' ? 'Successful Groups' : 'مجموعة ناجحة'}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">$2.5M+</div>
                <div className="text-gray-600">{language === 'en' ? 'Total Savings' : 'إجمالي التوفيرات'}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">850+</div>
                <div className="text-gray-600">{language === 'en' ? 'Verified Suppliers' : 'مورد معتمد'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServiceLanding;
