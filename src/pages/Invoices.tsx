
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { FileText, Download, Eye, CreditCard, Map, Calendar, DollarSign } from 'lucide-react';
import { InvoiceSitemap } from '@/components/invoices/InvoiceSitemap';

/**
 * Invoices Page - Enhanced Invoice Management System
 * 
 * Features:
 * - Invoice listing and management
 * - Payment tracking and status
 * - Sitemap integration for navigation
 * - Multi-language support
 * 
 * Architecture:
 * - Uses modular tab-based layout for scalability
 * - Separates concerns between invoice data and UI components
 * - Implements responsive design patterns
 */

interface Invoice {
  id: string;
  number: string;
  clientName: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'overdue' | 'draft';
  dueDate: string;
  createdAt: string;
  description: string;
}

const Invoices: React.FC = () => {
  const { language } = useLanguage();
  
  // Invoice state management - centralized for maintainability
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('invoices');

  // Mock data - in production, this would come from Supabase
  useEffect(() => {
    // Simulate API call with timeout for realistic loading experience
    const loadInvoices = async () => {
      setLoading(true);
      
      // Mock invoice data - represents typical invoice structure
      const mockInvoices: Invoice[] = [
        {
          id: '1',
          number: 'INV-2024-001',
          clientName: language === 'ar' ? 'شركة التقنيات المتقدمة' : 'Advanced Tech Solutions',
          amount: 15000,
          currency: 'USD',
          status: 'paid',
          dueDate: '2024-01-15',
          createdAt: '2024-01-01',
          description: language === 'ar' ? 'خدمات استشارية تقنية' : 'Technical consulting services'
        },
        {
          id: '2',
          number: 'INV-2024-002',
          clientName: language === 'ar' ? 'مجموعة التسويق الرقمي' : 'Digital Marketing Group',
          amount: 8500,
          currency: 'USD',
          status: 'pending',
          dueDate: '2024-02-01',
          createdAt: '2024-01-15',
          description: language === 'ar' ? 'حملة تسويقية متكاملة' : 'Integrated marketing campaign'
        },
        {
          id: '3',
          number: 'INV-2024-003',
          clientName: language === 'ar' ? 'شركة الموردين المتحدة' : 'United Suppliers Co.',
          amount: 22000,
          currency: 'USD',
          status: 'overdue',
          dueDate: '2024-01-20',
          createdAt: '2024-01-05',
          description: language === 'ar' ? 'توريد مواد خام' : 'Raw materials supply'
        }
      ];

      // Simulate network delay
      setTimeout(() => {
        setInvoices(mockInvoices);
        setLoading(false);
      }, 1000);
    };

    loadInvoices();
  }, [language]);

  // Status badge styling - maintains consistency across the app
  const getStatusBadge = (status: Invoice['status']) => {
    const statusConfig = {
      paid: { 
        variant: 'default' as const, 
        color: 'bg-green-100 text-green-800',
        label: language === 'ar' ? 'مدفوع' : 'Paid'
      },
      pending: { 
        variant: 'secondary' as const, 
        color: 'bg-yellow-100 text-yellow-800',
        label: language === 'ar' ? 'معلق' : 'Pending'
      },
      overdue: { 
        variant: 'destructive' as const, 
        color: 'bg-red-100 text-red-800',
        label: language === 'ar' ? 'متأخر' : 'Overdue'
      },
      draft: { 
        variant: 'outline' as const, 
        color: 'bg-gray-100 text-gray-800',
        label: language === 'ar' ? 'مسودة' : 'Draft'
      }
    };

    const config = statusConfig[status];
    return (
      <Badge variant={config.variant} className={config.color}>
        {config.label}
      </Badge>
    );
  };

  // Calculate summary statistics for dashboard overview
  const getInvoiceSummary = () => {
    return {
      total: invoices.reduce((sum, inv) => sum + inv.amount, 0),
      paid: invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0),
      pending: invoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0),
      overdue: invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0)
    };
  };

  const summary = getInvoiceSummary();

  return (
    <Layout>
      <div className="space-y-6 p-6">
        {/* Page Header - Provides context and primary actions */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {language === 'ar' ? 'إدارة الفواتير' : 'Invoice Management'}
            </h1>
            <p className="text-gray-600 mt-2">
              {language === 'ar' 
                ? 'إدارة وتتبع جميع فواتيرك ومدفوعاتك' 
                : 'Manage and track all your invoices and payments'
              }
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <FileText className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'فاتورة جديدة' : 'New Invoice'}
          </Button>
        </div>

        {/* Summary Cards - Financial overview at a glance */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'ar' ? 'إجمالي الفواتير' : 'Total Invoices'}
                  </p>
                  <p className="text-2xl font-bold">${summary.total.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'ar' ? 'مدفوع' : 'Paid'}
                  </p>
                  <p className="text-2xl font-bold text-green-600">${summary.paid.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'ar' ? 'معلق' : 'Pending'}
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">${summary.pending.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'ar' ? 'متأخر' : 'Overdue'}
                  </p>
                  <p className="text-2xl font-bold text-red-600">${summary.overdue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area - Tabbed interface for organized functionality */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="invoices" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {language === 'ar' ? 'الفواتير' : 'Invoices'}
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              {language === 'ar' ? 'المدفوعات' : 'Payments'}
            </TabsTrigger>
            <TabsTrigger value="sitemap" className="flex items-center gap-2">
              <Map className="h-4 w-4" />
              {language === 'ar' ? 'خريطة الموقع' : 'Sitemap'}
            </TabsTrigger>
          </TabsList>

          {/* Invoices Tab - Main invoice listing and management */}
          <TabsContent value="invoices" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'ar' ? 'قائمة الفواتير' : 'Invoice List'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  // Loading state - provides user feedback during data fetch
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-16 bg-gray-200 rounded-lg"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Invoice list - displays all invoices with actions
                  <div className="space-y-4">
                    {invoices.map((invoice) => (
                      <div key={invoice.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-2">
                              <h3 className="font-semibold text-lg">{invoice.number}</h3>
                              {getStatusBadge(invoice.status)}
                            </div>
                            <p className="text-gray-600 mb-1">{invoice.clientName}</p>
                            <p className="text-sm text-gray-500">{invoice.description}</p>
                            <div className="flex gap-4 mt-2 text-sm text-gray-500">
                              <span>
                                {language === 'ar' ? 'تاريخ الاستحقاق:' : 'Due:'} {invoice.dueDate}
                              </span>
                              <span>
                                {language === 'ar' ? 'تاريخ الإنشاء:' : 'Created:'} {invoice.createdAt}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-blue-600">
                              ${invoice.amount.toLocaleString()} {invoice.currency}
                            </p>
                            <div className="flex gap-2 mt-4">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                {language === 'ar' ? 'عرض' : 'View'}
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-1" />
                                {language === 'ar' ? 'تحميل' : 'Download'}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab - Payment tracking and history */}
          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'ar' ? 'تتبع المدفوعات' : 'Payment Tracking'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {language === 'ar' ? 'تتبع المدفوعات' : 'Payment Tracking'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'ar' 
                      ? 'سيتم إضافة نظام تتبع المدفوعات قريباً' 
                      : 'Payment tracking system will be added soon'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sitemap Tab - Navigation and site structure */}
          <TabsContent value="sitemap" className="space-y-4">
            <InvoiceSitemap />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Invoices;
