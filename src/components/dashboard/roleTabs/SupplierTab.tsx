
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export const SupplierTab: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [offerDialogOpen, setOfferDialogOpen] = useState(false);
  const [offerPrice, setOfferPrice] = useState('');
  const [offerDescription, setOfferDescription] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const handleSubmitOffer = () => {
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success(t('offerSubmitted'));
      setSubmitting(false);
      setOfferDialogOpen(false);
      setOfferPrice('');
      setOfferDescription('');
      setDeliveryTime('');
    }, 1000);
  };
  
  const groupRequests = [
    {
      id: 1,
      title: language === 'en' ? 'Bulk Office Chairs' : 'كراسي مكتبية بالجملة',
      description: language === 'en' ? 'Group of 5 companies seeking 100 office chairs' : 'مجموعة من 5 شركات تبحث عن 100 كرسي مكتبي',
      quantity: 100,
      deadline: 7,
      status: 'active'
    },
    {
      id: 2,
      title: language === 'en' ? 'Computer Monitors' : 'شاشات كمبيوتر',
      description: language === 'en' ? 'Tech consortium needs 50 monitors' : 'اتحاد تقني يحتاج 50 شاشة',
      quantity: 50,
      deadline: 14,
      status: 'active'
    },
    {
      id: 3,
      title: language === 'en' ? 'Office Supplies' : 'لوازم مكتبية',
      description: language === 'en' ? 'Quarterly office supplies for small businesses' : 'لوازم مكتبية ربع سنوية للشركات الصغيرة',
      quantity: 200,
      deadline: 5,
      status: 'active'
    }
  ];
  
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'en' ? 'Active Group Requests' : 'طلبات المجموعات النشطة'}
          </CardTitle>
          <CardDescription>
            {language === 'en' 
              ? 'Group buying requests matching your product categories' 
              : 'طلبات شراء جماعية تتطابق مع فئات منتجاتك'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {groupRequests.map((request) => (
              <div key={request.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{request.title}</h3>
                  <Badge className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    {language === 'en' ? 'Active' : 'نشط'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{request.description}</p>
                <div className="flex justify-between text-sm mb-1">
                  <span>{language === 'en' ? 'Quantity' : 'الكمية'}: {request.quantity} units</span>
                  <span>{language === 'en' ? 'Deadline' : 'الموعد النهائي'}: {request.deadline} days</span>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button className="flex-1" onClick={() => navigate(`/deals/${request.id}`)}>
                    {t('viewDetails')}
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => setOfferDialogOpen(true)}>
                    {t('submitOffer')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={offerDialogOpen} onOpenChange={setOfferDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('submitOffer')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="price">{t('price')}</Label>
              <Input 
                id="price" 
                placeholder="0.00" 
                type="number"
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="delivery">{t('deliveryTime')}</Label>
              <Input 
                id="delivery" 
                placeholder="30" 
                type="number"
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
              />
              <p className="text-xs text-gray-500">{t('daysToDeliver')}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">{t('offerDescription')}</Label>
              <Textarea 
                id="description" 
                placeholder={t('describeYourOffer')}
                value={offerDescription}
                onChange={(e) => setOfferDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOfferDialogOpen(false)}>
              {t('cancel')}
            </Button>
            <Button onClick={handleSubmitOffer} disabled={submitting}>
              {submitting ? t('submitting') : t('submitOffer')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
