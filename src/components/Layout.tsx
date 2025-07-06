
import { ReactNode, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { MCPAssistant } from "./mcp/MCPAssistant";

interface LayoutProps {
  children: ReactNode;
  sidebar?: boolean;
}

export function Layout({ children, sidebar = true }: LayoutProps) {
  const { language } = useLanguage();
  
  return (
    <div className={cn(
      "flex min-h-screen bg-gray-50", 
      language === 'ar' ? "flex-row-reverse" : ""
    )}>
      {sidebar && <Sidebar />}
      <main className={cn(
        "flex flex-col flex-1 transition-all duration-300",
        sidebar ? (language === 'ar' ? "md:mr-80" : "md:ml-80") : ""
      )}>
        <Header />
        <div className="flex-1 p-6 bg-white min-h-screen">
          {children}
        </div>
      </main>
      <MCPAssistant />
    </div>
  );
}
