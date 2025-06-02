
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Users, FileText, Gavel, CreditCard, ServerIcon, 
  Layers, Workflow, ShieldCheck, Video, Database
} from "lucide-react";

const ProjectWorkflow = () => {
  const { t, language } = useLanguage();
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            {language === 'ar' ? 'مخطط سير العمل للمشروع' : 'Project Workflow Diagram'}
          </h1>
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">
              {language === 'ar' ? 'نظرة عامة' : 'Overview'}
            </TabsTrigger>
            <TabsTrigger value="frontend">
              {language === 'ar' ? 'الواجهة الأمامية' : 'Frontend'}
            </TabsTrigger>
            <TabsTrigger value="backend">
              {language === 'ar' ? 'الخلفية' : 'Backend'}
            </TabsTrigger>
            <TabsTrigger value="workflow">
              {language === 'ar' ? 'تدفق العمل' : 'Workflow'}
            </TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle className={`text-xl ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  {language === 'ar' ? 'نظرة عامة على المشروع' : 'Project Overview'}
                </CardTitle>
              </CardHeader>
              <CardContent className={language === 'ar' ? 'text-right' : 'text-left'}>
                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center">
                          <Layers className="h-5 w-5 mr-2" />
                          <CardTitle className="text-lg">
                            {language === 'ar' ? 'الفكرة الأساسية' : 'Core Concept'}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          {language === 'ar' 
                            ? 'منصة لإدارة المجموعات التجارية تسهل التفاوض، عقد الصفقات، وإجراء المعاملات المالية مع ضمان الشفافية والأمان.'
                            : 'A platform for managing commercial groups that facilitates negotiations, deal-making, and financial transactions with transparency and security.'}
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center">
                          <ShieldCheck className="h-5 w-5 mr-2" />
                          <CardTitle className="text-lg">
                            {language === 'ar' ? 'الأدوات المتكاملة' : 'Integrated Tools'}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          <Badge>ODR</Badge>
                          <Badge>KYC/KYCB</Badge>
                          <Badge>Frappe.io</Badge>
                          <Badge>MongoDB</Badge>
                          <Badge>IPFS</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="relative overflow-hidden rounded-xl border bg-background p-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-20" />
                    <div className="relative z-10">
                      <h3 className="text-lg font-semibold mb-4">
                        {language === 'ar' ? 'المكونات الرئيسية للمشروع' : 'Main Project Components'}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex flex-col items-center p-3 bg-white bg-opacity-80 rounded-lg shadow">
                          <Users className="h-8 w-8 mb-2 text-blue-600" />
                          <span className="text-center font-medium">
                            {language === 'ar' ? 'إدارة المجموعات' : 'Group Management'}
                          </span>
                        </div>
                        
                        <div className="flex flex-col items-center p-3 bg-white bg-opacity-80 rounded-lg shadow">
                          <FileText className="h-8 w-8 mb-2 text-green-600" />
                          <span className="text-center font-medium">
                            {language === 'ar' ? 'الفواتير والمطالبات' : 'Invoices & Claims'}
                          </span>
                        </div>
                        
                        <div className="flex flex-col items-center p-3 bg-white bg-opacity-80 rounded-lg shadow">
                          <Gavel className="h-8 w-8 mb-2 text-amber-600" />
                          <span className="text-center font-medium">
                            {language === 'ar' ? 'التحكيم والنزاعات' : 'Arbitration & Disputes'}
                          </span>
                        </div>
                        
                        <div className="flex flex-col items-center p-3 bg-white bg-opacity-80 rounded-lg shadow">
                          <CreditCard className="h-8 w-8 mb-2 text-purple-600" />
                          <span className="text-center font-medium">
                            {language === 'ar' ? 'إدارة المدفوعات' : 'Payment Management'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Frontend Tab */}
          <TabsContent value="frontend">
            <Card>
              <CardHeader>
                <CardTitle className={`text-xl ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  {language === 'ar' ? 'تصميم الواجهة الأمامية' : 'Frontend Design'}
                </CardTitle>
              </CardHeader>
              <CardContent className={language === 'ar' ? 'text-right' : 'text-left'}>
                <div className="space-y-6">
                  <div className="relative rounded-xl border p-6 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100" />
                    <div className="relative z-10">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-2">1</span>
                        {language === 'ar' ? 'الصفحة الرئيسية' : 'Homepage'}
                      </h3>
                      
                      <div className="border border-dashed border-gray-300 rounded-lg p-4 mb-4 bg-white bg-opacity-80">
                        <h4 className="font-medium text-sm text-gray-700 mb-2">
                          {language === 'ar' ? 'شريط التنقل العلوي' : 'Top Navigation Bar'}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">{language === 'ar' ? 'المجموعات' : 'Groups'}</Badge>
                          <Badge variant="outline">{language === 'ar' ? 'الحساب الشخصي' : 'Account'}</Badge>
                          <Badge variant="outline">{language === 'ar' ? 'التحكيم' : 'Arbitration'}</Badge>
                          <Badge variant="outline">{language === 'ar' ? 'المدفوعات' : 'Payments'}</Badge>
                          <Badge variant="outline">{language === 'ar' ? 'الدعم الفني' : 'Support'}</Badge>
                          <Badge variant="outline">{language === 'ar' ? 'إعدادات الحساب' : 'Settings'}</Badge>
                        </div>
                      </div>
                      
                      <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-white bg-opacity-80">
                        <h4 className="font-medium text-sm text-gray-700 mb-2">
                          {language === 'ar' ? 'المحتوى الرئيسي' : 'Main Content'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {language === 'ar' 
                            ? 'عرض قائمة المجموعات الحالية، مع خيارات الانضمام، عرض التفاصيل، وفتح قضايا التحكيم.'
                            : 'Display a list of current groups, with options to join, view details, and open arbitration cases.'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative rounded-xl border p-6 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-teal-100" />
                    <div className="relative z-10">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center mr-2">2</span>
                        {language === 'ar' ? 'صفحة المجموعات' : 'Groups Page'}
                      </h3>
                      
                      <div className="border border-dashed border-gray-300 rounded-lg p-4 mb-4 bg-white bg-opacity-80">
                        <h4 className="font-medium text-sm text-gray-700 mb-2">
                          {language === 'ar' ? 'عرض المجموعات المتاحة' : 'Available Groups Display'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {language === 'ar'
                            ? 'قائمة بالمجموعات المتاحة للانضمام مع تفاصيل كل مجموعة مثل الرسوم، الأطراف، ومراحل المشروع.'
                            : 'A list of available groups to join with details such as fees, parties, and project stages.'}
                        </p>
                      </div>
                      
                      <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-white bg-opacity-80">
                        <h4 className="font-medium text-sm text-gray-700 mb-2">
                          {language === 'ar' ? 'أدوات تصفية المجموعات' : 'Filtering Tools'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {language === 'ar'
                            ? 'للبحث عن مجموعات بناءً على نوع التفاوض (بيع، شراء، تحكيم).'
                            : 'To search for groups based on the type of negotiation (buy, sell, arbitration).'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative rounded-xl border p-6 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100" />
                    <div className="relative z-10">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center mr-2">3</span>
                        {language === 'ar' ? 'منطقة العميل' : 'Client Dashboard'}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-white bg-opacity-80">
                          <h4 className="font-medium text-sm text-gray-700 mb-2">
                            {language === 'ar' ? 'الإشعارات والفواتير' : 'Notifications & Invoices'}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {language === 'ar'
                              ? 'إشعارات جديدة حول الطلبات، الفواتير، وعرض الفواتير المفتوحة والمدفوعة.'
                              : 'New notifications about requests, invoices, and display of open and paid invoices.'}
                          </p>
                        </div>
                        
                        <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-white bg-opacity-80">
                          <h4 className="font-medium text-sm text-gray-700 mb-2">
                            {language === 'ar' ? 'التحقق من KYC/KYCB' : 'KYC/KYCB Verification'}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {language === 'ar'
                              ? 'عرض حالة إتمام عملية التوثيق (مكتمل، قيد المعالجة).'
                              : 'Display verification process status (completed, in progress).'}
                          </p>
                        </div>
                        
                        <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-white bg-opacity-80">
                          <h4 className="font-medium text-sm text-gray-700 mb-2">
                            {language === 'ar' ? 'المطالبات والتحكيم' : 'Claims & Arbitration'}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {language === 'ar'
                              ? 'عرض القضايا المفتوحة وأدوات التفاعل مع المحكمين.'
                              : 'Display open cases and tools to interact with arbitrators.'}
                          </p>
                        </div>
                        
                        <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-white bg-opacity-80">
                          <h4 className="font-medium text-sm text-gray-700 mb-2">
                            {language === 'ar' ? 'إدارة المدفوعات' : 'Payment Management'}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {language === 'ar'
                              ? 'خيارات لدفع الفواتير باستخدام بوابات الدفع (PayPal، Stripe، Skrill).'
                              : 'Options to pay invoices using payment gateways (PayPal, Stripe, Skrill).'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative rounded-xl border p-6 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-yellow-100" />
                    <div className="relative z-10">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center mr-2">4</span>
                        {language === 'ar' ? 'صفحة التحكيم ODR' : 'ODR Arbitration Page'}
                      </h3>
                      
                      <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-white bg-opacity-80">
                        <h4 className="font-medium text-sm text-gray-700 mb-2">
                          {language === 'ar' ? 'فتح قضايا التحكيم' : 'Opening Arbitration Cases'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {language === 'ar'
                            ? 'يمكن للمستخدمين فتح قضايا تحكيم داخل المجموعات.'
                            : 'Users can open arbitration cases within groups.'}
                        </p>
                      </div>
                      
                      <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-white bg-opacity-80">
                        <h4 className="font-medium text-sm text-gray-700 mb-2">
                          {language === 'ar' ? 'حالة القضية والأحكام' : 'Case Status & Judgments'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {language === 'ar'
                            ? 'يتاح للمستخدم متابعة حالة قضايا التحكيم وإصدار الأحكام.'
                            : 'The user can follow the status of arbitration cases and decisions.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Backend Tab */}
          <TabsContent value="backend">
            <Card>
              <CardHeader>
                <CardTitle className={`text-xl ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  {language === 'ar' ? 'هيكل الخلفية' : 'Backend Structure'}
                </CardTitle>
              </CardHeader>
              <CardContent className={language === 'ar' ? 'text-right' : 'text-left'}>
                <div className="space-y-6">
                  <div className="relative overflow-hidden rounded-xl border bg-background p-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-gray-200" />
                    <div className="relative z-10">
                      <h3 className="text-lg font-semibold mb-4">
                        {language === 'ar' ? 'التقنيات المستخدمة' : 'Technologies Used'}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="rounded-lg border bg-card text-card-foreground shadow p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <ServerIcon className="h-5 w-5 text-blue-600" />
                            <h4 className="font-semibold">Frappe.io</h4>
                          </div>
                          <p className="text-sm">
                            {language === 'ar'
                              ? 'لإدارة العمليات التجارية مثل التعامل مع المجموعات، العملاء، والمعاملات المالية.'
                              : 'For managing business processes like groups, clients, and financial transactions.'}
                          </p>
                        </div>
                        
                        <div className="rounded-lg border bg-card text-card-foreground shadow p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <ServerIcon className="h-5 w-5 text-green-600" />
                            <h4 className="font-semibold">KeystoneJS</h4>
                          </div>
                          <p className="text-sm">
                            {language === 'ar'
                              ? 'إدارة البيانات المرتبطة بالمجموعات، الفواتير، المدفوعات، والمطالبات.'
                              : 'Managing data related to groups, invoices, payments, and claims.'}
                          </p>
                        </div>
                        
                        <div className="rounded-lg border bg-card text-card-foreground shadow p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Database className="h-5 w-5 text-indigo-600" />
                            <h4 className="font-semibold">MongoDB</h4>
                          </div>
                          <p className="text-sm">
                            {language === 'ar'
                              ? 'لتخزين البيانات المرتبطة بالمجموعات، الفواتير، المدفوعات، وحالة التوثيق.'
                              : 'For storing data related to groups, invoices, payments, and verification status.'}
                          </p>
                        </div>
                        
                        <div className="rounded-lg border bg-card text-card-foreground shadow p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <ServerIcon className="h-5 w-5 text-yellow-600" />
                            <h4 className="font-semibold">Node.js</h4>
                          </div>
                          <p className="text-sm">
                            {language === 'ar'
                              ? 'لتنفيذ العمليات على الخوادم، والتفاعل مع البنوك والأنظمة الخارجية.'
                              : 'For executing server operations and interacting with banks and external systems.'}
                          </p>
                        </div>
                        
                        <div className="rounded-lg border bg-card text-card-foreground shadow p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Layers className="h-5 w-5 text-purple-600" />
                            <h4 className="font-semibold">GraphQL</h4>
                          </div>
                          <p className="text-sm">
                            {language === 'ar'
                              ? 'لتوفير API مرن للتفاعل مع البيانات في واجهة المستخدم الأمامية.'
                              : 'To provide a flexible API for interacting with data in the frontend.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative overflow-hidden rounded-xl border bg-background p-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50" />
                    <div className="relative z-10">
                      <h3 className="text-lg font-semibold mb-4">
                        {language === 'ar' ? 'المهام الأساسية للخلفية' : 'Core Backend Tasks'}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="rounded-lg border bg-white p-4">
                          <h4 className="font-medium text-sm text-gray-700 mb-2">
                            {language === 'ar' ? 'إدارة المستخدمين' : 'User Management'}
                          </h4>
                          <ul className="text-sm space-y-1 list-disc list-inside text-gray-600">
                            <li>{language === 'ar' ? 'التسجيل وكلمة المرور' : 'Registration and password'}</li>
                            <li>{language === 'ar' ? 'إدارة التوثيق KYC/KYCB' : 'KYC/KYCB verification management'}</li>
                          </ul>
                        </div>
                        
                        <div className="rounded-lg border bg-white p-4">
                          <h4 className="font-medium text-sm text-gray-700 mb-2">
                            {language === 'ar' ? 'إدارة الفواتير والمطالبات' : 'Invoice & Claims Management'}
                          </h4>
                          <ul className="text-sm space-y-1 list-disc list-inside text-gray-600">
                            <li>{language === 'ar' ? 'إنشاء الفواتير' : 'Creating invoices'}</li>
                            <li>{language === 'ar' ? 'تتبع المدفوعات' : 'Tracking payments'}</li>
                            <li>{language === 'ar' ? 'إنشاء المطالبات' : 'Creating claims'}</li>
                          </ul>
                        </div>
                        
                        <div className="rounded-lg border bg-white p-4">
                          <h4 className="font-medium text-sm text-gray-700 mb-2">
                            {language === 'ar' ? 'إدارة المجموعات' : 'Group Management'}
                          </h4>
                          <ul className="text-sm space-y-1 list-disc list-inside text-gray-600">
                            <li>{language === 'ar' ? 'إدارة الأدوار داخل المجموعات' : 'Role management within groups'}</li>
                            <li>{language === 'ar' ? 'إدارة القضايا وتعيين المحكمين' : 'Case management and arbitrator assignment'}</li>
                          </ul>
                        </div>
                        
                        <div className="rounded-lg border bg-white p-4">
                          <h4 className="font-medium text-sm text-gray-700 mb-2">
                            {language === 'ar' ? 'إدارة التحكيم ODR' : 'ODR Arbitration Management'}
                          </h4>
                          <ul className="text-sm space-y-1 list-disc list-inside text-gray-600">
                            <li>{language === 'ar' ? 'فتح قضايا التحكيم' : 'Opening arbitration cases'}</li>
                            <li>{language === 'ar' ? 'إصدار الأحكام' : 'Issuing judgments'}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative overflow-hidden rounded-xl border bg-background p-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-teal-50" />
                    <div className="relative z-10">
                      <h3 className="text-lg font-semibold mb-4">
                        {language === 'ar' ? 'الأدوات والأنظمة المدمجة' : 'Integrated Tools & Systems'}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="rounded-lg border bg-white p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Video className="h-5 w-5 text-blue-600" />
                            <h4 className="font-medium text-sm text-gray-700">Zoom / Google Meet</h4>
                          </div>
                          <p className="text-sm text-gray-600">
                            {language === 'ar'
                              ? 'لتكامل الاجتماعات داخل المجموعات عبر فيديو.'
                              : 'For integrating meetings within groups via video.'}
                          </p>
                        </div>
                        
                        <div className="rounded-lg border bg-white p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <CreditCard className="h-5 w-5 text-green-600" />
                            <h4 className="font-medium text-sm text-gray-700">
                              {language === 'ar' ? 'بوابات الدفع' : 'Payment Gateways'}
                            </h4>
                          </div>
                          <p className="text-sm text-gray-600">
                            {language === 'ar'
                              ? 'PayPal، Stripe، Skrill: للتعامل مع المدفوعات بشكل مباشر وآمن.'
                              : 'PayPal, Stripe, Skrill: For handling payments directly and securely.'}
                          </p>
                        </div>
                        
                        <div className="rounded-lg border bg-white p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Database className="h-5 w-5 text-purple-600" />
                            <h4 className="font-medium text-sm text-gray-700">IPFS</h4>
                          </div>
                          <p className="text-sm text-gray-600">
                            {language === 'ar'
                              ? 'التخزين اللامركزي للمستندات والبيانات الكبيرة.'
                              : 'Decentralized storage for documents and large data.'}
                          </p>
                        </div>
                        
                        <div className="rounded-lg border bg-white p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <ShieldCheck className="h-5 w-5 text-red-600" />
                            <h4 className="font-medium text-sm text-gray-700">
                              {language === 'ar' ? 'الأمان والخصوصية' : 'Security & Privacy'}
                            </h4>
                          </div>
                          <p className="text-sm text-gray-600">
                            {language === 'ar'
                              ? 'SSL/TLS لتأمين البيانات والتوثيق الثنائي (2FA).'
                              : 'SSL/TLS for data security and two-factor authentication (2FA).'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Workflow Tab */}
          <TabsContent value="workflow">
            <Card>
              <CardHeader>
                <CardTitle className={`text-xl ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  {language === 'ar' ? 'تدفق العمل' : 'Work Flow'}
                </CardTitle>
              </CardHeader>
              <CardContent className={language === 'ar' ? 'text-right' : 'text-left'}>
                <div className="space-y-6">
                  <div className="relative overflow-hidden rounded-xl border">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50" />
                    <div className="relative z-10 p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Workflow className="h-5 w-5 mr-2 text-blue-600" />
                        {language === 'ar' ? 'تدفق عمل العميل' : 'Client Workflow'}
                      </h3>
                      
                      <div className="relative">
                        {/* Flow line */}
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200" />
                        
                        <div className="relative pl-14 pb-8">
                          <div className="absolute left-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">1</div>
                          <div className="rounded-lg border bg-white p-4">
                            <h4 className="font-medium text-gray-900 mb-2">
                              {language === 'ar' ? 'التسجيل والدخول' : 'Registration & Login'}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {language === 'ar'
                                ? 'العميل يدخل الموقع باستخدام OTP ثم يتم نقله إلى منطقة العميل لإتمام عملية التوثيق.'
                                : 'Client enters the site using OTP then is directed to the client area to complete verification.'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="relative pl-14 pb-8">
                          <div className="absolute left-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">2</div>
                          <div className="rounded-lg border bg-white p-4">
                            <h4 className="font-medium text-gray-900 mb-2">
                              {language === 'ar' ? 'إتمام عملية KYC/KYCB' : 'Complete KYC/KYCB Process'}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {language === 'ar'
                                ? 'تحميل المستندات المطلوبة مثل الهوية الشخصية والتأكد من صحة المستندات.'
                                : 'Upload required documents like personal ID and verify document authenticity.'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="relative pl-14 pb-8">
                          <div className="absolute left-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">3</div>
                          <div className="rounded-lg border bg-white p-4">
                            <h4 className="font-medium text-gray-900 mb-2">
                              {language === 'ar' ? 'انضمام إلى المجموعات' : 'Join Groups'}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {language === 'ar'
                                ? 'مراجعة المجموعات المتاحة والانضمام بعد الاطلاع على الشروط ودفع الرسوم.'
                                : 'Review available groups and join after reviewing terms and paying fees.'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="relative pl-14 pb-8">
                          <div className="absolute left-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">4</div>
                          <div className="rounded-lg border bg-white p-4">
                            <h4 className="font-medium text-gray-900 mb-2">
                              {language === 'ar' ? 'إدارة الفواتير والمطالبات' : 'Manage Invoices & Claims'}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {language === 'ar'
                                ? 'استلام إشعارات بالفواتير والمطالبات ودفعها من خلال واجهة المدفوعات.'
                                : 'Receive notifications about invoices and claims and pay them through the payments interface.'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="relative pl-14">
                          <div className="absolute left-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">5</div>
                          <div className="rounded-lg border bg-white p-4">
                            <h4 className="font-medium text-gray-900 mb-2">
                              {language === 'ar' ? 'التحكيم ODR' : 'ODR Arbitration'}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {language === 'ar'
                                ? 'في حالة وجود نزاع، يمكن فتح قضية تحكيم في المجموعة واتخاذ قرارات نهائية.'
                                : 'In case of dispute, an arbitration case can be opened in the group for final decisions.'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative overflow-hidden rounded-xl border">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-purple-50" />
                    <div className="relative z-10 p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Workflow className="h-5 w-5 mr-2 text-purple-600" />
                        {language === 'ar' ? 'تدفق عمل الإدارة' : 'Admin Workflow'}
                      </h3>
                      
                      <div className="relative">
                        {/* Flow line */}
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-purple-200" />
                        
                        <div className="relative pl-14 pb-8">
                          <div className="absolute left-0 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center">1</div>
                          <div className="rounded-lg border bg-white p-4">
                            <h4 className="font-medium text-gray-900 mb-2">
                              {language === 'ar' ? 'إدارة المجموعات' : 'Group Management'}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {language === 'ar'
                                ? 'إضافة/حذف المجموعات وتخصيص الأدوار (مشرفين، أعضاء، محكمين) داخل المجموعات.'
                                : 'Add/delete groups and assign roles (admins, members, arbitrators) within groups.'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="relative pl-14 pb-8">
                          <div className="absolute left-0 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center">2</div>
                          <div className="rounded-lg border bg-white p-4">
                            <h4 className="font-medium text-gray-900 mb-2">
                              {language === 'ar' ? 'إدارة الفواتير' : 'Invoice Management'}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {language === 'ar'
                                ? 'إنشاء فواتير للمجموعات والمستخدمين ومراقبة حالة المدفوعات وإدارة المطالبات.'
                                : 'Create invoices for groups and users, monitor payment status and manage claims.'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="relative pl-14">
                          <div className="absolute left-0 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center">3</div>
                          <div className="rounded-lg border bg-white p-4">
                            <h4 className="font-medium text-gray-900 mb-2">
                              {language === 'ar' ? 'إدارة التحكيم' : 'Arbitration Management'}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {language === 'ar'
                                ? 'فتح وإدارة قضايا التحكيم ومراجعة نتائج التحكيم واتخاذ القرارات النهائية.'
                                : 'Open and manage arbitration cases, review arbitration results and make final decisions.'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ProjectWorkflow;
