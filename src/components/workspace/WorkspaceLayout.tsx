
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
      "flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50",
      language === 'ar' ? 'flex-row-reverse' : ''
    )}>
      {/* Sidebar */}
      <div className={cn(
        "transition-all duration-300 bg-white/95 backdrop-blur-md border-r border-slate-200/50 shadow-lg relative z-10",
        sidebarCollapsed ? "w-16" : "w-80",
        language === 'ar' && "border-r-0 border-l border-slate-200/50"
      )}>
        <WorkspaceSidebar 
          collapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <WorkspaceHeader />
        
        <div className="flex-1 flex overflow-hidden relative">
          {/* Content Area */}
          <div className={cn(
            "flex-1 overflow-auto scrollbar-thin bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50",
            showChat && !chatCollapsed ? (language === 'ar' ? "ml-96" : "mr-96") : ""
          )}>
            <div className="p-6 min-h-full">
              {children}
            </div>
          </div>

          {/* Chat Panel */}
          {showChat && (
            <div className={cn(
              "absolute top-0 bottom-0 transition-all duration-300 bg-white/95 backdrop-blur-md border-l border-slate-200/50 shadow-lg z-20",
              chatCollapsed ? "w-12" : "w-96",
              language === 'ar' ? "left-0 border-l-0 border-r border-slate-200/50" : "right-0",
              chatCollapsed && (language === 'ar' ? "left-0" : "right-0")
            )}>
              {chatCollapsed ? (
                <div className="p-3 h-full flex flex-col items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setChatCollapsed(false)}
                    className="w-full h-12 mb-4 bg-blue-50 hover:bg-blue-100 border border-blue-200"
                  >
                    {language === 'ar' ? <PanelLeftOpen className="h-4 w-4" /> : <PanelRightOpen className="h-4 w-4" />}
                  </Button>
                  <div className="writing-mode-vertical text-xs text-gray-500 transform rotate-90 mt-8">
                    {language === 'ar' ? 'مساعد AI' : 'AI Assistant'}
                  </div>
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
