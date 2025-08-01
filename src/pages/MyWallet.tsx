
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Wallet, 
  TrendingUp, 
  ArrowDownLeft, 
  ArrowUpRight, 
  DollarSign,
  Gift,
  PieChart,
  CreditCard,
  Banknote,
  RefreshCw
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface WalletTransaction {
  id: string;
  type: string;
  amount: number;
  balance_after: number;
  description: string;
  reference_type: string;
  status: string;
  created_at: string;
}

const MyWallet = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  useEffect(() => {
    if (user) {
      fetchWalletData();
    }
  }, [user]);

  const fetchWalletData = async () => {
    try {
      setLoading(true);

      // Get wallet balance
      const { data: balanceData, error: balanceError } = await supabase
        .rpc('get_wallet_balance', { p_user_id: user?.id });

      if (balanceError) throw balanceError;
      setBalance(balanceData || 0);

      // Get transactions
      const { data: transactionsData, error: transactionsError } = await supabase
        .from('wallet_transactions')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (transactionsError) throw transactionsError;
      setTransactions(transactionsData || []);

    } catch (error) {
      console.error('Error fetching wallet data:', error);
      toast.error(language === 'ar' ? 'فشل في تحميل بيانات المحفظة' : 'Failed to load wallet data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeposit = async () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      toast.error(language === 'ar' ? 'أدخل مبلغاً صحيحاً' : 'Enter a valid amount');
      return;
    }

    try {
      const amount = parseFloat(depositAmount);
      const newBalance = balance + amount;

      const { error } = await supabase
        .from('wallet_transactions')
        .insert([{
          user_id: user?.id,
          type: 'deposit',
          amount: amount,
          balance_after: newBalance,
          description: language === 'ar' ? 'إيداع في المحفظة' : 'Wallet deposit',
          status: 'completed'
        }]);

      if (error) throw error;

      toast.success(language === 'ar' ? 'تم الإيداع بنجاح' : 'Deposit successful');
      setDepositAmount('');
      fetchWalletData();
    } catch (error) {
      console.error('Error depositing:', error);
      toast.error(language === 'ar' ? 'فشل في الإيداع' : 'Deposit failed');
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      toast.error(language === 'ar' ? 'أدخل مبلغاً صحيحاً' : 'Enter a valid amount');
      return;
    }

    const amount = parseFloat(withdrawAmount);
    if (amount > balance) {
      toast.error(language === 'ar' ? 'الرصيد غير كافي' : 'Insufficient balance');
      return;
    }

    try {
      const newBalance = balance - amount;

      const { error } = await supabase
        .from('wallet_transactions')
        .insert([{
          user_id: user?.id,
          type: 'withdrawal',
          amount: -amount,
          balance_after: newBalance,
          description: language === 'ar' ? 'سحب من المحفظة' : 'Wallet withdrawal',
          status: 'completed'
        }]);

      if (error) throw error;

      toast.success(language === 'ar' ? 'تم السحب بنجاح' : 'Withdrawal successful');
      setWithdrawAmount('');
      fetchWalletData();
    } catch (error) {
      console.error('Error withdrawing:', error);
      toast.error(language === 'ar' ? 'فشل في السحب' : 'Withdrawal failed');
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
      case 'bonus':
      case 'dividend':
        return <ArrowDownLeft className="h-4 w-4 text-green-600" />;
      case 'withdrawal':
      case 'investment':
      case 'fee':
        return <ArrowUpRight className="h-4 w-4 text-red-600" />;
      case 'transfer_in':
        return <ArrowDownLeft className="h-4 w-4 text-blue-600" />;
      case 'transfer_out':
        return <ArrowUpRight className="h-4 w-4 text-blue-600" />;
      default:
        return <DollarSign className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'deposit':
      case 'bonus':
      case 'dividend':
      case 'transfer_in':
        return 'text-green-600';
      case 'withdrawal':
      case 'investment':
      case 'fee':
      case 'transfer_out':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTransactionTypeText = (type: string) => {
    const types = {
      deposit: language === 'ar' ? 'إيداع' : 'Deposit',
      withdrawal: language === 'ar' ? 'سحب' : 'Withdrawal',
      investment: language === 'ar' ? 'استثمار' : 'Investment',
      dividend: language === 'ar' ? 'أرباح' : 'Dividend',
      fee: language === 'ar' ? 'رسوم' : 'Fee',
      bonus: language === 'ar' ? 'مكافأة' : 'Bonus',
      transfer_in: language === 'ar' ? 'تحويل وارد' : 'Transfer In',
      transfer_out: language === 'ar' ? 'تحويل صادر' : 'Transfer Out'
    };
    return types[type as keyof typeof types] || type;
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin" />
          <span className="ml-2">{language === 'ar' ? 'جاري التحميل...' : 'Loading...'}</span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'محفظتي' : 'My Wallet'}
          </h1>
          <p className="text-lg text-gray-600">
            {language === 'ar' 
              ? 'إدارة أموالك واستثماراتك بسهولة وأمان'
              : 'Manage your money and investments easily and securely'
            }
          </p>
        </div>

        {/* Balance Card */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">
                  {language === 'ar' ? 'الرصيد الحالي' : 'Current Balance'}
                </p>
                <p className="text-4xl font-bold">${balance.toFixed(2)}</p>
                <p className="text-blue-100 text-sm mt-2">
                  {language === 'ar' ? 'متاح للاستثمار والسحب' : 'Available for investment and withdrawal'}
                </p>
              </div>
              <Wallet className="h-16 w-16 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="text-center">
                <ArrowDownLeft className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-green-600">
                  {language === 'ar' ? 'إيداع' : 'Deposit'}
                </h3>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="text-center">
                <ArrowUpRight className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <h3 className="font-semibold text-red-600">
                  {language === 'ar' ? 'سحب' : 'Withdraw'}
                </h3>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="text-center">
                <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-blue-600">
                  {language === 'ar' ? 'استثمار' : 'Invest'}
                </h3>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="text-center">
                <Gift className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-purple-600">
                  {language === 'ar' ? 'مكافآت' : 'Rewards'}
                </h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="transactions" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="transactions">
              {language === 'ar' ? 'المعاملات' : 'Transactions'}
            </TabsTrigger>
            <TabsTrigger value="deposit">
              {language === 'ar' ? 'إيداع' : 'Deposit'}
            </TabsTrigger>
            <TabsTrigger value="withdraw">
              {language === 'ar' ? 'سحب' : 'Withdraw'}
            </TabsTrigger>
            <TabsTrigger value="investments">
              {language === 'ar' ? 'الاستثمارات' : 'Investments'}
            </TabsTrigger>
          </TabsList>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  {language === 'ar' ? 'سجل المعاملات' : 'Transaction History'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">
                        {language === 'ar' ? 'لا توجد معاملات بعد' : 'No transactions yet'}
                      </p>
                    </div>
                  ) : (
                    transactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-3">
                          {getTransactionIcon(transaction.type)}
                          <div>
                            <p className="font-medium">{getTransactionTypeText(transaction.type)}</p>
                            <p className="text-sm text-gray-600">{transaction.description}</p>
                            <p className="text-xs text-gray-400">
                              {new Date(transaction.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${getTransactionColor(transaction.type)}`}>
                            {transaction.amount > 0 ? '+' : ''}${transaction.amount.toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-600">
                            {language === 'ar' ? 'الرصيد:' : 'Balance:'} ${transaction.balance_after.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Deposit Tab */}
          <TabsContent value="deposit" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowDownLeft className="h-5 w-5 text-green-600" />
                  {language === 'ar' ? 'إيداع الأموال' : 'Deposit Money'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="deposit-amount">
                    {language === 'ar' ? 'المبلغ' : 'Amount'}
                  </Label>
                  <Input
                    id="deposit-amount"
                    type="number"
                    placeholder="0.00"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                  />
                </div>
                <Button onClick={handleDeposit} className="w-full">
                  <CreditCard className="h-4 w-4 mr-2" />
                  {language === 'ar' ? 'إيداع' : 'Deposit'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Withdraw Tab */}
          <TabsContent value="withdraw" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowUpRight className="h-5 w-5 text-red-600" />
                  {language === 'ar' ? 'سحب الأموال' : 'Withdraw Money'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="withdraw-amount">
                    {language === 'ar' ? 'المبلغ' : 'Amount'}
                  </Label>
                  <Input
                    id="withdraw-amount"
                    type="number"
                    placeholder="0.00"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                  />
                </div>
                <div className="text-sm text-gray-600">
                  {language === 'ar' ? 'الرصيد المتاح:' : 'Available balance:'} ${balance.toFixed(2)}
                </div>
                <Button onClick={handleWithdraw} variant="destructive" className="w-full">
                  <Banknote className="h-4 w-4 mr-2" />
                  {language === 'ar' ? 'سحب' : 'Withdraw'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Investments Tab */}
          <TabsContent value="investments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  {language === 'ar' ? 'استثماراتي' : 'My Investments'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">
                    {language === 'ar' ? 'لا توجد استثمارات نشطة' : 'No active investments'}
                  </p>
                  <Button onClick={() => window.location.href = '/investment-groups'}>
                    {language === 'ar' ? 'استكشف فرص الاستثمار' : 'Explore Investment Opportunities'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default MyWallet;
