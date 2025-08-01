
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import UserProgressTracker from '../workflow/UserProgressTracker';
import { DashboardItems } from './DashboardItems';
import { QuickNavigation } from './QuickNavigation';
import { RecentActivities } from './RecentActivities';
import { ProjectsOverview } from './ProjectsOverview';
import { getCommonDashboardItems, getRoleDashboardItems } from './dashboardData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Activity, Folder, User } from 'lucide-react';

const EnhancedDashboard: React.FC = () => {
  const { language } = useLanguage();
  const { user } = useAuth();

  const getUserDisplayName = () => {
    if (!user) return language === 'ar' ? 'مرحباً' : 'Welcome';
    const displayName = user.user_metadata?.full_name || 
                       user.email?.split('@')[0] || 
                       (language === 'ar' ? 'مستخدم' : 'User');
    return language === 'ar' ? `مرحباً ${displayName}` : `Welcome ${displayName}`;
  };

  // Get dashboard items based on user role and language
  const kycStatus = user?.user_metadata?.kyc_status || 'not_started';
  const userRole = user?.user_metadata?.role || 'user';
  
  const commonItems = getCommonDashboardItems(language, kycStatus);
  const roleItems = getRoleDashboardItems(language)[userRole] || [];
  const allItems = [...commonItems, ...roleItems];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {getUserDisplayName()}
        </h1>
        <p className="text-lg text-gray-600">
          {language === 'ar' 
            ? 'إدارة شاملة لجميع أنشطتك في المنصة'
            : 'Comprehensive management of all your platform activities'
          }
        </p>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>{language === 'ar' ? 'نظرة عامة' : 'Overview'}</span>
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>{language === 'ar' ? 'التقدم' : 'Progress'}</span>
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center space-x-2">
            <Folder className="h-4 w-4" />
            <span>{language === 'ar' ? 'المشاريع' : 'Projects'}</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span>{language === 'ar' ? 'النشاط' : 'Activity'}</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <DashboardItems items={allItems} />
            </div>
            <div>
              <QuickNavigation />
            </div>
          </div>
        </TabsContent>

        {/* Progress Tab */}
        <TabsContent value="progress" className="space-y-6">
          <UserProgressTracker />
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-6">
          <ProjectsOverview />
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-6">
          <RecentActivities />
        </TabsContent>
      </Tabs>

      {/* Platform Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'ar' ? 'إحصائيات المنصة' : 'Platform Statistics'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">1,234</div>
              <div className="text-sm text-blue-800">
                {language === 'ar' ? 'مجموعات نشطة' : 'Active Groups'}
              </div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">567</div>
              <div className="text-sm text-green-800">
                {language === 'ar' ? 'صفقات مكتملة' : 'Completed Deals'}
              </div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">89</div>
              <div className="text-sm text-purple-800">
                {language === 'ar' ? 'موردون معتمدون' : 'Verified Suppliers'}
              </div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">456</div>
              <div className="text-sm text-yellow-800">
                {language === 'ar' ? 'مستقلون نشطون' : 'Active Freelancers'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedDashboard;
