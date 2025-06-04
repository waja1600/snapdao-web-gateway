
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Group {
  id: string;
  name: string;
  description?: string;
  type: string;
  service_gateway: string;
  business_objective?: string;
  legal_framework?: string;
  jurisdiction?: string;
  status: string;
  creator_id: string;
  created_at: string;
  updated_at: string;
}

export interface GroupMember {
  id: string;
  group_id: string;
  user_id: string;
  role: string;
  voting_weight: number;
  joined_at: string;
}

export interface Contract {
  id: string;
  group_id: string;
  title: string;
  content?: any;
  status: string;
  version: number;
  ipfs_hash?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Proposal {
  id: string;
  group_id: string;
  title: string;
  description?: string;
  type: string;
  status: string;
  voting_deadline?: string;
  created_by: string;
  created_at: string;
}

export class SupabaseService {
  // Groups
  async createGroup(groupData: Omit<Group, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from('groups')
        .insert([groupData])
        .select()
        .single();

      if (error) throw error;

      // Add creator as member
      await this.joinGroup(data.id, groupData.creator_id, 'creator');

      toast.success('تم إنشاء المجموعة بنجاح');
      return { data, error: null };
    } catch (error) {
      console.error('Error creating group:', error);
      toast.error('فشل في إنشاء المجموعة');
      return { data: null, error };
    }
  }

  async getUserGroups(userId: string) {
    try {
      const { data, error } = await supabase
        .from('group_members')
        .select(`
          *,
          groups:group_id (*)
        `)
        .eq('user_id', userId);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching user groups:', error);
      return { data: null, error };
    }
  }

  async joinGroup(groupId: string, userId: string, role: string = 'member') {
    try {
      const { data, error } = await supabase
        .from('group_members')
        .insert([{
          group_id: groupId,
          user_id: userId,
          role,
          voting_weight: role === 'creator' ? 2.0 : 1.0
        }])
        .select()
        .single();

      if (error) throw error;
      toast.success('تم الانضمام للمجموعة بنجاح');
      return { data, error: null };
    } catch (error) {
      console.error('Error joining group:', error);
      toast.error('فشل في الانضمام للمجموعة');
      return { data: null, error };
    }
  }

  // Contracts
  async createContract(contractData: Omit<Contract, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from('contracts')
        .insert([contractData])
        .select()
        .single();

      if (error) throw error;
      toast.success('تم إنشاء العقد بنجاح');
      return { data, error: null };
    } catch (error) {
      console.error('Error creating contract:', error);
      toast.error('فشل في إنشاء العقد');
      return { data: null, error };
    }
  }

  async getGroupContracts(groupId: string) {
    try {
      const { data, error } = await supabase
        .from('contracts')
        .select('*')
        .eq('group_id', groupId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching contracts:', error);
      return { data: null, error };
    }
  }

  // Proposals
  async createProposal(proposalData: Omit<Proposal, 'id' | 'created_at'>) {
    try {
      const { data, error } = await supabase
        .from('proposals')
        .insert([proposalData])
        .select()
        .single();

      if (error) throw error;
      toast.success('تم إنشاء المقترح بنجاح');
      return { data, error: null };
    } catch (error) {
      console.error('Error creating proposal:', error);
      toast.error('فشل في إنشاء المقترح');
      return { data: null, error };
    }
  }

  async getGroupProposals(groupId: string) {
    try {
      const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .eq('group_id', groupId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching proposals:', error);
      return { data: null, error };
    }
  }

  // Voting
  async voteOnProposal(proposalId: string, userId: string, choice: string, weight: number = 1.0, reason?: string) {
    try {
      const { data, error } = await supabase
        .from('votes')
        .insert([{
          proposal_id: proposalId,
          user_id: userId,
          choice,
          weight,
          reason
        }])
        .select()
        .single();

      if (error) throw error;
      toast.success('تم التصويت بنجاح');
      return { data, error: null };
    } catch (error) {
      console.error('Error voting:', error);
      toast.error('فشل في التصويت');
      return { data: null, error };
    }
  }

  // Suppliers
  async getSuppliers() {
    try {
      const { data, error } = await supabase
        .from('suppliers')
        .select('*')
        .eq('verified', true)
        .order('compliance_rating', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      return { data: null, error };
    }
  }

  // Freelancers
  async getFreelancers() {
    try {
      const { data, error } = await supabase
        .from('freelancers')
        .select(`
          *,
          profiles:user_id (full_name)
        `)
        .eq('verified', true)
        .eq('available', true)
        .order('assessment_score', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching freelancers:', error);
      return { data: null, error };
    }
  }

  // Profile
  async getUserProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching profile:', error);
      return { data: null, error };
    }
  }

  async updateUserProfile(userId: string, profileData: any) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...profileData,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      toast.success('تم تحديث الملف الشخصي بنجاح');
      return { data, error: null };
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('فشل في تحديث الملف الشخصي');
      return { data: null, error };
    }
  }
}

export const supabaseService = new SupabaseService();
