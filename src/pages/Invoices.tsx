
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { invoiceService, Invoice, PaymentPlan } from '@/services/erpnext-invoice-service';
import { Plus, FileText, DollarSign, Calendar, Download } from 'lucide-react';
import { toast } from 'sonner';

const Invoices: React.FC = () => {
  const { language } = useLanguage();
  const [invoices] = useState<Invoice[]>(invoiceService.getAllInvoices());
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap = {
      'draft': language === 'en' ? 'Draft' : 'مسودة',
      'sent': language === 'en' ? 'Sent' : 'مُرسل',
      'paid': language === 'en' ? 'Paid' : 'مدفوع',
      'overdue': language === 'en' ? 'Overdue' : 'متأخر',
      'cancelled': language === 'en' ? 'Cancelled' : 'ملغي'
    };
    return statusMap[status as keyof typeof statusMap] || status;
  };

  const handleCreatePaymentPlan = (invoiceId: string) => {
    try {
      invoiceService.createPaymentPlan(invoiceId, 'monthly', 6);
      toast.success(language === 'en' ? 'Payment plan created successfully' : 'تم إنشاء خطة الدفع بنجاح');
    } catch (error) {
      toast.error(language === 'en' ? 'Failed to create payment plan' : 'فشل في إنشاء خطة الدفع');
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            {language === 'en' ? 'Invoice Management' : 'إدارة الفواتير'}
          </h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Create Invoice' : 'إنشاء فاتورة'}
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Total Invoices' : 'إجمالي الفواتير'}
                  </p>
                  <p className="text-2xl font-bold">{invoices.length}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Paid' : 'مدفوع'}
                  </p>
                  <p className="text-2xl font-bold">
                    {invoices.filter(inv => inv.status === 'paid').length}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Pending' : 'معلق'}
                  </p>
                  <p className="text-2xl font-bold">
                    {invoices.filter(inv => inv.status === 'sent').length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Total Amount' : 'المبلغ الإجمالي'}
                  </p>
                  <p className="text-2xl font-bold">
                    ${invoices.reduce((sum, inv) => sum + inv.totalAmount, 0).toLocaleString()}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">
              {language === 'en' ? 'All Invoices' : 'جميع الفواتير'}
            </TabsTrigger>
            <TabsTrigger value="sent">
              {language === 'en' ? 'Sent' : 'مُرسل'}
            </TabsTrigger>
            <TabsTrigger value="paid">
              {language === 'en' ? 'Paid' : 'مدفوع'}
            </TabsTrigger>
            <TabsTrigger value="overdue">
              {language === 'en' ? 'Overdue' : 'متأخر'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4">
              {invoices.map((invoice) => (
                <Card key={invoice.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <h3 className="font-medium text-lg">{invoice.invoiceNumber}</h3>
                          <Badge className={getStatusColor(invoice.status)}>
                            {getStatusText(invoice.status)}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">
                              {language === 'en' ? 'Customer:' : 'العميل:'}
                            </span>
                            <p>{invoice.customerName}</p>
                          </div>
                          <div>
                            <span className="font-medium">
                              {language === 'en' ? 'Amount:' : 'المبلغ:'}
                            </span>
                            <p>{invoice.currency} {invoice.totalAmount.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="font-medium">
                              {language === 'en' ? 'Due Date:' : 'تاريخ الاستحقاق:'}
                            </span>
                            <p>{invoice.dueDate.toLocaleDateString()}</p>
                          </div>
                          <div>
                            <span className="font-medium">
                              {language === 'en' ? 'Supplier:' : 'المورد:'}
                            </span>
                            <p>{invoice.supplierName}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCreatePaymentPlan(invoice.id)}
                          disabled={invoice.status === 'paid'}
                        >
                          {language === 'en' ? 'Payment Plan' : 'خطة الدفع'}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" onClick={() => setSelectedInvoice(invoice)}>
                          {language === 'en' ? 'View' : 'عرض'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sent">
            <div className="grid gap-4">
              {invoices.filter(inv => inv.status === 'sent').map((invoice) => (
                <Card key={invoice.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{invoice.invoiceNumber}</h3>
                        <p className="text-sm text-gray-600">{invoice.customerName}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{invoice.currency} {invoice.totalAmount.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">{invoice.dueDate.toLocaleDateString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="paid">
            <div className="grid gap-4">
              {invoices.filter(inv => inv.status === 'paid').map((invoice) => (
                <Card key={invoice.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{invoice.invoiceNumber}</h3>
                        <p className="text-sm text-gray-600">{invoice.customerName}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">{invoice.currency} {invoice.totalAmount.toLocaleString()}</p>
                        <Badge className="bg-green-100 text-green-800">
                          {language === 'en' ? 'Paid' : 'مدفوع'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="overdue">
            <div className="grid gap-4">
              {invoiceService.getOverdueInvoices().map((invoice) => (
                <Card key={invoice.id} className="border-red-200 bg-red-50">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{invoice.invoiceNumber}</h3>
                        <p className="text-sm text-gray-600">{invoice.customerName}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-red-600">{invoice.currency} {invoice.totalAmount.toLocaleString()}</p>
                        <Badge className="bg-red-100 text-red-800">
                          {language === 'en' ? 'Overdue' : 'متأخر'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Invoices;
