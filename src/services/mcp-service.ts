
import { toast } from "sonner";
import { generateId } from "../utils/helpers";

export interface MCPCommand {
  id: string;
  userId: string;
  command: string;
  interpretation: string;
  suggestedActions: MCPAction[];
  status: 'pending' | 'accepted' | 'rejected' | 'executed' | 'manual';
  acceptedAt?: Date;
  executedAt?: Date;
  createdAt: Date;
}

export interface MCPAction {
  id: string;
  type: 'create_group' | 'invite_member' | 'create_proposal' | 'vote' | 'create_project' | 'assign_task' | 'send_message' | 'update_profile' | 'other';
  description: string;
  parameters: Record<string, any>;
  requiresConfirmation: boolean;
}

export interface MCPSuggestion {
  id: string;
  title: string;
  description: string;
  confidence: number;
  actions: MCPAction[];
}

export class MCPService {
  private commands: MCPCommand[] = [];
  private isProcessing = false;

  async processUserQuery(query: string, userId: string): Promise<MCPSuggestion[]> {
    try {
      this.isProcessing = true;
      
      // Simulate AI processing
      const suggestions = await this.analyzeQuery(query);
      
      // Save command for tracking
      const command: MCPCommand = {
        id: generateId(),
        userId,
        command: query,
        interpretation: this.generateInterpretation(query),
        suggestedActions: suggestions.flatMap(s => s.actions),
        status: 'pending',
        createdAt: new Date()
      };
      
      this.commands.push(command);
      
      return suggestions;
    } catch (error) {
      console.error('Error processing MCP query:', error);
      toast.error('حدث خطأ في معالجة الطلب');
      return [];
    } finally {
      this.isProcessing = false;
    }
  }

  private async analyzeQuery(query: string): Promise<MCPSuggestion[]> {
    // Simulate AI analysis based on common patterns
    const lowerQuery = query.toLowerCase();
    const suggestions: MCPSuggestion[] = [];

    // Create Group Pattern
    if (lowerQuery.includes('إنشاء مجموعة') || lowerQuery.includes('مجموعة جديدة') || lowerQuery.includes('create group')) {
      suggestions.push({
        id: generateId(),
        title: 'إنشاء مجموعة جديدة',
        description: 'أريد مساعدتك في إنشاء مجموعة جديدة للشراء الجماعي أو التسويق التعاوني',
        confidence: 0.9,
        actions: [{
          id: generateId(),
          type: 'create_group',
          description: 'إنشاء مجموعة جديدة',
          parameters: { 
            name: this.extractGroupName(query) || 'مجموعة جديدة',
            type: 'cooperative_buying' 
          },
          requiresConfirmation: true
        }]
      });
    }

    // Invite Member Pattern
    if (lowerQuery.includes('دعوة') || lowerQuery.includes('invite') || lowerQuery.includes('إضافة عضو')) {
      suggestions.push({
        id: generateId(),
        title: 'دعوة أعضاء جدد',
        description: 'يمكنني مساعدتك في دعوة أعضاء جدد أو مستقلين للمجموعة',
        confidence: 0.85,
        actions: [{
          id: generateId(),
          type: 'invite_member',
          description: 'دعوة عضو أو مستقل',
          parameters: { 
            email: this.extractEmail(query),
            role: 'freelancer' 
          },
          requiresConfirmation: true
        }]
      });
    }

    // Create Proposal Pattern
    if (lowerQuery.includes('اقتراح') || lowerQuery.includes('تصويت') || lowerQuery.includes('proposal') || lowerQuery.includes('vote')) {
      suggestions.push({
        id: generateId(),
        title: 'إنشاء اقتراح للتصويت',
        description: 'سأساعدك في إنشاء اقتراح جديد للتصويت عليه من قبل الأعضاء',
        confidence: 0.8,
        actions: [{
          id: generateId(),
          type: 'create_proposal',
          description: 'إنشاء اقتراح جديد',
          parameters: { 
            title: this.extractProposalTitle(query) || 'اقتراح جديد',
            description: query 
          },
          requiresConfirmation: true
        }]
      });
    }

    // Project Management Pattern
    if (lowerQuery.includes('مشروع') || lowerQuery.includes('مهمة') || lowerQuery.includes('project') || lowerQuery.includes('task')) {
      suggestions.push({
        id: generateId(),
        title: 'إدارة المشاريع والمهام',
        description: 'يمكنني مساعدتك في إنشاء مشروع جديد أو إدارة المهام',
        confidence: 0.75,
        actions: [{
          id: generateId(),
          type: 'create_project',
          description: 'إنشاء مشروع جديد',
          parameters: { 
            name: this.extractProjectName(query) || 'مشروع جديد',
            description: query 
          },
          requiresConfirmation: true
        }]
      });
    }

    // Default helper suggestion
    if (suggestions.length === 0) {
      suggestions.push({
        id: generateId(),
        title: 'مساعدة عامة',
        description: 'يمكنني مساعدتك في استخدام المنصة. ما الذي تريد فعله؟',
        confidence: 0.5,
        actions: [{
          id: generateId(),
          type: 'other',
          description: 'عرض خيارات المساعدة',
          parameters: { query },
          requiresConfirmation: false
        }]
      });
    }

    return suggestions;
  }

  private generateInterpretation(query: string): string {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('إنشاء مجموعة')) {
      return 'المستخدم يريد إنشاء مجموعة جديدة';
    }
    if (lowerQuery.includes('دعوة')) {
      return 'المستخدم يريد دعوة أعضاء جدد';
    }
    if (lowerQuery.includes('اقتراح')) {
      return 'المستخدم يريد إنشاء اقتراح للتصويت';
    }
    if (lowerQuery.includes('مشروع')) {
      return 'المستخدم يريد إدارة المشاريع';
    }
    
    return 'طلب عام للمساعدة';
  }

  private extractGroupName(query: string): string | null {
    const patterns = [
      /مجموعة (.+)/,
      /group (.+)/,
      /إنشاء (.+)/
    ];
    
    for (const pattern of patterns) {
      const match = query.match(pattern);
      if (match) return match[1].trim();
    }
    
    return null;
  }

  private extractEmail(query: string): string | null {
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const match = query.match(emailPattern);
    return match ? match[0] : null;
  }

  private extractProposalTitle(query: string): string | null {
    if (query.length > 100) {
      return query.substring(0, 50) + '...';
    }
    return query;
  }

  private extractProjectName(query: string): string | null {
    const patterns = [
      /مشروع (.+)/,
      /project (.+)/
    ];
    
    for (const pattern of patterns) {
      const match = query.match(pattern);
      if (match) return match[1].trim();
    }
    
    return null;
  }

  async acceptSuggestion(commandId: string, suggestionId: string): Promise<boolean> {
    try {
      const command = this.commands.find(c => c.id === commandId);
      if (!command) return false;

      command.status = 'accepted';
      command.acceptedAt = new Date();

      // Log acceptance in database (simulation)
      console.log('MCP Command Accepted:', {
        commandId,
        suggestionId,
        acceptedAt: new Date(),
        userId: command.userId
      });

      toast.success('تم قبول الاقتراح وسيتم التنفيذ');
      
      // Execute the action
      await this.executeCommand(command);
      
      return true;
    } catch (error) {
      console.error('Error accepting suggestion:', error);
      toast.error('فشل في قبول الاقتراح');
      return false;
    }
  }

  async rejectSuggestion(commandId: string): Promise<boolean> {
    try {
      const command = this.commands.find(c => c.id === commandId);
      if (!command) return false;

      command.status = 'rejected';
      toast.success('تم رفض الاقتراح');
      return true;
    } catch (error) {
      console.error('Error rejecting suggestion:', error);
      return false;
    }
  }

  async switchToManual(commandId: string): Promise<boolean> {
    try {
      const command = this.commands.find(c => c.id === commandId);
      if (!command) return false;

      command.status = 'manual';
      toast.success('تم التحويل للتنفيذ اليدوي');
      return true;
    } catch (error) {
      console.error('Error switching to manual:', error);
      return false;
    }
  }

  private async executeCommand(command: MCPCommand): Promise<void> {
    try {
      command.status = 'executed';
      command.executedAt = new Date();
      
      // Simulate execution
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('تم تنفيذ الأمر بنجاح');
    } catch (error) {
      console.error('Error executing command:', error);
      toast.error('فشل في تنفيذ الأمر');
    }
  }

  getCommandHistory(userId: string): MCPCommand[] {
    return this.commands.filter(c => c.userId === userId);
  }

  isProcessingQuery(): boolean {
    return this.isProcessing;
  }
}

export const mcpService = new MCPService();
