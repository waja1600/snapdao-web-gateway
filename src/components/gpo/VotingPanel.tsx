
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { votingService, Proposal } from '@/services/voting-dao-service';
import { Vote, Plus, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface VotingPanelProps {
  groupId: string;
}

export const VotingPanel: React.FC<VotingPanelProps> = ({ groupId }) => {
  const { language } = useLanguage();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProposal, setNewProposal] = useState({
    title: '',
    description: '',
    type: 'group_decision' as const,
    options: ['', ''],
    votingDays: 7
  });

  useEffect(() => {
    setProposals(votingService.getGroupProposals(groupId));
  }, [groupId]);

  const handleCreateProposal = () => {
    if (!newProposal.title || newProposal.options.some(opt => !opt.trim())) {
      toast.error(language === 'en' ? 'Please fill all fields' : 'يرجى ملء جميع الحقول');
      return;
    }

    const proposal = votingService.createProposal({
      groupId,
      title: newProposal.title,
      description: newProposal.description,
      type: newProposal.type,
      options: newProposal.options.map((text, index) => ({
        id: (index + 1).toString(),
        text,
        votes: [],
        voteCount: 0
      })),
      votingEndDate: new Date(Date.now() + newProposal.votingDays * 24 * 60 * 60 * 1000),
      createdBy: 'current-user',
      minimumQuorum: 2,
      requiredMajority: 51
    });

    setProposals(prev => [proposal, ...prev]);
    setShowCreateForm(false);
    setNewProposal({ title: '', description: '', type: 'group_decision', options: ['', ''], votingDays: 7 });
    toast.success(language === 'en' ? 'Proposal created successfully' : 'تم إنشاء المقترح بنجاح');
  };

  const handleVote = (proposalId: string, optionId: string) => {
    const success = votingService.castVote(proposalId, optionId, 'current-user');
    if (success) {
      setProposals(votingService.getGroupProposals(groupId));
      toast.success(language === 'en' ? 'Vote cast successfully' : 'تم التصويت بنجاح');
    } else {
      toast.error(language === 'en' ? 'Failed to cast vote' : 'فشل في التصويت');
    }
  };

  const addOption = () => {
    setNewProposal(prev => ({
      ...prev,
      options: [...prev.options, '']
    }));
  };

  const updateOption = (index: number, value: string) => {
    setNewProposal(prev => ({
      ...prev,
      options: prev.options.map((opt, i) => i === index ? value : opt)
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'passed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          {language === 'en' ? 'Group Voting' : 'تصويت المجموعة'}
        </h3>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          {language === 'en' ? 'Create Proposal' : 'إنشاء مقترح'}
        </Button>
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'en' ? 'Create New Proposal' : 'إنشاء مقترح جديد'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">
                {language === 'en' ? 'Proposal Title' : 'عنوان المقترح'}
              </Label>
              <Input
                id="title"
                value={newProposal.title}
                onChange={(e) => setNewProposal(prev => ({ ...prev, title: e.target.value }))}
                placeholder={language === 'en' ? 'Enter proposal title' : 'أدخل عنوان المقترح'}
              />
            </div>

            <div>
              <Label htmlFor="description">
                {language === 'en' ? 'Description' : 'الوصف'}
              </Label>
              <Textarea
                id="description"
                value={newProposal.description}
                onChange={(e) => setNewProposal(prev => ({ ...prev, description: e.target.value }))}
                placeholder={language === 'en' ? 'Describe the proposal' : 'اوصف المقترح'}
                rows={3}
              />
            </div>

            <div>
              <Label>{language === 'en' ? 'Voting Options' : 'خيارات التصويت'}</Label>
              {newProposal.options.map((option, index) => (
                <Input
                  key={index}
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  placeholder={`${language === 'en' ? 'Option' : 'الخيار'} ${index + 1}`}
                  className="mt-2"
                />
              ))}
              <Button type="button" variant="outline" onClick={addOption} className="mt-2">
                {language === 'en' ? 'Add Option' : 'إضافة خيار'}
              </Button>
            </div>

            <div>
              <Label htmlFor="votingDays">
                {language === 'en' ? 'Voting Period (Days)' : 'فترة التصويت (أيام)'}
              </Label>
              <Input
                id="votingDays"
                type="number"
                min="1"
                max="30"
                value={newProposal.votingDays}
                onChange={(e) => setNewProposal(prev => ({ ...prev, votingDays: parseInt(e.target.value) }))}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCreateProposal}>
                {language === 'en' ? 'Create Proposal' : 'إنشاء المقترح'}
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                {language === 'en' ? 'Cancel' : 'إلغاء'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {proposals.map((proposal) => {
          const totalVotes = proposal.options.reduce((sum, opt) => sum + opt.voteCount, 0);
          const timeLeft = proposal.votingEndDate.getTime() - Date.now();
          const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

          return (
            <Card key={proposal.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{proposal.title}</CardTitle>
                    <p className="text-gray-600 mt-1">{proposal.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(proposal.status)}>
                      {proposal.status}
                    </Badge>
                    {proposal.status === 'active' && (
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{daysLeft} {language === 'en' ? 'days left' : 'أيام متبقية'}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {proposal.options.map((option) => {
                  const percentage = totalVotes > 0 ? (option.voteCount / totalVotes) * 100 : 0;
                  
                  return (
                    <div key={option.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{option.text}</span>
                        <span className="text-sm text-gray-600">
                          {option.voteCount} {language === 'en' ? 'votes' : 'صوت'}
                        </span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                      {proposal.status === 'active' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleVote(proposal.id, option.id)}
                          className="w-full"
                        >
                          <Vote className="h-4 w-4 mr-2" />
                          {language === 'en' ? 'Vote' : 'صوت'}
                        </Button>
                      )}
                    </div>
                  );
                })}

                <div className="text-sm text-gray-600 pt-2 border-t">
                  {language === 'en' ? 'Total Votes:' : 'إجمالي الأصوات:'} {totalVotes} | 
                  {language === 'en' ? ' Quorum:' : ' النصاب:'} {proposal.minimumQuorum} | 
                  {language === 'en' ? ' Required Majority:' : ' الأغلبية المطلوبة:'} {proposal.requiredMajority}%
                </div>
              </CardContent>
            </Card>
          );
        })}

        {proposals.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Vote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {language === 'en' ? 'No active proposals' : 'لا توجد مقترحات نشطة'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Create the first proposal for this group'
                  : 'أنشئ أول مقترح لهذه المجموعة'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
