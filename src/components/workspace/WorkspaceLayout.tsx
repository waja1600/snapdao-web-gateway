
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { WorkspaceSidebar } from './WorkspaceSidebar';
import { WorkspaceHeader } from './WorkspaceHeader';
import { WorkspaceChat } from './WorkspaceChat';
import { PanelLeftOpen, PanelRightOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WorkspaceLayoutProps {
  children: React.ReactNode;
  showChat?: boolean;
}

export const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({ 
  children, 
  showChat = true 
}) => {
  const { language } = useLanguage();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [chatCollapsed, setChatCollapsed] = useState(false);

  return (
    <div className={cn(
      "flex h-screen bg-gradient-to-br from-slate-50 to-blue-50",
      language === 'ar' ? 'flex-row-reverse' : ''
    )}>
      {/* Sidebar */}
      <div className={cn(
        "transition-all duration-300 bg-white border-r border-slate-200 shadow-lg",
        sidebarCollapsed ? "w-16" : "w-80"
      )}>
        <WorkspaceSidebar 
          collapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <WorkspaceHeader />
        
        <div className="flex-1 flex overflow-hidden">
          {/* Content Area */}
          <div className={cn(
            "flex-1 overflow-auto",
            showChat && !chatCollapsed ? "mr-96" : ""
          )}>
            <div className="p-6">
              {children}
            </div>
          </div>

          {/* Chat Panel */}
          {showChat && (
            <div className={cn(
              "transition-all duration-300 bg-white border-l border-slate-200 shadow-lg",
              chatCollapsed ? "w-12" : "w-96"
            )}>
              {chatCollapsed ? (
                <div className="p-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setChatCollapsed(false)}
                    className="w-full"
                  >
                    <PanelRightOpen className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <WorkspaceChat onCollapse={() => setChatCollapsed(true)} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
