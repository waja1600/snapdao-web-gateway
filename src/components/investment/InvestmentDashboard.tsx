import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  FileText, 
  Vote, 
  Gavel,
  PieChart,
  Calendar
} from 'lucide-react';

/**
 * Investment Dashboard Component
 * 
 * Purpose: Comprehensive management interface for individual investments
 * Features:
 * - Shareholder management and voting
 * - Financial tracking and analytics
 * - Document management
 * - Arbitration integration
 * - Performance metrics
 * 
 * Architecture:
 * - Tab-based interface following platform patterns
 * - Reuses existing voting and arbitration systems
 * - Modular design for easy maintenance
 * - Responsive layout for all device sizes
 */

interface Investment {
  id: string;
  name: string;
  type: 'individual' | 'group';
  status: 'forming' | 'active' | 'funded' | 'completed';
  targetAmount: number;
  currentAmount: number;
  currency: string;
  shareholders: number;
  description: string;
  sector: string;
  createdAt: string;
}

interface Shareholder {
  id: string;
  name: string;
  email: string;
  shares: number;
  percentage: number;
  joinedAt: string;
  verified: boolean;
}

interface InvestmentDashboardProps {
  investment: Investment;
}

export const InvestmentDashboard: React.FC<InvestmentDashboardProps> = ({ investment }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock shareholder data - in production, this would come from Supabase
  const [shareholders] = useState<Shareholder[]>([
    {
      id: '1',
      name: language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed',
      email: 'ahmed@example.com',
      shares: 2500,
      percentage: 25,
      joinedAt: '2024-01-15',
      verified: true
    },
    {
      id: '2',
      name: language === 'ar' ? 'فاطمة علي' : 'Fatima Ali',
      email: 'fatima@example.com',
      shares: 3000,
      percentage: 30,
      joinedAt: '2024-01-10',
      verified: true
    },
    {
      id: '3',
      name: language === 'ar' ? 'سارة حسن' : 'Sara Hassan',
      email: 'sara@example.com',
      shares: 1500,
      percentage: 15,
      joinedAt: '2024-01-20',
      verified: false
    }
  ]);

  // Calculate investment metrics
  const metrics = {
    totalShares: shareholders.reduce((sum, sh) => sum + sh.shares, 0),
    verifiedShareholders: shareholders.filter(sh => sh.verified).length,
    fundingProgress: (investment.currentAmount / investment.targetAmount) * 100,
    avgShareSize: shareholders.length > 0 ? investment.currentAmount / shareholders.length : 0
  };

  return (
    <div className="space-y-6">
      {/* Investment Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{investment.name}</CardTitle>
              <p className="text-gray-600 mt-2">{investment.description}</p>
              <div className="flex items-center gap-4 mt-4">
                <Badge className="bg-blue-100 text-blue-800">
                  {investment.sector}
                </Badge>
                <Badge className="bg-green-100 text-green-800">
                  {investment.type === 'individual' 
                    ? (language === 'ar' ? 'فردي' : 'Individual')
                    : (language === 'ar' ? 'جماعي' : 'Group')
                  }
                </Badge>
                <span className="text-sm text-gray-500">
                  {language === 'ar' ? 'تم الإنشاء:' : 'Created:'} {investment.createdAt}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-green-600">
                ${investment.currentAmount.toLocaleString()}
              </p>
              <p className="text-gray-600">
                {language === 'ar' ? 'من' : 'of'} ${investment.targetAmount.toLocaleString()}
              </p>
              <div className="w-48 bg-gray-200 rounded-full h-3 mt-2">
                <div 
                  className="bg-green-600 h-3 rounded-full" 
                  style={{ width: `${metrics.fundingProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Investment Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'المساهمون' : 'Shareholders'}
                </p>
                <p className="text-2xl font-bold">{investment.shareholders}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'نسبة التمويل' : 'Funding Progress'}
                </p>
                <p className="text-2xl font-bold">{metrics.fundingProgress.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'متوسط الحصة' : 'Average Share'}
                </p>
                <p className="text-2xl font-bold">${metrics.avgShareSize.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <PieChart className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'المساهمون المؤكدون' : 'Verified Shareholders'}
                </p>
                <p className="text-2xl font-bold">{metrics.verifiedShareholders}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">
            {language === 'ar' ? 'نظرة عامة' : 'Overview'}
          </TabsTrigger>
          <TabsTrigger value="shareholders">
            <Users className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'المساهمون' : 'Shareholders'}
          </TabsTrigger>
          <TabsTrigger value="voting">
            <Vote className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'التصويت' : 'Voting'}
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'الوثائق' : 'Documents'}
          </TabsTrigger>
          <TabsTrigger value="financials">
            <DollarSign className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'المالية' : 'Financials'}
          </TabsTrigger>
          <TabsTrigger value="arbitration">
            <Gavel className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'التحكيم' : 'Arbitration'}
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Investment Summary */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'ar' ? 'ملخص الاستثمار' : 'Investment Summary'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{language === 'ar' ? 'الهدف:' : 'Target:'}</span>
                    <span className="font-medium">${investment.targetAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{language === 'ar' ? 'المُجمع:' : 'Raised:'}</span>
                    <span className="font-medium text-green-600">${investment.currentAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{language === 'ar' ? 'المتبقي:' : 'Remaining:'}</span>
                    <span className="font-medium">${(investment.targetAmount - investment.currentAmount).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'ar' ? 'النشاط الأخير' : 'Recent Activity'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {language === 'ar' ? 'مساهم جديد انضم' : 'New investor joined'}
                      </p>
                      <p className="text-xs text-gray-600">
                        {language === 'ar' ? 'منذ ساعتين' : '2 hours ago'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                    <Vote className="h-4 w-4 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {language === 'ar' ? 'تم إقرار قرار التمويل' : 'Funding decision approved'}
                      </p>
                      <p className="text-xs text-gray-600">
                        {language === 'ar' ? 'أمس' : 'Yesterday'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                    <FileText className="h-4 w-4 text-purple-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {language === 'ar' ? 'تم رفع وثيقة جديدة' : 'New document uploaded'}
                      </p>
                      <p className="text-xs text-gray-600">
                        {language === 'ar' ? 'منذ 3 أيام' : '3 days ago'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Shareholders Tab */}
        <TabsContent value="shareholders" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>
                  {language === 'ar' ? 'إدارة المساهمين' : 'Shareholder Management'}
                </CardTitle>
                <Button>
                  <Users className="h-4 w-4 mr-2" />
                  {language === 'ar' ? 'دعوة مساهم' : 'Invite Shareholder'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {shareholders.map((shareholder) => (
                  <div key={shareholder.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="font-semibold text-blue-600">
                          {shareholder.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium">{shareholder.name}</h4>
                        <p className="text-sm text-gray-600">{shareholder.email}</p>
                        <p className="text-xs text-gray-500">
                          {language === 'ar' ? 'انضم في:' : 'Joined:'} {shareholder.joinedAt}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={shareholder.verified ? 'default' : 'secondary'}>
                          {shareholder.verified 
                            ? (language === 'ar' ? 'موثق' : 'Verified')
                            : (language === 'ar' ? 'غير موثق' : 'Unverified')
                          }
                        </Badge>
                      </div>
                      <p className="font-bold text-lg">{shareholder.percentage}%</p>
                      <p className="text-sm text-gray-600">
                        {shareholder.shares.toLocaleString()} {language === 'ar' ? 'سهم' : 'shares'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tabs would be implemented similarly */}
        <TabsContent value="voting">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Vote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {language === 'ar' ? 'نظام التصويت' : 'Voting System'}
                </h3>
                <p className="text-gray-600">
                  {language === 'ar' 
                    ? 'سيتم دمج نظام التصويت الموجود في المنصة' 
                    : 'Existing platform voting system will be integrated'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {language === 'ar' ? 'إدارة الوثائق' : 'Document Management'}
                </h3>
                <p className="text-gray-600">
                  {language === 'ar' 
                    ? 'سيتم إضافة نظام إدارة الوثائق مع IPFS' 
                    : 'Document management system with IPFS will be added'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financials">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {language === 'ar' ? 'التقارير المالية' : 'Financial Reports'}
                </h3>
                <p className="text-gray-600">
                  {language === 'ar' 
                    ? 'سيتم ربط نظام التقارير المالية مع الفوترة' 
                    : 'Financial reporting system will be integrated with invoicing'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="arbitration">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Gavel className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {language === 'ar' ? 'التحكيم' : 'Arbitration'}
                </h3>
                <p className="text-gray-600">
                  {language === 'ar' 
                    ? 'سيتم دمج نظام ORDA للتحكيم الموجود' 
                    : 'Existing ORDA arbitration system will be integrated'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
