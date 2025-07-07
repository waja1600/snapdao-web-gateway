
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Plus, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  Filter,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Group {
  id: string;
  name: string;
  description: string;
  type: string;
  status: 'forming' | 'active' | 'completed' | 'paused';
  memberCount: number;
  maxMembers: number;
  currentPhase: string;
  myRole: 'member' | 'admin' | 'pending';
  joinedAt: string;
  lastActivity: string;
}

const MyGroups = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data - في التطبيق الحقيقي، ستأتي من API
  useEffect(() => {
    const mockGroups: Group[] = [
      {
        id: '1',
        name: language === 'ar' ? 'مجموعة الشراء التعاوني للتكنولوجيا' : 'Technology Cooperative Buying Group',
        description: language === 'ar' ? 'شراء جماعي لأجهزة الكمبيوتر والتكنولوجيا' : 'Bulk purchasing for computers and technology',
        type: 'cooperative_purchasing',
        status: 'active',
        memberCount: 12,
        maxMembers: 20,
        currentPhase: language === 'ar' ? 'مرحلة التفاوض' : 'Negotiation Phase',
        myRole: 'admin',
        joinedAt: '2024-01-15',
        lastActivity: '2024-01-20'
      },
      {
        id: '2',
        name: language === 'ar' ? 'مجموعة التسويق التعاوني للمطاعم' : 'Restaurant Cooperative Marketing Group',
        description: language === 'ar' ? 'تسويق جماعي للمطاعم المحلية' : 'Joint marketing for local restaurants',
        type: 'cooperative_marketing',
        status: 'forming',
        memberCount: 8,
        maxMembers: 15,
        currentPhase: language === 'ar' ? 'جمع الأعضاء' : 'Member Collection',
        myRole: 'member',
        joinedAt: '2024-01-10',
        lastActivity: '2024-01-19'
      },
      {
        id: '3',
        name: language === 'ar' ? 'مجموعة تأسيس شركة التجارة الإلكترونية' : 'E-commerce Company Formation Group',
        description: language === 'ar' ? 'تأسيس شركة للتجارة الإلكترونية' : 'Forming an e-commerce company',
        type: 'company_formation',
        status: 'completed',
        memberCount: 5,
        maxMembers: 10,
        currentPhase: language === 'ar' ? 'مكتملة' : 'Completed',
        myRole: 'member',
        joinedAt: '2023-12-01',
        lastActivity: '2024-01-05'
      }
    ];
    
    setTimeout(() => {
      setGroups(mockGroups);
      setLoading(false);
    }, 1000);
  }, [language]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'forming': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'paused': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'member': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'forming': return <Clock className="h-4 w-4" />;
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'paused': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || group.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const groupsByStatus = {
    active: filteredGroups.filter(g => g.status === 'active'),
    forming: filteredGroups.filter(g => g.status === 'forming'),
    completed: filteredGroups.filter(g => g.status === 'completed'),
    pending: filteredGroups.filter(g => g.myRole === 'pending')
  };

  const GroupCard = ({ group }: { group: Group }) => (
    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2 line-clamp-2">
              {group.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {group.description}
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge variant="outline" className={getStatusColor(group.status)}>
            {getStatusIcon(group.status)}
            <span className="mr-1">
              {language === 'ar' ? 
                (group.status === 'forming' ? 'تكوين' : 
                 group.status === 'active' ? 'نشط' :
                 group.status === 'completed' ? 'مكتمل' : 'متوقف') :
                group.status.charAt(0).toUpperCase() + group.status.slice(1)
              }
            </span>
          </Badge>
          
          <Badge variant="outline" className={getRoleColor(group.myRole)}>
            {language === 'ar' ? 
              (group.myRole === 'admin' ? 'مشرف' : 
               group.myRole === 'member' ? 'عضو' : 'في الانتظار') :
              group.myRole.charAt(0).toUpperCase() + group.myRole.slice(1)
            }
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{group.memberCount}/{group.maxMembers}</span>
            </div>
            <span className="text-muted-foreground">
              {language === 'ar' ? 'المرحلة:' : 'Phase:'} {group.currentPhase}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {language === 'ar' ? 'آخر نشاط:' : 'Last activity:'} {group.lastActivity}
            </span>
            
            <Button
              size="sm"
              onClick={() => navigate(`/groups/${group.id}`)}
              className="h-8"
            >
              {language === 'ar' ? 'دخول' : 'Enter'}
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">
              {language === 'ar' ? 'جاري تحميل مجموعاتك...' : 'Loading your groups...'}
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              {language === 'ar' ? 'مجموعاتي' : 'My Groups'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {language === 'ar' 
                ? `لديك ${groups.length} مجموعة` 
                : `You have ${groups.length} groups`
              }
            </p>
          </div>
          
          <Button onClick={() => navigate('/create-group')} className="shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'إنشاء مجموعة' : 'Create Group'}
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={language === 'ar' ? 'البحث في المجموعات...' : 'Search groups...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {language === 'ar' ? 'جميع الحالات' : 'All Status'}
              </SelectItem>
              <SelectItem value="active">
                {language === 'ar' ? 'نشط' : 'Active'}
              </SelectItem>
              <SelectItem value="forming">
                {language === 'ar' ? 'تكوين' : 'Forming'}
              </SelectItem>
              <SelectItem value="completed">
                {language === 'ar' ? 'مكتمل' : 'Completed'}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Groups Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              {language === 'ar' ? 'الكل' : 'All'} ({filteredGroups.length})
            </TabsTrigger>
            <TabsTrigger value="active">
              {language === 'ar' ? 'نشط' : 'Active'} ({groupsByStatus.active.length})
            </TabsTrigger>
            <TabsTrigger value="forming">
              {language === 'ar' ? 'تكوين' : 'Forming'} ({groupsByStatus.forming.length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              {language === 'ar' ? 'في الانتظار' : 'Pending'} ({groupsByStatus.pending.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGroups.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupsByStatus.active.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="forming" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupsByStatus.forming.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupsByStatus.pending.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">
              {language === 'ar' ? 'لا توجد مجموعات' : 'No groups found'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {language === 'ar' 
                ? 'لم يتم العثور على مجموعات تطابق البحث الخاص بك'
                : 'No groups match your search criteria'
              }
            </p>
            <Button onClick={() => navigate('/create-group')}>
              <Plus className="h-4 w-4 mr-2" />
              {language === 'ar' ? 'إنشاء مجموعة جديدة' : 'Create New Group'}
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyGroups;
