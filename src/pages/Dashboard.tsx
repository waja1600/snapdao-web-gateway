
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDAO } from "@/contexts/DAOContext";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import { FileText, Vote, Clock } from "lucide-react";

const Dashboard = () => {
  const { t } = useLanguage();
  const { proposals, projects } = useDAO();
  const navigate = useNavigate();
  
  const activeProposals = proposals.filter(p => p.status === 'active');
  const totalVotes = activeProposals.reduce((total, proposal) => {
    return total + Object.values(proposal.votes || {}).reduce((sum, count) => sum + count, 0);
  }, 0);
  
  const activeProjects = projects.filter(p => p.status === 'active');
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t('dashboard')}</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t('proposals')}
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{proposals.length}</div>
              <p className="text-xs text-muted-foreground">
                {activeProposals.length} active
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t('projects')}
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projects.length}</div>
              <p className="text-xs text-muted-foreground">
                {activeProjects.length} active
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t('voting')}
              </CardTitle>
              <Vote className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalVotes}</div>
              <p className="text-xs text-muted-foreground">
                Total votes on active proposals
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Active Proposals Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{t('proposals')}</h2>
            <Button size="sm" onClick={() => navigate("/proposals")}>View All</Button>
          </div>
          
          {activeProposals.length > 0 ? (
            <div className="space-y-4">
              {activeProposals.map((proposal) => {
                const totalVotes = Object.values(proposal.votes || {}).reduce((sum, count) => sum + count, 0);
                const highestVote = Math.max(...Object.values(proposal.votes || {}).map(v => v || 0));
                const progress = totalVotes > 0 ? (highestVote / totalVotes) * 100 : 0;
                
                return (
                  <Card key={proposal.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{proposal.title}</h3>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{proposal.description}</p>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-xs text-gray-500">
                          Created {format(new Date(proposal.createdAt), 'MMM d, yyyy')}
                        </span>
                        <Button size="sm" variant="outline" onClick={() => navigate(`/proposals/${proposal.id}`)}>
                          {t('viewDetails')}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="py-6 text-center text-gray-500">
                No active proposals at the moment
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Active Projects Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{t('projects')}</h2>
            <Button size="sm" onClick={() => navigate("/projects")}>View All</Button>
          </div>
          
          {activeProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeProjects.slice(0, 4).map((project) => (
                <Card key={project.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{project.name}</h3>
                      <span className="text-xs bg-dao-blue text-white px-2 py-1 rounded">{project.status}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2 line-clamp-2">{project.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xs text-gray-500">
                        Due {format(new Date(project.dueDate), 'MMM d, yyyy')}
                      </span>
                      <Button size="sm" variant="outline" onClick={() => navigate(`/projects/${project.id}`)}>
                        Manage
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-6 text-center text-gray-500">
                No active projects at the moment
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
