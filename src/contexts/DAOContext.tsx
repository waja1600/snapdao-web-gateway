
import React, { createContext, useContext } from 'react';
import { Proposal, Project, protocolOptions, networkOptions, categoryOptions } from '../models/types';
import { ProposalService } from '../services/proposal-service';
import { ProjectService } from '../services/project-service';
import { ProjectManagementService } from '../services/project-management-service';
import { MCPService } from '../services/mcp-service';
import { AgreementService } from '../services/agreement-service';
import { ArbitrationService } from '../services/arbitration-service';

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
  
  // Project Management methods
  projectManagementService: ProjectManagementService;
  
  // MCP methods
  mcpService: MCPService;
  
  // Agreement methods
  signAgreement: (agreementId: string, password: string, otp: string) => Promise<boolean>;
  
  // Arbitration methods
  getAllDisputes: () => any[];
  getActiveDisputes: () => any[];
  getResolvedDisputes: () => any[];
  getDisputeById: (id: string) => any;
  createDispute: (disputeData: any) => any;
  updateDisputeStatus: (id: string, newStatus: string) => boolean;
  
  // Filter options
  protocolOptions: string[];
  networkOptions: string[];
  categoryOptions: string[];
}

const DAOContext = createContext<DAOContextType | undefined>(undefined);

// Create instances of our services
const proposalService = new ProposalService();
const projectService = new ProjectService();
const projectManagementService = new ProjectManagementService();
const mcpService = new MCPService();
const agreementService = new AgreementService();
const arbitrationService = new ArbitrationService();

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
      
      // Project Management service
      projectManagementService,
      
      // MCP service
      mcpService,
      
      // Agreement methods
      signAgreement: agreementService.signAgreement.bind(agreementService),
      
      // Arbitration methods
      getAllDisputes: arbitrationService.getAllDisputes.bind(arbitrationService),
      getActiveDisputes: arbitrationService.getActiveDisputes.bind(arbitrationService),
      getResolvedDisputes: arbitrationService.getResolvedDisputes.bind(arbitrationService),
      getDisputeById: arbitrationService.getDisputeById.bind(arbitrationService),
      createDispute: arbitrationService.createDispute.bind(arbitrationService),
      updateDisputeStatus: arbitrationService.updateDisputeStatus.bind(arbitrationService),
      
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
