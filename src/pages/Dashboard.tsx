
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
        
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">
              {language === 'en' ? 'All Services' : 'كل الخدمات'}
            </TabsTrigger>
            <TabsTrigger value="projects">
              {language === 'en' ? 'Project Management' : 'إدارة المشاريع'}
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
            {/* Display dashboard items */}
            <DashboardItems items={dashboardItems} />
            
            {/* Recent activities section */}
            <RecentActivities />
          </TabsContent>
          
          <TabsContent value="projects">
            <ProjectsOverview />
          </TabsContent>
          
          <TabsContent value="cooperative">
            {roleTabContent.company}
          </TabsContent>
          
          <TabsContent value="freelancers">
            {roleTabContent.freelancer}
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
