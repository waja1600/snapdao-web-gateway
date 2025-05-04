
import { Project } from "../models/types";
import { toast } from "sonner";
import { generateId } from "../utils/helpers";

// Sample data for demo
const initialProjects: Project[] = [
  {
    id: '1',
    name: 'إعادة تصميم الموقع',
    description: 'تجديد موقع الشركة لتحسين تجربة المستخدم ومعدلات التحويل.',
    status: 'active',
    dueDate: new Date(2024, 4, 15),
    protocol: 'web2',
    network: 'بوابات تمويل المشروعات',
    category: 'مقدم خدمه'
  },
  {
    id: '2',
    name: 'إطلاق المنتج: النموذج X',
    description: 'التحضير وتنفيذ إطلاق منتجنا الجديد النموذج X.',
    status: 'completed',
    dueDate: new Date(2024, 3, 10),
    protocol: 'web2',
    network: 'مجموعات الشراء الجماعي',
    category: 'مورد'
  },
  {
    id: '3',
    name: 'دراسة بحث سوق',
    description: 'إجراء بحث سوقي شامل على منافسينا الرئيسيين.',
    status: 'active',
    dueDate: new Date(2023, 11, 20),
    protocol: 'web3',
    network: 'بوابة التوظيف',
    category: 'مشترى'
  }
];

export class ProjectService {
  private projects: Project[] = [...initialProjects];

  getAllProjects(): Project[] {
    return this.projects;
  }

  async createProject(
    name: string, 
    description: string, 
    dueDate: Date,
    protocol: 'web2' | 'web3' = 'web2',
    network?: string,
    category?: string
  ): Promise<boolean> {
    try {
      const newProject: Project = {
        id: generateId(),
        name,
        description,
        status: 'active',
        dueDate,
        protocol,
        network,
        category
      };
      
      this.projects = [newProject, ...this.projects];
      toast.success("Project created successfully");
      return true;
    } catch (error) {
      console.error("Failed to create project:", error);
      toast.error("Failed to create project");
      return false;
    }
  }
  
  async updateProject(id: string, data: Partial<Project>): Promise<boolean> {
    try {
      this.projects = this.projects.map(p => {
        if (p.id === id) {
          return { ...p, ...data };
        }
        return p;
      });
      
      toast.success("Project updated successfully");
      return true;
    } catch (error) {
      console.error("Failed to update project:", error);
      toast.error("Failed to update project");
      return false;
    }
  }
}
