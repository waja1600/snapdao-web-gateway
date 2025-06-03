
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { Bell, Mail, MessageSquare, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface Notification {
  id: string;
  type: 'email' | 'push' | 'system' | 'urgent';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  category: string;
}

export const NotificationCenter: React.FC = () => {
  const { language } = useLanguage();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'push',
      title: language === 'en' ? 'New Group Buying Deal' : 'صفقة شراء جماعي جديدة',
      message: language === 'en' 
        ? 'Premium office chairs deal is now available. Join before slots fill up!'
        : 'صفقة كراسي المكتب المتميزة متاحة الآن. انضم قبل امتلاء الأماكن!',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      actionUrl: '/deals/1',
      category: 'Group Buying'
    },
    {
      id: '2',
      type: 'email',
      title: language === 'en' ? 'Voting Period Started' : 'بدأت فترة التصويت',
      message: language === 'en'
        ? 'Vote on the new platform features proposal. Your opinion matters!'
        : 'صوت على اقتراح ميزات المنصة الجديدة. رأيك مهم!',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: false,
      actionUrl: '/voting/2',
      category: 'Voting'
    },
    {
      id: '3',
      type: 'system',
      title: language === 'en' ? 'Profile Verification Complete' : 'اكتمل توثيق الملف الشخصي',
      message: language === 'en'
        ? 'Your profile has been successfully verified. You can now access all features.'
        : 'تم توثيق ملفك الشخصي بنجاح. يمكنك الآن الوصول لجميع الميزات.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: true,
      category: 'Account'
    },
    {
      id: '4',
      type: 'urgent',
      title: language === 'en' ? 'Dispute Requires Attention' : 'نزاع يتطلب الانتباه',
      message: language === 'en'
        ? 'A dispute in your group requires immediate arbitration. Please review.'
        : 'نزاع في مجموعتك يتطلب تحكيم فوري. يرجى المراجعة.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      read: false,
      actionUrl: '/arbitration/4',
      category: 'Arbitration'
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="h-4 w-4" />;
      case 'push': return <Bell className="h-4 w-4" />;
      case 'system': return <CheckCircle className="h-4 w-4" />;
      case 'urgent': return <AlertTriangle className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email': return 'bg-blue-100 text-blue-800';
      case 'push': return 'bg-green-100 text-green-800';
      case 'system': return 'bg-gray-100 text-gray-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return language === 'en' ? `${days} days ago` : `منذ ${days} أيام`;
    } else if (hours > 0) {
      return language === 'en' ? `${hours} hours ago` : `منذ ${hours} ساعات`;
    } else {
      return language === 'en' ? 'Just now' : 'الآن';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const urgentNotifications = notifications.filter(n => n.type === 'urgent' && !n.read);
  const regularNotifications = notifications.filter(n => n.type !== 'urgent');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {language === 'en' ? 'Notification Center' : 'مركز الإشعارات'}
        </h2>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            {language === 'en' ? 'Mark All Read' : 'تحديد الكل كمقروء'}
          </Button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === 'en' ? 'Unread' : 'غير مقروءة'}
                </p>
                <p className="text-2xl font-bold">{unreadCount}</p>
              </div>
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === 'en' ? 'Urgent' : 'عاجلة'}
                </p>
                <p className="text-2xl font-bold">{urgentNotifications.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === 'en' ? 'Total' : 'الإجمالي'}
                </p>
                <p className="text-2xl font-bold">{notifications.length}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Urgent Notifications */}
      {urgentNotifications.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800 flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>{language === 'en' ? 'Urgent Notifications' : 'إشعارات عاجلة'}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {urgentNotifications.map(notification => (
              <div key={notification.id} className="bg-white p-3 rounded-lg border border-red-200">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium">{notification.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{formatTimestamp(notification.timestamp)}</span>
                    {notification.actionUrl && (
                      <Button size="sm" variant="outline">
                        {language === 'en' ? 'View' : 'عرض'}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Regular Notifications */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">
            {language === 'en' ? 'All' : 'الكل'}
          </TabsTrigger>
          <TabsTrigger value="unread">
            {language === 'en' ? 'Unread' : 'غير مقروءة'} ({unreadCount})
          </TabsTrigger>
          <TabsTrigger value="system">
            {language === 'en' ? 'System' : 'النظام'}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-3">
          {regularNotifications.map(notification => (
            <Card key={notification.id} className={`transition-colors ${!notification.read ? 'bg-blue-50 border-blue-200' : ''}`}>
              <CardContent className="pt-4">
                <div className="flex justify-between items-start">
                  <div className="flex space-x-3 flex-1">
                    <div className="flex-shrink-0">
                      <Badge className={getTypeColor(notification.type)}>
                        {getTypeIcon(notification.type)}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{notification.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge variant="secondary" className="text-xs">{notification.category}</Badge>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>{formatTimestamp(notification.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!notification.read && (
                      <Button size="sm" variant="ghost" onClick={() => markAsRead(notification.id)}>
                        {language === 'en' ? 'Mark Read' : 'تحديد كمقروء'}
                      </Button>
                    )}
                    {notification.actionUrl && (
                      <Button size="sm" variant="outline">
                        {language === 'en' ? 'View' : 'عرض'}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="unread" className="space-y-3">
          {regularNotifications.filter(n => !n.read).map(notification => (
            <Card key={notification.id} className="bg-blue-50 border-blue-200">
              <CardContent className="pt-4">
                <div className="flex justify-between items-start">
                  <div className="flex space-x-3 flex-1">
                    <div className="flex-shrink-0">
                      <Badge className={getTypeColor(notification.type)}>
                        {getTypeIcon(notification.type)}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{notification.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge variant="secondary" className="text-xs">{notification.category}</Badge>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>{formatTimestamp(notification.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="ghost" onClick={() => markAsRead(notification.id)}>
                      {language === 'en' ? 'Mark Read' : 'تحديد كمقروء'}
                    </Button>
                    {notification.actionUrl && (
                      <Button size="sm" variant="outline">
                        {language === 'en' ? 'View' : 'عرض'}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="system" className="space-y-3">
          {regularNotifications.filter(n => n.type === 'system').map(notification => (
            <Card key={notification.id} className={`transition-colors ${!notification.read ? 'bg-blue-50 border-blue-200' : ''}`}>
              <CardContent className="pt-4">
                <div className="flex justify-between items-start">
                  <div className="flex space-x-3 flex-1">
                    <div className="flex-shrink-0">
                      <Badge className={getTypeColor(notification.type)}>
                        {getTypeIcon(notification.type)}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{notification.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge variant="secondary" className="text-xs">{notification.category}</Badge>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>{formatTimestamp(notification.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!notification.read && (
                      <Button size="sm" variant="ghost" onClick={() => markAsRead(notification.id)}>
                        {language === 'en' ? 'Mark Read' : 'تحديد كمقروء'}
                      </Button>
                    )}
                    {notification.actionUrl && (
                      <Button size="sm" variant="outline">
                        {language === 'en' ? 'View' : 'عرض'}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};
