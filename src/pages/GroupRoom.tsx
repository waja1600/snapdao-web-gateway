import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Users, Calendar, MapPin, Tag, Vote, FileText, UserCheck, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { CommentThread } from "@/components/comments/CommentThread";
import { IntegratedVoting } from "@/components/voting/IntegratedVoting";

const GroupRoom = () => {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  // Mock group data
  const groupData = {
    id: id,
    name: 'مجموعة استيراد أجهزة طبية - مصر',
    type: 'شراء / جماعي',
    country: 'مصر',
    sector: 'مستلزمات طبية',
    founder: 'أحمد محمود',
    members: '8/15',
    createdAt: '2025-05-15',
    status: 'active',
    description: 'مجموعة لاستيراد أجهزة طبية متطورة بكميات كبيرة للحصول على أسعار تنافسية. نهدف إلى توفير أجهزة عالية الجودة للمستشفيات والعيادات الطبية في مصر.',
    requirements: 'أجهزة طبية معتمدة من منظمة الصحة العالمية، ضمان لا يقل عن سنتين، خدمة صيانة محلية',
    currentVoting: {
      title: 'اختيار المورد النهائي لأجهزة الأشعة',
      description: 'التصويت على أفضل عرض من بين العروض المقدمة من الموردين',
      options: ['شركة المعدات الطبية المتقدمة', 'مؤسسة الشرق الأوسط للتجهيزات', 'الامتناع عن التصويت'],
      endDate: '2025-06-10',
      progress: 65
    }
  };

  const members = [
    { name: 'أحمد محمود', role: 'مؤسس', status: 'مفعل' },
    { name: 'سارة أحمد', role: 'عضو', status: 'مفعل' },
    { name: 'محمد علي', role: 'عضو', status: 'مفعل' },
    { name: 'فاطمة حسن', role: 'مشرف', status: 'مفعل' }
  ];

  const supplierOffers = [
    {
      id: '1',
      supplierName: 'شركة المعدات الطبية المتقدمة',
      price: '450,000 ريال',
      deliveryTime: '30 يوم',
      warranty: '3 سنوات',
      status: 'قيد المراجعة'
    },
    {
      id: '2',
      supplierName: 'مؤسسة الشرق الأوسط للتجهيزات',
      price: '420,000 ريال',
      deliveryTime: '45 يوم',
      warranty: '2 سنة',
      status: 'مقبول'
    }
  ];

  const handleLeaveGroup = () => {
    toast.info(
      language === 'en' 
        ? 'Leave request submitted' 
        : 'تم تقديم طلب المغادرة'
    );
  };

  const handleRequestArbitration = () => {
    navigate('/arbitration/create');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/groups')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {language === 'en' ? 'Back to My Groups' : 'العودة إلى مجموعاتي'}
        </Button>

        {/* Group Header */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">{groupData.name}</CardTitle>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    <span>{groupData.type}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{groupData.country} - {groupData.sector}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{groupData.members}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(groupData.createdAt).toLocaleDateString(language === 'en' ? 'en-US' : 'ar-SA')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-sm font-medium">{language === 'en' ? 'Founder:' : 'المؤسس:'}</span>
                  <Badge variant="outline">{groupData.founder}</Badge>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800 self-start">
                {language === 'en' ? 'Active' : 'نشطة'}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">
              {language === 'en' ? 'Overview' : 'نظرة عامة'}
            </TabsTrigger>
            <TabsTrigger value="members">
              {language === 'en' ? 'Members' : 'الأعضاء'}
            </TabsTrigger>
            <TabsTrigger value="discussion">
              {language === 'en' ? 'Discussion' : 'النقاش'}
            </TabsTrigger>
            <TabsTrigger value="voting">
              {language === 'en' ? 'Voting' : 'التصويت'}
            </TabsTrigger>
            <TabsTrigger value="offers">
              {language === 'en' ? 'Supplier Offers' : 'عروض الموردين'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Group Description' : 'وصف المجموعة'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{groupData.description}</p>
                <div className="mt-4">
                  <h4 className="font-medium mb-2">{language === 'en' ? 'Requirements:' : 'المتطلبات:'}</h4>
                  <p className="text-gray-600">{groupData.requirements}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Group Members' : 'أعضاء المجموعة'}</CardTitle>
                <CardDescription>
                  {language === 'en' ? 'Current active members in this group' : 'الأعضاء النشطين حالياً في هذه المجموعة'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {members.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <UserCheck className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{member.name}</h4>
                          <p className="text-sm text-gray-600">{member.role}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-50">
                        {member.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="discussion" className="space-y-4">
            <CommentThread 
              groupId={id || ''}
              discussionId="discussion-1"
              title={language === 'en' ? 'Group Discussion' : 'نقاش المجموعة'}
            />
          </TabsContent>

          <TabsContent value="voting" className="space-y-4">
            <IntegratedVoting 
              groupId={id || ''}
            />
          </TabsContent>

          <TabsContent value="offers" className="space-y-4">
            <div className="grid gap-4">
              {supplierOffers.map((offer) => (
                <Card key={offer.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{offer.supplierName}</CardTitle>
                      <Badge variant="outline">{offer.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium">{language === 'en' ? 'Price:' : 'السعر:'}</span>
                        <p>{offer.price}</p>
                      </div>
                      <div>
                        <span className="font-medium">{language === 'en' ? 'Delivery:' : 'التسليم:'}</span>
                        <p>{offer.deliveryTime}</p>
                      </div>
                      <div>
                        <span className="font-medium">{language === 'en' ? 'Warranty:' : 'الضمان:'}</span>
                        <p>{offer.warranty}</p>
                      </div>
                    </div>
                    <Button variant="outline" className="mt-4" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      {language === 'en' ? 'View Full Offer' : 'عرض العرض كاملاً'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-end">
          <Button variant="outline" onClick={() => navigate('/groups')}>
            {language === 'en' ? 'Back to My Groups' : 'العودة إلى مجموعاتي'}
          </Button>
          <Button variant="outline" onClick={handleLeaveGroup}>
            {language === 'en' ? 'Request Leave' : 'طلب انسحاب'}
          </Button>
          <Button variant="outline" onClick={handleRequestArbitration}>
            <AlertTriangle className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Request ORDA Arbitration' : 'أطلب تحكيم ORDA'}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default GroupRoom;
