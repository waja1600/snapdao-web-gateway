
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ArrowLeft, Upload, Package } from "lucide-react";

const SupplierOffer = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { groupId } = useParams();
  
  const [formData, setFormData] = useState({
    companyName: '',
    offerDescription: '',
    price: '',
    quantity: '',
    deliveryTime: '',
    paymentTerms: '',
    validityPeriod: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(
        language === 'en' 
          ? 'Your offer has been submitted successfully!'
          : 'تم تقديم عرضك بنجاح!'
      );
      
      navigate('/dashboard');
    } catch (error) {
      toast.error(
        language === 'en' 
          ? 'Failed to submit offer'
          : 'فشل في تقديم العرض'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {language === 'en' ? 'Back' : 'رجوع'}
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              {language === 'en' ? 'Submit Supplier Offer' : 'تقديم عرض مورد'}
            </CardTitle>
            <CardDescription>
              {language === 'en' 
                ? 'Provide your detailed offer for this group request'
                : 'قدم عرضك المفصل لطلب هذه المجموعة'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">
                    {language === 'en' ? 'Company Name' : 'اسم الشركة'}
                  </Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    placeholder={language === 'en' ? 'Your company name' : 'اسم شركتك'}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="validityPeriod">
                    {language === 'en' ? 'Offer Validity' : 'صلاحية العرض'}
                  </Label>
                  <Select value={formData.validityPeriod} onValueChange={(value) => setFormData({...formData, validityPeriod: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'en' ? 'Select validity period' : 'اختر مدة الصلاحية'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">{language === 'en' ? '7 Days' : '7 أيام'}</SelectItem>
                      <SelectItem value="15days">{language === 'en' ? '15 Days' : '15 يوم'}</SelectItem>
                      <SelectItem value="30days">{language === 'en' ? '30 Days' : '30 يوم'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="offerDescription">
                  {language === 'en' ? 'Offer Description' : 'وصف العرض'}
                </Label>
                <Textarea
                  id="offerDescription"
                  value={formData.offerDescription}
                  onChange={(e) => setFormData({...formData, offerDescription: e.target.value})}
                  placeholder={language === 'en' ? 'Describe your offer in detail...' : 'اوصف عرضك بالتفصيل...'}
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">
                    {language === 'en' ? 'Price' : 'السعر'}
                  </Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder={language === 'en' ? 'Total price' : 'السعر الإجمالي'}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="quantity">
                    {language === 'en' ? 'Quantity' : 'الكمية'}
                  </Label>
                  <Input
                    id="quantity"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    placeholder={language === 'en' ? 'Available quantity' : 'الكمية المتاحة'}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="deliveryTime">
                    {language === 'en' ? 'Delivery Time' : 'وقت التسليم'}
                  </Label>
                  <Input
                    id="deliveryTime"
                    value={formData.deliveryTime}
                    onChange={(e) => setFormData({...formData, deliveryTime: e.target.value})}
                    placeholder={language === 'en' ? 'Delivery timeframe' : 'المدة الزمنية للتسليم'}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="paymentTerms">
                  {language === 'en' ? 'Payment Terms' : 'شروط الدفع'}
                </Label>
                <Select value={formData.paymentTerms} onValueChange={(value) => setFormData({...formData, paymentTerms: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'en' ? 'Select payment terms' : 'اختر شروط الدفع'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="advance50">{language === 'en' ? '50% Advance' : '50% مقدم'}</SelectItem>
                    <SelectItem value="ondelivery">{language === 'en' ? 'On Delivery' : 'عند التسليم'}</SelectItem>
                    <SelectItem value="net30">{language === 'en' ? 'Net 30 Days' : '30 يوم من التسليم'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notes">
                  {language === 'en' ? 'Additional Notes' : 'ملاحظات إضافية'}
                </Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder={language === 'en' ? 'Any additional information...' : 'أي معلومات إضافية...'}
                  rows={3}
                />
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    {language === 'en' 
                      ? 'Upload supporting documents (PDF, Word, Images)'
                      : 'ارفع المستندات الداعمة (PDF، Word، صور)'}
                  </p>
                  <Button type="button" variant="outline" className="mt-2">
                    {language === 'en' ? 'Choose Files' : 'اختر الملفات'}
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  type="submit" 
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting 
                    ? (language === 'en' ? 'Submitting...' : 'جاري الإرسال...')
                    : (language === 'en' ? 'Submit Offer' : 'تقديم العرض')
                  }
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  {language === 'en' ? 'Cancel' : 'إلغاء'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SupplierOffer;
