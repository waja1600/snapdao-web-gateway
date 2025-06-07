
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { MCPService } from '@/services/mcp-service';
import { MCPWorkflowService } from '@/services/mcp-workflow-service';
import { 
  Send, 
  PanelLeftClose, 
  Bot, 
  User, 
  Clock,
  CheckCircle,
  AlertCircle,
  Workflow
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface WorkspaceChatProps {
  onCollapse: () => void;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  actions?: any[];
}

export const WorkspaceChat: React.FC<WorkspaceChatProps> = ({ onCollapse }) => {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'system',
      content: language === 'ar' 
        ? 'مرحباً! أنا مساعد سير العمل الذكي. يمكنني مساعدتك في إدارة المهام والمشاريع.'
        : 'Hello! I\'m your AI workflow assistant. I can help you manage tasks and projects.',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mcpService = new MCPService();
  const workflowService = new MCPWorkflowService();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Process query through MCP service
      const mcpResponse = await workflowService.processWorkflowQuery(input);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: mcpResponse.aiResponse,
        timestamp: new Date(),
        actions: mcpResponse.suggestedActions,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: language === 'ar' 
          ? 'عذراً، حدث خطأ في معالجة طلبك. يرجى المحاولة مرة أخرى.'
          : 'Sorry, there was an error processing your request. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExecuteAction = async (actionId: string) => {
    try {
      await workflowService.executeWorkflowAction(actionId);
      
      // Update the message to show action was executed
      setMessages(prev => prev.map(msg => ({
        ...msg,
        actions: msg.actions?.map(action => 
          action.id === actionId 
            ? { ...action, executed: true, userAccepted: true }
            : action
        )
      })));
    } catch (error) {
      console.error('Error executing action:', error);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-blue-600" />
          <span className="font-medium">
            {language === 'ar' ? 'مساعد سير العمل' : 'Workflow Assistant'}
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={onCollapse}>
          <PanelLeftClose className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.type === 'user' && language === 'ar' ? 'flex-row-reverse' : '',
                message.type === 'user' && language === 'en' ? 'justify-end' : ''
              )}
            >
              {/* Avatar */}
              <div className={cn(
                "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                message.type === 'user' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-700'
              )}>
                {message.type === 'user' ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </div>

              {/* Message Content */}
              <div className={cn(
                "flex-1 max-w-[80%]",
                message.type === 'user' ? 'text-right' : 'text-left'
              )}>
                <div className={cn(
                  "rounded-lg p-3 text-sm",
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                )}>
                  {message.content}
                </div>

                {/* Actions */}
                {message.actions && message.actions.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {message.actions.map((action) => (
                      <div
                        key={action.id}
                        className="bg-blue-50 border border-blue-200 rounded-lg p-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Workflow className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-900">
                              {action.description}
                            </span>
                          </div>
                          {action.executed ? (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              {language === 'ar' ? 'تم التنفيذ' : 'Executed'}
                            </Badge>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => handleExecuteAction(action.id)}
                              className="h-7"
                            >
                              {language === 'ar' ? 'تنفيذ' : 'Execute'}
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Timestamp */}
                <div className={cn(
                  "text-xs text-gray-500 mt-1 flex items-center gap-1",
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                )}>
                  <Clock className="h-3 w-3" />
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <Bot className="h-4 w-4 text-gray-700" />
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-slate-200">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={language === 'ar' ? 'اكتب رسالتك...' : 'Type your message...'}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
