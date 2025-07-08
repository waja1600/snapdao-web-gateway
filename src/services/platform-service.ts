
import { PortalConfig, PortalType, GroupCard, GroupStatus } from '@/types/platform';

export class PlatformService {
  static getPortalConfigs(): PortalConfig[] {
    return [
      {
        id: 'cooperative_purchasing',
        name: 'Cooperative Purchasing',
        nameAr: 'الشراء التعاوني',
        description: 'Join buying groups to reduce costs through bulk purchasing',
        descriptionAr: 'انضم إلى مجموعات الشراء لتقليل التكاليف من خلال الشراء بالجملة',
        requiresKYC: true,
        requiresPoints: true,
        requiresMCPExam: false,
        icon: 'ShoppingCart',
        color: 'bg-blue-500'
      },
      {
        id: 'cooperative_marketing',
        name: 'Cooperative Marketing',
        nameAr: 'التسويق التعاوني',
        description: 'Collaborate on marketing campaigns to reduce advertising costs',
        descriptionAr: 'تعاون في حملات التسويق لتقليل تكاليف الإعلان',
        requiresKYC: true,
        requiresPoints: true,
        requiresMCPExam: false,
        icon: 'Megaphone',
        color: 'bg-green-500'
      },
      {
        id: 'company_formation',
        name: 'Company Formation',
        nameAr: 'تأسيس الشركات',
        description: 'Form companies individually or with groups',
        descriptionAr: 'تأسيس الشركات بشكل فردي أو مع مجموعات',
        requiresKYC: false,
        requiresPoints: false,
        requiresMCPExam: false,
        icon: 'Building',
        color: 'bg-purple-500'
      },
      {
        id: 'investment_groups',
        name: 'Investment Groups',
        nameAr: 'مجموعات الاستثمار',
        description: 'Join investment opportunities with verified partners',
        descriptionAr: 'انضم إلى فرص الاستثمار مع شركاء معتمدين',
        requiresKYC: true,
        requiresPoints: true,
        requiresMCPExam: false,
        icon: 'TrendingUp',
        color: 'bg-yellow-500'
      },
      {
        id: 'suppliers',
        name: 'Suppliers',
        nameAr: 'الموردون',
        description: 'Find and connect with verified suppliers',
        descriptionAr: 'البحث والتواصل مع موردين معتمدين',
        requiresKYC: true,
        requiresPoints: true,
        requiresMCPExam: false,
        icon: 'Truck',
        color: 'bg-orange-500'
      },
      {
        id: 'freelancers',
        name: 'Freelancers',
        nameAr: 'المستقلون',
        description: 'Hire skilled freelancers for your projects',
        descriptionAr: 'وظف مستقلين مهرة لمشاريعك',
        requiresKYC: false,
        requiresPoints: false,
        requiresMCPExam: true,
        icon: 'User',
        color: 'bg-indigo-500'
      },
      {
        id: 'freelancer_groups',
        name: 'Freelancer Groups',
        nameAr: 'مجموعات المستقلين',
        description: 'Join freelancer collectives for larger projects',
        descriptionAr: 'انضم إلى جماعات المستقلين للمشاريع الكبيرة',
        requiresKYC: false,
        requiresPoints: false,
        requiresMCPExam: true,
        icon: 'Users',
        color: 'bg-cyan-500'
      },
      {
        id: 'service_providers',
        name: 'Service Providers',
        nameAr: 'مقدمو الخدمات',
        description: 'Offer professional services to businesses',
        descriptionAr: 'قدم خدمات مهنية للشركات',
        requiresKYC: false,
        requiresPoints: false,
        requiresMCPExam: false,
        icon: 'Briefcase',
        color: 'bg-teal-500'
      },
      {
        id: 'product_listings',
        name: 'Product Listings',
        nameAr: 'قوائم المنتجات',
        description: 'List and discover products for group buying',
        descriptionAr: 'اعرض واكتشف المنتجات للشراء الجماعي',
        requiresKYC: false,
        requiresPoints: false,
        requiresMCPExam: false,
        icon: 'Package',
        color: 'bg-pink-500'
      },
      {
        id: 'arbitration_documentation',
        name: 'Arbitration & Documentation',
        nameAr: 'التحكيم والتوثيق',
        description: 'Professional arbitration and document notarization',
        descriptionAr: 'التحكيم المهني وتوثيق المستندات',
        requiresKYC: false,
        requiresPoints: false,
        requiresMCPExam: false,
        icon: 'Scale',
        color: 'bg-red-500'
      },
      {
        id: 'arbitration_requests',
        name: 'Arbitration Requests',
        nameAr: 'طلبات التحكيم',
        description: 'File and manage arbitration cases',
        descriptionAr: 'قدم وادر قضايا التحكيم',
        requiresKYC: false,
        requiresPoints: false,
        requiresMCPExam: false,
        icon: 'Gavel',
        color: 'bg-gray-500'
      },
      {
        id: 'smart_negotiation',
        name: 'Smart Negotiation Solutions',
        nameAr: 'حلول التفاوض الذكية',
        description: 'AI-powered negotiation tools and strategies',
        descriptionAr: 'أدوات واستراتيجيات التفاوض المدعومة بالذكاء الاصطناعي',
        requiresKYC: false,
        requiresPoints: false,
        requiresMCPExam: false,
        icon: 'Brain',
        color: 'bg-violet-500'
      }
    ];
  }

  static getMockGroupCards(portalId: PortalType): GroupCard[] {
    const baseGroups: Partial<GroupCard>[] = [
      {
        name: 'Tech Hardware Buyers',
        nameAr: 'مشترو الأجهزة التقنية',
        description: 'Bulk purchasing of computers and tech equipment',
        descriptionAr: 'شراء جماعي للحاسوب والمعدات التقنية',
        currentPhase: 'Collecting Members',
        currentPhaseAr: 'جمع الأعضاء',
        memberCount: 12,
        maxMembers: 25,
        status: 'seeking_members',
        requirements: ['Minimum order $5000', 'Verified KYC', 'Business license']
      },
      {
        name: 'Restaurant Marketing Alliance',
        nameAr: 'تحالف تسويق المطاعم',
        description: 'Joint marketing campaigns for local restaurants',
        descriptionAr: 'حملات تسويق مشتركة للمطاعم المحلية',
        currentPhase: 'Campaign Planning',
        currentPhaseAr: 'تخطيط الحملة',
        memberCount: 8,
        maxMembers: 15,
        status: 'active',
        requirements: ['Food service license', 'Marketing budget $2000+']
      },
      {
        name: 'E-commerce Startup Incubator',
        nameAr: 'حاضنة الشركات الناشئة للتجارة الإلكترونية',
        description: 'Form e-commerce companies with shared resources',
        descriptionAr: 'تأسيس شركات التجارة الإلكترونية بالموارد المشتركة',
        currentPhase: 'Legal Formation',
        currentPhaseAr: 'التأسيس القانوني',
        memberCount: 5,
        maxMembers: 10,
        status: 'in_negotiation',
        requirements: ['Business plan', 'Initial investment ready']
      }
    ];

    return baseGroups.map((group, index) => ({
      id: `${portalId}_${index + 1}`,
      portal: portalId,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      managers: [`manager_${index + 1}`],
      joinFee: Math.floor(Math.random() * 500) + 100,
      ...group
    })) as GroupCard[];
  }

  static getWorkflowSteps(portalId: PortalType, userRole: string = 'visitor') {
    const portalConfig = this.getPortalConfigs().find(p => p.id === portalId);
    if (!portalConfig) return [];

    const steps = ['Register Account'];
    
    if (portalConfig.requiresKYC) {
      steps.push('Upload KYC Documents', 'Await Admin Approval');
    }
    
    if (portalConfig.requiresMCPExam) {
      steps.push('Pass MCP Test', 'Admin Approval');
    }
    
    if (portalConfig.requiresPoints) {
      steps.push('Payment with Points', 'Manager Approval (2/3 vote)');
    }
    
    steps.push('Access Group Room');
    
    return steps;
  }
}
