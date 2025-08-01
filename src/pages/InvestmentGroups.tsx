
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Users, DollarSign, Target, Calendar, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { InvestmentGroupRoom } from '@/components/investment/InvestmentGroupRoom';

interface InvestmentGroup {
  id: string;
  name: string;
  description: string;
  target_amount: number;
  current_amount: number;
  min_investment: number;
  max_investors: number;
  current_investors: number;
  risk_level: 'low' | 'medium' | 'high';
  expected_return: string;
  duration: string;
  category: string;
  status: string;
  creator_id: string;
  created_at: string;
}

const InvestmentGroups = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');
  const [investmentGroups, setInvestmentGroups] = useState<InvestmentGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  useEffect(() => {
    fetchInvestmentGroups();
  }, []);

  const fetchInvestmentGroups = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('investment_groups')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInvestmentGroups(data || []);
    } catch (error) {
      console.error('Error fetching investment groups:', error);
      toast.error(language === 'ar' ? 'فشل في تحميل مجموعات الاستثمار' : 'Failed to load investment groups');
    } finally {
      setLoading(false);
    }
  };

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
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'forming': return language === 'en' ? 'Forming' : 'قيد التكوين';
      case 'active': return language === 'en' ? 'Active' : 'نشط';
      case 'completed': return language === 'en' ? 'Completed' : 'مكتمل';
      case 'cancelled': return language === 'en' ? 'Cancelled' : 'ملغى';
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

  // If a specific group is selected, show the group room
  if (selectedGroupId) {
    return (
      <Layout>
        <div className="space-y-4">
          <Button variant="outline" onClick={() => setSelectedGroupId(null)}>
            ← {language === 'ar' ? 'العودة للقائمة' : 'Back to List'}
          </Button>
          <InvestmentGroupRoom groupId={selectedGroupId} />
        </div>
      </Layout>
    );
  }

  const renderInvestmentCard = (group: InvestmentGroup) => (
    <Card key={group.id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg">{group.name}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">{group.description}</p>
          </div>
          <div className="flex flex-col space-y-2">
            <Badge className={getStatusColor(group.status)}>
              {getStatusText(group.status)}
            </Badge>
            <Badge className={getRiskColor(group.risk_level)}>
              {getRiskText(group.risk_level)}
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
            <div className="text-lg font-semibold">${group.min_investment.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">
              {language === 'en' ? 'Expected Return' : 'العائد المتوقع'}
            </div>
            <div className="text-lg font-semibold text-green-600">{group.expected_return}</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{language === 'en' ? 'Funding Progress' : 'تقدم التمويل'}</span>
            <span>${group.current_amount.toLocaleString()} / ${group.target_amount.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${Math.min(100, (group.current_amount / group.target_amount) * 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4 text-gray-500" />
            <span>{group.current_investors}/{group.max_investors}</span>
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
            onClick={() => setSelectedGroupId(group.id)}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            {language === 'en' ? 'View Details' : 'عرض التفاصيل'}
          </Button>
          {group.status === 'forming' && (
            <Button variant="outline" onClick={() => setSelectedGroupId(group.id)}>
              {language === 'en' ? 'Join' : 'انضم'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>{language === 'ar' ? 'جاري التحميل...' : 'Loading...'}</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Calculate summary statistics
  const totalInvestments = investmentGroups.length;
  const totalValue = investmentGroups.reduce((sum, inv) => sum + inv.current_amount, 0);
  const activeInvestments = investmentGroups.filter(inv => inv.status === 'active').length;
  const totalInvestors = investmentGroups.reduce((sum, inv) => sum + inv.current_investors, 0);

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
          <Button onClick={() => navigate('/my-wallet')}>
            {language === 'en' ? 'My Wallet' : 'محفظتي'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Total Groups' : 'إجمالي المجموعات'}
                  </p>
                  <p className="text-2xl font-bold">{totalInvestments}</p>
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
                    {language === 'en' ? 'Total Value' : 'القيمة الإجمالية'}
                  </p>
                  <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
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
                    {language === 'en' ? 'Active Groups' : 'المجموعات النشطة'}
                  </p>
                  <p className="text-2xl font-bold">{activeInvestments}</p>
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
                    {language === 'en' ? 'Total Investors' : 'إجمالي المستثمرين'}
                  </p>
                  <p className="text-2xl font-bold">{totalInvestors}</p>
                </div>
                <Target className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">
              {language === 'en' ? 'All Groups' : 'جميع المجموعات'}
            </TabsTrigger>
            <TabsTrigger value="forming">
              {language === 'en' ? 'Open for Investment' : 'مفتوحة للاستثمار'}
            </TabsTrigger>
            <TabsTrigger value="my-investments">
              {language === 'en' ? 'My Investments' : 'استثماراتي'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {investmentGroups.map(renderInvestmentCard)}
            </div>
            {investmentGroups.length === 0 && (
              <div className="text-center py-12">
                <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {language === 'en' ? 'No investment groups yet' : 'لا توجد مجموعات استثمار بعد'}
                </h3>
                <p className="text-gray-600">
                  {language === 'en' 
                    ? 'Be the first to create an investment group'
                    : 'كن أول من ينشئ مجموعة استثمار'}
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="forming" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {investmentGroups.filter(g => g.status === 'forming').map(renderInvestmentCard)}
            </div>
            {investmentGroups.filter(g => g.status === 'forming').length === 0 && (
              <div className="text-center py-12">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {language === 'en' ? 'No groups forming' : 'لا توجد مجموعات قيد التكوين'}
                </h3>
                <p className="text-gray-600">
                  {language === 'en' 
                    ? 'Check back later for new investment opportunities'
                    : 'تحقق لاحقاً من وجود فرص استثمارية جديدة'}
                </p>
              </div>
            )}
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
              <Button onClick={() => navigate('/my-wallet')} className="mt-4">
                {language === 'en' ? 'Check My Wallet' : 'تحقق من محفظتي'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default InvestmentGroups;
