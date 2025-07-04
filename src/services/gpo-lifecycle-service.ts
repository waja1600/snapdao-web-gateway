
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface GPOGroupPhase {
  id: string;
  name: string;
  description: string;
  requiredActions: string[];
  nextPhase?: string;
}

export interface GroupMemberWithStatus {
  user_id: string;
  status: 'pending' | 'awaiting_approval' | 'active' | 'frozen';
  role: 'member' | 'admin' | 'creator';
  points_held: number;
  joined_at: Date;
  full_name?: string;
}

export interface GroupJoinRequest {
  id: string;
  group_id: string;
  user_id: string;
  points_required: number;
  status: 'pending' | 'approved' | 'rejected';
  created_at: Date;
  user_name?: string;
}

export interface AdminVoting {
  id: string;
  group_id: string;
  phase: string;
  title: string;
  candidates: string[];
  votes: Record<string, string[]>;
  status: 'active' | 'completed';
  elected_admins: string[];
  created_at: Date;
}

export class GPOLifecycleService {
  private readonly phases: GPOGroupPhase[] = [
    {
      id: 'pending_members',
      name: 'تجميع الأعضاء',
      description: 'انتظار انضمام الحد الأدنى من الأعضاء',
      requiredActions: ['collect_minimum_members', 'elect_initial_admins']
    },
    {
      id: 'contract_negotiation',
      name: 'التفاوض على العقد',
      description: 'مراجعة وتعديل شروط العقد',
      requiredActions: ['review_contract', 'vote_on_terms'],
      nextPhase: 'supplier_selection'
    },
    {
      id: 'supplier_selection',
      name: 'اختيار الموردين',
      description: 'تقييم واختيار أفضل العروض',
      requiredActions: ['review_offers', 'vote_on_supplier'],
      nextPhase: 'execution'
    },
    {
      id: 'execution',
      name: 'التنفيذ',
      description: 'تنفيذ الصفقة والمتابعة',
      requiredActions: ['monitor_delivery', 'quality_check']
    }
  ];

  // Group Creation
  async createGroup(groupData: {
    name: string;
    description: string;
    type: string;
    points_required: number;
    min_members: number;
    max_members: number;
    created_by: string;
  }) {
    try {
      const { data: group, error } = await supabase
        .from('groups')
        .insert([{
          ...groupData,
          current_phase: 'pending_members',
          status: 'awaiting_activation',
          visibility: 'private',
          creator_id: groupData.created_by
        }])
        .select()
        .single();

      if (error) throw error;

      // Add creator as member
      await this.addMemberToGroup(group.id, groupData.created_by, 'creator', 0);

      toast.success('تم إنشاء المجموعة بنجاح');
      return { success: true, group };
    } catch (error) {
      console.error('Error creating group:', error);
      toast.error('فشل في إنشاء المجموعة');
      return { success: false, error };
    }
  }

  // Member Join Request
  async requestToJoinGroup(groupId: string, userId: string, userPoints: number) {
    try {
      // Get group details
      const { data: group, error: groupError } = await supabase
        .from('groups')
        .select('*')
        .eq('id', groupId)
        .single();

      if (groupError) throw groupError;

      const pointsRequired = group.points_required || 0;

      // Check if user has enough points
      if (userPoints < pointsRequired) {
        toast.error('ليس لديك نقاط كافية للانضمام');
        return { success: false, error: 'Insufficient points' };
      }

      // Create join request
      const { data: request, error } = await supabase
        .from('group_join_requests')
        .insert([{
          group_id: groupId,
          user_id: userId,
          points_required: pointsRequired,
          status: 'pending'
        }])
        .select()
        .single();

      if (error) throw error;

      // Hold points if group is pending
      if (group.status === 'pending_members') {
        await this.holdUserPoints(userId, pointsRequired);
      } else {
        await this.deductUserPoints(userId, pointsRequired);
        await this.addMemberToGroup(groupId, userId, 'member', pointsRequired);
      }

      // Notify admins
      await this.notifyGroupAdmins(groupId, `طلب انضمام جديد من مستخدم`);

      toast.success('تم إرسال طلب الانضمام');
      return { success: true, request };
    } catch (error) {
      console.error('Error requesting to join group:', error);
      toast.error('فشل في إرسال طلب الانضمام');
      return { success: false, error };
    }
  }

  // Admin Election
  async startAdminElection(groupId: string, phase: string) {
    try {
      // Get group members
      const { data: members, error } = await supabase
        .from('group_members')
        .select(`
          user_id,
          profiles:user_id (full_name)
        `)
        .eq('group_id', groupId)
        .eq('status', 'active');

      if (error) throw error;

      // Create voting session for admin election
      const { data: voting, error: votingError } = await supabase
        .from('admin_elections')
        .insert([{
          group_id: groupId,
          phase: phase,
          title: `🗳️ انتخاب 3 مشرفين لمرحلة ${this.getPhaseNameInArabic(phase)}`,
          candidates: members?.map(m => m.user_id) || [],
          status: 'active'
        }])
        .select()
        .single();

      if (votingError) throw votingError;

      toast.success('تم بدء انتخابات المشرفين');
      return { success: true, voting };
    } catch (error) {
      console.error('Error starting admin election:', error);
      toast.error('فشل في بدء الانتخابات');
      return { success: false, error };
    }
  }

  // Vote for Admins
  async voteForAdmins(electionId: string, userId: string, selectedAdmins: string[]) {
    if (selectedAdmins.length !== 3) {
      toast.error('يجب اختيار 3 مشرفين بالضبط');
      return { success: false, error: 'Must select exactly 3 admins' };
    }

    try {
      const { data, error } = await supabase
        .from('admin_votes')
        .insert([{
          election_id: electionId,
          voter_id: userId,
          selected_admins: selectedAdmins
        }])
        .select()
        .single();

      if (error) throw error;

      toast.success('تم تسجيل تصويتك');
      return { success: true, vote: data };
    } catch (error) {
      console.error('Error voting for admins:', error);
      toast.error('فشل في تسجيل التصويت');
      return { success: false, error };
    }
  }

  // Get Group Room Data
  async getGroupRoomData(groupId: string, userId: string) {
    try {
      // Check user's access level
      const { data: membership, error: memberError } = await supabase
        .from('group_members')
        .select('status, role')
        .eq('group_id', groupId)
        .eq('user_id', userId)
        .single();

      if (memberError && memberError.code !== 'PGRST116') {
        throw memberError;
      }

      const accessLevel = membership?.status || 'no_access';
      const userRole = membership?.role || 'none';

      // Get group details
      const { data: group, error: groupError } = await supabase
        .from('groups')
        .select('*')
        .eq('id', groupId)
        .single();

      if (groupError) throw groupError;

      // Get members list
      const { data: members, error: membersError } = await supabase
        .from('group_members')
        .select(`
          *,
          profiles:user_id (full_name)
        `)
        .eq('group_id', groupId);

      if (membersError) throw membersError;

      // Get current voting sessions
      const { data: votingSessions, error: votingError } = await supabase
        .from('voting_sessions')
        .select('*')
        .eq('group_id', groupId)
        .eq('status', 'active');

      if (votingError) throw votingError;

      return {
        success: true,
        data: {
          group,
          members,
          votingSessions,
          userAccess: {
            level: accessLevel,
            role: userRole,
            canViewDetails: accessLevel === 'active',
            canParticipate: accessLevel === 'active',
            isAdmin: userRole === 'admin' || userRole === 'creator'
          }
        }
      };
    } catch (error) {
      console.error('Error getting group room data:', error);
      return { success: false, error };
    }
  }

  // Admin Panel Actions
  async approveJoinRequest(requestId: string, adminId: string) {
    try {
      const { data: request, error } = await supabase
        .from('group_join_requests')
        .update({ status: 'approved' })
        .eq('id', requestId)
        .select()
        .single();

      if (error) throw error;

      // Add user to group
      await this.addMemberToGroup(request.group_id, request.user_id, 'member', request.points_required);

      toast.success('تم قبول طلب الانضمام');
      return { success: true };
    } catch (error) {
      console.error('Error approving join request:', error);
      toast.error('فشل في قبول الطلب');
      return { success: false, error };
    }
  }

  async freezeMember(groupId: string, userId: string, adminId: string, reason: string) {
    try {
      const { data, error } = await supabase
        .from('group_members')
        .update({ status: 'frozen' })
        .eq('group_id', groupId)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;

      // Log the action
      await supabase
        .from('group_actions_log')
        .insert([{
          group_id: groupId,
          admin_id: adminId,
          target_user_id: userId,
          action: 'freeze_member',
          reason: reason
        }]);

      toast.success('تم تجميد العضو');
      return { success: true };
    } catch (error) {
      console.error('Error freezing member:', error);
      toast.error('فشل في تجميد العضو');
      return { success: false, error };
    }
  }

  // Helper Methods
  private async addMemberToGroup(groupId: string, userId: string, role: string, pointsHeld: number) {
    const { error } = await supabase
      .from('group_members')
      .insert([{
        group_id: groupId,
        user_id: userId,
        role: role,
        status: 'active',
        points_held: pointsHeld
      }]);

    if (error) throw error;
  }

  private async holdUserPoints(userId: string, amount: number) {
    // Implementation for holding points
    console.log(`Holding ${amount} points for user ${userId}`);
  }

  private async deductUserPoints(userId: string, amount: number) {
    // Implementation for deducting points  
    console.log(`Deducting ${amount} points from user ${userId}`);
  }

  private async notifyGroupAdmins(groupId: string, message: string) {
    // Implementation for notifying admins
    console.log(`Notifying admins of group ${groupId}: ${message}`);
  }

  private getPhaseNameInArabic(phase: string): string {
    const phaseMap: Record<string, string> = {
      'pending_members': 'تجميع الأعضاء',
      'contract_negotiation': 'التفاوض على العقد',
      'supplier_selection': 'اختيار الموردين',
      'execution': 'التنفيذ'
    };
    return phaseMap[phase] || phase;
  }

  getPhases(): GPOGroupPhase[] {
    return this.phases;
  }
}

export const gpoLifecycleService = new GPOLifecycleService();
