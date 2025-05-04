
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDAO } from "@/contexts/DAOContext";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ProposalCard } from "@/components/proposals/ProposalCard";
import { ProposalFilters } from "@/components/proposals/ProposalFilters";
import { EmptyProposals } from "@/components/proposals/EmptyProposals";
import { ProposalForm } from "@/components/proposals/ProposalForm";

const Proposals = () => {
  const { t } = useLanguage();
  const { proposals } = useDAO();
  const navigate = useNavigate();
  
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const filteredProposals = filterStatus === "all"
    ? proposals
    : proposals.filter(p => p.status === filterStatus);
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t('proposals')}</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/explore')}>
              استكشاف
            </Button>
            <ProposalForm 
              isOpen={isDialogOpen}
              onOpenChange={setIsDialogOpen}
            />
          </div>
        </div>
        
        <ProposalFilters 
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
        
        <div className="space-y-4 mt-6">
          {filteredProposals.length > 0 ? (
            filteredProposals.map((proposal) => (
              <ProposalCard key={proposal.id} proposal={proposal} />
            ))
          ) : (
            <EmptyProposals onCreateProposal={() => setIsDialogOpen(true)} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Proposals;
