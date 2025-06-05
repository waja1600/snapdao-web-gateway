
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMCPAssistant } from './useMCPAssistant';
import { MCPHeader } from './MCPHeader';
import { MCPEmptyState } from './MCPEmptyState';
import { MCPChatMessage } from './MCPChatMessage';
import { MCPChatInput } from './MCPChatInput';

export const MCPAssistant: React.FC = () => {
  const { language } = useLanguage();
  const {
    isOpen,
    setIsOpen,
    isMinimized,
    setIsMinimized,
    query,
    setQuery,
    queries,
    isLoading,
    messagesEndRef,
    handleSubmit,
    handleAcceptAction
  } = useMCPAssistant(language);

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
      <MCPHeader
        language={language}
        isMinimized={isMinimized}
        onToggleMinimize={() => setIsMinimized(!isMinimized)}
        onClose={() => setIsOpen(false)}
      />

      {!isMinimized && (
        <>
          <CardContent className="p-0 h-80 overflow-y-auto">
            <div className="p-4 space-y-4">
              {queries.length === 0 && <MCPEmptyState language={language} />}

              {queries.map((q) => (
                <MCPChatMessage
                  key={q.id}
                  query={q}
                  language={language}
                  onAcceptAction={handleAcceptAction}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>

          <MCPChatInput
            query={query}
            isLoading={isLoading}
            language={language}
            onQueryChange={setQuery}
            onSubmit={handleSubmit}
          />
        </>
      )}
    </Card>
  );
};
