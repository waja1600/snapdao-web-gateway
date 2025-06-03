
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Bell, 
  FileText, 
  Users, 
  Building, 
  ShoppingCart, 
  Megaphone,
  DollarSign,
  Calendar
} from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
  description?: string;
}

export const NavigationHelper: React.FC = () => {
  const { language } = useLanguage();
  const location = useLocation();

  const navItems: NavItem[] = [
    {
      path: '/dashboard',
      label: language === 'en' ? 'Dashboard' : 'لوحة التحكم',
      icon: Building,
      description: language === 'en' ? 'Main dashboard overview' : 'نظرة عامة على لوحة التحكم'
    },
    {
      path: '/group-buying',
      label: language === 'en' ? 'Group Buying' : 'الشراء الجماعي',
      icon: ShoppingCart,
      description: language === 'en' ? 'Join group purchases' : 'انضم للمشتريات الجماعية'
    },
    {
      path: '/cooperative-marketing',
      label: language === 'en' ? 'Cooperative Marketing' : 'التسويق التعاوني',
      icon: Megaphone,
      description: language === 'en' ? 'Collaborative marketing campaigns' : 'حملات التسويق التعاونية'
    },
    {
      path: '/company-incorporation',
      label: language === 'en' ? 'Company Incorporation' : 'تأسيس الشركات',
      icon: Building,
      description: language === 'en' ? 'Company formation services' : 'خدمات تأسيس الشركات'
    },
    {
      path: '/suppliers-freelancers',
      label: language === 'en' ? 'Suppliers & Freelancers' : 'الموردون والمستقلون',
      icon: Users,
      description: language === 'en' ? 'Connect with professionals' : 'تواصل مع المحترفين'
    },
    {
      path: '/invoices',
      label: language === 'en' ? 'Invoices' : 'الفواتير',
      icon: FileText,
      badge: 3,
      description: language === 'en' ? 'Manage invoices and payments' : 'إدارة الفواتير والمدفوعات'
    },
    {
      path: '/freelancer-management',
      label: language === 'en' ? 'Freelancer Management' : 'إدارة المستقلين',
      icon: Users,
      description: language === 'en' ? 'Manage freelancer projects' : 'إدارة مشاريع المستقلين'
    },
    {
      path: '/proposals',
      label: language === 'en' ? 'Proposals' : 'المقترحات',
      icon: FileText,
      description: language === 'en' ? 'View and manage proposals' : 'عرض وإدارة المقترحات'
    },
    {
      path: '/projects',
      label: language === 'en' ? 'Projects' : 'المشاريع',
      icon: Calendar,
      description: language === 'en' ? 'Project management' : 'إدارة المشاريع'
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {navItems.map((item) => (
        <Link key={item.path} to={item.path} className="block">
          <div className={`
            p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer
            ${isActive(item.path) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
          `}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-3">
                <item.icon className={`h-6 w-6 ${isActive(item.path) ? 'text-blue-600' : 'text-gray-600'}`} />
                <h3 className={`font-medium ${isActive(item.path) ? 'text-blue-900' : 'text-gray-900'}`}>
                  {item.label}
                </h3>
              </div>
              {item.badge && (
                <Badge variant="destructive" className="h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {item.badge}
                </Badge>
              )}
            </div>
            {item.description && (
              <p className="text-sm text-gray-600">{item.description}</p>
            )}
            {isActive(item.path) && (
              <div className="mt-2">
                <Badge variant="outline" className="text-xs">
                  {language === 'en' ? 'Current Page' : 'الصفحة الحالية'}
                </Badge>
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};
