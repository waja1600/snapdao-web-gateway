
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

export const ContractActions = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Button 
        variant="default" 
        className="flex-1"
        onClick={() => navigate('/collective-agreement')}
      >
        {t('signContract')}
      </Button>
      
      <Button 
        variant="outline" 
        className="flex-1"
        onClick={() => navigate('/proposals/new')}
      >
        {t('addProposal')}
      </Button>
    </div>
  );
};
