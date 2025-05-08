
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatter } from "@/utils/helpers";
import { Receipt } from "lucide-react";

// نموذج لبيانات التكاليف (سيتم استبداله بالبيانات الفعلية من الـ backend)
const mockExpenses = [
  { 
    id: 1, 
    date: '2025-05-01', 
    description: 'Initial consultation fee', 
    amount: 150, 
    status: 'paid'
  },
  { 
    id: 2, 
    date: '2025-05-04', 
    description: 'Documentation processing', 
    amount: 75, 
    status: 'paid'
  },
  { 
    id: 3, 
    date: '2025-05-08', 
    description: 'Administrative fees', 
    amount: 200, 
    status: 'pending'
  }
];

export function ExpensesTable() {
  const { t, language } = useTranslation();
  
  // حساب إجمالي التكاليف
  const totalExpenses = mockExpenses.reduce((total, expense) => total + expense.amount, 0);
  
  const getStatusClass = (status: string) => {
    return status === 'paid' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">
          {t('clientExpenses')}
        </CardTitle>
        <Receipt className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('date')}</TableHead>
              <TableHead>{t('description')}</TableHead>
              <TableHead className="text-right">{t('amount')}</TableHead>
              <TableHead className="text-right">{t('status')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockExpenses.length > 0 ? (
              mockExpenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell className="text-right">
                    {formatter.format(expense.amount)}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(expense.status)}`}>
                      {t(expense.status)}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  {t('noExpenses')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
        <div className="mt-4 flex justify-between items-center pt-4 border-t">
          <span className="font-medium">{t('totalExpenses')}</span>
          <span className="text-xl font-bold">{formatter.format(totalExpenses)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
