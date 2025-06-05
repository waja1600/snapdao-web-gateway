
import React from 'react';
import { Bot, User } from 'lucide-react';
import { MCPQuery } from '@/services/mcp-service';
import { MCPActionButton } from './MCPActionButton';

interface MCPChatMessageProps {
  query: MCPQuery;
  language: string;
  onAcceptAction: (actionId: string) => Promise<void>;
}

export const MCPChatMessage: React.FC<MCPChatMessageProps> = ({
  query,
  language,
  onAcceptAction
}) => {
  return (
    <div className="space-y-3">
      {/* User Query */}
      <div className="flex gap-2">
        <User className="h-5 w-5 text-gray-600 mt-1 flex-shrink-0" />
        <div className="bg-gray-100 rounded-lg p-3 flex-1 border">
          <p className="text-sm font-medium">{query.userQuery}</p>
          <span className="text-xs text-gray-500">
            {query.createdAt.toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* AI Response */}
      <div className="flex gap-2">
        <Bot className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
        <div className="bg-blue-50 rounded-lg p-3 flex-1 border border-blue-200">
          <p className="text-sm font-medium">{query.aiResponse}</p>
          
          {/* Suggested Actions */}
          {query.suggestedActions.length > 0 && (
            <div className="mt-3 space-y-2">
              <p className="text-xs font-semibold text-gray-700">
                {language === 'ar' ? 'الإجراءات المقترحة:' : 'Suggested Actions:'}
              </p>
              {query.suggestedActions.map((action) => (
                <div key={action.id} className="bg-white rounded-lg p-3 text-sm border">
                  <p className="font-medium mb-2">{action.description}</p>
                  <MCPActionButton 
                    action={action} 
                    language={language}
                    onAcceptAction={onAcceptAction}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
