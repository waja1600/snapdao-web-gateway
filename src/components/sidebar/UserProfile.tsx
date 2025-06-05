
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { User } from "@supabase/supabase-js";

interface UserProfileProps {
  user: User | null;
  userRole: string;
  language: string;
  isCollapsed: boolean;
  onLogout: () => void;
  getUserDisplayName: () => string;
  getUserInitial: () => string;
  getUserEmail: () => string;
  getRoleDisplayName: () => string;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  userRole,
  language,
  isCollapsed,
  onLogout,
  getUserDisplayName,
  getUserInitial,
  getUserEmail,
  getRoleDisplayName
}) => {
  if (!user) return null;

  return (
    <div className="mt-auto p-4 border-t border-sidebar-border">
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
          onClick={onLogout}
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && (language === 'ar' ? 'تسجيل الخروج' : 'Logout')}
        </Button>
      </div>
    </div>
  );
};
