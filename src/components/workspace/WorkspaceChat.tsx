
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { X, Send, Paperclip, Smile } from 'lucide-react';

interface WorkspaceChatProps {
  onCollapse: () => void;
}

export const WorkspaceChat: React.FC<WorkspaceChatProps> = ({ onCollapse }) => {
  const { language } = useLanguage();
  const [message, setMessage] = useState('');

  const messages = [
    {
      id: '1',
      sender: 'أحمد علي',
      message: 'مرحباً، هل يمكننا مناقشة المقترح الجديد؟',
      time: '10:30',
      isMe: false
    },
    {
      id: '2',
      sender: 'أنت',
      message: 'بالطبع، أعتقد أنه مقترح ممتاز',
      time: '10:32',
      isMe: true
    },
    {
      id: '3',
      sender: 'سارة محمد',
      message: 'أوافق، لكن نحتاج لمراجعة الميزانية',
      time: '10:35',
      isMe: false
    }
  ];

  const handleSend = () => {
    if (message.trim()) {
      // Handle sending message
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>م</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">
              {language === 'ar' ? 'مجموعة المشروع' : 'Project Group'}
            </h3>
            <p className="text-sm text-slate-500">
              {language === 'ar' ? '5 أعضاء نشطين' : '5 active members'}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onCollapse}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.isMe ? 'flex-row-reverse' : ''}`}
            >
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>{msg.sender.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className={`flex-1 ${msg.isMe ? 'text-right' : ''}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">{msg.sender}</span>
                  <span className="text-xs text-slate-500">{msg.time}</span>
                </div>
                <div
                  className={`inline-block max-w-[80%] p-3 rounded-lg ${
                    msg.isMe
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-100 text-slate-900'
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={language === 'ar' ? 'اكتب رسالة...' : 'Type a message...'}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1"
          />
          <Button variant="ghost" size="sm">
            <Smile className="h-4 w-4" />
          </Button>
          <Button onClick={handleSend} size="sm">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
