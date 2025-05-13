
// Mock data for contract components

export const mockDealStages = [
  { id: 1, name: 'negotiations', status: 'completed' },
  { id: 2, name: 'agreement', status: 'completed' },
  { id: 3, name: 'implementation', status: 'inProgress' },
  { id: 4, name: 'closing', status: 'pending' },
];

export const mockVotes = [
  { id: 1, title: 'Initial agreement', status: 'approved', votes: { yes: 8, no: 2, abstain: 1 } },
  { id: 2, title: 'Payment schedule', status: 'approved', votes: { yes: 7, no: 3, abstain: 1 } },
  { id: 3, title: 'Final delivery date', status: 'inProgress', votes: { yes: 5, no: 1, abstain: 0 } },
];

export const mockMembers = [
  { id: 1, name: 'Ahmed Hassan', role: 'Group Admin', avatar: 'AH' },
  { id: 2, name: 'Sara Wilson', role: 'Supervisor', avatar: 'SW' },
  { id: 3, name: 'Mohammed Ali', role: 'Member', avatar: 'MA' },
  { id: 4, name: 'John Doe', role: 'Supplier', avatar: 'JD' },
  { id: 5, name: 'Jane Smith', role: 'Freelancer', avatar: 'JS' },
];
