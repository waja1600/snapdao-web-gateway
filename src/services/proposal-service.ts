
import { Proposal, Vote } from "../models/types";
import { toast } from "sonner";
import { generateId } from "../utils/helpers";

// Sample data for demo
const initialProposals: Proposal[] = [
  {
    id: '1',
    title: 'تخصيص ميزانية لحملة تسويق',
    description: 'نحتاج إلى تخصيص ميزانية لحملة التسويق القادمة التي تستهدف مستخدمين جدد.',
    choices: ['نعم', 'لا', 'امتناع'],
    createdBy: 'user1',
    createdAt: new Date(new Date().setHours(new Date().getHours() - 3)),
    status: 'active',
    votes: { 'نعم': 12, 'لا': 5, 'امتناع': 2 },
    protocol: 'web2',
    network: 'بوابات تمويل المشروعات',
    category: 'ممول'
  },
  {
    id: '2',
    title: 'توسيع خط المنتجات بعروض جديدة',
    description: 'اقتراح لتوسيع مجموعة منتجاتنا بعناصر جديدة لزيادة حصتنا في السوق.',
    choices: ['نعم', 'لا', 'امتناع'],
    createdBy: 'user2',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    status: 'closed',
    votes: { 'نعم': 18, 'لا': 7, 'امتناع': 3 },
    protocol: 'web2',
    network: 'مجموعات الشراء الجماعي',
    category: 'مشترى'
  },
  {
    id: '3',
    title: 'تحديد أهداف المبيعات الربعية',
    description: 'تحديد أهداف المبيعات للربع القادم بناء على تحليل السوق.',
    choices: ['نعم', 'لا', 'امتناع'],
    createdBy: 'user3',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 4)),
    status: 'closed',
    votes: { 'نعم': 20, 'لا': 4, 'امتناع': 1 },
    protocol: 'web3',
    network: 'بوابة التوظيف',
    category: 'مقدم خدمه'
  }
];

export class ProposalService {
  private proposals: Proposal[] = [...initialProposals];
  private votes: Vote[] = [];

  getAllProposals(): Proposal[] {
    return this.proposals;
  }

  getProposal(id: string): Proposal | undefined {
    return this.proposals.find(p => p.id === id);
  }

  filterProposals(protocol?: string, network?: string, category?: string): Proposal[] {
    return this.proposals.filter(proposal => {
      const protocolMatch = !protocol || protocol === 'all' || proposal.protocol === protocol;
      const networkMatch = !network || network === 'all' || proposal.network === network;
      const categoryMatch = !category || category === 'all' || proposal.category === category;
      return protocolMatch && networkMatch && categoryMatch;
    });
  }

  async createProposal(
    title: string, 
    description: string, 
    choices: string[],
    protocol: 'web2' | 'web3' = 'web2',
    network?: string,
    category?: string
  ): Promise<boolean> {
    try {
      const newProposal: Proposal = {
        id: generateId(),
        title,
        description,
        choices,
        createdBy: 'currentUser', // In real app, get from auth context
        createdAt: new Date(),
        status: 'active',
        votes: {},
        protocol,
        network,
        category
      };
      
      this.proposals = [newProposal, ...this.proposals];
      toast.success("Proposal created successfully");
      return true;
    } catch (error) {
      console.error("Failed to create proposal:", error);
      toast.error("Failed to create proposal");
      return false;
    }
  }

  async castVote(proposalId: string, choice: string): Promise<boolean> {
    try {
      const userId = 'currentUser'; // In real app, get from auth context
      
      // Check if user has already voted
      if (this.hasVoted(proposalId, userId)) {
        toast.error("You have already voted on this proposal");
        return false;
      }
      
      // Record the vote
      const newVote: Vote = {
        proposalId,
        userId,
        choice,
        votedAt: new Date()
      };
      
      this.votes = [...this.votes, newVote];
      
      // Update proposal vote counts
      this.proposals = this.proposals.map(p => {
        if (p.id === proposalId) {
          const updatedVotes = p.votes || {};
          updatedVotes[choice] = (updatedVotes[choice] || 0) + 1;
          return { ...p, votes: updatedVotes };
        }
        return p;
      });
      
      toast.success("Vote cast successfully");
      return true;
    } catch (error) {
      console.error("Failed to cast vote:", error);
      toast.error("Failed to cast vote");
      return false;
    }
  }

  getVotesForProposal(proposalId: string): Record<string, number> {
    const proposal = this.proposals.find(p => p.id === proposalId);
    return proposal?.votes || {};
  }

  hasVoted(proposalId: string, userId: string): boolean {
    return this.votes.some(v => v.proposalId === proposalId && v.userId === userId);
  }
}
