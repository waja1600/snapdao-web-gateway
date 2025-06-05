
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { MCPAction } from '@/services/mcp-service';
import { toast } from 'sonner';

interface MCPActionButtonProps {
  action: MCPAction;
  language: string;
  onAcceptAction: (actionId: string) => Promise<void>;
}

export const MCPActionButton: React.FC<MCPActionButtonProps> = ({ 
  action, 
  language,
  onAcceptAction 
}) => {
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
        onClick={() => onAcceptAction(action.id)}
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
