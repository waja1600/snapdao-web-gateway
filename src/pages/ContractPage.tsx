
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { toast } from "sonner";
import { DealStages } from "@/components/contracts/DealStages";
import { VotingStatus } from "@/components/contracts/VotingStatus";
import { MembersList } from "@/components/contracts/MembersList";
import { CommentSection } from "@/components/contracts/CommentSection";
import { ContractActions } from "@/components/contracts/ContractActions";
import { mockDealStages, mockVotes, mockMembers } from "@/components/contracts/mock-data";

const ContractPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const handleDownloadContract = () => {
    // In a real implementation, this would generate and download a PDF
    toast.success(t('contractDownloaded'));
  };
  
  return (
    <Layout>
      <div className="space-y-6 pb-8">
        <Button
          variant="ghost"
          className="mb-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('back')}
        </Button>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold">{t('contractDetails')}</h1>
          <Button onClick={handleDownloadContract}>
            <Download className="mr-2 h-4 w-4" />
            {t('downloadContract')}
          </Button>
        </div>
        
        {/* Deal Stages */}
        <DealStages stages={mockDealStages} />
        
        {/* Voting Status */}
        <VotingStatus votes={mockVotes} />
        
        {/* Members */}
        <MembersList members={mockMembers} />
        
        {/* Comments */}
        <CommentSection />
        
        {/* Contract Actions */}
        <ContractActions />
      </div>
    </Layout>
  );
};

export default ContractPage;
