
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { Vote, CheckCircle, Clock, Users, BarChart3 } from 'lucide-react';

interface VotingOption {
  id: string;
  title: string;
  description: string;
  votes: number;
  percentage: number;
}

interface VotingProposal {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'closed' | 'pending';
  totalVotes: number;
  endDate: Date;
  options: VotingOption[];
  hasUserVoted: boolean;
  userVoteId?: string;
  category: string;
}

interface VotingSystemProps {
  proposals: VotingProposal[];
  onVote: (proposalId: string, optionId: string) => void;
}

export const VotingSystem: React.FC<VotingSystemProps> = ({ proposals, onVote }) => {
  const { language } = useLanguage();
  const [selectedVotes, setSelectedVotes] = useState<Record<string, string>>({});

  const handleVote = (proposalId: string, optionId: string) => {
    setSelectedVotes(prev => ({ ...prev, [proposalId]: optionId }));
  };

  const submitVote = (proposalId: string) => {
    const selectedOption = selectedVotes[proposalId];
    if (selectedOption) {
      onVote(proposalId, selectedOption);
      setSelectedVotes(prev => {
        const newState = { ...prev };
        delete newState[proposalId];
        return newState;
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return language === 'en' ? 'Active' : 'نشط';
      case 'closed': return language === 'en' ? 'Closed' : 'مغلق';
      case 'pending': return language === 'en' ? 'Pending' : 'قيد الانتظار';
      default: return status;
    }
  };

  const formatTimeLeft = (endDate: Date) => {
    const now = new Date();
    const timeDiff = endDate.getTime() - now.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    if (daysLeft > 0) {
      return language === 'en' ? `${daysLeft} days left` : `${daysLeft} أيام متبقية`;
    } else {
      return language === 'en' ? 'Voting ended' : 'انتهى التصويت';
    }
  };

  return (
    <div className="space-y-6">
      {proposals.map(proposal => (
        <Card key={proposal.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <CardTitle className="text-lg">{proposal.title}</CardTitle>
                <p className="text-sm text-gray-600 mt-1">{proposal.description}</p>
                <Badge variant="secondary" className="mt-2">{proposal.category}</Badge>
              </div>
              <Badge className={getStatusColor(proposal.status)}>
                {getStatusText(proposal.status)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{proposal.totalVotes} {language === 'en' ? 'votes' : 'صوت'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatTimeLeft(proposal.endDate)}</span>
                </div>
              </div>
              {proposal.hasUserVoted && (
                <div className="flex items-center space-x-1 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span>{language === 'en' ? 'Voted' : 'تم التصويت'}</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {proposal.options.map(option => (
                <div key={option.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      {proposal.status === 'active' && !proposal.hasUserVoted ? (
                        <button
                          onClick={() => handleVote(proposal.id, option.id)}
                          className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                            selectedVotes[proposal.id] === option.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="font-medium">{option.title}</div>
                          <div className="text-sm text-gray-600">{option.description}</div>
                        </button>
                      ) : (
                        <div className={`p-3 rounded-lg border ${
                          proposal.userVoteId === option.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200'
                        }`}>
                          <div className="font-medium">{option.title}</div>
                          <div className="text-sm text-gray-600">{option.description}</div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {(proposal.status === 'closed' || proposal.hasUserVoted) && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{option.votes} {language === 'en' ? 'votes' : 'صوت'}</span>
                        <span>{option.percentage}%</span>
                      </div>
                      <Progress value={option.percentage} className="h-2" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {proposal.status === 'active' && !proposal.hasUserVoted && selectedVotes[proposal.id] && (
              <Button 
                onClick={() => submitVote(proposal.id)}
                className="w-full"
              >
                <Vote className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Submit Vote' : 'إرسال التصويت'}
              </Button>
            )}

            {proposal.status === 'closed' && (
              <div className="flex items-center justify-center text-gray-600 py-2">
                <BarChart3 className="h-4 w-4 mr-2" />
                <span>{language === 'en' ? 'Final Results' : 'النتائج النهائية'}</span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
