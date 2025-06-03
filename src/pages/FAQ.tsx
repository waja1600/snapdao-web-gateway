
import React, { useState } from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import { Layout } from "@/components/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface FaqItem {
  id: string;
  question: {
    en: string;
    ar: string;
  };
  answer: {
    en: string;
    ar: string;
  };
  category: string;
}

const faqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: {
      en: "How does the group purchasing work?",
      ar: "كيف تعمل آلية الشراء الجماعي؟"
    },
    answer: {
      en: "Group purchasing allows multiple organizations to combine their buying power to get better prices. Members create or join purchasing groups, vote on proposals, and benefit from bulk discounts and shared logistics costs.",
      ar: "يتيح الشراء الجماعي للمؤسسات المتعددة توحيد قوتها الشرائية للحصول على أسعار أفضل. يمكن للأعضاء إنشاء أو الانضمام إلى مجموعات الشراء، والتصويت على المقترحات، والاستفادة من خصومات الشراء بالجملة وتقاسم تكاليف الخدمات اللوجستية."
    },
    category: "purchasing"
  },
  {
    id: "faq-2",
    question: {
      en: "Who can join as a supplier?",
      ar: "من يمكنه الانضمام كمورد؟"
    },
    answer: {
      en: "Any registered business with the appropriate licenses and qualifications can register as a supplier. You'll need to provide business registration documents, tax records, and pass our verification process before being able to bid on group requests.",
      ar: "يمكن لأي شركة مسجلة تحمل التراخيص والمؤهلات المناسبة التسجيل كمورد. ستحتاج إلى تقديم وثائق تسجيل الشركة، والسجلات الضريبية، واجتياز عملية التحقق قبل أن تتمكن من تقديم عروض على طلبات المجموعة."
    },
    category: "suppliers"
  },
  {
    id: "faq-3",
    question: {
      en: "How are freelancers vetted on the platform?",
      ar: "كيف يتم التحقق من المستقلين على المنصة؟"
    },
    answer: {
      en: "Freelancers undergo a comprehensive verification process that includes identity verification, credential checks, portfolio review, and skills assessment. Additionally, our rating system provides transparency on past performance.",
      ar: "يخضع المستقلون لعملية تحقق شاملة تتضمن التحقق من الهوية، وفحص المؤهلات، ومراجعة المحفظة، وتقييم المهارات. بالإضافة إلى ذلك، يوفر نظام التقييم لدينا شفافية حول الأداء السابق."
    },
    category: "freelancers"
  },
  {
    id: "faq-4",
    question: {
      en: "What fees does the platform charge?",
      ar: "ما هي الرسوم التي تفرضها المنصة؟"
    },
    answer: {
      en: "The platform charges a small percentage fee on successful transactions. For group purchases, it's 2% of the total value. For freelancer services, it's 5% from the freelancer side. These fees cover platform maintenance, payment processing, and dispute resolution services.",
      ar: "تفرض المنصة رسوماً بنسبة صغيرة على المعاملات الناجحة. بالنسبة لعمليات الشراء الجماعية، فإنها 2% من القيمة الإجمالية. بالنسبة لخدمات المستقلين، فهي 5% من جانب المستقل. تغطي هذه الرسوم صيانة المنصة، ومعالجة المدفوعات، وخدمات حل النزاعات."
    },
    category: "payments"
  },
  {
    id: "faq-5",
    question: {
      en: "How is the voting process managed for group decisions?",
      ar: "كيف تتم إدارة عملية التصويت للقرارات الجماعية؟"
    },
    answer: {
      en: "Voting is conducted securely on the platform. Each member gets voting power proportional to their participation in the group. Proposals require a majority vote to pass. The system records all votes transparently, and results are immediately visible to all group members.",
      ar: "يتم إجراء التصويت بشكل آمن على المنصة. يحصل كل عضو على قوة تصويت تتناسب مع مشاركته في المجموعة. تتطلب المقترحات أغلبية الأصوات للمرور. يسجل النظام جميع الأصوات بشفافية، وتكون النتائج مرئية فوراً لجميع أعضاء المجموعة."
    },
    category: "voting"
  },
  {
    id: "faq-6",
    question: {
      en: "How are disputes handled between parties?",
      ar: "كيف يتم التعامل مع النزاعات بين الأطراف؟"
    },
    answer: {
      en: "Our platform includes a comprehensive dispute resolution system. First, we encourage direct communication between parties. If that doesn't resolve the issue, our mediation team steps in. For complex cases, we have an arbitration process with industry experts who review evidence and make binding decisions.",
      ar: "تتضمن منصتنا نظاماً شاملاً لحل النزاعات. أولاً، نشجع التواصل المباشر بين الأطراف. إذا لم يؤد ذلك إلى حل المشكلة، يتدخل فريق الوساطة لدينا. بالنسبة للحالات المعقدة، لدينا عملية تحكيم مع خبراء في الصناعة يراجعون الأدلة ويتخذون قرارات ملزمة."
    },
    category: "disputes"
  }
];

const FAQ = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: { en: 'All FAQs', ar: 'جميع الأسئلة الشائعة' } },
    { id: 'purchasing', name: { en: 'Group Purchasing', ar: 'الشراء الجماعي' } },
    { id: 'suppliers', name: { en: 'For Suppliers', ar: 'للموردين' } },
    { id: 'freelancers', name: { en: 'For Freelancers', ar: 'للمستقلين' } },
    { id: 'payments', name: { en: 'Payments & Fees', ar: 'المدفوعات والرسوم' } },
    { id: 'voting', name: { en: 'Voting Process', ar: 'عملية التصويت' } },
    { id: 'disputes', name: { en: 'Dispute Resolution', ar: 'حل النزاعات' } },
  ];
  
  const filteredFaqs = faqItems.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = !searchQuery || 
      faq.question[language as 'en' | 'ar'].toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer[language as 'en' | 'ar'].toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          {language === 'en' ? 'Frequently Asked Questions' : 'الأسئلة الشائعة'}
        </h1>
        
        {/* Search and Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={language === 'en' ? 'Search FAQs...' : 'ابحث في الأسئلة الشائعة...'}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                className="whitespace-nowrap"
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name[language as 'en' | 'ar']}
              </Button>
            ))}
          </div>
        </div>
        
        {/* FAQ Content */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              {activeCategory === 'all' 
                ? (language === 'en' ? 'All Frequently Asked Questions' : 'جميع الأسئلة الشائعة')
                : categories.find(cat => cat.id === activeCategory)?.name[language as 'en' | 'ar']}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="space-y-2">
                {filteredFaqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id} className="border rounded-lg px-4">
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      {faq.question[language as 'en' | 'ar']}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <div className="text-gray-600">
                        {faq.answer[language as 'en' | 'ar']}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  {language === 'en' 
                    ? 'No FAQs match your search criteria.' 
                    : 'لا توجد أسئلة شائعة تطابق معايير البحث الخاصة بك.'}
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                >
                  {language === 'en' ? 'Clear Filters' : 'مسح عوامل التصفية'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Contact Section */}
        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold mb-4">
            {language === 'en' 
              ? "Couldn't find what you're looking for?" 
              : "لم تجد ما تبحث عنه؟"}
          </h2>
          <p className="text-gray-600 mb-6">
            {language === 'en'
              ? "Contact our support team for personalized assistance."
              : "تواصل مع فريق الدعم للحصول على مساعدة مخصصة."}
          </p>
          <Button onClick={() => window.location.href = '/contact'}>
            {language === 'en' ? 'Contact Support' : 'تواصل مع الدعم'}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
