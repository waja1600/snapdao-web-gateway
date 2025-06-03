
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FolderPlus, 
  Calendar, 
  Users, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export const ProjectsOverview: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  // Mock project data
  const recentProjects = [
    {
      id: '1',
      name: 'تطوير منصة التجارة الإلكترونية',
      progress: 75,
      status: 'in_progress',
      dueDate: '2024-02-15',
      teamSize: 5,
      priority: 'high'
    },
    {
      id: '2',
      name: 'تصميم هوية بصرية',
      progress: 90,
      status: 'nearly_complete',
      dueDate: '2024-01-30',
      teamSize: 3,
      priority: 'medium'
    },
    {
      id: '3',
      name: 'تطوير تطبيق الجوال',
      progress: 30,
      status: 'early_stage',
      dueDate: '2024-03-20',
      teamSize: 7,
      priority: 'high'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'nearly_complete': return 'bg-green-100 text-green-800';
      case 'early_stage': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in_progress': return language === 'en' ? 'In Progress' : 'قيد التنفيذ';
      case 'nearly_complete': return language === 'en' ? 'Nearly Complete' : 'على وشك الانتهاء';
      case 'early_stage': return language === 'en' ? 'Early Stage' : 'مرحلة مبكرة';
      default: return status;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            {language === 'en' ? 'Projects Overview' : 'نظرة عامة على المشاريع'}
          </h2>
          <p className="text-sm text-gray-600">
            {language === 'en' 
              ? 'Track your active projects and their progress'
              : 'تتبع مشاريعك النشطة وتقدمها'}
          </p>
        </div>
        <Button onClick={() => navigate('/project-management')}>
          <FolderPlus className="h-4 w-4 mr-2" />
          {language === 'en' ? 'Manage Projects' : 'إدارة المشاريع'}
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center p-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FolderPlus className="h-6 w-6 text-blue-600" />
              </div>
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
          <CardContent className="flex items-center p-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
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
          <CardContent className="flex items-center p-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">
                  {language === 'en' ? 'Team Members' : 'أعضاء الفريق'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Projects */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                {language === 'en' ? 'Recent Projects' : 'المشاريع الحديثة'}
              </CardTitle>
              <CardDescription>
                {language === 'en' 
                  ? 'Your most recent project activities'
                  : 'أحدث أنشطة مشاريعك'}
              </CardDescription>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/project-management')}
            >
              {language === 'en' ? 'View All' : 'عرض الكل'}
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{project.name}</h4>
                      {getPriorityIcon(project.priority)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(project.dueDate).toLocaleDateString(language === 'en' ? 'en-US' : 'ar-SA')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {project.teamSize} {language === 'en' ? 'members' : 'أعضاء'}
                      </span>
                    </div>
                  </div>
                  <Badge className={getStatusColor(project.status)}>
                    {getStatusText(project.status)}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      {language === 'en' ? 'Progress' : 'التقدم'}
                    </span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
