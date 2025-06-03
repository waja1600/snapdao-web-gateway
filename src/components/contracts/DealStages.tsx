
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CircleCheck, Circle, CircleEllipsis } from "lucide-react";

interface DealStage {
  id: number;
  name: string;
  status: string;
}

interface DealStagesProps {
  stages: DealStage[];
}

export const DealStages = ({ stages }: DealStagesProps) => {
  const { t } = useLanguage();

  const getStageIcon = (status: string) => {
    if (status === 'completed') return <CircleCheck className="h-6 w-6 text-green-500" />;
    if (status === 'inProgress') return <Circle className="h-6 w-6 text-blue-500" />;
    return <CircleEllipsis className="h-6 w-6 text-gray-300" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('dealStages')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4">
          {stages.map((stage, index) => (
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
              
              {index < stages.length - 1 && (
                <div className="hidden md:block h-0.5 bg-gray-200 w-full mt-4"></div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
