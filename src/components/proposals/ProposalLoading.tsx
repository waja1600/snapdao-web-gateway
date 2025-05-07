
import { useLanguage } from "@/contexts/LanguageContext";

const ProposalLoading = () => {
  const { t } = useLanguage();
  
  return (
    <div className="flex justify-center items-center h-64">
      <p>{t('loading')}</p>
    </div>
  );
};

export default ProposalLoading;
