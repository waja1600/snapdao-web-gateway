
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDAO } from "@/contexts/DAOContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

interface ProposalFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProposalForm = ({ isOpen, onOpenChange }: ProposalFormProps) => {
  const { t } = useLanguage();
  const { createProposal, protocolOptions, networkOptions, categoryOptions } = useDAO();
  
  const [newProposal, setNewProposal] = useState({
    title: "",
    description: "",
    choices: ["نعم", "لا"],
    protocol: "web2" as "web2" | "web3",
    network: "",
    category: ""
  });
  
  const handleAddChoice = () => {
    setNewProposal({
      ...newProposal,
      choices: [...newProposal.choices, `خيار ${newProposal.choices.length + 1}`]
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
      newProposal.choices,
      newProposal.protocol,
      newProposal.network || undefined,
      newProposal.category || undefined
    );
    if (success) {
      onOpenChange(false);
      setNewProposal({
        title: "",
        description: "",
        choices: ["نعم", "لا"],
        protocol: "web2",
        network: "",
        category: ""
      });
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
          
          {/* Protocol field */}
          <div className="space-y-2">
            <Label htmlFor="protocol">البروتوكول</Label>
            <Select 
              value={newProposal.protocol} 
              onValueChange={(value) => setNewProposal({...newProposal, protocol: value as "web2" | "web3"})}
            >
              <SelectTrigger id="protocol">
                <SelectValue placeholder="اختر البروتوكول" />
              </SelectTrigger>
              <SelectContent>
                {protocolOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Network field */}
          <div className="space-y-2">
            <Label htmlFor="network">الشبكة</Label>
            <Select 
              value={newProposal.network} 
              onValueChange={(value) => setNewProposal({...newProposal, network: value})}
            >
              <SelectTrigger id="network">
                <SelectValue placeholder="اختر الشبكة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">بدون شبكة</SelectItem>
                {networkOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Category field */}
          <div className="space-y-2">
            <Label htmlFor="category">الفئة</Label>
            <Select 
              value={newProposal.category} 
              onValueChange={(value) => setNewProposal({...newProposal, category: value})}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="اختر الفئة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">بدون فئة</SelectItem>
                {categoryOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              onClick={() => onOpenChange(false)}
            >
              {t('cancel')}
            </Button>
            <Button type="submit">{t('create')}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
