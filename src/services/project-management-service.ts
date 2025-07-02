
import { toast } from 'sonner';

export interface ProjectTask {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  assigneeId?: string;
  assigneeName?: string;
  dueDate: Date;
  createdAt: Date;
}

export interface ExternalFreelancer {
  id: string;
  name: string;
  email: string;
  skills: string[];
  canPropose: boolean;
  canVote: boolean;
  verified: boolean;
  available: boolean;
}

export interface ProjectProposal {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  proposerId: string;
  proposerName: string;
  createdAt: Date;
}

export class ProjectManagementService {
  private tasks: ProjectTask[] = [
    {
      id: '1',
      title: 'Design System Setup',
      description: 'Create design system and component library',
      status: 'in_progress',
      assigneeName: 'Ahmed Hassan',
      dueDate: new Date('2024-01-15'),
      createdAt: new Date('2024-01-01')
    },
    {
      id: '2',
      title: 'API Integration',
      description: 'Integrate with external APIs',
      status: 'pending',
      assigneeName: 'Sara Mohamed',
      dueDate: new Date('2024-01-20'),
      createdAt: new Date('2024-01-02')
    }
  ];

  private externalFreelancers: ExternalFreelancer[] = [
    {
      id: '1',
      name: 'Ahmed Ali',
      email: 'ahmed@example.com',
      skills: ['React', 'Node.js', 'TypeScript'],
      canPropose: true,
      canVote: true,
      verified: true,
      available: true
    },
    {
      id: '2',
      name: 'Fatima Hassan',
      email: 'fatima@example.com',
      skills: ['UI/UX Design', 'Figma', 'Adobe XD'],
      canPropose: false,
      canVote: true,
      verified: true,
      available: true
    }
  ];

  private proposals: ProjectProposal[] = [
    {
      id: '1',
      title: 'Add Dark Mode',
      description: 'Implement dark mode theme for better user experience',
      status: 'pending',
      proposerId: '1',
      proposerName: 'Ahmed Ali',
      createdAt: new Date('2024-01-10')
    },
    {
      id: '2',
      title: 'Mobile App Development',
      description: 'Develop mobile application for iOS and Android',
      status: 'approved',
      proposerId: '2',
      proposerName: 'Fatima Hassan',
      createdAt: new Date('2024-01-08')
    }
  ];

  getAllTasks(): ProjectTask[] {
    return this.tasks;
  }

  getAllExternalFreelancers(): ExternalFreelancer[] {
    return this.externalFreelancers;
  }

  getAllProposals(): ProjectProposal[] {
    return this.proposals;
  }

  updateTaskStatus(taskId: string, status: ProjectTask['status']): void {
    const taskIndex = this.tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      this.tasks[taskIndex].status = status;
    }
  }

  updateProposalStatus(proposalId: string, status: ProjectProposal['status']): void {
    const proposalIndex = this.proposals.findIndex(proposal => proposal.id === proposalId);
    if (proposalIndex !== -1) {
      this.proposals[proposalIndex].status = status;
    }
  }

  createTask(task: Omit<ProjectTask, 'id' | 'createdAt'>): ProjectTask {
    const newTask: ProjectTask = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    this.tasks.push(newTask);
    return newTask;
  }

  addExternalFreelancer(freelancer: Omit<ExternalFreelancer, 'id'>): ExternalFreelancer {
    const newFreelancer: ExternalFreelancer = {
      ...freelancer,
      id: Date.now().toString()
    };
    this.externalFreelancers.push(newFreelancer);
    return newFreelancer;
  }

  createProposal(proposal: Omit<ProjectProposal, 'id' | 'createdAt'>): ProjectProposal {
    const newProposal: ProjectProposal = {
      ...proposal,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    this.proposals.push(newProposal);
    return newProposal;
  }
}
