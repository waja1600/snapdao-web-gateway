
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import role-specific tab components
import { CompanyTab } from "@/components/dashboard/roleTabs/CompanyTab";
import { FreelancerTab } from "@/components/dashboard/roleTabs/FreelancerTab";
import { SupplierTab } from "@/components/dashboard/roleTabs/SupplierTab";
import { SupervisorTab } from "@/components/dashboard/roleTabs/SupervisorTab";

// Import dashboard components
import { DashboardItems } from "@/components/dashboard/DashboardItems";
import { KYCPrompt } from "@/components/dashboard/KYCPrompt";
import { RoleSelector } from "@/components/dashboard/RoleSelector";
import { RecentActivities } from "@/components/dashboard/RecentActivities";
import { ProjectsOverview } from "@/components/dashboard/ProjectsOverview";
import { MCPAssistant } from "@/components/mcp/MCPAssistant";
import { GatewaysOverview } from "@/components/gateways/GatewaysOverview";
import { WorkflowNavigation } from "@/components/workflow/WorkflowNavigation";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";
import { getCommonDashboardItems, getRoleDashboardItems } from "@/components/dashboard/dashboardData";
import { DashboardItemProps } from "@/components/dashboard/DashboardItem";

const Dashboard = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  
  // Mock user role - in a real app, this would come from the auth context
  const [userRole, setUserRole] = useState<string>('company');
  
  // KYC Status - in a real app, this would come from the backend
  const [kycStatus, setKycStatus] = useState<'pending' | 'verified' | 'not_started'>('not_started');
  
  // Get dashboard items based on language, user role, and KYC status
  const commonDashboardItems = getCommonDashboardItems(language, kycStatus);
  const roleDashboardItems = getRoleDashboardItems(language);
  
  // Combine common items with role-specific items
  const dashboardItems: DashboardItemProps[] = [
    ...commonDashboardItems,
    ...(roleDashboardItems[userRole as keyof typeof roleDashboardItems] || [])
  ];
  
  // Role-specific tab content
  const roleTabContent = {
    company: <CompanyTab />,
    freelancer: <FreelancerTab />,
    supplier: <SupplierTab />,
    supervisor: <SupervisorTab />
  };
  
  // Function to change user role (for demo purposes)
  const changeRole = (role: string) => {
    setUserRole(role);
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
        
        {/* Demo role selector */}
        <RoleSelector currentRole={userRole} onRoleChange={changeRole} />
        
        {/* KYC verification prompt */}
        <KYCPrompt kycStatus={kycStatus} />

        {/* Workflow Navigation */}
        <WorkflowNavigation />
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">
              {language === 'en' ? 'Overview' : 'نظرة عامة'}
            </TabsTrigger>
            <TabsTrigger value="gateways">
              {language === 'en' ? 'Gateways' : 'البوابات'}
            </TabsTrigger>
            <TabsTrigger value="projects">
              {language === 'en' ? 'Project Management' : 'إدارة المشاريع'}
            </TabsTrigger>
            <TabsTrigger value="notifications">
              {language === 'en' ? 'Notifications' : 'الإشعارات'}
            </TabsTrigger>
            <TabsTrigger value="invoices">
              {language === 'en' ? 'Invoices' : 'الفواتير'}
            </TabsTrigger>
            <TabsTrigger value="freelancers">
              {language === 'en' ? 'Freelancer Management' : 'إدارة المستقلين'}
            </TabsTrigger>
            <TabsTrigger value="cooperative">
              {language === 'en' ? 'Cooperative Buying' : 'الشراء التعاوني'}
            </TabsTrigger>
            <TabsTrigger value="suppliers">
              {language === 'en' ? 'Suppliers' : 'الموردين'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {/* Display dashboard items */}
            <DashboardItems items={dashboardItems} />
            
            {/* Gateways overview on main dashboard */}
            <GatewaysOverview />
            
            {/* Recent activities section */}
            <RecentActivities />
          </TabsContent>
          
          <TabsContent value="gateways">
            <GatewaysOverview />
          </TabsContent>
          
          <TabsContent value="projects">
            <ProjectsOverview />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationCenter />
          </TabsContent>

          <TabsContent value="invoices">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                {language === 'en' ? 'Invoice Management' : 'إدارة الفواتير'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Manage your invoices, payment plans, and billing information.'
                  : 'إدارة فواتيرك وخطط الدفع ومعلومات الفوترة.'}
              </p>
              <iframe 
                src="/invoices" 
                className="w-full h-96 border rounded-lg"
                title={language === 'en' ? 'Invoice Management' : 'إدارة الفواتير'}
              />
            </div>
          </TabsContent>

          <TabsContent value="freelancers">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                {language === 'en' ? 'Freelancer Management' : 'إدارة المستقلين'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Manage freelancer projects, payments, and contracts.'
                  : 'إدارة مشاريع المستقلين والمدفوعات والعقود.'}
              </p>
              <iframe 
                src="/freelancer-management" 
                className="w-full h-96 border rounded-lg"
                title={language === 'en' ? 'Freelancer Management' : 'إدارة المستقلين'}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="cooperative">
            {roleTabContent.company}
          </TabsContent>
          
          <TabsContent value="suppliers">
            {roleTabContent.supplier}
          </TabsContent>
        </Tabs>

        {/* MCP Assistant */}
        <MCPAssistant />
      </div>
    </Layout>
  );
};

export default Dashboard;
