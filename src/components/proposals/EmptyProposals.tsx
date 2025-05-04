
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";

interface EmptyProposalsProps {
  onCreateProposal: () => void;
}

export const EmptyProposals = ({ onCreateProposal }: EmptyProposalsProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="text-center py-12 bg-gray-50 border border-dashed border-gray-200 rounded-lg">
      <FileText className="mx-auto h-10 w-10 text-gray-400" />
      <h3 className="mt-4 text-lg font-medium text-gray-900">No proposals found</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating a new proposal.
      </p>
      <Button className="mt-6" onClick={onCreateProposal}>
        <Plus className="mr-2 h-4 w-4" />
        {t('newProposal')}
      </Button>
    </div>
  );
};
