
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Layout } from "@/components/Layout";
import { toast } from "sonner";
import { ArrowLeft, Users, FileText, Clock, Shield } from "lucide-react";

const CreateGroup = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const service = searchParams.get('service');
  const type = searchParams.get('type');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    country: '',
    sector: '',
    targetMembers: '',
    resourceType: '',
    minimumEntry: '',
    negotiationRounds: '2',
    supplierType: '',
    requestOffers: 'later',
    contractType: 'simple',
    disputeResolution: true,
    autoApproval: false
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!service || !type) {
      navigate('/');
      return;
    }
  }, [user, service, type, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.country || !formData.sector || !formData.targetMembers) {
      toast.error(language === 'en' ? 'Please fill all required fields' : 'يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(
        language === 'en' 
          ? 'Group created successfully! Pending admin review.' 
          : 'تم إنشاء المجموعة بنجاح! في انتظار مراجعة المدير.'
      );
      
      navigate('/groups');
    } catch (error) {
      toast.error(language === 'en' ? 'Failed to create group' : 'فشل في إنشاء المجموعة');
    } finally {
      setIsLoading(false);
    }
  };

  const getServiceTitle = () => {
    const titles = {
      'cooperative-buying': language === 'en' ? 'Group Buying' : 'الشراء الجماعي',
      'cooperative-marketing': language === 'en' ? 'Cooperative Marketing' : 'التسويق التعاوني',
      'freelancers': language === 'en' ? 'Freelancer Project' : 'مشروع مستقل',
      'suppliers': language === 'en' ? 'Supplier Request' : 'طلب مورد'
    };
    return titles[service as keyof typeof titles] || service;
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Back' : 'رجوع'}
          </Button>
          <div>
            <h1 className="text-2xl font-bold">
              {language === 'en' ? 'Create New Group' : 'إنشاء مجموعة جديدة'}
            </h1>
            <p className="text-gray-600">
              {getServiceTitle()} • {type === 'group' 
                ? (language === 'en' ? 'Group Mode' : 'نمط المجموعة')
                : (language === 'en' ? 'Solo Mode' : 'نمط فردي')
              }
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                {language === 'en' ? 'Basic Information' : 'المعلومات الأساسية'}
              </CardTitle>
              <CardDescription>
                {language === 'en' 
                  ? 'Provide essential details about your group'
                  : 'قدم التفاصيل الأساسية حول مجموعتك'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">{language === 'en' ? 'Group Name' : 'اسم المجموعة'} *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder={language === 'en' ? 'Enter group name' : 'أدخل اسم المجموعة'}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">{language === 'en' ? 'Description' : 'الوصف'}</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder={language === 'en' ? 'Describe your group goals and requirements' : 'اوصف أهداف مجموعتك ومتطلباتها'}
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="country">{language === 'en' ? 'Country' : 'الدولة'} *</Label>
                  <Select value={formData.country} onValueChange={(value) => setFormData({...formData, country: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'en' ? 'Select country' : 'اختر الدولة'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sa">{language === 'en' ? 'Saudi Arabia' : 'السعودية'}</SelectItem>
                      <SelectItem value="ae">{language === 'en' ? 'UAE' : 'الإمارات'}</SelectItem>
                      <SelectItem value="eg">{language === 'en' ? 'Egypt' : 'مصر'}</SelectItem>
                      <SelectItem value="jo">{language === 'en' ? 'Jordan' : 'الأردن'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="sector">{language === 'en' ? 'Sector' : 'القطاع'} *</Label>
                  <Select value={formData.sector} onValueChange={(value) => setFormData({...formData, sector: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'en' ? 'Select sector' : 'اختر القطاع'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">{language === 'en' ? 'Technology' : 'التكنولوجيا'}</SelectItem>
                      <SelectItem value="healthcare">{language === 'en' ? 'Healthcare' : 'الرعاية الصحية'}</SelectItem>
                      <SelectItem value="education">{language === 'en' ? 'Education' : 'التعليم'}</SelectItem>
                      <SelectItem value="manufacturing">{language === 'en' ? 'Manufacturing' : 'التصنيع'}</SelectItem>
                      <SelectItem value="retail">{language === 'en' ? 'Retail' : 'التجارة'}</SelectItem>
                      <SelectItem value="other">{language === 'en' ? 'Other' : 'أخرى'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="targetMembers">{language === 'en' ? 'Target Members' : 'عدد الأعضاء المستهدف'} *</Label>
                  <Input
                    id="targetMembers"
                    type="number"
                    min="2"
                    max="100"
                    value={formData.targetMembers}
                    onChange={(e) => setFormData({...formData, targetMembers: e.target.value})}
                    placeholder="5-50"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="resourceType">{language === 'en' ? 'Resource Type' : 'نوع المورد'}</Label>
                  <Input
                    id="resourceType"
                    value={formData.resourceType}
                    onChange={(e) => setFormData({...formData, resourceType: e.target.value})}
                    placeholder={language === 'en' ? 'e.g., Office supplies, Marketing services' : 'مثل: لوازم مكتبية، خدمات تسويقية'}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Group Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {language === 'en' ? 'Group Settings' : 'إعدادات المجموعة'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minimumEntry">{language === 'en' ? 'Minimum Entry Amount' : 'الحد الأدنى للدخول'}</Label>
                  <Input
                    id="minimumEntry"
                    value={formData.minimumEntry}
                    onChange={(e) => setFormData({...formData, minimumEntry: e.target.value})}
                    placeholder={language === 'en' ? 'Optional minimum amount' : 'الحد الأدنى اختياري'}
                  />
                </div>

                <div>
                  <Label htmlFor="negotiationRounds">{language === 'en' ? 'Negotiation Rounds' : 'جولات التفاوض'}</Label>
                  <Select value={formData.negotiationRounds} onValueChange={(value) => setFormData({...formData, negotiationRounds: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 {language === 'en' ? 'Round' : 'جولة'}</SelectItem>
                      <SelectItem value="2">2 {language === 'en' ? 'Rounds' : 'جولات'}</SelectItem>
                      <SelectItem value="3">3 {language === 'en' ? 'Rounds' : 'جولات'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="supplierType">{language === 'en' ? 'Preferred Supplier Type' : 'نوع المورد المفضل'}</Label>
                <Select value={formData.supplierType} onValueChange={(value) => setFormData({...formData, supplierType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'en' ? 'Any supplier type' : 'أي نوع مورد'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">{language === 'en' ? 'Local Suppliers' : 'موردون محليون'}</SelectItem>
                    <SelectItem value="international">{language === 'en' ? 'International Suppliers' : 'موردون دوليون'}</SelectItem>
                    <SelectItem value="certified">{language === 'en' ? 'Certified Only' : 'معتمدون فقط'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>{language === 'en' ? 'Request Supplier Offers' : 'طلب عروض الموردين'}</Label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="requestOffers"
                      value="now"
                      checked={formData.requestOffers === 'now'}
                      onChange={(e) => setFormData({...formData, requestOffers: e.target.value})}
                    />
                    <span>{language === 'en' ? 'Now' : 'الآن'}</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="requestOffers"
                      value="later"
                      checked={formData.requestOffers === 'later'}
                      onChange={(e) => setFormData({...formData, requestOffers: e.target.value})}
                    />
                    <span>{language === 'en' ? 'Later' : 'لاحقاً'}</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contract & Dispute Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                {language === 'en' ? 'Contract & Dispute Settings' : 'إعدادات العقد والنزاعات'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>{language === 'en' ? 'Contract Type' : 'نوع العقد'}</Label>
                <Select value={formData.contractType} onValueChange={(value) => setFormData({...formData, contractType: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="simple">{language === 'en' ? 'Simple Agreement' : 'اتفاقية بسيطة'}</SelectItem>
                    <SelectItem value="detailed">{language === 'en' ? 'Detailed Contract' : 'عقد مفصل'}</SelectItem>
                    <SelectItem value="custom">{language === 'en' ? 'Custom Template' : 'قالب مخصص'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="disputeResolution"
                    checked={formData.disputeResolution}
                    onCheckedChange={(checked) => setFormData({...formData, disputeResolution: !!checked})}
                  />
                  <Label htmlFor="disputeResolution" className="text-sm">
                    {language === 'en' 
                      ? 'Enable ORDA (Online Dispute Resolution & Arbitration)'
                      : 'تفعيل نظام حل النزاعات والتحكيم الإلكتروني'}
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="autoApproval"
                    checked={formData.autoApproval}
                    onCheckedChange={(checked) => setFormData({...formData, autoApproval: !!checked})}
                  />
                  <Label htmlFor="autoApproval" className="text-sm">
                    {language === 'en' 
                      ? 'Auto-approve members (skip manual review)'
                      : 'الموافقة التلقائية على الأعضاء (تخطي المراجعة اليدوية)'}
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={() => navigate(-1)} className="flex-1">
              {language === 'en' ? 'Cancel' : 'إلغاء'}
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1">
              <FileText className="w-4 h-4 mr-2" />
              {isLoading 
                ? (language === 'en' ? 'Creating...' : 'جاري الإنشاء...') 
                : (language === 'en' ? 'Create Group' : 'إنشاء المجموعة')
              }
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateGroup;
