
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, User, Truck, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface RoleSelectorProps {
  currentRole: string;
  onRoleChange: (role: string) => void;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({ currentRole, onRoleChange }) => {
  const { language } = useLanguage();
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-sm font-medium">
          {language === 'en' ? 'Demo: Switch User Role' : 'تجريبي: تبديل دور المستخدم'}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        <Button 
          size="sm" 
          variant={currentRole === 'company' ? 'default' : 'outline'} 
          onClick={() => onRoleChange('company')}
        >
          <Users className="h-4 w-4 mr-2" />
          {language === 'en' ? 'Company/Group' : 'شركة / مجموعة'}
        </Button>
        <Button 
          size="sm" 
          variant={currentRole === 'freelancer' ? 'default' : 'outline'} 
          onClick={() => onRoleChange('freelancer')}
        >
          <User className="h-4 w-4 mr-2" />
          {language === 'en' ? 'Freelancer' : 'مستقل'}
        </Button>
        <Button 
          size="sm" 
          variant={currentRole === 'supplier' ? 'default' : 'outline'} 
          onClick={() => onRoleChange('supplier')}
        >
          <Truck className="h-4 w-4 mr-2" />
          {language === 'en' ? 'Supplier' : 'مورّد'}
        </Button>
        <Button 
          size="sm" 
          variant={currentRole === 'supervisor' ? 'default' : 'outline'} 
          onClick={() => onRoleChange('supervisor')}
        >
          <Shield className="h-4 w-4 mr-2" />
          {language === 'en' ? 'Supervisor' : 'مشرف'}
        </Button>
      </CardContent>
    </Card>
  );
};
