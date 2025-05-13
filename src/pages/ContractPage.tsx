import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, Download, FileText, Check, X, 
  Circle, CircleCheck, CircleMinus, CircleEllipsis
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

const mockDealStages = [
  { id: 1, name: 'negotiations', status: 'completed' },
  { id: 2, name: 'agreement', status: 'completed' },
  { id: 3, name: 'implementation', status: 'inProgress' },
  { id: 4, name: 'closing', status: 'pending' },
];

const mockVotes = [
  { id: 1, title: 'Initial agreement', status: 'approved', votes: { yes: 8, no: 2, abstain: 1 } },
  { id: 2, title: 'Payment schedule', status: 'approved', votes: { yes: 7, no: 3, abstain: 1 } },
  { id: 3, title: 'Final delivery date', status: 'inProgress', votes: { yes: 5, no: 1, abstain: 0 } },
];

const mockMembers = [
  { id: 1, name: 'Ahmed Hassan', role: 'Group Admin', avatar: 'AH' },
  { id: 2, name: 'Sara Wilson', role: 'Supervisor', avatar: 'SW' },
  { id: 3, name: 'Mohammed Ali', role: 'Member', avatar: 'MA' },
  { id: 4, name: 'John Doe', role: 'Supplier', avatar: 'JD' },
  { id: 5, name: 'Jane Smith', role: 'Freelancer', avatar: 'JS' },
];

const ContractPage = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [notifyAll, setNotifyAll] = useState(true);
  
  const handleDownloadContract = () => {
    // In a real implementation, this would generate and download a PDF
    toast.success(t('contractDownloaded'));
  };
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    toast.success(notifyAll ? t('commentPostedWithNotification') : t('commentPosted'));
    setComment("");
  };

  const getStageIcon = (status: string) => {
    if (status === 'completed') return <CircleCheck className="h-6 w-6 text-green-500" />;
    if (status === 'inProgress') return <Circle className="h-6 w-6 text-blue-500" />;
    return <CircleEllipsis className="h-6 w-6 text-gray-300" />;
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
        <Card>
          <CardHeader>
            <CardTitle>{t('dealStages')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              {mockDealStages.map((stage, index) => (
                <div key={stage.id} className="flex-1">
                  <div className="flex flex-col items-center">
                    {getStageIcon(stage.status)}
                    <h3 className="font-medium mt-2">{t(stage.name)}</h3>
                    <Badge 
                      className={`mt-1 ${
                        stage.status === 'completed' ? 'bg-green-100 text-green-800' : 
                        stage.status === 'inProgress' ? 'bg-blue-100 text-blue-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {t(stage.status)}
                    </Badge>
                  </div>
                  
                  {index < mockDealStages.length - 1 && (
                    <div className="hidden md:block h-0.5 bg-gray-200 w-full mt-4"></div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Voting Status */}
        <Card>
          <CardHeader>
            <CardTitle>{t('votingStatus')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockVotes.map(vote => (
                <div key={vote.id} className="border rounded-lg p-4">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{vote.title}</h3>
                    <Badge 
                      className={`${
                        vote.status === 'approved' ? 'bg-green-100 text-green-800' : 
                        vote.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                        'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {t(vote.status)}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="text-center">
                      <div className="text-green-600 font-medium">{vote.votes.yes}</div>
                      <div className="text-sm text-gray-600">{t('yes')}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-red-600 font-medium">{vote.votes.no}</div>
                      <div className="text-sm text-gray-600">{t('no')}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-600 font-medium">{vote.votes.abstain}</div>
                      <div className="text-sm text-gray-600">{t('abstain')}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Members */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t('members')}</CardTitle>
            <Button 
              onClick={() => navigate('/members')}
              variant="outline"
              size="sm"
            >
              {t('viewAll')}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {mockMembers.slice(0, 4).map(member => (
                <div key={member.id} className="flex items-center gap-3 border rounded-lg px-3 py-2">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-medium">
                    {member.avatar}
                  </div>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-xs text-gray-500">{member.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Comments */}
        <Card>
          <CardHeader>
            <CardTitle>{t('comments')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitComment} className="space-y-4">
              <Textarea 
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder={t('writeYourComment')}
                className="min-h-[100px]"
              />
              
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="notifyAll" 
                  checked={notifyAll}
                  onCheckedChange={(checked) => setNotifyAll(!!checked)} 
                />
                <label htmlFor="notifyAll" className="text-sm text-gray-700">
                  {t('notifyAll')}
                </label>
              </div>
              
              <Button type="submit" disabled={!comment.trim()}>
                {t('postComment')}
              </Button>
            </form>
            
            <div className="mt-6 space-y-4">
              <div className="border-b pb-4">
                <div className="flex justify-between">
                  <div className="font-medium">Ahmed Hassan</div>
                  <div className="text-xs text-gray-500">2 hours ago</div>
                </div>
                <p className="mt-2 text-gray-700">
                  Let's schedule a meeting to discuss the final details of the implementation.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <div className="flex justify-between">
                  <div className="font-medium">Sara Wilson</div>
                  <div className="text-xs text-gray-500">Yesterday</div>
                </div>
                <p className="mt-2 text-gray-700">
                  I've reviewed the documents and everything looks good from our end.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Contract Actions */}
        <div className="flex flex-col md:flex-row gap-4">
          <Button 
            variant="default" 
            className="flex-1"
            onClick={() => navigate('/collective-agreement')}
          >
            {t('signContract')}
          </Button>
          
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => navigate('/proposals/new')}
          >
            {t('addProposal')}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ContractPage;
