
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Users, 
  Target, 
  MapPin, 
  DollarSign,
  FileText,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface GroupFormData {
  name: string;
  description: string;
  type: string;
  serviceGateway: string;
  businessObjective: string;
  legalFramework: string;
  jurisdiction: string;
  minMembers: number;
  maxMembers: number;
  pointsRequired: number;
  visibility: 'private' | 'public';
  requirements: string[];
}

const CreateGroup = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<GroupFormData>({
    name: '',
    description: '',
    type: '',
    serviceGateway: '',
    businessObjective: '',
    legalFramework: '',
    jurisdiction: '',
    minMembers: 5,
    maxMembers: 20,
    pointsRequired: 0,
    visibility: 'private',
    requirements: []
  });

  const groupTypes = [
    {
      id: 'cooperative_purchasing',
      name: language === 'ar' ? 'الشراء التعاوني' : 'Cooperative Purchasing',
      description: language === 'ar' ? 'شراء جماعي للحصول على أسعار أفضل' : 'Group buying for better prices',
      requiresKYC: true,
      requiresPoints: true,
      icon: DollarSign
    },
    {
      id: 'cooperative_marketing',
      name: language === 'ar' ? 'التسويق التعاوني' : 'Cooperative Marketing',
      description: language === 'ar' ? 'تسويق جماعي للخدمات والمنتجات' : 'Joint marketing for services and products',
      requiresKYC: true,
      requiresPoints: true,
      icon: Target
    },
    {
      id: 'company_formation',
      name: language === 'ar' ? 'تأسيس الشركات' : 'Company Formation',
      description: language === 'ar' ? 'تأسيس شركة بشكل جماعي' : 'Joint company formation',
      requiresKYC: false,
      requiresPoints: false,
      icon: FileText
    },
    {
      id: 'investment_groups',
      name: language === 'ar' ? 'مجموعات الاستثمار' : 'Investment Groups',
      description: language === 'ar' ? 'استثمار جماعي في المشاريع' : 'Joint investment in projects',
      requiresKYC: true,
      requiresPoints: true,
      icon: Users
    }
  ];

  const jurisdictions = [
    { value: 'UAE', label: language === 'ar' ? 'الإمارات العربية المتحدة' : 'United Arab Emirates' },
    { value: 'SA', label: language === 'ar' ? 'المملكة العربية السعودية' : 'Saudi Arabia' },
    { value: 'US', label: language === 'ar' ? 'الولايات المتحدة' : 'United States' },
    { value: 'UK', label: language === 'ar' ? 'المملكة المتحدة' : 'United Kingdom' },
    { value: 'SG', label: language === 'ar' ? 'سنغافورة' : 'Singapore' }
  ];

  const handleInputChange = (field: keyof GroupFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRequirementToggle = (requirement: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.includes(requirement)
        ? prev.requirements.filter(r => r !== requirement)
        : [...prev.requirements, requirement]
    }));
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.name && formData.description && formData.type;
      case 2:
        return formData.businessObjective && formData.jurisdiction;
      case 3:
        return formData.minMembers > 0 && formData.maxMembers > formData.minMembers;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    } else {
      toast.error(language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // هنا سيتم إرسال البيانات إلى API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(language === 'ar' ? 'تم إنشاء المجموعة بنجاح!' : 'Group created successfully!');
      navigate('/groups');
    } catch (error) {
      toast.error(language === 'ar' ? 'حدث خطأ في إنشاء المجموعة' : 'Error creating group');
    } finally {
      setLoading(false);
    }
  };

  const selectedGroupType = groupTypes.find(t => t.id === formData.type);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/groups')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'العودة' : 'Back'}
          </Button>
          
          <div>
            <h1 className="text-3xl font-bold">
              {language === 'ar' ? 'إنشاء مجموعة جديدة' : 'Create New Group'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'ar' ? 'أنشئ مجموعة لتحقيق أهدافك التجارية' : 'Create a group to achieve your business goals'}
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                ${currentStep >= step 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
                }
              `}>
                {currentStep > step ? <CheckCircle className="h-5 w-5" /> : step}
              </div>
              {step < 4 && (
                <div className={`w-12 h-1 mx-2 ${
                  currentStep > step ? 'bg-primary' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <Card>
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && (language === 'ar' ? 'المعلومات الأساسية' : 'Basic Information')}
              {currentStep === 2 && (language === 'ar' ? 'الأهداف والإطار القانوني' : 'Objectives & Legal Framework')}
              {currentStep === 3 && (language === 'ar' ? 'إعدادات المجموعة' : 'Group Settings')}
              {currentStep === 4 && (language === 'ar' ? 'المراجعة والتأكيد' : 'Review & Confirm')}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name">
                    {language === 'ar' ? 'اسم المجموعة' : 'Group Name'} *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder={language === 'ar' ? 'أدخل اسم المجموعة' : 'Enter group name'}
                  />
                </div>

                <div>
                  <Label htmlFor="description">
                    {language === 'ar' ? 'وصف المجموعة' : 'Group Description'} *
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder={language === 'ar' ? 'اشرح أهداف وغرض المجموعة' : 'Explain the goals and purpose of the group'}
                    rows={4}
                  />
                </div>

                <div>
                  <Label>
                    {language === 'ar' ? 'نوع المجموعة' : 'Group Type'} *
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    {groupTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <div
                          key={type.id}
                          className={`
                            p-4 border rounded-lg cursor-pointer transition-all
                            ${formData.type === type.id 
                              ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                              : 'border-border hover:border-primary/50'
                            }
                          `}
                          onClick={() => handleInputChange('type', type.id)}
                        >
                          <div className="flex items-start gap-3">
                            <Icon className="h-6 w-6 text-primary mt-1" />
                            <div className="flex-1">
                              <h3 className="font-medium mb-1">{type.name}</h3>
                              <p className="text-sm text-muted-foreground mb-2">
                                {type.description}
                              </p>
                              <div className="flex gap-2">
                                {type.requiresKYC && (
                                  <Badge variant="secondary" className="text-xs">
                                    {language === 'ar' ? 'يتطلب KYC' : 'Requires KYC'}
                                  </Badge>
                                )}
                                {type.requiresPoints && (
                                  <Badge variant="secondary" className="text-xs">
                                    {language === 'ar' ? 'يتطلب نقاط' : 'Requires Points'}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Objectives & Legal Framework */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="businessObjective">
                    {language === 'ar' ? 'الهدف التجاري' : 'Business Objective'} *
                  </Label>
                  <Textarea
                    id="businessObjective"
                    value={formData.businessObjective}
                    onChange={(e) => handleInputChange('businessObjective', e.target.value)}
                    placeholder={language === 'ar' ? 'اشرح الهدف التجاري للمجموعة' : 'Explain the business objective of the group'}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="legalFramework">
                    {language === 'ar' ? 'الإطار القانوني' : 'Legal Framework'}
                  </Label>
                  <Textarea
                    id="legalFramework"
                    value={formData.legalFramework}
                    onChange={(e) => handleInputChange('legalFramework', e.target.value)}
                    placeholder={language === 'ar' ? 'اختياري: اشرح الإطار القانوني' : 'Optional: Explain the legal framework'}
                    rows={3}
                  />
                </div>

                <div>
                  <Label>
                    {language === 'ar' ? 'الولاية القضائية' : 'Jurisdiction'} *
                  </Label>
                  <Select value={formData.jurisdiction} onValueChange={(value) => handleInputChange('jurisdiction', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'ar' ? 'اختر الولاية القضائية' : 'Select jurisdiction'} />
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
              </div>
            )}

            {/* Step 3: Group Settings */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="minMembers">
                      {language === 'ar' ? 'الحد الأدنى للأعضاء' : 'Minimum Members'} *
                    </Label>
                    <Input
                      id="minMembers"
                      type="number"
                      min="2"
                      max="50"
                      value={formData.minMembers}
                      onChange={(e) => handleInputChange('minMembers', parseInt(e.target.value))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="maxMembers">
                      {language === 'ar' ? 'الحد الأقصى للأعضاء' : 'Maximum Members'} *
                    </Label>
                    <Input
                      id="maxMembers"
                      type="number"
                      min="3"
                      max="100"
                      value={formData.maxMembers}
                      onChange={(e) => handleInputChange('maxMembers', parseInt(e.target.value))}
                    />
                  </div>
                </div>

                {selectedGroupType?.requiresPoints && (
                  <div>
                    <Label htmlFor="pointsRequired">
                      {language === 'ar' ? 'النقاط المطلوبة للانضمام' : 'Points Required to Join'}
                    </Label>
                    <Input
                      id="pointsRequired"
                      type="number"
                      min="0"
                      value={formData.pointsRequired}
                      onChange={(e) => handleInputChange('pointsRequired', parseInt(e.target.value))}
                    />
                  </div>
                )}

                <div>
                  <Label>
                    {language === 'ar' ? 'مستوى الخصوصية' : 'Privacy Level'}
                  </Label>
                  <Select value={formData.visibility} onValueChange={(value: 'private' | 'public') => handleInputChange('visibility', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">
                        {language === 'ar' ? 'خاص (بدعوة فقط)' : 'Private (Invite only)'}
                      </SelectItem>
                      <SelectItem value="public">
                        {language === 'ar' ? 'عام (يمكن للجميع الانضمام)' : 'Public (Anyone can join)'}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 4: Review & Confirm */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="font-medium mb-4">
                    {language === 'ar' ? 'مراجعة تفاصيل المجموعة' : 'Review Group Details'}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">
                        {language === 'ar' ? 'اسم المجموعة:' : 'Group Name:'}
                      </span>
                      <p>{formData.name}</p>
                    </div>
                    
                    <div>
                      <span className="font-medium">
                        {language === 'ar' ? 'النوع:' : 'Type:'}
                      </span>
                      <p>{selectedGroupType?.name}</p>
                    </div>
                    
                    <div>
                      <span className="font-medium">
                        {language === 'ar' ? 'عدد الأعضاء:' : 'Members:'}
                      </span>
                      <p>{formData.minMembers} - {formData.maxMembers}</p>
                    </div>
                    
                    <div>
                      <span className="font-medium">
                        {language === 'ar' ? 'الولاية القضائية:' : 'Jurisdiction:'}
                      </span>
                      <p>{jurisdictions.find(j => j.value === formData.jurisdiction)?.label}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <span className="font-medium">
                      {language === 'ar' ? 'الوصف:' : 'Description:'}
                    </span>
                    <p className="mt-1">{formData.description}</p>
                  </div>
                </div>

                {selectedGroupType?.requiresKYC && (
                  <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-yellow-800">
                        {language === 'ar' ? 'تنبيه: يتطلب التحقق من الهوية' : 'Notice: KYC Verification Required'}
                      </p>
                      <p className="text-yellow-700">
                        {language === 'ar' 
                          ? 'سيحتاج الأعضاء إلى رفع وثائق التحقق من الهوية للانضمام إلى هذه المجموعة.'
                          : 'Members will need to upload identity verification documents to join this group.'
                        }
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(prev => prev - 1)}
                disabled={currentStep === 1}
              >
                {language === 'ar' ? 'السابق' : 'Previous'}
              </Button>

              {currentStep < 4 ? (
                <Button onClick={handleNext} disabled={!validateStep(currentStep)}>
                  {language === 'ar' ? 'التالي' : 'Next'}
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={loading}>
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  ) : null}
                  {language === 'ar' ? 'إنشاء المجموعة' : 'Create Group'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CreateGroup;
