
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MCPWorkflowService, WorkflowStep, WorkflowTemplate } from '@/services/mcp-workflow-service';
import { 
  Play, 
  Pause, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Users, 
  BarChart3,
  Plus,
  Workflow,
  GitBranch
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const WorkflowDashboard: React.FC = () => {
  const { language } = useLanguage();
  const [workflowService] = useState(() => new MCPWorkflowService());
  const [workflows, setWorkflows] = useState<WorkflowStep[]>([]);
  const [templates, setTemplates] = useState<WorkflowTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  useEffect(() => {
    // Initialize with sample data
    setWorkflows(workflowService.getAllWorkflows());
    setTemplates(workflowService.getAvailableTemplates());
  }, [workflowService]);

  const progress = workflowService.getWorkflowProgress();

  const getStatusIcon = (status: WorkflowStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in_progress':
        return <Play className="h-4 w-4 text-blue-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'blocked':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: WorkflowStep['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'blocked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateFromTemplate = (templateId: string) => {
    const newSteps = workflowService.createWorkflowFromTemplate(templateId);
    setWorkflows([...workflows, ...newSteps]);
  };

  const handleUpdateStep = (stepId: string, newStatus: WorkflowStep['status']) => {
    workflowService.updateWorkflowStep(stepId, { status: newStatus });
    setWorkflows(workflowService.getAllWorkflows());
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'إجمالي المهام' : 'Total Tasks'}
                </p>
                <p className="text-2xl font-bold text-gray-900">{progress.total}</p>
              </div>
              <Workflow className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'المهام المكتملة' : 'Completed'}
                </p>
                <p className="text-2xl font-bold text-green-600">{progress.completed}</p>
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
                  {language === 'ar' ? 'نسبة الإنجاز' : 'Progress'}
                </p>
                <p className="text-2xl font-bold text-blue-600">{progress.percentage}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'المهام النشطة' : 'Active Tasks'}
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {workflowService.getWorkflowsByStatus('in_progress').length}
                </p>
              </div>
              <Play className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            {language === 'ar' ? 'تقدم سير العمل الإجمالي' : 'Overall Workflow Progress'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{language === 'ar' ? 'التقدم الإجمالي' : 'Overall Progress'}</span>
              <span>{progress.completed}/{progress.total} ({progress.percentage}%)</span>
            </div>
            <Progress value={progress.percentage} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">
            {language === 'ar' ? 'المهام النشطة' : 'Active Tasks'}
          </TabsTrigger>
          <TabsTrigger value="templates">
            {language === 'ar' ? 'قوالب سير العمل' : 'Workflow Templates'}
          </TabsTrigger>
          <TabsTrigger value="completed">
            {language === 'ar' ? 'المهام المكتملة' : 'Completed Tasks'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {workflows.filter(w => w.status !== 'completed').length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <Workflow className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  {language === 'ar' 
                    ? 'لا توجد مهام نشطة حالياً. ابدأ بإنشاء سير عمل جديد!'
                    : 'No active tasks currently. Start by creating a new workflow!'}
                </p>
              </CardContent>
            </Card>
          ) : (
            workflows
              .filter(w => w.status !== 'completed')
              .map((workflow) => (
                <Card key={workflow.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getStatusIcon(workflow.status)}
                          <h3 className="font-semibold">{workflow.title}</h3>
                          <Badge className={getStatusColor(workflow.status)}>
                            {workflow.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{workflow.description}</p>
                        
                        {workflow.dependencies.length > 0 && (
                          <div className="mb-3">
                            <p className="text-sm font-medium text-gray-700 mb-1">
                              {language === 'ar' ? 'يعتمد على:' : 'Depends on:'}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {workflow.dependencies.map((dep, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {dep}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {workflow.estimatedDuration}h {language === 'ar' ? 'تقدير' : 'estimated'}
                          </span>
                          {workflow.assignedTo && (
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {workflow.assignedTo}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        {workflow.status === 'pending' && (
                          <Button
                            size="sm"
                            onClick={() => handleUpdateStep(workflow.id, 'in_progress')}
                          >
                            <Play className="h-4 w-4 mr-1" />
                            {language === 'ar' ? 'بدء' : 'Start'}
                          </Button>
                        )}
                        {workflow.status === 'in_progress' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateStep(workflow.id, 'completed')}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            {language === 'ar' ? 'إنهاء' : 'Complete'}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
          )}
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{template.name}</span>
                    <Badge variant="outline">{template.category}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{template.description}</p>
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      {language === 'ar' ? 'المراحل:' : 'Steps:'}
                    </p>
                    <div className="space-y-1">
                      {template.steps.slice(0, 3).map((step, index) => (
                        <div key={index} className="text-sm text-gray-600 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          {step.title}
                        </div>
                      ))}
                      {template.steps.length > 3 && (
                        <div className="text-sm text-gray-500">
                          +{template.steps.length - 3} {language === 'ar' ? 'مراحل أخرى' : 'more steps'}
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => handleCreateFromTemplate(template.id)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {language === 'ar' ? 'استخدام القالب' : 'Use Template'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {workflowService.getWorkflowsByStatus('completed').length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  {language === 'ar' 
                    ? 'لا توجد مهام مكتملة بعد.'
                    : 'No completed tasks yet.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            workflowService.getWorkflowsByStatus('completed').map((workflow) => (
              <Card key={workflow.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <h3 className="font-semibold">{workflow.title}</h3>
                        <Badge className="bg-green-100 text-green-800">
                          {language === 'ar' ? 'مكتمل' : 'Completed'}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{workflow.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>
                          {language === 'ar' ? 'اكتمل في:' : 'Completed on:'} {workflow.updatedAt.toLocaleDateString()}
                        </span>
                        {workflow.actualDuration && (
                          <span>
                            {language === 'ar' ? 'المدة الفعلية:' : 'Actual duration:'} {workflow.actualDuration}h
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
