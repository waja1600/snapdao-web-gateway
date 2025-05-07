
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ProposalLoading = () => {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col justify-center items-center h-64">
      <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
      <p className="text-gray-500">{t('loading')}</p>
    </div>
  );
};

export default ProposalLoading;
