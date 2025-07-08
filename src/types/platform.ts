
// Platform Core Types
export type UserRole = 'visitor' | 'user' | 'supplier' | 'freelancer' | 'company_founder' | 'admin' | 'arbitrator';

export type UserStatus = 'restricted' | 'kyc_pending' | 'verified' | 'suspended' | 'banned';

export type GroupMemberStatus = 
  | 'pending_activation'
  | 'awaiting_kyc_approval' 
  | 'awaiting_voting'
  | 'active'
  | 'temporarily_suspended'
  | 'withdrawn'
  | 'banned';

export type GroupStatus = 
  | 'seeking_members'
  | 'awaiting_supply'
  | 'in_negotiation'
  | 'active'
  | 'completed'
  | 'frozen'
  | 'cancelled';

export type PortalType = 
  | 'cooperative_purchasing'
  | 'cooperative_marketing'
  | 'company_formation'
  | 'investment_groups'
  | 'suppliers'
  | 'freelancers'
  | 'freelancer_groups'
  | 'service_providers'
  | 'product_listings'
  | 'arbitration_documentation'
  | 'arbitration_requests'
  | 'smart_negotiation';

export interface PortalConfig {
  id: PortalType;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  requiresKYC: boolean;
  requiresPoints: boolean;
  requiresMCPExam: boolean;
  icon: string;
  color: string;
}

export interface GroupCard {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  portal: PortalType;
  currentPhase: string;
  currentPhaseAr: string;
  memberCount: number;
  maxMembers: number;
  status: GroupStatus;
  requirements: string[];
  joinFee?: number;
  createdAt: string;
  managers: string[];
}

export interface UserPoints {
  total: number;
  available: number;
  held: number;
  pending: number;
}

export interface KYCDocument {
  id: string;
  type: 'passport' | 'national_id' | 'business_license' | 'address_proof';
  status: 'pending' | 'approved' | 'rejected';
  uploadedAt: string;
  reviewedAt?: string;
  notes?: string;
}

export interface MCPExamResult {
  id: string;
  score: number;
  maxScore: number;
  passed: boolean;
  completedAt: string;
  validUntil: string;
}
