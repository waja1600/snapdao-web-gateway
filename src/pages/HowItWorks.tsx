
import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import { Layout } from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, Users, ShoppingCart, Briefcase, FileText, Shield, Clock } from "lucide-react";

const HowItWorks = () => {
  const { language } = useLanguage();

  const steps = {
    company: [
      {
        icon: Users,
        title: language === 'en' ? 'Create Company Group' : 'إنشاء مجموعة شركة',
        description: language === 'en' 
          ? 'Register and create a company group to start collaborating with others.'
          : 'سجل وأنشئ مجموعة شركة للبدء في التعاون مع الآخرين.'
      },
      {
        icon: FileText,
        title: language === 'en' ? 'Create Contract' : 'إنشاء عقد',
        description: language === 'en' 
          ? 'Create a detailed contract describing the work requirements and terms.'
          : 'أنشئ عقدًا مفصلاً يصف متطلبات العمل والشروط.'
      },
      {
        icon: Clock,
        title: language === 'en' ? 'Review Offers' : 'مراجعة العروض',
        description: language === 'en' 
          ? 'Review offers from freelancers or suppliers and select the best match.'
          : 'راجع العروض من المستقلين أو الموردين واختر أفضل عرض.'
      },
      {
        icon: BadgeCheck,
        title: language === 'en' ? 'Vote and Execute' : 'التصويت والتنفيذ',
        description: language === 'en' 
          ? 'Group members vote on proposals and execute approved contracts.'
          : 'يصوت أعضاء المجموعة على المقترحات وتنفيذ العقود المعتمدة.'
      }
    ],
    freelancer: [
      {
        icon: Shield,
        title: language === 'en' ? 'Verification' : 'التحقق',
        description: language === 'en' 
          ? 'Complete profile verification to unlock all platform features.'
          : 'أكمل عملية التحقق من الملف الشخصي لفتح جميع ميزات المنصة.'
      },
      {
        icon: FileText,
        title: language === 'en' ? 'Browse Contracts' : 'تصفح العقود',
        description: language === 'en' 
          ? 'Browse available contracts that match your skills and expertise.'
          : 'تصفح العقود المتاحة التي تتناسب مع مهاراتك وخبراتك.'
      },
      {
        icon: Briefcase,
        title: language === 'en' ? 'Submit Offers' : 'تقديم العروض',
        description: language === 'en' 
          ? 'Submit competitive offers for contracts you are interested in.'
          : 'قدم عروضًا تنافسية للعقود التي تهمك.'
      },
      {
        icon: BadgeCheck,
        title: language === 'en' ? 'Complete Work' : 'إكمال العمل',
        description: language === 'en' 
          ? 'Complete the work according to contract specifications and get rated.'
          : 'أكمل العمل وفقًا لمواصفات العقد واحصل على تقييم.'
      }
    ],
    supplier: [
      {
        icon: Shield,
        title: language === 'en' ? 'Verification' : 'التحقق',
        description: language === 'en' 
          ? 'Complete business verification to offer products on the platform.'
          : 'أكمل عملية التحقق من الأعمال لتقديم المنتجات على المنصة.'
      },
      {
        icon: ShoppingCart,
        title: language === 'en' ? 'List Products' : 'قائمة المنتجات',
        description: language === 'en' 
          ? 'Create a catalog of products or services you offer.'
          : 'أنشئ كتالوجًا للمنتجات أو الخدمات التي تقدمها.'
      },
      {
        icon: Briefcase,
        title: language === 'en' ? 'Submit Offers' : 'تقديم العروض',
        description: language === 'en' 
          ? 'Submit offers to groups interested in cooperative buying.'
          : 'قدم عروضًا للمجموعات المهتمة بالشراء التعاوني.'
      },
      {
        icon: BadgeCheck,
        title: language === 'en' ? 'Fulfill Orders' : 'تنفيذ الطلبات',
        description: language === 'en' 
          ? 'Process and fulfill orders from groups and maintain rating.'
          : 'معالجة وتنفيذ الطلبات من المجموعات والحفاظ على التقييم.'
      }
    ]
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">
          {language === 'en' ? 'How It Works' : 'كيف تعمل المنصة'}
        </h1>
        
        <p className="text-center max-w-3xl mx-auto mb-12 text-gray-600">
          {language === 'en' 
            ? 'ForGPO connects companies, freelancers, and suppliers in a secure and efficient ecosystem. Learn how each role uses our platform to achieve their goals.'
            : 'تربط ForGPO الشركات والمستقلين والموردين في نظام بيئي آمن وفعال. تعرف على كيفية استخدام كل دور لمنصتنا لتحقيق أهدافهم.'}
        </p>
        
        <Tabs defaultValue="company" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="company">
              {language === 'en' ? 'For Companies/Groups' : 'للشركات/المجموعات'}
            </TabsTrigger>
            <TabsTrigger value="freelancer">
              {language === 'en' ? 'For Freelancers' : 'للمستقلين'}
            </TabsTrigger>
            <TabsTrigger value="supplier">
              {language === 'en' ? 'For Suppliers' : 'للموردين'}
            </TabsTrigger>
          </TabsList>
          
          {/* Company/Group Tab Content */}
          <TabsContent value="company">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.company.map((step, index) => (
                <Card key={index}>
                  <CardContent className="pt-6 flex flex-col items-center text-center">
                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <step.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                    <div className="mt-4 text-2xl font-bold text-blue-600">
                      {index + 1}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Freelancer Tab Content */}
          <TabsContent value="freelancer">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.freelancer.map((step, index) => (
                <Card key={index}>
                  <CardContent className="pt-6 flex flex-col items-center text-center">
                    <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <step.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                    <div className="mt-4 text-2xl font-bold text-green-600">
                      {index + 1}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Supplier Tab Content */}
          <TabsContent value="supplier">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.supplier.map((step, index) => (
                <Card key={index}>
                  <CardContent className="pt-6 flex flex-col items-center text-center">
                    <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                      <step.icon className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                    <div className="mt-4 text-2xl font-bold text-purple-600">
                      {index + 1}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Platform Benefits */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold text-center mb-10">
            {language === 'en' ? 'Platform Benefits' : 'مزايا المنصة'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-medium mb-3">
                  {language === 'en' ? 'Smart Contracts' : 'العقود الذكية'}
                </h3>
                <p className="text-gray-600">
                  {language === 'en' 
                    ? 'Transparent agreements with clear terms and conditions, securely managed by our platform.'
                    : 'اتفاقيات شفافة بشروط وأحكام واضحة، تُدار بشكل آمن بواسطة منصتنا.'}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-medium mb-3">
                  {language === 'en' ? 'Secure Payments' : 'مدفوعات آمنة'}
                </h3>
                <p className="text-gray-600">
                  {language === 'en' 
                    ? 'Escrow payment system ensures fair transactions between all parties.'
                    : 'نظام دفع ضمان يضمن معاملات عادلة بين جميع الأطراف.'}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-medium mb-3">
                  {language === 'en' ? 'Dispute Resolution' : 'حل النزاعات'}
                </h3>
                <p className="text-gray-600">
                  {language === 'en' 
                    ? 'Fair arbitration system to resolve any issues between parties.'
                    : 'نظام تحكيم عادل لحل أي مشكلات بين الأطراف.'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HowItWorks;
