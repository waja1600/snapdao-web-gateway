
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useLanguage } from '@/contexts/LanguageContext';
import { vettingService, AssessmentQuestion } from '@/services/freelancer-vetting-service';
import { Award, FileText, Brain, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface FreelancerAssessmentProps {
  freelancerId: string;
  onComplete: (assessment: any) => void;
}

export const FreelancerAssessment: React.FC<FreelancerAssessmentProps> = ({ 
  freelancerId, 
  onComplete 
}) => {
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [specialization, setSpecialization] = useState('');
  const [documents, setDocuments] = useState({
    id: false,
    education: false,
    certification: false,
    portfolio: false
  });

  const startAssessment = (selectedSpecialization: string) => {
    setSpecialization(selectedSpecialization);
    setQuestions(vettingService.getAssessmentQuestions(selectedSpecialization));
    setCurrentStep(2);
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmitAssessment = async () => {
    try {
      const assessment = await vettingService.conductAssessment(freelancerId, answers);
      onComplete(assessment);
      toast.success(
        `${language === 'en' ? 'Assessment completed! Grade:' : 'تم إكمال التقييم! الدرجة:'} ${assessment.aiGrade}`
      );
    } catch (error) {
      toast.error(language === 'en' ? 'Assessment failed' : 'فشل التقييم');
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'text-green-600';
      case 'B': return 'text-blue-600';
      case 'C': return 'text-yellow-600';
      case 'D': return 'text-orange-600';
      case 'F': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  if (currentStep === 1) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6" />
            {language === 'en' ? 'Freelancer Vetting Assessment' : 'تقييم فحص المستقلين'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">
              {language === 'en' ? 'Harvard Business School Methodology' : 'منهجية كلية هارفارد للأعمال'}
            </h4>
            <p className="text-blue-700 text-sm">
              {language === 'en' 
                ? 'Our assessment follows Harvard Business School\'s competency evaluation framework, testing both technical skills and business acumen.'
                : 'يتبع تقييمنا إطار تقييم الكفاءات لكلية هارفارد للأعمال، اختبار المهارات التقنية والفطنة التجارية.'}
            </p>
          </div>

          <div>
            <Label>
              {language === 'en' ? 'Select Your Specialization' : 'اختر تخصصك'}
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              {[
                { value: 'development', label: language === 'en' ? 'Software Development' : 'تطوير البرمجيات' },
                { value: 'design', label: language === 'en' ? 'Design & Creative' : 'التصميم والإبداع' },
                { value: 'marketing', label: language === 'en' ? 'Digital Marketing' : 'التسويق الرقمي' },
                { value: 'business', label: language === 'en' ? 'Business Consulting' : 'الاستشارات التجارية' },
                { value: 'writing', label: language === 'en' ? 'Content Writing' : 'كتابة المحتوى' },
                { value: 'data', label: language === 'en' ? 'Data Analysis' : 'تحليل البيانات' }
              ].map((spec) => (
                <Button
                  key={spec.value}
                  variant="outline"
                  onClick={() => startAssessment(spec.value)}
                  className="h-auto p-4 text-left justify-start"
                >
                  <div>
                    <div className="font-medium">{spec.label}</div>
                    <div className="text-sm text-gray-600">
                      {language === 'en' ? 'AI-powered assessment' : 'تقييم مدعوم بالذكي الاصطناعي'}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">
              {language === 'en' ? 'Document Verification Required' : 'التحقق من المستندات المطلوب'}
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                { key: 'id', label: language === 'en' ? 'Government ID' : 'الهوية الحكومية' },
                { key: 'education', label: language === 'en' ? 'Education Certificate' : 'شهادة التعليم' },
                { key: 'certification', label: language === 'en' ? 'Professional Certification' : 'الشهادة المهنية' },
                { key: 'portfolio', label: language === 'en' ? 'Work Portfolio' : 'محفظة الأعمال' }
              ].map((doc) => (
                <div key={doc.key} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={documents[doc.key as keyof typeof documents]}
                    onChange={(e) => setDocuments(prev => ({ ...prev, [doc.key]: e.target.checked }))}
                  />
                  <span>{doc.label}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (currentStep === 2) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'en' ? 'Assessment Questions' : 'أسئلة التقييم'}
          </CardTitle>
          <div className="flex gap-2 mt-4">
            {questions.map((_, i) => (
              <div key={i} className={`h-2 flex-1 rounded ${i < questions.length ? 'bg-blue-600' : 'bg-gray-200'}`} />
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {questions.map((question, index) => (
            <div key={question.id} className="space-y-4">
              <div className="flex items-start gap-3">
                <Badge variant="outline">{question.category}</Badge>
                <div className="flex-1">
                  <h4 className="font-medium mb-2">{question.question}</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {language === 'en' ? 'Points:' : 'النقاط:'} {question.points}
                  </p>
                  
                  {question.type === 'multiple_choice' && question.options && (
                    <RadioGroup 
                      value={answers[question.id] || ''} 
                      onValueChange={(value) => handleAnswerChange(question.id, value)}
                    >
                      {question.options.map((option, optIndex) => (
                        <div key={optIndex} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`${question.id}-${optIndex}`} />
                          <Label htmlFor={`${question.id}-${optIndex}`}>{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                  
                  {(question.type === 'essay' || question.type === 'code') && (
                    <Textarea
                      value={answers[question.id] || ''}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      placeholder={language === 'en' ? 'Enter your answer...' : 'أدخل إجابتك...'}
                      rows={question.type === 'code' ? 8 : 4}
                      className={question.type === 'code' ? 'font-mono' : ''}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}

          <Button onClick={handleSubmitAssessment} className="w-full">
            <Award className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Submit Assessment' : 'تقديم التقييم'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return null;
};
