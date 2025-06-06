
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { WorkspaceLayout } from "@/components/workspace/WorkspaceLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Gavel, 
  FileText, 
  Handshake, 
  Users, 
  Clock, 
  AlertCircle,
  CheckCircle,
  Plus,
  Upload,
  Download
} from "lucide-react";
import { ArbitrationService } from "@/services/arbitration-service";
import { toast } from "sonner";

const Arbitration = () => {
  const { language } = useLanguage();
  const [arbitrationService] = useState(new ArbitrationService());
  const [showNewDisputeForm, setShowNewDisputeForm] = useState(false);
  const [newDispute, setNewDispute] = useState({
    title: '',
    titleAr: '',
    description: '',
    descriptionAr: '',
    contractReference: '',
    clientId: '',
    category: 'payment'
  });

  const disputes = arbitrationService.getAllDisputes();
  const activeDisputes = arbitrationService.getActiveDisputes();
  const resolvedDisputes = arbitrationService.getResolvedDisputes();

  const handleCreateDispute = () => {
    if (!newDispute.title || !newDispute.description || !newDispute.contractReference) {
      toast.error(language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
      return;
    }

    arbitrationService.createDispute(newDispute);
    setNewDispute({
      title: '',
      titleAr: '',
      description: '',
      descriptionAr: '',
      contractReference: '',
      clientId: '',
      category: 'payment'
    });
    setShowNewDisputeForm(false);
    toast.success(language === 'ar' ? 'تم إنشاء النزاع بنجاح' : 'Dispute created successfully');
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: <AlertCircle className="h-3 w-3" />,
        text: language === 'ar' ? 'معلق' : 'Pending'
      },
      inProgress: {
        color: 'bg-blue-100 text-blue-800',
        icon: <Clock className="h-3 w-3" />,
        text: language === 'ar' ? 'قيد المعالجة' : 'In Progress'
      },
      resolved: {
        color: 'bg-green-100 text-green-800',
        icon: <CheckCircle className="h-3 w-3" />,
        text: language === 'ar' ? 'محلول' : 'Resolved'
      }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <Badge className={config.color}>
        <div className="flex items-center gap-1">
          {config.icon}
          {config.text}
        </div>
      </Badge>
    );
  };

  return (
    <WorkspaceLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {language === 'ar' ? 'نظام التحكيم والوساطة' : 'Arbitration & Mediation System'}
            </h1>
            <p className="text-gray-600 mt-1">
              {language === 'ar' 
                ? 'إدارة النزاعات والتحكيم بين الأطراف بشكل عادل وشفاف' 
                : 'Manage disputes and arbitration between parties fairly and transparently'
              }
            </p>
          </div>
          <Button onClick={() => setShowNewDisputeForm(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            {language === 'ar' ? 'نزاع جديد' : 'New Dispute'}
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{language === 'ar' ? 'إجمالي النزاعات' : 'Total Disputes'}</p>
                  <p className="text-2xl font-bold">{disputes.length}</p>
                </div>
                <Gavel className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{language === 'ar' ? 'نزاعات نشطة' : 'Active Disputes'}</p>
                  <p className="text-2xl font-bold text-yellow-600">{activeDisputes.length}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{language === 'ar' ? 'نزاعات محلولة' : 'Resolved Disputes'}</p>
                  <p className="text-2xl font-bold text-green-600">{resolvedDisputes.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{language === 'ar' ? 'معدل النجاح' : 'Success Rate'}</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {disputes.length > 0 ? Math.round((resolvedDisputes.length / disputes.length) * 100) : 0}%
                  </p>
                </div>
                <Handshake className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* New Dispute Form */}
        {showNewDisputeForm && (
          <Card>
            <CardHeader>
              <CardTitle>{language === 'ar' ? 'إنشاء نزاع جديد' : 'Create New Dispute'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">
                    {language === 'ar' ? 'العنوان (العربية)' : 'Title (Arabic)'}
                  </label>
                  <Input
                    value={newDispute.titleAr}
                    onChange={(e) => setNewDispute({...newDispute, titleAr: e.target.value})}
                    placeholder={language === 'ar' ? 'عنوان النزاع بالعربية' : 'Dispute title in Arabic'}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">
                    {language === 'ar' ? 'العنوان (الإنجليزية)' : 'Title (English)'}
                  </label>
                  <Input
                    value={newDispute.title}
                    onChange={(e) => setNewDispute({...newDispute, title: e.target.value})}
                    placeholder={language === 'ar' ? 'عنوان النزاع بالإنجليزية' : 'Dispute title in English'}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">
                  {language === 'ar' ? 'الوصف' : 'Description'}
                </label>
                <Textarea
                  value={language === 'ar' ? newDispute.descriptionAr : newDispute.description}
                  onChange={(e) => setNewDispute({
                    ...newDispute, 
                    [language === 'ar' ? 'descriptionAr' : 'description']: e.target.value
                  })}
                  placeholder={language === 'ar' ? 'وصف تفصيلي للنزاع' : 'Detailed description of the dispute'}
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">
                    {language === 'ar' ? 'مرجع العقد' : 'Contract Reference'}
                  </label>
                  <Input
                    value={newDispute.contractReference}
                    onChange={(e) => setNewDispute({...newDispute, contractReference: e.target.value})}
                    placeholder="CT-2024-XXXX"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">
                    {language === 'ar' ? 'معرف العميل' : 'Client ID'}
                  </label>
                  <Input
                    value={newDispute.clientId}
                    onChange={(e) => setNewDispute({...newDispute, clientId: e.target.value})}
                    placeholder="CL-2024-XXXX"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">
                    {language === 'ar' ? 'فئة النزاع' : 'Dispute Category'}
                  </label>
                  <Select value={newDispute.category} onValueChange={(value) => setNewDispute({...newDispute, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="payment">{language === 'ar' ? 'دفع' : 'Payment'}</SelectItem>
                      <SelectItem value="quality">{language === 'ar' ? 'جودة' : 'Quality'}</SelectItem>
                      <SelectItem value="delivery">{language === 'ar' ? 'تسليم' : 'Delivery'}</SelectItem>
                      <SelectItem value="contract">{language === 'ar' ? 'عقد' : 'Contract'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleCreateDispute}>
                  {language === 'ar' ? 'إنشاء النزاع' : 'Create Dispute'}
                </Button>
                <Button variant="outline" onClick={() => setShowNewDisputeForm(false)}>
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Disputes Tabs */}
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">
              {language === 'ar' ? 'النزاعات النشطة' : 'Active Disputes'} ({activeDisputes.length})
            </TabsTrigger>
            <TabsTrigger value="resolved">
              {language === 'ar' ? 'النزاعات المحلولة' : 'Resolved Disputes'} ({resolvedDisputes.length})
            </TabsTrigger>
            <TabsTrigger value="all">
              {language === 'ar' ? 'جميع النزاعات' : 'All Disputes'} ({disputes.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-4">
            {activeDisputes.map((dispute) => (
              <Card key={dispute.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      {language === 'ar' ? dispute.titleAr || dispute.title : dispute.title}
                    </CardTitle>
                    {getStatusBadge(dispute.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    {language === 'ar' ? dispute.descriptionAr || dispute.description : dispute.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{language === 'ar' ? 'العقد:' : 'Contract:'} {dispute.contractReference}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{language === 'ar' ? 'العميل:' : 'Client:'} {dispute.clientId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{language === 'ar' ? 'تاريخ الإنشاء:' : 'Created:'} {dispute.createdAt}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" className="gap-2">
                      <Gavel className="h-4 w-4" />
                      {language === 'ar' ? 'بدء التحكيم' : 'Start Arbitration'}
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      <Upload className="h-4 w-4" />
                      {language === 'ar' ? 'رفع مستندات' : 'Upload Documents'}
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      <FileText className="h-4 w-4" />
                      {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="resolved" className="space-y-4">
            {resolvedDisputes.map((dispute) => (
              <Card key={dispute.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      {language === 'ar' ? dispute.titleAr || dispute.title : dispute.title}
                    </CardTitle>
                    {getStatusBadge(dispute.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    {language === 'ar' ? dispute.descriptionAr || dispute.description : dispute.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{dispute.contractReference}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{dispute.clientId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{dispute.createdAt}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Handshake className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{dispute.resolvedAt}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="gap-2">
                      <Download className="h-4 w-4" />
                      {language === 'ar' ? 'تحميل التقرير' : 'Download Report'}
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      <FileText className="h-4 w-4" />
                      {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="all" className="space-y-4">
            {disputes.map((dispute) => (
              <Card key={dispute.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      {language === 'ar' ? dispute.titleAr || dispute.title : dispute.title}
                    </CardTitle>
                    {getStatusBadge(dispute.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    {language === 'ar' ? dispute.descriptionAr || dispute.description : dispute.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{dispute.contractReference}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{dispute.clientId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{dispute.createdAt}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </WorkspaceLayout>
  );
};

export default Arbitration;
