import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from "sonner";

// Types for our entities
interface Proposal {
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

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed';
  dueDate: Date;
  protocol?: 'web2' | 'web3';
  network?: string;
  category?: string;
}

interface Vote {
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

interface DAOContextType {
  // Proposal methods
  proposals: Proposal[];
  createProposal: (
    title: string, 
    description: string, 
    choices: string[], 
    protocol?: 'web2' | 'web3',
    network?: string,
    category?: string
  ) => Promise<boolean>;
  getProposal: (id: string) => Proposal | undefined;
  filterProposals: (protocol?: string, network?: string, category?: string) => Proposal[];
  
  // Voting methods
  castVote: (proposalId: string, choice: string) => Promise<boolean>;
  getVotesForProposal: (proposalId: string) => Record<string, number>;
  hasVoted: (proposalId: string, userId: string) => boolean;
  
  // Project methods
  projects: Project[];
  createProject: (
    name: string, 
    description: string, 
    dueDate: Date,
    protocol?: 'web2' | 'web3',
    network?: string,
    category?: string
  ) => Promise<boolean>;
  updateProject: (id: string, data: Partial<Project>) => Promise<boolean>;
  
  // Agreement methods
  signAgreement: (agreementId: string, password: string, otp: string) => Promise<boolean>;
  
  // Filter options
  protocolOptions: string[];
  networkOptions: string[];
  categoryOptions: string[];
}

const DAOContext = createContext<DAOContextType | undefined>(undefined);

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

const initialProjects: Project[] = [
  {
    id: '1',
    name: 'إعادة تصميم الموقع',
    description: 'تجديد موقع الشركة لتحسين تجربة المستخدم ومعدلات التحويل.',
    status: 'active',
    dueDate: new Date(2024, 4, 15),
    protocol: 'web2',
    network: 'بوابات تمويل المشروعات',
    category: 'مقدم خدمه'
  },
  {
    id: '2',
    name: 'إطلاق المنتج: النموذج X',
    description: 'التحضير وتنفيذ إطلاق منتجنا الجديد النموذج X.',
    status: 'completed',
    dueDate: new Date(2024, 3, 10),
    protocol: 'web2',
    network: 'مجموعات الشراء الجماعي',
    category: 'مورد'
  },
  {
    id: '3',
    name: 'دراسة بحث سوق',
    description: 'إجراء بحث سوقي شامل على منافسينا الرئيسيين.',
    status: 'active',
    dueDate: new Date(2023, 11, 20),
    protocol: 'web3',
    network: 'بوابة التوظيف',
    category: 'مشترى'
  }
];

export const DAOProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [proposals, setProposals] = useState<Proposal[]>(initialProposals);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [votes, setVotes] = useState<Vote[]>([]);
  
  // Proposals
  const createProposal = async (
    title: string, 
    description: string, 
    choices: string[],
    protocol: 'web2' | 'web3' = 'web2',
    network?: string,
    category?: string
  ): Promise<boolean> => {
    try {
      const newProposal: Proposal = {
        id: Math.random().toString(36).substr(2, 9),
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
      
      setProposals(prev => [newProposal, ...prev]);
      toast.success("Proposal created successfully");
      return true;
    } catch (error) {
      console.error("Failed to create proposal:", error);
      toast.error("Failed to create proposal");
      return false;
    }
  };
  
  const getProposal = (id: string): Proposal | undefined => {
    return proposals.find(p => p.id === id);
  };
  
  // Filter proposals based on protocol, network, and category
  const filterProposals = (protocol?: string, network?: string, category?: string): Proposal[] => {
    return proposals.filter(proposal => {
      const protocolMatch = !protocol || protocol === 'all' || proposal.protocol === protocol;
      const networkMatch = !network || network === 'all' || proposal.network === network;
      const categoryMatch = !category || category === 'all' || proposal.category === category;
      return protocolMatch && networkMatch && categoryMatch;
    });
  };
  
  // Voting
  const castVote = async (proposalId: string, choice: string): Promise<boolean> => {
    try {
      const userId = 'currentUser'; // In real app, get from auth context
      
      // Check if user has already voted
      if (hasVoted(proposalId, userId)) {
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
      
      setVotes(prev => [...prev, newVote]);
      
      // Update proposal vote counts
      setProposals(prev => prev.map(p => {
        if (p.id === proposalId) {
          const updatedVotes = p.votes || {};
          updatedVotes[choice] = (updatedVotes[choice] || 0) + 1;
          return { ...p, votes: updatedVotes };
        }
        return p;
      }));
      
      toast.success("Vote cast successfully");
      return true;
    } catch (error) {
      console.error("Failed to cast vote:", error);
      toast.error("Failed to cast vote");
      return false;
    }
  };
  
  const getVotesForProposal = (proposalId: string): Record<string, number> => {
    const proposal = proposals.find(p => p.id === proposalId);
    return proposal?.votes || {};
  };
  
  const hasVoted = (proposalId: string, userId: string): boolean => {
    return votes.some(v => v.proposalId === proposalId && v.userId === userId);
  };
  
  // Projects
  const createProject = async (
    name: string, 
    description: string, 
    dueDate: Date,
    protocol: 'web2' | 'web3' = 'web2',
    network?: string,
    category?: string
  ): Promise<boolean> => {
    try {
      const newProject: Project = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        description,
        status: 'active',
        dueDate,
        protocol,
        network,
        category
      };
      
      setProjects(prev => [newProject, ...prev]);
      toast.success("Project created successfully");
      return true;
    } catch (error) {
      console.error("Failed to create project:", error);
      toast.error("Failed to create project");
      return false;
    }
  };
  
  const updateProject = async (id: string, data: Partial<Project>): Promise<boolean> => {
    try {
      setProjects(prev => prev.map(p => {
        if (p.id === id) {
          return { ...p, ...data };
        }
        return p;
      }));
      
      toast.success("Project updated successfully");
      return true;
    } catch (error) {
      console.error("Failed to update project:", error);
      toast.error("Failed to update project");
      return false;
    }
  };
  
  // Agreements
  const signAgreement = async (agreementId: string, password: string, otp: string): Promise<boolean> => {
    try {
      // Simulate signing agreement
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (otp.length === 6 && /^\d+$/.test(otp) && password.length >= 6) {
        toast.success("Agreement signed successfully");
        return true;
      } else {
        toast.error("Invalid credentials");
        return false;
      }
    } catch (error) {
      console.error("Failed to sign agreement:", error);
      toast.error("Failed to sign agreement");
      return false;
    }
  };
  
  return (
    <DAOContext.Provider value={{
      proposals, 
      createProposal, 
      getProposal,
      filterProposals,
      castVote,
      getVotesForProposal,
      hasVoted,
      projects,
      createProject,
      updateProject,
      signAgreement,
      protocolOptions,
      networkOptions,
      categoryOptions
    }}>
      {children}
    </DAOContext.Provider>
  );
};

export const useDAO = (): DAOContextType => {
  const context = useContext(DAOContext);
  if (context === undefined) {
    throw new Error('useDAO must be used within a DAOProvider');
  }
  return context;
};
