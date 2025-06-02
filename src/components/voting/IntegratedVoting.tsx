
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Vote, Clock, Users, CheckCircle, AlertTriangle, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { loomioService } from "@/services/loomio-service";
import { snapshotService } from "@/services/snapshot-service";

interface VotingOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
}

interface VotingSession {
  id: string;
  title: string;
  description: string;
  options: VotingOption[];
  startDate: Date;
  endDate: Date;
  totalVotes: number;
  status: 'upcoming' | 'active' | 'closed';
  platform: 'loomio' | 'snapshot' | 'internal';
  externalUrl?: string;
  requiresDiscussion: boolean;
}

interface IntegratedVotingProps {
  groupId: string;
  votingSession?: VotingSession;
  onCreateVoting?: () => void;
}

export const IntegratedVoting = ({ groupId, votingSession, onCreateVoting }: IntegratedVotingProps) => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [voteReason, setVoteReason] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock voting session if none provided
  const mockSession: VotingSession = {
    id: "vote-1",
    title: language === 'ar' ? 'اختيار المورد النهائي' : 'Select Final Supplier',
    description: language === 'ar' ? 
      'صوت لاختيار أفضل مورد من بين العروض المقدمة للمجموعة' :
      'Vote to select the best supplier from the submitted offers for the group',
    options: [
      {
        id: "option-1",
        text: language === 'ar' ? 'شركة المعدات الطبية المتقدمة - 450,000 ريال' : 'Advanced Medical Equipment Co. - $450,000',
        votes: 8,
        percentage: 57.1
      },
      {
        id: "option-2", 
        text: language === 'ar' ? 'مؤسسة الشرق الأوسط للتجهيزات - 420,000 ريال' : 'Middle East Equipment Corp. - $420,000',
        votes: 4,
        percentage: 28.6
      },
      {
        id: "option-3",
        text: language === 'ar' ? 'إعادة فتح المناقصة' : 'Reopen Tender',
        votes: 2,
        percentage: 14.3
      }
    ],
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-01-15'),
    totalVotes: 14,
    status: 'active',
    platform: 'snapshot',
    externalUrl: 'https://snapshot.org/#/gpo-platform.eth/proposal/0x123',
    requiresDiscussion: true
  };

  const currentSession = votingSession || mockSession;

  useEffect(() => {
    // Check if user has already voted
    const checkVotingStatus = async () => {
      if (!user) return;
      
      // Check voting status from the respective platform
      if (currentSession.platform === 'snapshot') {
        // Check Snapshot votes
      } else if (currentSession.platform === 'loomio') {
        // Check Loomio votes
      }
      
      // For demo, randomly set voting status
      setHasVoted(Math.random() > 0.5);
    };

    checkVotingStatus();
  }, [user, currentSession]);

  const handleVote = async () => {
    if (!selectedOption || !user) {
      toast.error(language === 'ar' ? 'يرجى اختيار خيار' : 'Please select an option');
      return;
    }

    setLoading(true);
    try {
      let success = false;

      if (currentSession.platform === 'snapshot') {
        success = await snapshotService.vote({
          space: 'gpo-platform.eth',
          proposal: currentSession.id,
          choice: parseInt(selectedOption.split('-')[1]),
          reason: voteReason
        });
      } else if (currentSession.platform === 'loomio') {
        // Handle Loomio voting
        success = true; // Mock success
      } else {
        // Internal voting system
        success = true; // Mock success
      }

      if (success) {
        setHasVoted(true);
        toast.success(language === 'ar' ? 'تم تسجيل تصويتك بنجاح' : 'Vote submitted successfully');
      }
    } catch (error) {
      console.error('Error submitting vote:', error);
      toast.error(language === 'ar' ? 'فشل في تسجيل التصويت' : 'Failed to submit vote');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateVoting = async () => {
    if (!user) return;

    try {
      // Create voting session on selected platform
      const proposalData = {
        space: 'gpo-platform.eth',
        title: 'New Group Voting Session',
        body: 'Please participate in this important group decision',
        choices: ['Option A', 'Option B', 'Option C'],
        start: new Date(),
        end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        type: 'single-choice' as const
      };

      const proposal = await snapshotService.createProposal(proposalData);
      
      if (proposal && onCreateVoting) {
        onCreateVoting();
      }
    } catch (error) {
      console.error('Error creating voting session:', error);
    }
  };

  const getTimeRemaining = () => {
    const now = new Date();
    const end = new Date(currentSession.endDate);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return language === 'ar' ? 'انتهى' : 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return language === 'ar' ? `${days} أيام متبقية` : `${days} days left`;
    } else {
      return language === 'ar' ? `${hours} ساعات متبقية` : `${hours} hours left`;
    }
  };

  const getStatusColor = () => {
    switch (currentSession.status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlatformBadge = () => {
    const platformInfo = {
      loomio: { name: 'Loomio', color: 'bg-purple-100 text-purple-800' },
      snapshot: { name: 'Snapshot', color: 'bg-indigo-100 text-indigo-800' },
      internal: { name: language === 'ar' ? 'داخلي' : 'Internal', color: 'bg-gray-100 text-gray-800' }
    };

    const info = platformInfo[currentSession.platform];
    return (
      <Badge className={info.color}>
        {info.name}
      </Badge>
    );
  };

  if (!currentSession) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <Vote className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium mb-2">
            {language === 'ar' ? 'لا توجد جلسات تصويت نشطة' : 'No Active Voting Sessions'}
          </h3>
          <p className="text-gray-600 mb-4">
            {language === 'ar' ? 'يمكن لمؤسس المجموعة إنشاء جلسة تصويت جديدة' : 'Group founders can create new voting sessions'}
          </p>
          <Button onClick={handleCreateVoting}>
            <Vote className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'إنشاء تصويت جديد' : 'Create New Vote'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Voting Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="flex items-center gap-2">
                <Vote className="h-5 w-5" />
                {currentSession.title}
              </CardTitle>
              <p className="text-gray-600">{currentSession.description}</p>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <Badge className={getStatusColor()}>
                {currentSession.status === 'active' ? 
                  (language === 'ar' ? 'نشط' : 'Active') :
                  currentSession.status === 'upcoming' ?
                  (language === 'ar' ? 'قادم' : 'Upcoming') :
                  (language === 'ar' ? 'مغلق' : 'Closed')
                }
              </Badge>
              {getPlatformBadge()}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{getTimeRemaining()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-sm">
                {currentSession.totalVotes} {language === 'ar' ? 'صوت' : 'votes'}
              </span>
            </div>
            {currentSession.externalUrl && (
              <a 
                href={currentSession.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="text-sm">
                  {language === 'ar' ? 'عرض في' : 'View on'} {currentSession.platform}
                </span>
              </a>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Voting Options */}
      {currentSession.status === 'active' && !hasVoted && (
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ar' ? 'اختر خيارك' : 'Choose Your Option'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
              {currentSession.options.map((option) => (
                <div key={option.id} className="flex items-start space-x-3 space-y-0">
                  <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                  <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                    <div className="space-y-1">
                      <p className="font-medium">{option.text}</p>
                      {hasVoted && (
                        <div className="text-sm text-gray-500">
                          {option.votes} {language === 'ar' ? 'أصوات' : 'votes'} ({option.percentage.toFixed(1)}%)
                        </div>
                      )}
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {currentSession.requiresDiscussion && (
              <div className="space-y-2">
                <Label htmlFor="reason">
                  {language === 'ar' ? 'سبب الاختيار (اختياري)' : 'Reason for choice (optional)'}
                </Label>
                <Textarea
                  id="reason"
                  value={voteReason}
                  onChange={(e) => setVoteReason(e.target.value)}
                  placeholder={language === 'ar' ? 'اشرح سبب اختيارك...' : 'Explain your choice...'}
                  className="min-h-[80px]"
                />
              </div>
            )}

            <Button 
              onClick={handleVote}
              disabled={!selectedOption || loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {language === 'ar' ? 'جاري التصويت...' : 'Submitting vote...'}
                </>
              ) : (
                <>
                  <Vote className="h-4 w-4 mr-2" />
                  {language === 'ar' ? 'تصويت' : 'Submit Vote'}
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {(hasVoted || currentSession.status === 'closed') && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {hasVoted && <CheckCircle className="h-5 w-5 text-green-500" />}
              {language === 'ar' ? 'النتائج' : 'Results'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentSession.options.map((option) => (
              <div key={option.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{option.text}</span>
                  <span className="text-sm text-gray-600">
                    {option.votes} {language === 'ar' ? 'صوت' : 'votes'} ({option.percentage.toFixed(1)}%)
                  </span>
                </div>
                <Progress value={option.percentage} className="h-2" />
              </div>
            ))}
            
            <Separator />
            
            <div className="text-center pt-2">
              <p className="text-sm text-gray-600">
                {language === 'ar' ? 'إجمالي الأصوات:' : 'Total votes:'} {currentSession.totalVotes}
              </p>
              {hasVoted && (
                <div className="flex items-center justify-center gap-2 mt-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {language === 'ar' ? 'تم تسجيل تصويتك بنجاح' : 'Your vote has been recorded'}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Status Messages */}
      {currentSession.status === 'upcoming' && (
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center gap-2 text-blue-600">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm">
                {language === 'ar' ? 
                  'سيبدأ التصويت قريباً. ستحصل على إشعار عند البدء.' :
                  'Voting will start soon. You will be notified when it begins.'
                }
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
