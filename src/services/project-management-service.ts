
import { toast } from "sonner";
import { generateId } from "../utils/helpers";

export interface ProjectTask {
  id: string;
  projectId: string;
  title: string;
  description: string;
  assignedTo?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'critical';
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  dependencies?: string[];
  attachments?: string[];
}

export interface ExternalFreelancer {
  id: string;
  name: string;
  email: string;
  specialization: string;
  hourlyRate?: number;
  rating?: number;
  isVerified: boolean;
  canPropose: boolean;
  canVote: boolean;
  invitedBy: string;
  invitedAt: Date;
  projects: string[];
}

export interface ProjectProposal {
  id: string;
  projectId: string;
  proposedBy: string;
  title: string;
  description: string;
  estimatedCost?: number;
  estimatedDuration?: number;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  createdAt: Date;
  votes: { userId: string; vote: 'approve' | 'reject'; reason?: string }[];
}

export class ProjectManagementService {
  private tasks: ProjectTask[] = [];
  private freelancers: ExternalFreelancer[] = [];
  private proposals: ProjectProposal[] = [];

  // Task Management
  async createTask(taskData: Omit<ProjectTask, 'id' | 'createdAt' | 'updatedAt'>): Promise<boolean> {
    try {
      const newTask: ProjectTask = {
        ...taskData,
        id: generateId(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      this.tasks.push(newTask);
      toast.success('تم إنشاء المهمة بنجاح');
      return true;
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('فشل في إنشاء المهمة');
      return false;
    }
  }

  async updateTaskStatus(taskId: string, status: ProjectTask['status']): Promise<boolean> {
    try {
      const taskIndex = this.tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = {
          ...this.tasks[taskIndex],
          status,
          updatedAt: new Date()
        };
        toast.success('تم تحديث حالة المهمة');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('فشل في تحديث المهمة');
      return false;
    }
  }

  getProjectTasks(projectId: string): ProjectTask[] {
    return this.tasks.filter(task => task.projectId === projectId);
  }

  // Freelancer Management
  async inviteFreelancer(freelancerData: Omit<ExternalFreelancer, 'id' | 'invitedAt'>): Promise<boolean> {
    try {
      const newFreelancer: ExternalFreelancer = {
        ...freelancerData,
        id: generateId(),
        invitedAt: new Date(),
        canVote: false, // External freelancers cannot vote
        canPropose: true // But can propose
      };
      
      this.freelancers.push(newFreelancer);
      toast.success('تم دعوة المستقل بنجاح');
      return true;
    } catch (error) {
      console.error('Error inviting freelancer:', error);
      toast.error('فشل في دعوة المستقل');
      return false;
    }
  }

  getProjectFreelancers(projectId: string): ExternalFreelancer[] {
    return this.freelancers.filter(freelancer => 
      freelancer.projects.includes(projectId)
    );
  }

  // Proposal Management
  async createProposal(proposalData: Omit<ProjectProposal, 'id' | 'createdAt' | 'votes'>): Promise<boolean> {
    try {
      const newProposal: ProjectProposal = {
        ...proposalData,
        id: generateId(),
        createdAt: new Date(),
        votes: []
      };
      
      this.proposals.push(newProposal);
      toast.success('تم تقديم الاقتراح بنجاح');
      return true;
    } catch (error) {
      console.error('Error creating proposal:', error);
      toast.error('فشل في تقديم الاقتراح');
      return false;
    }
  }

  async voteOnProposal(proposalId: string, userId: string, vote: 'approve' | 'reject', reason?: string): Promise<boolean> {
    try {
      const proposalIndex = this.proposals.findIndex(p => p.id === proposalId);
      if (proposalIndex !== -1) {
        const existingVoteIndex = this.proposals[proposalIndex].votes.findIndex(v => v.userId === userId);
        
        if (existingVoteIndex !== -1) {
          this.proposals[proposalIndex].votes[existingVoteIndex] = { userId, vote, reason };
        } else {
          this.proposals[proposalIndex].votes.push({ userId, vote, reason });
        }
        
        toast.success('تم تسجيل التصويت');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error voting on proposal:', error);
      toast.error('فشل في التصويت');
      return false;
    }
  }

  getProjectProposals(projectId: string): ProjectProposal[] {
    return this.proposals.filter(proposal => proposal.projectId === projectId);
  }

  getAllTasks(): ProjectTask[] {
    return this.tasks;
  }

  getAllFreelancers(): ExternalFreelancer[] {
    return this.freelancers;
  }

  getAllProposals(): ProjectProposal[] {
    return this.proposals;
  }
}

export const projectManagementService = new ProjectManagementService();
