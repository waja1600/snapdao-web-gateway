
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Bot, 
  Send, 
  Wand2, 
  Settings, 
  Sparkles,
  MessageSquare,
  Zap,
  Brain
} from 'lucide-react';

export const AIPromptBox: React.FC = () => {
  const { language } = useLanguage();
  const [prompt, setPrompt] = useState('');
  const [mode, setMode] = useState<'ask' | 'manual' | 'auto'>('ask');
  const [isProcessing, setIsProcessing] = useState(false);

  const modes = [
    {
      key: 'ask' as const,
      icon: MessageSquare,
      label: language === 'ar' ? 'سؤال' : 'Ask',
      description: language === 'ar' ? 'اطرح سؤالاً واحصل على إجابة فورية' : 'Ask a question and get instant answer',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      key: 'manual' as const,
      icon: Settings,
      label: language === 'ar' ? 'يدوي' : 'Manual',
      description: language === 'ar' ? 'تحكم يدوي في العمليات والمهام' : 'Manual control over operations and tasks',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      key: 'auto' as const,
      icon: Zap,
      label: language === 'ar' ? 'تلقائي' : 'Auto',
      description: language === 'ar' ? 'تنفيذ تلقائي ذكي للمهام' : 'Smart automatic task execution',
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  const suggestions = language === 'ar' ? [
    'إنشاء مشروع جديد للتجارة الإلكترونية',
    'تنظيم فريق عمل لتطوير التطبيق',
    'إعداد نظام التصويت للمقترحات',
    'إنشاء عقد تعاون مع المورد',
    'تحليل أداء المشاريع الحالية'
  ] : [
    'Create a new e-commerce project',
    'Organize development team workflow',
    'Set up proposal voting system',
    'Create supplier collaboration contract',
    'Analyze current project performance'
  ];

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    
    setIsProcessing(true);
    
    // محاكاة معالجة الطلب
    setTimeout(() => {
      console.log(`Processing ${mode} request:`, prompt);
      setIsProcessing(false);
      setPrompt('');
    }, 2000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50 border-2 border-blue-200 shadow-xl">
      <CardContent className="p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Bot className="h-12 w-12 text-blue-600" />
              <Sparkles className="h-6 w-6 absolute -top-1 -right-1 text-yellow-500 animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {language === 'ar' ? 'مساعد AI الذكي' : 'Smart AI Assistant'}
              </h2>
              <p className="text-sm text-gray-600">
                {language === 'ar' ? 'اطلب أي شيء وسأنفذه لك فوراً' : 'Ask anything and I\'ll execute it instantly'}
              </p>
            </div>
          </div>
        </div>

        {/* Mode Selection */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {modes.map((modeOption) => {
            const Icon = modeOption.icon;
            return (
              <button
                key={modeOption.key}
                onClick={() => setMode(modeOption.key)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  mode === modeOption.key
                    ? 'border-blue-500 bg-blue-50 shadow-md scale-105'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={`p-2 rounded-full text-white ${
                    mode === modeOption.key ? modeOption.color : 'bg-gray-400'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-sm">{modeOption.label}</span>
                  <span className="text-xs text-gray-500 text-center leading-tight">
                    {modeOption.description}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Mode Badge */}
        <div className="flex justify-center mb-4">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-4 py-2">
            <Brain className="h-4 w-4 mr-2" />
            {language === 'ar' ? `الوضع النشط: ${modes.find(m => m.key === mode)?.label}` : `Active Mode: ${modes.find(m => m.key === mode)?.label}`}
          </Badge>
        </div>

        {/* Prompt Input */}
        <div className="space-y-4">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={language === 'ar' 
              ? 'اكتب طلبك هنا... مثال: "إنشاء مشروع جديد لتطوير متجر إلكتروني"'
              : 'Type your request here... Example: "Create a new e-commerce project"'
            }
            className="min-h-[120px] text-lg border-2 border-gray-200 focus:border-blue-500 resize-none"
            disabled={isProcessing}
          />
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {prompt.length}/500 {language === 'ar' ? 'حرف' : 'characters'}
            </span>
            <Button
              onClick={handleSubmit}
              disabled={!prompt.trim() || isProcessing}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-medium"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {language === 'ar' ? 'جاري التنفيذ...' : 'Processing...'}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  {language === 'ar' ? 'تنفيذ' : 'Execute'}
                </div>
              )}
            </Button>
          </div>
        </div>

        {/* Quick Suggestions */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            {language === 'ar' ? 'اقتراحات سريعة:' : 'Quick Suggestions:'}
          </h3>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors text-sm"
                disabled={isProcessing}
              >
                <div className="flex items-center gap-2">
                  <Wand2 className="h-4 w-4 text-blue-500 flex-shrink-0" />
                  <span>{suggestion}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Features Info */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <MessageSquare className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <h4 className="font-medium text-sm text-gray-800">
                {language === 'ar' ? 'سؤال فوري' : 'Instant Ask'}
              </h4>
              <p className="text-xs text-gray-600">
                {language === 'ar' ? 'إجابات سريعة' : 'Quick answers'}
              </p>
            </div>
            <div>
              <Settings className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <h4 className="font-medium text-sm text-gray-800">
                {language === 'ar' ? 'تحكم يدوي' : 'Manual Control'}
              </h4>
              <p className="text-xs text-gray-600">
                {language === 'ar' ? 'تحكم كامل' : 'Full control'}
              </p>
            </div>
            <div>
              <Zap className="h-6 w-6 text-purple-500 mx-auto mb-2" />
              <h4 className="font-medium text-sm text-gray-800">
                {language === 'ar' ? 'تنفيذ تلقائي' : 'Auto Execute'}
              </h4>
              <p className="text-xs text-gray-600">
                {language === 'ar' ? 'ذكي وسريع' : 'Smart & fast'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
