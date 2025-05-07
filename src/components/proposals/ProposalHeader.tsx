
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProposalHeaderProps {
  status: string;
}

const ProposalHeader: React.FC<ProposalHeaderProps> = ({ status }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <>
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
            status === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {status === 'active' ? 'نشط' : 'مغلق'}
          </span>
        </div>
      </div>
    </>
  );
};

export default ProposalHeader;
