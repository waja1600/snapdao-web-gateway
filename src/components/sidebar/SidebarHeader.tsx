
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarHeaderProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  isCollapsed,
  onToggle
}) => {
  return (
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
        onClick={onToggle}
      >
        <SlidersHorizontal className="h-4 w-4" />
      </Button>
    </div>
  );
};
