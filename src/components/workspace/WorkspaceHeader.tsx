
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Bell, Search, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

export const WorkspaceHeader: React.FC = () => {
  const { language } = useLanguage();
  const { user, signOut } = useAuth();

  return (
    <header className={cn(
      "flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 shadow-sm",
      language === 'ar' ? 'flex-row-reverse' : ''
    )}>
      {/* Search & Navigation */}
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder={language === 'ar' ? 'البحث في المساحة...' : 'Search workspace...'}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Status & Actions */}
      <div className="flex items-center gap-4">
        {/* Workspace Status */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">
            {language === 'ar' ? 'متصل' : 'Online'}
          </span>
        </div>

        {/* Active Workflows Badge */}
        <Badge variant="secondary" className="bg-blue-50 text-blue-700">
          {language === 'ar' ? '٣ مهام نشطة' : '3 Active Tasks'}
        </Badge>

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
        </Button>

        {/* Settings */}
        <Button variant="ghost" size="sm">
          <Settings className="h-5 w-5" />
        </Button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
          <div className="text-right">
            <div className="text-sm font-medium">
              {user?.user_metadata?.full_name || 'المستخدم'}
            </div>
            <div className="text-xs text-gray-500">
              {language === 'ar' ? 'مدير المشروع' : 'Project Manager'}
            </div>
          </div>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-blue-100 text-blue-700">
              {(user?.user_metadata?.full_name || 'U').charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Logout */}
        <Button variant="ghost" size="sm" onClick={() => signOut()}>
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};
