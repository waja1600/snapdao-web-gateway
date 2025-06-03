
export interface ProjectTask {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  assigneeId?: string;
  assigneeName?: string;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExternalFreelancer {
  id: string;
  name: string;
  email: string;
  skills: string[];
  canPropose: boolean;
  canVote: boolean;
  joinedAt: Date;
}

export interface ProjectProposal {
  id: string;
  projectId: string;
  proposerId: string;
  proposerName: string;
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

export class ProjectManagementService {
  private tasks: ProjectTask[] = [
    {
      id: '1',
      projectId: '1',
      title: 'تصميم الواجهة الرئيسية',
      description: 'إنشاء تصميم الصفحة الرئيسية للموقع',
      status: 'in_progress',
      assigneeId: 'freelancer-1',
      assigneeName: 'أحمد محمد',
      dueDate: new Date(2024, 2, 15),
      createdAt: new Date(2024, 1, 1),
      updatedAt: new Date(2024, 1, 10)
    },
    {
      id: '2',
      projectId: '1',
      title: 'تطوير API الخلفي',
      description: 'بناء واجهات برمجة التطبيقات الخلفية',
      status: 'pending',
      dueDate: new Date(2024, 2, 20),
      createdAt: new Date(2024, 1, 5),
      updatedAt: new Date(2024, 1, 5)
    }
  ];

  private externalFreelancers: ExternalFreelancer[] = [
    {
      id: 'freelancer-1',
      name: 'أحمد محمد',
      email: 'ahmed@example.com',
      skills: ['React', 'TypeScript', 'UI/UX'],
      canPropose: true,
      canVote: false,
      joinedAt: new Date(2024, 0, 15)
    },
    {
      id: 'freelancer-2',
      name: 'سارة أحمد',
      email: 'sara@example.com',
      skills: ['Node.js', 'Database', 'API'],
      canPropose: true,
      canVote: false,
      joinedAt: new Date(2024, 0, 20)
    }
  ];

  private proposals: ProjectProposal[] = [
    {
      id: '1',
      projectId: '1',
      proposerId: 'freelancer-1',
      proposerName: 'أحمد محمد',
      title: 'إضافة ميزة الدردشة المباشرة',
      description: 'اقتراح إضافة نظام دردشة مباشر للتواصل بين أعضاء المجموعة',
      status: 'pending',
      createdAt: new Date(2024, 1, 10)
    }
  ];

  getAllTasks(): ProjectTask[] {
    return this.tasks;
  }

  getTasksByProject(projectId: string): ProjectTask[] {
    return this.tasks.filter(task => task.projectId === projectId);
  }

  createTask(taskData: Omit<ProjectTask, 'id' | 'createdAt' | 'updatedAt'>): ProjectTask {
    const newTask: ProjectTask = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.tasks.push(newTask);
    return newTask;
  }

  updateTaskStatus(taskId: string, status: ProjectTask['status']): boolean {
    const taskIndex = this.tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      this.tasks[taskIndex].status = status;
      this.tasks[taskIndex].updatedAt = new Date();
      return true;
    }
    return false;
  }

  getAllExternalFreelancers(): ExternalFreelancer[] {
    return this.externalFreelancers;
  }

  addExternalFreelancer(freelancerData: Omit<ExternalFreelancer, 'id' | 'joinedAt'>): ExternalFreelancer {
    const newFreelancer: ExternalFreelancer = {
      ...freelancerData,
      id: Date.now().toString(),
      joinedAt: new Date()
    };
    this.externalFreelancers.push(newFreelancer);
    return newFreelancer;
  }

  getAllProposals(): ProjectProposal[] {
    return this.proposals;
  }

  getProposalsByProject(projectId: string): ProjectProposal[] {
    return this.proposals.filter(proposal => proposal.projectId === projectId);
  }

  createProposal(proposalData: Omit<ProjectProposal, 'id' | 'createdAt'>): ProjectProposal {
    const newProposal: ProjectProposal = {
      ...proposalData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    this.proposals.push(newProposal);
    return newProposal;
  }

  updateProposalStatus(proposalId: string, status: ProjectProposal['status']): boolean {
    const proposalIndex = this.proposals.findIndex(proposal => proposal.id === proposalId);
    if (proposalIndex !== -1) {
      this.proposals[proposalIndex].status = status;
      return true;
    }
    return false;
  }
}
