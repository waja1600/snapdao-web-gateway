
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Users, Clock, DollarSign, Star, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Deal {
  id: string;
  title: string;
  description: string;
  targetPrice: number;
  currentPrice: number;
  minQuantity: number;
  currentQuantity: number;
  timeLeft: string;
  category: string;
  rating: number;
  supplier: string;
  image: string;
  savings: number;
}

const GroupBuying = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');

  const deals: Deal[] = [
    {
      id: '1',
      title: language === 'en' ? 'Premium Office Chairs (50 units)' : 'كراسي مكتب فاخرة (50 وحدة)',
      description: language === 'en' 
        ? 'Ergonomic office chairs with lumbar support and adjustable height'
        : 'كراسي مكتب مريحة مع دعم أسفل الظهر وارتفاع قابل للتعديل',
      targetPrice: 150,
      currentPrice: 200,
      minQuantity: 50,
      currentQuantity: 37,
      timeLeft: '3 days',
      category: 'Office Furniture',
      rating: 4.8,
      supplier: 'FurniCorp Ltd',
      image: '/placeholder.svg',
      savings: 25
    },
    {
      id: '2',
      title: language === 'en' ? 'Bulk Printing Services' : 'خدمات الطباعة بالجملة',
      description: language === 'en'
        ? 'High-quality business cards, brochures, and marketing materials'
        : 'بطاقات أعمال وكتيبات ومواد تسويقية عالية الجودة',
      targetPrice: 0.05,
      currentPrice: 0.12,
      minQuantity: 10000,
      currentQuantity: 8500,
      timeLeft: '5 days',
      category: 'Printing',
      rating: 4.6,
      supplier: 'PrintMaster Pro',
      image: '/placeholder.svg',
      savings: 58
    }
  ];

  const renderDealCard = (deal: Deal) => (
    <Card key={deal.id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg">{deal.title}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">{deal.description}</p>
          </div>
          <Badge variant="secondary">{deal.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600">
              {language === 'en' ? 'Current Price' : 'السعر الحالي'}
            </div>
            <div className="text-lg font-semibold">${deal.currentPrice}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">
              {language === 'en' ? 'Target Price' : 'السعر المستهدف'}
            </div>
            <div className="text-lg font-semibold text-green-600">${deal.targetPrice}</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{language === 'en' ? 'Progress' : 'التقدم'}</span>
            <span>{deal.currentQuantity}/{deal.minQuantity}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${(deal.currentQuantity / deal.minQuantity) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4 text-gray-500" />
            <span>{deal.timeLeft} {language === 'en' ? 'left' : 'متبقي'}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>{deal.rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Badge className="bg-green-100 text-green-800">
            {deal.savings}% {language === 'en' ? 'savings' : 'توفير'}
          </Badge>
          <span className="text-xs text-gray-500">{deal.supplier}</span>
        </div>

        <div className="flex space-x-2 pt-2">
          <Button 
            className="flex-1" 
            onClick={() => navigate(`/deals/${deal.id}`)}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Join Deal' : 'انضم للصفقة'}
          </Button>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4" />
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
              {language === 'en' ? 'Group Buying' : 'الشراء الجماعي'}
            </h1>
            <p className="text-gray-600 mt-2">
              {language === 'en' 
                ? 'Join group purchases to unlock better prices through collective buying power'
                : 'انضم إلى المشتريات الجماعية لفتح أسعار أفضل من خلال القوة الشرائية الجماعية'}
            </p>
          </div>
          <Button onClick={() => navigate('/create-deal')}>
            {language === 'en' ? 'Create New Deal' : 'إنشاء صفقة جديدة'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Active Deals' : 'الصفقات النشطة'}
                  </p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Total Members' : 'إجمالي الأعضاء'}
                  </p>
                  <p className="text-2xl font-bold">1,248</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Total Savings' : 'إجمالي التوفير'}
                  </p>
                  <p className="text-2xl font-bold">$156K</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-600" />
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
                  <p className="text-2xl font-bold">94%</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">
              {language === 'en' ? 'Active Deals' : 'الصفقات النشطة'}
            </TabsTrigger>
            <TabsTrigger value="ending-soon">
              {language === 'en' ? 'Ending Soon' : 'تنتهي قريباً'}
            </TabsTrigger>
            <TabsTrigger value="my-deals">
              {language === 'en' ? 'My Deals' : 'صفقاتي'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deals.map(renderDealCard)}
            </div>
          </TabsContent>
          
          <TabsContent value="ending-soon" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deals.filter(deal => deal.timeLeft.includes('day')).map(renderDealCard)}
            </div>
          </TabsContent>
          
          <TabsContent value="my-deals" className="space-y-6">
            <div className="text-center py-12">
              <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {language === 'en' ? 'No deals joined yet' : 'لم تنضم لأي صفقات بعد'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Join your first group buying deal to get started'
                  : 'انضم لأول صفقة شراء جماعي للبدء'}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default GroupBuying;
