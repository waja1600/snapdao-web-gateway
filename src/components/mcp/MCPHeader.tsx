
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bot, X, Minimize2, Maximize2 } from 'lucide-react';

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
          onClick={onToggleMinimize}
          className="h-8 w-8 p-0"
        >
          {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
        </Button>
        <Button 
          size="sm" 
          variant="ghost" 
          onClick={onClose}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
