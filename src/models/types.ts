
// Common types for the DAO application
export interface Proposal {
  id: string;
  title: string;
  description: string;
  choices: string[];
  createdBy: string;
  createdAt: Date;
  status: 'active' | 'closed';
  votes?: Record<string, number>; // Choice ID -> vote count
  protocol?: 'web2' | 'web3';
  network?: string;
  category?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed';
  dueDate: Date;
  protocol?: 'web2' | 'web3';
  network?: string;
  category?: string;
}

export interface Vote {
  proposalId: string;
  userId: string;
  choice: string;
  votedAt: Date;
}

// Categories, Networks and Protocols for the Web2 snapshot system
export const protocolOptions = ['web2', 'web3'];
export const networkOptions = [
  'مجموعات الشراء الجماعي',
  'بوابات تمويل المشروعات',
  'بوابة التوظيف'
];
export const categoryOptions = [
  'مورد',
  'ممول',
  'مشترى',
  'مقدم خدمه'
];
