
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { MCPWorkflowService, WorkflowStep, WorkflowTemplate } from '@/services/mcp-workflow-service';
import { 
  Play, 
  Pause, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Users, 
  Calendar,
  TrendingUp
} from 'lucide-react';
import { toast } from 'sonner';

const workflowService = new MCPWorkflowService();

export const WorkflowDashboard: React.FC = () => {
  const { language } = useLanguage();
  const [workflows, setWorkflows] = useState<WorkflowStep[]>(workflowService.getAllWorkflows());
  const [templates, setTemplates] = useState<WorkflowTemplate[]>(workflowService.getAvailableTemplates());
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  const progress = workflowService.getWorkflowProgress();

  const getStatusIcon = (status: WorkflowStep['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in_progress': return <Play className="h-4 w-4 text-blue-500" />;
      case 'blocked': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: WorkflowStep['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'blocked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: WorkflowStep['status']) => {
    switch (status) {
      case 'completed': return language === 'ar' ? 'مكتمل' : 'Completed';
      case 'in_progress': return language === 'ar' ? 'قيد التنفيذ' : 'In Progress';
      case 'blocked': return language === 'ar' ? 'محجوب' : 'Blocked';
      default: return language === 'ar' ? 'معلق' : 'Pending';
    }
  };

  const handleStatusUpdate = (stepId: string, newStatus: WorkflowStep['status']) => {
    const success = workflowService.updateWorkflowStep(stepId, { status: newStatus });
    if (success) {
      setWorkflows(workflowService.getAllWorkflows());
      toast.success(language === 'ar' ? 'تم تحديث حالة المرحلة' : 'Step status updated');
    }
  };

  const handleCreateFromTemplate = (templateId: string) => {
    const newSteps = workflowService.createWorkflowFromTemplate(templateId);
    if (newSteps.length > 0) {
      setWorkflows(workflowService.getAllWorkflows());
      toast.success(language === 'ar' ? 'تم إنشاء سير العمل بنجاح' : 'Workflow created successfully');
    }
  };

  return (
    <div className="space-y-6">
      {/* نظرة عامة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'التقدم العام' : 'Overall Progress'}
                </p>
                <p className="text-2xl font-bold">{progress.percentage}%</p>
              </div>
            </div>
            <Progress value={progress.percentage} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'المهام المكتملة' : 'Completed Tasks'}
                </p>
                <p className="text-2xl font-bold">{progress.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'المهام المعلقة' : 'Pending Tasks'}
                </p>
                <p className="text-2xl font-bold">
                  {workflowService.getWorkflowsByStatus('pending').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Play className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'قيد التنفيذ' : 'In Progress'}
                </p>
                <p className="text-2xl font-bold">
                  {workflowService.getWorkflowsByStatus('in_progress').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="workflows" className="space-y-4">
        <TabsList>
          <TabsTrigger value="workflows">
            {language === 'ar' ? 'سير العمل الحالي' : 'Current Workflows'}
          </TabsTrigger>
          <TabsTrigger value="templates">
            {language === 'ar' ? 'القوالب' : 'Templates'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="workflows" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {language === 'ar' ? 'مراحل سير العمل' : 'Workflow Steps'}
            </h2>
          </div>

          <div className="grid gap-4">
            {workflows.map((step) => (
              <Card key={step.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(step.status)}
                        <h3 className="font-medium text-lg">{step.title}</h3>
                        <Badge className={getStatusColor(step.status)}>
                          {getStatusText(step.status)}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{step.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>
                            {step.estimatedDuration}h 
                            {language === 'ar' ? ' المدة المقدرة' : ' estimated'}
                          </span>
                        </div>
                        {step.assignedTo && (
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{step.assignedTo}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{step.createdAt.toLocaleDateString()}</span>
                        </div>
                      </div>

                      {step.dependencies.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs text-gray-500 mb-1">
                            {language === 'ar' ? 'يعتمد على:' : 'Depends on:'}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {step.dependencies.map((dep, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {dep}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {step.status === 'pending' && (
                        <Button 
                          size="sm"
                          onClick={() => handleStatusUpdate(step.id, 'in_progress')}
                        >
                          <Play className="h-4 w-4 mr-1" />
                          {language === 'ar' ? 'بدء' : 'Start'}
                        </Button>
                      )}
                      {step.status === 'in_progress' && (
                        <>
                          <Button 
                            size="sm"
                            onClick={() => handleStatusUpdate(step.id, 'completed')}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            {language === 'ar' ? 'إكمال' : 'Complete'}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleStatusUpdate(step.id, 'pending')}
                          >
                            <Pause className="h-4 w-4 mr-1" />
                            {language === 'ar' ? 'إيقاف' : 'Pause'}
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {workflows.length === 0 && (
              <Card>
                <CardContent className="pt-6 text-center">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">
                    {language === 'ar' 
                      ? 'لا يوجد سير عمل حالياً. ابدأ بإنشاء واحد من القوالب.'
                      : 'No workflows currently. Start by creating one from templates.'}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {language === 'ar' ? 'قوالب سير العمل' : 'Workflow Templates'}
            </h2>
          </div>

          <div className="grid gap-4">
            {templates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <p className="text-gray-600 mt-1">{template.description}</p>
                    </div>
                    <Button onClick={() => handleCreateFromTemplate(template.id)}>
                      {language === 'ar' ? 'استخدام القالب' : 'Use Template'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">
                      {language === 'ar' ? 'الخطوات:' : 'Steps:'}
                    </p>
                    {template.steps.slice(0, 3).map((step, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </span>
                        <span>{step.title}</span>
                      </div>
                    ))}
                    {template.steps.length > 3 && (
                      <p className="text-xs text-gray-500">
                        {language === 'ar' 
                          ? `+${template.steps.length - 3} خطوات أخرى`
                          : `+${template.steps.length - 3} more steps`}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
