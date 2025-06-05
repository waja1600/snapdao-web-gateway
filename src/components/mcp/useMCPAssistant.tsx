
import { useState, useRef, useEffect } from 'react';
import { MCPService, MCPQuery } from '@/services/mcp-service';
import { toast } from 'sonner';

const mcpService = new MCPService();

export const useMCPAssistant = (language: string) => {
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

  return {
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
  };
};
