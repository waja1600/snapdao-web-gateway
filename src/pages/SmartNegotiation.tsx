
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, MessageSquare, TrendingUp, Users, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NegotiationSession {
  id: string;
  title: string;
  description: string;
  parties: string[];
  status: 'active' | 'completed' | 'paused';
  progress: number;
  aiRecommendations: number;
  lastActivity: string;
  estimatedCompletion: string;
  type: 'contract' | 'pricing' | 'terms' | 'partnership';
}

const SmartNegotiation = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');

  const negotiationSessions: NegotiationSession[] = [
    {
      id: '1',
      title: language === 'en' ? 'Software License Agreement' : 'اتفاقية ترخيص البرمجيات',
      description: language === 'en' 
        ? 'Negotiating terms for enterprise software licensing with AI-powered recommendations'
        : 'التفاوض على شروط ترخيص برمجيات المؤسسات مع توصيات مدعومة بالذكاء الاصطناعي',
      parties: ['TechCorp', 'Enterprise Solutions Ltd'],
      status: 'active',
      progress: 65,
      aiRecommendations: 12,
      lastActivity: '2 hours ago',
      estimatedCompletion: '3 days',
      type: 'contract'
    },
    {
      id: '2',
      title: language === 'en' ? 'Bulk Procurement Deal' : 'صفقة الشراء بالجملة',
      description: language === 'en'
        ? 'Smart negotiation for bulk procurement with multiple suppliers and dynamic pricing'
        : 'تفاوض ذكي للشراء بالجملة مع موردين متعددين وتسعير ديناميكي',
      parties: ['Manufacturing Group', 'Supply Chain Partners'],
      status: 'active',
      progress: 80,
      aiRecommendations: 8,
      lastActivity: '1 hour ago',
      estimatedCompletion: '1 day',
      type: 'pricing'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return language === 'en' ? 'Active' : 'نشط';
      case 'completed': return language === 'en' ? 'Completed' : 'مكتمل';
      case 'paused': return language === 'en' ? 'Paused' : 'متوقف';
      default: return status;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'contract': return 'bg-purple-100 text-purple-800';
      case 'pricing': return 'bg-green-100 text-green-800';
      case 'terms': return 'bg-blue-100 text-blue-800';
      case 'partnership': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'contract': return language === 'en' ? 'Contract' : 'عقد';
      case 'pricing': return language === 'en' ? 'Pricing' : 'تسعير';
      case 'terms': return language === 'en' ? 'Terms' : 'شروط';
      case 'partnership': return language === 'en' ? 'Partnership' : 'شراكة';
      default: return type;
    }
  };

  const renderNegotiationCard = (session: NegotiationSession) => (
    <Card key={session.id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg">{session.title}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">{session.description}</p>
          </div>
          <div className="flex flex-col space-y-2">
            <Badge className={getStatusColor(session.status)}>
              {getStatusText(session.status)}
            </Badge>
            <Badge className={getTypeColor(session.type)}>
              {getTypeText(session.type)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{language === 'en' ? 'Progress' : 'التقدم'}</span>
            <span>{session.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${session.progress}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600">
              {language === 'en' ? 'AI Recommendations' : 'توصيات الذكاء الاصطناعي'}
            </div>
            <div className="text-lg font-semibold flex items-center">
              <Brain className="h-4 w-4 mr-1 text-purple-600" />
              {session.aiRecommendations}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">
              {language === 'en' ? 'Parties' : 'الأطراف'}
            </div>
            <div className="text-lg font-semibold flex items-center">
              <Users className="h-4 w-4 mr-1 text-blue-600" />
              {session.parties.length}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-gray-600">
            {language === 'en' ? 'Participating Parties' : 'الأطراف المشاركة'}
          </div>
          <div className="flex flex-wrap gap-1">
            {session.parties.map((party, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {party}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4 text-gray-500" />
            <div>
              <div className="text-gray-600">{language === 'en' ? 'Last Activity' : 'آخر نشاط'}</div>
              <div className="font-medium">{session.lastActivity}</div>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp className="h-4 w-4 text-gray-500" />
            <div>
              <div className="text-gray-600">{language === 'en' ? 'Est. Completion' : 'الإكمال المتوقع'}</div>
              <div className="font-medium">{session.estimatedCompletion}</div>
            </div>
          </div>
        </div>

        <div className="flex space-x-2 pt-2">
          <Button 
            className="flex-1" 
            onClick={() => navigate(`/smart-negotiation/${session.id}`)}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Continue Negotiation' : 'متابعة التفاوض'}
          </Button>
          <Button variant="outline" onClick={() => navigate(`/smart-negotiation/${session.id}/summary`)}>
            {language === 'en' ? 'Summary' : 'الملخص'}
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
              {language === 'en' ? 'Smart Negotiation Solutions' : 'حلول التفاوض الذكية'}
            </h1>
            <p className="text-gray-600 mt-2">
              {language === 'en' 
                ? 'AI-powered negotiation platform for complex business deals and contracts'
                : 'منصة تفاوض مدعومة بالذكاء الاصطناعي للصفقات التجارية المعقدة والعقود'}
            </p>
          </div>
          <Button onClick={() => navigate('/start-negotiation')}>
            {language === 'en' ? 'Start New Negotiation' : 'بدء تفاوض جديد'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Active Sessions' : 'الجلسات النشطة'}
                  </p>
                  <p className="text-2xl font-bold">15</p>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'AI Suggestions' : 'اقتراحات الذكاء الاصطناعي'}
                  </p>
                  <p className="text-2xl font-bold">247</p>
                </div>
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Completed Deals' : 'الصفقات المكتملة'}
                  </p>
                  <p className="text-2xl font-bold">89</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
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
                <TrendingUp className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="active">
              {language === 'en' ? 'Active Sessions' : 'الجلسات النشطة'}
            </TabsTrigger>
            <TabsTrigger value="completed">
              {language === 'en' ? 'Completed' : 'مكتملة'}
            </TabsTrigger>
            <TabsTrigger value="templates">
              {language === 'en' ? 'Templates' : 'القوالب'}
            </TabsTrigger>
            <TabsTrigger value="analytics">
              {language === 'en' ? 'Analytics' : 'التحليلات'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {negotiationSessions.filter(s => s.status === 'active').map(renderNegotiationCard)}
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-6">
            <div className="text-center py-12">
              <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {language === 'en' ? 'No completed negotiations yet' : 'لا توجد مفاوضات مكتملة بعد'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Your completed negotiations will appear here'
                  : 'ستظهر مفاوضاتك المكتملة هنا'}
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="templates" className="space-y-6">
            <div className="text-center py-12">
              <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {language === 'en' ? 'Negotiation Templates' : 'قوالب التفاوض'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Pre-built templates for common negotiation scenarios'
                  : 'قوالب جاهزة لسيناريوهات التفاوض الشائعة'}
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <div className="text-center py-12">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {language === 'en' ? 'Negotiation Analytics' : 'تحليلات التفاوض'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Insights and performance metrics for your negotiations'
                  : 'رؤى ومقاييس الأداء لمفاوضاتك'}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SmartNegotiation;
