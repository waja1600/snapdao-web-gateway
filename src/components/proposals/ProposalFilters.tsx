
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Gavel } from "lucide-react";

interface ProposalFiltersProps {
  filterStatus: string;
  setFilterStatus: (status: string) => void;
}

export const ProposalFilters = ({ 
  filterStatus, 
  setFilterStatus 
}: ProposalFiltersProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      <Select
        value={filterStatus}
        onValueChange={setFilterStatus}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={t('filterByStatus')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t('allStatus')}</SelectItem>
          <SelectItem value="active">{t('active')}</SelectItem>
          <SelectItem value="closed">{t('closed')}</SelectItem>
        </SelectContent>
      </Select>
      
      <Button 
        variant="outline" 
        className="gap-2"
        onClick={() => navigate('/arbitration')}
      >
        <Gavel className="h-4 w-4" />
        {t('arbitration')}
      </Button>
    </div>
  );
};
