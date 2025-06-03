
import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Users, Shield } from "lucide-react";

const AboutUs = () => {
  const { language } = useLanguage();
  
  const values = [
    {
      icon: Shield,
      title: language === 'en' ? 'Trust & Security' : 'الثقة والأمان',
      description: language === 'en' 
        ? 'We prioritize creating a secure environment for all transactions and interactions.'
        : 'نعطي الأولوية لإنشاء بيئة آمنة لجميع المعاملات والتفاعلات.'
    },
    {
      icon: Users,
      title: language === 'en' ? 'Collaboration' : 'التعاون',
      description: language === 'en' 
        ? 'We believe in the power of teamwork and collaborative decision-making.'
        : 'نؤمن بقوة العمل الجماعي واتخاذ القرارات التعاونية.'
    },
    {
      icon: BookOpen,
      title: language === 'en' ? 'Transparency' : 'الشفافية',
      description: language === 'en' 
        ? 'We provide clear visibility into all processes and transactions.'
        : 'نوفر رؤية واضحة لجميع العمليات والمعاملات.'
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">
          {language === 'en' ? 'About Us' : 'من نحن'}
        </h1>
        
        {/* Vision & Mission */}
        <div className="max-w-3xl mx-auto mb-16">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-4">
                {language === 'en' ? 'Our Vision' : 'رؤيتنا'}
              </h2>
              <p className="mb-6 text-gray-600">
                {language === 'en' 
                  ? 'To create a seamless ecosystem where companies, freelancers, and suppliers can collaborate efficiently and securely, revolutionizing how business partnerships are formed and maintained.'
                  : 'إنشاء نظام بيئي سلس حيث يمكن للشركات والمستقلين والموردين التعاون بكفاءة وأمان، مع إحداث ثورة في كيفية تكوين شراكات العمل والحفاظ عليها.'}
              </p>
              
              <Separator className="my-6" />
              
              <h2 className="text-xl font-bold mb-4">
                {language === 'en' ? 'Our Mission' : 'مهمتنا'}
              </h2>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'To provide a reliable platform that simplifies complex business processes, enables transparent governance, and fosters trust between all parties involved. We aim to empower businesses of all sizes to form effective partnerships and achieve their goals through collaborative efforts.'
                  : 'توفير منصة موثوقة تبسط عمليات الأعمال المعقدة، وتمكن الحوكمة الشفافة، وتعزز الثقة بين جميع الأطراف المعنية. نهدف إلى تمكين الشركات من جميع الأحجام من تكوين شراكات فعالة وتحقيق أهدافها من خلال الجهود التعاونية.'}
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Our Values */}
        <h2 className="text-2xl font-bold text-center mb-8">
          {language === 'en' ? 'Our Values' : 'قيمنا'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => (
            <Card key={index}>
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-medium mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Story */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">
            {language === 'en' ? 'Our Story' : 'قصتنا'}
          </h2>
          
          <Card>
            <CardContent className="pt-6">
              <p className="mb-4 text-gray-600">
                {language === 'en' 
                  ? 'ForGPO was founded in 2025 with a clear vision: to solve the complex challenges businesses face when collaborating with partners, freelancers, and suppliers. We recognized that traditional methods of business partnership often lacked transparency, efficiency, and proper governance structures.'
                  : 'تأسست ForGPO في عام 2025 برؤية واضحة: لحل التحديات المعقدة التي تواجهها الشركات عند التعاون مع الشركاء والمستقلين والموردين. أدركنا أن الطرق التقليدية للشراكة التجارية غالبًا ما كانت تفتقر إلى الشفافية والكفاءة وهياكل الحوكمة المناسبة.'}
              </p>
              
              <p className="mb-4 text-gray-600">
                {language === 'en' 
                  ? 'Our team of industry experts and technology innovators came together to develop a platform that addresses these pain points. By leveraging technology and smart contract principles, we created a system that ensures fairness, transparency, and efficiency for all parties involved.'
                  : 'اجتمع فريقنا من خبراء الصناعة ومبتكري التكنولوجيا لتطوير منصة تعالج نقاط الألم هذه. من خلال الاستفادة من التكنولوجيا ومبادئ العقود الذكية، قمنا بإنشاء نظام يضمن العدالة والشفافية والكفاءة لجميع الأطراف المعنية.'}
              </p>
              
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Today, ForGPO serves thousands of businesses, freelancers, and suppliers worldwide, facilitating seamless collaboration and helping organizations achieve their goals through strategic partnerships.'
                  : 'اليوم، تخدم ForGPO آلاف الشركات والمستقلين والموردين في جميع أنحاء العالم، مما يسهل التعاون السلس ويساعد المؤسسات على تحقيق أهدافها من خلال الشراكات الاستراتيجية.'}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
