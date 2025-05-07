
import { useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";

// Import components
import ProposalHeader from "@/components/proposals/ProposalHeader";
import ProposalInfo from "@/components/proposals/ProposalInfo";
import VotingSection from "@/components/proposals/VotingSection";
import ResultsSection from "@/components/proposals/ResultsSection";
import ProposalNotFound from "@/components/proposals/ProposalNotFound";
import ProposalLoading from "@/components/proposals/ProposalLoading";

// Import custom hook
import { useProposalDetails } from "@/hooks/useProposalDetails";

const ProposalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { proposal, loading, votes, userVoted, handleVoteComplete } = useProposalDetails(id);
  
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
