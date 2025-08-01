
export interface DiscountOffer {
  id: string;
  supplierId: string;
  title: string;
  description: string;
  basePrice: number;
  discountTiers: DiscountTier[];
  joinedMembers: string[];
  maxMembers?: number;
  expiry: string;
  status: 'active' | 'expired' | 'completed';
  created_at: string;
}

export interface DiscountTier {
  minMembers: number;
  discount: number; // percentage
}

export interface GroupWorkflow {
  id: string;
  phase: 'initial' | 'loi' | 'icpo' | 'fco' | 'dd' | 'spa' | 'shipping' | 'completed';
  documents: WorkflowDocument[];
  timeline: WorkflowEvent[];
  currentStep: string;
  nextSteps: string[];
}

export interface WorkflowDocument {
  id: string;
  type: 'loi' | 'icpo' | 'fco' | 'dd' | 'spa' | 'pop' | 'pof' | 'bl' | 'invoice' | 'cert';
  title: string;
  ipfsHash?: string;
  uploadedBy: string;
  uploadedAt: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
}

export interface WorkflowEvent {
  id: string;
  type: 'document_uploaded' | 'phase_changed' | 'voting_completed' | 'milestone_reached';
  description: string;
  timestamp: string;
  userId?: string;
  metadata?: Record<string, any>;
}

export interface VotingSession {
  id: string;
  groupId: string;
  type: 'simple' | 'weighted' | 'election';
  title: string;
  description: string;
  options: VotingOption[];
  votingMethod: '1person1vote' | 'capital_weighted';
  status: 'active' | 'completed' | 'cancelled';
  deadline?: string;
  results?: VotingResults;
}

export interface VotingOption {
  id: string;
  title: string;
  description?: string;
}

export interface VotingResults {
  totalVotes: number;
  optionResults: {
    optionId: string;
    votes: number;
    percentage: number;
  }[];
  winner?: string;
}

export class GPOWorkflowService {
  private workflows: Map<string, GroupWorkflow> = new Map();
  private discountOffers: DiscountOffer[] = [];
  private votingSessions: VotingSession[] = [];

  // Discount Offers Management
  createDiscountOffer(offer: Omit<DiscountOffer, 'id' | 'created_at' | 'status' | 'joinedMembers'>): DiscountOffer {
    const newOffer: DiscountOffer = {
      ...offer,
      id: Date.now().toString(),
      joinedMembers: [],
      status: 'active',
      created_at: new Date().toISOString()
    };

    this.discountOffers.push(newOffer);
    return newOffer;
  }

  joinDiscountOffer(offerId: string, userId: string): boolean {
    const offer = this.discountOffers.find(o => o.id === offerId);
    if (!offer || offer.status !== 'active') return false;

    if (offer.joinedMembers.includes(userId)) return false;

    // Check if offer has expired
    if (new Date(offer.expiry) < new Date()) {
      offer.status = 'expired';
      return false;
    }

    // Check max members
    if (offer.maxMembers && offer.joinedMembers.length >= offer.maxMembers) {
      offer.status = 'completed';
      return false;
    }

    offer.joinedMembers.push(userId);

    // Auto-close if max members reached
    if (offer.maxMembers && offer.joinedMembers.length >= offer.maxMembers) {
      offer.status = 'completed';
      this.processDiscountOffer(offerId);
    }

    return true;
  }

  getActiveDiscountOffers(): DiscountOffer[] {
    return this.discountOffers.filter(offer => 
      offer.status === 'active' && new Date(offer.expiry) > new Date()
    );
  }

  calculateDiscount(offer: DiscountOffer): number {
    const memberCount = offer.joinedMembers.length;
    let applicableDiscount = 0;

    for (const tier of offer.discountTiers.sort((a, b) => b.minMembers - a.minMembers)) {
      if (memberCount >= tier.minMembers) {
        applicableDiscount = tier.discount;
        break;
      }
    }

    return applicableDiscount;
  }

  private processDiscountOffer(offerId: string): void {
    const offer = this.discountOffers.find(o => o.id === offerId);
    if (!offer) return;

    const discount = this.calculateDiscount(offer);
    console.log(`Processing discount offer ${offerId} with ${discount}% discount for ${offer.joinedMembers.length} members`);
    
    // This would typically:
    // 1. Generate PDF invoice
    // 2. Store in IPFS
    // 3. Send notifications to all members
    // 4. Process payment/delivery
  }

  // Workflow Management
  initializeWorkflow(groupId: string): GroupWorkflow {
    const workflow: GroupWorkflow = {
      id: groupId,
      phase: 'initial',
      documents: [],
      timeline: [{
        id: Date.now().toString(),
        type: 'milestone_reached',
        description: 'Group workflow initialized',
        timestamp: new Date().toISOString()
      }],
      currentStep: 'Group Formation',
      nextSteps: ['Draft Letter of Intent', 'Elect Group Managers']
    };

    this.workflows.set(groupId, workflow);
    return workflow;
  }

  advanceWorkflowPhase(groupId: string, nextPhase: GroupWorkflow['phase']): boolean {
    const workflow = this.workflows.get(groupId);
    if (!workflow) return false;

    const phaseOrder: GroupWorkflow['phase'][] = [
      'initial', 'loi', 'icpo', 'fco', 'dd', 'spa', 'shipping', 'completed'
    ];

    const currentIndex = phaseOrder.indexOf(workflow.phase);
    const nextIndex = phaseOrder.indexOf(nextPhase);

    if (nextIndex <= currentIndex) return false;

    workflow.phase = nextPhase;
    workflow.timeline.push({
      id: Date.now().toString(),
      type: 'phase_changed',
      description: `Workflow advanced to ${nextPhase} phase`,
      timestamp: new Date().toISOString()
    });

    // Update current step and next steps based on phase
    this.updateWorkflowSteps(workflow);

    return true;
  }

  private updateWorkflowSteps(workflow: GroupWorkflow): void {
    const stepMapping: Record<GroupWorkflow['phase'], { current: string; next: string[] }> = {
      initial: {
        current: 'Group Formation',
        next: ['Draft Letter of Intent', 'Elect Group Managers']
      },
      loi: {
        current: 'Letter of Intent',
        next: ['Send ICPO to Suppliers', 'Review LOI with Members']
      },
      icpo: {
        current: 'Initial Corporate Purchase Order',
        next: ['Await Supplier FCO', 'Negotiate Terms']
      },
      fco: {
        current: 'Full Corporate Offer',
        next: ['Conduct Due Diligence', 'Review Supplier Credentials']
      },
      dd: {
        current: 'Due Diligence',
        next: ['Generate SPA', 'Final Member Approval']
      },
      spa: {
        current: 'Sales Purchase Agreement',
        next: ['Upload POP/POF', 'Arrange LC/SBLC']
      },
      shipping: {
        current: 'Shipping & Documentation',
        next: ['Upload B/L and Certificates', 'Confirm Receipt']
      },
      completed: {
        current: 'Transaction Completed',
        next: ['Archive Documents', 'Rate Experience']
      }
    };

    const mapping = stepMapping[workflow.phase];
    workflow.currentStep = mapping.current;
    workflow.nextSteps = mapping.next;
  }

  uploadDocument(groupId: string, document: Omit<WorkflowDocument, 'id' | 'uploadedAt' | 'status'>): boolean {
    const workflow = this.workflows.get(groupId);
    if (!workflow) return false;

    const newDocument: WorkflowDocument = {
      ...document,
      id: Date.now().toString(),
      uploadedAt: new Date().toISOString(),
      status: 'pending'
    };

    workflow.documents.push(newDocument);
    workflow.timeline.push({
      id: Date.now().toString(),
      type: 'document_uploaded',
      description: `${document.type.toUpperCase()} document uploaded: ${document.title}`,
      timestamp: new Date().toISOString(),
      userId: document.uploadedBy
    });

    return true;
  }

  // Voting System
  createVotingSession(session: Omit<VotingSession, 'id' | 'status'>): VotingSession {
    const newSession: VotingSession = {
      ...session,
      id: Date.now().toString(),
      status: 'active'
    };

    this.votingSessions.push(newSession);
    return newSession;
  }

  getWorkflow(groupId: string): GroupWorkflow | undefined {
    return this.workflows.get(groupId);
  }

  getActiveVotingSessions(groupId: string): VotingSession[] {
    return this.votingSessions.filter(session => 
      session.groupId === groupId && session.status === 'active'
    );
  }

  // IPFS Path Generation
  generateIPFSPath(groupId: string, documentType: string): string {
    return `/ipfs/groups/${groupId}/${documentType}/`;
  }

  // Get workflow statistics
  getWorkflowStats(): {
    totalWorkflows: number;
    activePhases: Record<string, number>;
    completedWorkflows: number;
    activeDiscountOffers: number;
  } {
    const workflows = Array.from(this.workflows.values());
    const phaseStats: Record<string, number> = {};

    workflows.forEach(workflow => {
      phaseStats[workflow.phase] = (phaseStats[workflow.phase] || 0) + 1;
    });

    return {
      totalWorkflows: workflows.length,
      activePhases: phaseStats,
      completedWorkflows: workflows.filter(w => w.phase === 'completed').length,
      activeDiscountOffers: this.getActiveDiscountOffers().length
    };
  }
}

export const gpoWorkflowService = new GPOWorkflowService();
