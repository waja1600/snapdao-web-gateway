
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface SidebarNavigationProps {
  navigation: NavigationItem[];
  isCollapsed: boolean;
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  navigation,
  isCollapsed
}) => {
  const location = useLocation();

  return (
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
  );
};
