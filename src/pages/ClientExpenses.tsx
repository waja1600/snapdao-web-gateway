
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Layout } from "@/components/Layout";
import { ExpensesTable } from "@/components/expenses/ExpensesTable";

const ClientExpenses = () => {
  const { t } = useTranslation();
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t('expenses')}</h1>
        </div>
      
        <ExpensesTable />
      </div>
    </Layout>
  );
};

export default ClientExpenses;
