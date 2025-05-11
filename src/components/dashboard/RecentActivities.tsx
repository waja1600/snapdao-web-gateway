
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart, FileText, Vote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const RecentActivities: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {language === 'en' ? 'Recent Activities' : 'الأنشطة الحديثة'}
        </h2>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <ShoppingCart className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">
                  {language === 'en' ? 'You joined "Office Supplies Group"' : 'انضممت إلى "مجموعة مستلزمات المكتب"'}
                </h3>
                <p className="text-sm text-gray-500">
                  {language === 'en' ? '2 days ago' : 'منذ يومين'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-2 rounded-full">
                <FileText className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">
                  {language === 'en' ? 'Invoice #INV-2023 was paid' : 'تم دفع الفاتورة #INV-2023'}
                </h3>
                <p className="text-sm text-gray-500">
                  {language === 'en' ? '1 week ago' : 'منذ أسبوع'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-2 rounded-full">
                <Vote className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">
                  {language === 'en' ? 'New proposal requires your vote' : 'مقترح جديد يتطلب تصويتك'}
                </h3>
                <p className="text-sm text-gray-500">
                  {language === 'en' ? '3 days ago' : 'منذ 3 أيام'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
