
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, CheckCircle, Clock, XCircle, Camera } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface KYCDocument {
  id: string;
  type: string;
  status: 'pending' | 'approved' | 'rejected';
  uploadedAt: string;
  reviewedAt?: string;
  notes?: string;
  fileName: string;
}

const KYCUpload: React.FC = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [documents, setDocuments] = useState<KYCDocument[]>([]);

  const documentTypes = [
    { id: 'national_id', nameEn: 'National ID', nameAr: 'الهوية الوطنية', required: true },
    { id: 'passport', nameEn: 'Passport', nameAr: 'جواز السفر', required: true },
    { id: 'business_license', nameEn: 'Business License', nameAr: 'السجل التجاري', required: false },
    { id: 'address_proof', nameEn: 'Address Proof', nameAr: 'إثبات العنوان', required: true },
    { id: 'bank_statement', nameEn: 'Bank Statement', nameAr: 'كشف حساب بنكي', required: false }
  ];

  const handleFileUpload = async (file: File, documentType: string) => {
    if (!user) return;

    try {
      setUploading(true);
      
      // Upload file to storage (placeholder - would use actual storage)
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${documentType}_${Date.now()}.${fileExt}`;
      
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create document record
      const newDocument: KYCDocument = {
        id: Date.now().toString(),
        type: documentType,
        status: 'pending',
        uploadedAt: new Date().toISOString(),
        fileName: file.name
      };

      setDocuments(prev => [...prev.filter(d => d.type !== documentType), newDocument]);
      
      toast.success(language === 'ar' 
        ? 'تم رفع المستند بنجاح. سيتم مراجعته خلال 24-48 ساعة'
        : 'Document uploaded successfully. It will be reviewed within 24-48 hours'
      );
      
    } catch (error) {
      toast.error(language === 'ar' ? 'فشل في رفع المستند' : 'Failed to upload document');
    } finally {
      setUploading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'pending': return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'rejected': return <XCircle className="h-5 w-5 text-red-600" />;
      default: return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      approved: 'default',
      pending: 'secondary',
      rejected: 'destructive'
    } as const;

    const labels = {
      approved: language === 'ar' ? 'مقبول' : 'Approved',
      pending: language === 'ar' ? 'قيد المراجعة' : 'Pending',
      rejected: language === 'ar' ? 'مرفوض' : 'Rejected'
    };

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {labels[status as keyof typeof labels] || status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {language === 'ar' ? 'التحقق من الهوية (KYC)' : 'Identity Verification (KYC)'}
        </h2>
        <p className="text-gray-600">
          {language === 'ar' 
            ? 'يرجى رفع المستندات المطلوبة للتحقق من هويتك والوصول لجميع ميزات المنصة'
            : 'Please upload required documents to verify your identity and access all platform features'
          }
        </p>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">
            {language === 'ar' ? 'رفع المستندات' : 'Upload Documents'}
          </TabsTrigger>
          <TabsTrigger value="status">
            {language === 'ar' ? 'حالة المراجعة' : 'Review Status'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          {documentTypes.map((docType) => {
            const existingDoc = documents.find(d => d.type === docType.id);
            
            return (
              <Card key={docType.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>{language === 'ar' ? docType.nameAr : docType.nameEn}</span>
                      {docType.required && (
                        <Badge variant="destructive" className="text-xs">
                          {language === 'ar' ? 'مطلوب' : 'Required'}
                        </Badge>
                      )}
                    </div>
                    {existingDoc && getStatusIcon(existingDoc.status)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {existingDoc ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{existingDoc.fileName}</span>
                        {getStatusBadge(existingDoc.status)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {language === 'ar' ? 'تم الرفع في:' : 'Uploaded on:'} {' '}
                        {new Date(existingDoc.uploadedAt).toLocaleDateString()}
                      </div>
                      {existingDoc.status === 'rejected' && existingDoc.notes && (
                        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                          <p className="text-sm text-red-700">{existingDoc.notes}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <div className="space-y-2">
                          <Label htmlFor={`file-${docType.id}`} className="cursor-pointer">
                            <span className="text-sm font-medium text-blue-600 hover:text-blue-500">
                              {language === 'ar' ? 'انقر لرفع ملف' : 'Click to upload file'}
                            </span>
                            <Input
                              id={`file-${docType.id}`}
                              type="file"
                              className="hidden"
                              accept="image/*,.pdf"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleFileUpload(file, docType.id);
                              }}
                            />
                          </Label>
                          <p className="text-xs text-gray-500">
                            {language === 'ar' 
                              ? 'صور أو PDF، حتى 10MB'
                              : 'Images or PDF, up to 10MB'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="status" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'حالة التحقق العامة' : 'Overall Verification Status'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.length === 0 ? (
                  <div className="text-center py-8">
                    <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      {language === 'ar' 
                        ? 'لم يتم رفع أي مستندات بعد'
                        : 'No documents uploaded yet'
                      }
                    </p>
                  </div>
                ) : (
                  documents.map((doc) => {
                    const docType = documentTypes.find(t => t.id === doc.type);
                    return (
                      <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(doc.status)}
                          <div>
                            <h4 className="font-medium">
                              {language === 'ar' ? docType?.nameAr : docType?.nameEn}
                            </h4>
                            <p className="text-sm text-gray-500">{doc.fileName}</p>
                          </div>
                        </div>
                        {getStatusBadge(doc.status)}
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KYCUpload;
