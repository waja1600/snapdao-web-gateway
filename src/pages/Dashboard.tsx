
import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProjectsOverview } from '@/components/dashboard/ProjectsOverview';
import { 
  Users, 
  FileText, 
  Vote, 
  Building2, 
  ShoppingCart, 
  Megaphone,
  Gavel,
  UserCheck,
  Plus,
  Activity
} from 'lucide-react';

interface DashboardStats {
  totalGroups: number;
  activeContracts: number;
  pendingVotes: number;
  myProposals: number;
}

interface UserProfile {
  full_name: string;
  role: string;
  company_name?: string;
  kyc_status: string;
}

const Dashboard = () => {
  const { user, loading } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalGroups: 0,
    activeContracts: 0,
    pendingVotes: 0,
    myProposals: 0
  });
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchStats();
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;

    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileData) {
      setProfile(profileData);
    }
  };

  const fetchStats = async () => {
    if (!user) return;

    // Mock stats for demonstration
    setStats({
      totalGroups: 3,
      activeContracts: 5,
      pendingVotes: 2,
      myProposals: 7
    });
  };

  const quickActions = [
    {
      title: language === 'en' ? 'Group Buying' : 'الشراء الجماعي',
      description: language === 'en' ? 'Join or create buying groups' : 'انضم أو أنشئ مجموعات شراء',
      icon: ShoppingCart,
      path: '/cooperative-buying',
      color: 'bg-gpo-primary'
    },
    {
      title: language === 'en' ? 'Cooperative Marketing' : 'التسويق التعاوني',
      description: language === 'en' ? 'Collaborative marketing campaigns' : 'حملات التسويق التعاونية',
      icon: Megaphone,
      path: '/cooperative-marketing',
      color: 'bg-gpo-success'
    },
    {
      title: language === 'en' ? 'Company Formation' : 'تأسيس الشركات',
      description: language === 'en' ? 'Start your business venture' : 'ابدأ مشروعك التجاري',
      icon: Building2,
      path: '/company-formation',
      color: 'bg-gpo-secondary'
    },
    {
      title: language === 'en' ? 'Find Suppliers' : 'البحث عن موردين',
      description: language === 'en' ? 'Connect with verified suppliers' : 'تواصل مع موردين معتمدين',
      icon: Users,
      path: '/supplier-sourcing',
      color: 'bg-gpo-accent'
    },
    {
      title: language === 'en' ? 'Hire Freelancers' : 'توظيف المستقلين',
      description: language === 'en' ? 'Find skilled professionals' : 'ابحث عن محترفين مهرة',
      icon: UserCheck,
      path: '/freelancer-management',
      color: 'bg-gpo-primary-light'
    },
    {
      title: language === 'en' ? 'Arbitration' : 'التحكيم',
      description: language === 'en' ? 'Resolve disputes' : 'حل النزاعات',
      icon: Gavel,
      path: '/arbitration-ipfs',
      color: 'bg-gpo-error'
    }
  ];

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">
            {language === 'en' ? 'Loading...' : 'جاري التحميل...'}
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-gpo-primary to-gpo-secondary text-white p-6 rounded-lg shadow-[var(--shadow-elevated)]">
          <h1 className="text-2xl font-bold mb-2">
            {language === 'en' 
              ? `Welcome back, ${profile?.full_name || 'User'}!`
              : `مرحباً بعودتك، ${profile?.full_name || 'المستخدم'}!`
            }
          </h1>
          <p className="opacity-90">
            {language === 'en' 
              ? 'Manage your groups, contracts, and business activities'
              : 'إدارة مجموعاتك وعقودك وأنشطتك التجارية'
            }
          </p>
          {profile?.kyc_status === 'pending' && (
            <div className="mt-4">
              <Badge variant="secondary" className="bg-gpo-warning text-white">
                {language === 'en' ? 'KYC Verification Pending' : 'التحقق من الهوية معلق'}
              </Badge>
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 border-b border-border">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
              activeTab === 'overview' 
                ? 'bg-gpo-primary/10 text-gpo-primary border-b-2 border-gpo-primary' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            {language === 'en' ? 'Overview' : 'نظرة عامة'}
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
              activeTab === 'projects' 
                ? 'bg-gpo-primary/10 text-gpo-primary border-b-2 border-gpo-primary' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            {language === 'en' ? 'Projects' : 'المشاريع'}
          </button>
          <button
            onClick={() => setActiveTab('activities')}
            className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
              activeTab === 'activities' 
                ? 'bg-gpo-primary/10 text-gpo-primary border-b-2 border-gpo-primary' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            {language === 'en' ? 'Activities' : 'الأنشطة'}
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {language === 'en' ? 'My Groups' : 'مجموعاتي'}
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalGroups}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {language === 'en' ? 'Active Contracts' : 'العقود النشطة'}
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeContracts}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {language === 'en' ? 'Pending Votes' : 'التصويتات المعلقة'}
                  </CardTitle>
                  <Vote className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.pendingVotes}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {language === 'en' ? 'My Proposals' : 'مقترحاتي'}
                  </CardTitle>
                  <Plus className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.myProposals}</div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {language === 'en' ? 'Quick Actions' : 'الإجراءات السريعة'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quickActions.map((action, index) => (
                  <Card key={index} className="card hover:shadow-[var(--shadow-elevated)] transition-all cursor-pointer"
                        onClick={() => navigate(action.path)}>
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <div className={`p-2 rounded-lg ${action.color} text-white mr-3 shadow-sm`}>
                          <action.icon className="h-5 w-5" />
                        </div>
                        {action.title}
                      </CardTitle>
                      <CardDescription>{action.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        variant="outline" 
                        className="w-full border-gpo-primary text-gpo-primary hover:bg-gpo-primary hover:text-white"
                      >
                        {language === 'en' ? 'Get Started' : 'ابدأ الآن'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'projects' && <ProjectsOverview />}

        {activeTab === 'activities' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                {language === 'en' ? 'Recent Activities' : 'الأنشطة الحديثة'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="w-2 h-2 bg-gpo-success rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">
                      {language === 'en' ? 'New project created' : 'تم إنشاء مشروع جديد'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {language === 'en' ? '2 hours ago' : 'منذ ساعتين'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="w-2 h-2 bg-gpo-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">
                      {language === 'en' ? 'Contract signed' : 'تم توقيع العقد'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {language === 'en' ? '1 day ago' : 'منذ يوم واحد'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="w-2 h-2 bg-gpo-warning rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">
                      {language === 'en' ? 'Vote pending' : 'تصويت معلق'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {language === 'en' ? '3 days ago' : 'منذ 3 أيام'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
