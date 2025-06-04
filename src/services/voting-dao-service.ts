
export interface Proposal {
  id: string;
  groupId: string;
  title: string;
  description: string;
  type: 'supplier_selection' | 'contract_approval' | 'group_decision' | 'arbitration_request';
  options: ProposalOption[];
  votingEndDate: Date;
  status: 'active' | 'passed' | 'failed' | 'cancelled';
  createdBy: string;
  createdAt: Date;
  minimumQuorum: number;
  requiredMajority: number; // percentage
}

export interface ProposalOption {
  id: string;
  text: string;
  votes: Vote[];
  voteCount: number;
}

export interface Vote {
  id: string;
  voterId: string;
  weight: number;
  timestamp: Date;
  reason?: string;
}

export class VotingDAOService {
  private proposals: Proposal[] = [];

  createProposal(data: Omit<Proposal, 'id' | 'createdAt' | 'status'>): Proposal {
    const proposal: Proposal = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date(),
      status: 'active'
    };

    this.proposals.push(proposal);
    return proposal;
  }

  castVote(proposalId: string, optionId: string, voterId: string, reason?: string): boolean {
    const proposal = this.proposals.find(p => p.id === proposalId);
    if (!proposal || proposal.status !== 'active' || new Date() > proposal.votingEndDate) {
      return false;
    }

    const option = proposal.options.find(o => o.id === optionId);
    if (!option) return false;

    // Check if user already voted
    const existingVote = option.votes.find(v => v.voterId === voterId);
    if (existingVote) return false;

    const vote: Vote = {
      id: Date.now().toString(),
      voterId,
      weight: 1, // Could be based on stake or role
      timestamp: new Date(),
      reason
    };

    option.votes.push(vote);
    option.voteCount = option.votes.length;

    // Check if proposal should be resolved
    this.checkProposalResolution(proposalId);
    
    return true;
  }

  private checkProposalResolution(proposalId: string): void {
    const proposal = this.proposals.find(p => p.id === proposalId);
    if (!proposal) return;

    const totalVotes = proposal.options.reduce((sum, option) => sum + option.voteCount, 0);
    const winningOption = proposal.options.reduce((max, option) => 
      option.voteCount > max.voteCount ? option : max
    );

    // Check quorum and majority
    if (totalVotes >= proposal.minimumQuorum) {
      const majorityPercentage = (winningOption.voteCount / totalVotes) * 100;
      if (majorityPercentage >= proposal.requiredMajority) {
        proposal.status = 'passed';
      }
    }

    // Auto-resolve if voting period ended
    if (new Date() > proposal.votingEndDate) {
      proposal.status = totalVotes >= proposal.minimumQuorum ? 'passed' : 'failed';
    }
  }

  getGroupProposals(groupId: string): Proposal[] {
    return this.proposals.filter(p => p.groupId === groupId);
  }

  getActiveProposals(): Proposal[] {
    return this.proposals.filter(p => p.status === 'active' && new Date() <= p.votingEndDate);
  }

  getProposalResults(proposalId: string): { winner: ProposalOption | null; results: ProposalOption[] } {
    const proposal = this.proposals.find(p => p.id === proposalId);
    if (!proposal) return { winner: null, results: [] };

    const sortedOptions = [...proposal.options].sort((a, b) => b.voteCount - a.voteCount);
    return {
      winner: sortedOptions[0] || null,
      results: sortedOptions
    };
  }
}

export const votingService = new VotingDAOService();
