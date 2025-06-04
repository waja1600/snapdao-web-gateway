
export interface GPOUser {
  id: string;
  name: string;
  email: string;
  role: 'company' | 'freelancer' | 'supplier' | 'supervisor';
  country: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  specializations: string[];
  complianceScore: number;
  joinedAt: Date;
}

export interface GPOGroup {
  id: string;
  name: string;
  type: 'group_buying' | 'cooperative_marketing' | 'company_formation';
  members: GPOUser[];
  minMembers: number;
  status: 'forming' | 'active' | 'negotiating' | 'completed';
  createdBy: string;
  createdAt: Date;
  requirements: string[];
  votingActive: boolean;
  contractDrafted: boolean;
  arbitrationRequested: boolean;
}

export interface ContractTemplate {
  id: string;
  name: string;
  type: 'purchase' | 'service' | 'partnership' | 'incorporation';
  fields: ContractField[];
  template: string;
  unTradeCompliant: boolean;
}

export interface ContractField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'select';
  required: boolean;
  options?: string[];
  value?: any;
}

export interface ArbitrationCase {
  id: string;
  groupId: string;
  type: 'dispute' | 'compliance' | 'breach';
  status: 'filed' | 'review' | 'hearing' | 'resolved';
  filedBy: string;
  evidence: string[];
  timeline: ArbitrationEvent[];
  resolution?: string;
}

export interface ArbitrationEvent {
  id: string;
  type: 'filed' | 'evidence_submitted' | 'hearing_scheduled' | 'decision';
  date: Date;
  description: string;
  documents: string[];
}

export class GPOCoreService {
  private groups: GPOGroup[] = [];
  private contracts: ContractTemplate[] = [];
  private arbitrationCases: ArbitrationCase[] = [];

  // Group Management
  createGroup(data: Omit<GPOGroup, 'id' | 'createdAt' | 'status'>): GPOGroup {
    const group: GPOGroup = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date(),
      status: 'forming'
    };
    this.groups.push(group);
    return group;
  }

  joinGroup(groupId: string, user: GPOUser): boolean {
    const group = this.groups.find(g => g.id === groupId);
    if (group && group.members.length < 15) {
      group.members.push(user);
      if (group.members.length >= group.minMembers) {
        group.status = 'active';
      }
      return true;
    }
    return false;
  }

  // Contract Management
  getContractTemplates(): ContractTemplate[] {
    return [
      {
        id: '1',
        name: 'UN Trade Purchase Agreement',
        type: 'purchase',
        unTradeCompliant: true,
        template: 'Standard purchase agreement compliant with UN trade regulations',
        fields: [
          { id: 'buyer', name: 'Buyer Party', type: 'text', required: true },
          { id: 'seller', name: 'Seller Party', type: 'text', required: true },
          { id: 'goods', name: 'Goods Description', type: 'text', required: true },
          { id: 'quantity', name: 'Quantity', type: 'number', required: true },
          { id: 'price', name: 'Total Price', type: 'number', required: true },
          { id: 'delivery', name: 'Delivery Date', type: 'date', required: true },
          { id: 'terms', name: 'Payment Terms', type: 'select', required: true, 
            options: ['Net 30', 'Net 60', 'COD', 'Letter of Credit'] }
        ]
      },
      {
        id: '2',
        name: 'Service Agreement Template',
        type: 'service',
        unTradeCompliant: true,
        template: 'Professional services agreement template',
        fields: [
          { id: 'client', name: 'Client', type: 'text', required: true },
          { id: 'provider', name: 'Service Provider', type: 'text', required: true },
          { id: 'scope', name: 'Scope of Work', type: 'text', required: true },
          { id: 'duration', name: 'Project Duration', type: 'text', required: true },
          { id: 'fee', name: 'Service Fee', type: 'number', required: true }
        ]
      }
    ];
  }

  // Arbitration System
  fileArbitration(data: Omit<ArbitrationCase, 'id' | 'timeline' | 'status'>): ArbitrationCase {
    const arbitrationCase: ArbitrationCase = {
      ...data,
      id: 'ARB-' + Date.now().toString(),
      status: 'filed',
      timeline: [{
        id: '1',
        type: 'filed',
        date: new Date(),
        description: 'Arbitration case filed',
        documents: []
      }]
    };
    this.arbitrationCases.push(arbitrationCase);
    return arbitrationCase;
  }

  getGroups(): GPOGroup[] {
    return this.groups;
  }

  getArbitrationCases(): ArbitrationCase[] {
    return this.arbitrationCases;
  }
}

export const gpoService = new GPOCoreService();
