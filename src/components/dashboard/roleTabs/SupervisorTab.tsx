
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';

export const SupervisorTab: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === 'en' ? 'Contracts Under Supervision' : 'العقود تحت الإشراف'}
        </CardTitle>
        <CardDescription>
          {language === 'en' 
            ? 'Monitor ongoing contracts and their progress' 
            : 'مراقبة العقود الجارية وتقدمها'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">
                {language === 'en' ? 'Software Development Project' : 'مشروع تطوير برمجيات'}
              </h3>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {language === 'en' ? 'In Progress' : 'قيد التنفيذ'}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              {language === 'en' 
                ? 'Contract between TechGroup and DeveloperOne' 
                : 'عقد بين مجموعة التقنية والمطور الأول'}
            </p>
            <div className="flex justify-between text-sm mb-1">
              <span>{language === 'en' ? 'Completion' : 'الإكتمال'}: 45%</span>
            </div>
            <Progress value={45} className="h-2" />
            <Button className="mt-4 w-full" onClick={() => navigate('/monitor-contracts/tech-dev')}>
              {language === 'en' ? 'View Details' : 'عرض التفاصيل'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
