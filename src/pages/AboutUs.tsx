
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Target, Eye, Heart } from "lucide-react";

const AboutUs = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen bg-gray-50 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Button variant="ghost" onClick={() => navigate('/')} className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Back to Home' : 'العودة للرئيسية'}
          </Button>
          <h1 className="text-2xl font-bold text-blue-600">GPOsaas</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">
            {language === 'en' ? 'About Us' : 'من نحن'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'en'
              ? 'We are revolutionizing the way businesses, suppliers, and freelancers collaborate through smart contracting and group procurement.'
              : 'نحن نقوم بثورة في طريقة تعاون الشركات والموردين والمستقلين من خلال التعاقد الذكي والمشتريات الجماعية.'
            }
          </p>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle>{language === 'en' ? 'Our Mission' : 'رسالتنا'}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {language === 'en'
                  ? 'To democratize group procurement and create transparent, efficient marketplaces where every participant benefits from collective bargaining power.'
                  : 'إضفاء الطابع الديمقراطي على المشتريات الجماعية وإنشاء أسواق شفافة وفعالة يستفيد فيها كل مشارك من القوة التفاوضية الجماعية.'
                }
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle>{language === 'en' ? 'Our Vision' : 'رؤيتنا'}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {language === 'en'
                  ? 'To become the leading platform connecting businesses globally, fostering collaboration, and driving economic growth through innovative procurement solutions.'
                  : 'أن نصبح المنصة الرائدة التي تربط الشركات عالمياً، وتعزز التعاون، وتدفع النمو الاقتصادي من خلال حلول المشتريات المبتكرة.'
                }
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle>{language === 'en' ? 'Our Values' : 'قيمنا'}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {language === 'en'
                  ? 'Transparency, collaboration, innovation, and mutual benefit. We believe in building lasting relationships based on trust and shared success.'
                  : 'الشفافية والتعاون والابتكار والمنفعة المتبادلة. نؤمن ببناء علاقات دائمة قائمة على الثقة والنجاح المشترك.'
                }
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Our Story */}
        <div className="bg-white rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">
            {language === 'en' ? 'Our Story' : 'قصتنا'}
          </h2>
          <div className="prose max-w-none">
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {language === 'en'
                ? 'GPOsaas was born from the vision of making group procurement accessible, transparent, and beneficial for all participants. We recognized that businesses, regardless of their size, could achieve better deals and build stronger relationships through collaborative purchasing and smart contracting.'
                : 'ولدت GPOsaas من رؤية جعل المشتريات الجماعية في متناول الجميع وشفافة ومفيدة لجميع المشاركين. لقد أدركنا أن الشركات، بغض النظر عن حجمها، يمكن أن تحقق صفقات أفضل وتبني علاقات أقوى من خلال الشراء التعاوني والتعاقد الذكي.'
              }
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              {language === 'en'
                ? 'Today, we continue to evolve our platform, integrating cutting-edge technology with human-centered design to create meaningful connections between buyers, suppliers, and freelancers across the globe.'
                : 'اليوم، نواصل تطوير منصتنا، ودمج التكنولوجيا المتطورة مع التصميم المحوري البشري لإنشاء اتصالات ذات مغزى بين المشترين والموردين والمستقلين في جميع أنحاء العالم.'
              }
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            {language === 'en' ? 'Ready to Join Us?' : 'هل أنت مستعد للانضمام إلينا؟'}
          </h2>
          <p className="text-gray-600 mb-8">
            {language === 'en'
              ? 'Start your journey with GPOsaas and experience the power of collaborative procurement.'
              : 'ابدأ رحلتك مع GPOsaas واختبر قوة المشتريات التعاونية.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/login')}>
              {language === 'en' ? 'Get Started' : 'ابدأ الآن'}
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/contact')}>
              {language === 'en' ? 'Contact Us' : 'اتصل بنا'}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;
