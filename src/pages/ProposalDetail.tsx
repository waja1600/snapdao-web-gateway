
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDAO } from "@/contexts/DAOContext";
import { useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import { ArrowLeft, Check, FileText, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const ProposalDetail = () => {
  const { t } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const { getProposal, castVote, hasVoted, getVotesForProposal } = useDAO();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [proposal, setProposal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [selectedChoice, setSelectedChoice] = useState<string>("");
  const [userVoted, setUserVoted] = useState(false);
  const [votingInProgress, setVotingInProgress] = useState(false);
  
  useEffect(() => {
    if (id) {
      const proposalData = getProposal(id);
      if (proposalData) {
        setProposal(proposalData);
        setVotes(getVotesForProposal(id));
        if (user) {
          setUserVoted(hasVoted(id, user.id));
        }
      } else {
        toast.error("Proposal not found");
        navigate("/proposals");
      }
      setLoading(false);
    }
  }, [id, getProposal, user, hasVoted, getVotesForProposal, navigate]);
  
  const totalVotes = Object.values(votes).reduce((sum, count) => sum + count, 0);
  
  const getVotePercentage = (choice: string): number => {
    if (!votes[choice] || totalVotes === 0) return 0;
    return (votes[choice] / totalVotes) * 100;
  };
  
  const handleVote = async () => {
    if (!user) {
      toast.error("You must be logged in to vote");
      navigate("/login");
      return;
    }
    
    if (!selectedChoice) {
      toast.error("Please select an option to vote");
      return;
    }
    
    setVotingInProgress(true);
    
    try {
      const success = await castVote(proposal.id, selectedChoice);
      if (success) {
        setUserVoted(true);
        setVotes(getVotesForProposal(proposal.id));
      }
    } finally {
      setVotingInProgress(false);
    }
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <p>{t('loading')}</p>
        </div>
      </Layout>
    );
  }
  
  if (!proposal) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-64">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-lg font-medium">Proposal not found</h3>
          <Button className="mt-4" onClick={() => navigate("/proposals")}>
            Back to Proposals
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="space-y-6">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate("/proposals")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Proposals
        </Button>
        
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t('voteOnProposal')}</h1>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              proposal.status === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {proposal.status === 'active' ? 'Active' : 'Closed'}
            </span>
          </div>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">{proposal.title}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                <FileText className="h-4 w-4" />
                <span>Created on {format(new Date(proposal.createdAt), 'MMM d, yyyy')}</span>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-base font-medium mb-2">{t('description')}</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{proposal.description}</p>
            </div>
            
            {proposal.status === 'active' && !userVoted && (
              <div className="mb-8">
                <h3 className="text-base font-medium mb-4">{t('choices')}</h3>
                <div className="space-y-3">
                  {proposal.choices.map((choice: string) => (
                    <div
                      key={choice}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedChoice === choice
                          ? 'border-blue-500 bg-blue-50'
                          : 'hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedChoice(choice)}
                    >
                      <div className="flex items-center justify-between">
                        <span>{choice}</span>
                        {selectedChoice === choice && (
                          <Check className="h-5 w-5 text-blue-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Button
                    onClick={handleVote}
                    disabled={votingInProgress || !selectedChoice}
                    className="w-full"
                  >
                    {votingInProgress ? t('loading') : t('castVote')}
                  </Button>
                </div>
              </div>
            )}
            
            <div>
              <h3 className="text-base font-medium mb-4">{t('results')}</h3>
              
              {totalVotes > 0 ? (
                <div className="space-y-4">
                  {proposal.choices.map((choice: string) => {
                    const percentage = getVotePercentage(choice);
                    return (
                      <div key={choice} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{choice}</span>
                          <span>{votes[choice] || 0} votes ({Math.round(percentage)}%)</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                  <p className="text-sm text-gray-500 mt-2">
                    Total votes: {totalVotes}
                  </p>
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 border border-dashed border-gray-200 rounded-lg">
                  <p className="text-gray-500">No votes have been cast yet.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProposalDetail;
