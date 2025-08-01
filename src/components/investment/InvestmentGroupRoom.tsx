
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  PieChart, 
  MessageSquare,
  BarChart3,
  FileText,
  CheckCircle,
  Calendar
} from 'lucide-react';
import { toast } from 'sonner';
import { investmentService, walletService, InvestmentGroup, InvestmentParticipation } from '@/services/wallet-service';

interface InvestmentGroupRoomProps {
  groupId: string;
}

export const InvestmentGroupRoom: React.FC<InvestmentGroupRoomProps> = ({ groupId }) => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [group, setGroup] = useState<InvestmentGroup | null>(null);
  const [participations, setParticipations] = useState<InvestmentParticipation[]>([]);
  const [userParticipation, setUserParticipation] = useState<InvestmentParticipation | null>(null);
  const [balance, setBalance] = useState(0);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (groupId) {
      fetchGroupData();
      fetchUserBalance();
    }
  }, [groupId]);

  const fetchGroupData = async () => {
    try {
      // Fetch group details
      const groupData = await investmentService.getInvestmentGroup(groupId);
      if (groupData) {
        setGroup(groupData);
      }

      // Fetch participations
      const participationsData = await investmentService.getGroupParticipations(groupId);
      setParticipations(participationsData);

      // Find user's participation
      const userParticipationData = participationsData.find(p => p.user_id === user?.id);
      setUserParticipation(userParticipationData || null);

    } catch (error) {
      console.error('Error fetching group data:', error);
      toast.error(language === 'ar' ? 'فشل في تحميل بيانات المجموعة' : 'Failed to load group data');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserBalance = async () => {
    if (!user) return;

    try {
      const userBalance = await walletService.getWalletBalance(user.id);
      setBalance(userBalance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const handleJoinGroup = async () => {
    if (!investmentAmount || parseFloat(investmentAmount) <= 0) {
      toast.error(language === 'ar' ? 'أدخل مبلغاً صحيحاً' : 'Enter a valid amount');
      return;
    }

    const amount = parseFloat(investmentAmount);
    
    if (amount < (group?.min_investment || 0)) {
      toast.error(language === 'ar' ? 'المبلغ أقل من الحد الأدنى' : 'Amount is below minimum investment');
      return;
    }

    if (amount > balance) {
      toast.error(language === 'ar' ? 'الرصيد غير كافي' : 'Insufficient balance');
      return;
    }

    try {
      const success = await investmentService.joinInvestmentGroup(groupId, user?.id!, amount);

      if (success) {
        toast.success(language === 'ar' ? 'تم الانضمام للمجموعة بنجاح' : 'Successfully joined the group');
        setInvestmentAmount('');
        fetchGroupData();
        fetchUserBalance();
      } else {
        toast.error(language === 'ar' ? 'فشل في الانضمام للمجموعة' : 'Failed to join the group');
      }
    } catch (error) {
      console.error('Error joining group:', error);
      toast.error(language === 'ar' ? 'حدث خطأ أثناء الانضمام' : 'An error occurred while joining');
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

  const getRiskText = (risk: string) => {
    const risks = {
      low: language === 'ar' ? 'مخاطر منخفضة' : 'Low Risk',
      medium: language === 'ar' ? 'مخاطر متوسطة' : 'Medium Risk',
      high: language === 'ar' ? 'مخاطر عالية' : 'High Risk'
    };
    return risks[risk as keyof typeof risks] || risk;
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
    const statuses = {
      forming: language === 'ar' ? 'قيد التكوين' : 'Forming',
      active: language === 'ar' ? 'نشط' : 'Active',
      completed: language === 'ar' ? 'مكتمل' : 'Completed',
      cancelled: language === 'ar' ? 'ملغى' : 'Cancelled'
    };
    return statuses[status as keyof typeof statuses] || status;
  };

  if (loading || !group) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>{language === 'ar' ? 'جاري التحميل...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  const fundingProgress = ((group.current_amount || 0) / group.target_amount) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{group.name}</h1>
            <p className="text-blue-100">{group.description}</p>
          </div>
          <div className="text-right">
            <Badge className={getStatusColor(group.status || 'forming')}>
              {getStatusText(group.status || 'forming')}
            </Badge>
            <div className="mt-2">
              <Badge className={getRiskColor(group.risk_level)}>
                {getRiskText(group.risk_level)}
              </Badge>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{language === 'ar' ? 'التقدم' : 'Progress'}</span>
            <span>${(group.current_amount || 0).toLocaleString()} / ${group.target_amount.toLocaleString()}</span>
          </div>
          <Progress value={fundingProgress} className="h-3" />
          <div className="flex justify-between text-xs text-blue-100">
            <span>{fundingProgress.toFixed(1)}% {language === 'ar' ? 'مكتمل' : 'Complete'}</span>
            <span>{group.current_investors || 0}/{group.max_investors} {language === 'ar' ? 'مستثمر' : 'investors'}</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'الحد الأدنى' : 'Minimum Investment'}
                </p>
                <p className="text-2xl font-bold">${group.min_investment.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'العائد المتوقع' : 'Expected Return'}
                </p>
                <p className="text-2xl font-bold text-green-600">{group.expected_return}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'المدة' : 'Duration'}
                </p>
                <p className="text-2xl font-bold">{group.duration}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'المستثمرون' : 'Investors'}
                </p>
                <p className="text-2xl font-bold">{group.current_investors || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">
            {language === 'ar' ? 'نظرة عامة' : 'Overview'}
          </TabsTrigger>
          <TabsTrigger value="investors">
            {language === 'ar' ? 'المستثمرون' : 'Investors'}
          </TabsTrigger>
          <TabsTrigger value="performance">
            {language === 'ar' ? 'الأداء' : 'Performance'}
          </TabsTrigger>
          <TabsTrigger value="discussions">
            {language === 'ar' ? 'النقاشات' : 'Discussions'}
          </TabsTrigger>
          <TabsTrigger value="documents">
            {language === 'ar' ? 'المستندات' : 'Documents'}
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Investment Form */}
            {!userParticipation && group.status === 'forming' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    {language === 'ar' ? 'انضم للاستثمار' : 'Join Investment'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="investment-amount">
                      {language === 'ar' ? 'مبلغ الاستثمار' : 'Investment Amount'}
                    </Label>
                    <Input
                      id="investment-amount"
                      type="number"
                      placeholder="0.00"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      {language === 'ar' ? 'رصيدك:' : 'Your balance:'} ${balance.toFixed(2)}
                    </p>
                  </div>
                  <Button onClick={handleJoinGroup} className="w-full">
                    {language === 'ar' ? 'استثمر الآن' : 'Invest Now'}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* User Investment Status */}
            {userParticipation && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    {language === 'ar' ? 'استثمارك' : 'Your Investment'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">
                        {language === 'ar' ? 'المبلغ المستثمر' : 'Invested Amount'}
                      </p>
                      <p className="text-xl font-bold">${userParticipation.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        {language === 'ar' ? 'نسبة الحصة' : 'Share Percentage'}
                      </p>
                      <p className="text-xl font-bold text-blue-600">{userParticipation.share_percentage?.toFixed(2)}%</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {language === 'ar' ? 'مستثمر نشط' : 'Active Investor'}
                  </Badge>
                </CardContent>
              </Card>
            )}

            {/* Investment Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  {language === 'ar' ? 'تفاصيل الاستثمار' : 'Investment Details'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{language === 'ar' ? 'الفئة:' : 'Category:'}</span>
                    <span className="font-medium">{group.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{language === 'ar' ? 'تاريخ الإنشاء:' : 'Created:'}</span>
                    <span className="font-medium">{group.created_at ? new Date(group.created_at).toLocaleDateString() : 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{language === 'ar' ? 'المبلغ المحصل:' : 'Amount Raised:'}</span>
                    <span className="font-medium">${(group.current_amount || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{language === 'ar' ? 'الهدف:' : 'Target:'}</span>
                    <span className="font-medium">${group.target_amount.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Investors Tab */}
        <TabsContent value="investors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{language === 'ar' ? 'قائمة المستثمرين' : 'Investor List'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {participations.length === 0 ? (
                  <p className="text-center py-8 text-gray-500">
                    {language === 'ar' ? 'لا يوجد مستثمرون بعد' : 'No investors yet'}
                  </p>
                ) : (
                  participations.map((participation, index) => (
                    <div key={participation.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="font-bold text-blue-600">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium">
                            {language === 'ar' ? 'مستثمر' : 'Investor'} #{index + 1}
                          </p>
                          <p className="text-sm text-gray-600">
                            {participation.created_at ? new Date(participation.created_at).toLocaleDateString() : 'N/A'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${participation.amount.toLocaleString()}</p>
                        <p className="text-sm text-blue-600">{participation.share_percentage?.toFixed(2)}%</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                {language === 'ar' ? 'تحليل الأداء' : 'Performance Analysis'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  {language === 'ar' ? 'بيانات الأداء ستكون متاحة بعد بدء الاستثمار' : 'Performance data will be available after investment starts'}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Discussions Tab */}
        <TabsContent value="discussions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                {language === 'ar' ? 'نقاشات المستثمرين' : 'Investor Discussions'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">
                  {language === 'ar' ? 'لا توجد نقاشات بعد' : 'No discussions yet'}
                </p>
                <Button variant="outline">
                  {language === 'ar' ? 'ابدأ نقاشاً' : 'Start Discussion'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {language === 'ar' ? 'المستندات القانونية' : 'Legal Documents'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  {language === 'ar' ? 'المستندات القانونية قيد الإعداد' : 'Legal documents are being prepared'}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
