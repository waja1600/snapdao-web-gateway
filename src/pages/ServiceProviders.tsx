import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Briefcase, Star, MapPin, Clock, Users, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ServiceProvider {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  rating: number;
  reviews: number;
  services: string[];
  teamSize: string;
  experience: string;
  availability: string;
  priceRange: string;
  verified: boolean;
}

const ServiceProviders = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const serviceProviders: ServiceProvider[] = [
    {
      id: '1',
      name: language === 'en' ? 'Digital Marketing Agency' : 'وكالة التسويق الرقمي',
      description: language === 'en' 
        ? 'Full-service digital marketing agency specializing in SEO, social media, and content marketing'
        : 'وكالة تسويق رقمي شاملة متخصصة في تحسين محركات البحث ووسائل التواصل الاجتماعي وتسويق المحتوى',
      category: 'Marketing',
      location: 'Dubai, UAE',
      rating: 4.7,
      reviews: 156,
      services: ['SEO', 'Social Media', 'Content Marketing', 'PPC'],
      teamSize: '15-20',
      experience: '8+ years',
      availability: 'Available',
      priceRange: '$2,000 - $10,000',
      verified: true
    },
    {
      id: '2',
      name: language === 'en' ? 'Legal Consulting Firm' : 'شركة الاستشارات القانونية',
      description: language === 'en'
        ? 'Professional legal services for businesses including contracts, compliance, and dispute resolution'
        : 'خدمات قانونية مهنية للشركات تشمل العقود والامتثال وحل النزاعات',
      category: 'Legal',
      location: 'Riyadh, KSA',
      rating: 4.9,
      reviews: 89,
      services: ['Contract Law', 'Compliance', 'Dispute Resolution', 'Corporate Law'],
      teamSize: '10-15',
      experience: '12+ years',
      availability: 'Limited',
      priceRange: '$150 - $500/hour',
      verified: true
    }
  ];

  const renderServiceProviderCard = (provider: ServiceProvider) => (
    <Card key={provider.id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <CardTitle className="text-lg">{provider.name}</CardTitle>
              {provider.verified && (
                <Badge className="bg-blue-100 text-blue-800">
                  {language === 'en' ? 'Verified' : 'موثق'}
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1">{provider.description}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="font-medium">{provider.rating}</span>
              <span className="text-gray-500">({provider.reviews})</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-500">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{provider.location}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-600">{language === 'en' ? 'Team Size' : 'حجم الفريق'}</div>
            <div className="font-semibold flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {provider.teamSize}
            </div>
          </div>
          <div>
            <div className="text-gray-600">{language === 'en' ? 'Experience' : 'الخبرة'}</div>
            <div className="font-semibold">{provider.experience}</div>
          </div>
          <div>
            <div className="text-gray-600">{language === 'en' ? 'Availability' : 'التوفر'}</div>
            <div className="font-semibold flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {provider.availability}
            </div>
          </div>
          <div>
            <div className="text-gray-600">{language === 'en' ? 'Price Range' : 'نطاق السعر'}</div>
            <div className="font-semibold text-green-600">{provider.priceRange}</div>
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-600 mb-2">
            {language === 'en' ? 'Services' : 'الخدمات'}
          </div>
          <div className="flex flex-wrap gap-1">
            {provider.services.map((service, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {service}
              </Badge>
            ))}
          </div>
        </div>

        <Badge variant="outline" className="w-fit">
          {provider.category}
        </Badge>

        <div className="flex space-x-2 pt-2">
          <Button 
            className="flex-1" 
            onClick={() => navigate(`/service-providers/${provider.id}/contact`)}
          >
            <Briefcase className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Get Quote' : 'طلب عرض سعر'}
          </Button>
          <Button variant="outline" onClick={() => navigate(`/service-providers/${provider.id}`)}>
            {language === 'en' ? 'View Details' : 'عرض التفاصيل'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">
              {language === 'en' ? 'Service Providers' : 'مقدمو الخدمات'}
            </h1>
            <p className="text-gray-600 mt-2">
              {language === 'en' 
                ? 'Find professional service providers for your business needs'
                : 'ابحث عن مقدمي خدمات محترفين لاحتياجات عملك'}
            </p>
          </div>
          <Button onClick={() => navigate('/become-service-provider')}>
            {language === 'en' ? 'Become a Provider' : 'كن مقدم خدمة'}
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder={language === 'en' ? 'Search service providers...' : 'البحث عن مقدمي الخدمات...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Total Providers' : 'إجمالي المقدمين'}
                  </p>
                  <p className="text-2xl font-bold">847</p>
                </div>
                <Briefcase className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Categories' : 'الفئات'}
                  </p>
                  <p className="text-2xl font-bold">18</p>
                </div>
                <Settings className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Verified' : 'موثق'}
                  </p>
                  <p className="text-2xl font-bold">623</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Avg Rating' : 'متوسط التقييم'}
                  </p>
                  <p className="text-2xl font-bold">4.7</p>
                </div>
                <Star className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              {language === 'en' ? 'All Providers' : 'جميع المقدمين'}
            </TabsTrigger>
            <TabsTrigger value="verified">
              {language === 'en' ? 'Verified' : 'موثق'}
            </TabsTrigger>
            <TabsTrigger value="available">
              {language === 'en' ? 'Available' : 'متاح'}
            </TabsTrigger>
            <TabsTrigger value="my-requests">
              {language === 'en' ? 'My Requests' : 'طلباتي'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceProviders.map(renderServiceProviderCard)}
            </div>
          </TabsContent>
          
          <TabsContent value="verified" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceProviders.filter(p => p.verified).map(renderServiceProviderCard)}
            </div>
          </TabsContent>

          <TabsContent value="available" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceProviders.filter(p => p.availability.toLowerCase() === 'available').map(renderServiceProviderCard)}
            </div>
          </TabsContent>

          <TabsContent value="my-requests" className="text-center py-12">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {language === 'en' ? 'No requests made yet' : 'لم يتم تقديم طلبات بعد'}
            </h3>
            <p className="text-gray-600">
              {language === 'en' 
                ? 'Your service requests will appear here'
                : 'ستظهر طلبات الخدمات الخاصة بك هنا'}
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ServiceProviders;
