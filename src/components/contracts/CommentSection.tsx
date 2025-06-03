
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export const CommentSection = () => {
  const { t } = useLanguage();
  const [comment, setComment] = useState("");
  const [notifyAll, setNotifyAll] = useState(true);
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    toast.success(notifyAll ? t('commentPostedWithNotification') : t('commentPosted'));
    setComment("");
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('comments')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <Textarea 
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder={t('writeYourComment')}
            className="min-h-[100px]"
          />
          
          <div className="flex items-center gap-2">
            <Checkbox 
              id="notifyAll" 
              checked={notifyAll}
              onCheckedChange={(checked) => setNotifyAll(!!checked)} 
            />
            <label htmlFor="notifyAll" className="text-sm text-gray-700">
              {t('notifyAll')}
            </label>
          </div>
          
          <Button type="submit" disabled={!comment.trim()}>
            {t('postComment')}
          </Button>
        </form>
        
        <div className="mt-6 space-y-4">
          <div className="border-b pb-4">
            <div className="flex justify-between">
              <div className="font-medium">Ahmed Hassan</div>
              <div className="text-xs text-gray-500">2 hours ago</div>
            </div>
            <p className="mt-2 text-gray-700">
              Let's schedule a meeting to discuss the final details of the implementation.
            </p>
          </div>
          
          <div className="border-b pb-4">
            <div className="flex justify-between">
              <div className="font-medium">Sara Wilson</div>
              <div className="text-xs text-gray-500">Yesterday</div>
            </div>
            <p className="mt-2 text-gray-700">
              I've reviewed the documents and everything looks good from our end.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
