
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Shield, Wallet, Bell, Vote, 
  CheckCircle, AlertCircle, Clock, 
  ArrowRight, Eye, TrendingUp
} from 'lucide-react';

interface MCPBoxProps {
  verificationStatus: 'pending' | 'verified' | 'rejected';
  pointsBalance: {
    total: number;
    available: number;
    held: number;
    pending: number;
  };
  pendingRequests: number;
  activeVotes: number;
  recentNotifications: Array<{
    id: string;
    type: 'info' | 'warning' | 'success';
    message: string;
    messageAr: string;
    timestamp: string;
  }>;
}

export const MCPBox: React.FC<MCPBoxProps> = ({
  verificationStatus,
  pointsBalance,
  pendingRequests,
  activeVotes,
  recentNotifications
}) => {
  const { language } = useLanguage();

  const getVerificationBadge = () => {
    switch (verificationStatus) {
      case 'verified':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            {language === 'ar' ? 'موثق' : 'Verified'}
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            {language === 'ar' ? 'قيد المراجعة' : 'Pending'}
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            {language === 'ar' ? 'مرفوض' : 'Rejected'}
          </Badge>
        );
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default: return <Bell className="h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <Card className="fixed bottom-6 left-6 w-80 shadow-xl border-2 border-primary/20 bg-card/95 backdrop-blur-sm z-40">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="h-4 w-4 text-white" />
            </div>
            {language === 'ar' ? 'صندوق MCP' : 'MCP Box'}
          </span>
          {getVerificationBadge()}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Points Balance */}
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium flex items-center gap-2">
              <Wallet className="h-4 w-4 text-primary" />
              {language === 'ar' ? 'رصيد النقاط' : 'Points Balance'}
            </span>
            <Button size="sm" variant="outline">
              <Eye className="h-3 w-3 mr-1" />
              {language === 'ar' ? 'تفاصيل' : 'Details'}
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="text-center">
              <div className="font-bold text-lg text-green-600">{pointsBalance.available}</div>
              <div className="text-muted-foreground">{language === 'ar' ? 'متاح' : 'Available'}</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg text-blue-600">{pointsBalance.held}</div>
              <div className="text-muted-foreground">{language === 'ar' ? 'محجوز' : 'Held'}</div>
            </div>
          </div>
          
          {pointsBalance.pending > 0 && (
            <div className="mt-3 p-2 bg-yellow-50 rounded border border-yellow-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-yellow-800">{language === 'ar' ? 'في الانتظار' : 'Pending'}</span>
                <span className="font-medium text-yellow-800">{pointsBalance.pending}</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted/30 rounded-lg p-3 text-center">
            <div className="font-bold text-lg text-purple-600">{pendingRequests}</div>
            <div className="text-xs text-muted-foreground">
              {language === 'ar' ? 'طلبات معلقة' : 'Pending Requests'}
            </div>
          </div>
          <div className="bg-muted/30 rounded-lg p-3 text-center">
            <div className="font-bold text-lg text-orange-600">{activeVotes}</div>
            <div className="text-xs text-muted-foreground">
              {language === 'ar' ? 'تصويتات نشطة' : 'Active Votes'}
            </div>
          </div>
        </div>

        {/* Recent Notifications */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <Bell className="h-4 w-4 text-primary" />
              {language === 'ar' ? 'الإشعارات الحديثة' : 'Recent Notifications'}
            </h4>
            <Button size="sm" variant="ghost" className="text-xs">
              {language === 'ar' ? 'عرض الكل' : 'View All'}
            </Button>
          </div>
          
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {recentNotifications.slice(0, 3).map((notification) => (
              <div key={notification.id} className="flex items-start gap-2 p-2 bg-muted/20 rounded text-xs">
                {getNotificationIcon(notification.type)}
                <div className="flex-1">
                  <p className="text-foreground leading-tight">
                    {language === 'ar' ? notification.messageAr : notification.message}
                  </p>
                  <p className="text-muted-foreground text-xs mt-1">
                    {new Date(notification.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="border-t pt-4">
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" variant="outline" className="text-xs">
              <Vote className="h-3 w-3 mr-1" />
              {language === 'ar' ? 'التصويت' : 'Voting'}
            </Button>
            <Button size="sm" variant="outline" className="text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              {language === 'ar' ? 'التقارير' : 'Reports'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
