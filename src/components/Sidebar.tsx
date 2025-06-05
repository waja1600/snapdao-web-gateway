
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { DateTimeDisplay } from "./sidebar/DateTimeDisplay";
import { SidebarNavigation } from "./sidebar/SidebarNavigation";
import { UserProfile } from "./sidebar/UserProfile";
import { useSidebarState } from "./sidebar/useSidebarState";
import { useSidebarNavigation } from "./sidebar/useSidebarNavigation";
import { useSidebarUser } from "./sidebar/useSidebarUser";

export const Sidebar = () => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  
  const {
    isCollapsed,
    currentTime,
    currentDate,
    userRole,
    toggleSidebar
  } = useSidebarState(language);

  const { navigation } = useSidebarNavigation(language, userRole);
  
  const {
    user,
    logout,
    getRoleDisplayName,
    getUserDisplayName,
    getUserInitial,
    getUserEmail
  } = useSidebarUser(userRole, language);
  
  return (
    <aside className={cn(
      "bg-sidebar fixed inset-y-0 z-30 flex flex-col border-l border-sidebar-border bg-sidebar text-sidebar-foreground md:z-0 md:border-r transition-all duration-300",
      language === 'ar' ? "left-0 md:right-auto md:left-0" : "right-0 md:right-auto md:left-0",
      isCollapsed ? "w-20" : "w-80",
      isMobile && "hidden"
    )}>
      <SidebarHeader 
        isCollapsed={isCollapsed} 
        onToggle={toggleSidebar} 
      />

      <DateTimeDisplay
        currentDate={currentDate}
        currentTime={currentTime}
        isCollapsed={isCollapsed}
      />
      
      <SidebarNavigation 
        navigation={navigation}
        isCollapsed={isCollapsed}
      />
      
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
    </aside>
  );
};
