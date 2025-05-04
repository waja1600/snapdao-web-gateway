
import React from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { FileText } from "lucide-react";
import { Proposal } from "@/models/types";

interface ProposalCardProps {
  proposal: Proposal;
}

export const ProposalCard = ({ proposal }: ProposalCardProps) => {
  const navigate = useNavigate();
  
  return (
    <div
      className="bg-white rounded-lg border border-gray-200 p-6 hover:border-gray-300 transition-colors"
      role="button"
      onClick={() => navigate(`/proposals/${proposal.id}`)}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{proposal.title}</h3>
        <Badge variant={proposal.status === 'active' ? 'default' : 'secondary'}>
          {proposal.status === 'active' ? 'نشط' : 'مغلق'}
        </Badge>
      </div>
      <p className="text-gray-500 mt-2 line-clamp-2">{proposal.description}</p>
      
      {/* Display Protocol, Network, Category */}
      <div className="flex flex-wrap gap-2 mt-3">
        {proposal.protocol && (
          <Badge variant="outline">{proposal.protocol}</Badge>
        )}
        {proposal.network && (
          <Badge variant="secondary">{proposal.network}</Badge>
        )}
        {proposal.category && (
          <Badge variant="outline" className="bg-blue-50">{proposal.category}</Badge>
        )}
      </div>
      
      <div className="flex items-center mt-4 text-sm text-gray-500">
        <FileText className="mr-2 h-4 w-4" />
        <span>{format(new Date(proposal.createdAt), 'MMM d, yyyy')}</span>
      </div>
    </div>
  );
};
