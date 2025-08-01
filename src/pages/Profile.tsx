
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, MapPin, Calendar, Settings } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  // Helper functions to get user data from metadata or email
  const getUserDisplayName = () => {
    if (!user) return 'المستخدم';
    return user.user_metadata?.full_name || 
           user.email?.split('@')[0] || 
           'المستخدم';
  };

  const getUserAvatarUrl = () => {
    return user?.user_metadata?.avatar_url;
  };

  const getUserInitial = () => {
    const displayName = getUserDisplayName();
    return displayName.charAt(0).toUpperCase();
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              الملف الشخصي
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={getUserAvatarUrl()} />
                <AvatarFallback>
                  {getUserInitial()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">
                  {getUserDisplayName()}
                </h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {user?.email}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>المملكة العربية السعودية</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>عضو منذ {user?.created_at ? new Date(user.created_at).toLocaleDateString('ar-SA') : 'يناير 2024'}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Badge variant="secondary">عضو نشط</Badge>
              <Badge variant="outline">محقق الهوية</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              إعدادات الحساب
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">الأمان</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  المصادقة الثنائية
                </span>
                <Badge variant="destructive">غير مفعل</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">الإشعارات</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  إشعارات البريد الإلكتروني
                </span>
                <Badge variant="default">مفعل</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">الخصوصية</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  الملف العام
                </span>
                <Badge variant="secondary">مرئي</Badge>
              </div>
            </div>

            <Button className="w-full mt-4">
              تحديث الإعدادات
            </Button>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>إحصائيات النشاط</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">5</div>
                <div className="text-sm text-muted-foreground">المجموعات المنضمة</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">12</div>
                <div className="text-sm text-muted-foreground">العروض المقدمة</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">3</div>
                <div className="text-sm text-muted-foreground">الصفقات المكتملة</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">معدل النجاح</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
