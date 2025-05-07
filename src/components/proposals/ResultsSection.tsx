
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";

interface ResultsSectionProps {
  choices: string[];
  votes: Record<string, number>;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({
  choices,
  votes
}) => {
  const { t } = useLanguage();
  
  const totalVotes = Object.values(votes).reduce((sum, count) => sum + count, 0);
  
  const getVotePercentage = (choice: string): number => {
    if (!votes[choice] || totalVotes === 0) return 0;
    return (votes[choice] / totalVotes) * 100;
  };
  
  return (
    <div>
      <h3 className="text-base font-medium mb-4">{t('results')}</h3>
      
      {totalVotes > 0 ? (
        <div className="space-y-4">
          {choices.map((choice: string) => {
            const percentage = getVotePercentage(choice);
            return (
              <div key={choice} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{choice}</span>
                  <span>{votes[choice] || 0} {t('votes')} ({Math.round(percentage)}%)</span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            );
          })}
          <p className="text-sm text-gray-500 mt-2">
            {t('totalVotes')}: {totalVotes}
          </p>
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 border border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500">{t('noVotesCastYet')}</p>
        </div>
      )}
    </div>
  );
};

export default ResultsSection;
