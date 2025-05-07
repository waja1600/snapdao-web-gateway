
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const ProposalNotFound = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
      <h3 className="text-lg font-medium">{t('proposalNotFound') || 'Proposal not found'}</h3>
      <Button className="mt-4" onClick={() => navigate("/proposals")}>
        {t('backToProposals') || 'Back to Proposals'}
      </Button>
    </div>
  );
};

export default ProposalNotFound;
