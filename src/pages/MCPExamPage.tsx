
import React from 'react';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import MCPExam from '@/components/mcp/MCPExam';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MCPExamPage: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="space-y-6 p-6">
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

        {/* Exam Component */}
        <MCPExam />

        {/* Help Section */}
        <div className="max-w-4xl mx-auto bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-4">
            {language === 'ar' ? 'نصائح للنجاح في الاختبار:' : 'Tips for exam success:'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div className="space-y-2">
              <h4 className="font-medium">
                {language === 'ar' ? 'قبل البدء:' : 'Before starting:'}
              </h4>
              <ul className="list-disc list-inside space-y-1">
                <li>{language === 'ar' ? 'تأكد من اتصال الإنترنت المستقر' : 'Ensure stable internet connection'}</li>
                <li>{language === 'ar' ? 'ابحث عن مكان هادئ للتركيز' : 'Find a quiet place to focus'}</li>
                <li>{language === 'ar' ? 'راجع المواد التعليمية' : 'Review study materials'}</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">
                {language === 'ar' ? 'أثناء الاختبار:' : 'During the exam:'}
              </h4>
              <ul className="list-disc list-inside space-y-1">
                <li>{language === 'ar' ? 'اقرأ كل سؤال بعناية' : 'Read each question carefully'}</li>
                <li>{language === 'ar' ? 'استخدم وقتك بحكمة' : 'Use your time wisely'}</li>
                <li>{language === 'ar' ? 'راجع إجاباتك قبل الإرسال' : 'Review answers before submitting'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MCPExamPage;
