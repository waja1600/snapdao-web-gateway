
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
        <SidebarGroup>
          <SidebarGroupLabel>
            {language === 'ar' ? 'التنقل الرئيسي' : 'Main Navigation'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      tooltip={isCollapsed ? item.name : undefined}
                    >
                      <Link to={item.href}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
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
