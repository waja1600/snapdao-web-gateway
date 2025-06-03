
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectManagementService, ProjectTask, ExternalFreelancer, ProjectProposal } from '@/services/project-management-service';
import { MCPAssistant } from '@/components/mcp/MCPAssistant';
import { Plus, Calendar, User, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const projectManagementService = new ProjectManagementService();

const ProjectManagement: React.FC = () => {
  const { language } = useLanguage();
  const [tasks, setTasks] = useState<ProjectTask[]>(projectManagementService.getAllTasks());
  const [freelancers, setFreelancers] = useState<ExternalFreelancer[]>(projectManagementService.getAllExternalFreelancers());
  const [proposals, setProposals] = useState<ProjectProposal[]>(projectManagementService.getAllProposals());
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddFreelancer, setShowAddFreelancer] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return language === 'en' ? 'Completed' : 'مكتملة';
      case 'in_progress': return language === 'en' ? 'In Progress' : 'قيد التنفيذ';
      case 'pending': return language === 'en' ? 'Pending' : 'قيد الانتظار';
      case 'approved': return language === 'en' ? 'Approved' : 'موافق عليه';
      case 'rejected': return language === 'en' ? 'Rejected' : 'مرفوض';
      default: return status;
    }
  };

  const handleUpdateTaskStatus = (taskId: string, status: ProjectTask['status']) => {
    projectManagementService.updateTaskStatus(taskId, status);
    setTasks(projectManagementService.getAllTasks());
    toast.success(language === 'en' ? 'Task updated successfully' : 'تم تحديث المهمة بنجاح');
  };

  const handleUpdateProposalStatus = (proposalId: string, status: ProjectProposal['status']) => {
    projectManagementService.updateProposalStatus(proposalId, status);
    setProposals(projectManagementService.getAllProposals());
    toast.success(language === 'en' ? 'Proposal updated successfully' : 'تم تحديث المقترح بنجاح');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            {language === 'en' ? 'Project Management' : 'إدارة المشاريع'}
          </h1>
        </div>

        <Tabs defaultValue="tasks" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tasks">
              {language === 'en' ? 'Tasks' : 'المهام'}
            </TabsTrigger>
            <TabsTrigger value="freelancers">
              {language === 'en' ? 'External Freelancers' : 'المستقلون الخارجيون'}
            </TabsTrigger>
            <TabsTrigger value="proposals">
              {language === 'en' ? 'Proposals' : 'المقترحات'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {language === 'en' ? 'Project Tasks' : 'مهام المشروع'}
              </h2>
              <Button onClick={() => setShowAddTask(true)}>
                <Plus className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Add Task' : 'إضافة مهمة'}
              </Button>
            </div>

            <div className="grid gap-4">
              {tasks.map((task) => (
                <Card key={task.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-lg mb-2">{task.title}</h3>
                        <p className="text-gray-600 mb-3">{task.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          {task.assigneeName && (
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span>{task.assigneeName}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{task.dueDate.toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(task.status)}>
                            {getStatusText(task.status)}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {task.status !== 'completed' && (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleUpdateTaskStatus(task.id, 'in_progress')}
                              disabled={task.status === 'in_progress'}
                            >
                              <Clock className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => handleUpdateTaskStatus(task.id, 'completed')}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="freelancers" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {language === 'en' ? 'External Freelancers' : 'المستقلون الخارجيون'}
              </h2>
              <Button onClick={() => setShowAddFreelancer(true)}>
                <Plus className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Add Freelancer' : 'إضافة مستقل'}
              </Button>
            </div>

            <div className="grid gap-4">
              {freelancers.map((freelancer) => (
                <Card key={freelancer.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-lg mb-2">{freelancer.name}</h3>
                        <p className="text-gray-600 mb-3">{freelancer.email}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {freelancer.skills.map((skill, index) => (
                            <Badge key={index} variant="outline">
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <span className={`flex items-center gap-1 ${freelancer.canPropose ? 'text-green-600' : 'text-red-600'}`}>
                            {freelancer.canPropose ? '✓' : '✗'}
                            {language === 'en' ? 'Can Propose' : 'يمكنه الاقتراح'}
                          </span>
                          <span className={`flex items-center gap-1 ${freelancer.canVote ? 'text-green-600' : 'text-red-600'}`}>
                            {freelancer.canVote ? '✓' : '✗'}
                            {language === 'en' ? 'Can Vote' : 'يمكنه التصويت'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="proposals" className="space-y-4">
            <h2 className="text-xl font-semibold">
              {language === 'en' ? 'Freelancer Proposals' : 'مقترحات المستقلين'}
            </h2>

            <div className="grid gap-4">
              {proposals.map((proposal) => (
                <Card key={proposal.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium text-lg">{proposal.title}</h3>
                          <Badge className={getStatusColor(proposal.status)}>
                            {getStatusText(proposal.status)}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{proposal.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>
                            {language === 'en' ? 'Proposed by:' : 'مقترح من:'} {proposal.proposerName}
                          </span>
                          <span>{proposal.createdAt.toLocaleDateString()}</span>
                        </div>
                      </div>

                      {proposal.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm"
                            onClick={() => handleUpdateProposalStatus(proposal.id, 'approved')}
                          >
                            {language === 'en' ? 'Approve' : 'موافقة'}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleUpdateProposalStatus(proposal.id, 'rejected')}
                          >
                            {language === 'en' ? 'Reject' : 'رفض'}
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <MCPAssistant />
      </div>
    </Layout>
  );
};

export default ProjectManagement;
