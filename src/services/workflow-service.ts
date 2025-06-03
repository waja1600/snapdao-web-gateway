
export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  route: string;
  requiredRole?: string[];
  requiredStatus?: string[];
  nextSteps: string[];
  previousSteps: string[];
}

export interface UserWorkflow {
  currentStep: string;
  completedSteps: string[];
  availableSteps: string[];
  userRole: string;
}

export class WorkflowService {
  private workflows: { [key: string]: WorkflowStep } = {
    // Company/Group workflow
    'company-dashboard': {
      id: 'company-dashboard',
      title: 'Company Dashboard',
      description: 'Main dashboard for companies',
      route: '/dashboard',
      requiredRole: ['company'],
      requiredStatus: [],
      nextSteps: ['create-group', 'browse-deals', 'project-management'],
      previousSteps: []
    },
    'create-group': {
      id: 'create-group',
      title: 'Create Group',
      description: 'Create a new buying group',
      route: '/create-group',
      requiredRole: ['company'],
      requiredStatus: ['verified'],
      nextSteps: ['group-room', 'invite-members'],
      previousSteps: ['company-dashboard']
    },
    'group-room': {
      id: 'group-room',
      title: 'Group Room',
      description: 'Manage group activities',
      route: '/group-room',
      requiredRole: ['company', 'member'],
      requiredStatus: ['group-member'],
      nextSteps: ['voting', 'proposals', 'contracts'],
      previousSteps: ['create-group', 'browse-groups']
    },
    'voting': {
      id: 'voting',
      title: 'Voting',
      description: 'Participate in group voting',
      route: '/voting',
      requiredRole: ['company', 'member'],
      requiredStatus: ['group-member'],
      nextSteps: ['contracts', 'arbitration'],
      previousSteps: ['group-room', 'proposals']
    },
    'contracts': {
      id: 'contracts',
      title: 'Contracts',
      description: 'Manage contracts and agreements',
      route: '/contract',
      requiredRole: ['company', 'supplier', 'freelancer'],
      requiredStatus: ['verified'],
      nextSteps: ['invoices', 'project-management'],
      previousSteps: ['voting', 'proposals']
    },
    'invoices': {
      id: 'invoices',
      title: 'Invoices',
      description: 'Manage billing and invoices',
      route: '/invoices',
      requiredRole: ['company', 'supplier', 'freelancer'],
      requiredStatus: ['contract-signed'],
      nextSteps: ['payments'],
      previousSteps: ['contracts']
    },
    'payments': {
      id: 'payments',
      title: 'Payments',
      description: 'Handle payments and transactions',
      route: '/payments',
      requiredRole: ['company', 'supplier', 'freelancer'],
      requiredStatus: ['invoice-approved'],
      nextSteps: ['project-completion'],
      previousSteps: ['invoices']
    },
    // Freelancer workflow
    'freelancer-dashboard': {
      id: 'freelancer-dashboard',
      title: 'Freelancer Dashboard',
      description: 'Main dashboard for freelancers',
      route: '/dashboard',
      requiredRole: ['freelancer'],
      requiredStatus: [],
      nextSteps: ['browse-projects', 'create-proposal'],
      previousSteps: []
    },
    'browse-projects': {
      id: 'browse-projects',
      title: 'Browse Projects',
      description: 'Find available projects',
      route: '/projects',
      requiredRole: ['freelancer'],
      requiredStatus: ['verified'],
      nextSteps: ['create-proposal', 'project-details'],
      previousSteps: ['freelancer-dashboard']
    },
    'create-proposal': {
      id: 'create-proposal',
      title: 'Create Proposal',
      description: 'Submit project proposals',
      route: '/proposals',
      requiredRole: ['freelancer'],
      requiredStatus: ['verified'],
      nextSteps: ['proposal-review'],
      previousSteps: ['browse-projects']
    },
    // Supplier workflow
    'supplier-dashboard': {
      id: 'supplier-dashboard',
      title: 'Supplier Dashboard',
      description: 'Main dashboard for suppliers',
      route: '/dashboard',
      requiredRole: ['supplier'],
      requiredStatus: [],
      nextSteps: ['browse-deals', 'create-offer'],
      previousSteps: []
    },
    'browse-deals': {
      id: 'browse-deals',
      title: 'Browse Deals',
      description: 'Find group buying opportunities',
      route: '/deals',
      requiredRole: ['supplier'],
      requiredStatus: ['verified'],
      nextSteps: ['create-offer', 'deal-details'],
      previousSteps: ['supplier-dashboard']
    },
    'create-offer': {
      id: 'create-offer',
      title: 'Create Offer',
      description: 'Submit offers to groups',
      route: '/supplier-offer',
      requiredRole: ['supplier'],
      requiredStatus: ['verified'],
      nextSteps: ['offer-review'],
      previousSteps: ['browse-deals']
    }
  };

  getUserWorkflow(userRole: string, userStatus: string[] = []): UserWorkflow {
    const currentStep = this.determineCurrentStep(userRole, userStatus);
    const completedSteps = this.getCompletedSteps(userRole, userStatus);
    const availableSteps = this.getAvailableSteps(userRole, userStatus, completedSteps);

    return {
      currentStep,
      completedSteps,
      availableSteps,
      userRole
    };
  }

  private determineCurrentStep(userRole: string, userStatus: string[]): string {
    // Logic to determine current step based on user role and status
    const roleBasedSteps = {
      'company': 'company-dashboard',
      'freelancer': 'freelancer-dashboard',
      'supplier': 'supplier-dashboard',
      'supervisor': 'company-dashboard'
    };

    return roleBasedSteps[userRole as keyof typeof roleBasedSteps] || 'company-dashboard';
  }

  private getCompletedSteps(userRole: string, userStatus: string[]): string[] {
    // This would typically come from user's progress data
    return [];
  }

  private getAvailableSteps(userRole: string, userStatus: string[], completedSteps: string[]): string[] {
    const currentStep = this.determineCurrentStep(userRole, userStatus);
    const workflow = this.workflows[currentStep];
    
    if (!workflow) return [];

    return workflow.nextSteps.filter(stepId => {
      const step = this.workflows[stepId];
      if (!step) return false;

      // Check role requirements
      if (step.requiredRole && !step.requiredRole.includes(userRole)) {
        return false;
      }

      // Check status requirements
      if (step.requiredStatus && !step.requiredStatus.every(status => userStatus.includes(status))) {
        return false;
      }

      return true;
    });
  }

  getNextSteps(currentStepId: string): WorkflowStep[] {
    const currentStep = this.workflows[currentStepId];
    if (!currentStep) return [];

    return currentStep.nextSteps
      .map(stepId => this.workflows[stepId])
      .filter(Boolean);
  }

  getPreviousSteps(currentStepId: string): WorkflowStep[] {
    const currentStep = this.workflows[currentStepId];
    if (!currentStep) return [];

    return currentStep.previousSteps
      .map(stepId => this.workflows[stepId])
      .filter(Boolean);
  }
}

export const workflowService = new WorkflowService();
