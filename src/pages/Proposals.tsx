
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDAO } from "@/contexts/DAOContext";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { FileText, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Proposals = () => {
  const { t } = useLanguage();
  const { proposals, createProposal } = useDAO();
  const navigate = useNavigate();
  
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProposal, setNewProposal] = useState({
    title: "",
    description: "",
    choices: ["Yes", "No"]
  });
  
  const filteredProposals = filterStatus === "all"
    ? proposals
    : proposals.filter(p => p.status === filterStatus);
  
  const handleAddChoice = () => {
    setNewProposal({
      ...newProposal,
      choices: [...newProposal.choices, `Choice ${newProposal.choices.length + 1}`]
    });
  };
  
  const handleRemoveChoice = (index: number) => {
    setNewProposal({
      ...newProposal,
      choices: newProposal.choices.filter((_, i) => i !== index)
    });
  };
  
  const handleChoiceChange = (index: number, value: string) => {
    const updatedChoices = [...newProposal.choices];
    updatedChoices[index] = value;
    setNewProposal({
      ...newProposal,
      choices: updatedChoices
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await createProposal(
      newProposal.title, 
      newProposal.description, 
      newProposal.choices
    );
    if (success) {
      setIsDialogOpen(false);
      setNewProposal({
        title: "",
        description: "",
        choices: ["Yes", "No"]
      });
    }
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t('proposals')}</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                {t('newProposal')}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{t('newProposal')}</DialogTitle>
                <DialogDescription>
                  Create a new proposal for members to vote on.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">{t('proposalTitle')}</Label>
                  <Input 
                    id="title" 
                    value={newProposal.title} 
                    onChange={(e) => setNewProposal({...newProposal, title: e.target.value})}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">{t('description')}</Label>
                  <Textarea 
                    id="description" 
                    rows={5}
                    value={newProposal.description} 
                    onChange={(e) => setNewProposal({...newProposal, description: e.target.value})}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t('choices')}</Label>
                  {newProposal.choices.map((choice, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input 
                        value={choice} 
                        onChange={(e) => handleChoiceChange(index, e.target.value)}
                        placeholder={`${t('choice')} ${index + 1}`}
                        required 
                      />
                      {newProposal.choices.length > 2 && (
                        <Button 
                          type="button" 
                          variant="destructive" 
                          size="icon"
                          onClick={() => handleRemoveChoice(index)}
                        >
                          -
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={handleAddChoice}
                  >
                    {t('addChoice')}
                  </Button>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                  >
                    {t('cancel')}
                  </Button>
                  <Button type="submit">{t('create')}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="flex items-center space-x-2">
          <Select
            value={filterStatus}
            onValueChange={setFilterStatus}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-4 mt-6">
          {filteredProposals.length > 0 ? (
            filteredProposals.map((proposal) => (
              <div
                key={proposal.id}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:border-gray-300 transition-colors"
                role="button"
                onClick={() => navigate(`/proposals/${proposal.id}`)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">{proposal.title}</h3>
                  <Badge variant={proposal.status === 'active' ? 'default' : 'secondary'}>
                    {proposal.status === 'active' ? 'Active' : 'Closed'}
                  </Badge>
                </div>
                <p className="text-gray-500 mt-2 line-clamp-2">{proposal.description}</p>
                <div className="flex items-center mt-4 text-sm text-gray-500">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>{format(new Date(proposal.createdAt), 'MMM d, yyyy')}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 border border-dashed border-gray-200 rounded-lg">
              <FileText className="mx-auto h-10 w-10 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No proposals found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new proposal.
              </p>
              <Button className="mt-6" onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                {t('newProposal')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Proposals;
