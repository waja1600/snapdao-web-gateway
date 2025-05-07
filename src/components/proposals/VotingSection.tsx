
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

interface VotingSectionProps {
  proposalId: string;
  choices: string[];
  hasUserVoted: boolean;
  castVote: (proposalId: string, choice: string) => Promise<boolean>;
}

const VotingSection: React.FC<VotingSectionProps> = ({
  proposalId,
  choices,
  hasUserVoted,
  castVote
}) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [selectedChoice, setSelectedChoice] = useState<string>("");
  const [votingInProgress, setVotingInProgress] = useState(false);
  
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
      const success = await castVote(proposalId, selectedChoice);
      if (!success) {
        toast.error("Failed to cast vote");
      }
    } finally {
      setVotingInProgress(false);
    }
  };
  
  if (hasUserVoted) {
    return null;
  }
  
  return (
    <div className="mb-8">
      <h3 className="text-base font-medium mb-4">{t('choices')}</h3>
      <div className="space-y-3">
        {choices.map((choice: string) => (
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
  );
};

export default VotingSection;
