
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDAO } from "@/contexts/DAOContext";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";

const Voting = () => {
  const { t } = useLanguage();
  const { proposals } = useDAO();
  const navigate = useNavigate();
  
  const activeProposals = proposals.filter(p => p.status === 'active');
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t('voting')}</h1>
          <Button onClick={() => navigate('/proposals')}>
            {t('proposals')}
          </Button>
        </div>
        
        {activeProposals.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {activeProposals.map((proposal) => {
              const totalVotes = Object.values(proposal.votes || {}).reduce((sum, count) => sum + count, 0);
              const highestChoice = Object.entries(proposal.votes || {}).reduce(
                (max, [choice, count]) => (count > max.count ? { choice, count } : max),
                { choice: "", count: 0 }
              );
              
              const progress = totalVotes > 0 
                ? (highestChoice.count / totalVotes) * 100 
                : 0;
              
              return (
                <Card key={proposal.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <h3 className="text-lg font-medium mb-2">{proposal.title}</h3>
                      <p className="text-gray-500 mb-4 line-clamp-2">{proposal.description}</p>
                      
                      <div className="space-y-4">
                        {Object.entries(proposal.votes || {}).map(([choice, count]) => {
                          const percentage = totalVotes > 0 
                            ? (count as number / totalVotes) * 100 
                            : 0;
                          
                          return (
                            <div key={choice} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>{choice}</span>
                                <span>{count} votes ({Math.round(percentage)}%)</span>
                              </div>
                              <Progress value={percentage} className="h-2" />
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="mt-6 flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          Created {format(new Date(proposal.createdAt), 'MMM d, yyyy')}
                        </div>
                        <Button onClick={() => navigate(`/proposals/${proposal.id}`)}>
                          {t('vote')}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 border border-dashed border-gray-200 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900">No active proposals to vote on</h3>
            <p className="mt-1 text-sm text-gray-500">
              Visit the proposals page to create a new proposal.
            </p>
            <Button className="mt-6" onClick={() => navigate('/proposals')}>
              Go to Proposals
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Voting;
