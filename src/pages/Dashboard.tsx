
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import { FileText, Bell, Shield, Vote, Gavel, Users, FileText as Invoice, ShoppingCart, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // KYC Status - in a real app, this would come from the backend
  const [kycStatus, setKycStatus] = useState<'pending' | 'verified' | 'not_started'>('not_started');
  
  const dashboardItems = [
    {
      icon: Invoice,
      title: language === 'en' ? 'Invoices' : 'الفواتير',
      value: '5',
      description: language === 'en' ? 'Open invoices' : 'فواتير مفتوحة',
      route: '/invoices'
    },
    {
      icon: Shield,
      title: language === 'en' ? 'Verification' : 'التوثيق',
      value: kycStatus === 'verified' ? '✓' : '!',
      description: language === 'en' ? 
        (kycStatus === 'verified' ? 'Verified' : kycStatus === 'pending' ? 'Pending' : 'Not started') : 
        (kycStatus === 'verified' ? 'تم التحقق' : kycStatus === 'pending' ? 'قيد الانتظار' : 'لم يبدأ'),
      route: '/verification',
      status: kycStatus
    },
    {
      icon: Bell,
      title: language === 'en' ? 'Notifications' : 'الإشعارات',
      value: '3',
      description: language === 'en' ? 'New notifications' : 'إشعارات جديدة',
      route: '/notifications'
    },
    {
      icon: Vote,
      title: language === 'en' ? 'Voting Proposals' : 'مقترحات التصويت',
      value: '2',
      description: language === 'en' ? 'Active proposals' : 'مقترحات نشطة',
      route: '/proposals'
    },
    {
      icon: Gavel,
      title: language === 'en' ? 'Arbitration' : 'التحكيم',
      value: '0',
      description: language === 'en' ? 'Open cases' : 'حالات مفتوحة',
      route: '/arbitration'
    },
    {
      icon: Users,
      title: language === 'en' ? 'My Groups' : 'مجموعاتي',
      value: '3',
      description: language === 'en' ? 'Active memberships' : 'عضويات نشطة',
      route: '/groups'
    }
  ];
  
  // Render a KYC verification prompt if not verified
  const renderKYCPrompt = () => {
    if (kycStatus === 'verified') return null;
    
    return (
      <Card className="mb-6 border-yellow-300 bg-yellow-50">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-yellow-500" />
              <div>
                <h3 className="font-medium text-lg">
                  {language === 'en' ? 'Verification Required' : 'التحقق مطلوب'}
                </h3>
                <p className="text-sm text-gray-600">
                  {language === 'en' 
                    ? 'Complete your KYC verification to unlock all features' 
                    : 'أكمل عملية التحقق من هويتك لفتح جميع الميزات'}
                </p>
              </div>
            </div>
            <Button onClick={() => navigate('/verification')}>
              {language === 'en' ? 'Complete Verification' : 'إكمال التحقق'}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            {language === 'en' 
              ? `Welcome, ${user?.name}` 
              : `مرحبًا، ${user?.name}`}
          </h1>
        </div>
        
        {renderKYCPrompt()}
        
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">
              {language === 'en' ? 'All Services' : 'كل الخدمات'}
            </TabsTrigger>
            <TabsTrigger value="cooperative">
              {language === 'en' ? 'Cooperative Buying' : 'الشراء التعاوني'}
            </TabsTrigger>
            <TabsTrigger value="freelancers">
              {language === 'en' ? 'Freelancers' : 'المستقلين'}
            </TabsTrigger>
            <TabsTrigger value="suppliers">
              {language === 'en' ? 'Suppliers' : 'الموردين'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dashboardItems.map((item, index) => (
                <Card key={index} 
                  className={item.status === 'verified' ? 'border-green-300 bg-green-50' : 
                            item.status === 'pending' ? 'border-yellow-300 bg-yellow-50' : ''}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {item.title}
                    </CardTitle>
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{item.value}</div>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-4 w-full"
                      onClick={() => navigate(item.route)}
                    >
                      {language === 'en' ? 'View' : 'عرض'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  {language === 'en' ? 'Recent Activities' : 'الأنشطة الحديثة'}
                </h2>
              </div>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <ShoppingCart className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">
                          {language === 'en' ? 'You joined "Office Supplies Group"' : 'انضممت إلى "مجموعة مستلزمات المكتب"'}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {language === 'en' ? '2 days ago' : 'منذ يومين'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Invoice className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">
                          {language === 'en' ? 'Invoice #INV-2023 was paid' : 'تم دفع الفاتورة #INV-2023'}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {language === 'en' ? '1 week ago' : 'منذ أسبوع'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="bg-purple-100 p-2 rounded-full">
                        <Vote className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">
                          {language === 'en' ? 'New proposal requires your vote' : 'مقترح جديد يتطلب تصويتك'}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {language === 'en' ? '3 days ago' : 'منذ 3 أيام'}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="cooperative">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'en' ? 'Cooperative Buying Groups' : 'مجموعات الشراء التعاوني'}
                </CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Join groups to get better deals on bulk purchases' 
                    : 'انضم إلى المجموعات للحصول على صفقات أفضل على المشتريات بالجملة'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">
                        {language === 'en' ? 'Office Supplies Group' : 'مجموعة مستلزمات المكتب'}
                      </h3>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        {language === 'en' ? 'Active' : 'نشط'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {language === 'en' 
                        ? 'Bulk purchase of office supplies at wholesale prices' 
                        : 'شراء بالجملة لمستلزمات المكتب بأسعار الجملة'}
                    </p>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{language === 'en' ? 'Members' : 'الأعضاء'}: 15/20</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <Button className="mt-4 w-full" onClick={() => navigate('/groups/office-supplies')}>
                      {language === 'en' ? 'View Group' : 'عرض المجموعة'}
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">
                        {language === 'en' ? 'IT Equipment Group' : 'مجموعة معدات تكنولوجيا المعلومات'}
                      </h3>
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                        {language === 'en' ? 'Forming' : 'قيد التشكيل'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {language === 'en' 
                        ? 'Group purchase of computers and IT equipment' 
                        : 'شراء جماعي لأجهزة الكمبيوتر ومعدات تكنولوجيا المعلومات'}
                    </p>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{language === 'en' ? 'Members' : 'الأعضاء'}: 8/30</span>
                      <span>27%</span>
                    </div>
                    <Progress value={27} className="h-2" />
                    <Button className="mt-4 w-full" variant="outline" onClick={() => navigate('/groups/it-equipment')}>
                      {language === 'en' ? 'Join Group' : 'الانضمام للمجموعة'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="freelancers">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'en' ? 'Freelancer Services' : 'خدمات المستقلين'}
                </CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Connect with skilled freelancers for your projects' 
                    : 'تواصل مع المستقلين المهرة لمشاريعك'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full" onClick={() => navigate('/freelancers')}>
                    {language === 'en' ? 'Browse Freelancers' : 'تصفح المستقلين'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="suppliers">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'en' ? 'Supplier Directory' : 'دليل الموردين'}
                </CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Find verified suppliers for your business needs' 
                    : 'ابحث عن موردين معتمدين لاحتياجات عملك'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full" onClick={() => navigate('/suppliers')}>
                    {language === 'en' ? 'Browse Suppliers' : 'تصفح الموردين'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
