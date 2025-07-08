
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { WorkflowService } from '@/services/workflow-service';
import { ArrowRight, CheckCircle, Clock, Shield, Award } from 'lucide-react';

export const WorkflowNavigation: React.FC = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Get user role and status from auth context
  const userRole = user?.user_metadata?.role || 'user';
  const userStatus = user?.user_metadata?.status || ['pending'];
  
  const workflow = WorkflowService.getUserWorkflow(userRole, userStatus);
  const nextSteps = WorkflowService.getNextSteps(workflow.currentStep);

  const getStepIcon = (stepId: string) => {
    switch (stepId) {
      case 'kyc_upload': return Shield;
      case 'mcp_test': return Award;
      case 'join_group': return ArrowRight;
      default: return Clock;
    }
  };

  const getStepColor = (stepId: string) => {
    switch (stepId) {
      case 'kyc_upload': return 'text-blue-600';
      case 'mcp_test': return 'text-purple-600';
      case 'join_group': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>
            {language === 'en' ? 'Next Steps' : 'الخطوات التالية'}
          </span>
          <Badge variant="outline" className="capitalize">
            {userRole}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {nextSteps.map((step) => {
            const IconComponent = getStepIcon(step.id);
            const iconColor = getStepColor(step.id);
            
            return (
              <div key={step.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <IconComponent className={`h-6 w-6 ${iconColor}`} />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{step.title}</h4>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
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
            );
          })}
          
          {nextSteps.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {language === 'en' ? 'All steps completed!' : 'تم إكمال جميع الخطوات!'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'You can now access all platform features'
                  : 'يمكنك الآن الوصول إلى جميع ميزات المنصة'}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
