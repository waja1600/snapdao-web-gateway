
import { 
  Home, Users, Building2, ShoppingCart, Megaphone, TrendingUp,
  Truck, UserCheck, UsersIcon, Briefcase, Package, Gavel, 
  Scale, Brain, Vote, FileText, Bell, Settings, User, Wallet,
  MessageSquare, AlertCircle, CheckCircle, Clock, Shield
} from 'lucide-react';

export const useSidebarNavigation = (language: string, userRole: string) => {
  const navigation = [
    {
      name: language === 'ar' ? 'لوحة التحكم' : 'Dashboard',
      href: '/dashboard',
      icon: Home,
    },
    {
      name: language === 'ar' ? 'حسابي' : 'My Account',
      href: '/account',
      icon: User,
    },
    {
      name: language === 'ar' ? 'محفظتي' : 'My Wallet',
      href: '/wallet',
      icon: Wallet,
      badge: '1,250', // Points balance
    }
  ];

  // Portal Navigation Section
  const portalNavigation = [
    // Main Portals Group
    {
      name: language === 'ar' ? 'الشراء التعاوني' : 'Cooperative Purchasing',
      href: '/cooperative-purchasing',
      icon: ShoppingCart,
      badge: language === 'ar' ? 'جديد' : 'New',
      requirements: { kyc: true, points: true, mcp: false }
    },
    {
      name: language === 'ar' ? 'التسويق التعاوني' : 'Cooperative Marketing',
      href: '/cooperative-marketing',
      icon: Megaphone,
      requirements: { kyc: true, points: true, mcp: false }
    },
    {
      name: language === 'ar' ? 'تأسيس الشركات' : 'Company Formation',
      href: '/company-formation',
      icon: Building2,
      requirements: { kyc: false, points: false, mcp: false }
    },
    {
      name: language === 'ar' ? 'مجموعات الاستثمار' : 'Investment Groups',
      href: '/investment-groups',
      icon: TrendingUp,
      requirements: { kyc: true, points: true, mcp: false }
    },
    {
      name: language === 'ar' ? 'الموردون' : 'Suppliers',
      href: '/suppliers',
      icon: Truck,
      requirements: { kyc: true, points: true, mcp: false }
    },
    {
      name: language === 'ar' ? 'المستقلون' : 'Freelancers',
      href: '/freelancers',
      icon: UserCheck,
      requirements: { kyc: false, points: false, mcp: true }
    },
    {
      name: language === 'ar' ? 'مجموعات المستقلين' : 'Freelancer Groups',
      href: '/freelancer-groups',
      icon: UsersIcon,
      requirements: { kyc: false, points: false, mcp: true }
    },
    {
      name: language === 'ar' ? 'مقدمو الخدمات' : 'Service Providers',
      href: '/service-providers',
      icon: Briefcase,
      requirements: { kyc: false, points: false, mcp: false }
    },
    {
      name: language === 'ar' ? 'قوائم المنتجات' : 'Product Listings',
      href: '/product-listings',
      icon: Package,
      requirements: { kyc: false, points: false, mcp: false }
    },
    {
      name: language === 'ar' ? 'التحكيم والتوثيق' : 'Arbitration & Documentation',
      href: '/arbitration-documentation',
      icon: Scale,
      requirements: { kyc: false, points: false, mcp: false }
    },
    {
      name: language === 'ar' ? 'طلبات التحكيم' : 'Arbitration Requests',
      href: '/arbitration-requests',
      icon: Gavel,
      requirements: { kyc: false, points: false, mcp: false }
    },
    {
      name: language === 'ar' ? 'حلول التفاوض الذكية' : 'Smart Negotiation Solutions',
      href: '/smart-negotiation',
      icon: Brain,
      requirements: { kyc: false, points: false, mcp: false }
    }
  ];

  // User-specific sections
  const userSections = [
    {
      name: language === 'ar' ? 'مجموعاتي' : 'My Groups',
      href: '/my-groups',
      icon: Users,
      badge: '3', // Active groups count
    },
    {
      name: language === 'ar' ? 'كمورد' : 'As Supplier',
      href: '/as-supplier',
      icon: Truck,
      visible: userRole === 'supplier' || userRole === 'company'
    },
    {
      name: language === 'ar' ? 'كمستقل' : 'As Freelancer',
      href: '/as-freelancer',
      icon: UserCheck,
      visible: userRole === 'freelancer'
    },
    {
      name: language === 'ar' ? 'كمؤسس شركة' : 'As Company Founder',
      href: '/as-company-founder',
      icon: Building2,
      visible: userRole === 'company'
    },
    {
      name: language === 'ar' ? 'التحكيم' : 'Arbitration',
      href: '/arbitration',
      icon: Gavel,
    },
    {
      name: language === 'ar' ? 'الإشعارات' : 'Notifications',
      href: '/notifications',
      icon: Bell,
      badge: '5', // Unread notifications
    },
    {
      name: language === 'ar' ? 'الرسائل' : 'Messages',
      href: '/messages',
      icon: MessageSquare,
      badge: '2', // Unread messages
    }
  ];

  // Admin sections (visible only to admins)
  const adminSections = userRole === 'admin' ? [
    {
      name: language === 'ar' ? 'إدارة المستخدمين' : 'User Management',
      href: '/admin/users',
      icon: Users,
    },
    {
      name: language === 'ar' ? 'مراجعة KYC' : 'KYC Reviews',
      href: '/admin/kyc-reviews',
      icon: Shield,
      badge: '12', // Pending reviews
    },
    {
      name: language === 'ar' ? 'إدارة النقاط' : 'Points Management',
      href: '/admin/points',
      icon: Wallet,
    }
  ] : [];

  return {
    navigation: [
      ...navigation,
      ...portalNavigation,
      ...userSections.filter(item => item.visible !== false),
      ...adminSections,
      {
        name: language === 'ar' ? 'الإعدادات' : 'Settings',
        href: '/settings',
        icon: Settings,
      }
    ]
  };
};
