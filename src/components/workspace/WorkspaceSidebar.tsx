
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  Home, Users, FileText, MessageSquare, Settings,
  PanelLeftClose, PanelLeftOpen, Briefcase, 
  TrendingUp, Shield, Vote, Gavel, Workflow, GitBranch
} from 'lucide-react';

interface WorkspaceSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({
  collapsed,
  onToggle
}) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      id: 'dashboard',
      label: language === 'ar' ? 'لوحة التحكم' : 'Dashboard',
      icon: Home,
      path: '/dashboard',
      badge: null
    },
    {
      id: 'workflow',
      label: language === 'ar' ? 'سير العمل' : 'Workflow',
      icon: GitBranch,
      path: '/workflow-management',
      badge: null
    },
    {
      id: 'groups',
      label: language === 'ar' ? 'المجموعات' : 'Groups',
      icon: Users,
      path: '/groups',
      badge: '5'
    },
    {
      id: 'projects',
      label: language === 'ar' ? 'المشاريع' : 'Projects',
      icon: Briefcase,
      path: '/project-management',
      badge: null
    },
    {
      id: 'proposals',
      label: language === 'ar' ? 'المقترحات' : 'Proposals',
      icon: FileText,
      path: '/proposals',
      badge: '3'
    },
    {
      id: 'voting',
      label: language === 'ar' ? 'التصويت' : 'Voting',
      icon: Vote,
      path: '/voting',
      badge: null
    },
    {
      id: 'deals',
      label: language === 'ar' ? 'الصفقات' : 'Deals',
      icon: TrendingUp,
      path: '/deals',
      badge: null
    },
    {
      id: 'arbitration',
      label: language === 'ar' ? 'التحكيم' : 'Arbitration',
      icon: Gavel,
      path: '/arbitration',
      badge: null
    },
    {
      id: 'chat',
      label: language === 'ar' ? 'المحادثات' : 'Chat',
      icon: MessageSquare,
      path: '/chat',
      badge: '12'
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        {!collapsed && (
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {language === 'ar' ? 'منصة GPO' : 'GPO Platform'}
          </h1>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="p-2"
        >
          {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-2">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={isActive(item.path) ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-11",
                collapsed && "px-2",
                isActive(item.path) && "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              )}
              onClick={() => navigate(item.path)}
            >
              <item.icon className={cn("h-5 w-5", collapsed && "mx-auto")} />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          ))}
        </div>
      </ScrollArea>

      {/* Settings */}
      <div className="p-3 border-t border-slate-200">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 h-11",
            collapsed && "px-2"
          )}
          onClick={() => navigate('/settings')}
        >
          <Settings className={cn("h-5 w-5", collapsed && "mx-auto")} />
          {!collapsed && <span>{language === 'ar' ? 'الإعدادات' : 'Settings'}</span>}
        </Button>
      </div>
    </div>
  );
};
