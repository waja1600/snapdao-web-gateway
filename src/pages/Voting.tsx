
import { useParams } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Layout } from "@/components/Layout";
import { IntegratedVoting } from "@/components/voting/IntegratedVoting";

const Voting = () => {
  const { groupId } = useParams();
  const { language } = useLanguage();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            {language === 'en' ? 'Group Voting' : 'تصويت المجموعة'}
          </h1>
          <p className="text-gray-600 mt-2">
            {language === 'en' 
              ? 'Participate in democratic decision making'
              : 'شارك في اتخاذ القرار الديمقراطي'}
          </p>
        </div>

        <IntegratedVoting 
          groupId={groupId || 'general'}
        />
      </div>
    </Layout>
  );
};

export default Voting;
