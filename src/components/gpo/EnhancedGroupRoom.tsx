
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { gpoLifecycleService } from '@/services/gpo-lifecycle-service';
import { AdminPanel } from './AdminPanel';
import { JoinRequestModal } from './JoinRequestModal';
import { MCPAssistant } from '@/components/mcp/MCPAssistant';
import { 
  Users, 
  Vote, 
  FileText, 
  MessageCircle, 
  Settings, 
  AlertTriangle,
  Crown,
  Shield,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';

interface GroupRoomData {
  group: any;
  members: any[];
  votingSessions: any[];
  userAccess: {
    level: string;
    role: string;
    canViewDetails: boolean;
    canParticipate: boolean;
    isAdmin: boolean;
  };
}

export const EnhancedGroupRoom: React.FC = () => {
  const { id: groupId } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const [roomData, setRoomData] = useState<GroupRoomData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const currentUserId = 'current-user'; // Would come from auth context

  useEffect(() => {
    if (groupId) {
      loadGroupRoomData();
    }
  }, [groupId]);

  const loadGroupRoomData = async () => {
    if (!groupId) return;
    
    setLoading(true);
    const result = await gpoLifecycleService.getGroupRoomData(groupId, currentUserId);
    
    if (result.success) {
      setRoomData(result.data);
    } else {
      toast.error('فشل في تحميل بيانات المجموعة');
    }
    setLoading(false);
  };

  const handleJoinRequest = async () => {
    if (!groupId) return;
    
    const result = await gpoLifecycleService.requestToJoinGroup(groupId, currentUserId, 1000);
    if (result.success) {
      setShowJoinModal(false);
      loadGroupRoomData();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!roomData) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium">لا يمكن الوصول إلى المجموعة</h3>
      </div>
    );
  }

  const { group, members, votingSessions, userAccess } = roomData;

  // If user is not a member, show join option
  if (userAccess.level === 'no_access') {
    return (
      <div className="max-w-2xl mx-auto mt-12">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{group.name}</CardTitle>
            <p className="text-gray-600">{group.description}</p>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">النوع:</span>
                <p>{group.type}</p>
              </div>
              <div>
                <span className="font-medium">الأعضاء:</span>
                <p>{members.length}/{group.max_members}</p>
              </div>
            </div>
            <Button onClick={() => setShowJoinModal(true)} className="w-full">
              <Users className="h-4 w-4 mr-2" />
              طلب الانضمام للمجموعة
            </Button>
          </CardContent>
        </Card>

        <JoinRequestModal 
          isOpen={showJoinModal}
          onClose={() => setShowJoinModal(false)}
          onConfirm={handleJoinRequest}
          group={group}
        />
      </div>
    );
  }

  // If user is awaiting approval, show limited view
  if (userAccess.level === 'awaiting_approval') {
    return (
      <div className="max-w-2xl mx-auto mt-12">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{group.name}</CardTitle>
            <Badge className="bg-yellow-100 text-yellow-800">
              في انتظار الموافقة
            </Badge>
          </CardHeader>
          <CardContent className="text-center">
            <Clock className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <p className="text-gray-600">
              طلبك قيد المراجعة من قبل مشرفي المجموعة
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Full group room interface for active members
  return (
    <div className="space-y-6">
      {/* Group Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <CardTitle className="text-2xl">{group.name}</CardTitle>
                {userAccess.isAdmin && (
                  <Badge className="bg-purple-100 text-purple-800">
                    <Crown className="h-3 w-3 mr-1" />
                    مشرف
                  </Badge>
                )}
              </div>
              <p className="text-gray-600 mt-2">{group.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{members.length}/{group.max_members} عضو</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>المرحلة: {group.current_phase}</span>
                </div>
                <div>
                  <span>النقاط المطلوبة: {group.points_required}</span>
                </div>
                <div>
                  <Badge className="bg-green-100 text-green-800">
                    {group.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Admin Panel - Only visible to admins */}
      {userAccess.isAdmin && (
        <AdminPanel groupId={groupId!} onDataChange={loadGroupRoomData} />
      )}

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">
            نظرة عامة
          </TabsTrigger>
          <TabsTrigger value="discussions">
            <MessageCircle className="h-4 w-4 mr-2" />
            النقاشات
          </TabsTrigger>
          <TabsTrigger value="voting">
            <Vote className="h-4 w-4 mr-2" />
            التصويت
          </TabsTrigger>
          <TabsTrigger value="contracts">
            <FileText className="h-4 w-4 mr-2" />
            العقود
          </TabsTrigger>
          <TabsTrigger value="members">
            <Users className="h-4 w-4 mr-2" />
            الأعضاء
          </TabsTrigger>
          <TabsTrigger value="assistant">
            مساعد MCP
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{members.length}</div>
                  <div className="text-sm text-gray-600">الأعضاء النشطون</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{votingSessions.length}</div>
                  <div className="text-sm text-gray-600">التصويتات النشطة</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {group.current_phase}
                  </div>
                  <div className="text-sm text-gray-600">المرحلة الحالية</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Phase Progress */}
          <Card>
            <CardHeader>
              <CardTitle>تقدم المرحلة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>المرحلة: {group.current_phase}</span>
                  <span>65% مكتملة</span>
                </div>
                <Progress value={65} className="h-2" />
                <p className="text-sm text-gray-600">
                  الإجراءات المطلوبة: مراجعة العقد، التصويت على الشروط
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discussions">
          <Card>
            <CardHeader>
              <CardTitle>لوحة النقاشات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">لوحة النقاشات قيد التطوير...</p>
                <Button variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  بدء نقاش جديد
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="voting">
          <div className="space-y-4">
            {votingSessions.map((session) => (
              <Card key={session.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Vote className="h-5 w-5" />
                    {session.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{session.description}</p>
                  <div className="space-y-2">
                    {session.options?.map((option: string, index: number) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Vote className="h-4 w-4 mr-2" />
                        {option}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {votingSessions.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <Vote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">لا توجد تصويتات نشطة حالياً</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="contracts">
          <Card>
            <CardHeader>
              <CardTitle>العقود والملفات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">قسم العقود والملفات قيد التطوير...</p>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  رفع ملف جديد
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members">
          <Card>
            <CardHeader>
              <CardTitle>قائمة الأعضاء</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {members.map((member) => (
                  <div key={member.user_id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="font-semibold">
                          {member.profiles?.full_name?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium">
                          {member.profiles?.full_name || 'مستخدم'}
                        </div>
                        <div className="text-sm text-gray-600">{member.role}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={member.status === 'active' ? 'default' : 'secondary'}
                      >
                        {member.status}
                      </Badge>
                      {member.role === 'admin' && (
                        <Crown className="h-4 w-4 text-purple-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assistant">
          <Card>
            <CardHeader>
              <CardTitle>مساعد MCP الذكي</CardTitle>
            </CardHeader>
            <CardContent>
              <MCPAssistant />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
