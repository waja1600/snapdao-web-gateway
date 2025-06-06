
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  PanelLeftClose, 
  PanelLeftOpen,
  Home,
  Workflow,
  Users,
  FileText,
  Vote,
  Gavel,
  BarChart3,
  Settings,
  Bell,
  Plus,
  Search,
  Filter,
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const [activeSection, setActiveSection] = useState('main');

  const navigationItems = [
    {
      section: 'main',
      title: language === 'ar' ? 'الرئيسية' : 'Main',
      items: [
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
          icon: Workflow,
          path: '/workflow-management',
          badge: '3'
        },
        {
          id: 'projects',
          label: language === 'ar' ? 'المشاريع' : 'Projects',
          icon: FileText,
          path: '/projects',
          badge: '5'
        }
      ]
    },
    {
      section: 'collaboration',
      title: language === 'ar' ? 'التعاون' : 'Collaboration',
      items: [
        {
          id: 'groups',
          label: language === 'ar' ? 'المجموعات' : 'Groups',
          icon: Users,
          path: '/groups',
          badge: '2'
        },
        {
          id: 'proposals',
          label: language === 'ar' ? 'المقترحات' : 'Proposals',
          icon: Vote,
          path: '/proposals',
          badge: null
        },
        {
          id: 'voting',
          label: language === 'ar' ? 'التصويت' : 'Voting',
          icon: Vote,
          path: '/voting',
          badge: 'جديد'
        }
      ]
    },
    {
      section: 'governance',
      title: language === 'ar' ? 'الحوكمة' : 'Governance',
      items: [
        {
          id: 'arbitration',
          label: language === 'ar' ? 'التحكيم' : 'Arbitration',
          icon: Gavel,
          path: '/arbitration-ipfs',
          badge: null
        },
        {
          id: 'collective',
          label: language === 'ar' ? 'الاتفاقية الجماعية' : 'Collective Agreement',
          icon: FileText,
          path: '/collective-agreement',
          badge: null
        }
      ]
    },
    {
      section: 'analytics',
      title: language === 'ar' ? 'التحليلات' : 'Analytics',
      items: [
        {
          id: 'reports',
          label: language === 'ar' ? 'التقارير' : 'Reports',
          icon: BarChart3,
          path: '/reports',
          badge: null
        },
        {
          id: 'expenses',
          label: language === 'ar' ? 'المصروفات' : 'Expenses',
          icon: BarChart3,
          path: '/expenses',
          badge: null
        }
      ]
    }
  ];

  const quickActions = [
    {
      id: 'new_workflow',
      label: language === 'ar' ? 'سير عمل جديد' : 'New Workflow',
      icon: Workflow,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      id: 'new_proposal',
      label: language === 'ar' ? 'مقترح جديد' : 'New Proposal',
      icon: FileText,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      id: 'create_group',
      label: language === 'ar' ? 'إنشاء مجموعة' : 'Create Group',
      icon: Users,
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'workflow_update',
      title: language === 'ar' ? 'تحديث سير العمل' : 'Workflow Updated',
      time: '5 دقائق',
      status: 'success'
    },
    {
      id: 2,
      type: 'new_proposal',
      title: language === 'ar' ? 'مقترح جديد' : 'New Proposal',
      time: '15 دقيقة',
      status: 'pending'
    },
    {
      id: 3,
      type: 'task_completed',
      title: language === 'ar' ? 'مهمة مكتملة' : 'Task Completed',
      time: '1 ساعة',
      status: 'completed'
    }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const getActivityIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle2 className="h-3 w-3 text-green-500" />;
      case 'pending': return <Clock className="h-3 w-3 text-yellow-500" />;
      case 'completed': return <CheckCircle2 className="h-3 w-3 text-blue-500" />;
      default: return <AlertTriangle className="h-3 w-3 text-gray-500" />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-white/95 backdrop-blur-md">
      {/* Header */}
      <div className="p-4 border-b border-slate-200/50">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Workflow className="h-4 w-4 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">
                  {language === 'ar' ? 'مساحة العمل' : 'Workspace'}
                </h2>
                <p className="text-xs text-gray-500">
                  {language === 'ar' ? 'نظام إدارة متقدم' : 'Advanced Management'}
                </p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-8 w-8 p-0"
          >
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Quick Search */}
          {!collapsed && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={language === 'ar' ? 'البحث السريع...' : 'Quick search...'}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              />
            </div>
          )}

          {/* Quick Actions */}
          {!collapsed && (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                {language === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {quickActions.map((action) => (
                  <Button
                    key={action.id}
                    variant="outline"
                    size="sm"
                    className={cn(
                      "justify-start gap-2 h-9 text-white border-0",
                      action.color
                    )}
                  >
                    <action.icon className="h-4 w-4" />
                    <span className="text-xs">{action.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="space-y-6">
            {navigationItems.map((section) => (
              <div key={section.section}>
                {!collapsed && (
                  <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
                    {section.title}
                  </h3>
                )}
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <Button
                      key={item.id}
                      variant="ghost"
                      onClick={() => handleNavigation(item.path)}
                      className={cn(
                        "w-full justify-start gap-3 h-10",
                        isActivePath(item.path) 
                          ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600" 
                          : "text-gray-700 hover:bg-gray-50"
                      )}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-left text-sm">{item.label}</span>
                          {item.badge && (
                            <Badge 
                              variant="secondary" 
                              className="text-xs h-5 px-1.5 bg-blue-100 text-blue-800"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activities */}
          {!collapsed && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  {language === 'ar' ? 'النشاطات الأخيرة' : 'Recent Activity'}
                </h3>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Filter className="h-3 w-3" />
                </Button>
              </div>
              <div className="space-y-2">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-50">
                    {getActivityIcon(activity.status)}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 truncate">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200/50">
        {!collapsed && (
          <div className="space-y-2">
            <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
              <Settings className="h-4 w-4" />
              <span className="text-sm">{language === 'ar' ? 'الإعدادات' : 'Settings'}</span>
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
              <Bell className="h-4 w-4" />
              <span className="text-sm">{language === 'ar' ? 'الإشعارات' : 'Notifications'}</span>
              <Badge variant="destructive" className="ml-auto h-5 w-5 rounded-full text-xs p-0 flex items-center justify-center">
                3
              </Badge>
            </Button>
          </div>
        )}
        {collapsed && (
          <div className="space-y-2">
            <Button variant="ghost" size="sm" className="w-full h-10">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="w-full h-10 relative">
              <Bell className="h-4 w-4" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
