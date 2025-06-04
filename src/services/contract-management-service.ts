
import { gpoService } from './gpo-core-service';

export interface ContractNegotiation {
  id: string;
  contractId: string;
  groupId: string;
  currentVersion: number;
  fieldChanges: FieldChange[];
  status: 'draft' | 'negotiating' | 'approved' | 'signed';
  ipfsHash?: string;
  signedBy: string[];
  createdAt: Date;
}

export interface FieldChange {
  fieldId: string;
  oldValue: any;
  newValue: any;
  proposedBy: string;
  approvedBy: string[];
  rejectedBy: string[];
  timestamp: Date;
  comment?: string;
}

export class ContractManagementService {
  private negotiations: ContractNegotiation[] = [];

  createContractFromTemplate(templateId: string, groupId: string, initialValues: Record<string, any>): ContractNegotiation {
    const templates = gpoService.getContractTemplates();
    const template = templates.find(t => t.id === templateId);
    
    if (!template) throw new Error('Template not found');

    const negotiation: ContractNegotiation = {
      id: Date.now().toString(),
      contractId: `CONTRACT-${Date.now()}`,
      groupId,
      currentVersion: 1,
      fieldChanges: [],
      status: 'draft',
      signedBy: [],
      createdAt: new Date()
    };

    this.negotiations.push(negotiation);
    return negotiation;
  }

  proposeFieldChange(negotiationId: string, fieldId: string, newValue: any, proposedBy: string, comment?: string): void {
    const negotiation = this.negotiations.find(n => n.id === negotiationId);
    if (!negotiation) return;

    const change: FieldChange = {
      fieldId,
      oldValue: null, // Would get from current contract state
      newValue,
      proposedBy,
      approvedBy: [proposedBy],
      rejectedBy: [],
      timestamp: new Date(),
      comment
    };

    negotiation.fieldChanges.push(change);
    negotiation.status = 'negotiating';
  }

  approveFieldChange(negotiationId: string, fieldId: string, userId: string): void {
    const negotiation = this.negotiations.find(n => n.id === negotiationId);
    if (!negotiation) return;

    const change = negotiation.fieldChanges.find(c => c.fieldId === fieldId);
    if (change && !change.approvedBy.includes(userId)) {
      change.approvedBy.push(userId);
    }
  }

  async notarizeContract(negotiationId: string): Promise<string> {
    const negotiation = this.negotiations.find(n => n.id === negotiationId);
    if (!negotiation) throw new Error('Negotiation not found');

    // Simulate IPFS storage
    const ipfsHash = `QmX${Date.now()}RandomHashForDemo`;
    negotiation.ipfsHash = ipfsHash;
    negotiation.status = 'signed';
    
    console.log(`Contract notarized to IPFS: ${ipfsHash}`);
    return ipfsHash;
  }

  getContractNegotiations(groupId: string): ContractNegotiation[] {
    return this.negotiations.filter(n => n.groupId === groupId);
  }

  generateContractDocument(negotiationId: string): string {
    const negotiation = this.negotiations.find(n => n.id === negotiationId);
    if (!negotiation) return '';

    // Generate final contract document with all approved changes
    return `
COMMERCIAL AGREEMENT
Contract ID: ${negotiation.contractId}
Date: ${new Date().toLocaleDateString()}

This agreement is entered into in accordance with UN Trade regulations and WTO guidelines.

[Contract terms would be populated here based on template and approved field changes]

IPFS Hash: ${negotiation.ipfsHash || 'Pending notarization'}
Digital Signatures: ${negotiation.signedBy.join(', ')}
    `;
  }
}

export const contractService = new ContractManagementService();
