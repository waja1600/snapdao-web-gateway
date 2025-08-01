
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface WalletTransaction {
  id?: string;
  user_id: string;
  type: 'deposit' | 'withdrawal' | 'transfer_in' | 'transfer_out' | 'investment' | 'dividend' | 'fee' | 'bonus';
  amount: number;
  balance_after: number;
  description?: string;
  reference_id?: string;
  reference_type?: string;
  status?: 'pending' | 'completed' | 'failed' | 'cancelled';
  created_at?: string;
}

export interface InvestmentGroup {
  id?: string;
  name: string;
  description?: string;
  target_amount: number;
  current_amount?: number;
  min_investment: number;
  max_investors: number;
  current_investors?: number;
  risk_level: 'low' | 'medium' | 'high';
  expected_return?: string;
  duration?: string;
  category?: string;
  status?: 'forming' | 'active' | 'completed' | 'cancelled';
  creator_id: string;
}

export interface InvestmentParticipation {
  id?: string;
  investment_group_id: string;
  user_id: string;
  amount: number;
  share_percentage?: number;
  status?: 'pending' | 'confirmed' | 'withdrawn';
}

export class WalletService {
  // Get user's wallet balance
  async getWalletBalance(userId: string): Promise<number> {
    try {
      const { data, error } = await supabase
        .rpc('get_wallet_balance', { p_user_id: userId });

      if (error) throw error;
      return data || 0;
    } catch (error) {
      console.error('Error getting wallet balance:', error);
      return 0;
    }
  }

  // Get user's transaction history
  async getTransactionHistory(userId: string, limit: number = 50): Promise<WalletTransaction[]> {
    try {
      const { data, error } = await supabase
        .from('wallet_transactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting transaction history:', error);
      return [];
    }
  }

  // Create a wallet transaction
  async createTransaction(transaction: WalletTransaction): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('wallet_transactions')
        .insert([transaction]);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error creating transaction:', error);
      return false;
    }
  }

  // Deposit money to wallet
  async deposit(userId: string, amount: number, description?: string): Promise<boolean> {
    try {
      const currentBalance = await this.getWalletBalance(userId);
      const newBalance = currentBalance + amount;

      const transaction: WalletTransaction = {
        user_id: userId,
        type: 'deposit',
        amount: amount,
        balance_after: newBalance,
        description: description || 'Wallet deposit',
        status: 'completed'
      };

      return await this.createTransaction(transaction);
    } catch (error) {
      console.error('Error depositing money:', error);
      return false;
    }
  }

  // Withdraw money from wallet
  async withdraw(userId: string, amount: number, description?: string): Promise<boolean> {
    try {
      const currentBalance = await this.getWalletBalance(userId);
      
      if (currentBalance < amount) {
        toast.error('Insufficient balance');
        return false;
      }

      const newBalance = currentBalance - amount;

      const transaction: WalletTransaction = {
        user_id: userId,
        type: 'withdrawal',
        amount: -amount,
        balance_after: newBalance,
        description: description || 'Wallet withdrawal',
        status: 'completed'
      };

      return await this.createTransaction(transaction);
    } catch (error) {
      console.error('Error withdrawing money:', error);
      return false;
    }
  }

  // Transfer money between users
  async transfer(fromUserId: string, toUserId: string, amount: number, description?: string): Promise<boolean> {
    try {
      const fromBalance = await this.getWalletBalance(fromUserId);
      
      if (fromBalance < amount) {
        toast.error('Insufficient balance');
        return false;
      }

      const toBalance = await this.getWalletBalance(toUserId);

      // Create outgoing transaction
      const outgoingTransaction: WalletTransaction = {
        user_id: fromUserId,
        type: 'transfer_out',
        amount: -amount,
        balance_after: fromBalance - amount,
        description: description || 'Transfer sent',
        status: 'completed'
      };

      // Create incoming transaction
      const incomingTransaction: WalletTransaction = {
        user_id: toUserId,
        type: 'transfer_in',
        amount: amount,
        balance_after: toBalance + amount,
        description: description || 'Transfer received',
        status: 'completed'
      };

      const outgoingResult = await this.createTransaction(outgoingTransaction);
      const incomingResult = await this.createTransaction(incomingTransaction);

      return outgoingResult && incomingResult;
    } catch (error) {
      console.error('Error transferring money:', error);
      return false;
    }
  }
}

export class InvestmentService {
  // Get all investment groups
  async getInvestmentGroups(): Promise<InvestmentGroup[]> {
    try {
      const { data, error } = await supabase
        .from('investment_groups')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting investment groups:', error);
      return [];
    }
  }

  // Get investment group by ID
  async getInvestmentGroup(groupId: string): Promise<InvestmentGroup | null> {
    try {
      const { data, error } = await supabase
        .from('investment_groups')
        .select('*')
        .eq('id', groupId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting investment group:', error);
      return null;
    }
  }

  // Create investment group
  async createInvestmentGroup(group: InvestmentGroup): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from('investment_groups')
        .insert([group])
        .select()
        .single();

      if (error) throw error;
      return data.id;
    } catch (error) {
      console.error('Error creating investment group:', error);
      return null;
    }
  }

  // Join investment group
  async joinInvestmentGroup(groupId: string, userId: string, amount: number): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .rpc('join_investment_group', {
          p_group_id: groupId,
          p_user_id: userId,
          p_amount: amount
        });

      if (error) throw error;
      return data || false;
    } catch (error) {
      console.error('Error joining investment group:', error);
      return false;
    }
  }

  // Get user's participations
  async getUserParticipations(userId: string): Promise<InvestmentParticipation[]> {
    try {
      const { data, error } = await supabase
        .from('investment_participations')
        .select(`
          *,
          investment_groups (*)
        `)
        .eq('user_id', userId);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting user participations:', error);
      return [];
    }
  }

  // Get group participations
  async getGroupParticipations(groupId: string): Promise<InvestmentParticipation[]> {
    try {
      const { data, error } = await supabase
        .from('investment_participations')
        .select('*')
        .eq('investment_group_id', groupId);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting group participations:', error);
      return [];
    }
  }
}

// Export service instances
export const walletService = new WalletService();
export const investmentService = new InvestmentService();
