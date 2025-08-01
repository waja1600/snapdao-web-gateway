
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, AlertCircle, ArrowRight, Star } from 'lucide-react';
import { UserWorkflowService, WorkflowStep, UserWorkflow } from '@/services/user-workflow-service';
import { useNavigate } from 'react-router-dom';

const UserProgressTracker: React.FC = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userWorkflow, setUserWorkflow] = useState<UserWorkflow | null>(null);

  useEffect(() => {
    if (user) {
      const userRole = user.user_metadata?.role || 'user';
      let workflow = UserWorkflowService.getUserWorkflow(user.id);
      
      if (!workflow) {
        workflow = UserWorkflowService.initializeUserWorkflow(user.id, userRole);
      }
      
      setUserWorkflow(workflow);
    }
  }, [user]);

  const getStepIcon = (step: WorkflowStep) => {
    switch (step.status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-blue-600 animate-spin" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStepStatusBadge = (step: WorkflowStep) => {
    const variants = {
      completed: 'default',
      in_progress: 'secondary',
      failed: 'destructive',
      pending: 'outline'
    } as const;

    const labels = {
      completed: language === 'ar' ? 'مكتمل' : 'Completed',
      in_progress: language === 'ar' ? 'قيد التنفيذ' : 'In Progress',
      failed: language === 'ar' ? 'فشل' : 'Failed',
      pending: language === 'ar' ? 'في الانتظار' : 'Pending'
    };

    return (
      <Badge variant={variants[step.status] || 'outline'}>
        {labels[step.status] || step.status}
      </Badge>
    );
  };

  const handleStepAction = (step: WorkflowStep) => {
    if (step.route) {
      navigate(step.route);
    } else if (step.type === 'verification' || step.type === 'approval') {
      // Mark as in progress
      UserWorkflowService.updateStepStatus(userWorkflow!.userId, step.id, 'in_progress');
      setUserWorkflow(UserWorkflowService.getUserWorkflow(userWorkflow!.userId));
    }
  };

  if (!userWorkflow) {
    return <div>Loading...</div>;
  }

  const progress = UserWorkflowService.getWorkflowProgress(userWorkflow.userId);
  const nextSteps = UserWorkflowService.getNextSteps(userWorkflow.userId);
  const completedSteps = UserWorkflowService.getCompletedSteps(userWorkflow.userId);

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <span>
              {language === 'ar' ? 'تقدمك في المنصة' : 'Your Platform Progress'}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">
              {progress}% {language === 'ar' ? 'مكتمل' : 'Complete'}
            </span>
            <span className="text-sm text-gray-600">
              {completedSteps.length} / {userWorkflow.workflow.length} {language === 'ar' ? 'خطوات' : 'steps'}
            </span>
          </div>
          <Progress value={progress} className="w-full h-2" />
          
          {progress === 100 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-800">
                {language === 'ar' ? 'مبروك! اكتمل إعدادك' : 'Congratulations! Setup Complete'}
              </h3>
              <p className="text-sm text-green-700">
                {language === 'ar' 
                  ? 'يمكنك الآن الوصول لجميع ميزات المنصة'
                  : 'You now have access to all platform features'
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Next Steps */}
      {nextSteps.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ar' ? 'الخطوات التالية' : 'Next Steps'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nextSteps.map((step) => (
                <div key={step.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3 flex-1">
                    {getStepIcon(step)}
                    <div className="flex-1">
                      <h4 className="font-medium">
                        {language === 'ar' ? step.titleAr : step.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {language === 'ar' ? step.descriptionAr : step.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">
                          ⏱️ {step.estimatedTime}
                        </span>
                        {getStepStatusBadge(step)}
                      </div>
                    </div>
                  </div>
                  
                  {step.status === 'pending' && step.type === 'action' && (
                    <Button
                      size="sm"
                      onClick={() => handleStepAction(step)}
                      className="flex items-center space-x-1"
                    >
                      <span>{language === 'ar' ? 'ابدأ' : 'Start'}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completed Steps */}
      {completedSteps.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ar' ? 'الخطوات المكتملة' : 'Completed Steps'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {completedSteps.map((step) => (
                <div key={step.id} className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div className="flex-1">
                    <h4 className="font-medium text-green-800">
                      {language === 'ar' ? step.titleAr : step.title}
                    </h4>
                  </div>
                  <Badge variant="default">
                    {language === 'ar' ? 'مكتمل' : 'Completed'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserProgressTracker;
