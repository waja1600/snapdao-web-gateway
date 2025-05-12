
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Users, CircleDollarSign, FileText, CircleCheck, Tag, CalendarIcon } from "lucide-react";

// Dummy deal data - in a real app, this would come from an API or context
const deals = [
  {
    id: "1",
    title: "توريد أثاث مكتبي",
    description: "مطلوب توريد 100 كرسي و50 مكتب لخمس شركات ضمن مجموعة الشراء الجماعي للأثاث المكتبي. يجب أن تكون المنتجات ذات جودة عالية وتتوافق مع معايير الأمان والجودة.",
    network: "مجموعات الشراء الجماعي",
    members: 5,
    budget: "50,000 ريال",
    votes: { yes: 4, no: 0, abstain: 1 },
    category: "أثاث",
    deadline: "2025-06-15",
    status: "active",
    requirements: [
      "سجل تجاري ساري المفعول",
      "شهادة ضريبة القيمة المضافة",
      "خبرة لا تقل عن 3 سنوات في توريد الأثاث المكتبي",
      "القدرة على التوريد خلال 30 يوم من تاريخ الموافقة على العرض",
      "تقديم عينات للمنتجات قبل التوريد النهائي",
      "ضمان لا يقل عن سنة على المنتجات"
    ],
    licenseConditions: [
      "الالتزام بمعايير الجودة السعودية",
      "شهادة مطابقة المنتجات للمواصفات القياسية",
      "التسجيل في منصة اعتماد للمشتريات الحكومية (إذا كان مطبقاً)",
      "وثيقة التأمينات الاجتماعية"
    ],
    specifications: {
      chairs: "كراسي مكتبية دوارة مريحة، مقاومة للاهتراء، قابلة للتعديل، ذات مساند للذراعين",
      desks: "مكاتب عمل بمقاس 120×80 سم، مقاومة للخدش، مع أدراج قابلة للقفل وممرات للكابلات"
    },
    groupMembers: [
      "شركة التقنية المتطورة",
      "مؤسسة التميز للأعمال",
      "شركة الخليج للاستشارات",
      "مجموعة الأفق للتطوير",
      "شركة المستقبل للتكنولوجيا"
    ]
  },
  {
    id: "2",
    title: "خدمات تطوير مواقع",
    description: "تطوير موقع إلكتروني متكامل مع نظام إدارة محتوى لثلاث شركات ضمن مبادرة التحول الرقمي المشترك.",
    network: "بوابة التوظيف",
    members: 3,
    budget: "25,000 ريال",
    votes: { yes: 3, no: 0, abstain: 0 },
    category: "تكنولوجيا",
    deadline: "2025-06-30",
    status: "active",
    requirements: [
      "خبرة موثقة في تطوير المواقع الإلكترونية",
      "محفظة أعمال سابقة",
      "القدرة على تقديم الدعم الفني لمدة 6 أشهر بعد الإطلاق",
      "تسليم المشروع خلال 45 يوم"
    ],
    licenseConditions: [
      "رخصة مزاولة نشاط تقنية المعلومات",
      "عضوية الهيئة السعودية للمبرمجين (إن وجدت)",
      "شهادات في مجال التطوير من جهات معترف بها"
    ],
    specifications: {
      technology: "React.js أو Vue.js للواجهة الأمامية، Node.js للخادم الخلفي",
      features: "نظام إدارة محتوى، منصة دفع إلكتروني، دعم اللغة العربية والإنجليزية، تصميم متجاوب"
    },
    groupMembers: [
      "شركة الاتصالات المتكاملة",
      "مؤسسة البيانات الذكية",
      "شركة التقنية الحديثة"
    ]
  }
];

const DealDetail = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Find the deal based on the ID from the URL
  const deal = deals.find(d => d.id === id);

  const [activeTab, setActiveTab] = useState("details");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [proposal, setProposal] = useState({
    price: "",
    description: "",
    deliveryTime: "",
    warranty: ""
  });

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptedTerms) {
      toast({
        variant: "destructive",
        title: language === 'en' ? "Terms not accepted" : "لم يتم قبول الشروط",
        description: language === 'en' 
          ? "You must accept the terms and conditions to submit a proposal" 
          : "يجب عليك قبول الشروط والأحكام لتقديم العرض"
      });
      return;
    }

    // Here you would submit the proposal to your backend
    toast({
      title: language === 'en' ? "Proposal submitted" : "تم تقديم العرض",
      description: language === 'en' 
        ? "Your proposal has been submitted successfully" 
        : "تم تقديم عرضك بنجاح"
    });

    // Navigate back to the deals page
    navigate("/active-deals");
  };

  // If deal not found
  if (!deal) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h1 className="text-2xl font-bold mb-4">
            {language === 'en' ? 'Deal not found' : 'لم يتم العثور على الصفقة'}
          </h1>
          <p className="text-gray-500 mb-6">
            {language === 'en' 
              ? 'The deal you are looking for does not exist or has been removed.' 
              : 'الصفقة التي تبحث عنها غير موجودة أو تمت إزالتها.'}
          </p>
          <Button onClick={() => navigate('/active-deals')}>
            {language === 'en' ? 'Back to Deals' : 'العودة إلى الصفقات'}
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Back button */}
        <div>
          <Button 
            variant="outline" 
            onClick={() => navigate('/active-deals')}
            className="mb-4"
          >
            {language === 'en' ? '← Back to Deals' : '← العودة إلى الصفقات'}
          </Button>
        </div>
        
        {/* Deal header section */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-2xl">{deal.title}</CardTitle>
                <CardDescription className="mt-2 text-base">
                  {deal.description}
                </CardDescription>
              </div>
              <Badge className="self-start" variant="outline">{deal.network}</Badge>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-4">
              <Badge variant="secondary">{deal.category}</Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Users className="h-3 w-3" /> {deal.members} {language === 'en' ? 'members' : 'أعضاء'}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <CircleDollarSign className="h-3 w-3" /> {deal.budget}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <CalendarIcon className="h-3 w-3" /> {new Date(deal.deadline).toLocaleDateString(language === 'en' ? 'en-US' : 'ar-SA')}
              </Badge>
            </div>
            
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center">
                <span className="mr-2 font-medium">{language === 'en' ? 'Status:' : 'الحالة:'}</span>
                <Badge variant="default">
                  {language === 'en' ? 'Active' : 'نشطة'}
                </Badge>
              </div>
              
              <div className="flex items-center">
                <span className="mr-2 font-medium">{language === 'en' ? 'Votes:' : 'الأصوات:'}</span>
                <span className="text-green-600 flex items-center">
                  <CircleCheck className="h-4 w-4 mr-1" /> {deal.votes.yes}
                </span>
              </div>
            </div>
          </CardHeader>
        </Card>
        
        {/* Tabs section */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="details">
              {language === 'en' ? 'Details' : 'التفاصيل'}
            </TabsTrigger>
            <TabsTrigger value="requirements">
              {language === 'en' ? 'Requirements' : 'المتطلبات'}
            </TabsTrigger>
            <TabsTrigger value="submit">
              {language === 'en' ? 'Submit Offer' : 'تقديم عرض'}
            </TabsTrigger>
          </TabsList>
          
          {/* Details Tab */}
          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Group Members' : 'أعضاء المجموعة'}</CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Organizations participating in this group deal' 
                    : 'المؤسسات المشاركة في صفقة المجموعة هذه'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {deal.groupMembers.map((member, index) => (
                    <li key={index} className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-gray-500" />
                      {member}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Specifications' : 'المواصفات'}</CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Detailed specifications for this deal' 
                    : 'المواصفات التفصيلية لهذه الصفقة'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  {Object.entries(deal.specifications).map(([key, value]) => (
                    <div key={key}>
                      <dt className="font-medium">{key}:</dt>
                      <dd className="mt-1 text-gray-600">{value}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Requirements Tab */}
          <TabsContent value="requirements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Supplier Requirements' : 'متطلبات المورد'}</CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Requirements that must be met by suppliers' 
                    : 'المتطلبات التي يجب استيفاؤها من قبل الموردين'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {deal.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <CircleCheck className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Licensing & Documentation' : 'الترخيص والوثائق'}</CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Required licenses and documentation' 
                    : 'التراخيص والوثائق المطلوبة'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {deal.licenseConditions.map((condition, index) => (
                    <li key={index} className="flex items-start">
                      <FileText className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>{condition}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Submit Offer Tab */}
          <TabsContent value="submit">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Submit Your Offer' : 'تقديم عرضك'}</CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Complete the form below to submit your offer to the group' 
                    : 'أكمل النموذج أدناه لتقديم عرضك إلى المجموعة'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitProposal} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="price">{language === 'en' ? 'Price Offer' : 'عرض السعر'}</Label>
                      <Input 
                        id="price" 
                        type="text"
                        placeholder={language === 'en' ? 'Enter your price' : 'أدخل السعر'}
                        value={proposal.price}
                        onChange={e => setProposal({...proposal, price: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">{language === 'en' ? 'Proposal Description' : 'وصف العرض'}</Label>
                      <Textarea 
                        id="description" 
                        placeholder={language === 'en' ? 'Describe your offer in detail' : 'صف عرضك بالتفصيل'}
                        value={proposal.description}
                        onChange={e => setProposal({...proposal, description: e.target.value})}
                        rows={5}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="deliveryTime">{language === 'en' ? 'Delivery Time (days)' : 'وقت التسليم (أيام)'}</Label>
                        <Input 
                          id="deliveryTime" 
                          type="number"
                          placeholder={language === 'en' ? 'Enter days' : 'أدخل عدد الأيام'}
                          value={proposal.deliveryTime}
                          onChange={e => setProposal({...proposal, deliveryTime: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="warranty">{language === 'en' ? 'Warranty Period (months)' : 'فترة الضمان (شهور)'}</Label>
                        <Input 
                          id="warranty" 
                          type="number"
                          placeholder={language === 'en' ? 'Enter months' : 'أدخل عدد الشهور'}
                          value={proposal.warranty}
                          onChange={e => setProposal({...proposal, warranty: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2 rtl:space-x-reverse">
                      <Checkbox 
                        id="terms" 
                        checked={acceptedTerms}
                        onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                      />
                      <Label 
                        htmlFor="terms" 
                        className="text-sm leading-tight cursor-pointer"
                      >
                        {language === 'en' 
                          ? 'I acknowledge that I meet all the requirements and have the necessary documentation mentioned in the requirements section, and my offer is binding upon acceptance.' 
                          : 'أقر بأنني أستوفي جميع المتطلبات ولدي الوثائق اللازمة المذكورة في قسم المتطلبات، وعرضي ملزم عند القبول.'}
                      </Label>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    {language === 'en' ? 'Submit Proposal' : 'تقديم الاقتراح'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default DealDetail;
