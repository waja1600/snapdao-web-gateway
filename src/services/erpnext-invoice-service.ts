
export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
  taxRate: number;
  taxAmount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  supplierId: string;
  supplierName: string;
  invoiceDate: Date;
  dueDate: Date;
  items: InvoiceItem[];
  subTotal: number;
  totalTax: number;
  totalAmount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  currency: string;
  paymentTerms: string;
  notes?: string;
  groupId?: string;
  projectId?: string;
}

export interface PaymentPlan {
  id: string;
  invoiceId: string;
  planName: string;
  installments: PaymentInstallment[];
  totalAmount: number;
  status: 'active' | 'completed' | 'defaulted';
}

export interface PaymentInstallment {
  id: string;
  dueDate: Date;
  amount: number;
  status: 'pending' | 'paid' | 'overdue';
  paidDate?: Date;
  paidAmount?: number;
}

export class ERPNextInvoiceService {
  private invoices: Invoice[] = [];
  private paymentPlans: PaymentPlan[] = [];
  private nextInvoiceNumber = 1000;

  generateInvoice(params: {
    customerId: string;
    customerName: string;
    customerEmail: string;
    supplierId: string;
    supplierName: string;
    items: Omit<InvoiceItem, 'id' | 'amount' | 'taxAmount'>[];
    currency?: string;
    paymentTerms?: string;
    notes?: string;
    groupId?: string;
    projectId?: string;
  }): Invoice {
    const invoiceItems: InvoiceItem[] = params.items.map(item => ({
      ...item,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      amount: item.quantity * item.rate,
      taxAmount: (item.quantity * item.rate * item.taxRate) / 100
    }));

    const subTotal = invoiceItems.reduce((sum, item) => sum + item.amount, 0);
    const totalTax = invoiceItems.reduce((sum, item) => sum + item.taxAmount, 0);
    const totalAmount = subTotal + totalTax;

    const invoice: Invoice = {
      id: Date.now().toString(),
      invoiceNumber: `INV-${this.nextInvoiceNumber++}`,
      customerId: params.customerId,
      customerName: params.customerName,
      customerEmail: params.customerEmail,
      supplierId: params.supplierId,
      supplierName: params.supplierName,
      invoiceDate: new Date(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      items: invoiceItems,
      subTotal,
      totalTax,
      totalAmount,
      status: 'draft',
      currency: params.currency || 'USD',
      paymentTerms: params.paymentTerms || 'Net 30',
      notes: params.notes,
      groupId: params.groupId,
      projectId: params.projectId
    };

    this.invoices.push(invoice);
    return invoice;
  }

  createPaymentPlan(invoiceId: string, planType: 'monthly' | 'quarterly' | 'custom', installmentCount?: number): PaymentPlan {
    const invoice = this.invoices.find(inv => inv.id === invoiceId);
    if (!invoice) {
      throw new Error('Invoice not found');
    }

    const installments: PaymentInstallment[] = [];
    const installmentAmount = invoice.totalAmount / (installmentCount || this.getDefaultInstallmentCount(planType));

    for (let i = 0; i < (installmentCount || this.getDefaultInstallmentCount(planType)); i++) {
      const dueDate = new Date();
      dueDate.setMonth(dueDate.getMonth() + (i + 1) * this.getMonthIncrement(planType));

      installments.push({
        id: `${invoiceId}-${i + 1}`,
        dueDate,
        amount: installmentAmount,
        status: 'pending'
      });
    }

    const paymentPlan: PaymentPlan = {
      id: Date.now().toString(),
      invoiceId,
      planName: `${planType.charAt(0).toUpperCase() + planType.slice(1)} Payment Plan`,
      installments,
      totalAmount: invoice.totalAmount,
      status: 'active'
    };

    this.paymentPlans.push(paymentPlan);
    return paymentPlan;
  }

  private getDefaultInstallmentCount(planType: string): number {
    switch (planType) {
      case 'monthly': return 6;
      case 'quarterly': return 4;
      default: return 3;
    }
  }

  private getMonthIncrement(planType: string): number {
    switch (planType) {
      case 'monthly': return 1;
      case 'quarterly': return 3;
      default: return 2;
    }
  }

  recordPayment(installmentId: string, amount: number): void {
    for (const plan of this.paymentPlans) {
      const installment = plan.installments.find(inst => inst.id === installmentId);
      if (installment) {
        installment.status = 'paid';
        installment.paidDate = new Date();
        installment.paidAmount = amount;

        // Check if all installments are paid
        if (plan.installments.every(inst => inst.status === 'paid')) {
          plan.status = 'completed';
        }
        break;
      }
    }
  }

  getInvoicesByCustomer(customerId: string): Invoice[] {
    return this.invoices.filter(invoice => invoice.customerId === customerId);
  }

  getInvoicesBySupplier(supplierId: string): Invoice[] {
    return this.invoices.filter(invoice => invoice.supplierId === supplierId);
  }

  getPaymentPlan(invoiceId: string): PaymentPlan | undefined {
    return this.paymentPlans.find(plan => plan.invoiceId === invoiceId);
  }

  updateInvoiceStatus(invoiceId: string, status: Invoice['status']): void {
    const invoice = this.invoices.find(inv => inv.id === invoiceId);
    if (invoice) {
      invoice.status = status;
    }
  }

  getOverdueInvoices(): Invoice[] {
    const now = new Date();
    return this.invoices.filter(invoice => 
      invoice.status !== 'paid' && 
      invoice.status !== 'cancelled' && 
      invoice.dueDate < now
    );
  }

  getAllInvoices(): Invoice[] {
    return this.invoices;
  }
}

export const invoiceService = new ERPNextInvoiceService();
