
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Users, Coins } from 'lucide-react';

interface JoinRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  group: any;
}

export const JoinRequestModal: React.FC<JoinRequestModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  group
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">تأكيد المشاركة</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="text-center">
            <Users className="h-12 w-12 text-blue-500 mx-auto mb-3" />
            <h3 className="font-medium text-lg">{group.name}</h3>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div className="space-y-2 text-sm">
                <p className="font-medium text-yellow-800">
                  يجب عليك قبول العقد والشروط
                </p>
                {group.status === 'pending_members' ? (
                  <p className="text-yellow-700">
                    سيتم حجز النقاط المطلوبة حتى تفعيل المجموعة
                  </p>
                ) : (
                  <p className="text-yellow-700">
                    سيتم خصم النقاط المطلوبة فوراً
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>النقاط المطلوبة:</span>
              <div className="flex items-center gap-1">
                <Coins className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">{group.points_required || 0}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span>حالة المجموعة:</span>
              <Badge variant={group.status === 'active' ? 'default' : 'secondary'}>
                {group.status === 'active' ? 'نشطة' : 'في انتظار التفعيل'}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span>عدد الأعضاء:</span>
              <span>{group.member_count || 0}/{group.max_members}</span>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
          <Button onClick={onConfirm}>
            موافق والانضمام
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
