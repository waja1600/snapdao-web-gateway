import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { 
  FileText, 
  Users, 
  MessageSquare, 
  Vote, 
  Archive, 
  Upload,
  CheckCircle,
  Clock,
  AlertTriangle,
  Briefcase,
  Calendar,
  Settings,
  Globe,
  Bot,
  Video
} from 'lucide-react';
import { gpoWorkflowService, GroupWorkflow, VotingSession } from '@/services/gpo-workflow-service';
import { toast } from 'sonner';

interface EnhancedGroupRoomProps {
  groupId?: string;
}

export const EnhancedGroupRoom: React.FC<EnhancedGroupRoomProps> = ({ 
  groupId = 'demo-group-1' 
}) => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [workflow, setWorkflow] = useState<GroupWorkflow | null>(null);
  const [votingSessions, setVotingSessions] = useState<VotingSession[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeGroupRoom();
  }, [groupId]);

  const initializeGroupRoom = async () => {
    try {
      // Initialize or get existing workflow
      let groupWorkflow = gpoWorkflowService.getWorkflow(groupId);
      if (!groupWorkflow) {
        groupWorkflow = gpoWorkflowService.initializeWorkflow(groupId);
      }
      
      setWorkflow(groupWorkflow);
      
      // Get active voting sessions
      const sessions = gpoWorkflowService.getActiveVotingSessions(groupId);
      setVotingSessions(sessions);
      
    } catch (error) {
      console.error('Error initializing group room:', error);
      toast.error(language === 'ar' ? 'فشل في تحميل غرفة المجموعة' : 'Failed to load group room');
    } finally {
      setLoading(false);
    }
  };

  const handleAdvancePhase = async () => {
    if (!workflow) return;
    
    const phaseOrder = ['initial', 'loi', 'icpo', 'fco', 'dd', 'spa', 'shipping', 'completed'] as const;
    const currentIndex = phaseOrder.indexOf(workflow.phase);
    const nextPhase = phaseOrder[currentIndex + 1];
    
    if (nextPhase) {
      const success = gpoWorkflowService.advanceWorkflowPhase(groupId, nextPhase);
      if (success) {
        const updatedWorkflow = gpoWorkflowService.getWorkflow(groupId);
        setWorkflow(updatedWorkflow || workflow);
        toast.success(language === 'ar' ? 'تم تقدم المرحلة بنجاح' : 'Phase advanced successfully');
      }
    }
  };

  const handleCreateVoting = () => {
    const newVoting = gpoWorkflowService.createVotingSession({
      groupId,
      type: 'simple',
      title: language === 'ar' ? 'تصويت على المرحلة التالية' : 'Vote on Next Phase',
      description: language === 'ar' ? 'هل تريد المتابعة إلى المرحلة التالية؟' : 'Do you want to proceed to the next phase?',
      options: [
        { id: 'yes', title: language === 'ar' ? 'نعم' : 'Yes' },
        { id: 'no', title: language === 'ar' ? 'لا' : 'No' }
      ],
      votingMethod: '1person1vote'
    });
    
    setVotingSessions(prev => [...prev, newVoting]);
    toast.success(language === 'ar' ? 'تم إنشاء جلسة التصويت' : 'Voting session created');
  };

  const getPhaseProgress = (): number => {
    if (!workflow) return 0;
    
    const phases = ['initial', 'loi', 'icpo', 'fco', 'dd', 'spa', 'shipping', 'completed'];
    const currentIndex = phases.indexOf(workflow.phase);
    return ((currentIndex + 1) / phases.length) * 100;
  };

  const getPhaseColor = (phase: string): string => {
    const colors: Record<string, string> = {
      initial: 'bg-blue-100 text-blue-800',
      loi: 'bg-purple-100 text-purple-800',
      icpo: 'bg-orange-100 text-orange-800',
      fco: 'bg-yellow-100 text-yellow-800',
      dd: 'bg-indigo-100 text-indigo-800',
      spa: 'bg-green-100 text-green-800',
      shipping: 'bg-teal-100 text-teal-800',
      completed: 'bg-gray-100 text-gray-800'
    };
    return colors[phase] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>{language === 'ar' ? 'جاري التحميل...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  if (!workflow) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <p className="text-gray-600">
          {language === 'ar' ? 'فشل في تحميل بيانات المجموعة' : 'Failed to load group data'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Progress */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {language === 'ar' ? 'غرفة المجموعة الذكية' : 'Smart Group Room'}
            </h1>
            <p className="text-blue-100">
              {language === 'ar' ? 'إدارة متقدمة للمجموعات التعاونية' : 'Advanced Cooperative Group Management'}
            </p>
          </div>
          <Badge className={getPhaseColor(workflow.phase)}>
            {workflow.phase.toUpperCase()}
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{language === 'ar' ? 'التقدم' : 'Progress'}</span>
            <span>{Math.round(getPhaseProgress())}% {language === 'ar' ? 'مكتمل' : 'Complete'}</span>
          </div>
          <Progress value={getPhaseProgress()} className="h-3" />
          <div className="flex justify-between text-xs text-blue-100">
            <span>{workflow.currentStep}</span>
            <span>{workflow.phase === 'completed' ? (language === 'ar' ? 'مكتمل' : 'Completed') : (language === 'ar' ? 'جاري' : 'In Progress')}</span>
          </div>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-9">
          <TabsTrigger value="overview">
            {language === 'ar' ? 'نظرة عامة' : 'Overview'}
          </TabsTrigger>
          <TabsTrigger value="members">
            {language === 'ar' ? 'الأعضاء' : 'Members'}
          </TabsTrigger>
          <TabsTrigger value="discussions">
            {language === 'ar' ? 'النقاشات' : 'Discussions'}
          </TabsTrigger>
          <TabsTrigger value="voting">
            {language === 'ar' ? 'التصويت' : 'Voting'}
          </TabsTrigger>
          <TabsTrigger value="offers">
            {language === 'ar' ? 'العروض' : 'Offers'}
          </TabsTrigger>
          <TabsTrigger value="ipfs">
            {language === 'ar' ? 'المستندات' : 'IPFS Vault'}
          </TabsTrigger>
          <TabsTrigger value="bots">
            {language === 'ar' ? 'الروبوتات' : 'AI Bots'}
          </TabsTrigger>
          <TabsTrigger value="meetings">
            {language === 'ar' ? 'الاجتماعات' : 'Meetings'}
          </TabsTrigger>
          <TabsTrigger value="legal">
            {language === 'ar' ? 'القانونية' : 'Legal'}
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  {language === 'ar' ? 'المرحلة الحالية' : 'Current Phase'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">{workflow.currentStep}</h3>
                  <ul className="space-y-1">
                    {workflow.nextSteps.map((step, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button onClick={handleAdvancePhase} className="w-full">
                  {language === 'ar' ? 'تقدم إلى المرحلة التالية' : 'Advance to Next Phase'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {language === 'ar' ? 'المستندات الأخيرة' : 'Recent Documents'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {workflow.documents.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    {language === 'ar' ? 'لا توجد مستندات بعد' : 'No documents yet'}
                  </p>
                ) : (
                  <div className="space-y-2">
                    {workflow.documents.slice(-3).map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div>
                          <p className="font-medium">{doc.title}</p>
                          <p className="text-xs text-gray-500">{doc.type.toUpperCase()}</p>
                        </div>
                        <Badge variant="outline">{doc.status}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Members Tab */}
        <TabsContent value="members" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {language === 'ar' ? 'إدارة المجموعة' : 'Group Management'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  {language === 'ar' 
                    ? 'سيتم انتخاب 3 مدراء للمجموعة بالتناوب'
                    : '3 rotating managers will be elected for this group'}
                </p>
                <Button variant="outline" className="w-full">
                  {language === 'ar' ? 'بدء انتخاب المدراء' : 'Start Manager Election'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  {language === 'ar' ? 'دعوة بالبريد الإلكتروني' : 'Email Invitations'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  {language === 'ar' 
                    ? 'دعوة أطراف خارجية للانضمام'
                    : 'Invite external stakeholders to join'}
                </p>
                <Button variant="outline" className="w-full">
                  {language === 'ar' ? 'إرسال دعوات' : 'Send Invitations'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Discussions Tab */}
        <TabsContent value="discussions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                {language === 'ar' ? 'نقاشات المجموعة' : 'Group Discussions'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg min-h-[200px]">
                <p className="text-gray-500 text-center">
                  {language === 'ar' ? 'النقاشات ستظهر هنا' : 'Discussions will appear here'}
                </p>
              </div>
              <div className="flex gap-2">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={language === 'ar' ? 'اكتب رسالتك...' : 'Type your message...'}
                  className="flex-1"
                />
                <Button>
                  {language === 'ar' ? 'إرسال' : 'Send'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Voting Tab */}
        <TabsContent value="voting" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">
              {language === 'ar' ? 'جلسات التصويت' : 'Voting Sessions'}
            </h3>
            <Button onClick={handleCreateVoting}>
              {language === 'ar' ? 'إنشاء تصويت' : 'Create Vote'}
            </Button>
          </div>

          {votingSessions.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <Vote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    {language === 'ar' ? 'لا توجد جلسات تصويت نشطة' : 'No active voting sessions'}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {votingSessions.map((session) => (
                <Card key={session.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{session.title}</span>
                      <Badge>{session.type}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{session.description}</p>
                    <div className="space-y-2">
                      {session.options.map((option) => (
                        <Button key={option.id} variant="outline" className="w-full justify-start">
                          {option.title}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* AI Bots Tab */}
        <TabsContent value="bots" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  {language === 'ar' ? 'مساعد MCP' : 'MCP Assistant'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  {language === 'ar' 
                    ? 'تنبيهات المجموعة والتوجيه الذكي'
                    : 'Group alerts and smart guidance'}
                </p>
                <Button variant="outline" className="w-full">
                  {language === 'ar' ? 'تفعيل المساعد' : 'Activate Assistant'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  {language === 'ar' ? 'روبوت السوق' : 'Market Bot'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  {language === 'ar' 
                    ? 'البحث عن موردين عالميين'
                    : 'Global supplier discovery'}
                </p>
                <Button variant="outline" className="w-full">
                  {language === 'ar' ? 'بحث عن موردين' : 'Search Suppliers'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Meetings Tab */}
        <TabsContent value="meetings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                {language === 'ar' ? 'اجتماعات Zoom' : 'Zoom Meetings'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                {language === 'ar' 
                  ? 'متاح للمدراء المنتخبين الثلاثة'
                  : 'Available for 3 elected managers'}
              </p>
              <Button variant="outline" className="w-full">
                {language === 'ar' ? 'جدولة اجتماع' : 'Schedule Meeting'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tabs would be implemented similarly */}
        <TabsContent value="offers">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <p className="text-gray-600">
                  {language === 'ar' ? 'قسم العروض قيد التطوير' : 'Offers section under development'}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ipfs">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Archive className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  {language === 'ar' ? 'خزنة IPFS للمستندات' : 'IPFS Document Vault'}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {gpoWorkflowService.generateIPFSPath(groupId, workflow.phase)}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="legal">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <p className="text-gray-600">
                  {language === 'ar' ? 'الروبوت القانوني قيد التطوير' : 'Legal Bot under development'}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
