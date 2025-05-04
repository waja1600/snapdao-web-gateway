
import React, { createContext, useContext } from 'react';
import { Proposal, Project, protocolOptions, networkOptions, categoryOptions } from '../models/types';
import { ProposalService } from '../services/proposal-service';
import { ProjectService } from '../services/project-service';
import { AgreementService } from '../services/agreement-service';

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

// Create instances of our services
const proposalService = new ProposalService();
const projectService = new ProjectService();
const agreementService = new AgreementService();

export const DAOProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <DAOContext.Provider value={{
      // Proposal methods
      proposals: proposalService.getAllProposals(),
      createProposal: proposalService.createProposal.bind(proposalService),
      getProposal: proposalService.getProposal.bind(proposalService),
      filterProposals: proposalService.filterProposals.bind(proposalService),
      
      // Voting methods
      castVote: proposalService.castVote.bind(proposalService),
      getVotesForProposal: proposalService.getVotesForProposal.bind(proposalService),
      hasVoted: proposalService.hasVoted.bind(proposalService),
      
      // Project methods
      projects: projectService.getAllProjects(),
      createProject: projectService.createProject.bind(projectService),
      updateProject: projectService.updateProject.bind(projectService),
      
      // Agreement methods
      signAgreement: agreementService.signAgreement.bind(agreementService),
      
      // Filter options
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

// Re-export these constants for backward compatibility
export { protocolOptions, networkOptions, categoryOptions };
