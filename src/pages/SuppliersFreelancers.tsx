
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Users, Star, MapPin, Briefcase, Search, Filter, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Provider {
  id: string;
  name: string;
  type: 'supplier' | 'freelancer';
  title: string;
  description: string;
  rating: number;
  reviews: number;
  location: string;
  hourlyRate?: number;
  minOrder?: number;
  skills: string[];
  verified: boolean;
  avatar: string;
  completedProjects: number;
  responseTime: string;
}

const SuppliersFreelancers = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const providers: Provider[] = [
    {
      id: '1',
      name: 'TechSupply Co.',
      type: 'supplier',
      title: language === 'en' ? 'Premium Electronics Supplier' : 'مورد إلكترونيات متميز',
      description: language === 'en' 
        ? 'High-quality electronic components and devices with competitive pricing'
        : 'مكونات وأجهزة إلكترونية عالية الجودة بأسعار تنافسية',
      rating: 4.8,
      reviews: 156,
      location: 'Shenzhen, China',
      minOrder: 1000,
      skills: ['Electronics', 'Components', 'Manufacturing'],
      verified: true,
      avatar: '/placeholder.svg',
      completedProjects: 89,
      responseTime: '< 2 hours'
    },
    {
      id: '2',
      name: 'Sarah Ahmed',
      type: 'freelancer',
      title: language === 'en' ? 'Full-Stack Developer' : 'مطور برمجيات متكامل',
      description: language === 'en'
        ? 'Experienced React & Node.js developer with 5+ years in web development'
        : 'مطور React و Node.js خبير مع أكثر من 5 سنوات في تطوير الويب',
      rating: 4.9,
      reviews: 73,
      location: 'Dubai, UAE',
      hourlyRate: 45,
      skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
      verified: true,
      avatar: '/placeholder.svg',
      completedProjects: 45,
      responseTime: '< 1 hour'
    },
    {
      id: '3',
      name: 'Ahmed Manufacturing',
      type: 'supplier',
      title: language === 'en' ? 'Textile & Apparel Supplier' : 'مورد منسوجات وملابس',
      description: language === 'en'
        ? 'High-quality textile products and custom apparel manufacturing'
        : 'منتجات نسيجية عالية الجودة وتصنيع ملابس مخصصة',
      rating: 4.6,
      reviews: 298,
      location: 'Istanbul, Turkey',
      minOrder: 500,
      skills: ['Textiles', 'Apparel', 'Custom Manufacturing'],
      verified: true,
      avatar: '/placeholder.svg',
      completedProjects: 134,
      responseTime: '< 4 hours'
    },
    {
      id: '4',
      name: 'Maria Rodriguez',
      type: 'freelancer',
      title: language === 'en' ? 'UI/UX Designer' : 'مصمم واجهات المستخدم',
      description: language === 'en'
        ? 'Creative designer specializing in user experience and interface design'
        : 'مصمم مبدع متخصص في تجربة المستخدم وتصميم الواجهات',
      rating: 4.7,
      reviews: 89,
      location: 'Barcelona, Spain',
      hourlyRate: 38,
      skills: ['UI Design', 'UX Research', 'Figma', 'Prototyping'],
      verified: true,
      avatar: '/placeholder.svg',
      completedProjects: 67,
      responseTime: '< 3 hours'
    }
  ];

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && provider.type === activeTab;
  });

  const renderProviderCard = (provider: Provider) => (
    <Card key={provider.id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-lg font-semibold">{provider.name[0]}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{provider.name}</CardTitle>
              {provider.verified && (
                <Badge className="bg-blue-100 text-blue-800">
                  {language === 'en' ? 'Verified' : 'موثق'}
                </Badge>
              )}
            </div>
            <p className="text-sm font-medium text-blue-600">{provider.title}</p>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{provider.rating}</span>
                <span className="text-sm text-gray-500">({provider.reviews})</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <MapPin className="h-4 w-4" />
                <span>{provider.location}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">{provider.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {provider.skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">
              {language === 'en' ? 'Projects:' : 'المشاريع:'}
            </span>
            <span className="font-medium ml-1">{provider.completedProjects}</span>
          </div>
          <div>
            <span className="text-gray-600">
              {language === 'en' ? 'Response:' : 'الاستجابة:'}
            </span>
            <span className="font-medium ml-1">{provider.responseTime}</span>
          </div>
        </div>

        {provider.type === 'freelancer' && provider.hourlyRate && (
          <div className="text-lg font-semibold">
            ${provider.hourlyRate}/hr
          </div>
        )}

        {provider.type === 'supplier' && provider.minOrder && (
          <div className="text-sm text-gray-600">
            {language === 'en' ? 'Min. Order:' : 'الحد الأدنى للطلب:'} ${provider.minOrder}
          </div>
        )}

        <div className="flex space-x-2 pt-2">
          <Button 
            className="flex-1" 
            onClick={() => navigate(`/profile/${provider.id}`)}
          >
            <Briefcase className="h-4 w-4 mr-2" />
            {language === 'en' ? 'View Profile' : 'عرض الملف'}
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquare className="h-4 w-4" />
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
              {language === 'en' ? 'Suppliers & Freelancers' : 'الموردون والمستقلون'}
            </h1>
            <p className="text-gray-600 mt-2">
              {language === 'en' 
                ? 'Connect with verified suppliers and skilled freelancers for all your business needs'
                : 'تواصل مع موردين موثقين ومستقلين مهرة لجميع احتياجات عملك'}
            </p>
          </div>
          <Button onClick={() => navigate('/join-network')}>
            {language === 'en' ? 'Join Network' : 'انضم للشبكة'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Total Providers' : 'إجمالي المقدمين'}
                  </p>
                  <p className="text-2xl font-bold">2,156</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Verified Suppliers' : 'الموردون الموثقون'}
                  </p>
                  <p className="text-2xl font-bold">847</p>
                </div>
                <Briefcase className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Active Freelancers' : 'المستقلون النشطون'}
                  </p>
                  <p className="text-2xl font-bold">1,309</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Avg. Rating' : 'متوسط التقييم'}
                  </p>
                  <p className="text-2xl font-bold">4.7</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder={language === 'en' ? 'Search providers by name, skills, or category...' : 'البحث عن المقدمين بالاسم أو المهارات أو الفئة...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Filters' : 'المرشحات'}
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">
              {language === 'en' ? 'All Providers' : 'جميع المقدمين'}
            </TabsTrigger>
            <TabsTrigger value="supplier">
              {language === 'en' ? 'Suppliers' : 'الموردون'}
            </TabsTrigger>
            <TabsTrigger value="freelancer">
              {language === 'en' ? 'Freelancers' : 'المستقلون'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProviders.map(renderProviderCard)}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SuppliersFreelancers;
