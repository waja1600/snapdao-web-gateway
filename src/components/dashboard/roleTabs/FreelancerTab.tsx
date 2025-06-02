
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export const FreelancerTab: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === 'en' ? 'Available Opportunities' : 'الفرص المتاحة'}
        </CardTitle>
        <CardDescription>
          {language === 'en' 
            ? 'Browse and apply for projects matching your skills' 
            : 'تصفح وتقدم للمشاريع التي تتناسب مع مهاراتك'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">
                {language === 'en' ? 'Website Development' : 'تطوير موقع إلكتروني'}
              </h3>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {language === 'en' ? 'New' : 'جديد'}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              {language === 'en' 
                ? 'Building an e-commerce website with payment integration' 
                : 'بناء موقع للتجارة الإلكترونية مع دمج نظام دفع'}
            </p>
            <div className="flex justify-between text-sm mb-1">
              <span>{language === 'en' ? 'Budget' : 'الميزانية'}: $3,000</span>
              <span>{language === 'en' ? 'Duration' : 'المدة'}: 30 days</span>
            </div>
            <Button className="mt-4 w-full" variant="outline" onClick={() => navigate('/offers/web-dev')}>
              {language === 'en' ? 'Submit Offer' : 'تقديم عرض'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
