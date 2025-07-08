import { PortalType } from '@/types/platform';

export interface WorkflowStep {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  required: boolean;
  estimatedTime?: string;
  requirements?: string[];
}

export interface UserWorkflowState {
  currentStep: number;
  completedSteps: string[];
  userId: string;
  portalId: PortalType;
  status: 'not_started' | 'in_progress' | 'completed' | 'blocked';
}

export interface UserWorkflow {
  userRole: string;
  currentStep: number;
  steps: WorkflowStep[];
  completedSteps: string[];
  status: string;
}

export interface NextStep {
  id: string;
  title: string;
  description: string;
  route: string;
}

export class WorkflowService {
  
  // B2B Standard Entry Flow
  static getPortalEntryWorkflow(portalId: PortalType, userRole: string = 'user'): WorkflowStep[] {
    const baseSteps: WorkflowStep[] = [
      {
        id: 'register',
        title: 'Account Registration',
        titleAr: 'تسجيل الحساب',
        description: 'Create your account with basic information',
        descriptionAr: 'إنشاء حسابك بالمعلومات الأساسية',
        status: 'completed',
        required: true,
        estimatedTime: '5 minutes'
      }
    ];

    const portalConfig = this.getPortalRequirements(portalId);
    
    // KYC Steps for premium portals
    if (portalConfig.requiresKYC) {
      baseSteps.push(
        {
          id: 'kyc_upload',
          title: 'Upload KYC Documents',
          titleAr: 'رفع وثائق التحقق من الهوية',
          description: 'Upload identification and business documents',
          descriptionAr: 'رفع وثائق الهوية والأعمال',
          status: 'pending',
          required: true,
          estimatedTime: '10 minutes',
          requirements: ['Valid ID', 'Business License', 'Proof of Address']
        },
        {
          id: 'kyc_review',
          title: 'Await Admin Approval',
          titleAr: 'انتظار موافقة الإدارة',
          description: 'Admin team reviews your submitted documents',
          descriptionAr: 'فريق الإدارة يراجع الوثائق المقدمة',
          status: 'pending',
          required: true,
          estimatedTime: '1-3 business days'
        }
      );
    }

    // MCP Test for freelancer portals
    if (portalConfig.requiresMCPExam) {
      baseSteps.push(
        {
          id: 'mcp_test',
          title: 'Pass MCP Test',
          titleAr: 'اجتياز اختبار MCP',
          description: 'Complete the Multi-Competency Platform assessment',
          descriptionAr: 'إكمال تقييم منصة الكفاءات المتعددة',
          status: 'pending',
          required: true,
          estimatedTime: '30 minutes'
        },
        {
          id: 'mcp_review',
          title: 'MCP Results Review',
          titleAr: 'مراجعة نتائج MCP',
          description: 'Admin reviews your test results',
          descriptionAr: 'الإدارة تراجع نتائج الاختبار',
          status: 'pending',
          required: true,
          estimatedTime: '1 business day'
        }
      );
    }

    // Points payment for premium portals
    if (portalConfig.requiresPoints) {
      baseSteps.push({
        id: 'points_payment',
        title: 'Payment with Points',
        titleAr: 'الدفع بالنقاط',
        description: 'Pay entry fee using platform points',
        descriptionAr: 'دفع رسوم الدخول باستخدام نقاط المنصة',
        status: 'pending',
        required: true,
        estimatedTime: '2 minutes'
      });
    }

    // Manager approval for group entry
    baseSteps.push(
      {
        id: 'manager_approval',
        title: 'Manager Approval (2/3 vote)',
        titleAr: 'موافقة المديرين (تصويت الثلثين)',
        description: 'Group managers vote on your membership application',
        descriptionAr: 'مديرو المجموعة يصوتون على طلب عضويتك',
        status: 'pending',
        required: true,
        estimatedTime: '2-5 business days'
      },
      {
        id: 'group_access',
        title: 'Access Group Room',
        titleAr: 'الوصول إلى غرفة المجموعة',
        description: 'Join the group and start collaborating',
        descriptionAr: 'انضم إلى المجموعة وابدأ التعاون',
        status: 'pending',
        required: true,
        estimatedTime: 'Immediate'
      }
    );

    return baseSteps;
  }

  // B2B Standard Exit Flow
  static getPortalExitWorkflow(portalId: PortalType): WorkflowStep[] {
    return [
      {
        id: 'exit_request',
        title: 'Submit Withdrawal Request',
        titleAr: 'تقديم طلب الانسحاب',
        description: 'Submit formal request to leave the group',
        descriptionAr: 'تقديم طلب رسمي لمغادرة المجموعة',
        status: 'pending',
        required: true,
        estimatedTime: '5 minutes'
      },
      {
        id: 'admin_review',
        title: 'Admin Approval Required',
        titleAr: 'موافقة الإدارة مطلوبة',
        description: 'Administrator reviews withdrawal request',
        descriptionAr: 'المدير يراجع طلب الانسحاب',
        status: 'pending',
        required: true,
        estimatedTime: '1-2 business days'
      },
      {
        id: 'access_removal',
        title: 'Access Rights Removal',
        titleAr: 'إزالة حقوق الوصول',
        description: 'Remove access to group resources and data',
        descriptionAr: 'إزالة الوصول إلى موارد وبيانات المجموعة',
        status: 'pending',
        required: true,
        estimatedTime: 'Immediate'
      },
      {
        id: 'data_archival',
        title: 'Data Archival',
        titleAr: 'أرشفة البيانات',
        description: 'Archive user data and transaction history',
        descriptionAr: 'أرشفة بيانات المستخدم وسجل المعاملات',
        status: 'pending',
        required: true,
        estimatedTime: '24 hours'
      }
    ];
  }

  // Supply Request/Service Offer Workflow
  static getOfferSubmissionWorkflow(): WorkflowStep[] {
    return [
      {
        id: 'draft_offer',
        title: 'Draft Offer/Request',
        titleAr: 'صياغة العرض/الطلب',
        description: 'Create detailed offer or service request',
        descriptionAr: 'إنشاء عرض أو طلب خدمة مفصل',
        status: 'completed',
        required: true,
        estimatedTime: '15 minutes'
      },
      {
        id: 'manager_decision',
        title: 'Manager Decision Draft',
        titleAr: 'صياغة قرار المدير',
        description: 'Group manager drafts decision for voting',
        descriptionAr: 'مدير المجموعة يصيغ القرار للتصويت',
        status: 'pending',
        required: true,
        estimatedTime: '1-2 days'
      },
      {
        id: 'member_voting',
        title: 'Two-thirds Member Vote',
        titleAr: 'تصويت ثلثي الأعضاء',
        description: 'Members vote on the proposal',
        descriptionAr: 'الأعضاء يصوتون على المقترح',
        status: 'pending',
        required: true,
        estimatedTime: '3-5 days'
      },
      {
        id: 'decision_outcome',
        title: 'Decision & Publication',
        titleAr: 'القرار والنشر',
        description: 'If approved: publish publicly, if rejected: not published',
        descriptionAr: 'إذا تمت الموافقة: النشر علناً، إذا رُفض: عدم النشر',
        status: 'pending',
        required: true,
        estimatedTime: 'Immediate'
      }
    ];
  }

  // Group Room Workflow States
  static getGroupRoomPhases() {
    return [
      {
        phase: 'initial',
        title: 'Initial Setup',
        titleAr: 'الإعداد الأولي',
        description: 'Group formation and initial member recruitment',
        descriptionAr: 'تشكيل المجموعة وتجنيد الأعضاء الأوائل'
      },
      {
        phase: 'member_collection',
        title: 'Collecting Members',
        titleAr: 'جمع الأعضاء',
        description: 'Actively recruiting members to reach minimum threshold',
        descriptionAr: 'تجنيد الأعضاء بنشاط للوصول إلى الحد الأدنى'
      },
      {
        phase: 'requirements_gathering',
        title: 'Requirements Gathering',
        titleAr: 'جمع المتطلبات',
        description: 'Collecting and consolidating member requirements',
        descriptionAr: 'جمع وتوحيد متطلبات الأعضاء'
      },
      {
        phase: 'supplier_sourcing',
        title: 'Supplier Sourcing',
        titleAr: 'البحث عن موردين',
        description: 'Finding and evaluating potential suppliers',
        descriptionAr: 'البحث عن وتقييم الموردين المحتملين'
      },
      {
        phase: 'negotiation',
        title: 'Negotiation',
        titleAr: 'التفاوض',
        description: 'Negotiating terms with selected suppliers',
        descriptionAr: 'التفاوض على الشروط مع الموردين المختارين'
      },
      {
        phase: 'voting',
        title: 'Voting & Decision',
        titleAr: 'التصويت والقرار',
        description: 'Members vote on final supplier and terms',
        descriptionAr: 'الأعضاء يصوتون على المورد النهائي والشروط'
      },
      {
        phase: 'contracting',
        title: 'Contract Execution',
        titleAr: 'تنفيذ العقد',
        description: 'Finalizing contracts and legal documentation',
        descriptionAr: 'إنهاء العقود والوثائق القانونية'
      },
      {
        phase: 'delivery',
        title: 'Delivery & Fulfillment',
        titleAr: 'التسليم والوفاء',
        description: 'Managing delivery and quality assurance',
        descriptionAr: 'إدارة التسليم وضمان الجودة'
      },
      {
        phase: 'completed',
        title: 'Project Completed',
        titleAr: 'اكتمال المشروع',
        description: 'Project successfully completed',
        descriptionAr: 'اكتمال المشروع بنجاح'
      }
    ];
  }

  private static getPortalRequirements(portalId: PortalType) {
    const requirementsMap = {
      'cooperative_purchasing': { requiresKYC: true, requiresPoints: true, requiresMCPExam: false },
      'cooperative_marketing': { requiresKYC: true, requiresPoints: true, requiresMCPExam: false },
      'company_formation': { requiresKYC: false, requiresPoints: false, requiresMCPExam: false },
      'investment_groups': { requiresKYC: true, requiresPoints: true, requiresMCPExam: false },
      'suppliers': { requiresKYC: true, requiresPoints: true, requiresMCPExam: false },
      'freelancers': { requiresKYC: false, requiresPoints: false, requiresMCPExam: true },
      'freelancer_groups': { requiresKYC: false, requiresPoints: false, requiresMCPExam: true },
      'service_providers': { requiresKYC: false, requiresPoints: false, requiresMCPExam: false },
      'product_listings': { requiresKYC: false, requiresPoints: false, requiresMCPExam: false },
      'arbitration_documentation': { requiresKYC: false, requiresPoints: false, requiresMCPExam: false },
      'arbitration_requests': { requiresKYC: false, requiresPoints: false, requiresMCPExam: false },
      'smart_negotiation': { requiresKYC: false, requiresPoints: false, requiresMCPExam: false }
    };

    return requirementsMap[portalId] || { requiresKYC: false, requiresPoints: false, requiresMCPExam: false };
  }

  // Member Status Management
  static getMemberStatusWorkflow() {
    return [
      {
        status: 'pending_activation',
        title: 'Pending Activation',
        titleAr: 'في انتظار التفعيل',
        description: 'Account created, awaiting email verification',
        descriptionAr: 'تم إنشاء الحساب، في انتظار تأكيد البريد الإلكتروني'
      },
      {
        status: 'awaiting_kyc',
        title: 'Awaiting KYC Approval',
        titleAr: 'في انتظار موافقة التحقق من الهوية',
        description: 'Documents submitted, under admin review',
        descriptionAr: 'تم تقديم الوثائق، قيد المراجعة الإدارية'
      },
      {
        status: 'awaiting_voting',
        title: 'Awaiting Voting',
        titleAr: 'في انتظار التصويت',
        description: 'Application under member voting process',
        descriptionAr: 'الطلب قيد عملية تصويت الأعضاء'
      },
      {
        status: 'active',
        title: 'Active',
        titleAr: 'نشط',
        description: 'Full access to group features and resources',
        descriptionAr: 'وصول كامل لميزات وموارد المجموعة'
      },
      {
        status: 'temporarily_suspended',
        title: 'Temporarily Suspended',
        titleAr: 'معلق مؤقتاً',
        description: 'Access temporarily restricted due to policy violation',
        descriptionAr: 'الوصول مقيد مؤقتاً بسبب مخالفة السياسة'
      },
      {
        status: 'withdrawn',
        title: 'Withdrawn',
        titleAr: 'منسحب',
        description: 'Voluntarily left the group',
        descriptionAr: 'غادر المجموعة طوعياً'
      },
      {
        status: 'banned',
        title: 'Banned',
        titleAr: 'محظور',
        description: 'Permanently banned due to serious violations',
        descriptionAr: 'محظور نهائياً بسبب مخالفات جسيمة'
      }
    ];
  }

  static getUserWorkflow(userRole: string, userStatus: string[]): UserWorkflow {
    return {
      userRole,
      currentStep: 0,
      steps: [],
      completedSteps: [],
      status: 'not_started'
    };
  }

  static getNextSteps(currentStep: number): NextStep[] {
    return [
      {
        id: 'kyc_upload',
        title: 'Upload KYC Documents',
        description: 'Complete your identity verification',
        route: '/account/kyc'
      },
      {
        id: 'join_group',
        title: 'Join a Group',
        description: 'Browse and join available groups',
        route: '/cooperative-purchasing'
      }
    ];
  }
}

// Export an instance for convenience
export const workflowService = new WorkflowService();
