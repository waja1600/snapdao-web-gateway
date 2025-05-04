
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
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed';
  dueDate: Date;
}

interface Vote {
  proposalId: string;
  userId: string;
  choice: string;
  votedAt: Date;
}

interface DAOContextType {
  // Proposal methods
  proposals: Proposal[];
  createProposal: (title: string, description: string, choices: string[]) => Promise<boolean>;
  getProposal: (id: string) => Proposal | undefined;
  
  // Voting methods
  castVote: (proposalId: string, choice: string) => Promise<boolean>;
  getVotesForProposal: (proposalId: string) => Record<string, number>;
  hasVoted: (proposalId: string, userId: string) => boolean;
  
  // Project methods
  projects: Project[];
  createProject: (name: string, description: string, dueDate: Date) => Promise<boolean>;
  updateProject: (id: string, data: Partial<Project>) => Promise<boolean>;
  
  // Agreement methods
  signAgreement: (agreementId: string, password: string, otp: string) => Promise<boolean>;
}

const DAOContext = createContext<DAOContextType | undefined>(undefined);

// Sample data for demo
const initialProposals: Proposal[] = [
  {
    id: '1',
    title: 'Allocate budget for marketing campaign',
    description: 'We need to allocate budget for our upcoming marketing campaign targeting new users.',
    choices: ['Yes', 'No', 'Abstain'],
    createdBy: 'user1',
    createdAt: new Date(new Date().setHours(new Date().getHours() - 3)),
    status: 'active',
    votes: { 'Yes': 12, 'No': 5, 'Abstain': 2 }
  },
  {
    id: '2',
    title: 'Expand product line with new offerings',
    description: 'Proposal to expand our product lineup with new items to increase market share.',
    choices: ['Yes', 'No', 'Abstain'],
    createdBy: 'user2',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    status: 'closed',
    votes: { 'Yes': 18, 'No': 7, 'Abstain': 3 }
  },
  {
    id: '3',
    title: 'Set quarterly sales targets',
    description: 'Define our sales targets for the upcoming quarter based on market analysis.',
    choices: ['Yes', 'No', 'Abstain'],
    createdBy: 'user3',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 4)),
    status: 'closed',
    votes: { 'Yes': 20, 'No': 4, 'Abstain': 1 }
  }
];

const initialProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Overhaul the company website to improve user experience and conversion rates.',
    status: 'active',
    dueDate: new Date(2024, 4, 15)
  },
  {
    id: '2',
    name: 'Product Launch: Model X',
    description: 'Prepare and execute launch for our new product Model X.',
    status: 'completed',
    dueDate: new Date(2024, 3, 10)
  },
  {
    id: '3',
    name: 'Market Research Study',
    description: 'Conduct comprehensive market research on our key competitors.',
    status: 'active',
    dueDate: new Date(2023, 11, 20)
  }
];

export const DAOProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [proposals, setProposals] = useState<Proposal[]>(initialProposals);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [votes, setVotes] = useState<Vote[]>([]);
  
  // Proposals
  const createProposal = async (title: string, description: string, choices: string[]): Promise<boolean> => {
    try {
      const newProposal: Proposal = {
        id: Math.random().toString(36).substr(2, 9),
        title,
        description,
        choices,
        createdBy: 'currentUser', // In real app, get from auth context
        createdAt: new Date(),
        status: 'active',
        votes: {}
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
      
      // Update proposal vote counts - fixing the "always truthy" error here
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
  const createProject = async (name: string, description: string, dueDate: Date): Promise<boolean> => {
    try {
      const newProject: Project = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        description,
        status: 'active',
        dueDate
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
      castVote,
      getVotesForProposal,
      hasVoted,
      projects,
      createProject,
      updateProject,
      signAgreement
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
