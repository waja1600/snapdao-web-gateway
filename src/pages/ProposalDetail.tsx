
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDAO } from "@/contexts/DAOContext";
import { useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

// Import the newly created components
import ProposalHeader from "@/components/proposals/ProposalHeader";
import ProposalInfo from "@/components/proposals/ProposalInfo";
import VotingSection from "@/components/proposals/VotingSection";
import ResultsSection from "@/components/proposals/ResultsSection";
import ProposalNotFound from "@/components/proposals/ProposalNotFound";
import ProposalLoading from "@/components/proposals/ProposalLoading";

const ProposalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getProposal, castVote, hasVoted, getVotesForProposal } = useDAO();
  const { user } = useAuth();
  
  const [proposal, setProposal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [userVoted, setUserVoted] = useState(false);
  
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
      }
      setLoading(false);
    }
  }, [id, getProposal, user, hasVoted, getVotesForProposal]);
  
  const handleVoteComplete = async (proposalId: string, choice: string): Promise<boolean> => {
    try {
      const success = await castVote(proposalId, choice);
      if (success) {
        setUserVoted(true);
        setVotes(getVotesForProposal(proposalId));
      }
      return success;
    } catch (error) {
      return false;
    }
  };
  
  if (loading) {
    return (
      <Layout>
        <ProposalLoading />
      </Layout>
    );
  }
  
  if (!proposal) {
    return (
      <Layout>
        <ProposalNotFound />
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="space-y-6">
        <ProposalHeader status={proposal.status} />
        
        <Card>
          <CardContent className="pt-6">
            <ProposalInfo
              title={proposal.title}
              description={proposal.description}
              createdAt={proposal.createdAt}
              protocol={proposal.protocol}
              network={proposal.network}
              category={proposal.category}
            />
            
            {proposal.status === 'active' && !userVoted && (
              <VotingSection
                proposalId={proposal.id}
                choices={proposal.choices}
                hasUserVoted={userVoted}
                castVote={handleVoteComplete}
              />
            )}
            
            <ResultsSection 
              choices={proposal.choices}
              votes={votes}
            />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProposalDetail;
