
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Bell, 
  FileText, 
  Users, 
  Building, 
  ShoppingCart, 
  Megaphone,
  ArrowRight 
} from 'lucide-react';

export const QuickNavigation: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const quickActions = [
    {
      title: language === 'en' ? 'View Notifications' : 'عرض الإشعارات',
      description: language === 'en' ? 'Check your latest notifications' : 'تحقق من أحدث الإشعارات',
      icon: Bell,
      action: () => navigate('/dashboard?tab=notifications'),
      color: 'text-blue-600'
    },
    {
      title: language === 'en' ? 'Manage Invoices' : 'إدارة الفواتير',
      description: language === 'en' ? 'View and manage your invoices' : 'عرض وإدارة فواتيرك',
      icon: FileText,
      action: () => navigate('/invoices'),
      color: 'text-green-600'
    },
    {
      title: language === 'en' ? 'Freelancer Management' : 'إدارة المستقلين',
      description: language === 'en' ? 'Manage freelancer projects' : 'إدارة مشاريع المستقلين',
      icon: Users,
      action: () => navigate('/freelancer-management'),
      color: 'text-purple-600'
    },
    {
      title: language === 'en' ? 'Company Incorporation' : 'تأسيس الشركات',
      description: language === 'en' ? 'Start company formation' : 'بدء تأسيس الشركة',
      icon: Building,
      action: () => navigate('/company-incorporation'),
      color: 'text-orange-600'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === 'en' ? 'Quick Actions' : 'الإجراءات السريعة'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <div key={index} className="p-3 border rounded-lg hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <action.icon className={`h-5 w-5 ${action.color}`} />
                    <h4 className="font-medium text-sm">{action.title}</h4>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{action.description}</p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={action.action}
                    className="text-xs"
                  >
                    {language === 'en' ? 'Go' : 'انتقال'}
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
