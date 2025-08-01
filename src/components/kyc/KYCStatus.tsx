
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';

interface KYCStatusProps {
  status: 'pending' | 'partial' | 'verified' | 'rejected';
  completedSteps: number;
  totalSteps: number;
  rejectedDocuments?: string[];
}

const KYCStatus: React.FC<KYCStatusProps> = ({
  status,
  completedSteps,
  totalSteps,
  rejectedDocuments = []
}) => {
  const { language } = useLanguage();

  const getStatusConfig = () => {
    switch (status) {
      case 'verified':
        return {
          icon: <CheckCircle className="h-8 w-8 text-green-600" />,
          title: language === 'ar' ? 'تم التحقق بنجاح' : 'Verification Complete',
          description: language === 'ar' 
            ? 'تم التحقق من هويتك بنجاح. يمكنك الآن الوصول لجميع ميزات المنصة'
            : 'Your identity has been successfully verified. You now have access to all platform features',
          badgeVariant: 'default' as const,
          badgeText: language === 'ar' ? 'معتمد' : 'Verified'
        };
      case 'partial':
        return {
          icon: <Clock className="h-8 w-8 text-yellow-600" />,
          title: language === 'ar' ? 'التحقق جاري' : 'Verification In Progress',
          description: language === 'ar' 
            ? 'تم رفع بعض المستندات وهي قيد المراجعة. يرجى إكمال رفع باقي المستندات المطلوبة'
            : 'Some documents have been uploaded and are under review. Please complete uploading all required documents',
          badgeVariant: 'secondary' as const,
          badgeText: language === 'ar' ? 'جاري' : 'In Progress'
        };
      case 'rejected':
        return {
          icon: <XCircle className="h-8 w-8 text-red-600" />,
          title: language === 'ar' ? 'تم رفض بعض المستندات' : 'Some Documents Rejected',
          description: language === 'ar' 
            ? 'تم رفض بعض المستندات. يرجى إعادة رفعها مع التأكد من وضوحها وصحتها'
            : 'Some documents have been rejected. Please re-upload them ensuring they are clear and valid',
          badgeVariant: 'destructive' as const,
          badgeText: language === 'ar' ? 'مرفوض' : 'Rejected'
        };
      default:
        return {
          icon: <AlertCircle className="h-8 w-8 text-blue-600" />,
          title: language === 'ar' ? 'يرجى رفع المستندات' : 'Please Upload Documents',
          description: language === 'ar' 
            ? 'لم يتم رفع أي مستندات بعد. يرجى البدء في عملية التحقق من الهوية'
            : 'No documents uploaded yet. Please start the identity verification process',
          badgeVariant: 'outline' as const,
          badgeText: language === 'ar' ? 'في الانتظار' : 'Pending'
        };
    }
  };

  const config = getStatusConfig();
  const progressPercentage = (completedSteps / totalSteps) * 100;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-3">
            {config.icon}
            <span>{language === 'ar' ? 'حالة التحقق من الهوية' : 'KYC Verification Status'}</span>
          </CardTitle>
          <Badge variant={config.badgeVariant}>{config.badgeText}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-2">{config.title}</h3>
          <p className="text-gray-600">{config.description}</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>
              {language === 'ar' ? 'التقدم' : 'Progress'}
            </span>
            <span>{completedSteps}/{totalSteps} {language === 'ar' ? 'مكتمل' : 'completed'}</span>
          </div>
          <Progress value={progressPercentage} className="w-full" />
        </div>

        {rejectedDocuments.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-medium text-red-800 mb-2">
              {language === 'ar' ? 'المستندات المرفوضة:' : 'Rejected Documents:'}
            </h4>
            <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
              {rejectedDocuments.map((doc, index) => (
                <li key={index}>{doc}</li>
              ))}
            </ul>
          </div>
        )}

        {status === 'verified' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-2" />
            <h4 className="font-medium text-green-800">
              {language === 'ar' ? 'مبروك! تم التحقق من هويتك' : 'Congratulations! Your identity is verified'}
            </h4>
            <p className="text-sm text-green-700 mt-1">
              {language === 'ar' 
                ? 'يمكنك الآن الوصول لجميع الميزات المتقدمة في المنصة'
                : 'You can now access all advanced features on the platform'
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KYCStatus;
