
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { workflowService, UserWorkflow } from '@/services/workflow-service';
import { ArrowRight, CheckCircle, Clock } from 'lucide-react';

export const WorkflowNavigation: React.FC = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock user role and status - in real app, this would come from context
  const userRole = 'company';
  const userStatus = ['verified'];
  
  const workflow: UserWorkflow = workflowService.getUserWorkflow(userRole, userStatus);
  const nextSteps = workflowService.getNextSteps(workflow.currentStep);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>
            {language === 'en' ? 'Next Steps' : 'الخطوات التالية'}
          </span>
          <Badge variant="outline">{workflow.userRole}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {nextSteps.map((step) => (
            <div key={step.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  onClick={() => navigate(step.route)}
                  className="flex items-center space-x-1"
                >
                  <span>{language === 'en' ? 'Go' : 'انتقال'}</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          
          {nextSteps.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              <CheckCircle className="h-8 w-8 mx-auto mb-2" />
              <p>{language === 'en' ? 'All steps completed!' : 'تم إكمال جميع الخطوات!'}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
