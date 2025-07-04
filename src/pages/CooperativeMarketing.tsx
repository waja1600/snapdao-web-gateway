
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Megaphone, Users, TrendingUp, Target, Calendar, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Campaign {
  id: string;
  title: string;
  description: string;
  budget: number;
  currentFunding: number;
  participants: number;
  maxParticipants: number;
  startDate: string;
  endDate: string;
  category: string;
  status: 'planning' | 'active' | 'completed';
  estimatedReach: number;
}

const CooperativeMarketing = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');

  const campaigns: Campaign[] = [
    {
      id: '1',
      title: language === 'en' ? 'Tech Startup Showcase' : 'معرض الشركات التقنية الناشئة',
      description: language === 'en' 
        ? 'Joint marketing campaign for emerging tech companies to showcase innovations'
        : 'حملة تسويق مشتركة للشركات التقنية الناشئة لعرض الابتكارات',
      budget: 25000,
      currentFunding: 18500,
      participants: 12,
      maxParticipants: 15,
      startDate: '2024-02-15',
      endDate: '2024-03-15',
      category: 'Technology',
      status: 'active',
      estimatedReach: 500000
    },
    {
      id: '2',
      title: language === 'en' ? 'Sustainable Business Alliance' : 'تحالف الأعمال المستدامة',
      description: language === 'en'
        ? 'Promote eco-friendly business practices and sustainable products'
        : 'تعزيز ممارسات الأعمال الصديقة للبيئة والمنتجات المستدامة',
      budget: 15000,
      currentFunding: 15000,
      participants: 8,
      maxParticipants: 10,
      startDate: '2024-01-20',
      endDate: '2024-02-20',
      category: 'Sustainability',
      status: 'planning',
      estimatedReach: 250000
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-gpo-success/10 text-gpo-success border-gpo-success/20';
      case 'planning': return 'bg-gpo-primary/10 text-gpo-primary border-gpo-primary/20';
      case 'completed': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return language === 'en' ? 'Active' : 'نشط';
      case 'planning': return language === 'en' ? 'Planning' : 'قيد التخطيط';
      case 'completed': return language === 'en' ? 'Completed' : 'مكتمل';
      default: return status;
    }
  };

  const renderCampaignCard = (campaign: Campaign) => (
    <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg">{campaign.title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{campaign.description}</p>
          </div>
          <Badge className={getStatusColor(campaign.status)}>
            {getStatusText(campaign.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">
              {language === 'en' ? 'Total Budget' : 'الميزانية الإجمالية'}
            </div>
            <div className="text-lg font-semibold text-foreground">${campaign.budget.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">
              {language === 'en' ? 'Current Funding' : 'التمويل الحالي'}
            </div>
            <div className="text-lg font-semibold text-gpo-success">
              ${campaign.currentFunding.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{language === 'en' ? 'Participants' : 'المشاركون'}</span>
            <span className="text-foreground font-medium">{campaign.participants}/{campaign.maxParticipants}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gpo-primary h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(campaign.participants / campaign.maxParticipants) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date(campaign.startDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span>{(campaign.estimatedReach / 1000).toFixed(0)}K reach</span>
          </div>
        </div>

        <Badge variant="secondary" className="w-fit">
          {campaign.category}
        </Badge>

        <div className="flex gap-2 pt-2">
          <Button 
            className="flex-1 bg-gpo-primary hover:bg-gpo-primary-dark text-white" 
            onClick={() => navigate(`/campaigns/${campaign.id}`)}
          >
            <Megaphone className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Join Campaign' : 'انضم للحملة'}
          </Button>
          <Button variant="outline" size="sm" className="border-gpo-primary text-gpo-primary hover:bg-gpo-primary/10">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              {language === 'en' ? 'Cooperative Marketing' : 'التسويق التعاوني'}
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              {language === 'en' 
                ? 'Collaborate on marketing campaigns and share costs for better reach and impact'
                : 'تعاون في حملات التسويق وتقاسم التكاليف لوصول وتأثير أفضل'}
            </p>
          </div>
          <Button 
            onClick={() => navigate('/create-campaign')}
            className="bg-gpo-primary hover:bg-gpo-primary-dark text-white"
          >
            {language === 'en' ? 'Create Campaign' : 'إنشاء حملة'}
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {language === 'en' ? 'Active Campaigns' : 'الحملات النشطة'}
                  </p>
                  <p className="text-2xl font-bold text-foreground">12</p>
                </div>
                <div className="p-2 bg-gpo-primary/10 rounded-lg">
                  <Megaphone className="h-6 w-6 text-gpo-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {language === 'en' ? 'Total Reach' : 'إجمالي الوصول'}
                  </p>
                  <p className="text-2xl font-bold text-foreground">2.1M</p>
                </div>
                <div className="p-2 bg-gpo-success/10 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-gpo-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {language === 'en' ? 'Participants' : 'المشاركون'}
                  </p>
                  <p className="text-2xl font-bold text-foreground">847</p>
                </div>
                <div className="p-2 bg-gpo-secondary/10 rounded-lg">
                  <Users className="h-6 w-6 text-gpo-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {language === 'en' ? 'Success Rate' : 'معدل النجاح'}
                  </p>
                  <p className="text-2xl font-bold text-foreground">87%</p>
                </div>
                <div className="p-2 bg-gpo-warning/10 rounded-lg">
                  <Target className="h-6 w-6 text-gpo-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">
              {language === 'en' ? 'Active Campaigns' : 'الحملات النشطة'}
            </TabsTrigger>
            <TabsTrigger value="planning">
              {language === 'en' ? 'In Planning' : 'قيد التخطيط'}
            </TabsTrigger>
            <TabsTrigger value="my-campaigns">
              {language === 'en' ? 'My Campaigns' : 'حملاتي'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.filter(c => c.status === 'active').map(renderCampaignCard)}
            </div>
          </TabsContent>
          
          <TabsContent value="planning" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.filter(c => c.status === 'planning').map(renderCampaignCard)}
            </div>
          </TabsContent>
          
          <TabsContent value="my-campaigns" className="space-y-6">
            <div className="text-center py-12">
              <div className="p-4 bg-muted/20 rounded-full w-fit mx-auto mb-4">
                <Megaphone className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                {language === 'en' ? 'No campaigns created yet' : 'لم يتم إنشاء حملات بعد'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {language === 'en' 
                  ? 'Create your first marketing campaign to get started'
                  : 'أنشئ أول حملة تسويقية للبدء'}
              </p>
              <Button 
                onClick={() => navigate('/create-campaign')}
                className="bg-gpo-primary hover:bg-gpo-primary-dark text-white"
              >
                {language === 'en' ? 'Create Campaign' : 'إنشاء حملة'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CooperativeMarketing;
