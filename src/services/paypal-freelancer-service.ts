
export interface FreelancerProfile {
  id: string;
  name: string;
  email: string;
  skills: string[];
  hourlyRate: number;
  currency: string;
  paypalEmail: string;
  rating: number;
  completedProjects: number;
  isVerified: boolean;
  portfolio: PortfolioItem[];
  availability: 'available' | 'busy' | 'unavailable';
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  projectUrl?: string;
  skills: string[];
  completedDate: Date;
}

export interface FreelancerProject {
  id: string;
  title: string;
  description: string;
  clientId: string;
  freelancerId: string;
  budget: number;
  currency: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  createdDate: Date;
  startDate?: Date;
  completionDate?: Date;
  milestones: ProjectMilestone[];
  requiredSkills: string[];
}

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  dueDate: Date;
  status: 'pending' | 'in_progress' | 'completed' | 'paid';
  deliverables: string[];
}

export interface PayPalPayment {
  id: string;
  payerId: string;
  payeeEmail: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  createdDate: Date;
  completedDate?: Date;
  projectId?: string;
  milestoneId?: string;
}

export class PayPalFreelancerService {
  private freelancers: FreelancerProfile[] = [];
  private projects: FreelancerProject[] = [];
  private payments: PayPalPayment[] = [];

  registerFreelancer(profile: Omit<FreelancerProfile, 'id' | 'rating' | 'completedProjects' | 'isVerified'>): FreelancerProfile {
    const freelancer: FreelancerProfile = {
      ...profile,
      id: Date.now().toString(),
      rating: 0,
      completedProjects: 0,
      isVerified: false
    };

    this.freelancers.push(freelancer);
    return freelancer;
  }

  createProject(project: Omit<FreelancerProject, 'id' | 'status' | 'createdDate' | 'milestones'>): FreelancerProject {
    const newProject: FreelancerProject = {
      ...project,
      id: Date.now().toString(),
      status: 'open',
      createdDate: new Date(),
      milestones: []
    };

    this.projects.push(newProject);
    return newProject;
  }

  addMilestone(projectId: string, milestone: Omit<ProjectMilestone, 'id' | 'status'>): void {
    const project = this.projects.find(p => p.id === projectId);
    if (project) {
      const newMilestone: ProjectMilestone = {
        ...milestone,
        id: Date.now().toString(),
        status: 'pending'
      };
      project.milestones.push(newMilestone);
    }
  }

  assignFreelancer(projectId: string, freelancerId: string): void {
    const project = this.projects.find(p => p.id === projectId);
    if (project) {
      project.freelancerId = freelancerId;
      project.status = 'in_progress';
      project.startDate = new Date();
    }
  }

  async processPayPalPayment(params: {
    payerId: string;
    payeeEmail: string;
    amount: number;
    currency: string;
    projectId?: string;
    milestoneId?: string;
  }): Promise<PayPalPayment> {
    // Simulate PayPal API call
    const payment: PayPalPayment = {
      id: Date.now().toString(),
      payerId: params.payerId,
      payeeEmail: params.payeeEmail,
      amount: params.amount,
      currency: params.currency,
      status: 'pending',
      createdDate: new Date(),
      projectId: params.projectId,
      milestoneId: params.milestoneId
    };

    this.payments.push(payment);

    // Simulate async PayPal processing
    setTimeout(() => {
      payment.status = 'completed';
      payment.completedDate = new Date();
      payment.transactionId = 'PP-' + Date.now().toString();

      // Update milestone status if applicable
      if (params.milestoneId && params.projectId) {
        this.updateMilestoneStatus(params.projectId, params.milestoneId, 'paid');
      }
    }, 2000);

    return payment;
  }

  private updateMilestoneStatus(projectId: string, milestoneId: string, status: ProjectMilestone['status']): void {
    const project = this.projects.find(p => p.id === projectId);
    if (project) {
      const milestone = project.milestones.find(m => m.id === milestoneId);
      if (milestone) {
        milestone.status = status;

        // Check if all milestones are completed
        if (project.milestones.every(m => m.status === 'paid')) {
          project.status = 'completed';
          project.completionDate = new Date();
          this.updateFreelancerStats(project.freelancerId);
        }
      }
    }
  }

  private updateFreelancerStats(freelancerId: string): void {
    const freelancer = this.freelancers.find(f => f.id === freelancerId);
    if (freelancer) {
      freelancer.completedProjects++;
      // Update rating based on completed projects (simplified logic)
      freelancer.rating = Math.min(5, 3 + (freelancer.completedProjects * 0.1));
    }
  }

  searchFreelancers(criteria: {
    skills?: string[];
    minRating?: number;
    maxHourlyRate?: number;
    availability?: FreelancerProfile['availability'];
  }): FreelancerProfile[] {
    return this.freelancers.filter(freelancer => {
      if (criteria.skills && !criteria.skills.some(skill => freelancer.skills.includes(skill))) {
        return false;
      }
      if (criteria.minRating && freelancer.rating < criteria.minRating) {
        return false;
      }
      if (criteria.maxHourlyRate && freelancer.hourlyRate > criteria.maxHourlyRate) {
        return false;
      }
      if (criteria.availability && freelancer.availability !== criteria.availability) {
        return false;
      }
      return true;
    });
  }

  getFreelancerProjects(freelancerId: string): FreelancerProject[] {
    return this.projects.filter(project => project.freelancerId === freelancerId);
  }

  getClientProjects(clientId: string): FreelancerProject[] {
    return this.projects.filter(project => project.clientId === clientId);
  }

  getPaymentHistory(userId: string): PayPalPayment[] {
    return this.payments.filter(payment => 
      payment.payerId === userId || 
      this.freelancers.some(f => f.email === payment.payeeEmail && f.id === userId)
    );
  }

  getAllFreelancers(): FreelancerProfile[] {
    return this.freelancers;
  }

  getAllProjects(): FreelancerProject[] {
    return this.projects;
  }
}

export const freelancerService = new PayPalFreelancerService();
