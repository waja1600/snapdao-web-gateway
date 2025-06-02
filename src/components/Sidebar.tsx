
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
  Package
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const Sidebar = () => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Mock user role - in a real app, this would come from the auth context
  // Possible roles: 'company', 'freelancer', 'supplier', 'supervisor'
  const [userRole, setUserRole] = useState<string>('company');
  
  useEffect(() => {
    // For demo purposes, randomly assign roles when navigating
    // In a real app, the role would come from user profile data
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
      name: t('dashboard'),
      href: "/dashboard",
      icon: Home,
    },
    {
      name: "استكشاف",
      href: "/explore",
      icon: Search,
    },
    {
      name: t('verification'),
      href: "/verification",
      icon: Shield,
    },
    {
      name: t('notifications'),
      href: "/notifications",
      icon: Bell,
    },
    {
      name: t('invoices'),
      href: "/invoices",
      icon: FileText,
    },
    {
      name: t('arbitration'),
      href: "/arbitration",
      icon: Gavel,
    },
  ];
  
  // Role-specific navigation items
  const roleSpecificNavigation = {
    company: [
      {
        name: t('contracts'),
        href: "/contracts",
        icon: FileSignature,
      },
      {
        name: t('myGroups'),
        href: "/groups",
        icon: Users,
      },
      {
        name: t('voting'),
        href: "/voting",
        icon: Vote,
      },
      {
        name: t('cooperativeBuying'),
        href: "/cooperative-buying",
        icon: ShoppingCart,
      },
    ],
    freelancer: [
      {
        name: t('offers'),
        href: "/offers",
        icon: ClipboardList,
      },
      {
        name: t('tasks'),
        href: "/tasks",
        icon: ClipboardList,
      },
      {
        name: t('ratings'),
        href: "/ratings",
        icon: Star,
      },
    ],
    supplier: [
      {
        name: t('products'),
        href: "/products",
        icon: Package,
      },
      {
        name: t('offers'),
        href: "/supplier-offers",
        icon: ClipboardList,
      },
    ],
    supervisor: [
      {
        name: t('contracts'),
        href: "/monitor-contracts",
        icon: FileSignature,
      },
      {
        name: t('myGroups'),
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
      case 'company': return t('roleCompany');
      case 'freelancer': return t('roleFreelancer');
      case 'supplier': return t('roleSupplier');
      case 'supervisor': return t('roleSupervisor');
      default: return '';
    }
  };
  
  return (
    <aside className={cn(
      "bg-sidebar fixed inset-y-0 right-0 z-30 flex flex-col border-l border-sidebar-border bg-sidebar text-sidebar-foreground md:right-auto md:left-0 md:z-0 md:border-r transition-all duration-300",
      isCollapsed ? "w-16" : "w-72 lg:w-80",
      isMobile && "hidden"
    )}>
      <div className="flex items-center justify-between h-14 border-b border-sidebar-border px-4 py-2">
        <Link
          to="/"
          className={cn("flex items-center gap-2 font-bold tracking-tight", 
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
      
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-foreground transition-all hover:text-sidebar-foreground",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "hover:bg-sidebar-accent/50",
                  isCollapsed && "justify-center px-0"
                )}
              >
                <item.icon className="h-4 w-4" />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="mt-auto p-4">
        {user && (
          <div className="flex flex-col gap-2">
            {!isCollapsed && (
              <>
                <div className="flex items-center gap-2 rounded-md bg-sidebar-accent/50 px-3 py-2">
                  <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center">
                    {user.name[0]}
                  </div>
                  <div className="flex-1 truncate">
                    <div className="font-medium truncate">{user.name}</div>
                    <div className="text-xs opacity-70 truncate">{user.email}</div>
                  </div>
                </div>
                {getRoleDisplayName() && (
                  <div className="px-3 py-1 text-xs font-medium">
                    {getRoleDisplayName()}
                  </div>
                )}
              </>
            )}
            <Button
              variant="outline"
              className={cn(
                "w-full gap-2",
                isCollapsed ? "justify-center" : "justify-start"
              )}
              onClick={() => logout()}
            >
              <LogOut className="h-4 w-4" />
              {!isCollapsed && t('logout')}
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
};
