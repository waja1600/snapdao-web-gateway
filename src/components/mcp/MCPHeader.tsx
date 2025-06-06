
import React from 'react';
import { Button } from '@/components/ui/button';
import { Minimize2, X, Bot } from 'lucide-react';

interface MCPHeaderProps {
  language: string;
  isMinimized: boolean;
  onToggleMinimize: () => void;
  onClose: () => void;
}

export const MCPHeader: React.FC<MCPHeaderProps> = ({
  language,
  isMinimized,
  onToggleMinimize,
  onClose
}) => {
  return (
    <div className="flex items-center justify-between p-3 border-b bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
      <div className="flex items-center gap-2">
        <Bot className="h-5 w-5" />
        <span className="font-semibold">
          {language === 'ar' ? 'مساعد MCP الذكي' : 'MCP AI Assistant'}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleMinimize}
          className="h-8 w-8 p-0 text-white hover:bg-blue-500"
        >
          <Minimize2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0 text-white hover:bg-blue-500"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
