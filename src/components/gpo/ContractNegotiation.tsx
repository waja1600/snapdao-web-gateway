
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { contractService, ContractNegotiation as ContractNegotiationType } from '@/services/contract-management-service';
import { gpoService } from '@/services/gpo-core-service';
import { FileText, Edit, Check, X, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface ContractNegotiationProps {
  groupId: string;
}

export const ContractNegotiation: React.FC<ContractNegotiationProps> = ({ groupId }) => {
  const { language } = useLanguage();
  const [negotiations, setNegotiations] = useState<ContractNegotiationType[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [contractValues, setContractValues] = useState<Record<string, any>>({});

  useEffect(() => {
    setNegotiations(contractService.getContractNegotiations(groupId));
  }, [groupId]);

  const templates = gpoService.getContractTemplates();

  const handleCreateContract = () => {
    if (!selectedTemplate) {
      toast.error(language === 'en' ? 'Please select a template' : 'يرجى اختيار قالب');
      return;
    }

    const negotiation = contractService.createContractFromTemplate(selectedTemplate, groupId, contractValues);
    setNegotiations(prev => [negotiation, ...prev]);
    setShowCreateForm(false);
    setSelectedTemplate('');
    setContractValues({});
    toast.success(language === 'en' ? 'Contract created successfully' : 'تم إنشاء العقد بنجاح');
  };

  const handleFieldChange = (negotiationId: string, fieldId: string, newValue: any) => {
    contractService.proposeFieldChange(negotiationId, fieldId, newValue, 'current-user');
    setNegotiations(contractService.getContractNegotiations(groupId));
    toast.success(language === 'en' ? 'Field change proposed' : 'تم اقتراح تغيير الحقل');
  };

  const handleApproveChange = (negotiationId: string, fieldId: string) => {
    contractService.approveFieldChange(negotiationId, fieldId, 'current-user');
    setNegotiations(contractService.getContractNegotiations(groupId));
    toast.success(language === 'en' ? 'Change approved' : 'تم الموافقة على التغيير');
  };

  const handleNotarizeContract = async (negotiationId: string) => {
    try {
      const ipfsHash = await contractService.notarizeContract(negotiationId);
      setNegotiations(contractService.getContractNegotiations(groupId));
      toast.success(`${language === 'en' ? 'Contract notarized:' : 'تم توثيق العقد:'} ${ipfsHash}`);
    } catch (error) {
      toast.error(language === 'en' ? 'Failed to notarize contract' : 'فشل في توثيق العقد');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'negotiating': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'signed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          {language === 'en' ? 'Contract Management' : 'إدارة العقود'}
        </h3>
        <Button onClick={() => setShowCreateForm(true)}>
          <FileText className="h-4 w-4 mr-2" />
          {language === 'en' ? 'Create Contract' : 'إنشاء عقد'}
        </Button>
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'en' ? 'Create New Contract' : 'إنشاء عقد جديد'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="template">
                {language === 'en' ? 'Contract Template' : 'قالب العقد'}
              </Label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'en' ? 'Select template' : 'اختر القالب'} />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      <div className="flex items-center gap-2">
                        <span>{template.name}</span>
                        {template.unTradeCompliant && (
                          <Badge variant="outline" className="text-xs">UN Compliant</Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedTemplate && (
              <div className="space-y-3">
                <h4 className="font-medium">
                  {language === 'en' ? 'Initial Values' : 'القيم الأولية'}
                </h4>
                {templates.find(t => t.id === selectedTemplate)?.fields.map((field) => (
                  <div key={field.id}>
                    <Label htmlFor={field.id}>{field.name}</Label>
                    {field.type === 'select' ? (
                      <Select 
                        value={contractValues[field.id] || ''} 
                        onValueChange={(value) => setContractValues(prev => ({ ...prev, [field.id]: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((option) => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        id={field.id}
                        type={field.type}
                        value={contractValues[field.id] || ''}
                        onChange={(e) => setContractValues(prev => ({ ...prev, [field.id]: e.target.value }))}
                        placeholder={`Enter ${field.name.toLowerCase()}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={handleCreateContract}>
                {language === 'en' ? 'Create Contract' : 'إنشاء العقد'}
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                {language === 'en' ? 'Cancel' : 'إلغاء'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {negotiations.map((negotiation) => {
          const template = templates.find(t => t.id === negotiation.contractId.split('-')[0]);
          
          return (
            <Card key={negotiation.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">
                      {language === 'en' ? 'Contract' : 'العقد'} #{negotiation.contractId}
                    </CardTitle>
                    <p className="text-gray-600 mt-1">
                      {language === 'en' ? 'Version' : 'الإصدار'} {negotiation.currentVersion}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(negotiation.status)}>
                      {negotiation.status}
                    </Badge>
                    {template?.unTradeCompliant && (
                      <Badge variant="outline">UN Compliant</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {negotiation.fieldChanges.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">
                      {language === 'en' ? 'Recent Changes' : 'التغييرات الأخيرة'}
                    </h4>
                    <div className="space-y-2">
                      {negotiation.fieldChanges.slice(0, 3).map((change, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center gap-2">
                            <Edit className="h-4 w-4 text-blue-600" />
                            <span className="text-sm">
                              Field: {change.fieldId} | New: {change.newValue}
                            </span>
                          </div>
                          <div className="flex gap-1">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleApproveChange(negotiation.id, change.fieldId)}
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  {negotiation.status === 'approved' && !negotiation.ipfsHash && (
                    <Button onClick={() => handleNotarizeContract(negotiation.id)}>
                      {language === 'en' ? 'Notarize on IPFS' : 'توثيق على IPFS'}
                    </Button>
                  )}
                  
                  {negotiation.ipfsHash && (
                    <Button variant="outline" className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      {language === 'en' ? 'View on IPFS' : 'عرض على IPFS'}
                    </Button>
                  )}
                  
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    {language === 'en' ? 'View Document' : 'عرض المستند'}
                  </Button>
                </div>

                {negotiation.ipfsHash && (
                  <div className="text-sm text-gray-600 p-2 bg-green-50 rounded">
                    {language === 'en' ? 'IPFS Hash:' : 'رمز IPFS:'} {negotiation.ipfsHash}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}

        {negotiations.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {language === 'en' ? 'No contracts yet' : 'لا توجد عقود بعد'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Create the first contract for this group'
                  : 'أنشئ أول عقد لهذه المجموعة'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
