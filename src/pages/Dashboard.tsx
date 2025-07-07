
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
      color: 'bg-primary'
    },
    {
      title: language === 'en' ? 'Cooperative Marketing' : 'التسويق التعاوني',
      description: language === 'en' ? 'Collaborative marketing campaigns' : 'حملات التسويق التعاونية',
      icon: Megaphone,
      path: '/cooperative-marketing',
      color: 'bg-dao-green'
    },
    {
      title: language === 'en' ? 'Company Formation' : 'تأسيس الشركات',
      description: language === 'en' ? 'Start your business venture' : 'ابدأ مشروعك التجاري',
      icon: Building2,
      path: '/company-formation',
      color: 'bg-purple-500'
    },
    {
      title: language === 'en' ? 'Find Suppliers' : 'البحث عن موردين',
      description: language === 'en' ? 'Connect with verified suppliers' : 'تواصل مع موردين معتمدين',
      icon: Users,
      path: '/supplier-sourcing',
      color: 'bg-orange-500'
    },
    {
      title: language === 'en' ? 'Hire Freelancers' : 'توظيف المستقلين',
      description: language === 'en' ? 'Find skilled professionals' : 'ابحث عن محترفين مهرة',
      icon: UserCheck,
      path: '/freelancer-management',
      color: 'bg-indigo-500'
    },
    {
      title: language === 'en' ? 'Arbitration' : 'التحكيم',
      description: language === 'en' ? 'Resolve disputes' : 'حل النزاعات',
      icon: Gavel,
      path: '/arbitration-ipfs',
      color: 'bg-dao-red'
    }
  ];

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-muted-foreground">
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
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="gradient-hero text-primary-foreground p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold mb-3">
            {language === 'en' 
              ? `Welcome back, ${profile?.full_name || 'User'}!`
              : `مرحباً بعودتك، ${profile?.full_name || 'المستخدم'}!`
            }
          </h1>
          <p className="text-lg opacity-90 max-w-2xl">
            {language === 'en' 
              ? 'Manage your groups, contracts, and business activities from your centralized dashboard'
              : 'إدارة مجموعاتك وعقودك وأنشطتك التجارية من لوحة التحكم المركزية'
            }
          </p>
          {profile?.kyc_status === 'pending' && (
            <div className="mt-4">
              <Badge variant="secondary" className="bg-dao-yellow/20 text-dao-yellow border-dao-yellow">
                {language === 'en' ? 'KYC Verification Pending' : 'التحقق من الهوية معلق'}
              </Badge>
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 border-b border-border bg-card rounded-t-lg">
          {[
            { key: 'overview', label: language === 'en' ? 'Overview' : 'نظرة عامة' },
            { key: 'projects', label: language === 'en' ? 'Projects' : 'المشاريع' },
            { key: 'activities', label: language === 'en' ? 'Activities' : 'الأنشطة' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-3 font-medium rounded-t-lg transition-colors ${
                activeTab === tab.key 
                  ? 'bg-primary text-primary-foreground border-b-2 border-primary' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-card rounded-b-lg rounded-tr-lg shadow-sm">
          {activeTab === 'overview' && (
            <div className="p-6 space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="card-hover">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {language === 'en' ? 'My Groups' : 'مجموعاتي'}
                    </CardTitle>
                    <Users className="h-5 w-5 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">{stats.totalGroups}</div>
                  </CardContent>
                </Card>
                
                <Card className="card-hover">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {language === 'en' ? 'Active Contracts' : 'العقود النشطة'}
                    </CardTitle>
                    <FileText className="h-5 w-5 text-dao-green" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-dao-green">{stats.activeContracts}</div>
                  </CardContent>
                </Card>
                
                <Card className="card-hover">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {language === 'en' ? 'Pending Votes' : 'التصويتات المعلقة'}
                    </CardTitle>
                    <Vote className="h-5 w-5 text-dao-yellow" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-dao-yellow">{stats.pendingVotes}</div>
                  </CardContent>
                </Card>
                
                <Card className="card-hover">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {language === 'en' ? 'My Proposals' : 'مقترحاتي'}
                    </CardTitle>
                    <Plus className="h-5 w-5 text-purple-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-500">{stats.myProposals}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-foreground">
                  {language === 'en' ? 'Quick Actions' : 'الإجراءات السريعة'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {quickActions.map((action, index) => (
                    <Card key={index} className="card-hover cursor-pointer border-2 hover:border-primary/20"
                          onClick={() => navigate(action.path)}>
                      <CardHeader>
                        <CardTitle className="flex items-center text-lg">
                          <div className={`p-3 rounded-xl ${action.color} text-white mr-4 shadow-md`}>
                            <action.icon className="h-6 w-6" />
                          </div>
                          <span className="text-foreground">{action.title}</span>
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">{action.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full gradient-primary">
                          {language === 'en' ? 'Get Started' : 'ابدأ الآن'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="p-6">
              <ProjectsOverview />
            </div>
          )}

          {activeTab === 'activities' && (
            <div className="p-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <Activity className="h-6 w-6 mr-3 text-primary" />
                    {language === 'en' ? 'Recent Activities' : 'الأنشطة الحديثة'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        text: language === 'en' ? 'New project created' : 'تم إنشاء مشروع جديد',
                        time: language === 'en' ? '2 hours ago' : 'منذ ساعتين',
                        color: 'bg-dao-green'
                      },
                      {
                        text: language === 'en' ? 'Contract signed' : 'تم توقيع العقد',
                        time: language === 'en' ? '1 day ago' : 'منذ يوم واحد',
                        color: 'bg-primary'
                      },
                      {
                        text: language === 'en' ? 'Vote pending' : 'تصويت معلق',
                        time: language === 'en' ? '3 days ago' : 'منذ 3 أيام',
                        color: 'bg-dao-yellow'
                      }
                    ].map((activity, idx) => (
                      <div key={idx} className="flex items-center space-x-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className={`w-3 h-3 ${activity.color} rounded-full shadow-sm`}></div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{activity.text}</p>
                          <p className="text-sm text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
