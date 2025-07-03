
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, User } from "lucide-react";

interface RegistrationFormProps {
  formData: {
    fullName: string;
    email: string;
    country: string;
    password: string;
    role: string;
  };
  setFormData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  onLanguageToggle: () => void;
}

export const RegistrationForm = ({ 
  formData, 
  setFormData, 
  onSubmit, 
  isLoading, 
  onLanguageToggle 
}: RegistrationFormProps) => {
  const { t, language } = useLanguage();

  return (
    <form onSubmit={onSubmit} className="space-y-4">

      <div>
        <Label htmlFor="fullName">{t('fullName')}</Label>
        <Input
          id="fullName"
          type="text"
          value={formData.fullName}
          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
          placeholder={language === 'en' ? 'Enter your full name' : 'أدخل اسمك الكامل'}
          required
        />
      </div>

      <div>
        <Label htmlFor="email">{t('email')}</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          placeholder={language === 'en' ? 'Enter your email' : 'أدخل بريدك الإلكتروني'}
          required
        />
      </div>

      <div>
        <Label htmlFor="country">{t('country')}</Label>
        <Select value={formData.country} onValueChange={(value) => setFormData({...formData, country: value})}>
          <SelectTrigger>
            <SelectValue placeholder={language === 'en' ? 'Select your country' : 'اختر دولتك'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sa">{t('sa')}</SelectItem>
            <SelectItem value="ae">{t('ae')}</SelectItem>
            <SelectItem value="eg">{t('eg')}</SelectItem>
            <SelectItem value="jo">{t('jo')}</SelectItem>
            <SelectItem value="kw">{t('kw')}</SelectItem>
            <SelectItem value="qa">{t('qa')}</SelectItem>
            <SelectItem value="other">{t('other')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="role">{t('selectRole')}</Label>
        <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
          <SelectTrigger>
            <SelectValue placeholder={language === 'en' ? 'Choose your role' : 'اختر دورك'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="company">{t('roleCompany')}</SelectItem>
            <SelectItem value="supplier">{t('roleSupplier')}</SelectItem>
            <SelectItem value="freelancer">{t('roleFreelancer')}</SelectItem>
            <SelectItem value="browser">{language === 'en' ? 'Just Browse' : 'تصفح فقط'}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="password">{t('password')}</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          placeholder={language === 'en' ? 'Create a password' : 'أنشئ كلمة مرور'}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        <User className="w-4 h-4 mr-2" />
        {language === 'en' ? 'Create My Account Now' : 'أنشئ حسابي الآن'}
      </Button>
    </form>
  );
};
