
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Vote {
  id: number;
  title: string;
  status: string;
  votes: {
    yes: number;
    no: number;
    abstain: number;
  };
}

interface VotingStatusProps {
  votes: Vote[];
}

export const VotingStatus = ({ votes }: VotingStatusProps) => {
  const { t } = useLanguage();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('votingStatus')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {votes.map(vote => (
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
  );
};
