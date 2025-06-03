
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Layout } from "@/components/Layout";
import { MCPAssistant } from "@/components/mcp/MCPAssistant";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Calendar, MapPin, Tag, Plus, Settings, Eye, UserPlus, FileSearch } from "lucide-react";

const MyGroups = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  // Mock data for groups
  const createdGroups = [
    {
      id: '1',
      name: 'توريد أثاث مكتبي',
      activity: 'أجهزة طبية',
      members: '5/10',
      status: 'pending_review',
      voting: null,
      createdAt: '2025-06-01',
      country: 'sa'
    },
    {
      id: '2',
      name: 'خدمات تطوير مواقع',
      activity: 'تكنولوجيا',
      members: '3/5',
      status: 'active',
      voting: 'active',
      createdAt: '2025-05-28',
      country: 'ae'
    }
  ];

  const joinedGroups = [
    {
      id: '3',
      name: 'مجموعة استيراد معدات',
      activity: 'صناعة',
      members: '8/12',
      status: 'negotiation',
      voting: 'completed',
      createdAt: '2025-05-25',
      country: 'eg'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_review': return 'bg-gray-100 text-gray-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'negotiation': return 'bg-blue-100 text-blue-800';
      case 'voting': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending_review': return language === 'en' ? 'Pending Review' : 'قيد المراجعة';
      case 'active': return language === 'en' ? 'Active' : 'نشطة';
      case 'negotiation': return language === 'en' ? 'Under Negotiation' : 'قيد التفاوض';
      case 'voting': return language === 'en' ? 'Voting' : 'تصويت';
      case 'closed': return language === 'en' ? 'Closed' : 'مغلقة';
      default: return status;
    }
  };

  const getVotingStatus = (voting: string | null) => {
    if (!voting) return null;
    switch (voting) {
      case 'active': return language === 'en' ? 'Voting Active' : 'تصويت جاري';
      case 'completed': return language === 'en' ? 'Vote Completed' : 'تم التصويت';
      default: return voting;
    }
  };

  const GroupCard = ({ group, isCreator = false }: { group: any, isCreator?: boolean }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{group.name}</CardTitle>
            <CardDescription className="space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <Tag className="w-4 h-4" />
                <span>{group.activity}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4" />
                <span>{group.members} {language === 'en' ? 'members' : 'أعضاء'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4" />
                <span>{new Date(group.createdAt).toLocaleDateString(language === 'en' ? 'en-US' : 'ar-SA')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" />
                <span>{t(group.country)}</span>
              </div>
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2">
            <Badge className={getStatusColor(group.status)}>
              {getStatusText(group.status)}
            </Badge>
            {group.voting && (
              <Badge variant="outline" className="text-xs">
                {getVotingStatus(group.voting)}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate(`/group-room/${group.id}`)}
          >
            <Eye className="w-4 h-4 mr-1" />
            {language === 'en' ? 'View Details' : 'عرض التفاصيل'}
          </Button>
          
          {isCreator && (
            <>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate(`/group/${group.id}/members`)}
              >
                <UserPlus className="w-4 h-4 mr-1" />
                {language === 'en' ? 'New Joins' : 'انضمامات جديدة'}
              </Button>
              
              {group.status === 'pending_review' && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate(`/group/${group.id}/edit`)}
                >
                  <Settings className="w-4 h-4 mr-1" />
                  {language === 'en' ? 'Edit Group' : 'تعديل المجموعة'}
                </Button>
              )}
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate(`/group/${group.id}/freelancers`)}
              >
                <FileSearch className="w-4 h-4 mr-1" />
                {language === 'en' ? 'Request Freelancers' : 'طلب مستقلين'}
              </Button>
            </>
          )}
        </div>
        
        {group.status === 'negotiation' && (
          <div className="mt-3 p-2 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-700">
              {language === 'en' 
                ? '3 days remaining for negotiation - Review supplier offers'
                : 'تبقى 3 أيام على انتهاء الجولة - راجع عروض الموردين'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{language === 'en' ? 'My Groups' : 'مجموعاتي'}</h1>
            <p className="text-gray-600">
              {language === 'en' 
                ? 'Manage and track all your groups and contracts'
                : 'إدارة ومتابعة جميع مجموعاتك وعقودك'}
            </p>
          </div>
          <Button onClick={() => navigate('/create-group')}>
            <Plus className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Create Group' : 'إنشاء مجموعة'}
          </Button>
        </div>

        {/* MCP Assistant */}
        <MCPAssistant position="relative" />

        <Tabs defaultValue="created" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="created">
              {language === 'en' ? 'Groups I Created' : 'المجموعات التي أنشأتها'}
            </TabsTrigger>
            <TabsTrigger value="joined">
              {language === 'en' ? 'Groups I Joined' : 'المجموعات التي انضممت إليها'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="created" className="space-y-4">
            {createdGroups.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Users className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    {language === 'en' ? 'No groups created yet' : 'لم تنشئ أي مجموعات بعد'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {language === 'en' 
                      ? 'Create your first group to start collaborative buying or marketing'
                      : 'أنشئ مجموعتك الأولى لبدء الشراء أو التسويق التعاوني'}
                  </p>
                  <Button onClick={() => navigate('/create-group')}>
                    <Plus className="w-4 h-4 mr-2" />
                    {language === 'en' ? 'Create Your First Group' : 'أنشئ مجموعتك الأولى'}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {createdGroups.map((group) => (
                  <GroupCard key={group.id} group={group} isCreator={true} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="joined" className="space-y-4">
            {joinedGroups.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <UserPlus className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    {language === 'en' ? 'No groups joined yet' : 'لم تنضم إلى أي مجموعات بعد'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {language === 'en' 
                      ? 'Browse available groups and join ones that match your interests'
                      : 'تصفح المجموعات المتاحة وانضم للتي تناسب اهتماماتك'}
                  </p>
                  <Button onClick={() => navigate('/explore')}>
                    <Eye className="w-4 h-4 mr-2" />
                    {language === 'en' ? 'Explore Groups' : 'استكشف المجموعات'}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {joinedGroups.map((group) => (
                  <GroupCard key={group.id} group={group} isCreator={false} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default MyGroups;
