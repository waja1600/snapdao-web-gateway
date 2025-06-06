
import { MCPService, MCPQuery, MCPAction } from './mcp-service';
import { ProjectManagementService } from './project-management-service';

export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  dependencies: string[];
  assignedTo?: string;
  estimatedDuration: number; // in hours
  actualDuration?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  steps: Omit<WorkflowStep, 'id' | 'createdAt' | 'updatedAt'>[];
  category: 'project' | 'procurement' | 'collaboration' | 'governance';
}

export class MCPWorkflowService {
  private mcpService: MCPService;
  private projectService: ProjectManagementService;
  private workflows: WorkflowStep[] = [];
  private templates: WorkflowTemplate[] = [
    {
      id: 'project-setup',
      name: 'إعداد مشروع جديد',
      description: 'سير عمل شامل لإعداد مشروع جديد',
      category: 'project',
      steps: [
        {
          title: 'تحديد نطاق المشروع',
          description: 'تحديد أهداف ومتطلبات المشروع',
          status: 'pending',
          dependencies: [],
          estimatedDuration: 4
        },
        {
          title: 'تشكيل فريق العمل',
          description: 'اختيار أعضاء الفريق وتحديد الأدوار',
          status: 'pending',
          dependencies: ['تحديد نطاق المشروع'],
          estimatedDuration: 2
        },
        {
          title: 'إعداد البيئة التقنية',
          description: 'إعداد الأدوات والبيئة التطويرية',
          status: 'pending',
          dependencies: ['تشكيل فريق العمل'],
          estimatedDuration: 6
        }
      ]
    },
    {
      id: 'supplier-evaluation',
      name: 'تقييم الموردين',
      description: 'عملية تقييم واختيار الموردين',
      category: 'procurement',
      steps: [
        {
          title: 'تحديد المتطلبات',
          description: 'تحديد المتطلبات التقنية والتجارية',
          status: 'pending',
          dependencies: [],
          estimatedDuration: 3
        },
        {
          title: 'البحث عن الموردين',
          description: 'البحث وجمع معلومات الموردين المحتملين',
          status: 'pending',
          dependencies: ['تحديد المتطلبات'],
          estimatedDuration: 5
        },
        {
          title: 'طلب العروض',
          description: 'إرسال طلبات عروض أسعار للموردين',
          status: 'pending',
          dependencies: ['البحث عن الموردين'],
          estimatedDuration: 4
        }
      ]
    }
  ];

  constructor() {
    this.mcpService = new MCPService();
    this.projectService = new ProjectManagementService();
  }

  async processWorkflowQuery(query: string): Promise<MCPQuery> {
    const workflowActions = this.generateWorkflowActions(query);
    const response = await this.mcpService.processQuery(query);
    
    // إضافة الإجراءات المتعلقة بسير العمل
    response.suggestedActions.push(...workflowActions);
    
    return response;
  }

  private generateWorkflowActions(query: string): MCPAction[] {
    const lowerQuery = query.toLowerCase();
    const actions: MCPAction[] = [];

    if (lowerQuery.includes('سير عمل') || lowerQuery.includes('workflow')) {
      actions.push({
        id: Date.now().toString() + '_workflow',
        type: 'create_task',
        description: 'إنشاء سير عمل جديد',
        parameters: { 
          workflowType: 'custom',
          title: 'سير عمل مخصص',
          steps: []
        },
        executed: false,
        userAccepted: false,
        createdAt: new Date()
      });
    }

    if (lowerQuery.includes('مشروع') || lowerQuery.includes('project')) {
      actions.push({
        id: Date.now().toString() + '_project_workflow',
        type: 'create_task',
        description: 'تطبيق قالب سير عمل المشروع',
        parameters: { 
          templateId: 'project-setup',
          projectName: 'مشروع جديد'
        },
        executed: false,
        userAccepted: false,
        createdAt: new Date()
      });
    }

    if (lowerQuery.includes('مورد') || lowerQuery.includes('supplier')) {
      actions.push({
        id: Date.now().toString() + '_supplier_workflow',
        type: 'create_task',
        description: 'تطبيق قالب تقييم الموردين',
        parameters: { 
          templateId: 'supplier-evaluation',
          category: 'procurement'
        },
        executed: false,
        userAccepted: false,
        createdAt: new Date()
      });
    }

    return actions;
  }

  createWorkflowFromTemplate(templateId: string, projectName?: string): WorkflowStep[] {
    const template = this.templates.find(t => t.id === templateId);
    if (!template) return [];

    const newSteps: WorkflowStep[] = template.steps.map((step, index) => ({
      ...step,
      id: `${templateId}_${index}_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    this.workflows.push(...newSteps);
    return newSteps;
  }

  updateWorkflowStep(stepId: string, updates: Partial<WorkflowStep>): boolean {
    const step = this.workflows.find(s => s.id === stepId);
    if (step) {
      Object.assign(step, updates, { updatedAt: new Date() });
      
      // تحديث المراحل التابعة تلقائياً
      if (step.status === 'completed') {
        this.unlockDependentSteps(step.title);
      }
      
      return true;
    }
    return false;
  }

  private unlockDependentSteps(completedStepTitle: string): void {
    this.workflows
      .filter(step => 
        step.dependencies.includes(completedStepTitle) && 
        step.status === 'blocked'
      )
      .forEach(step => {
        const allDependenciesCompleted = step.dependencies.every(dep =>
          this.workflows.some(s => s.title === dep && s.status === 'completed')
        );
        
        if (allDependenciesCompleted) {
          step.status = 'pending';
          step.updatedAt = new Date();
        }
      });
  }

  getWorkflowsByStatus(status: WorkflowStep['status']): WorkflowStep[] {
    return this.workflows.filter(step => step.status === status);
  }

  getWorkflowProgress(): { completed: number; total: number; percentage: number } {
    const total = this.workflows.length;
    const completed = this.workflows.filter(s => s.status === 'completed').length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { completed, total, percentage };
  }

  getAvailableTemplates(): WorkflowTemplate[] {
    return this.templates;
  }

  getAllWorkflows(): WorkflowStep[] {
    return this.workflows;
  }

  async executeWorkflowAction(actionId: string): Promise<boolean> {
    const action = await this.mcpService.acceptAction(actionId);
    if (action) {
      return await this.mcpService.executeAction(actionId);
    }
    return false;
  }
}
