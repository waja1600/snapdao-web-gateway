
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export const SupplierTab: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === 'en' ? 'Active Group Requests' : 'طلبات المجموعات النشطة'}
        </CardTitle>
        <CardDescription>
          {language === 'en' 
            ? 'Group buying requests matching your product categories' 
            : 'طلبات شراء جماعية تتطابق مع فئات منتجاتك'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">
                {language === 'en' ? 'Bulk Office Chairs' : 'كراسي مكتبية بالجملة'}
              </h3>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                {language === 'en' ? 'Active' : 'نشط'}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              {language === 'en' 
                ? 'Group of 5 companies seeking 100 office chairs' 
                : 'مجموعة من 5 شركات تبحث عن 100 كرسي مكتبي'}
            </p>
            <div className="flex justify-between text-sm mb-1">
              <span>{language === 'en' ? 'Quantity' : 'الكمية'}: 100 units</span>
              <span>{language === 'en' ? 'Deadline' : 'الموعد النهائي'}: 7 days</span>
            </div>
            <Button className="mt-4 w-full" onClick={() => navigate('/supplier-offers/create')}>
              {language === 'en' ? 'Submit Bid' : 'تقديم عطاء'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
