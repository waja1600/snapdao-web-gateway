import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { DateTimeDisplay } from "./sidebar/DateTimeDisplay";
import { UserProfile } from "./sidebar/UserProfile";
import { useSidebarState } from "./sidebar/useSidebarState";
import { useSidebarNavigation } from "./sidebar/useSidebarNavigation";
import { useSidebarUser } from "./sidebar/useSidebarUser";

export const AppSidebar = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const { user } = useAuth();
  const { state } = useSidebar();
  
  const {
    currentTime,
    currentDate,
    userRole,
  } = useSidebarState(language);

  const { navigation } = useSidebarNavigation(language, userRole);
  
  const {
    logout,
    getRoleDisplayName,
    getUserDisplayName,
    getUserInitial,
    getUserEmail
  } = useSidebarUser(userRole, language);

  const isCollapsed = state === 'collapsed';

  // Group navigation items by categories
  const dashboardItems = navigation.slice(0, 3); // Dashboard, Account, Wallet
  const portalItems = navigation.slice(3, 15); // All 12 portals
  const activityItems = navigation.slice(15, 21); // My Groups, As Supplier, etc.
  const adminItems = navigation.slice(21).filter(item => item.href.includes('/admin'));
  const otherItems = navigation.slice(21).filter(item => !item.href.includes('/admin'));

  const renderNavigationGroup = (items: typeof navigation, label: string, labelAr: string) => (
    <SidebarGroup>
      <SidebarGroupLabel>
        {language === 'ar' ? labelAr : label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive}
                  tooltip={isCollapsed ? item.name : undefined}
                >
                  <Link to={item.href} className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar 
      variant="inset"
      className={cn(
        "transition-all duration-300",
        language === 'ar' ? "border-l border-sidebar-border" : "border-r border-sidebar-border"
      )}
    >
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center justify-between px-2 py-3">
          <Link
            to="/"
            className={cn(
              "flex items-center gap-2 font-bold text-xl tracking-tight transition-all",
              isCollapsed ? "justify-center" : ""
            )}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">GPO</span>
            </div>
            {!isCollapsed && (
              <span className="gradient-text bg-gradient-to-r from-primary to-dao-blue bg-clip-text text-transparent">
                GPO WORLD
              </span>
            )}
          </Link>
          <SidebarTrigger className="ml-auto" />
        </div>
      </SidebarHeader>

      {!isCollapsed && (
        <DateTimeDisplay
          currentDate={currentDate}
          currentTime={currentTime}
          isCollapsed={false}
        />
      )}
      
      <SidebarContent className="flex-1 overflow-auto">
        {/* Dashboard Section */}
        {renderNavigationGroup(
          dashboardItems, 
          'Dashboard', 
          'لوحة التحكم'
        )}

        {/* Main Portals Section */}
        {renderNavigationGroup(
          portalItems, 
          'Main Portals', 
          'البوابات الرئيسية'
        )}

        {/* My Activity Section */}
        {renderNavigationGroup(
          activityItems, 
          'My Activity', 
          'نشاطي'
        )}

        {/* Admin Section - Only for admins */}
        {adminItems.length > 0 && renderNavigationGroup(
          adminItems, 
          'Administration', 
          'الإدارة'
        )}

        {/* Other Items */}
        {otherItems.length > 0 && renderNavigationGroup(
          otherItems, 
          'Other', 
          'أخرى'
        )}
      </SidebarContent>
      
      <SidebarFooter className="border-t border-sidebar-border">
        <UserProfile
          user={user}
          userRole={userRole}
          language={language}
          isCollapsed={isCollapsed}
          onLogout={logout}
          getUserDisplayName={getUserDisplayName}
          getUserInitial={getUserInitial}
          getUserEmail={getUserEmail}
          getRoleDisplayName={getRoleDisplayName}
        />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};
