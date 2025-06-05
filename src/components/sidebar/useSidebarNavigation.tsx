
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { 
  Home, 
  FileText, 
  Vote, 
  Users, 
  Settings,
  Search,
  Gavel,
  Bell,
  Shield,
  ShoppingCart,
  Briefcase,
  FileSignature,
  ClipboardList,
  Star,
  Package
} from "lucide-react";

export const useSidebarNavigation = (language: string, userRole: string) => {
  const location = useLocation();

  // Common navigation items for all roles
  const commonNavigation = useMemo(() => [
    {
      name: language === 'ar' ? 'لوحة التحكم' : 'Dashboard',
      href: "/dashboard",
      icon: Home,
    },
    {
      name: language === 'ar' ? 'استكشاف' : 'Explore',
      href: "/explore",
      icon: Search,
    },
    {
      name: language === 'ar' ? 'التحقق' : 'Verification',
      href: "/verification",
      icon: Shield,
    },
    {
      name: language === 'ar' ? 'الإشعارات' : 'Notifications',
      href: "/notifications",
      icon: Bell,
    },
    {
      name: language === 'ar' ? 'الفواتير' : 'Invoices',
      href: "/invoices",
      icon: FileText,
    },
    {
      name: language === 'ar' ? 'التحكيم' : 'Arbitration',
      href: "/arbitration",
      icon: Gavel,
    },
  ], [language]);

  // Role-specific navigation items
  const roleSpecificNavigation = useMemo(() => ({
    company: [
      {
        name: language === 'ar' ? 'العقود' : 'Contracts',
        href: "/contracts",
        icon: FileSignature,
      },
      {
        name: language === 'ar' ? 'مجموعاتي' : 'My Groups',
        href: "/groups",
        icon: Users,
      },
      {
        name: language === 'ar' ? 'التصويت' : 'Voting',
        href: "/voting",
        icon: Vote,
      },
      {
        name: language === 'ar' ? 'الشراء التعاوني' : 'Cooperative Buying',
        href: "/cooperative-buying",
        icon: ShoppingCart,
      },
    ],
    freelancer: [
      {
        name: language === 'ar' ? 'العروض' : 'Offers',
        href: "/offers",
        icon: ClipboardList,
      },
      {
        name: language === 'ar' ? 'المهام' : 'Tasks',
        href: "/tasks",
        icon: ClipboardList,
      },
      {
        name: language === 'ar' ? 'التقييمات' : 'Ratings',
        href: "/ratings",
        icon: Star,
      },
    ],
    supplier: [
      {
        name: language === 'ar' ? 'المنتجات' : 'Products',
        href: "/products",
        icon: Package,
      },
      {
        name: language === 'ar' ? 'العروض' : 'Offers',
        href: "/supplier-offers",
        icon: ClipboardList,
      },
    ],
    supervisor: [
      {
        name: language === 'ar' ? 'العقود' : 'Contracts',
        href: "/monitor-contracts",
        icon: FileSignature,
      },
      {
        name: language === 'ar' ? 'المجموعات المشرف عليها' : 'Supervised Groups',
        href: "/supervised-groups",
        icon: Users,
      },
    ],
  }), [language]);

  // Combine common navigation with role-specific navigation
  const navigation = useMemo(() => [
    ...commonNavigation,
    ...(roleSpecificNavigation[userRole as keyof typeof roleSpecificNavigation] || []),
  ], [commonNavigation, roleSpecificNavigation, userRole]);

  return { navigation };
};
