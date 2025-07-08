
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Users, DollarSign, Target, Calendar, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface InvestmentGroup {
  id: string;
  title: string;
  description: string;
  minInvestment: number;
  currentFunding: number;
  targetAmount: number;
  investors: number;
  maxInvestors: number;
  riskLevel: 'low' | 'medium' | 'high';
  expectedReturn: string;
  duration: string;
  category: string;
  status: 'forming' | 'active' | 'completed';
}

const InvestmentGroups = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');

  const investmentGroups: InvestmentGroup[] = [
    {
      id: '1',
      title: language === 'en' ? 'Tech Startup Fund' : 'صندوق الشركات التقنية الناشئة',
      description: language === 'en' 
        ? 'Collective investment in promising technology startups with high growth potential'
        : 'استثمار جماعي في الشركات التقنية الناشئة الواعدة ذات إمكانات النمو العالية',
      minInvestment: 5000,
      currentFunding: 125000,
      targetAmount: 200000,
      investors: 25,
      maxInvestors: 40,
      riskLevel: 'high',
      expectedReturn: '15-25%',
      duration: '3-5 years',
      category: 'Technology',
      status: 'active'
    },
    {
      id: '2',
      title: language === 'en' ? 'Real Estate Portfolio' : 'محفظة العقارات',
      description: language === 'en'
        ? 'Diversified real estate investment across commercial and residential properties'
        : 'استثمار عقاري متنوع عبر العقارات التجارية والسكنية',
      minInvestment: 10000,
      currentFunding: 180000,
      targetAmount: 500000,
      investors: 18,
      maxInvestors: 50,
      riskLevel: 'medium',
      expectedReturn: '8-12%',
      duration: '5-7 years',
      category: 'Real Estate',
      status: 'forming'
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'forming': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'forming': return language === 'en' ? 'Forming' : 'قيد التكوين';
      case 'active': return language === 'en' ? 'Active' : 'نشط';
      case 'completed': return language === 'en' ? 'Completed' : 'مكتمل';
      default: return status;
    }
  };

  const getRiskText = (risk: string) => {
    switch (risk) {
      case 'low': return language === 'en' ? 'Low Risk' : 'مخاطر منخفضة';
      case 'medium': return language === 'en' ? 'Medium Risk' : 'مخاطر متوسطة';
      case 'high': return language === 'en' ? 'High Risk' : 'مخاطر عالية';
      default: return risk;
    }
  };

  const renderInvestmentCard = (group: InvestmentGroup) => (
    <Card key={group.id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg">{group.title}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">{group.description}</p>
          </div>
          <div className="flex flex-col space-y-2">
            <Badge className={getStatusColor(group.status)}>
              {getStatusText(group.status)}
            </Badge>
            <Badge className={getRiskColor(group.riskLevel)}>
              {getRiskText(group.riskLevel)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600">
              {language === 'en' ? 'Min Investment' : 'الحد الأدنى للاستثمار'}
            </div>
            <div className="text-lg font-semibold">${group.minInvestment.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">
              {language === 'en' ? 'Expected Return' : 'العائد المتوقع'}
            </div>
            <div className="text-lg font-semibold text-green-600">{group.expectedReturn}</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{language === 'en' ? 'Funding Progress' : 'تقدم التمويل'}</span>
            <span>${group.currentFunding.toLocaleString()} / ${group.targetAmount.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${(group.currentFunding / group.targetAmount) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4 text-gray-500" />
            <span>{group.investors}/{group.maxInvestors}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span>{group.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Target className="h-4 w-4 text-gray-500" />
            <span>{group.category}</span>
          </div>
        </div>

        <div className="flex space-x-2 pt-2">
          <Button 
            className="flex-1" 
            onClick={() => navigate(`/investment-groups/${group.id}`)}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Invest Now' : 'استثمر الآن'}
          </Button>
          <Button variant="outline" onClick={() => navigate(`/investment-groups/${group.id}/details`)}>
            {language === 'en' ? 'Details' : 'التفاصيل'}
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
              {language === 'en' ? 'Investment Groups' : 'مجموعات الاستثمار'}
            </h1>
            <p className="text-gray-600 mt-2">
              {language === 'en' 
                ? 'Join collective investment opportunities with shared risks and returns'
                : 'انضم إلى فرص الاستثمار الجماعي مع تقاسم المخاطر والعوائد'}
            </p>
          </div>
          <Button onClick={() => navigate('/create-investment-group')}>
            {language === 'en' ? 'Create Investment Group' : 'إنشاء مجموعة استثمار'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Active Groups' : 'المجموعات النشطة'}
                  </p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Total Investments' : 'إجمالي الاستثمارات'}
                  </p>
                  <p className="text-2xl font-bold">$2.8M</p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Investors' : 'المستثمرون'}
                  </p>
                  <p className="text-2xl font-bold">342</p>
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
                    {language === 'en' ? 'Avg Return' : 'متوسط العائد'}
                  </p>
                  <p className="text-2xl font-bold">12.5%</p>
                </div>
                <Target className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">
              {language === 'en' ? 'Active Groups' : 'المجموعات النشطة'}
            </TabsTrigger>
            <TabsTrigger value="forming">
              {language === 'en' ? 'Forming' : 'قيد التكوين'}
            </TabsTrigger>
            <TabsTrigger value="my-investments">
              {language === 'en' ? 'My Investments' : 'استثماراتي'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {investmentGroups.filter(g => g.status === 'active').map(renderInvestmentCard)}
            </div>
          </TabsContent>
          
          <TabsContent value="forming" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {investmentGroups.filter(g => g.status === 'forming').map(renderInvestmentCard)}
            </div>
          </TabsContent>
          
          <TabsContent value="my-investments" className="space-y-6">
            <div className="text-center py-12">
              <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {language === 'en' ? 'No investments yet' : 'لا توجد استثمارات بعد'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Start investing in groups to see your portfolio here'
                  : 'ابدأ الاستثمار في المجموعات لرؤية محفظتك هنا'}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default InvestmentGroups;
