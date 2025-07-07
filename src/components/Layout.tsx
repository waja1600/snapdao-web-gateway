
import { ReactNode } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { Header } from "./Header";
import { MCPAssistant } from "./mcp/MCPAssistant";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

interface LayoutProps {
  children: ReactNode;
  sidebar?: boolean;
}

export function Layout({ children, sidebar = true }: LayoutProps) {
  const { language } = useLanguage();
  
  if (!sidebar) {
    return (
      <div className="flex min-h-screen bg-background">
        <main className="flex flex-col flex-1">
          <Header />
          <div className="flex-1 bg-background min-h-screen">
            <div className="container-responsive section-spacing">
              {children}
            </div>
          </div>
        </main>
        <MCPAssistant />
      </div>
    );
  }
  
  return (
    <SidebarProvider>
      <div className={cn("min-h-screen flex w-full", language === 'ar' ? 'flex-row-reverse' : '')}>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <div className="flex-1 bg-background min-h-screen">
            <div className="container-responsive section-spacing">
              {children}
            </div>
          </div>
        </SidebarInset>
        <MCPAssistant />
      </div>
    </SidebarProvider>
  );
}
