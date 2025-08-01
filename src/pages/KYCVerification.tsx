
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import KYCUpload from '@/components/kyc/KYCUpload';
import KYCStatus from '@/components/kyc/KYCStatus';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const KYCVerification: React.FC = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [kycStatus, setKycStatus] = useState<'pending' | 'partial' | 'verified' | 'rejected'>('pending');
  const [completedSteps, setCompletedSteps] = useState(0);
  const totalSteps = 4; // Number of required documents

  useEffect(() => {
    // Simulate loading KYC status from backend
    // In real implementation, this would fetch from Supabase
    const fetchKYCStatus = () => {
      // Mock data - replace with actual API call
      setKycStatus('partial');
      setCompletedSteps(2);
    };

    if (user) {
      fetchKYCStatus();
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="space-y-6 p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{language === 'ar' ? 'العودة للوحة التحكم' : 'Back to Dashboard'}</span>
          </Button>
        </div>

        {/* KYC Status */}
        <KYCStatus
          status={kycStatus}
          completedSteps={completedSteps}
          totalSteps={totalSteps}
          rejectedDocuments={kycStatus === 'rejected' ? ['National ID - Image unclear'] : []}
        />

        {/* KYC Upload */}
        <KYCUpload />

        {/* Help Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">
            {language === 'ar' ? 'نصائح لرفع مستندات صحيحة:' : 'Tips for uploading valid documents:'}
          </h3>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>
              {language === 'ar' 
                ? 'تأكد من أن الصورة واضحة وغير مهتزة'
                : 'Ensure images are clear and not blurry'
              }
            </li>
            <li>
              {language === 'ar' 
                ? 'تأكد من ظهور جميع الزوايا والنصوص بوضوح'
                : 'Make sure all corners and text are clearly visible'
              }
            </li>
            <li>
              {language === 'ar' 
                ? 'استخدم إضاءة جيدة عند التصوير'
                : 'Use good lighting when taking photos'
              }
            </li>
            <li>
              {language === 'ar' 
                ? 'تأكد من أن المستندات سارية المفعول'
                : 'Ensure documents are valid and not expired'
              }
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default KYCVerification;
