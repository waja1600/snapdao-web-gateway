export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assigneeId?: string;
  assigneeName?: string;
  createdBy: string;
  createdAt: Date;
  dueDate: Date;
  completedAt?: Date;
  tags: string[];
  attachments: string[];
  estimatedHours?: number;
  actualHours?: number;
}

// Add alias for backward compatibility
export type ProjectTask = Task;

export interface Proposal {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  createdBy: string;
  createdAt: Date;
  votingDeadline?: Date;
  votes: {
    approve: number;
    reject: number;
    abstain: number;
  };
  requiredApprovals: number;
  category: string;
  budget?: number;
  attachments: string[];
}

// Add alias for backward compatibility
export type ProjectProposal = Proposal;

export interface ExternalFreelancer {
  id: string;
  name: string;
  email: string;
  skills: string[];
  hourlyRate: number;
  rating: number;
  completedProjects: number;
  availability: 'available' | 'busy' | 'unavailable';
  joinedAt: Date;
  portfolio: string[];
  languages: string[];
  timezone: string;
  canPropose?: boolean;
  canVote?: boolean;
}

export class ProjectManagementService {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'تطوير الموقع الإلكتروني',
      description: 'إنشاء موقع إلكتروني متجاوب للشركة',
      status: 'in_progress',
      priority: 'high',
      assigneeId: 'freelancer-1',
      assigneeName: 'أحمد علي',
      createdBy: 'user-1',
      createdAt: new Date('2024-01-15'),
      dueDate: new Date('2024-02-15'),
      tags: ['web-development', 'react', 'responsive'],
      attachments: [],
      estimatedHours: 120,
      actualHours: 45
    },
    {
      id: '2',
      title: 'تصميم تطبيق الهاتف',
      description: 'تصميم واجهة المستخدم لتطبيق الهاتف المحمول',
      status: 'pending',
      priority: 'medium',
      assigneeId: 'freelancer-2',
      assigneeName: 'سارة محمد',
      createdBy: 'user-1',
      createdAt: new Date('2024-01-20'),
      dueDate: new Date('2024-03-01'),
      tags: ['ui-design', 'mobile', 'figma'],
      attachments: [],
      estimatedHours: 80
    },
    {
      id: '3',
      title: 'إعداد قاعدة البيانات',
      description: 'تصميم وإعداد قاعدة البيانات للمشروع',
      status: 'completed',
      priority: 'critical',
      assigneeId: 'freelancer-3',
      assigneeName: 'عمر حسن',
      createdBy: 'user-1',
      createdAt: new Date('2024-01-10'),
      dueDate: new Date('2024-01-25'),
      completedAt: new Date('2024-01-24'),
      tags: ['database', 'postgresql', 'setup'],
      attachments: [],
      estimatedHours: 40,
      actualHours: 38
    }
  ];

  private proposals: Proposal[] = [
    {
      id: '1',
      title: 'مقترح تطوير ميزة جديدة',
      description: 'إضافة نظام إشعارات فوري للمنصة',
      status: 'pending',
      createdBy: 'user-1',
      createdAt: new Date('2024-01-25'),
      votingDeadline: new Date('2024-02-05'),
      votes: { approve: 3, reject: 1, abstain: 0 },
      requiredApprovals: 5,
      category: 'feature-development',
      budget: 15000,
      attachments: []
    },
    {
      id: '2',
      title: 'زيادة الميزانية المخصصة للتسويق',
      description: 'طلب زيادة ميزانية التسويق بنسبة 25%',
      status: 'approved',
      createdBy: 'user-2',
      createdAt: new Date('2024-01-20'),
      votes: { approve: 6, reject: 1, abstain: 1 },
      requiredApprovals: 5,
      category: 'budget',
      budget: 25000,
      attachments: []
    }
  ];

  private freelancers: ExternalFreelancer[] = [
    {
      id: 'freelancer-1',
      name: 'أحمد علي',
      email: 'ahmed.ali@example.com',
      skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
      hourlyRate: 45,
      rating: 4.8,
      completedProjects: 23,
      availability: 'busy',
      joinedAt: new Date('2023-06-15'),
      portfolio: ['project1.com', 'project2.com'],
      languages: ['Arabic', 'English'],
      timezone: 'UTC+3',
      canPropose: true,
      canVote: true
    },
    {
      id: 'freelancer-2',
      name: 'سارة محمد',
      email: 'sara.mohammed@example.com',
      skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'Sketch'],
      hourlyRate: 40,
      rating: 4.9,
      completedProjects: 31,
      availability: 'available',
      joinedAt: new Date('2023-08-20'),
      portfolio: ['design1.com', 'design2.com'],
      languages: ['Arabic', 'English', 'French'],
      timezone: 'UTC+2',
      canPropose: true,
      canVote: false
    },
    {
      id: 'freelancer-3',
      name: 'عمر حسن',
      email: 'omar.hassan@example.com',
      skills: ['PostgreSQL', 'Python', 'Django', 'AWS'],
      hourlyRate: 50,
      rating: 4.7,
      completedProjects: 18,
      availability: 'available',
      joinedAt: new Date('2023-09-10'),
      portfolio: ['backend1.com', 'api2.com'],
      languages: ['Arabic', 'English'],
      timezone: 'UTC+3',
      canPropose: false,
      canVote: true
    }
  ];

  // Task Management Methods
  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }

  createTask(taskData: Omit<Task, 'id' | 'createdAt'>): Task {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id: string, updates: Partial<Task>): Task | null {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) return null;

    this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updates };
    return this.tasks[taskIndex];
  }

  updateTaskStatus(id: string, status: Task['status']): Task | null {
    return this.updateTask(id, { status });
  }

  deleteTask(id: string): boolean {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) return false;

    this.tasks.splice(taskIndex, 1);
    return true;
  }

  getTasksByStatus(status: Task['status']): Task[] {
    return this.tasks.filter(task => task.status === status);
  }

  getTasksByAssignee(assigneeId: string): Task[] {
    return this.tasks.filter(task => task.assigneeId === assigneeId);
  }

  // Proposal Management Methods
  getAllProposals(): Proposal[] {
    return this.proposals;
  }

  getProposalById(id: string): Proposal | undefined {
    return this.proposals.find(proposal => proposal.id === id);
  }

  createProposal(proposalData: Omit<Proposal, 'id' | 'createdAt' | 'votes'>): Proposal {
    const newProposal: Proposal = {
      ...proposalData,
      id: Date.now().toString(),
      createdAt: new Date(),
      votes: { approve: 0, reject: 0, abstain: 0 }
    };
    this.proposals.push(newProposal);
    return newProposal;
  }

  updateProposal(id: string, updates: Partial<Proposal>): Proposal | null {
    const proposalIndex = this.proposals.findIndex(proposal => proposal.id === id);
    if (proposalIndex === -1) return null;

    this.proposals[proposalIndex] = { ...this.proposals[proposalIndex], ...updates };
    return this.proposals[proposalIndex];
  }

  updateProposalStatus(id: string, status: Proposal['status']): Proposal | null {
    return this.updateProposal(id, { status });
  }

  voteOnProposal(id: string, voteType: 'approve' | 'reject' | 'abstain'): boolean {
    const proposal = this.getProposalById(id);
    if (!proposal) return false;

    proposal.votes[voteType]++;
    
    // Check if proposal should be auto-approved
    if (proposal.votes.approve >= proposal.requiredApprovals) {
      proposal.status = 'approved';
    }
    
    return true;
  }

  // Freelancer Management Methods
  getAllExternalFreelancers(): ExternalFreelancer[] {
    return this.freelancers;
  }

  getFreelancerById(id: string): ExternalFreelancer | undefined {
    return this.freelancers.find(freelancer => freelancer.id === id);
  }

  addExternalFreelancer(freelancerData: Omit<ExternalFreelancer, 'id' | 'joinedAt'>): ExternalFreelancer {
    const newFreelancer: ExternalFreelancer = {
      ...freelancerData,
      id: Date.now().toString(),
      joinedAt: new Date()
    };
    this.freelancers.push(newFreelancer);
    return newFreelancer;
  }

  updateFreelancer(id: string, updates: Partial<ExternalFreelancer>): ExternalFreelancer | null {
    const freelancerIndex = this.freelancers.findIndex(freelancer => freelancer.id === id);
    if (freelancerIndex === -1) return null;

    this.freelancers[freelancerIndex] = { ...this.freelancers[freelancerIndex], ...updates };
    return this.freelancers[freelancerIndex];
  }

  searchFreelancers(criteria: {
    skills?: string[];
    maxHourlyRate?: number;
    minRating?: number;
    availability?: ExternalFreelancer['availability'];
  }): ExternalFreelancer[] {
    return this.freelancers.filter(freelancer => {
      if (criteria.skills && !criteria.skills.some(skill => 
        freelancer.skills.some(fSkill => fSkill.toLowerCase().includes(skill.toLowerCase()))
      )) {
        return false;
      }
      
      if (criteria.maxHourlyRate && freelancer.hourlyRate > criteria.maxHourlyRate) {
        return false;
      }
      
      if (criteria.minRating && freelancer.rating < criteria.minRating) {
        return false;
      }
      
      if (criteria.availability && freelancer.availability !== criteria.availability) {
        return false;
      }
      
      return true;
    });
  }

  // Analytics Methods
  getProjectStatistics() {
    const totalTasks = this.tasks.length;
    const completedTasks = this.tasks.filter(t => t.status === 'completed').length;
    const pendingTasks = this.tasks.filter(t => t.status === 'pending').length;
    const inProgressTasks = this.tasks.filter(t => t.status === 'in_progress').length;
    
    const totalProposals = this.proposals.length;
    const approvedProposals = this.proposals.filter(p => p.status === 'approved').length;
    const pendingProposals = this.proposals.filter(p => p.status === 'pending').length;
    
    const activeFreelancers = this.freelancers.filter(f => f.availability === 'available').length;
    
    return {
      tasks: {
        total: totalTasks,
        completed: completedTasks,
        pending: pendingTasks,
        inProgress: inProgressTasks,
        completionRate: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
      },
      proposals: {
        total: totalProposals,
        approved: approvedProposals,
        pending: pendingProposals,
        approvalRate: totalProposals > 0 ? (approvedProposals / totalProposals) * 100 : 0
      },
      freelancers: {
        total: this.freelancers.length,
        active: activeFreelancers,
        averageRating: this.freelancers.reduce((sum, f) => sum + f.rating, 0) / this.freelancers.length || 0
      }
    };
  }
}
