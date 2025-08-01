
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, Award, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

interface ExamQuestion {
  id: string;
  question: string;
  questionAr: string;
  options: {
    id: string;
    text: string;
    textAr: string;
    isCorrect: boolean;
  }[];
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface ExamResult {
  score: number;
  totalQuestions: number;
  passed: boolean;
  categoryScores: Record<string, number>;
  completedAt: Date;
}

const MCPExam: React.FC = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [examStarted, setExamStarted] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock exam questions - in real app, these would come from backend
  const examQuestions: ExamQuestion[] = [
    {
      id: '1',
      question: 'What is the primary purpose of a Group Purchasing Organization (GPO)?',
      questionAr: 'ما هو الغرض الأساسي من منظمة الشراء الجماعي؟',
      options: [
        { id: 'a', text: 'To compete with suppliers', textAr: 'للمنافسة مع الموردين', isCorrect: false },
        { id: 'b', text: 'To combine purchasing power for better prices', textAr: 'لدمج القوة الشرائية للحصول على أسعار أفضل', isCorrect: true },
        { id: 'c', text: 'To eliminate small businesses', textAr: 'للقضاء على الشركات الصغيرة', isCorrect: false },
        { id: 'd', text: 'To control the market', textAr: 'للسيطرة على السوق', isCorrect: false }
      ],
      category: 'GPO Fundamentals',
      difficulty: 'easy'
    },
    {
      id: '2',
      question: 'In a cooperative purchasing scenario, what is the minimum number of members typically required?',
      questionAr: 'في سيناريو الشراء التعاوني، ما هو الحد الأدنى لعدد الأعضاء المطلوب عادة؟',
      options: [
        { id: 'a', text: '2 members', textAr: 'عضوان', isCorrect: false },
        { id: 'b', text: '5 members', textAr: '5 أعضاء', isCorrect: true },
        { id: 'c', text: '10 members', textAr: '10 أعضاء', isCorrect: false },
        { id: 'd', text: '20 members', textAr: '20 عضو', isCorrect: false }
      ],
      category: 'Group Management',
      difficulty: 'medium'
    },
    {
      id: '3',
      question: 'What is the role of arbitration in business disputes?',
      questionAr: 'ما هو دور التحكيم في المنازعات التجارية؟',
      options: [
        { id: 'a', text: 'To replace court systems entirely', textAr: 'لاستبدال أنظمة المحاكم بالكامل', isCorrect: false },
        { id: 'b', text: 'To provide alternative dispute resolution', textAr: 'لتوفير حل بديل للمنازعات', isCorrect: true },
        { id: 'c', text: 'To favor larger companies', textAr: 'لتفضيل الشركات الكبيرة', isCorrect: false },
        { id: 'd', text: 'To delay legal proceedings', textAr: 'لتأخير الإجراءات القانونية', isCorrect: false }
      ],
      category: 'Legal Framework',
      difficulty: 'medium'
    },
    {
      id: '4',
      question: 'Which document is typically used to initiate a business transaction in international trade?',
      questionAr: 'أي وثيقة تُستخدم عادة لبدء المعاملة التجارية في التجارة الدولية؟',
      options: [
        { id: 'a', text: 'Bill of Lading', textAr: 'بوليصة الشحن', isCorrect: false },
        { id: 'b', text: 'Letter of Intent (LOI)', textAr: 'خطاب النوايا', isCorrect: true },
        { id: 'c', text: 'Invoice', textAr: 'الفاتورة', isCorrect: false },
        { id: 'd', text: 'Certificate of Origin', textAr: 'شهادة المنشأ', isCorrect: false }
      ],
      category: 'International Trade',
      difficulty: 'hard'
    },
    {
      id: '5',
      question: 'What is the primary benefit of using IPFS for document storage?',
      questionAr: 'ما هي الفائدة الأساسية من استخدام IPFS لتخزين المستندات؟',
      options: [
        { id: 'a', text: 'Cheaper storage costs', textAr: 'تكاليف تخزين أرخص', isCorrect: false },
        { id: 'b', text: 'Decentralized and tamper-proof storage', textAr: 'تخزين لامركزي ومضاد للتلاعب', isCorrect: true },
        { id: 'c', text: 'Faster download speeds', textAr: 'سرعات تحميل أسرع', isCorrect: false },
        { id: 'd', text: 'Better user interface', textAr: 'واجهة مستخدم أفضل', isCorrect: false }
      ],
      category: 'Technology',
      difficulty: 'hard'
    }
  ];

  const passingScore = 70; // 70% to pass

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (examStarted && !examCompleted && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [examStarted, examCompleted, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStartExam = () => {
    setExamStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setExamCompleted(false);
    setExamResult(null);
    setTimeLeft(3600);
  };

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < examQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateScore = (): ExamResult => {
    let correctAnswers = 0;
    const categoryScores: Record<string, { correct: number; total: number }> = {};

    examQuestions.forEach(question => {
      const selectedAnswer = selectedAnswers[question.id];
      const correctOption = question.options.find(opt => opt.isCorrect);
      
      if (!categoryScores[question.category]) {
        categoryScores[question.category] = { correct: 0, total: 0 };
      }
      categoryScores[question.category].total++;

      if (selectedAnswer === correctOption?.id) {
        correctAnswers++;
        categoryScores[question.category].correct++;
      }
    });

    const score = Math.round((correctAnswers / examQuestions.length) * 100);
    const passed = score >= passingScore;

    const finalCategoryScores: Record<string, number> = {};
    Object.entries(categoryScores).forEach(([category, data]) => {
      finalCategoryScores[category] = Math.round((data.correct / data.total) * 100);
    });

    return {
      score,
      totalQuestions: examQuestions.length,
      passed,
      categoryScores: finalCategoryScores,
      completedAt: new Date()
    };
  };

  const handleSubmitExam = async () => {
    setIsSubmitting(true);
    
    // Calculate results
    const result = calculateScore();
    setExamResult(result);
    setExamCompleted(true);
    setExamStarted(false);

    // In real app, save results to backend
    try {
      // await saveExamResult(result);
      toast.success(
        result.passed 
          ? (language === 'ar' ? 'مبروك! لقد نجحت في الاختبار' : 'Congratulations! You passed the exam')
          : (language === 'ar' ? 'لم تنجح في الاختبار. يمكنك إعادة المحاولة' : 'You did not pass. You can retake the exam')
      );
    } catch (error) {
      toast.error(language === 'ar' ? 'فشل في حفظ النتائج' : 'Failed to save results');
    }

    setIsSubmitting(false);
  };

  const handleRetakeExam = () => {
    setExamCompleted(false);
    setExamResult(null);
    handleStartExam();
  };

  if (!examStarted && !examCompleted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Award className="h-16 w-16 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">
            {language === 'ar' ? 'اختبار منصة MCP' : 'MCP Platform Exam'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              {language === 'ar' 
                ? 'اختبار شامل لقياس معرفتك بأساسيات الشراء الجماعي والتجارة الدولية'
                : 'Comprehensive exam to assess your knowledge of group purchasing and international trade fundamentals'
              }
            </p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900">
                  {language === 'ar' ? 'عدد الأسئلة' : 'Questions'}
                </h4>
                <p className="text-blue-700">{examQuestions.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900">
                  {language === 'ar' ? 'الوقت المحدد' : 'Time Limit'}
                </h4>
                <p className="text-green-700">60 {language === 'ar' ? 'دقيقة' : 'minutes'}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900">
                  {language === 'ar' ? 'درجة النجاح' : 'Passing Score'}
                </h4>
                <p className="text-yellow-700">{passingScore}%</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900">
                  {language === 'ar' ? 'المحاولات' : 'Attempts'}
                </h4>
                <p className="text-purple-700">{language === 'ar' ? 'غير محدود' : 'Unlimited'}</p>
              </div>
            </div>
          </div>

          <Button onClick={handleStartExam} className="w-full" size="lg">
            {language === 'ar' ? 'بدء الاختبار' : 'Start Exam'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (examCompleted && examResult) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {examResult.passed ? (
              <CheckCircle className="h-16 w-16 text-green-600" />
            ) : (
              <XCircle className="h-16 w-16 text-red-600" />
            )}
          </div>
          <CardTitle className="text-2xl">
            {examResult.passed 
              ? (language === 'ar' ? 'نجحت في الاختبار!' : 'Exam Passed!')
              : (language === 'ar' ? 'لم تنجح في الاختبار' : 'Exam Failed')
            }
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2" style={{ color: examResult.passed ? '#16a34a' : '#dc2626' }}>
              {examResult.score}%
            </div>
            <p className="text-gray-600">
              {examResult.score >= passingScore
                ? (language === 'ar' ? 'درجة ممتازة!' : 'Excellent score!')
                : (language === 'ar' ? `تحتاج ${passingScore}% للنجاح` : `Need ${passingScore}% to pass`)
              }
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">
              {language === 'ar' ? 'النتائج بالفئة:' : 'Results by Category:'}
            </h3>
            {Object.entries(examResult.categoryScores).map(([category, score]) => (
              <div key={category} className="flex items-center justify-between">
                <span className="text-sm">{category}</span>
                <div className="flex items-center space-x-2">
                  <Progress value={score} className="w-24" />
                  <span className="text-sm font-medium">{score}%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center text-sm text-gray-600">
            {language === 'ar' ? 'تم الإكمال في:' : 'Completed on:'} {' '}
            {examResult.completedAt.toLocaleDateString()}
          </div>

          {!examResult.passed && (
            <Button onClick={handleRetakeExam} className="w-full" variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              {language === 'ar' ? 'إعادة الاختبار' : 'Retake Exam'}
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  // Exam in progress
  const question = examQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / examQuestions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Exam Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="font-medium">
                {language === 'ar' ? 'الوقت المتبقي:' : 'Time remaining:'} {formatTime(timeLeft)}
              </span>
            </div>
            <Badge variant="outline">
              {language === 'ar' ? 'سؤال' : 'Question'} {currentQuestion + 1} / {examQuestions.length}
            </Badge>
          </div>
          <Progress value={progress} className="w-full" />
        </CardContent>
      </Card>

      {/* Current Question */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="secondary">{question.category}</Badge>
            <Badge variant={question.difficulty === 'easy' ? 'default' : question.difficulty === 'medium' ? 'secondary' : 'destructive'}>
              {question.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {language === 'ar' ? question.questionAr : question.question}
            </h2>

            <RadioGroup
              value={selectedAnswers[question.id] || ''}
              onValueChange={(value) => handleAnswerSelect(question.id, value)}
            >
              {question.options.map((option) => (
                <div key={option.id} className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                    {language === 'ar' ? option.textAr : option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex justify-between items-center pt-4">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
            >
              {language === 'ar' ? 'السابق' : 'Previous'}
            </Button>

            <div className="flex space-x-2">
              {currentQuestion === examQuestions.length - 1 ? (
                <Button
                  onClick={handleSubmitExam}
                  disabled={!selectedAnswers[question.id] || isSubmitting}
                >
                  {isSubmitting ? (
                    <>{language === 'ar' ? 'جاري الإرسال...' : 'Submitting...'}</>
                  ) : (
                    <>{language === 'ar' ? 'إنهاء الاختبار' : 'Finish Exam'}</>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleNextQuestion}
                  disabled={!selectedAnswers[question.id]}
                >
                  {language === 'ar' ? 'التالي' : 'Next'}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MCPExam;
