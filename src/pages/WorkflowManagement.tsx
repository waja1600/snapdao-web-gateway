
import React from 'react';
import { WorkspaceLayout } from '@/components/workspace/WorkspaceLayout';
import { WorkflowDashboard } from '@/components/workflow/WorkflowDashboard';
import { useLanguage } from '@/contexts/LanguageContext';

const WorkflowManagement: React.FC = () => {
  const { language } = useLanguage();

  return (
    <WorkspaceLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold gradient-text">
            {language === 'ar' ? 'إدارة سير العمل' : 'Workflow Management'}
          </h1>
          <p className="text-gray-600">
            {language === 'ar' 
              ? 'تنظيم وإدارة جميع مراحل العمل بكفاءة'
              : 'Organize and manage all work stages efficiently'}
          </p>
        </div>

        <WorkflowDashboard />
      </div>
    </WorkspaceLayout>
  );
};

export default WorkflowManagement;
