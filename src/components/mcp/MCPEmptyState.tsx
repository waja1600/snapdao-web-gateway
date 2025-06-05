
import React from 'react';
import { Bot } from 'lucide-react';

interface MCPEmptyStateProps {
  language: string;
}

export const MCPEmptyState: React.FC<MCPEmptyStateProps> = ({ language }) => {
  return (
    <div className="text-center text-gray-500 mt-12">
      <Bot className="h-12 w-12 mx-auto mb-3 text-blue-600" />
      <p className="font-medium text-lg">
        {language === 'ar' 
          ? 'كيف يمكنني مساعدتك اليوم؟' 
          : 'How can I help you today?'}
      </p>
    </div>
  );
};
