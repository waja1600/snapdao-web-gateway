
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Vote, Clock, Users, CheckCircle } from "lucide-react";

const Voting = () => {
  const { language } = useLanguage();
  const [selectedVote, setSelectedVote] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  // Mock voting data
  const votingData = {
    title: language === 'en' ? 'Select Final Supplier' : 'اختيار المورد النهائي',
    description: language === 'en' 
      ? 'Vote to select the best supplier offer for our medical equipment group purchase'
      : 'صوت لاختيار أفضل عرض مورد لمجموعة شراء المعدات الطبية',
    deadline: '2025-06-05',
    totalVoters: 12,
    votedCount: 8,
    options: [
      {
        id: 'supplier_a',
        name: language === 'en' ? 'Medical Supply Co.' : 'شركة التوريدات الطبية',
        description: language === 'en' 
          ? 'Best price with 30-day delivery'
          : 'أفضل سعر مع التسليم خلال 30 يوم',
        votes: 5,
        percentage: 62.5
      },
      {
        id: 'supplier_b', 
        name: language === 'en' ? 'HealthTech Solutions' : 'شركة هيلث تك',
        description: language === 'en'
          ? 'Premium quality with 15-day delivery'
          : 'جودة ممتازة مع التسليم خلال 15 يوم',
        votes: 2,
        percentage: 25
      },
      {
        id: 'reopen',
        name: language === 'en' ? 'Reopen Applications' : 'إعادة فتح التقديمات',
        description: language === 'en'
          ? 'Request new supplier offers'
          : 'طلب عروض موردين جدد',
        votes: 1,
        percentage: 12.5
      }
    ]
  };

  const handleVote = async () => {
    if (!selectedVote) {
      toast.error(language === 'en' ? 'Please select an option' : 'يرجى اختيار خيار');
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setHasVoted(true);
      toast.success(language === 'en' ? 'Vote submitted successfully!' : 'تم تسجيل تصويتك بنجاح!');
    } catch (error) {
      toast.error(language === 'en' ? 'Failed to submit vote' : 'فشل في تسجيل التصويت');
    }
  };

  const daysLeft = Math.ceil((new Date(votingData.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
            <Vote className="h-6 w-6" />
            {language === 'en' ? 'Group Voting' : 'تصويت المجموعة'}
          </h1>
          <p className="text-gray-600 mt-2">
            {language === 'en' 
              ? 'Participate in democratic decision making'
              : 'شارك في اتخاذ القرار الديمقراطي'}
          </p>
        </div>

        {/* Voting Status */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{votingData.title}</CardTitle>
                <CardDescription className="mt-2">
                  {votingData.description}
                </CardDescription>
              </div>
              <Badge variant={daysLeft > 0 ? "default" : "destructive"}>
                <Clock className="w-4 h-4 mr-1" />
                {daysLeft > 0 
                  ? `${daysLeft} ${language === 'en' ? 'days left' : 'أيام متبقية'}`
                  : (language === 'en' ? 'Ended' : 'انتهى')}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>
                  {votingData.votedCount}/{votingData.totalVoters} {language === 'en' ? 'voted' : 'صوتوا'}
                </span>
              </div>
              <Progress 
                value={(votingData.votedCount / votingData.totalVoters) * 100} 
                className="flex-1"
              />
              <span>{Math.round((votingData.votedCount / votingData.totalVoters) * 100)}%</span>
            </div>
          </CardContent>
        </Card>

        {/* Voting Options */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            {language === 'en' ? 'Available Options' : 'الخيارات المتاحة'}
          </h2>
          
          {votingData.options.map((option) => (
            <Card 
              key={option.id}
              className={`cursor-pointer transition-all ${
                selectedVote === option.id 
                  ? 'ring-2 ring-blue-500 bg-blue-50' 
                  : 'hover:shadow-md'
              } ${hasVoted ? 'pointer-events-none' : ''}`}
              onClick={() => !hasVoted && setSelectedVote(option.id)}
            >
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        selectedVote === option.id 
                          ? 'bg-blue-500 border-blue-500' 
                          : 'border-gray-300'
                      }`}>
                        {selectedVote === option.id && (
                          <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                        )}
                      </div>
                      <h3 className="font-medium">{option.name}</h3>
                      {hasVoted && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <p className="text-gray-600 mt-1 ml-6">{option.description}</p>
                  </div>
                  
                  {hasVoted && (
                    <div className="text-right">
                      <div className="text-lg font-bold">{option.votes}</div>
                      <div className="text-sm text-gray-500">
                        {option.percentage}%
                      </div>
                    </div>
                  )}
                </div>
                
                {hasVoted && (
                  <div className="mt-3 ml-6">
                    <Progress value={option.percentage} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Vote Button */}
        {!hasVoted && daysLeft > 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <p className="text-sm text-gray-600">
                  {language === 'en' 
                    ? 'Your vote is confidential and cannot be changed after submission'
                    : 'تصويتك سري ولا يمكن تغييره بعد الإرسال'}
                </p>
                <Button 
                  onClick={handleVote}
                  disabled={!selectedVote}
                  className="px-8"
                >
                  <Vote className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'Submit Vote' : 'تسجيل التصويت'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Summary */}
        {hasVoted && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                {language === 'en' ? 'Vote Submitted' : 'تم تسجيل تصويتك'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Thank you for participating! Results will be finalized when voting ends.'
                  : 'شكرًا لمشاركتك! ستكون النتائج نهائية عند انتهاء التصويت.'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Voting;
