
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, FileText, Shield, Globe, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface IncorporationService {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  jurisdiction: string;
  features: string[];
  status: 'available' | 'popular' | 'premium';
  processingTime: string;
  includesLegalSupport: boolean;
}

const CompanyIncorporation = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('services');

  const services: IncorporationService[] = [
    {
      id: '1',
      title: language === 'en' ? 'Basic LLC Formation' : 'تأسيس شركة ذات مسؤولية محدودة أساسي',
      description: language === 'en' 
        ? 'Complete LLC formation with basic documentation and state filing'
        : 'تأسيس شركة ذات مسؤولية محدودة كامل مع الوثائق الأساسية والتسجيل الحكومي',
      price: 299,
      duration: '5-7 business days',
      jurisdiction: 'Delaware, USA',
      features: [
        language === 'en' ? 'Articles of Organization' : 'عقد التأسيس',
        language === 'en' ? 'State filing' : 'التسجيل الحكومي',
        language === 'en' ? 'EIN number' : 'رقم الهوية الضريبية',
        language === 'en' ? 'Basic operating agreement' : 'اتفاقية التشغيل الأساسية'
      ],
      status: 'popular',
      processingTime: '5-7 days',
      includesLegalSupport: false
    },
    {
      id: '2',
      title: language === 'en' ? 'Corporation Formation' : 'تأسيس شركة مساهمة',
      description: language === 'en'
        ? 'Full corporation setup with comprehensive legal documentation'
        : 'إعداد شركة مساهمة كامل مع وثائق قانونية شاملة',
      price: 599,
      duration: '7-10 business days',
      jurisdiction: 'Delaware, USA',
      features: [
        language === 'en' ? 'Articles of Incorporation' : 'عقد التأسيس',
        language === 'en' ? 'Corporate bylaws' : 'اللوائح الداخلية',
        language === 'en' ? 'Stock certificates' : 'شهادات الأسهم',
        language === 'en' ? 'Corporate seal' : 'الختم الرسمي',
        language === 'en' ? 'Board resolutions' : 'قرارات مجلس الإدارة'
      ],
      status: 'available',
      processingTime: '7-10 days',
      includesLegalSupport: true
    },
    {
      id: '3',
      title: language === 'en' ? 'International Entity Formation' : 'تأسيس كيان دولي',
      description: language === 'en'
        ? 'Multi-jurisdiction company formation with international compliance'
        : 'تأسيس شركة متعددة الولايات القضائية مع الامتثال الدولي',
      price: 1299,
      duration: '10-15 business days',
      jurisdiction: 'Multiple',
      features: [
        language === 'en' ? 'Multi-jurisdiction filing' : 'التسجيل متعدد الولايات',
        language === 'en' ? 'International compliance' : 'الامتثال الدولي',
        language === 'en' ? 'Tax optimization' : 'تحسين الضرائب',
        language === 'en' ? 'Legal consultation' : 'استشارة قانونية',
        language === 'en' ? 'Ongoing support' : 'الدعم المستمر'
      ],
      status: 'premium',
      processingTime: '10-15 days',
      includesLegalSupport: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'popular': return 'bg-blue-100 text-blue-800';
      case 'premium': return 'bg-purple-100 text-purple-800';
      case 'available': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'popular': return language === 'en' ? 'Most Popular' : 'الأكثر شعبية';
      case 'premium': return language === 'en' ? 'Premium' : 'مميز';
      case 'available': return language === 'en' ? 'Available' : 'متاح';
      default: return status;
    }
  };

  const renderServiceCard = (service: IncorporationService) => (
    <Card key={service.id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg">{service.title}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">{service.description}</p>
          </div>
          <Badge className={getStatusColor(service.status)}>
            {getStatusText(service.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-3xl font-bold">${service.price}</div>
          <div className="text-right text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{service.processingTime}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">
            {language === 'en' ? 'Jurisdiction:' : 'الولاية القضائية:'}
          </div>
          <Badge variant="secondary">{service.jurisdiction}</Badge>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">
            {language === 'en' ? 'Includes:' : 'يشمل:'}
          </div>
          <ul className="text-sm text-gray-600 space-y-1">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {service.includesLegalSupport && (
          <div className="flex items-center space-x-2 text-sm text-blue-600">
            <Shield className="h-4 w-4" />
            <span>{language === 'en' ? 'Legal support included' : 'الدعم القانوني مشمول'}</span>
          </div>
        )}

        <Button 
          className="w-full" 
          onClick={() => navigate(`/incorporation/apply/${service.id}`)}
        >
          <Building className="h-4 w-4 mr-2" />
          {language === 'en' ? 'Start Formation' : 'بدء التأسيس'}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">
              {language === 'en' ? 'Company Incorporation' : 'تأسيس الشركات'}
            </h1>
            <p className="text-gray-600 mt-2">
              {language === 'en' 
                ? 'Streamlined company formation with legal support and compliance management'
                : 'تأسيس الشركات المبسط مع الدعم القانوني وإدارة الامتثال'}
            </p>
          </div>
          <Button onClick={() => navigate('/incorporation/consultation')}>
            {language === 'en' ? 'Free Consultation' : 'استشارة مجانية'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Companies Formed' : 'الشركات المؤسسة'}
                  </p>
                  <p className="text-2xl font-bold">532</p>
                </div>
                <Building className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Jurisdictions' : 'الولايات القضائية'}
                  </p>
                  <p className="text-2xl font-bold">15</p>
                </div>
                <Globe className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Avg. Processing' : 'متوسط المعالجة'}
                  </p>
                  <p className="text-2xl font-bold">7 days</p>
                </div>
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Success Rate' : 'معدل النجاح'}
                  </p>
                  <p className="text-2xl font-bold">99%</p>
                </div>
                <CheckCircle className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="services">
              {language === 'en' ? 'Formation Services' : 'خدمات التأسيس'}
            </TabsTrigger>
            <TabsTrigger value="tracking">
              {language === 'en' ? 'Track Application' : 'تتبع الطلب'}
            </TabsTrigger>
            <TabsTrigger value="compliance">
              {language === 'en' ? 'Compliance Center' : 'مركز الامتثال'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="services" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map(renderServiceCard)}
            </div>
          </TabsContent>
          
          <TabsContent value="tracking" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'en' ? 'Application Status' : 'حالة الطلب'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {language === 'en' ? 'No applications submitted' : 'لم يتم تقديم طلبات'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'en' 
                      ? 'Start your company formation process to track progress here'
                      : 'ابدأ عملية تأسيس شركتك لتتبع التقدم هنا'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'en' ? 'Compliance Dashboard' : 'لوحة الامتثال'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {language === 'en' ? 'No companies to monitor' : 'لا توجد شركات للمراقبة'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'en' 
                      ? 'Once you form a company, compliance tracking will appear here'
                      : 'بمجرد تأسيس شركة، سيظهر تتبع الامتثال هنا'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CompanyIncorporation;
