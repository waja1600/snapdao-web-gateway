
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Users, FileText, Upload, ArrowLeft } from "lucide-react";

const CreateGroup = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  
  const [contractType, setContractType] = useState<'group' | 'solo' | ''>('');
  const [serviceType, setServiceType] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    groupName: '',
    country: '',
    city: '',
    sector: '',
    description: '',
    supplierType: '',
    targetMembers: '',
    minimumEntry: '',
    negotiationRounds: '1',
    requestOffers: 'later'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contractType || !serviceType) {
      toast.error(language === 'en' ? 'Please select contract and service type' : 'يرجى اختيار نوع العقد والخدمة');
      return;
    }

    if (!formData.groupName || !formData.country || !formData.sector || !formData.description) {
      toast.error(language === 'en' ? 'Please fill all required fields' : 'يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate group creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(
        language === 'en' 
          ? 'Request sent to administration for review. You will be notified within 24 hours.'
          : 'تم إرسال الطلب إلى الإدارة لمراجعته. سيتم الرد عليك خلال 24 ساعة.'
      );
      
      navigate('/groups');
    } catch (error) {
      toast.error(language === 'en' ? 'Failed to create group' : 'فشل في إنشاء المجموعة');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png', 'application/zip'];
      
      if (!allowedTypes.includes(file.type)) {
        toast.error(language === 'en' ? 'Invalid file type. Please upload PDF, Word, Image, or ZIP files only.' : 'نوع ملف غير صحيح. يرجى رفع ملفات PDF أو Word أو صور أو ZIP فقط.');
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error(language === 'en' ? 'File size too large. Maximum 10MB allowed.' : 'حجم الملف كبير جداً. الحد الأقصى 10 ميجابايت.');
        return;
      }
      
      toast.success(language === 'en' ? 'File uploaded successfully' : 'تم رفع الملف بنجاح');
    }
  };

  if (!contractType) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Back to Dashboard' : 'العودة للوحة التحكم'}
          </Button>
          
          <Card>
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Contract Type' : 'نوع العقد'}</CardTitle>
              <CardDescription>
                {language === 'en' 
                  ? 'Choose the type of contract you want to create'
                  : 'اختر نوع العقد الذي تريد إنشاؤه'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={contractType} onValueChange={(value) => setContractType(value as 'group' | 'solo')}>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <RadioGroupItem value="group" id="group" />
                  <Label htmlFor="group" className="cursor-pointer">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Users className="w-5 h-5" />
                      <span>{language === 'en' ? 'Group Contract' : 'عقد جماعي'}</span>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <RadioGroupItem value="solo" id="solo" />
                  <Label htmlFor="solo" className="cursor-pointer">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <FileText className="w-5 h-5" />
                      <span>{language === 'en' ? 'Solo Contract' : 'عقد فردي'}</span>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
              
              <Button 
                onClick={() => contractType && setContractType(contractType)} 
                className="w-full mt-6"
                disabled={!contractType}
              >
                {language === 'en' ? 'Continue' : 'متابعة'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (!serviceType) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => setContractType('')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Back' : 'رجوع'}
          </Button>
          
          <Card>
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Service Gateway' : 'بوابة الخدمة'}</CardTitle>
              <CardDescription>
                {language === 'en' 
                  ? 'Select the type of service for your contract'
                  : 'اختر نوع الخدمة لعقدك'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Button 
                  variant="outline" 
                  className="p-6 h-auto"
                  onClick={() => setServiceType('cooperative-buying')}
                >
                  <div className="text-left rtl:text-right">
                    <h3 className="font-semibold">{language === 'en' ? 'Cooperative Buying' : 'الشراء التعاوني'}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {language === 'en' 
                        ? 'Group purchase for better deals'
                        : 'شراء جماعي للحصول على صفقات أفضل'}
                    </p>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="p-6 h-auto"
                  onClick={() => setServiceType('cooperative-marketing')}
                >
                  <div className="text-left rtl:text-right">
                    <h3 className="font-semibold">{language === 'en' ? 'Cooperative Marketing' : 'التسويق التعاوني'}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {language === 'en' 
                        ? 'Collaborative marketing campaigns'
                        : 'حملات تسويقية تعاونية'}
                    </p>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="p-6 h-auto"
                  onClick={() => setServiceType('freelancers')}
                >
                  <div className="text-left rtl:text-right">
                    <h3 className="font-semibold">{language === 'en' ? 'Request Freelancers' : 'طلب مستقلين'}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {language === 'en' 
                        ? 'Hire skilled freelancers for tasks'
                        : 'استئجار مستقلين ماهرين للمهام'}
                    </p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => setServiceType('')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {language === 'en' ? 'Back' : 'رجوع'}
        </Button>
        
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'en' ? 'Create New Group' : 'إنشاء مجموعة جديدة'}
            </CardTitle>
            <CardDescription>
              {language === 'en' 
                ? 'Fill out the details for your new group. All fields marked with * are required.'
                : 'املأ تفاصيل مجموعتك الجديدة. جميع الحقول المميزة بـ * مطلوبة.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="groupName">{t('groupName')} *</Label>
                  <Input
                    id="groupName"
                    value={formData.groupName}
                    onChange={(e) => setFormData({...formData, groupName: e.target.value})}
                    placeholder={language === 'en' ? 'Enter group name' : 'أدخل اسم المجموعة'}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="country">{t('country')} *</Label>
                  <Select value={formData.country} onValueChange={(value) => setFormData({...formData, country: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'en' ? 'Select country' : 'اختر الدولة'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sa">{t('sa')}</SelectItem>
                      <SelectItem value="ae">{t('ae')}</SelectItem>
                      <SelectItem value="eg">{t('eg')}</SelectItem>
                      <SelectItem value="jo">{t('jo')}</SelectItem>
                      <SelectItem value="other">{t('other')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">{t('city')}</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    placeholder={language === 'en' ? 'Enter city' : 'أدخل المدينة'}
                  />
                </div>

                <div>
                  <Label htmlFor="sector">{t('sector')} *</Label>
                  <Select value={formData.sector} onValueChange={(value) => setFormData({...formData, sector: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'en' ? 'Select sector' : 'اختر القطاع'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">{language === 'en' ? 'Technology' : 'تكنولوجيا'}</SelectItem>
                      <SelectItem value="healthcare">{language === 'en' ? 'Healthcare' : 'رعاية صحية'}</SelectItem>
                      <SelectItem value="food">{language === 'en' ? 'Food & Beverages' : 'أغذية ومشروبات'}</SelectItem>
                      <SelectItem value="construction">{language === 'en' ? 'Construction' : 'إنشاءات'}</SelectItem>
                      <SelectItem value="education">{language === 'en' ? 'Education' : 'تعليم'}</SelectItem>
                      <SelectItem value="other">{language === 'en' ? 'Other' : 'أخرى'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">{t('description')} *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder={language === 'en' ? 'Detailed description of your group and its goals' : 'وصف تفصيلي لمجموعتك وأهدافها'}
                  rows={4}
                  required
                />
              </div>

              {contractType === 'group' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="targetMembers">{t('targetMembers')}</Label>
                    <Input
                      id="targetMembers"
                      type="number"
                      value={formData.targetMembers}
                      onChange={(e) => setFormData({...formData, targetMembers: e.target.value})}
                      placeholder="5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="minimumEntry">{t('minimumEntry')}</Label>
                    <Input
                      id="minimumEntry"
                      value={formData.minimumEntry}
                      onChange={(e) => setFormData({...formData, minimumEntry: e.target.value})}
                      placeholder={language === 'en' ? 'Minimum entry requirement' : 'الحد الأدنى للدخول'}
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="supplierType">{t('supplierType')}</Label>
                  <Input
                    id="supplierType"
                    value={formData.supplierType}
                    onChange={(e) => setFormData({...formData, supplierType: e.target.value})}
                    placeholder={language === 'en' ? 'Type of supplier needed' : 'نوع المورد المطلوب'}
                  />
                </div>

                <div>
                  <Label htmlFor="negotiationRounds">{t('negotiationRounds')}</Label>
                  <Select value={formData.negotiationRounds} onValueChange={(value) => setFormData({...formData, negotiationRounds: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="more">{language === 'en' ? 'More' : 'أكثر'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>{t('requestSupplierOffers')}</Label>
                <RadioGroup 
                  value={formData.requestOffers} 
                  onValueChange={(value) => setFormData({...formData, requestOffers: value})}
                  className="flex space-x-4 rtl:space-x-reverse mt-2"
                >
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <RadioGroupItem value="now" id="now" />
                    <Label htmlFor="now">{t('now')}</Label>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <RadioGroupItem value="later" id="later" />
                    <Label htmlFor="later">{t('later')}</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="attachments">{t('attachments')} ({t('optional')})</Label>
                <div className="mt-2">
                  <Input
                    id="attachments"
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('attachments')?.click()}
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {t('uploadFile')}
                  </Button>
                  <p className="text-xs text-gray-500 mt-1">
                    {language === 'en' 
                      ? 'Supported formats: PDF, Word, Images, ZIP (Max 10MB)'
                      : 'الصيغ المدعومة: PDF، Word، صور، ZIP (حد أقصى 10 ميجابايت)'}
                  </p>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  language === 'en' ? 'Creating...' : 'جاري الإنشاء...'
                ) : (
                  language === 'en' ? 'Create My Group Now' : 'أنشئ مجموعتي الآن'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CreateGroup;
