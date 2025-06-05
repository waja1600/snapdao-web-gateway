
import React from "react";
import { Calendar, Clock } from "lucide-react";

interface DateTimeDisplayProps {
  currentDate: string;
  currentTime: string;
  isCollapsed: boolean;
}

export const DateTimeDisplay: React.FC<DateTimeDisplayProps> = ({
  currentDate,
  currentTime,
  isCollapsed
}) => {
  if (isCollapsed) return null;

  return (
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
  );
};
