import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { PawPrint, Home, Users, Building, Gavel, Vote, DollarSign, Settings, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link, useLocation } from 'react-router-dom';
import { RoleSelector } from '@/components/dashboard/RoleSelector';

/**
 * Quick Navigation Component
 * 
 * Features:
 * - Floating navigation button accessible from all pages
 * - Slide-out menu with all major app sections
 * - Role selector for quick user type switching
 * - Current page indication
 * - Responsive design optimized for mobile
 * 
 * Architecture:
 * - Uses Sheet component for slide-out navigation
 * - Integrates with existing routing system
 * - Maintains state for menu open/close
 * - Provides visual feedback for current location
 */

interface NavigationItem {
  label: string;
  labelAr: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeAr?: string;
}

export const QuickNavigation: React.FC = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Main navigation items grouped by category
  const mainNavigation: NavigationItem[] = [
    {
      label: 'Dashboard',
      labelAr: 'لوحة القيادة',
      href: '/dashboard',
      icon: Home,
    },
    {
      label: 'My Groups',
      labelAr: 'مجموعاتي',
      href: '/groups',
      icon: Users,
    },
    {
      label: 'Create Group',
      labelAr: 'إنشاء مجموعة',
      href: '/create-group',
      icon: Building,
    },
  ];

  const servicesNavigation: NavigationItem[] = [
    {
      label: 'Group Buying',
      labelAr: 'الشراء الجماعي',
      href: '/cooperative-buying',
      icon: DollarSign,
    },
    {
      label: 'Cooperative Marketing',
      labelAr: 'التسويق التعاوني',
      href: '/cooperative-marketing',
      icon: Users,
    },
    {
      label: 'Company Formation',
      labelAr: 'تأسيس الشركات',
      href: '/company-formation',
      icon: Building,
    },
    {
      label: 'Investment Gateway',
      labelAr: 'بوابة الاستثمار',
      href: '/investment-gateway',
      icon: DollarSign,
      badge: 'New',
      badgeAr: 'جديد',
    },
  ];

  const governanceNavigation: NavigationItem[] = [
    {
      label: 'Proposals',
      labelAr: 'المقترحات',
      href: '/proposals',
      icon: Vote,
    },
    {
      label: 'Voting',
      labelAr: 'التصويت',
      href: '/voting',
      icon: Vote,
    },
    {
      label: 'Arbitration',
      labelAr: 'التحكيم',
      href: '/arbitration',
      icon: Gavel,
    },
  ];

  const managementNavigation: NavigationItem[] = [
    {
      label: 'Suppliers & Freelancers',
      labelAr: 'الموردين والمستقلين',
      href: '/supplier-sourcing',
      icon: Users,
    },
    {
      label: 'Invoices',
      labelAr: 'الفواتير',
      href: '/invoices',
      icon: DollarSign,
    },
    {
      label: 'Expenses',
      labelAr: 'المصروفات',
      href: '/expenses',
      icon: DollarSign,
    },
  ];

  const isActiveRoute = (href: string) => {
    return location.pathname === href;
  };

  const NavigationSection: React.FC<{
    title: string;
    titleAr: string;
    items: NavigationItem[];
  }> = ({ title, titleAr, items }) => (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-muted-foreground px-2">
        {language === 'ar' ? titleAr : title}
      </h3>
      <div className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = isActiveRoute(item.href);
          
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setIsOpen(false)}
              className={`nav-item w-full justify-start ${
                isActive 
                  ? 'bg-[hsl(var(--primary-gpo))] text-white hover:bg-[hsl(var(--primary-gpo-dark))]' 
                  : 'hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <Icon className="h-4 w-4 mr-3" />
              <span className="flex-1">
                {language === 'ar' ? item.labelAr : item.label}
              </span>
              {item.badge && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {language === 'ar' ? item.badgeAr : item.badge}
                </Badge>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          className="quick-nav-btn group"
          size="lg"
          aria-label={language === 'ar' ? 'فتح قائمة التنقل السريع' : 'Open quick navigation'}
        >
          <div className="flex flex-col items-center justify-center">
            <PawPrint className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-xs font-medium hidden group-hover:block absolute -top-12 bg-black/80 text-white px-2 py-1 rounded whitespace-nowrap">
              {language === 'ar' ? 'التنقل' : 'Navigate'}
            </span>
          </div>
        </Button>
      </SheetTrigger>
      
      <SheetContent 
        side={language === 'ar' ? 'right' : 'left'} 
        className="w-[300px] sm:w-[400px] overflow-y-auto"
      >
        <SheetHeader className="text-left">
          <SheetTitle className="flex items-center gap-2">
            <PawPrint className="h-5 w-5 text-[hsl(var(--primary-gpo))]" />
            {language === 'ar' ? 'التنقل السريع' : 'Quick Navigation'}
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          {/* Role Selector */}
          <div className="p-3 bg-muted/50 rounded-lg">
            <h4 className="text-sm font-medium mb-3">
              {language === 'ar' ? 'نوع المستخدم' : 'User Role'}
            </h4>
            <RoleSelector 
              currentRole="user" 
              onRoleChange={(role) => console.log('Role changed to:', role)} 
            />
          </div>
          
          <Separator />
          
          {/* Main Navigation */}
          <NavigationSection
            title="Main"
            titleAr="الرئيسية"
            items={mainNavigation}
          />
          
          <Separator />
          
          {/* Services */}
          <NavigationSection
            title="Services"
            titleAr="الخدمات"
            items={servicesNavigation}
          />
          
          <Separator />
          
          {/* Governance */}
          <NavigationSection
            title="Governance"
            titleAr="الحكم"
            items={governanceNavigation}
          />
          
          <Separator />
          
          {/* Management */}
          <NavigationSection
            title="Management"
            titleAr="الإدارة"
            items={managementNavigation}
          />
          
          <Separator />
          
          {/* Quick Actions */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground px-2">
              {language === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}
            </h3>
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="nav-item w-full justify-start text-muted-foreground"
            >
              <User className="h-4 w-4 mr-3" />
              {language === 'ar' ? 'تسجيل الدخول' : 'Login / Register'}
            </Link>
          </div>
        </div>
        
        {/* Footer */}
        <div className="absolute bottom-4 left-4 right-4 p-3 bg-muted/30 rounded-lg">
          <div className="text-center text-xs text-muted-foreground">
            <p className="font-medium">GPO Platform</p>
            <p>{language === 'ar' ? 'العمل الجماعي الذكي' : 'Smart Collective Action'}</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default QuickNavigation;