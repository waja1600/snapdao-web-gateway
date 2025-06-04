
import { internationalBusinessService } from './international-business-service';

export interface EnhancedGPOGroup {
  id: string;
  name: string;
  type: 'group_contract' | 'solo_contract';
  serviceGateway: string;
  businessObjective: string;
  legalFramework: string;
  jurisdiction: string;
  members: GPOMember[];
  contractStatus: 'draft' | 'negotiation' | 'voting' | 'signed' | 'executed';
  documents: GPODocument[];
  negotiationRounds: NegotiationRound[];
  votingHistory: VotingRecord[];
  arbitrationCases: string[];
  ipfsHash?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GPOMember {
  id: string;
  userId: string;
  role: 'initiator' | 'member' | 'advisor' | 'supplier' | 'freelancer';
  legalStatus: 'individual' | 'company' | 'partnership';
  kycStatus: 'pending' | 'verified' | 'rejected';
  signatureStatus: 'pending' | 'signed';
  votingWeight: number;
  joinedAt: Date;
}

export interface GPODocument {
  id: string;
  type: 'contract' | 'rfq' | 'proposal' | 'certificate' | 'evidence';
  name: string;
  version: number;
  status: 'draft' | 'review' | 'approved' | 'signed';
  ipfsHash?: string;
  uploadedBy: string;
  uploadedAt: Date;
}

export interface NegotiationRound {
  id: string;
  roundNumber: number;
  clauseId: string;
  proposedBy: string;
  proposedValue: any;
  comments: string;
  approvals: string[];
  rejections: string[];
  status: 'active' | 'approved' | 'rejected';
  createdAt: Date;
}

export interface VotingRecord {
  id: string;
  proposalId: string;
  proposalType: 'contract_clause' | 'member_admission' | 'budget_allocation' | 'arbitration_request';
  votes: Vote[];
  result: 'passed' | 'failed' | 'pending';
  quorumReached: boolean;
  createdAt: Date;
  closedAt?: Date;
}

export interface Vote {
  memberId: string;
  choice: 'approve' | 'reject' | 'abstain';
  weight: number;
  reason?: string;
  timestamp: Date;
}

export class EnhancedGPOService {
  private groups: EnhancedGPOGroup[] = [];

  createGroup(data: {
    name: string;
    type: 'group_contract' | 'solo_contract';
    serviceType: string;
    jurisdiction: string;
    initiatorId: string;
  }): EnhancedGPOGroup {
    const serviceGateway = internationalBusinessService.getServiceByType(data.serviceType);
    if (!serviceGateway) {
      throw new Error('Invalid service type');
    }

    const group: EnhancedGPOGroup = {
      id: `GPO-${Date.now()}`,
      name: data.name,
      type: data.type,
      serviceGateway: serviceGateway.id,
      businessObjective: serviceGateway.businessObjective,
      legalFramework: serviceGateway.legalModel,
      jurisdiction: data.jurisdiction,
      members: [{
        id: `M-${Date.now()}`,
        userId: data.initiatorId,
        role: 'initiator',
        legalStatus: 'individual',
        kycStatus: 'pending',
        signatureStatus: 'pending',
        votingWeight: 1,
        joinedAt: new Date()
      }],
      contractStatus: 'draft',
      documents: [],
      negotiationRounds: [],
      votingHistory: [],
      arbitrationCases: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.groups.push(group);
    return group;
  }

  joinGroup(groupId: string, userId: string, role: GPOMember['role'] = 'member'): boolean {
    const group = this.groups.find(g => g.id === groupId);
    if (!group) return false;

    const existingMember = group.members.find(m => m.userId === userId);
    if (existingMember) return false;

    const newMember: GPOMember = {
      id: `M-${Date.now()}-${Math.random()}`,
      userId,
      role,
      legalStatus: 'individual',
      kycStatus: 'pending',
      signatureStatus: 'pending',
      votingWeight: role === 'advisor' ? 0.5 : 1,
      joinedAt: new Date()
    };

    group.members.push(newMember);
    group.updatedAt = new Date();
    return true;
  }

  proposeContractClause(groupId: string, clauseId: string, proposedValue: any, proposedBy: string, comments: string): boolean {
    const group = this.groups.find(g => g.id === groupId);
    if (!group) return false;

    const round: NegotiationRound = {
      id: `NR-${Date.now()}`,
      roundNumber: group.negotiationRounds.length + 1,
      clauseId,
      proposedBy,
      proposedValue,
      comments,
      approvals: [proposedBy],
      rejections: [],
      status: 'active',
      createdAt: new Date()
    };

    group.negotiationRounds.push(round);
    group.contractStatus = 'negotiation';
    group.updatedAt = new Date();
    return true;
  }

  voteOnProposal(groupId: string, proposalId: string, memberId: string, choice: 'approve' | 'reject' | 'abstain', reason?: string): boolean {
    const group = this.groups.find(g => g.id === groupId);
    if (!group) return false;

    const member = group.members.find(m => m.id === memberId);
    if (!member) return false;

    let votingRecord = group.votingHistory.find(v => v.proposalId === proposalId);
    if (!votingRecord) {
      votingRecord = {
        id: `VR-${Date.now()}`,
        proposalId,
        proposalType: 'contract_clause',
        votes: [],
        result: 'pending',
        quorumReached: false,
        createdAt: new Date()
      };
      group.votingHistory.push(votingRecord);
    }

    // Remove existing vote from this member
    votingRecord.votes = votingRecord.votes.filter(v => v.memberId !== memberId);

    // Add new vote
    votingRecord.votes.push({
      memberId,
      choice,
      weight: member.votingWeight,
      reason,
      timestamp: new Date()
    });

    // Check quorum and result
    const totalWeight = group.members.reduce((sum, m) => sum + m.votingWeight, 0);
    const votedWeight = votingRecord.votes.reduce((sum, v) => sum + v.weight, 0);
    const approveWeight = votingRecord.votes
      .filter(v => v.choice === 'approve')
      .reduce((sum, v) => sum + v.weight, 0);

    votingRecord.quorumReached = votedWeight >= (totalWeight * 0.6); // 60% quorum
    
    if (votingRecord.quorumReached) {
      votingRecord.result = approveWeight > (votedWeight * 0.5) ? 'passed' : 'failed';
      votingRecord.closedAt = new Date();
      
      if (votingRecord.result === 'passed') {
        group.contractStatus = 'voting';
      }
    }

    group.updatedAt = new Date();
    return true;
  }

  requestArbitration(groupId: string, requestedBy: string, type: 'dispute' | 'compliance' | 'breach', description: string): string {
    const group = this.groups.find(g => g.id === groupId);
    if (!group) throw new Error('Group not found');

    const arbitrationId = `ARB-${Date.now()}`;
    group.arbitrationCases.push(arbitrationId);
    group.updatedAt = new Date();

    // This would integrate with the arbitration service
    console.log(`Arbitration case ${arbitrationId} created for group ${groupId}`);
    return arbitrationId;
  }

  uploadToIPFS(groupId: string, documentType: string, content: any): string {
    // Simulate IPFS upload
    const ipfsHash = `Qm${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
    
    const group = this.groups.find(g => g.id === groupId);
    if (group) {
      group.ipfsHash = ipfsHash;
      group.updatedAt = new Date();
    }
    
    console.log(`Document uploaded to IPFS: ${ipfsHash}`);
    return ipfsHash;
  }

  getGroups(): EnhancedGPOGroup[] {
    return this.groups;
  }

  getGroupById(id: string): EnhancedGPOGroup | undefined {
    return this.groups.find(g => g.id === id);
  }

  getUserGroups(userId: string): EnhancedGPOGroup[] {
    return this.groups.filter(g => 
      g.members.some(m => m.userId === userId)
    );
  }
}

export const enhancedGPOService = new EnhancedGPOService();
