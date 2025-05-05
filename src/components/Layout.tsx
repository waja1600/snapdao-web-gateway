
import { ReactNode, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
  sidebar?: boolean;
}

export function Layout({ children, sidebar = true }: LayoutProps) {
  const { language } = useLanguage();
  
  return (
    <div className={cn("flex min-h-screen", language === 'ar' ? "flex-row-reverse" : "")}>
      {sidebar && <Sidebar />}
      <main className="flex flex-col flex-1 md:ml-72 lg:ml-80 transition-all duration-300">
        <Header />
        <div className="flex-1 p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
