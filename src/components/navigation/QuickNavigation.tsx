
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  PawPrint, Home, Users, Building2, ShoppingCart, Megaphone, TrendingUp,
  Truck, UserCheck, UsersIcon, Briefcase, Package, Gavel, Scale, Brain,
  Vote, FileText, Bell, Settings, User, Wallet, MessageSquare, AlertCircle,
  CheckCircle, Clock, Shield, ChevronDown, ChevronRight, Star, Award
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link, useLocation } from 'react-router-dom';

interface NavigationItem {
  label: string;
  labelAr: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeAr?: string;
  requirements?: {
    kyc: boolean;
    points: boolean;
    mcp: boolean;
  };
  status?: 'new' | 'premium' | 'beta';
}

interface NavigationSection {
  title: string;
  titleAr: string;
  items: NavigationItem[];
  defaultOpen?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

export const QuickNavigation: React.FC = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    dashboard: true,
    portals: true,
    myActivity: true,
    governance: false,
    management: false,
    admin: false
  });

  const navigationSections: NavigationSection[] = [
    {
      title: "Dashboard",
      titleAr: "لوحة التحكم",
      icon: Home,
      items: [
        {
          label: 'Dashboard Overview',
          labelAr: 'نظرة عامة',
          href: '/dashboard',
          icon: Home,
        },
        {
          label: 'My Account',
          labelAr: 'حسابي',
          href: '/account',
          icon: User,
        },
        {
          label: 'My Wallet',
          labelAr: 'محفظتي',
          href: '/wallet',
          icon: Wallet,
          badge: '1,250',
          badgeAr: '١٬٢٥٠',
        },
      ],
      defaultOpen: true
    },
    {
      title: "Main Portals",
      titleAr: "البوابات الرئيسية",
      icon: Package,
      items: [
        {
          label: 'Cooperative Purchasing',
          labelAr: 'الشراء التعاوني',
          href: '/cooperative-purchasing',
          icon: ShoppingCart,
          requirements: { kyc: true, points: true, mcp: false },
          status: 'premium'
        },
        {
          label: 'Cooperative Marketing',
          labelAr: 'التسويق التعاوني',
          href: '/cooperative-marketing',
          icon: Megaphone,
          requirements: { kyc: true, points: true, mcp: false },
          status: 'premium'
        },
        {
          label: 'Company Formation',
          labelAr: 'تأسيس الشركات',
          href: '/company-formation',
          icon: Building2,
          requirements: { kyc: false, points: false, mcp: false }
        },
        {
          label: 'Investment Groups',
          labelAr: 'مجموعات الاستثمار',
          href: '/investment-groups',
          icon: TrendingUp,
          requirements: { kyc: true, points: true, mcp: false },
          status: 'premium'
        },
        {
          label: 'Suppliers',
          labelAr: 'الموردون',
          href: '/suppliers',
          icon: Truck,
          requirements: { kyc: true, points: true, mcp: false },
          status: 'premium'
        },
        {
          label: 'Freelancers',
          labelAr: 'المستقلون',
          href: '/freelancers',
          icon: UserCheck,
          requirements: { kyc: false, points: false, mcp: true }
        },
        {
          label: 'Freelancer Groups',
          labelAr: 'مجموعات المستقلين',
          href: '/freelancer-groups',
          icon: UsersIcon,
          requirements: { kyc: false, points: false, mcp: true }
        },
        {
          label: 'Service Providers',
          labelAr: 'مقدمو الخدمات',
          href: '/service-providers',
          icon: Briefcase,
          requirements: { kyc: false, points: false, mcp: false }
        },
        {
          label: 'Product Listings',
          labelAr: 'قوائم المنتجات',
          href: '/product-listings',
          icon: Package,
          requirements: { kyc: false, points: false, mcp: false }
        },
        {
          label: 'Arbitration & Documentation',
          labelAr: 'التحكيم والتوثيق',
          href: '/arbitration-documentation',
          icon: Scale,
          requirements: { kyc: false, points: false, mcp: false }
        },
        {
          label: 'Arbitration Requests',
          labelAr: 'طلبات التحكيم',
          href: '/arbitration-requests',
          icon: Gavel,
          requirements: { kyc: false, points: false, mcp: false }
        },
        {
          label: 'Smart Negotiation Solutions',
          labelAr: 'حلول التفاوض الذكية',
          href: '/smart-negotiation',
          icon: Brain,
          requirements: { kyc: false, points: false, mcp: false },
          status: 'beta'
        }
      ],
      defaultOpen: true
    },
    {
      title: "My Activity",
      titleAr: "نشاطي",
      icon: Users,
      items: [
        {
          label: 'My Groups',
          labelAr: 'مجموعاتي',
          href: '/my-groups',
          icon: Users,
          badge: '3',
          badgeAr: '٣',
        },
        {
          label: 'As Supplier',
          labelAr: 'كمورد',
          href: '/as-supplier',
          icon: Truck,
        },
        {
          label: 'As Freelancer',
          labelAr: 'كمستقل',
          href: '/as-freelancer',
          icon: UserCheck,
        },
        {
          label: 'As Company Founder',
          labelAr: 'كمؤسس شركة',
          href: '/as-company-founder',
          icon: Building2,
        },
        {
          label: 'Messages',
          labelAr: 'الرسائل',
          href: '/messages',
          icon: MessageSquare,
          badge: '2',
          badgeAr: '٢',
        },
        {
          label: 'Notifications',
          labelAr: 'الإشعارات',
          href: '/notifications',
          icon: Bell,
          badge: '5',
          badgeAr: '٥',
        }
      ]
    },
    {
      title: "Governance & Legal",
      titleAr: "الحوكمة والقانون",
      icon: Scale,
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
          badge: '2',
          badgeAr: '٢',
        },
        {
          label: 'Arbitration Cases',
          labelAr: 'قضايا التحكيم',
          href: '/arbitration-cases',
          icon: Gavel,
        },
        {
          label: 'Contracts',
          labelAr: 'العقود',
          href: '/contracts',
          icon: FileText,
        }
      ]
    },
    {
      title: "Management Tools",
      titleAr: "أدوات الإدارة",
      icon: Settings,
      items: [
        {
          label: 'KYC Verification',
          labelAr: 'التحقق من الهوية',
          href: '/kyc-verification',
          icon: Shield,
        },
        {
          label: 'Points Management',
          labelAr: 'إدارة النقاط',
          href: '/points-management',
          icon: Wallet,
        },
        {
          label: 'Reports & Analytics',
          labelAr: 'التقارير والتحليلات',
          href: '/reports',
          icon: TrendingUp,
        }
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

  const getRequirementsBadge = (requirements?: NavigationItem['requirements']) => {
    if (!requirements) return null;
    
    const badges = [];
    if (requirements.kyc) badges.push('KYC');
    if (requirements.points) badges.push(language === 'ar' ? 'نقاط' : 'Points');
    if (requirements.mcp) badges.push('MCP');
    
    return badges.join(' + ');
  };

  const getStatusBadge = (status?: NavigationItem['status']) => {
    if (!status) return null;
    
    const statusMap = {
      new: { text: language === 'ar' ? 'جديد' : 'New', color: 'bg-green-500' },
      premium: { text: language === 'ar' ? 'مميز' : 'Premium', color: 'bg-yellow-500' },
      beta: { text: language === 'ar' ? 'تجريبي' : 'Beta', color: 'bg-blue-500' }
    };
    
    return statusMap[status];
  };

  const NavigationSection: React.FC<{
    section: NavigationSection;
    sectionKey: string;
  }> = ({ section, sectionKey }) => {
    const isOpen = openSections[sectionKey] ?? section.defaultOpen ?? false;
    const SectionIcon = section.icon || Package;
    
    return (
      <Collapsible open={isOpen} onOpenChange={() => toggleSection(sectionKey)}>
        <CollapsibleTrigger asChild>
          <Button 
            variant="ghost" 
            className="w-full justify-between p-3 h-auto font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50"
          >
            <span className="flex items-center gap-2">
              <SectionIcon className="h-4 w-4" />
              {language === 'ar' ? section.titleAr : section.title}
            </span>
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
            const requirementsBadge = getRequirementsBadge(item.requirements);
            const statusBadge = getStatusBadge(item.status);
            
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-[hsl(var(--primary-gpo))] text-white hover:bg-[hsl(var(--primary-gpo-dark))]' 
                    : 'hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      {language === 'ar' ? item.labelAr : item.label}
                    </div>
                    {requirementsBadge && (
                      <div className="text-xs opacity-70 mt-1">
                        {requirementsBadge}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-1 flex-shrink-0">
                  {statusBadge && (
                    <Badge className={`text-xs ${statusBadge.color} text-white border-0`}>
                      {statusBadge.text}
                    </Badge>
                  )}
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {language === 'ar' ? item.badgeAr || item.badge : item.badge}
                    </Badge>
                  )}
                </div>
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
          className="quick-nav-btn group fixed bottom-6 right-6 z-50 shadow-lg hover:shadow-xl transition-all duration-300"
          size="lg"
          aria-label={language === 'ar' ? 'فتح قائمة التنقل السريع' : 'Open quick navigation'}
        >
          <div className="flex flex-col items-center justify-center relative">
            <PawPrint className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              7
            </Badge>
            <span className="text-xs font-medium opacity-0 group-hover:opacity-100 absolute -top-12 bg-black/80 text-white px-2 py-1 rounded whitespace-nowrap transition-opacity duration-300">
              {language === 'ar' ? 'التنقل السريع' : 'Quick Navigation'}
            </span>
          </div>
        </Button>
      </SheetTrigger>
      
      <SheetContent 
        side={language === 'ar' ? 'right' : 'left'} 
        className="w-[320px] sm:w-[400px] overflow-y-auto"
      >
        <SheetHeader className="text-left border-b pb-4">
          <SheetTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <PawPrint className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="font-bold">
                {language === 'ar' ? 'التنقل السريع' : 'Quick Navigation'}
              </div>
              <div className="text-sm text-muted-foreground font-normal">
                {language === 'ar' ? 'جميع البوابات والخدمات' : 'All Portals & Services'}
              </div>
            </div>
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          {/* User Status Card */}
          <div className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <span className="font-medium text-sm">
                  {language === 'ar' ? 'حالة موثق' : 'Verified Status'}
                </span>
              </div>
              <Badge className="bg-green-500 text-white">
                {language === 'ar' ? 'نشط' : 'Active'}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3 text-green-500" />
                <span>{language === 'ar' ? 'KYC: موثق' : 'KYC: Verified'}</span>
              </div>
              <div className="flex items-center gap-1">
                <Wallet className="h-3 w-3 text-blue-500" />
                <span>{language === 'ar' ? 'نقاط: ١٬٢٥٠' : 'Points: 1,250'}</span>
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Navigation Sections */}
          {navigationSections.map((section, index) => (
            <div key={section.title}>
              <NavigationSection 
                section={section} 
                sectionKey={Object.keys(openSections)[index] || section.title.toLowerCase().replace(/\s+/g, '')}
              />
              {index < navigationSections.length - 1 && <Separator className="my-2" />}
            </div>
          ))}
          
          <Separator />
          
          {/* Quick Links */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground px-2">
              {language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/create-group" onClick={() => setIsOpen(false)}>
                  <Users className="h-3 w-3 mr-1" />
                  {language === 'ar' ? 'إنشاء مجموعة' : 'Create Group'}
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/join-group" onClick={() => setIsOpen(false)}>
                  <UserCheck className="h-3 w-3 mr-1" />
                  {language === 'ar' ? 'انضمام لمجموعة' : 'Join Group'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="absolute bottom-4 left-4 right-4 p-3 bg-muted/30 rounded-lg">
          <div className="text-center text-xs text-muted-foreground">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Award className="h-4 w-4 text-primary" />
              <span className="font-medium">GPO Platform v2.0</span>
            </div>
            <p>{language === 'ar' ? 'منصة الأعمال التعاونية الذكية' : 'Smart Collaborative Business Platform'}</p>
            <p className="text-xs mt-1 opacity-75">
              {language === 'ar' ? 'معايير ISO 44001 & UNCITRAL' : 'ISO 44001 & UNCITRAL Standards'}
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default QuickNavigation;
