
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
import { ArrowLeft, Upload, Briefcase } from "lucide-react";

const FreelancerOffer = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { groupId } = useParams();
  
  const [formData, setFormData] = useState({
    taskDescription: '',
    timeline: '',
    price: '',
    methodology: '',
    portfolio: '',
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
          ? 'Your freelancer offer has been submitted successfully!'
          : 'تم تقديم عرضك كمستقل بنجاح!'
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
              <Briefcase className="h-5 w-5" />
              {language === 'en' ? 'Submit Freelancer Offer' : 'تقديم عرض مستقل'}
            </CardTitle>
            <CardDescription>
              {language === 'en' 
                ? 'Provide your detailed proposal for this freelance task'
                : 'قدم اقتراحك المفصل لهذه المهمة المستقلة'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="taskDescription">
                  {language === 'en' ? 'Task Understanding & Approach' : 'فهم المهمة والمنهجية'}
                </Label>
                <Textarea
                  id="taskDescription"
                  value={formData.taskDescription}
                  onChange={(e) => setFormData({...formData, taskDescription: e.target.value})}
                  placeholder={language === 'en' ? 'Describe how you understand the task and your approach...' : 'اوصف فهمك للمهمة ومنهجيتك...'}
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="timeline">
                    {language === 'en' ? 'Timeline (Days)' : 'المدة الزمنية (أيام)'}
                  </Label>
                  <Select value={formData.timeline} onValueChange={(value) => setFormData({...formData, timeline: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'en' ? 'Select timeline' : 'اختر المدة'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-3">{language === 'en' ? '1-3 Days' : '1-3 أيام'}</SelectItem>
                      <SelectItem value="4-7">{language === 'en' ? '4-7 Days' : '4-7 أيام'}</SelectItem>
                      <SelectItem value="1-2weeks">{language === 'en' ? '1-2 Weeks' : '1-2 أسبوع'}</SelectItem>
                      <SelectItem value="3-4weeks">{language === 'en' ? '3-4 Weeks' : '3-4 أسبوع'}</SelectItem>
                      <SelectItem value="1month+">{language === 'en' ? '1+ Month' : 'شهر أو أكثر'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="price">
                    {language === 'en' ? 'Total Price' : 'السعر الإجمالي'}
                  </Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder={language === 'en' ? 'Your total fee' : 'أتعابك الإجمالية'}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="methodology">
                  {language === 'en' ? 'Methodology & Tools' : 'المنهجية والأدوات'}
                </Label>
                <Textarea
                  id="methodology"
                  value={formData.methodology}
                  onChange={(e) => setFormData({...formData, methodology: e.target.value})}
                  placeholder={language === 'en' ? 'Describe the tools and methodology you will use...' : 'اوصف الأدوات والمنهجية التي ستستخدمها...'}
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="portfolio">
                  {language === 'en' ? 'Relevant Experience' : 'الخبرة ذات الصلة'}
                </Label>
                <Textarea
                  id="portfolio"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({...formData, portfolio: e.target.value})}
                  placeholder={language === 'en' ? 'Mention relevant projects or experience...' : 'اذكر المشاريع أو الخبرة ذات الصلة...'}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="notes">
                  {language === 'en' ? 'Additional Notes' : 'ملاحظات إضافية'}
                </Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder={language === 'en' ? 'Any additional information or questions...' : 'أي معلومات إضافية أو أسئلة...'}
                  rows={2}
                />
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    {language === 'en' 
                      ? 'Upload portfolio samples or relevant documents'
                      : 'ارفع عينات من أعمالك أو مستندات ذات صلة'}
                  </p>
                  <Button type="button" variant="outline" className="mt-2">
                    {language === 'en' ? 'Choose Files' : 'اختر الملفات'}
                  </Button>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">
                  {language === 'en' ? 'Proposal Guidelines' : 'إرشادات الاقتراح'}
                </h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>
                    {language === 'en' 
                      ? '• Be specific about deliverables and timeline'
                      : '• كن محددًا بشأن المخرجات والجدول الزمني'}
                  </li>
                  <li>
                    {language === 'en' 
                      ? '• Include relevant experience and portfolio samples'
                      : '• أدرج الخبرة ذات الصلة وعينات من أعمالك'}
                  </li>
                  <li>
                    {language === 'en' 
                      ? '• Your offer will be reviewed within 48 hours'
                      : '• سيتم مراجعة عرضك خلال 48 ساعة'}
                  </li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button 
                  type="submit" 
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting 
                    ? (language === 'en' ? 'Submitting...' : 'جاري الإرسال...')
                    : (language === 'en' ? 'Submit Proposal' : 'تقديم الاقتراح')
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

export default FreelancerOffer;
