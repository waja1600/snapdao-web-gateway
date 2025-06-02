
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/Layout';
import { MCPAssistant } from '@/components/mcp/MCPAssistant';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FolderPlus, 
  Users, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Plus,
  UserPlus,
  FileText,
  BarChart3
} from 'lucide-react';
import { projectManagementService, ProjectTask, ExternalFreelancer, ProjectProposal } from '@/services/project-management-service';

const ProjectManagement = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [isInviteFreelancerOpen, setIsInviteFreelancerOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'critical',
    dueDate: '',
    projectId: 'default-project'
  });
  const [newFreelancer, setNewFreelancer] = useState({
    name: '',
    email: '',
    specialization: '',
    hourlyRate: '',
    invitedBy: 'current-user',
    projects: ['default-project']
  });

  // Mock data - in real app, this would come from the service
  const [tasks] = useState<ProjectTask[]>([
    {
      id: '1',
      projectId: 'default-project',
      title: 'تصميم واجهة المستخدم',
      description: 'تصميم واجهات المستخدم للصفحات الرئيسية',
      status: 'in_progress',
      priority: 'high',
      dueDate: new Date('2024-02-15'),
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-10'),
      assignedTo: 'designer-1'
    },
    {
      id: '2',
      projectId: 'default-project',
      title: 'تطوير API',
      description: 'تطوير واجهات برمجة التطبيقات للنظام',
      status: 'pending',
      priority: 'medium',
      dueDate: new Date('2024-02-20'),
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-05')
    }
  ]);

  const [freelancers] = useState<ExternalFreelancer[]>([
    {
      id: '1',
      name: 'أحمد محمد',
      email: 'ahmed@example.com',
      specialization: 'تطوير الويب',
      hourlyRate: 50,
      rating: 4.8,
      isVerified: true,
      canPropose: true,
      canVote: false,
      invitedBy: 'user-1',
      invitedAt: new Date('2024-01-01'),
      projects: ['default-project']
    },
    {
      id: '2',
      name: 'فاطمة علي',
      email: 'fatima@example.com',
      specialization: 'تصميم UI/UX',
      hourlyRate: 45,
      rating: 4.9,
      isVerified: true,
      canPropose: true,
      canVote: false,
      invitedBy: 'user-1',
      invitedAt: new Date('2024-01-03'),
      projects: ['default-project']
    }
  ]);

  const [proposals] = useState<ProjectProposal[]>([
    {
      id: '1',
      projectId: 'default-project',
      proposedBy: 'freelancer-1',
      title: 'تحسين أداء النظام',
      description: 'اقتراح لتحسين أداء النظام وسرعة التحميل',
      estimatedCost: 2000,
      estimatedDuration: 14,
      status: 'pending',
      createdAt: new Date('2024-01-10'),
      votes: []
    }
  ]);

  const handleCreateTask = async () => {
    if (!newTask.title || !newTask.description) return;

    const success = await projectManagementService.createTask({
      ...newTask,
      status: 'pending',
      dueDate: new Date(newTask.dueDate)
    });

    if (success) {
      setIsCreateTaskOpen(false);
      setNewTask({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
        projectId: 'default-project'
      });
    }
  };

  const handleInviteFreelancer = async () => {
    if (!newFreelancer.name || !newFreelancer.email) return;

    const success = await projectManagementService.inviteFreelancer({
      ...newFreelancer,
      hourlyRate: parseFloat(newFreelancer.hourlyRate) || undefined,
      isVerified: false,
      canPropose: true,
      canVote: false
    });

    if (success) {
      setIsInviteFreelancerOpen(false);
      setNewFreelancer({
        name: '',
        email: '',
        specialization: '',
        hourlyRate: '',
        invitedBy: 'current-user',
        projects: ['default-project']
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in_progress': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'blocked': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'blocked': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              {language === 'en' ? 'Project Management' : 'إدارة المشاريع'}
            </h1>
            <p className="text-gray-600">
              {language === 'en' 
                ? 'Manage your projects, tasks, and external freelancers'
                : 'إدارة مشاريعك ومهامك والمستقلين الخارجيين'}
            </p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isCreateTaskOpen} onOpenChange={setIsCreateTaskOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'New Task' : 'مهمة جديدة'}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {language === 'en' ? 'Create New Task' : 'إنشاء مهمة جديدة'}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="task-title">
                      {language === 'en' ? 'Title' : 'العنوان'}
                    </Label>
                    <Input
                      id="task-title"
                      value={newTask.title}
                      onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                      placeholder={language === 'en' ? 'Task title' : 'عنوان المهمة'}
                    />
                  </div>
                  <div>
                    <Label htmlFor="task-description">
                      {language === 'en' ? 'Description' : 'الوصف'}
                    </Label>
                    <Textarea
                      id="task-description"
                      value={newTask.description}
                      onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                      placeholder={language === 'en' ? 'Task description' : 'وصف المهمة'}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="task-priority">
                        {language === 'en' ? 'Priority' : 'الأولوية'}
                      </Label>
                      <Select value={newTask.priority} onValueChange={(value: any) => setNewTask({...newTask, priority: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">{language === 'en' ? 'Low' : 'منخفضة'}</SelectItem>
                          <SelectItem value="medium">{language === 'en' ? 'Medium' : 'متوسطة'}</SelectItem>
                          <SelectItem value="high">{language === 'en' ? 'High' : 'عالية'}</SelectItem>
                          <SelectItem value="critical">{language === 'en' ? 'Critical' : 'حرجة'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="task-due-date">
                        {language === 'en' ? 'Due Date' : 'تاريخ الاستحقاق'}
                      </Label>
                      <Input
                        id="task-due-date"
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleCreateTask} className="flex-1">
                      {language === 'en' ? 'Create Task' : 'إنشاء المهمة'}
                    </Button>
                    <Button variant="outline" onClick={() => setIsCreateTaskOpen(false)}>
                      {language === 'en' ? 'Cancel' : 'إلغاء'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isInviteFreelancerOpen} onOpenChange={setIsInviteFreelancerOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <UserPlus className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Invite Freelancer' : 'دعوة مستقل'}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {language === 'en' ? 'Invite External Freelancer' : 'دعوة مستقل خارجي'}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="freelancer-name">
                        {language === 'en' ? 'Name' : 'الاسم'}
                      </Label>
                      <Input
                        id="freelancer-name"
                        value={newFreelancer.name}
                        onChange={(e) => setNewFreelancer({...newFreelancer, name: e.target.value})}
                        placeholder={language === 'en' ? 'Freelancer name' : 'اسم المستقل'}
                      />
                    </div>
                    <div>
                      <Label htmlFor="freelancer-email">
                        {language === 'en' ? 'Email' : 'البريد الإلكتروني'}
                      </Label>
                      <Input
                        id="freelancer-email"
                        type="email"
                        value={newFreelancer.email}
                        onChange={(e) => setNewFreelancer({...newFreelancer, email: e.target.value})}
                        placeholder={language === 'en' ? 'Email address' : 'عنوان البريد الإلكتروني'}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="freelancer-specialization">
                      {language === 'en' ? 'Specialization' : 'التخصص'}
                    </Label>
                    <Input
                      id="freelancer-specialization"
                      value={newFreelancer.specialization}
                      onChange={(e) => setNewFreelancer({...newFreelancer, specialization: e.target.value})}
                      placeholder={language === 'en' ? 'e.g., Web Development, Design' : 'مثال: تطوير الويب، التصميم'}
                    />
                  </div>
                  <div>
                    <Label htmlFor="freelancer-rate">
                      {language === 'en' ? 'Hourly Rate (Optional)' : 'المعدل بالساعة (اختياري)'}
                    </Label>
                    <Input
                      id="freelancer-rate"
                      type="number"
                      value={newFreelancer.hourlyRate}
                      onChange={(e) => setNewFreelancer({...newFreelancer, hourlyRate: e.target.value})}
                      placeholder={language === 'en' ? 'Hourly rate in USD' : 'المعدل بالساعة بالدولار'}
                    />
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-700">
                      {language === 'en'
                        ? 'External freelancers can propose ideas but cannot vote on group decisions.'
                        : 'المستقلون الخارجيون يمكنهم اقتراح الأفكار لكن لا يمكنهم التصويت على قرارات المجموعة.'}
                    </p>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleInviteFreelancer} className="flex-1">
                      {language === 'en' ? 'Send Invitation' : 'إرسال الدعوة'}
                    </Button>
                    <Button variant="outline" onClick={() => setIsInviteFreelancerOpen(false)}>
                      {language === 'en' ? 'Cancel' : 'إلغاء'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* MCP Assistant */}
        <MCPAssistant position="relative" />

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center space-x-4">
                <FolderPlus className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-xs text-muted-foreground">
                    {language === 'en' ? 'Active Projects' : 'مشاريع نشطة'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center space-x-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-xs text-muted-foreground">
                    {language === 'en' ? 'Completed Tasks' : 'مهام مكتملة'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center space-x-4">
                <Users className="h-8 w-8 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">{freelancers.length}</p>
                  <p className="text-xs text-muted-foreground">
                    {language === 'en' ? 'Freelancers' : 'مستقلون'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center space-x-4">
                <FileText className="h-8 w-8 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">{proposals.length}</p>
                  <p className="text-xs text-muted-foreground">
                    {language === 'en' ? 'Proposals' : 'اقتراحات'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">
              {language === 'en' ? 'Overview' : 'نظرة عامة'}
            </TabsTrigger>
            <TabsTrigger value="tasks">
              {language === 'en' ? 'Tasks' : 'المهام'}
            </TabsTrigger>
            <TabsTrigger value="freelancers">
              {language === 'en' ? 'Freelancers' : 'المستقلون'}
            </TabsTrigger>
            <TabsTrigger value="proposals">
              {language === 'en' ? 'Proposals' : 'الاقتراحات'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    {language === 'en' ? 'Task Distribution' : 'توزيع المهام'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">{language === 'en' ? 'Completed' : 'مكتملة'}</span>
                      <span className="text-sm font-medium">40%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-[40%]"></div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">{language === 'en' ? 'In Progress' : 'قيد التنفيذ'}</span>
                      <span className="text-sm font-medium">35%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full w-[35%]"></div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">{language === 'en' ? 'Pending' : 'معلقة'}</span>
                      <span className="text-sm font-medium">25%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full w-[25%]"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'en' ? 'Recent Activities' : 'الأنشطة الحديثة'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <div className="flex-1">
                        <p className="text-sm">تم إكمال مهمة تصميم الواجهة</p>
                        <p className="text-xs text-gray-500">منذ ساعتين</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <UserPlus className="h-4 w-4 text-blue-500" />
                      <div className="flex-1">
                        <p className="text-sm">تم دعوة مستقل جديد</p>
                        <p className="text-xs text-gray-500">منذ 4 ساعات</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-orange-500" />
                      <div className="flex-1">
                        <p className="text-sm">اقتراح جديد للمراجعة</p>
                        <p className="text-xs text-gray-500">أمس</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <div className="grid gap-4">
              {tasks.map((task) => (
                <Card key={task.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getStatusIcon(task.status)}
                          <h3 className="font-medium">{task.title}</h3>
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {task.dueDate.toLocaleDateString(language === 'en' ? 'en-US' : 'ar-SA')}
                          </span>
                          {task.assignedTo && (
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {task.assignedTo}
                            </span>
                          )}
                        </div>
                      </div>
                      <Badge className={getStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="freelancers" className="space-y-4">
            <div className="grid gap-4">
              {freelancers.map((freelancer) => (
                <Card key={freelancer.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">{freelancer.name}</h3>
                          {freelancer.isVerified && (
                            <Badge variant="secondary">
                              {language === 'en' ? 'Verified' : 'موثق'}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{freelancer.specialization}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{freelancer.email}</span>
                          {freelancer.hourlyRate && (
                            <span>${freelancer.hourlyRate}/hr</span>
                          )}
                          {freelancer.rating && (
                            <span>⭐ {freelancer.rating}</span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-2">
                          {language === 'en' ? 'Can Propose' : 'يمكنه الاقتراح'}
                        </Badge>
                        <p className="text-xs text-gray-500">
                          {language === 'en' ? 'Invited' : 'مدعو'} {freelancer.invitedAt.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="proposals" className="space-y-4">
            <div className="grid gap-4">
              {proposals.map((proposal) => (
                <Card key={proposal.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">{proposal.title}</h3>
                          <Badge variant="outline">
                            {proposal.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{proposal.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          {proposal.estimatedCost && (
                            <span>${proposal.estimatedCost}</span>
                          )}
                          {proposal.estimatedDuration && (
                            <span>{proposal.estimatedDuration} {language === 'en' ? 'days' : 'أيام'}</span>
                          )}
                          <span>{proposal.createdAt.toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          {language === 'en' ? 'Review' : 'مراجعة'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ProjectManagement;
