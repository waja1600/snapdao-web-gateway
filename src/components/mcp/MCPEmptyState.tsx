
import React from 'react';
import { Bot, Sparkles, Workflow, MessageSquare } from 'lucide-react';

interface MCPEmptyStateProps {
  language: string;
}

export const MCPEmptyState: React.FC<MCPEmptyStateProps> = ({ language }) => {
  const suggestions = language === 'ar' ? [
    'إنشاء سير عمل جديد لمشروع',
    'تنظيم مهام الفريق',
    'إعداد مجموعة عمل تعاونية',
    'إنشاء مقترح للتصويت',
    'تحليل تقدم المشروع',
    'إدارة الموردين والمقاولين'
  ] : [
    'Create new project workflow',
    'Organize team tasks',
    'Set up collaborative workgroup',
    'Create voting proposal',
    'Analyze project progress',
    'Manage suppliers and contractors'
  ];

  return (
    <div className="text-center py-8 px-4">
      <div className="mb-6">
        <div className="relative">
          <Bot className="h-16 w-16 mx-auto text-blue-600 mb-4" />
          <Sparkles className="h-6 w-6 absolute -top-2 -right-2 text-yellow-500 animate-pulse" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {language === 'ar' ? 'مرحباً بك في مساعد MCP الذكي!' : 'Welcome to MCP AI Assistant!'}
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          {language === 'ar' 
            ? 'أنا هنا لمساعدتك في إدارة المشاريع وسير العمل بذكاء اصطناعي متقدم'
            : 'I\'m here to help you manage projects and workflows with advanced AI'
          }
        </p>
      </div>

      <div className="space-y-3">
        <div className="text-xs font-medium text-gray-700 mb-3">
          {language === 'ar' ? 'جرب أن تسأل عن:' : 'Try asking about:'}
        </div>
        
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              {index % 3 === 0 && <Workflow className="h-4 w-4 text-blue-500" />}
              {index % 3 === 1 && <MessageSquare className="h-4 w-4 text-green-500" />}
              {index % 3 === 2 && <Sparkles className="h-4 w-4 text-purple-500" />}
              <span>{suggestion}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-700">
          {language === 'ar' 
            ? '💡 يمكنني فهم اللغة العربية والإنجليزية ومساعدتك في إنجاز المهام تلقائياً'
            : '💡 I understand Arabic and English and can help you automate tasks'
          }
        </p>
      </div>
    </div>
  );
};
