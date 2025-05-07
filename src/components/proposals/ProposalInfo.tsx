
import { format } from "date-fns";
import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProposalInfoProps {
  title: string;
  description: string;
  createdAt: Date;
  protocol?: string;
  network?: string;
  category?: string;
}

const ProposalInfo: React.FC<ProposalInfoProps> = ({
  title,
  description,
  createdAt,
  protocol,
  network,
  category
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
          <FileText className="h-4 w-4" />
          <span>{t('createdOn')} {format(new Date(createdAt), 'MMM d, yyyy')}</span>
        </div>
        
        {/* Display Protocol, Network, Category */}
        <div className="flex flex-wrap gap-2 mt-3">
          {protocol && (
            <Badge variant="outline">{protocol}</Badge>
          )}
          {network && (
            <Badge variant="secondary">{network}</Badge>
          )}
          {category && (
            <Badge variant="outline" className="bg-blue-50">{category}</Badge>
          )}
        </div>
      </div>
      
      <div>
        <h3 className="text-base font-medium mb-2">{t('description')}</h3>
        <p className="text-gray-700 whitespace-pre-wrap">{description}</p>
      </div>
    </div>
  );
};

export default ProposalInfo;
