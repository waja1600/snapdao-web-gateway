
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { PawPrint, Home, Users, Building, Gavel, Vote, DollarSign, Settings, User, ChevronDown, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link, useLocation } from 'react-router-dom';
import { RoleSelector } from '@/components/dashboard/RoleSelector';

interface NavigationItem {
  label: string;
  labelAr: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeAr?: string;
}

interface NavigationSection {
  title: string;
  titleAr: string;
  items: NavigationItem[];
  defaultOpen?: boolean;
}

export const QuickNavigation: React.FC = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    main: true,
    services: true,
    governance: false,
    management: false
  });

  const navigationSections: NavigationSection[] = [
    {
      title: "Main",
      titleAr: "الرئيسية",
      items: [
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
      ],
      defaultOpen: true
    },
    {
      title: "Services",
      titleAr: "الخدمات",
      items: [
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
      ],
      defaultOpen: true
    },
    {
      title: "Governance",
      titleAr: "الحكم",
      items: [
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
      ]
    },
    {
      title: "Management",
      titleAr: "الإدارة",
      items: [
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
      ]
    }
  ];

  const isActiveRoute = (href: string) => {
    return location.pathname === href;
  };

  const toggleSection = (sectionKey: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const NavigationSection: React.FC<{
    section: NavigationSection;
    sectionKey: string;
  }> = ({ section, sectionKey }) => {
    const isOpen = openSections[sectionKey] ?? section.defaultOpen ?? false;
    
    return (
      <Collapsible open={isOpen} onOpenChange={() => toggleSection(sectionKey)}>
        <CollapsibleTrigger asChild>
          <Button 
            variant="ghost" 
            className="w-full justify-between p-2 h-auto font-medium text-muted-foreground hover:text-foreground"
          >
            <span>{language === 'ar' ? section.titleAr : section.title}</span>
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="space-y-1 pl-2">
          {section.items.map((item) => {
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
        </CollapsibleContent>
      </Collapsible>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          className="quick-nav-btn group fixed bottom-6 right-6 z-50 shadow-lg"
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
        
        <div className="mt-6 space-y-4">
          {/* Role Selector */}
          <div className="p-3 bg-muted/50 rounded-lg">
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                  <h4 className="text-sm font-medium">
                    {language === 'ar' ? 'نوع المستخدم' : 'User Role'}
                  </h4>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3">
                <RoleSelector 
                  currentRole="user" 
                  onRoleChange={(role) => console.log('Role changed to:', role)} 
                />
              </CollapsibleContent>
            </Collapsible>
          </div>
          
          <Separator />
          
          {/* Navigation Sections */}
          {navigationSections.map((section, index) => (
            <div key={section.title}>
              <NavigationSection 
                section={section} 
                sectionKey={Object.keys(openSections)[index] || section.title.toLowerCase()}
              />
              {index < navigationSections.length - 1 && <Separator className="my-2" />}
            </div>
          ))}
          
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
            <Link
              to="/dashboard?tab=settings"
              onClick={() => setIsOpen(false)}
              className="nav-item w-full justify-start text-muted-foreground"
            >
              <Settings className="h-4 w-4 mr-3" />
              {language === 'ar' ? 'الإعدادات' : 'Settings'}
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
