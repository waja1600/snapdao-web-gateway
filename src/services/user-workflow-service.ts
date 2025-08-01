
export interface WorkflowStep {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  type: 'action' | 'verification' | 'approval' | 'payment';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  requiredFor: string[];
  estimatedTime: string;
  route?: string;
}

export interface UserWorkflow {
  userId: string;
  userRole: string;
  currentStep: string;
  completedSteps: string[];
  availableSteps: string[];
  blockedSteps: string[];
  workflow: WorkflowStep[];
}

export class UserWorkflowService {
  private static workflows: Map<string, UserWorkflow> = new Map();

  static initializeUserWorkflow(userId: string, userRole: string): UserWorkflow {
    const workflow = this.createWorkflowForRole(userRole);
    
    const userWorkflow: UserWorkflow = {
      userId,
      userRole,
      currentStep: workflow[0]?.id || '',
      completedSteps: [],
      availableSteps: [workflow[0]?.id || ''],
      blockedSteps: workflow.slice(1).map(step => step.id),
      workflow
    };

    this.workflows.set(userId, userWorkflow);
    return userWorkflow;
  }

  private static createWorkflowForRole(role: string): WorkflowStep[] {
    const baseSteps: WorkflowStep[] = [
      {
        id: 'account_setup',
        title: 'Complete Account Setup',
        titleAr: 'إكمال إعداد الحساب',
        description: 'Fill in your profile information and contact details',
        descriptionAr: 'املأ معلومات ملفك الشخصي وتفاصيل الاتصال',
        type: 'action',
        status: 'pending',
        requiredFor: ['all'],
        estimatedTime: '5 minutes',
        route: '/profile'
      },
      {
        id: 'email_verification',
        title: 'Verify Email Address',
        titleAr: 'التحقق من البريد الإلكتروني',
        description: 'Confirm your email address to secure your account',
        descriptionAr: 'أكد عنوان بريدك الإلكتروني لتأمين حسابك',
        type: 'verification',
        status: 'pending',
        requiredFor: ['all'],
        estimatedTime: '2 minutes'
      }
    ];

    const roleSpecificSteps: Record<string, WorkflowStep[]> = {
      supplier: [
        {
          id: 'kyc_upload',
          title: 'Upload KYC Documents',
          titleAr: 'رفع مستندات التحقق من الهوية',
          description: 'Upload required identity verification documents',
          descriptionAr: 'ارفع المستندات المطلوبة للتحقق من الهوية',
          type: 'verification',
          status: 'pending',
          requiredFor: ['suppliers', 'companies'],
          estimatedTime: '10 minutes',
          route: '/kyc-verification'
        },
        {
          id: 'kyc_approval',
          title: 'KYC Approval',
          titleAr: 'الموافقة على التحقق من الهوية',
          description: 'Wait for admin approval of your KYC documents',
          descriptionAr: 'انتظر موافقة الإدارة على مستندات التحقق من هويتك',
          type: 'approval',
          status: 'pending',
          requiredFor: ['suppliers', 'companies'],
          estimatedTime: '24-48 hours'
        },
        {
          id: 'points_purchase',
          title: 'Purchase Platform Points',
          titleAr: 'شراء نقاط المنصة',
          description: 'Buy points to participate in group activities',
          descriptionAr: 'اشتر نقاط للمشاركة في أنشطة المجموعة',
          type: 'payment',
          status: 'pending',
          requiredFor: ['group_participation'],
          estimatedTime: '5 minutes',
          route: '/my-wallet'
        }
      ],
      freelancer: [
        {
          id: 'mcp_exam',
          title: 'Pass MCP Platform Exam',
          titleAr: 'اجتياز اختبار منصة MCP',
          description: 'Take and pass the platform competency exam',
          descriptionAr: 'أجري واجتز اختبار كفاءة المنصة',
          type: 'verification',
          status: 'pending',
          requiredFor: ['freelancers'],
          estimatedTime: '60 minutes',
          route: '/mcp-exam'
        },
        {
          id: 'exam_approval',
          title: 'Exam Results Review',
          titleAr: 'مراجعة نتائج الاختبار',
          description: 'Admin review of your exam performance',
          descriptionAr: 'مراجعة الإدارة لأدائك في الاختبار',
          type: 'approval',
          status: 'pending',
          requiredFor: ['freelancers'],
          estimatedTime: '24 hours'
        }
      ],
      company: [
        {
          id: 'kyc_upload',
          title: 'Upload Company Documents',
          titleAr: 'رفع مستندات الشركة',
          description: 'Upload business license and company verification documents',
          descriptionAr: 'ارفع السجل التجاري ومستندات التحقق من الشركة',
          type: 'verification',
          status: 'pending',
          requiredFor: ['companies'],
          estimatedTime: '15 minutes',
          route: '/kyc-verification'
        },
        {
          id: 'kyc_approval',
          title: 'Company Verification',
          titleAr: 'التحقق من الشركة',
          description: 'Wait for admin verification of your company documents',
          descriptionAr: 'انتظر التحقق الإداري من مستندات شركتك',
          type: 'approval',
          status: 'pending',
          requiredFor: ['companies'],
          estimatedTime: '48-72 hours'
        },
        {
          id: 'points_purchase',
          title: 'Purchase Platform Points',
          titleAr: 'شراء نقاط المنصة',
          description: 'Buy points to participate in group activities',
          descriptionAr: 'اشتر نقاط للمشاركة في أنشطة المجموعة',
          type: 'payment',
          status: 'pending',
          requiredFor: ['group_participation'],
          estimatedTime: '5 minutes',
          route: '/my-wallet'
        }
      ]
    };

    const finalSteps: WorkflowStep[] = [
      {
        id: 'platform_access',
        title: 'Full Platform Access',
        titleAr: 'الوصول الكامل للمنصة',
        description: 'Congratulations! You now have full access to all platform features',
        descriptionAr: 'مبروك! أصبح لديك الآن وصول كامل لجميع ميزات المنصة',
        type: 'action',
        status: 'pending',
        requiredFor: ['all'],
        estimatedTime: 'Instant'
      }
    ];

    return [
      ...baseSteps,
      ...(roleSpecificSteps[role] || []),
      ...finalSteps
    ];
  }

  static getUserWorkflow(userId: string): UserWorkflow | null {
    return this.workflows.get(userId) || null;
  }

  static updateStepStatus(userId: string, stepId: string, status: WorkflowStep['status']): boolean {
    const workflow = this.workflows.get(userId);
    if (!workflow) return false;

    const step = workflow.workflow.find(s => s.id === stepId);
    if (!step) return false;

    step.status = status;

    if (status === 'completed') {
      workflow.completedSteps.push(stepId);
      workflow.availableSteps = workflow.availableSteps.filter(id => id !== stepId);
      
      // Unlock next steps
      const currentIndex = workflow.workflow.findIndex(s => s.id === stepId);
      const nextStep = workflow.workflow[currentIndex + 1];
      if (nextStep && !workflow.availableSteps.includes(nextStep.id)) {
        workflow.availableSteps.push(nextStep.id);
        workflow.blockedSteps = workflow.blockedSteps.filter(id => id !== nextStep.id);
      }

      // Update current step
      if (nextStep) {
        workflow.currentStep = nextStep.id;
      }
    }

    this.workflows.set(userId, workflow);
    return true;
  }

  static getNextSteps(userId: string): WorkflowStep[] {
    const workflow = this.workflows.get(userId);
    if (!workflow) return [];

    return workflow.workflow.filter(step => 
      workflow.availableSteps.includes(step.id) && step.status !== 'completed'
    );
  }

  static getCompletedSteps(userId: string): WorkflowStep[] {
    const workflow = this.workflows.get(userId);
    if (!workflow) return [];

    return workflow.workflow.filter(step => 
      workflow.completedSteps.includes(step.id)
    );
  }

  static getWorkflowProgress(userId: string): number {
    const workflow = this.workflows.get(userId);
    if (!workflow) return 0;

    const completedCount = workflow.completedSteps.length;
    const totalCount = workflow.workflow.length;
    
    return Math.round((completedCount / totalCount) * 100);
  }

  static canAccessFeature(userId: string, feature: string): boolean {
    const workflow = this.workflows.get(userId);
    if (!workflow) return false;

    const requiredSteps = workflow.workflow.filter(step => 
      step.requiredFor.includes(feature) || step.requiredFor.includes('all')
    );

    return requiredSteps.every(step => workflow.completedSteps.includes(step.id));
  }

  static getFeatureRequirements(userId: string, feature: string): WorkflowStep[] {
    const workflow = this.workflows.get(userId);
    if (!workflow) return [];

    return workflow.workflow.filter(step => 
      (step.requiredFor.includes(feature) || step.requiredFor.includes('all')) &&
      !workflow.completedSteps.includes(step.id)
    );
  }
}

// Export service instance
export const userWorkflowService = UserWorkflowService;
