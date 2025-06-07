
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, User, AlertCircle, CheckCircle, Clock, FileText } from 'lucide-react';

export const ProjectsOverview: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  // Mock data for demonstration
  const tasks = [
    {
      id: '1',
      title: language === 'en' ? 'Website Development' : 'تطوير الموقع الإلكتروني',
      status: 'in_progress',
      assigneeName: language === 'en' ? 'Ahmed Ali' : 'أحمد علي',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      title: language === 'en' ? 'Mobile App Design' : 'تصميم تطبيق الهاتف',
      status: 'pending',
      assigneeName: language === 'en' ? 'Sara Mohammed' : 'سارة محمد',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      title: language === 'en' ? 'Database Setup' : 'إعداد قاعدة البيانات',
      status: 'completed',
      assigneeName: language === 'en' ? 'Omar Hassan' : 'عمر حسن',
      dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    }
  ];

  const proposals = [
    {
      id: '1',
      status: 'pending',
      title: language === 'en' ? 'New Feature Proposal' : 'مقترح ميزة جديدة'
    },
    {
      id: '2',
      status: 'approved',
      title: language === 'en' ? 'Budget Increase' : 'زيادة الميزانية'
    }
  ];

  const freelancers = [
    { id: '1', name: language === 'en' ? 'John Doe' : 'جون دو' },
    { id: '2', name: language === 'en' ? 'Jane Smith' : 'جين سميث' },
    { id: '3', name: language === 'en' ? 'Ali Ahmed' : 'علي أحمد' }
  ];

  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in_progress').length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingProposals = proposals.filter(proposal => proposal.status === 'pending').length;

  const recentTasks = tasks.slice(0, 3);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in_progress': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'pending': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return language === 'en' ? 'Completed' : 'مكتملة';
      case 'in_progress': return language === 'en' ? 'In Progress' : 'قيد التنفيذ';
      case 'pending': return language === 'en' ? 'Pending' : 'قيد الانتظار';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === 'en' ? 'Pending Tasks' : 'المهام المعلقة'}
                </p>
                <p className="text-2xl font-bold">{pendingTasks}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === 'en' ? 'In Progress' : 'قيد التنفيذ'}
                </p>
                <p className="text-2xl font-bold">{inProgressTasks}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === 'en' ? 'Completed' : 'مكتملة'}
                </p>
                <p className="text-2xl font-bold">{completedTasks}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === 'en' ? 'External Freelancers' : 'المستقلون الخارجيون'}
                </p>
                <p className="text-2xl font-bold">{freelancers.length}</p>
              </div>
              <User className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Tasks */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              {language === 'en' ? 'Recent Tasks' : 'المهام الحديثة'}
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/project-management')}
            >
              {language === 'en' ? 'View All' : 'عرض الكل'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTasks.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                {language === 'en' ? 'No tasks found' : 'لا توجد مهام'}
              </p>
            ) : (
              recentTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{task.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      {task.assigneeName && (
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{task.assigneeName}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{task.dueDate.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(task.status)}
                    <span className="text-sm">{getStatusText(task.status)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Pending Proposals Alert */}
      {pendingProposals > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
                <div>
                  <h3 className="font-medium">
                    {language === 'en' ? 'Pending Proposals' : 'مقترحات معلقة'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === 'en' 
                      ? `You have ${pendingProposals} proposal(s) awaiting review`
                      : `لديك ${pendingProposals} مقترح(ات) في انتظار المراجعة`}
                  </p>
                </div>
              </div>
              <Button onClick={() => navigate('/project-management')}>
                {language === 'en' ? 'Review' : 'مراجعة'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
