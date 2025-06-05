
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell } from 'lucide-react';

interface NotificationButtonProps {
  notificationCount?: number;
}

export const NotificationButton: React.FC<NotificationButtonProps> = ({ 
  notificationCount = 3 
}) => {
  return (
    <Button variant="ghost" size="sm" className="relative h-10 w-10">
      <Bell className="h-5 w-5" />
      {notificationCount > 0 && (
        <Badge 
          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500"
          variant="destructive"
        >
          {notificationCount}
        </Badge>
      )}
    </Button>
  );
};
