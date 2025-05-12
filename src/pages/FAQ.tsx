
import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import { Layout } from "@/components/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FAQ = () => {
  const { language } = useLanguage();
  
  const faqs = {
    general: [
      {
        question: language === 'en' ? 'What is ForGPO?' : 'ما هي ForGPO؟',
        answer: language === 'en' 
          ? 'ForGPO is a collaborative services platform that connects companies, freelancers, and suppliers. It facilitates efficient transactions through transparent governance, secure payments, and a comprehensive contract management system.'
          : 'ForGPO هي منصة خدمات تعاونية تربط الشركات والمستقلين والموردين. تسهل المعاملات الفعالة من خلال الحوكمة الشفافة والمدفوعات الآمنة ونظام إدارة العقود الشامل.'
      },
      {
        question: language === 'en' ? 'How do I get started?' : 'كيف أبدأ؟',
        answer: language === 'en' 
          ? 'Simply register an account, choose your role (company/group, freelancer, or supplier), complete the verification process, and start using the platform features according to your role.'
          : 'ببساطة قم بتسجيل حساب، واختر دورك (شركة/مجموعة، مستقل، أو مورد)، وأكمل عملية التحقق، وابدأ في استخدام ميزات المنصة وفقًا لدورك.'
      },
      {
        question: language === 'en' ? 'Is ForGPO available in my country?' : 'هل ForGPO متاحة في بلدي؟',
        answer: language === 'en' 
          ? 'ForGPO is currently available in Saudi Arabia, UAE, Egypt, and several other countries. We are constantly expanding our service to new regions. Check our country selector for the most up-to-date availability.'
          : 'ForGPO متاحة حاليًا في المملكة العربية السعودية والإمارات العربية المتحدة ومصر والعديد من البلدان الأخرى. نحن نعمل باستمرار على توسيع خدماتنا لمناطق جديدة. راجع محدد البلد لدينا للحصول على أحدث المعلومات حول التوفر.'
      }
    ],
    companies: [
      {
        question: language === 'en' ? 'How do I create a company group?' : 'كيف يمكنني إنشاء مجموعة شركة؟',
        answer: language === 'en' 
          ? 'After registering as a Company/Group, you can create your group from the dashboard. You\'ll need to provide basic information about your organization and invite members to join.'
          : 'بعد التسجيل كشركة/مجموعة، يمكنك إنشاء مجموعتك من لوحة التحكم. ستحتاج إلى تقديم معلومات أساسية حول منظمتك ودعوة الأعضاء للانضمام.'
      },
      {
        question: language === 'en' ? 'How does the voting system work?' : 'كيف يعمل نظام التصويت؟',
        answer: language === 'en' 
          ? 'Group members can vote on proposals and contracts based on the governance structure you set. Voting power can be distributed equally or weighted according to your organization\'s needs. Decisions are made based on the majority threshold you establish.'
          : 'يمكن لأعضاء المجموعة التصويت على المقترحات والعقود بناءً على هيكل الحوكمة الذي تحدده. يمكن توزيع قوة التصويت بالتساوي أو بترجيح وفقًا لاحتياجات مؤسستك. يتم اتخاذ القرارات بناءً على عتبة الأغلبية التي تحددها.'
      },
      {
        question: language === 'en' ? 'What fees does ForGPO charge?' : 'ما هي الرسوم التي تفرضها ForGPO؟',
        answer: language === 'en' 
          ? 'ForGPO charges a small percentage fee on successfully completed contracts. The exact fee depends on the contract value and type. You can find detailed fee information in our pricing section.'
          : 'تفرض ForGPO رسومًا بنسبة صغيرة على العقود المكتملة بنجاح. تعتمد الرسوم الدقيقة على قيمة العقد ونوعه. يمكنك العثور على معلومات مفصلة عن الرسوم في قسم التسعير.'
      }
    ],
    freelancers: [
      {
        question: language === 'en' ? 'How do I find contracts to bid on?' : 'كيف يمكنني العثور على عقود للمزايدة عليها؟',
        answer: language === 'en' 
          ? 'Navigate to the Contracts section in your dashboard. You can filter contracts by category, value, and other criteria to find opportunities that match your skills and experience.'
          : 'انتقل إلى قسم العقود في لوحة التحكم. يمكنك تصفية العقود حسب الفئة والقيمة ومعايير أخرى للعثور على فرص تتناسب مع مهاراتك وخبرتك.'
      },
      {
        question: language === 'en' ? 'How do payments work?' : 'كيف تعمل المدفوعات؟',
        answer: language === 'en' 
          ? 'Payments are held in escrow until the contract milestones are completed and approved. Once your work is approved, the funds are released to your account. You can withdraw your earnings through our supported payment methods.'
          : 'يتم الاحتفاظ بالمدفوعات في حساب ضمان حتى اكتمال مراحل العقد والموافقة عليها. بمجرد الموافقة على عملك، يتم إطلاق الأموال إلى حسابك. يمكنك سحب أرباحك من خلال طرق الدفع المدعومة لدينا.'
      },
      {
        question: language === 'en' ? 'How does the rating system affect me?' : 'كيف يؤثر نظام التقييم علي؟',
        answer: language === 'en' 
          ? 'Your performance on completed contracts earns you ratings from clients. Higher ratings increase your visibility and chances of being selected for future contracts. Maintaining a good rating is essential for success on the platform.'
          : 'يمنحك أداؤك في العقود المكتملة تقييمات من العملاء. تزيد التقييمات العالية من ظهورك وفرص اختيارك للعقود المستقبلية. الحفاظ على تقييم جيد أمر ضروري للنجاح على المنصة.'
      }
    ],
    suppliers: [
      {
        question: language === 'en' ? 'How can I list my products?' : 'كيف يمكنني إدراج منتجاتي؟',
        answer: language === 'en' 
          ? 'After completing the verification process, you can add your products or services through the Products section in your dashboard. Include detailed descriptions, pricing, and images to make your offerings stand out.'
          : 'بعد إكمال عملية التحقق، يمكنك إضافة منتجاتك أو خدماتك من خلال قسم المنتجات في لوحة التحكم. قم بتضمين أوصاف مفصلة والأسعار والصور لجعل عروضك متميزة.'
      },
      {
        question: language === 'en' ? 'How do cooperative buying orders work?' : 'كيف تعمل طلبات الشراء التعاوني؟',
        answer: language === 'en' 
          ? 'Groups place bulk orders for products to get better deals. You can respond to these orders with competitive offers. If your offer is accepted, you\'ll fulfill the order according to the agreed terms and receive payment through the platform.'
          : 'تضع المجموعات طلبات بالجملة للمنتجات للحصول على صفقات أفضل. يمكنك الرد على هذه الطلبات بعروض تنافسية. إذا تم قبول عرضك، ستنفذ الطلب وفقًا للشروط المتفق عليها وتتلقى الدفع من خلال المنصة.'
      },
      {
        question: language === 'en' ? 'Can I offer discounts for larger orders?' : 'هل يمكنني تقديم خصومات للطلبات الأكبر؟',
        answer: language === 'en' 
          ? 'Yes! Our platform encourages volume discounts. You can set up tiered pricing for different order quantities, making your offers more attractive to larger groups.'
          : 'نعم! تشجع منصتنا خصومات الحجم. يمكنك إعداد تسعير متدرج لكميات طلبات مختلفة، مما يجعل عروضك أكثر جاذبية للمجموعات الأكبر.'
      }
    ]
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">
          {language === 'en' ? 'Frequently Asked Questions' : 'الأسئلة المتكررة'}
        </h1>
        
        <p className="text-center max-w-3xl mx-auto mb-12 text-gray-600">
          {language === 'en' 
            ? 'Find answers to common questions about ForGPO and how our platform works for different users.'
            : 'اعثر على إجابات للأسئلة الشائعة حول ForGPO وكيف تعمل منصتنا لمختلف المستخدمين.'}
        </p>
        
        <Tabs defaultValue="general" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="general">
              {language === 'en' ? 'General' : 'عام'}
            </TabsTrigger>
            <TabsTrigger value="companies">
              {language === 'en' ? 'For Companies' : 'للشركات'}
            </TabsTrigger>
            <TabsTrigger value="freelancers">
              {language === 'en' ? 'For Freelancers' : 'للمستقلين'}
            </TabsTrigger>
            <TabsTrigger value="suppliers">
              {language === 'en' ? 'For Suppliers' : 'للموردين'}
            </TabsTrigger>
          </TabsList>
          
          {Object.entries(faqs).map(([category, questions]) => (
            <TabsContent key={category} value={category}>
              <Card>
                <Accordion type="single" collapsible className="w-full">
                  {questions.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left px-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
        
        {/* Additional Help */}
        <div className="text-center mt-12">
          <h2 className="text-xl font-bold mb-4">
            {language === 'en' ? 'Need More Help?' : 'تحتاج إلى مزيد من المساعدة؟'}
          </h2>
          <p className="mb-6 text-gray-600">
            {language === 'en' 
              ? 'Can\'t find the answer you\'re looking for? Contact our support team.'
              : 'لا يمكنك العثور على الإجابة التي تبحث عنها؟ اتصل بفريق الدعم لدينا.'}
          </p>
          <Button onClick={() => window.location.href = '/contact'}>
            {language === 'en' ? 'Contact Support' : 'اتصل بالدعم'}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
