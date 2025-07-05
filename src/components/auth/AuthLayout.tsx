
import { ReactNode } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
}

export const AuthLayout = ({ children, title, description }: AuthLayoutProps) => {
  const { language } = useLanguage();

  return (
    <div className={`min-h-screen bg-background flex items-center justify-center p-4 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
      <Card className="w-full max-w-md border border-border shadow-[var(--shadow-card)]">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-gpo-primary to-gpo-primary-light rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-lg font-bold text-white">GPO</span>
          </div>
          <CardTitle className="text-2xl font-bold text-gpo-primary">GPOsaas</CardTitle>
          <CardTitle className="text-xl text-foreground">{title}</CardTitle>
          <CardDescription className="text-muted-foreground">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </div>
  );
};
