
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Workflow, 
  Users, 
  FileText, 
  BarChart3, 
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Plus
} from 'lucide-react';
import { MCPAssistant } from '@/components/mcp/MCPAssistant';

export const WorkspaceMainContent: React.FC = () => {
  const { language } = useLanguage();

  const activeWorkflows = [
    {
      id: 1,
      title: language === 'ar' ? 'إعداد مشروع التجارة الإلكترونية' : 'E-commerce Project Setup',
      status: 'in_progress',
      progress: 65,
      assignee: 'أحمد محمد',
      dueDate: '2024-01-15'
    },
    {
      id: 2,
      title: language === 'ar' ? 'تقييم الموردين الجدد' : 'New Supplier Evaluation',
      status: 'pending',
      progress: 30,
      assignee: 'فاطمة علي',
      dueDate: '2024-01-20'
    },
    {
      id: 3,
      title: language === 'ar' ? 'مراجعة العقود القانونية' : 'Legal Contract Review',
      status: 'completed',
      progress: 100,
      assignee: 'محمد سالم',
      dueDate: '2024-01-10'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'workflow_created',
      title: language === 'ar' ? 'تم إنشاء سير عمل جديد' : 'New workflow created',
      description: language === 'ar' ? 'سير عمل "تطوير التطبيق"' : '"App Development" workflow',
      time: '10 دقائق',
      user: 'سارة أحمد'
    },
    {
      id: 2,
      type: 'task_completed',
      title: language === 'ar' ? 'تم إكمال مهمة' : 'Task completed',
      description: language === 'ar' ? 'مراجعة التصميمات النهائية' : 'Final design review',
      time: '30 دقيقة',
      user: 'خالد محمد'
    },
    {
      id: 3,
      type: 'proposal_submitted',
      title: language === 'ar' ? 'تم تقديم مقترح جديد' : 'New proposal submitted',
      description: language === 'ar' ? 'مقترح تحسين الأداء' : 'Performance improvement proposal',
      time: '1 ساعة',
      user: 'نور سالم'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in_progress': return <Clock className="h-4 w-4" />;
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">
                  {language === 'ar' ? 'المهام النشطة' : 'Active Tasks'}
                </p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Workflow className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">
                  {language === 'ar' ? 'أعضاء الفريق' : 'Team Members'}
                </p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Users className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">
                  {language === 'ar' ? 'المشاريع' : 'Projects'}
                </p>
                <p className="text-2xl font-bold">5</p>
              </div>
              <FileText className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">
                  {language === 'ar' ? 'معدل الإنجاز' : 'Completion Rate'}
                </p>
                <p className="text-2xl font-bold">87%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Workflows */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Workflow className="h-5 w-5" />
                {language === 'ar' ? 'سير العمل النشط' : 'Active Workflows'}
              </CardTitle>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                {language === 'ar' ? 'جديد' : 'New'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeWorkflows.map((workflow) => (
                <div key={workflow.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">{workflow.title}</h3>
                    <Badge className={getStatusColor(workflow.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(workflow.status)}
                        {language === 'ar' ? 
                          (workflow.status === 'completed' ? 'مكتمل' : 
                           workflow.status === 'in_progress' ? 'قيد التنفيذ' : 'معلق') :
                          workflow.status.replace('_', ' ')
                        }
                      </div>
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{language === 'ar' ? 'المسؤول:' : 'Assignee:'} {workflow.assignee}</span>
                      <span>{language === 'ar' ? 'الموعد النهائي:' : 'Due:'} {workflow.dueDate}</span>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{language === 'ar' ? 'التقدم' : 'Progress'}</span>
                        <span>{workflow.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${workflow.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              {language === 'ar' ? 'النشاطات الأخيرة' : 'Recent Activities'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                    <p className="text-xs text-gray-600 mb-1">{activity.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{activity.user}</span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>{language === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Workflow className="h-6 w-6" />
              <span className="text-sm">{language === 'ar' ? 'سير عمل جديد' : 'New Workflow'}</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Users className="h-6 w-6" />
              <span className="text-sm">{language === 'ar' ? 'إضافة عضو' : 'Add Member'}</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <FileText className="h-6 w-6" />
              <span className="text-sm">{language === 'ar' ? 'مقترح جديد' : 'New Proposal'}</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Calendar className="h-6 w-6" />
              <span className="text-sm">{language === 'ar' ? 'جدولة اجتماع' : 'Schedule Meeting'}</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* MCP AI Assistant */}
      <MCPAssistant />
    </div>
  );
};
