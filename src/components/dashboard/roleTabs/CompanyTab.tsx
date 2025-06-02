
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';

export const CompanyTab: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === 'en' ? 'Cooperative Buying Groups' : 'مجموعات الشراء التعاوني'}
        </CardTitle>
        <CardDescription>
          {language === 'en' 
            ? 'Join groups to get better deals on bulk purchases' 
            : 'انضم إلى المجموعات للحصول على صفقات أفضل على المشتريات بالجملة'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">
                {language === 'en' ? 'Office Supplies Group' : 'مجموعة مستلزمات المكتب'}
              </h3>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                {language === 'en' ? 'Active' : 'نشط'}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              {language === 'en' 
                ? 'Bulk purchase of office supplies at wholesale prices' 
                : 'شراء بالجملة لمستلزمات المكتب بأسعار الجملة'}
            </p>
            <div className="flex justify-between text-sm mb-1">
              <span>{language === 'en' ? 'Members' : 'الأعضاء'}: 15/20</span>
              <span>75%</span>
            </div>
            <Progress value={75} className="h-2" />
            <Button className="mt-4 w-full" onClick={() => navigate('/groups/office-supplies')}>
              {language === 'en' ? 'View Group' : 'عرض المجموعة'}
            </Button>
          </div>
          
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">
                {language === 'en' ? 'IT Equipment Group' : 'مجموعة معدات تكنولوجيا المعلومات'}
              </h3>
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                {language === 'en' ? 'Forming' : 'قيد التشكيل'}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              {language === 'en' 
                ? 'Group purchase of computers and IT equipment' 
                : 'شراء جماعي لأجهزة الكمبيوتر ومعدات تكنولوجيا المعلومات'}
            </p>
            <div className="flex justify-between text-sm mb-1">
              <span>{language === 'en' ? 'Members' : 'الأعضاء'}: 8/30</span>
              <span>27%</span>
            </div>
            <Progress value={27} className="h-2" />
            <Button className="mt-4 w-full" variant="outline" onClick={() => navigate('/groups/it-equipment')}>
              {language === 'en' ? 'Join Group' : 'الانضمام للمجموعة'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
