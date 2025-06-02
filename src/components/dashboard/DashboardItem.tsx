
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export interface DashboardItemProps {
  icon: React.ElementType;
  title: string;
  value: string;
  description: string;
  route: string;
  status?: 'verified' | 'pending' | 'not_started';
}

export const DashboardItem: React.FC<DashboardItemProps> = ({
  icon: Icon,
  title,
  value,
  description,
  route,
  status
}) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  return (
    <Card 
      className={status === 'verified' ? 'border-green-300 bg-green-50' : 
                status === 'pending' ? 'border-yellow-300 bg-yellow-50' : ''}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-4 w-full"
          onClick={() => navigate(route)}
        >
          {language === 'en' ? 'View' : 'عرض'}
        </Button>
      </CardContent>
    </Card>
  );
};
