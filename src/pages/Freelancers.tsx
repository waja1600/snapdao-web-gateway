import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { UserCheck, Star, MapPin, Clock, DollarSign, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Freelancer {
  id: string;
  name: string;
  title: string;
  description: string;
  location: string;
  rating: number;
  reviews: number;
  hourlyRate: number;
  availability: 'available' | 'busy' | 'unavailable';
  skills: string[];
  experience: string;
  completedProjects: number;
  responseTime: string;
  languages: string[];
}

const Freelancers = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const freelancers: Freelancer[] = [
    {
      id: '1',
      name: 'Ahmed Hassan',
      title: language === 'en' ? 'Full Stack Developer' : 'مطور تطبيقات شامل',
      description: language === 'en' 
        ? 'Experienced developer specializing in React, Node.js, and cloud solutions'
        : 'مطور خبير متخصص متخصص في React و Node.js والحلول السحابية',
      location: 'Cairo, Egypt',
      rating: 4.9,
      reviews: 87,
      hourlyRate: 35,
      availability: 'available',
      skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
      experience: '5+ years',
      completedProjects: 124,
      responseTime: '< 1 hour',
      languages: ['Arabic', 'English']
    },
    {
      id: '2',
      name: 'Sarah Al-Mansoori',
      title: language === 'en' ? 'UI/UX Designer' : 'مصممة واجهات المستخدم',
      description: language === 'en'
        ? 'Creative designer with expertise in mobile and web design'
        : 'مصممة مبدعة مع خبرة في تصميم التطبيقات المحمولة والمواقع',
      location: 'Dubai, UAE',
      rating: 4.8,
      reviews: 65,
      hourlyRate: 40,
      availability: 'available',
      skills: ['Figma', 'Adobe Creative Suite', 'Prototyping'],
      experience: '4+ years',
      completedProjects: 89,
      responseTime: '< 2 hours',
      languages: ['Arabic', 'English', 'French']
    }
  ];

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'unavailable': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'available': return language === 'en' ? 'Available' : 'متاح';
      case 'busy': return language === 'en' ? 'Busy' : 'مشغول';
      case 'unavailable': return language === 'en' ? 'Unavailable' : 'غير متاح';
      default: return availability;
    }
  };

  const renderFreelancerCard = (freelancer: Freelancer) => (
    <Card key={freelancer.id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <CardTitle className="text-lg">{freelancer.name}</CardTitle>
              <Badge className={getAvailabilityColor(freelancer.availability)}>
                {getAvailabilityText(freelancer.availability)}
              </Badge>
            </div>
            <p className="text-blue-600 font-medium">{freelancer.title}</p>
            <p className="text-sm text-gray-600 mt-1">{freelancer.description}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="font-medium">{freelancer.rating}</span>
              <span className="text-gray-500">({freelancer.reviews})</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-500">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{freelancer.location}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-green-600">${freelancer.hourlyRate}/hr</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-gray-600">{language === 'en' ? 'Experience' : 'الخبرة'}</div>
            <div className="font-semibold">{freelancer.experience}</div>
          </div>
          <div>
            <div className="text-gray-600">{language === 'en' ? 'Projects' : 'المشاريع'}</div>
            <div className="font-semibold">{freelancer.completedProjects}</div>
          </div>
          <div>
            <div className="text-gray-600">{language === 'en' ? 'Response' : 'الاستجابة'}</div>
            <div className="font-semibold">{freelancer.responseTime}</div>
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-600 mb-2">
            {language === 'en' ? 'Skills' : 'المهارات'}
          </div>
          <div className="flex flex-wrap gap-1">
            {freelancer.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-600 mb-2">
            {language === 'en' ? 'Languages' : 'اللغات'}
          </div>
          <div className="flex flex-wrap gap-1">
            {freelancer.languages.map((lang, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {lang}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex space-x-2 pt-2">
          <Button 
            className="flex-1" 
            onClick={() => navigate(`/freelancers/${freelancer.id}/hire`)}
          >
            <UserCheck className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Hire Now' : 'توظيف الآن'}
          </Button>
          <Button variant="outline" onClick={() => navigate(`/freelancers/${freelancer.id}`)}>
            {language === 'en' ? 'View Profile' : 'عرض الملف'}
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
              {language === 'en' ? 'Freelancers' : 'المستقلون'}
            </h1>
            <p className="text-gray-600 mt-2">
              {language === 'en' 
                ? 'Find skilled freelancers for your projects'
                : 'ابحث عن مستقلين مهرة لمشاريعك'}
            </p>
          </div>
          <Button onClick={() => navigate('/become-freelancer')}>
            {language === 'en' ? 'Become a Freelancer' : 'كن مستقل'}
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder={language === 'en' ? 'Search freelancers...' : 'البحث عن المستقلين...'}
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
                    {language === 'en' ? 'Active Freelancers' : 'المستقلون النشطون'}
                  </p>
                  <p className="text-2xl font-bold">2,847</p>
                </div>
                <UserCheck className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Available Now' : 'متاح الآن'}
                  </p>
                  <p className="text-2xl font-bold">1,234</p>
                </div>
                <Clock className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Avg Rate' : 'متوسط السعر'}
                  </p>
                  <p className="text-2xl font-bold">$42/hr</p>
                </div>
                <DollarSign className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Top Rated' : 'الأعلى تقييم'}
                  </p>
                  <p className="text-2xl font-bold">567</p>
                </div>
                <Award className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              {language === 'en' ? 'All Freelancers' : 'جميع المستقلين'}
            </TabsTrigger>
            <TabsTrigger value="available">
              {language === 'en' ? 'Available' : 'متاح'}
            </TabsTrigger>
            <TabsTrigger value="top-rated">
              {language === 'en' ? 'Top Rated' : 'الأعلى تقييم'}
            </TabsTrigger>
            <TabsTrigger value="my-hires">
              {language === 'en' ? 'My Hires' : 'توظيفاتي'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {freelancers.map(renderFreelancerCard)}
            </div>
          </TabsContent>
          
          <TabsContent value="available" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {freelancers.filter(f => f.availability === 'available').map(renderFreelancerCard)}
            </div>
          </TabsContent>
          
          <TabsContent value="top-rated" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {freelancers.sort((a, b) => b.rating - a.rating).slice(0, 6).map(renderFreelancerCard)}
            </div>
          </TabsContent>
          
          <TabsContent value="my-hires" className="space-y-6">
            <div className="text-center py-12">
              <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {language === 'en' ? 'No freelancers hired yet' : 'لم يتم توظيف أي مستقلين بعد'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Hire freelancers to see them listed here'
                  : 'وظف مستقلين لرؤيتهم مدرجين هنا'}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Freelancers;
