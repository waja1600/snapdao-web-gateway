
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useLanguage } from '@/contexts/LanguageContext';
import { Building, Users, DollarSign, FileText } from 'lucide-react';
import { toast } from 'sonner';

/**
 * Investment Creation Wizard Component
 * 
 * Purpose: Multi-step wizard for creating investment opportunities
 * Features:
 * - Individual vs Group investment selection
 * - Comprehensive investment details form
 * - Shareholder structure configuration
 * - Legal framework selection
 * 
 * Architecture:
 * - Step-based wizard pattern for complex forms
 * - Validation at each step before progression
 * - Consistent with platform design patterns
 * - Extensible for additional investment types
 */

interface InvestmentCreationProps {
  onInvestmentCreated: (investmentId: string) => void;
}

interface InvestmentFormData {
  name: string;
  type: 'individual' | 'group';
  description: string;
  sector: string;
  targetAmount: number;
  currency: string;
  jurisdiction: string;
  minInvestment: number;
  maxShareholders: number;
  businessPlan: string;
  legalStructure: string;
}

export const InvestmentCreationWizard: React.FC<InvestmentCreationProps> = ({ onInvestmentCreated }) => {
  const { language } = useLanguage();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<InvestmentFormData>({
    name: '',
    type: 'individual',
    description: '',
    sector: '',
    targetAmount: 0,
    currency: 'USD',
    jurisdiction: '',
    minInvestment: 1000,
    maxShareholders: 10,
    businessPlan: '',
    legalStructure: 'llc'
  });

  // Investment sectors for dropdown selection
  const sectors = [
    { value: 'technology', label: language === 'ar' ? 'التكنولوجيا' : 'Technology' },
    { value: 'real-estate', label: language === 'ar' ? 'العقارات' : 'Real Estate' },
    { value: 'healthcare', label: language === 'ar' ? 'الرعاية الصحية' : 'Healthcare' },
    { value: 'finance', label: language === 'ar' ? 'المالية' : 'Finance' },
    { value: 'retail', label: language === 'ar' ? 'التجارة' : 'Retail' },
    { value: 'manufacturing', label: language === 'ar' ? 'التصنيع' : 'Manufacturing' },
    { value: 'energy', label: language === 'ar' ? 'الطاقة' : 'Energy' },
    { value: 'education', label: language === 'ar' ? 'التعليم' : 'Education' }
  ];

  // Legal structures for company formation
  const legalStructures = [
    { value: 'llc', label: language === 'ar' ? 'شركة ذات مسؤولية محدودة' : 'Limited Liability Company (LLC)' },
    { value: 'corporation', label: language === 'ar' ? 'شركة مساهمة' : 'Corporation' },
    { value: 'partnership', label: language === 'ar' ? 'شراكة' : 'Partnership' },
    { value: 'sole-proprietorship', label: language === 'ar' ? 'مؤسسة فردية' : 'Sole Proprietorship' }
  ];

  // Jurisdictions for legal compliance
  const jurisdictions = [
    { value: 'us', label: language === 'ar' ? 'الولايات المتحدة' : 'United States' },
    { value: 'uk', label: language === 'ar' ? 'المملكة المتحدة' : 'United Kingdom' },
    { value: 'ae', label: language === 'ar' ? 'الإمارات العربية المتحدة' : 'UAE' },
    { value: 'sa', label: language === 'ar' ? 'المملكة العربية السعودية' : 'Saudi Arabia' },
    { value: 'sg', label: language === 'ar' ? 'سنغافورة' : 'Singapore' }
  ];

  // Form validation for each step
  const validateStep = (stepNumber: number): boolean => {
    switch (stepNumber) {
      case 1:
        return formData.name.trim() !== '' && formData.type !== '';
      case 2:
        return formData.description.trim() !== '' && formData.sector !== '' && formData.targetAmount > 0;
      case 3:
        return formData.jurisdiction !== '' && formData.legalStructure !== '';
      default:
        return true;
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // In production, this would create the investment in Supabase
      const investmentId = `INV-${Date.now()}`;
      
      console.log('Creating investment:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(
        language === 'ar' 
          ? 'تم إنشاء الاستثمار بنجاح!' 
          : 'Investment created successfully!'
      );
      
      onInvestmentCreated(investmentId);
    } catch (error) {
      toast.error(
        language === 'ar' 
          ? 'فشل في إنشاء الاستثمار' 
          : 'Failed to create investment'
      );
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-6 w-6" />
          {language === 'ar' ? 'إنشاء استثمار جديد' : 'Create New Investment'}
        </CardTitle>
        
        {/* Progress indicator */}
        <div className="flex gap-2 mt-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`h-2 flex-1 rounded ${i <= step ? 'bg-blue-600' : 'bg-gray-200'}`} />
          ))}
        </div>
        
        <p className="text-sm text-gray-600">
          {language === 'ar' ? `الخطوة ${step} من 4` : `Step ${step} of 4`}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Step 1: Basic Information */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">
                {language === 'ar' ? 'المعلومات الأساسية' : 'Basic Information'}
              </h3>
              <p className="text-gray-600">
                {language === 'ar' ? 'ابدأ بتحديد نوع الاستثمار والمعلومات الأساسية' : 'Start by defining the investment type and basic details'}
              </p>
            </div>

            <div>
              <Label htmlFor="name">
                {language === 'ar' ? 'اسم الاستثمار' : 'Investment Name'}
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder={language === 'ar' ? 'أدخل اسم الاستثمار' : 'Enter investment name'}
              />
            </div>

            <div>
              <Label>
                {language === 'ar' ? 'نوع الاستثمار' : 'Investment Type'}
              </Label>
              <RadioGroup
                value={formData.type}
                onValueChange={(value: 'individual' | 'group') => setFormData(prev => ({ ...prev, type: value }))}
                className="flex flex-col space-y-3 mt-2"
              >
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="individual" id="individual" />
                  <div className="flex-1">
                    <Label htmlFor="individual" className="font-medium cursor-pointer">
                      {language === 'ar' ? 'استثمار فردي' : 'Individual Investment'}
                    </Label>
                    <p className="text-sm text-gray-600">
                      {language === 'ar' ? 'استثمار شخصي بمالك واحد' : 'Personal investment with single owner'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="group" id="group" />
                  <div className="flex-1">
                    <Label htmlFor="group" className="font-medium cursor-pointer">
                      {language === 'ar' ? 'استثمار جماعي' : 'Group Investment'}
                    </Label>
                    <p className="text-sm text-gray-600">
                      {language === 'ar' ? 'استثمار مشترك مع عدة مساهمين' : 'Shared investment with multiple shareholders'}
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
        )}

        {/* Step 2: Investment Details */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">
                {language === 'ar' ? 'تفاصيل الاستثمار' : 'Investment Details'}
              </h3>
              <p className="text-gray-600">
                {language === 'ar' ? 'حدد تفاصيل الاستثمار والقطاع المستهدف' : 'Define investment details and target sector'}
              </p>
            </div>

            <div>
              <Label htmlFor="description">
                {language === 'ar' ? 'وصف الاستثمار' : 'Investment Description'}
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder={language === 'ar' ? 'اوصف الاستثمار وأهدافه' : 'Describe the investment and its objectives'}
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="sector">
                {language === 'ar' ? 'القطاع' : 'Sector'}
              </Label>
              <Select value={formData.sector} onValueChange={(value) => setFormData(prev => ({ ...prev, sector: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'ar' ? 'اختر القطاع' : 'Select sector'} />
                </SelectTrigger>
                <SelectContent>
                  {sectors.map((sector) => (
                    <SelectItem key={sector.value} value={sector.value}>
                      {sector.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="targetAmount">
                  {language === 'ar' ? 'المبلغ المستهدف' : 'Target Amount'}
                </Label>
                <Input
                  id="targetAmount"
                  type="number"
                  value={formData.targetAmount}
                  onChange={(e) => setFormData(prev => ({ ...prev, targetAmount: parseFloat(e.target.value) }))}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="currency">
                  {language === 'ar' ? 'العملة' : 'Currency'}
                </Label>
                <Select value={formData.currency} onValueChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="SAR">SAR - Saudi Riyal</SelectItem>
                    <SelectItem value="AED">AED - UAE Dirham</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Legal Structure */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">
                {language === 'ar' ? 'الهيكل القانوني' : 'Legal Structure'}
              </h3>
              <p className="text-gray-600">
                {language === 'ar' ? 'حدد الهيكل القانوني والاختصاص القضائي' : 'Define legal structure and jurisdiction'}
              </p>
            </div>

            <div>
              <Label htmlFor="jurisdiction">
                {language === 'ar' ? 'الاختصاص القضائي' : 'Jurisdiction'}
              </Label>
              <Select value={formData.jurisdiction} onValueChange={(value) => setFormData(prev => ({ ...prev, jurisdiction: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'ar' ? 'اختر الاختصاص القضائي' : 'Select jurisdiction'} />
                </SelectTrigger>
                <SelectContent>
                  {jurisdictions.map((jurisdiction) => (
                    <SelectItem key={jurisdiction.value} value={jurisdiction.value}>
                      {jurisdiction.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="legalStructure">
                {language === 'ar' ? 'الهيكل القانوني' : 'Legal Structure'}
              </Label>
              <Select value={formData.legalStructure} onValueChange={(value) => setFormData(prev => ({ ...prev, legalStructure: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'ar' ? 'اختر الهيكل القانوني' : 'Select legal structure'} />
                </SelectTrigger>
                <SelectContent>
                  {legalStructures.map((structure) => (
                    <SelectItem key={structure.value} value={structure.value}>
                      {structure.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {formData.type === 'group' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minInvestment">
                    {language === 'ar' ? 'الحد الأدنى للاستثمار' : 'Minimum Investment'}
                  </Label>
                  <Input
                    id="minInvestment"
                    type="number"
                    value={formData.minInvestment}
                    onChange={(e) => setFormData(prev => ({ ...prev, minInvestment: parseFloat(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="maxShareholders">
                    {language === 'ar' ? 'الحد الأقصى للمساهمين' : 'Maximum Shareholders'}
                  </Label>
                  <Input
                    id="maxShareholders"
                    type="number"
                    max="50"
                    value={formData.maxShareholders}
                    onChange={(e) => setFormData(prev => ({ ...prev, maxShareholders: parseInt(e.target.value) }))}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Review and Confirm */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">
                {language === 'ar' ? 'مراجعة وتأكيد' : 'Review and Confirm'}
              </h3>
              <p className="text-gray-600">
                {language === 'ar' ? 'راجع تفاصيل الاستثمار قبل الإنشاء' : 'Review investment details before creation'}
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900">{formData.name}</h4>
                <p className="text-gray-600">{formData.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">{language === 'ar' ? 'النوع:' : 'Type:'}</span>
                  <span className="ml-2">{formData.type === 'individual' 
                    ? (language === 'ar' ? 'فردي' : 'Individual')
                    : (language === 'ar' ? 'جماعي' : 'Group')
                  }</span>
                </div>
                <div>
                  <span className="font-medium">{language === 'ar' ? 'القطاع:' : 'Sector:'}</span>
                  <span className="ml-2">{sectors.find(s => s.value === formData.sector)?.label}</span>
                </div>
                <div>
                  <span className="font-medium">{language === 'ar' ? 'المبلغ:' : 'Amount:'}</span>
                  <span className="ml-2">${formData.targetAmount.toLocaleString()} {formData.currency}</span>
                </div>
                <div>
                  <span className="font-medium">{language === 'ar' ? 'الاختصاص:' : 'Jurisdiction:'}</span>
                  <span className="ml-2">{jurisdictions.find(j => j.value === formData.jurisdiction)?.label}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => setStep(prev => Math.max(1, prev - 1))}
            disabled={step === 1}
          >
            {language === 'ar' ? 'السابق' : 'Previous'}
          </Button>
          
          {step < 4 ? (
            <Button 
              onClick={() => setStep(prev => prev + 1)}
              disabled={!validateStep(step)}
            >
              {language === 'ar' ? 'التالي' : 'Next'}
            </Button>
          ) : (
            <Button onClick={handleSubmit}>
              {language === 'ar' ? 'إنشاء الاستثمار' : 'Create Investment'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
