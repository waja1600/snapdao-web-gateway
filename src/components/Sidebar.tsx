
import React from "react";
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
  FileSignature, 
  LogOut, 
  Settings,
  Search
} from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";

export const Sidebar = () => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const location = useLocation();
  const isMobile = useMobile();
  
  const navigation = [
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
      name: t('proposals'),
      href: "/proposals",
      icon: FileText,
    },
    {
      name: t('voting'),
      href: "/voting",
      icon: Vote,
    },
    {
      name: t('projects'),
      href: "/projects",
      icon: Settings,
    },
    {
      name: t('members'),
      href: "/members",
      icon: Users,
    },
    {
      name: t('agreement'),
      href: "/agreement",
      icon: FileSignature,
    },
  ];
  
  return (
    <aside className={cn(
      "bg-sidebar fixed inset-y-0 right-0 z-30 flex w-72 flex-col border-l border-sidebar-border bg-sidebar text-sidebar-foreground md:right-auto md:left-0 md:z-0 md:border-r lg:w-80",
      isMobile && "hidden"
    )}>
      <div className="flex items-center justify-between h-14 border-b border-sidebar-border px-4 py-2">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold tracking-tight"
        >
          SnapDAO
        </Link>
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
                    : "hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="mt-auto p-4">
        {user && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 rounded-md bg-sidebar-accent/50 px-3 py-2">
              <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center">
                {user.name[0]}
              </div>
              <div className="flex-1 truncate">
                <div className="font-medium truncate">{user.name}</div>
                <div className="text-xs opacity-70 truncate">{user.email}</div>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => logout()}
            >
              <LogOut className="h-4 w-4" />
              {t('logout')}
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
};
