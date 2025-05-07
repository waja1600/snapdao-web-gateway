
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProposalNotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
      <h3 className="text-lg font-medium">Proposal not found</h3>
      <Button className="mt-4" onClick={() => navigate("/proposals")}>
        Back to Proposals
      </Button>
    </div>
  );
};

export default ProposalNotFound;
