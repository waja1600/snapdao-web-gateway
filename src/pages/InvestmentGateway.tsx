
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  TrendingUp, 
  Building, 
  Users, 
  DollarSign, 
  PieChart, 
  FileText,
  Vote,
  Gavel
} from 'lucide-react';
import { InvestmentCreationWizard } from '@/components/investment/InvestmentCreationWizard';
import { InvestmentDashboard } from '@/components/investment/InvestmentDashboard';

/**
 * Investment Gateway Page
 * 
 * Purpose: Central hub for investment and company creation
 * Features:
 * - Individual and group investment opportunities
 * - Company formation with multiple shareholders
 * - Shareholder management and voting
 * - Investment tracking and analytics
 * 
 * Architecture:
 * - Follows same pattern as GPO groups but for investments
 * - Supports both individual and collective investments
 * - Integrates with existing voting and arbitration systems
 * - Maintains consistency with platform design patterns
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

const InvestmentGateway: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);

  // Mock investment data - in production, this would come from Supabase
  const [investments] = useState<Investment[]>([
    {
      id: '1',
      name: language === 'ar' ? 'شركة التقنيات الناشئة' : 'Tech Startup Venture',
      type: 'group',
      status: 'forming',
      targetAmount: 500000,
      currentAmount: 250000,
      currency: 'USD',
      shareholders: 12,
      description: language === 'ar' 
        ? 'استثمار في شركة تقنية ناشئة متخصصة في الذكاء الاصطناعي'
        : 'Investment in AI-focused tech startup company',
      sector: language === 'ar' ? 'التكنولوجيا' : 'Technology',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: language === 'ar' ? 'مشروع العقارات التجارية' : 'Commercial Real Estate',
      type: 'group',
      status: 'active',
      targetAmount: 2000000,
      currentAmount: 1800000,
      currency: 'USD',
      shareholders: 25,
      description: language === 'ar' 
        ? 'استثمار جماعي في مجمع تجاري في المنطقة المركزية'
        : 'Group investment in downtown commercial complex',
      sector: language === 'ar' ? 'العقارات' : 'Real Estate',
      createdAt: '2024-01-01'
    },
    {
      id: '3',
      name: language === 'ar' ? 'استثمار فردي في التجارة الإلكترونية' : 'Individual E-commerce Investment',
      type: 'individual',
      status: 'funded',
      targetAmount: 100000,
      currentAmount: 100000,
      currency: 'USD',
      shareholders: 1,
      description: language === 'ar' 
        ? 'استثمار شخصي في منصة تجارة إلكترونية'
        : 'Personal investment in e-commerce platform',
      sector: language === 'ar' ? 'التجارة الإلكترونية' : 'E-commerce',
      createdAt: '2023-12-15'
    }
  ]);

  // Status configuration for consistent styling
  const getStatusBadge = (status: Investment['status']) => {
    const statusConfig = {
      forming: { 
        color: 'bg-yellow-100 text-yellow-800',
        label: language === 'ar' ? 'قيد التكوين' : 'Forming'
      },
      active: { 
        color: 'bg-blue-100 text-blue-800',
        label: language === 'ar' ? 'نشط' : 'Active'
      },
      funded: { 
        color: 'bg-green-100 text-green-800',
        label: language === 'ar' ? 'ممول' : 'Funded'
      },
      completed: { 
        color: 'bg-gray-100 text-gray-800',
        label: language === 'ar' ? 'مكتمل' : 'Completed'
      }
    };

    const config = statusConfig[status];
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  // Calculate investment summary statistics
  const getInvestmentSummary = () => {
    return {
      totalInvestments: investments.length,
      totalValue: investments.reduce((sum, inv) => sum + inv.currentAmount, 0),
      activeInvestments: investments.filter(inv => inv.status === 'active').length,
      totalShareholders: investments.reduce((sum, inv) => sum + inv.shareholders, 0)
    };
  };

  const summary = getInvestmentSummary();

  return (
    <Layout>
      <div className="space-y-6 p-6">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'بوابة الاستثمار' : 'Investment Gateway'}
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            {language === 'ar' 
              ? 'منصة شاملة لإنشاء وإدارة الاستثمارات الفردية والجماعية مع نظام إدارة المساهمين'
              : 'Comprehensive platform for creating and managing individual and group investments with shareholder management'
            }
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'ar' ? 'إجمالي الاستثمارات' : 'Total Investments'}
                  </p>
                  <p className="text-2xl font-bold">{summary.totalInvestments}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'ar' ? 'القيمة الإجمالية' : 'Total Value'}
                  </p>
                  <p className="text-2xl font-bold">${summary.totalValue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Building className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'ar' ? 'الاستثمارات النشطة' : 'Active Investments'}
                  </p>
                  <p className="text-2xl font-bold">{summary.activeInvestments}</p>
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
                    {language === 'ar' ? 'إجمالي المساهمين' : 'Total Shareholders'}
                  </p>
                  <p className="text-2xl font-bold">{summary.totalShareholders}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">
              {language === 'ar' ? 'نظرة عامة' : 'Overview'}
            </TabsTrigger>
            <TabsTrigger value="create">
              {language === 'ar' ? 'إنشاء استثمار' : 'Create Investment'}
            </TabsTrigger>
            <TabsTrigger value="my-investments">
              {language === 'ar' ? 'استثماراتي' : 'My Investments'}
            </TabsTrigger>
            <TabsTrigger value="dashboard" disabled={!selectedInvestment}>
              {language === 'ar' ? 'لوحة الإدارة' : 'Management Dashboard'}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Investment Opportunities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    {language === 'ar' ? 'الفرص الاستثمارية' : 'Investment Opportunities'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {investments.filter(inv => inv.status === 'forming' || inv.status === 'active').map((investment) => (
                    <div key={investment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                         onClick={() => setSelectedInvestment(investment)}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{investment.name}</h3>
                        {getStatusBadge(investment.status)}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{investment.description}</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">{investment.sector}</span>
                        <span className="font-medium text-green-600">
                          ${investment.currentAmount.toLocaleString()} / ${investment.targetAmount.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div className="bg-green-600 h-2 rounded-full" 
                             style={{ width: `${(investment.currentAmount / investment.targetAmount) * 100}%` }}></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start" onClick={() => setActiveTab('create')}>
                    <Building className="h-4 w-4 mr-2" />
                    {language === 'ar' ? 'إنشاء استثمار جديد' : 'Create New Investment'}
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    {language === 'ar' ? 'انضم لاستثمار جماعي' : 'Join Group Investment'}
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <PieChart className="h-4 w-4 mr-2" />
                    {language === 'ar' ? 'تحليل الاستثمارات' : 'Investment Analytics'}
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    {language === 'ar' ? 'التقارير المالية' : 'Financial Reports'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Create Investment Tab */}
          <TabsContent value="create">
            <InvestmentCreationWizard onInvestmentCreated={(id) => {
              console.log('Investment created:', id);
              setActiveTab('my-investments');
            }} />
          </TabsContent>

          {/* My Investments Tab */}
          <TabsContent value="my-investments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'ar' ? 'استثماراتي' : 'My Investments'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {investments.map((investment) => (
                    <div key={investment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{investment.name}</h3>
                          <p className="text-gray-600">{investment.description}</p>
                          <div className="flex gap-4 mt-2 text-sm text-gray-500">
                            <span>{language === 'ar' ? 'القطاع:' : 'Sector:'} {investment.sector}</span>
                            <span>{language === 'ar' ? 'المساهمون:' : 'Shareholders:'} {investment.shareholders}</span>
                            <span>{language === 'ar' ? 'التاريخ:' : 'Created:'} {investment.createdAt}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(investment.status)}
                          <p className="text-xl font-bold text-green-600 mt-2">
                            ${investment.currentAmount.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            {language === 'ar' ? 'من' : 'of'} ${investment.targetAmount.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => {
                          setSelectedInvestment(investment);
                          setActiveTab('dashboard');
                        }}>
                          {language === 'ar' ? 'إدارة' : 'Manage'}
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          {language === 'ar' ? 'التقارير' : 'Reports'}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Vote className="h-4 w-4 mr-1" />
                          {language === 'ar' ? 'التصويت' : 'Voting'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Management Dashboard Tab */}
          <TabsContent value="dashboard">
            {selectedInvestment ? (
              <InvestmentDashboard investment={selectedInvestment} />
            ) : (
              <div className="text-center py-12">
                <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  {language === 'ar' ? 'اختر استثماراً لعرض لوحة الإدارة' : 'Select an investment to view management dashboard'}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default InvestmentGateway;
