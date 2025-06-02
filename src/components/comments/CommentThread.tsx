
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, Send, Clock, User } from "lucide-react";
import { toast } from "sonner";
import { loomioService } from "@/services/loomio-service";

interface Comment {
  id: string;
  author: {
    id: string;
    name: string;
    role?: string;
  };
  content: string;
  timestamp: Date;
  replies?: Comment[];
  isFromLoomio?: boolean;
}

interface CommentThreadProps {
  groupId: string;
  discussionId?: string;
  title?: string;
}

export const CommentThread = ({ groupId, discussionId, title }: CommentThreadProps) => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  // Mock comments data - in real implementation, fetch from Loomio and local database
  const mockComments: Comment[] = [
    {
      id: "1",
      author: { id: "user1", name: "أحمد محمد", role: "مؤسس المجموعة" },
      content: language === 'ar' ? 
        "مرحباً بالجميع، نحتاج لمناقشة عروض الموردين المقدمة. يرجى مراجعة التفاصيل وإبداء آرائكم." :
        "Welcome everyone, we need to discuss the submitted supplier offers. Please review the details and share your opinions.",
      timestamp: new Date('2025-01-01T10:00:00'),
      isFromLoomio: false
    },
    {
      id: "2", 
      author: { id: "user2", name: "فاطمة أحمد", role: "عضو" },
      content: language === 'ar' ?
        "شكراً أحمد، لقد راجعت العروض. أعتقد أن العرض الثاني يقدم قيمة أفضل من ناحية الجودة والسعر." :
        "Thanks Ahmed, I've reviewed the offers. I think the second offer provides better value in terms of quality and price.",
      timestamp: new Date('2025-01-01T11:30:00'),
      isFromLoomio: true
    }
  ];

  useEffect(() => {
    loadComments();
  }, [groupId, discussionId]);

  const loadComments = async () => {
    setLoading(true);
    try {
      // In real implementation, combine local comments with Loomio comments
      if (discussionId) {
        const loomioComments = await loomioService.getComments(discussionId);
        // Transform and merge with local comments
      }
      setComments(mockComments);
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim() || !user) return;

    setLoading(true);
    try {
      // Submit to both local database and Loomio if discussionId exists
      if (discussionId) {
        await loomioService.addComment({
          body: newComment,
          discussionId
        });
      }

      // Add to local state (mock)
      const comment: Comment = {
        id: `comment-${Date.now()}`,
        author: { id: user.id, name: user.name || user.email },
        content: newComment,
        timestamp: new Date(),
        isFromLoomio: !!discussionId
      };

      setComments(prev => [comment, ...prev]);
      setNewComment("");
      toast.success(t('commentPosted') || 'Comment posted successfully');
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast.error(t('commentFailed') || 'Failed to post comment');
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (commentId: string) => {
    if (!replyContent.trim() || !user) return;

    // Implementation for replies
    setReplyingTo(null);
    setReplyContent("");
    toast.success(t('replyPosted') || 'Reply posted successfully');
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
      day: 'numeric',
      month: 'short'
    }).format(date);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          {title || (language === 'ar' ? 'نقاش المجموعة' : 'Group Discussion')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Comment Input */}
        {user && (
          <div className="space-y-3">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={language === 'ar' ? 'اكتب تعليقك هنا...' : 'Write your comment here...'}
              className="min-h-[100px]"
            />
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {language === 'ar' ? 'سيتم إشعار جميع أعضاء المجموعة' : 'All group members will be notified'}
              </span>
              <Button 
                onClick={handleSubmitComment}
                disabled={!newComment.trim() || loading}
                className="gap-2"
              >
                <Send className="h-4 w-4" />
                {language === 'ar' ? 'نشر' : 'Post'}
              </Button>
            </div>
          </div>
        )}

        <Separator />

        {/* Comments List */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>{language === 'ar' ? 'لا توجد تعليقات بعد' : 'No comments yet'}</p>
              <p className="text-sm">
                {language === 'ar' ? 'كن أول من يبدأ النقاش' : 'Be the first to start the discussion'}
              </p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="space-y-3">
                <div className="flex gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium">{comment.author.name}</span>
                      {comment.author.role && (
                        <Badge variant="outline" className="text-xs">
                          {comment.author.role}
                        </Badge>
                      )}
                      {comment.isFromLoomio && (
                        <Badge variant="secondary" className="text-xs">
                          Loomio
                        </Badge>
                      )}
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        {formatTime(comment.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {comment.content}
                    </p>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setReplyingTo(comment.id)}
                        className="h-8 px-2 text-xs"
                      >
                        {language === 'ar' ? 'رد' : 'Reply'}
                      </Button>
                    </div>

                    {/* Reply Input */}
                    {replyingTo === comment.id && (
                      <div className="mt-3 space-y-2">
                        <Textarea
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder={language === 'ar' ? 'اكتب ردك...' : 'Write your reply...'}
                          className="min-h-[80px]"
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleReply(comment.id)}
                            disabled={!replyContent.trim()}
                          >
                            {language === 'ar' ? 'رد' : 'Reply'}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setReplyingTo(null);
                              setReplyContent("");
                            }}
                          >
                            {language === 'ar' ? 'إلغاء' : 'Cancel'}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {comment.replies && comment.replies.length > 0 && (
                  <div className="ml-12 space-y-3">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{reply.author.name}</span>
                            <span className="text-xs text-gray-500">
                              {formatTime(reply.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mt-1">{reply.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
