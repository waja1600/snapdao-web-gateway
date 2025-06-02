
import { DashboardItemProps } from './DashboardItem';
import { 
  FileText, Bell, Shield, Vote, Gavel, Users, 
  FileText as Invoice, ClipboardList, Star, 
  FileSignature, Package 
} from 'lucide-react';

// Helper function for translations
const getItemText = (language: string, enText: string, arText: string): string => {
  return language === 'en' ? enText : arText;
};

// Get common dashboard items based on language and KYC status
export const getCommonDashboardItems = (
  language: string, 
  kycStatus: 'verified' | 'pending' | 'not_started'
): DashboardItemProps[] => {
  return [
    {
      icon: Invoice,
      title: getItemText(language, 'Invoices', 'الفواتير'),
      value: '5',
      description: getItemText(language, 'Open invoices', 'فواتير مفتوحة'),
      route: '/invoices'
    },
    {
      icon: Shield,
      title: getItemText(language, 'Verification', 'التوثيق'),
      value: kycStatus === 'verified' ? '✓' : '!',
      description: getItemText(
        language,
        kycStatus === 'verified' ? 'Verified' : kycStatus === 'pending' ? 'Pending' : 'Not started',
        kycStatus === 'verified' ? 'تم التحقق' : kycStatus === 'pending' ? 'قيد الانتظار' : 'لم يبدأ'
      ),
      route: '/verification',
      status: kycStatus
    },
    {
      icon: Bell,
      title: getItemText(language, 'Notifications', 'الإشعارات'),
      value: '3',
      description: getItemText(language, 'New notifications', 'إشعارات جديدة'),
      route: '/notifications'
    },
  ];
};

// Get role-specific dashboard items based on language
export const getRoleDashboardItems = (language: string): Record<string, DashboardItemProps[]> => {
  return {
    company: [
      {
        icon: FileSignature,
        title: getItemText(language, 'Contracts', 'العقود'),
        value: '2',
        description: getItemText(language, 'Active contracts', 'عقود نشطة'),
        route: '/contracts'
      },
      {
        icon: Vote,
        title: getItemText(language, 'Voting Proposals', 'مقترحات التصويت'),
        value: '2',
        description: getItemText(language, 'Active proposals', 'مقترحات نشطة'),
        route: '/proposals'
      },
      {
        icon: Users,
        title: getItemText(language, 'My Groups', 'مجموعاتي'),
        value: '3',
        description: getItemText(language, 'Active memberships', 'عضويات نشطة'),
        route: '/groups'
      }
    ],
    freelancer: [
      {
        icon: ClipboardList,
        title: getItemText(language, 'Offers', 'العروض'),
        value: '4',
        description: getItemText(language, 'Open offers', 'عروض مفتوحة'),
        route: '/offers'
      },
      {
        icon: ClipboardList,
        title: getItemText(language, 'Tasks', 'المهام'),
        value: '2',
        description: getItemText(language, 'In progress', 'قيد التنفيذ'),
        route: '/tasks'
      },
      {
        icon: Star,
        title: getItemText(language, 'Ratings', 'التقييمات'),
        value: '4.8',
        description: getItemText(language, 'Average rating', 'متوسط التقييم'),
        route: '/ratings'
      }
    ],
    supplier: [
      {
        icon: Package,
        title: getItemText(language, 'Products', 'المنتجات'),
        value: '12',
        description: getItemText(language, 'Active listings', 'منتجات نشطة'),
        route: '/products'
      },
      {
        icon: ClipboardList,
        title: getItemText(language, 'Offers', 'العروض'),
        value: '3',
        description: getItemText(language, 'Group offers', 'عروض للمجموعات'),
        route: '/supplier-offers'
      }
    ],
    supervisor: [
      {
        icon: FileSignature,
        title: getItemText(language, 'Contracts', 'العقود'),
        value: '8',
        description: getItemText(language, 'Under supervision', 'تحت الإشراف'),
        route: '/monitor-contracts'
      },
      {
        icon: Gavel,
        title: getItemText(language, 'Arbitration', 'التحكيم'),
        value: '1',
        description: getItemText(language, 'Open cases', 'حالات مفتوحة'),
        route: '/arbitration'
      }
    ]
  };
};
