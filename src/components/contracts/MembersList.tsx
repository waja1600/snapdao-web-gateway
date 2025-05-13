
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Member {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

interface MembersListProps {
  members: Member[];
}

export const MembersList = ({ members }: MembersListProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  return (
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
          {members.slice(0, 4).map(member => (
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
  );
};
