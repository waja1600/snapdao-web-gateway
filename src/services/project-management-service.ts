
export interface ProjectTask {
  id: string;
  title: string;
  description: string;
  assigneeId?: string;
  assigneeName?: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExternalFreelancer {
  id: string;
  name: string;
  email: string;
  skills: string[];
  hourlyRate: number;
  rating: number;
  completedProjects: number;
  canPropose: boolean;
  canVote: boolean;
  createdAt: Date;
}

export interface ProjectProposal {
  id: string;
  title: string;
  description: string;
  proposerId: string;
  proposerName: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
}

export class ProjectManagementService {
  private tasks: ProjectTask[] = [
    {
      id: '1',
      title: 'تصميم واجهة المستخدم',
      description: 'تصميم واجهات المستخدم للمشروع الجديد',
      assigneeId: 'user1',
      assigneeName: 'أحمد محمد',
      status: 'in_progress',
      priority: 'high',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      updatedAt: new Date()
    },
    {
      id: '2',
      title: 'تطوير API الخلفي',
      description: 'تطوير واجهات برمجة التطبيقات للنظام',
      assigneeId: 'user2',
      assigneeName: 'سارة أحمد',
      status: 'pending',
      priority: 'medium',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      updatedAt: new Date()
    }
  ];

  private externalFreelancers: ExternalFreelancer[] = [
    {
      id: '1',
      name: 'محمد علي',
      email: 'mohamed@example.com',
      skills: ['React', 'Node.js', 'MongoDB'],
      hourlyRate: 25,
      rating: 4.8,
      completedProjects: 15,
      canPropose: true,
      canVote: false,
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      name: 'فاطمة حسن',
      email: 'fatima@example.com',
      skills: ['UI/UX Design', 'Figma', 'Adobe XD'],
      hourlyRate: 30,
      rating: 4.9,
      completedProjects: 22,
      canPropose: true,
      canVote: true,
      createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000)
    }
  ];

  private proposals: ProjectProposal[] = [
    {
      id: '1',
      title: 'اقتراح تحسين الأداء',
      description: 'اقتراح لتحسين أداء التطبيق وتسريع التحميل',
      proposerId: '1',
      proposerName: 'محمد علي',
      status: 'pending',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      title: 'تطوير ميزة جديدة',
      description: 'اقتراح لإضافة ميزة التنبيهات الفورية',
      proposerId: '2',
      proposerName: 'فاطمة حسن',
      status: 'approved',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      reviewedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      reviewedBy: 'admin'
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

  updateTaskStatus(taskId: string, status: ProjectTask['status']): boolean {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.status = status;
      task.updatedAt = new Date();
      return true;
    }
    return false;
  }

  updateProposalStatus(proposalId: string, status: ProjectProposal['status']): boolean {
    const proposal = this.proposals.find(p => p.id === proposalId);
    if (proposal) {
      proposal.status = status;
      proposal.reviewedAt = new Date();
      proposal.reviewedBy = 'current_user';
      return true;
    }
    return false;
  }

  addTask(task: Omit<ProjectTask, 'id' | 'createdAt' | 'updatedAt'>): ProjectTask {
    const newTask: ProjectTask = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.tasks.push(newTask);
    return newTask;
  }

  addFreelancer(freelancer: Omit<ExternalFreelancer, 'id' | 'createdAt'>): ExternalFreelancer {
    const newFreelancer: ExternalFreelancer = {
      ...freelancer,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    this.externalFreelancers.push(newFreelancer);
    return newFreelancer;
  }

  addProposal(proposal: Omit<ProjectProposal, 'id' | 'createdAt'>): ProjectProposal {
    const newProposal: ProjectProposal = {
      ...proposal,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    this.proposals.push(newProposal);
    return newProposal;
  }
}
