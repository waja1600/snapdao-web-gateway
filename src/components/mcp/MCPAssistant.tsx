
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { mcpService, MCPSuggestion } from '@/services/mcp-service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Bot, Send, Loader, Check, X, Settings, Minimize2, Maximize2 } from 'lucide-react';
import { toast } from 'sonner';

interface MCPAssistantProps {
  position?: 'fixed' | 'relative';
}

export const MCPAssistant: React.FC<MCPAssistantProps> = ({ position = 'fixed' }) => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<MCPSuggestion[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmitQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || !user) return;

    setIsProcessing(true);
    try {
      const results = await mcpService.processUserQuery(query, user.id);
      setSuggestions(results);
      setQuery('');
    } catch (error) {
      toast.error(language === 'en' ? 'Failed to process query' : 'فشل في معالجة الاستعلام');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAcceptSuggestion = async (commandId: string, suggestionId: string) => {
    const success = await mcpService.acceptSuggestion(commandId, suggestionId);
    if (success) {
      setSuggestions(prev => prev.filter(s => s.id !== suggestionId));
    }
  };

  const handleRejectSuggestion = async (suggestionId: string) => {
    setSuggestions(prev => prev.filter(s => s.id !== suggestionId));
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-green-100 text-green-800';
    if (confidence >= 0.6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getConfidenceText = (confidence: number) => {
    if (confidence >= 0.8) return language === 'en' ? 'High Confidence' : 'ثقة عالية';
    if (confidence >= 0.6) return language === 'en' ? 'Medium Confidence' : 'ثقة متوسطة';
    return language === 'en' ? 'Low Confidence' : 'ثقة منخفضة';
  };

  if (position === 'fixed') {
    return (
      <>
        {/* Floating Assistant Button */}
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-lg"
          size="icon"
        >
          <Bot className="h-6 w-6" />
        </Button>

        {/* Assistant Dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                {language === 'en' ? 'GPO Assistant' : 'مساعد GPO'}
              </DialogTitle>
              <DialogDescription>
                {language === 'en' 
                  ? 'Ask me anything about managing your groups, projects, or using the platform'
                  : 'اسألني عن أي شيء حول إدارة مجموعاتك أو مشاريعك أو استخدام المنصة'}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Query Input */}
              <form onSubmit={handleSubmitQuery} className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={language === 'en' 
                    ? 'What would you like me to help you with?' 
                    : 'بماذا يمكنني مساعدتك؟'}
                  disabled={isProcessing}
                />
                <Button type="submit" disabled={isProcessing || !query.trim()}>
                  {isProcessing ? <Loader className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </form>

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium">
                    {language === 'en' ? 'Suggestions' : 'الاقتراحات'}
                  </h4>
                  {suggestions.map((suggestion) => (
                    <Card key={suggestion.id} className="border">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-base">{suggestion.title}</CardTitle>
                            <CardDescription className="mt-1">
                              {suggestion.description}
                            </CardDescription>
                          </div>
                          <Badge className={getConfidenceColor(suggestion.confidence)}>
                            {getConfidenceText(suggestion.confidence)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleAcceptSuggestion('temp-command-id', suggestion.id)}
                            className="flex-1"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            {language === 'en' ? 'Accept' : 'قبول'}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRejectSuggestion(suggestion.id)}
                          >
                            <X className="h-4 w-4 mr-1" />
                            {language === 'en' ? 'Reject' : 'رفض'}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              mcpService.switchToManual('temp-command-id');
                              handleRejectSuggestion(suggestion.id);
                            }}
                          >
                            <Settings className="h-4 w-4 mr-1" />
                            {language === 'en' ? 'Manual' : 'يدوي'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Quick Actions */}
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">
                  {language === 'en' ? 'Quick Actions' : 'إجراءات سريعة'}
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuery(language === 'en' ? 'Create a new group' : 'إنشاء مجموعة جديدة')}
                  >
                    {language === 'en' ? 'Create Group' : 'إنشاء مجموعة'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuery(language === 'en' ? 'Invite freelancers' : 'دعوة مستقلين')}
                  >
                    {language === 'en' ? 'Invite Freelancers' : 'دعوة مستقلين'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuery(language === 'en' ? 'Create new proposal' : 'إنشاء اقتراح جديد')}
                  >
                    {language === 'en' ? 'New Proposal' : 'اقتراح جديد'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuery(language === 'en' ? 'Manage projects' : 'إدارة المشاريع')}
                  >
                    {language === 'en' ? 'Manage Projects' : 'إدارة المشاريع'}
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // Embedded version for pages
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            <CardTitle className="text-lg">
              {language === 'en' ? 'GPO Assistant' : 'مساعد GPO'}
            </CardTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      
      {!isMinimized && (
        <CardContent>
          <form onSubmit={handleSubmitQuery} className="flex gap-2 mb-4">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={language === 'en' 
                ? 'How can I help you?' 
                : 'كيف يمكنني مساعدتك؟'}
              disabled={isProcessing}
            />
            <Button type="submit" disabled={isProcessing || !query.trim()}>
              {isProcessing ? <Loader className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>

          {suggestions.length > 0 && (
            <div className="space-y-2">
              {suggestions.map((suggestion) => (
                <div key={suggestion.id} className="border rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-medium text-sm">{suggestion.title}</h5>
                    <Badge variant="outline" className="text-xs">
                      {Math.round(suggestion.confidence * 100)}%
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => handleAcceptSuggestion('temp-command-id', suggestion.id)}
                    >
                      {language === 'en' ? 'Accept' : 'قبول'}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs"
                      onClick={() => handleRejectSuggestion(suggestion.id)}
                    >
                      {language === 'en' ? 'Reject' : 'رفض'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};
