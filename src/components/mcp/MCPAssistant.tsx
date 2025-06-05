
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MCPService, MCPQuery, MCPAction } from '@/services/mcp-service';
import { MessageCircle, Send, Check, X, Bot, User, Minimize2, Maximize2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

const mcpService = new MCPService();

export const MCPAssistant: React.FC = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [query, setQuery] = useState('');
  const [queries, setQueries] = useState<MCPQuery[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [queries]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const result = await mcpService.processQuery(query);
      setQueries(prev => [...prev, result]);
      setQuery('');
    } catch (error) {
      console.error('Error processing query:', error);
      toast.error(language === 'ar' ? 'حدث خطأ في معالجة الاستعلام' : 'Error processing query');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptAction = async (actionId: string) => {
    try {
      await mcpService.acceptAction(actionId);
      await mcpService.executeAction(actionId);
      
      // تحديث الاستعلامات لعرض التغييرات
      setQueries(prev => prev.map(q => ({
        ...q,
        suggestedActions: q.suggestedActions.map(action => 
          action.id === actionId 
            ? { ...action, userAccepted: true, executed: true, executedAt: new Date() }
            : action
        )
      })));
      
      toast.success(language === 'ar' ? 'تم تنفيذ الإجراء بنجاح' : 'Action executed successfully');
    } catch (error) {
      console.error('Error executing action:', error);
      toast.error(language === 'ar' ? 'حدث خطأ في تنفيذ الإجراء' : 'Error executing action');
    }
  };

  const ActionButton: React.FC<{ action: MCPAction }> = ({ action }) => {
    if (action.executed) {
      return (
        <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
          <Check className="h-4 w-4" />
          <span>{language === 'ar' ? 'تم التنفيذ' : 'Executed'}</span>
          {action.executedAt && (
            <span className="text-gray-500 text-xs">
              ({action.executedAt.toLocaleTimeString()})
            </span>
          )}
        </div>
      );
    }

    return (
      <div className="flex gap-2">
        <Button 
          size="sm" 
          onClick={() => handleAcceptAction(action.id)}
          className="bg-green-600 hover:bg-green-700 font-medium"
        >
          <Check className="h-4 w-4 mr-1" />
          {language === 'ar' ? 'قبول وتنفيذ' : 'Accept & Execute'}
        </Button>
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => toast.info(language === 'ar' ? 'تم رفض الإجراء' : 'Action rejected')}
          className="font-medium"
        >
          <X className="h-4 w-4 mr-1" />
          {language === 'ar' ? 'رفض' : 'Reject'}
        </Button>
      </div>
    );
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg z-50 font-medium"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className={`fixed bottom-6 right-6 z-50 shadow-xl transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
    }`}>
      <div className="flex items-center justify-between p-4 border-b bg-blue-50">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-lg">
            {language === 'ar' ? 'المساعد الذكي' : 'AI Assistant'}
          </h3>
        </div>
        <div className="flex gap-1">
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-8 w-8 p-0"
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <CardContent className="p-0 h-80 overflow-y-auto">
            <div className="p-4 space-y-4">
              {queries.length === 0 && (
                <div className="text-center text-gray-500 mt-12">
                  <Bot className="h-12 w-12 mx-auto mb-3 text-blue-600" />
                  <p className="font-medium text-lg">
                    {language === 'ar' 
                      ? 'كيف يمكنني مساعدتك اليوم؟' 
                      : 'How can I help you today?'}
                  </p>
                </div>
              )}

              {queries.map((q) => (
                <div key={q.id} className="space-y-3">
                  {/* User Query */}
                  <div className="flex gap-2">
                    <User className="h-5 w-5 text-gray-600 mt-1 flex-shrink-0" />
                    <div className="bg-gray-100 rounded-lg p-3 flex-1 border">
                      <p className="text-sm font-medium">{q.userQuery}</p>
                      <span className="text-xs text-gray-500">
                        {q.createdAt.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex gap-2">
                    <Bot className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div className="bg-blue-50 rounded-lg p-3 flex-1 border border-blue-200">
                      <p className="text-sm font-medium">{q.aiResponse}</p>
                      
                      {/* Suggested Actions */}
                      {q.suggestedActions.length > 0 && (
                        <div className="mt-3 space-y-2">
                          <p className="text-xs font-semibold text-gray-700">
                            {language === 'ar' ? 'الإجراءات المقترحة:' : 'Suggested Actions:'}
                          </p>
                          {q.suggestedActions.map((action) => (
                            <div key={action.id} className="bg-white rounded-lg p-3 text-sm border">
                              <p className="font-medium mb-2">{action.description}</p>
                              <ActionButton action={action} />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>

          <form onSubmit={handleSubmit} className="p-4 border-t bg-gray-50">
            <div className="flex gap-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={language === 'ar' ? 'اسأل عن أي شيء...' : 'Ask me anything...'}
                disabled={isLoading}
                className="flex-1 font-medium"
              />
              <Button 
                type="submit" 
                disabled={isLoading || !query.trim()}
                className="bg-blue-600 hover:bg-blue-700 font-medium"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </>
      )}
    </Card>
  );
};
