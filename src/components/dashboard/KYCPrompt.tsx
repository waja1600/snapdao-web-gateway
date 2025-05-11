
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface KYCPromptProps {
  kycStatus: 'verified' | 'pending' | 'not_started';
}

export const KYCPrompt: React.FC<KYCPromptProps> = ({ kycStatus }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  if (kycStatus === 'verified') return null;
  
  return (
    <Card className="mb-6 border-yellow-300 bg-yellow-50">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-yellow-500" />
            <div>
              <h3 className="font-medium text-lg">
                {language === 'en' ? 'Verification Required' : 'التحقق مطلوب'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'en' 
                  ? 'Complete your KYC verification to unlock all features' 
                  : 'أكمل عملية التحقق من هويتك لفتح جميع الميزات'}
              </p>
            </div>
          </div>
          <Button onClick={() => navigate('/verification')}>
            {language === 'en' ? 'Complete Verification' : 'إكمال التحقق'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
