
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { gpoLifecycleService } from '@/services/gpo-lifecycle-service';
import { 
  Shield, 
  UserCheck, 
  UserX, 
  AlertTriangle, 
  Settings,
  Users,
  FileText,
  Gavel
} from 'lucide-react';
import { toast } from 'sonner';

interface AdminPanelProps {
  groupId: string;
  onDataChange: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ groupId, onDataChange }) => {
  const [joinRequests, setJoinRequests] = useState<any[]>([]);
  const [complaints, setComplaints] = useState<any[]>([]);
  const [freezeReason, setFreezeReason] = useState('');
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  useEffect(() => {
    loadAdminData();
  }, [groupId]);

  const loadAdminData = async () => {
    // Load join requests, complaints, etc.
    // This would typically fetch from Supabase
    console.log('Loading admin data for group:', groupId);
  };

  const handleApproveJoinRequest = async (requestId: string) => {
    const result = await gpoLifecycleService.approveJoinRequest(requestId, 'current-admin-id');
    if (result.success) {
      loadAdminData();
      onDataChange();
    }
  };

  const handleFreezeMember = async (userId: string) => {
    if (!freezeReason.trim()) {
      toast.error('يجب كتابة سبب التجميد');
      return;
    }

    const result = await gpoLifecycleService.freezeMember(groupId, userId, 'current-admin-id', freezeReason);
    if (result.success) {
      setFreezeReason('');
      setSelectedMember(null);
      onDataChange();
    }
  };

  return (
    <Card className="bg-purple-50 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-800">
          <Shield className="h-5 w-5" />
          لوحة المشرف
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          {/* Join Requests */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-20 flex-col">
                <UserCheck className="h-6 w-6 mb-2" />
                <span className="text-sm">طلبات الانضمام</span>
                <Badge className="mt-1">{joinRequests.length}</Badge>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>طلبات الانضمام</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {joinRequests.length === 0 ? (
                  <p className="text-gray-600 text-center py-4">لا توجد طلبات انضمام</p>
                ) : (
                  joinRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{request.user_name}</div>
                        <div className="text-sm text-gray-600">
                          النقاط المطلوبة: {request.points_required}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleApproveJoinRequest(request.id)}
                        >
                          قبول
                        </Button>
                        <Button size="sm" variant="outline">رفض</Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </DialogContent>
          </Dialog>

          {/* Member Management */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-20 flex-col">
                <Users className="h-6 w-6 mb-2" />
                <span className="text-sm">إدارة الأعضاء</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>إدارة الأعضاء</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">اختيار عضو للتجميد:</label>
                  <select 
                    className="w-full p-2 border rounded"
                    value={selectedMember || ''}
                    onChange={(e) => setSelectedMember(e.target.value)}
                  >
                    <option value="">اختر عضو...</option>
                    <option value="user1">أحمد محمد</option>
                    <option value="user2">فاطمة علي</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">سبب التجميد:</label>
                  <Textarea
                    value={freezeReason}
                    onChange={(e) => setFreezeReason(e.target.value)}
                    placeholder="اكتب سبب تجميد العضو..."
                    rows={3}
                  />
                </div>
                
                <Button 
                  onClick={() => selectedMember && handleFreezeMember(selectedMember)}
                  disabled={!selectedMember || !freezeReason.trim()}
                  className="w-full"
                  variant="destructive"
                >
                  <UserX className="h-4 w-4 mr-2" />
                  تجميد العضو
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Complaints */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-20 flex-col">
                <AlertTriangle className="h-6 w-6 mb-2" />
                <span className="text-sm">الشكاوى</span>
                <Badge className="mt-1">{complaints.length}</Badge>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>نظام الشكاوى</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {complaints.length === 0 ? (
                  <p className="text-gray-600 text-center py-4">لا توجد شكاوى</p>
                ) : (
                  complaints.map((complaint) => (
                    <div key={complaint.id} className="p-3 border rounded-lg">
                      <div className="font-medium">{complaint.title}</div>
                      <div className="text-sm text-gray-600 mt-1">{complaint.description}</div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm">مراجعة</Button>
                        <Button size="sm" variant="outline">إحالة للتحكيم</Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </DialogContent>
          </Dialog>

          {/* Arbitration */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-20 flex-col">
                <Gavel className="h-6 w-6 mb-2" />
                <span className="text-sm">إحالة للتحكيم</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>إحالة قضية للتحكيم</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">نوع القضية:</label>
                  <select className="w-full p-2 border rounded">
                    <option value="dispute">نزاع بين الأعضاء</option>
                    <option value="compliance">مخالفة القوانين</option>
                    <option value="breach">خرق العقد</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">وصف القضية:</label>
                  <Textarea
                    placeholder="اكتب تفاصيل القضية..."
                    rows={4}
                  />
                </div>
                
                <Button className="w-full">
                  <Gavel className="h-4 w-4 mr-2" />
                  إحالة للتحكيم
                </Button>
              </div>
            </DialogContent>
          </Dialog>

        </div>

        {/* Quick Actions */}
        <div className="mt-6 pt-4 border-t">
          <div className="flex gap-3">
            <Button size="sm" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              تصدير التقرير
            </Button>
            <Button size="sm" variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              إعدادات المجموعة
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
