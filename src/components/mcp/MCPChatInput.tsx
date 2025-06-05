
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface MCPChatInputProps {
  query: string;
  isLoading: boolean;
  language: string;
  onQueryChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const MCPChatInput: React.FC<MCPChatInputProps> = ({
  query,
  isLoading,
  language,
  onQueryChange,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit} className="p-4 border-t bg-gray-50">
      <div className="flex gap-2">
        <Input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
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
  );
};
