
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  FileText, 
  Vote, 
  Users, 
  LogOut, 
  Settings,
  Search,
  Gavel,
  SlidersHorizontal,
  Bell,
  Shield,
  ShoppingCart,
  Briefcase,
  UserCircle,
  FileSignature,
  ClipboardList,
  Star,
  Package,
  Clock,
  Calendar
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const Sidebar = () => {
  const { t, language } = useLanguage();
  const { user, logout } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  
  // Mock user role - in a real app, this would come from the auth context
  const [userRole, setUserRole] = useState<string>('company');
  
  useEffect(() => {
    // Update time and date every second
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
      setCurrentDate(now.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }));
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, [language]);
  
  useEffect(() => {
    // For demo purposes, detect role from path
    const rolePaths = {
      '/freelancers': 'freelancer',
      '/suppliers': 'supplier',
      '/cooperative-buying': 'company',
      '/arbitration': 'supervisor'
    };
    
    for (const [path, role] of Object.entries(rolePaths)) {
      if (location.pathname.startsWith(path)) {
        setUserRole(role);
        break;
      }
    }
  }, [location.pathname]);
  
  // Common navigation items for all roles
  const commonNavigation = [
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
  ];
  
  // Role-specific navigation items
  const roleSpecificNavigation = {
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
  };
  
  // Combine common navigation with role-specific navigation
  const navigation = [
    ...commonNavigation,
    ...(roleSpecificNavigation[userRole as keyof typeof roleSpecificNavigation] || []),
  ];
  
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  // Helper to get the role display name
  const getRoleDisplayName = () => {
    switch(userRole) {
      case 'company': return language === 'ar' ? 'شركة' : 'Company';
      case 'freelancer': return language === 'ar' ? 'مستقل' : 'Freelancer';
      case 'supplier': return language === 'ar' ? 'مورد' : 'Supplier';
      case 'supervisor': return language === 'ar' ? 'مشرف' : 'Supervisor';
      default: return '';
    }
  };

  // Helper function to get user display name
  const getUserDisplayName = () => {
    if (!user) return '';
    return user.user_metadata?.full_name || 
           user.email?.split('@')[0] || 
           (language === 'ar' ? 'مستخدم' : 'User');
  };

  // Helper function to get user initial
  const getUserInitial = () => {
    const displayName = getUserDisplayName();
    return displayName.charAt(0).toUpperCase();
  };

  // Helper function to get user email
  const getUserEmail = () => {
    return user?.email || '';
  };
  
  return (
    <aside className={cn(
      "bg-sidebar fixed inset-y-0 z-30 flex flex-col border-l border-sidebar-border bg-sidebar text-sidebar-foreground md:z-0 md:border-r transition-all duration-300",
      language === 'ar' ? "left-0 md:right-auto md:left-0" : "right-0 md:right-auto md:left-0",
      isCollapsed ? "w-20" : "w-80",
      isMobile && "hidden"
    )}>
      <div className="flex items-center justify-between h-16 border-b border-sidebar-border px-4 py-2">
        <Link
          to="/"
          className={cn("flex items-center gap-2 font-bold text-xl tracking-tight", 
            isCollapsed && "justify-center"
          )}
        >
          {isCollapsed ? "FG" : "ForGPO"}
        </Link>
        <Button 
          variant="ghost" 
          size="sm" 
          className="p-0 h-8 w-8" 
          onClick={toggleSidebar}
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Date and Time Display */}
      {!isCollapsed && (
        <div className="px-4 py-3 border-b border-sidebar-border bg-sidebar-accent/30">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-sidebar-foreground/80">
              <Calendar className="h-4 w-4" />
              <span className="font-medium">{currentDate}</span>
            </div>
            <div className="flex items-center gap-2 text-sidebar-foreground/80">
              <Clock className="h-4 w-4" />
              <span className="font-mono">{currentTime}</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-3 text-sidebar-foreground transition-all hover:text-sidebar-foreground font-medium",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                    : "hover:bg-sidebar-accent/50",
                  isCollapsed && "justify-center px-0"
                )}
              >
                <item.icon className="h-5 w-5" />
                {!isCollapsed && <span className="text-base">{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="mt-auto p-4 border-t border-sidebar-border">
        {user && (
          <div className="flex flex-col gap-3">
            {!isCollapsed && (
              <>
                <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent/50 px-3 py-3">
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-medium">
                    {getUserInitial()}
                  </div>
                  <div className="flex-1 truncate">
                    <div className="font-medium text-base truncate">{getUserDisplayName()}</div>
                    <div className="text-sm opacity-70 truncate">{getUserEmail()}</div>
                  </div>
                </div>
                {getRoleDisplayName() && (
                  <div className="px-3 py-2 text-sm font-medium bg-blue-50 text-blue-700 rounded-lg text-center">
                    {getRoleDisplayName()}
                  </div>
                )}
              </>
            )}
            <Button
              variant="outline"
              className={cn(
                "w-full gap-2 h-10 font-medium text-base",
                isCollapsed ? "justify-center" : "justify-start"
              )}
              onClick={() => logout()}
            >
              <LogOut className="h-5 w-5" />
              {!isCollapsed && (language === 'ar' ? 'تسجيل الخروج' : 'Logout')}
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
};
