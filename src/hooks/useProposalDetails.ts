
import { useState, useEffect } from "react";
import { useDAO } from "@/contexts/DAOContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Proposal } from "@/models/types";

interface ProposalDetails {
  proposal: Proposal | null;
  loading: boolean;
  votes: Record<string, number>;
  userVoted: boolean;
  handleVoteComplete: (proposalId: string, choice: string) => Promise<boolean>;
}

export const useProposalDetails = (proposalId: string | undefined): ProposalDetails => {
  const { getProposal, castVote, hasVoted, getVotesForProposal } = useDAO();
  const { user } = useAuth();
  
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [userVoted, setUserVoted] = useState(false);

  useEffect(() => {
    if (!proposalId) {
      setLoading(false);
      return;
    }
    
    const fetchProposalData = () => {
      const proposalData = getProposal(proposalId);
      
      if (proposalData) {
        setProposal(proposalData);
        setVotes(getVotesForProposal(proposalId));
        
        if (user) {
          setUserVoted(hasVoted(proposalId, user.id));
        }
      } else {
        toast.error("Proposal not found");
      }
      
      setLoading(false);
    };

    fetchProposalData();
  }, [proposalId, getProposal, user, hasVoted, getVotesForProposal]);

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

  return {
    proposal,
    loading,
    votes,
    userVoted,
    handleVoteComplete
  };
};
