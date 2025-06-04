
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { gpoService } from '@/services/gpo-core-service';
import { supplierService } from '@/services/supplier-outreach-service';
import { Users, Target, FileText, Gavel } from 'lucide-react';
import { toast } from 'sonner';

interface GroupCreationProps {
  onGroupCreated: (groupId: string) => void;
}

export const GroupCreationWizard: React.FC<GroupCreationProps> = ({ onGroupCreated }) => {
  const { language } = useLanguage();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    minMembers: 3,
    requirements: [''],
    estimatedBudget: 0,
    searchQuery: ''
  });

  const groupTypes = [
    { value: 'group_buying', label: language === 'en' ? 'Group Buying' : 'الشراء الجماعي' },
    { value: 'cooperative_marketing', label: language === 'en' ? 'Cooperative Marketing' : 'التسويق التعاوني' },
    { value: 'company_formation', label: language === 'en' ? 'Company Formation' : 'تأسيس الشركات' }
  ];

  const handleCreateGroup = async () => {
    try {
      const group = gpoService.createGroup({
        name: formData.name,
        type: formData.type as any,
        members: [],
        minMembers: formData.minMembers,
        requirements: formData.requirements.filter(r => r.trim()),
        votingActive: false,
        contractDrafted: false,
        arbitrationRequested: false,
        createdBy: 'current-user' // Would come from auth context
      });

      // Auto-find suppliers if group buying
      if (formData.type === 'group_buying' && formData.searchQuery) {
        await supplierService.findSuppliers(formData.searchQuery);
      }

      toast.success(language === 'en' ? 'Group created successfully!' : 'تم إنشاء المجموعة بنجاح!');
      onGroupCreated(group.id);
    } catch (error) {
      toast.error(language === 'en' ? 'Failed to create group' : 'فشل في إنشاء المجموعة');
    }
  };

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const updateRequirement = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.map((req, i) => i === index ? value : req)
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-6 w-6" />
          {language === 'en' ? 'Create New Group' : 'إنشاء مجموعة جديدة'}
        </CardTitle>
        <div className="flex gap-2 mt-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`h-2 flex-1 rounded ${i <= step ? 'bg-blue-600' : 'bg-gray-200'}`} />
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">
                {language === 'en' ? 'Group Name' : 'اسم المجموعة'}
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder={language === 'en' ? 'Enter group name' : 'أدخل اسم المجموعة'}
              />
            </div>

            <div>
              <Label htmlFor="type">
                {language === 'en' ? 'Group Type' : 'نوع المجموعة'}
              </Label>
              <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'en' ? 'Select group type' : 'اختر نوع المجموعة'} />
                </SelectTrigger>
                <SelectContent>
                  {groupTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">
                {language === 'en' ? 'Description' : 'الوصف'}
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder={language === 'en' ? 'Describe the group purpose' : 'اوصف هدف المجموعة'}
                rows={3}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="minMembers">
                {language === 'en' ? 'Minimum Members' : 'الحد الأدنى للأعضاء'}
              </Label>
              <Input
                id="minMembers"
                type="number"
                min="3"
                max="15"
                value={formData.minMembers}
                onChange={(e) => setFormData(prev => ({ ...prev, minMembers: parseInt(e.target.value) }))}
              />
            </div>

            <div>
              <Label>
                {language === 'en' ? 'Requirements' : 'المتطلبات'}
              </Label>
              {formData.requirements.map((req, index) => (
                <div key={index} className="flex gap-2 mt-2">
                  <Input
                    value={req}
                    onChange={(e) => updateRequirement(index, e.target.value)}
                    placeholder={language === 'en' ? 'Enter requirement' : 'أدخل المتطلب'}
                  />
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addRequirement} className="mt-2">
                {language === 'en' ? 'Add Requirement' : 'إضافة متطلب'}
              </Button>
            </div>

            {formData.type === 'group_buying' && (
              <div>
                <Label htmlFor="budget">
                  {language === 'en' ? 'Estimated Budget' : 'الميزانية المقدرة'}
                </Label>
                <Input
                  id="budget"
                  type="number"
                  value={formData.estimatedBudget}
                  onChange={(e) => setFormData(prev => ({ ...prev, estimatedBudget: parseFloat(e.target.value) }))}
                  placeholder="0"
                />
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="text-center">
              <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {language === 'en' ? 'Review & Confirm' : 'مراجعة وتأكيد'}
              </h3>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div><strong>{language === 'en' ? 'Name:' : 'الاسم:'}</strong> {formData.name}</div>
              <div><strong>{language === 'en' ? 'Type:' : 'النوع:'}</strong> 
                <Badge className="ml-2">
                  {groupTypes.find(t => t.value === formData.type)?.label}
                </Badge>
              </div>
              <div><strong>{language === 'en' ? 'Min Members:' : 'الحد الأدنى:'}</strong> {formData.minMembers}</div>
              <div><strong>{language === 'en' ? 'Requirements:' : 'المتطلبات:'}</strong></div>
              <ul className="list-disc list-inside ml-4">
                {formData.requirements.filter(r => r.trim()).map((req, index) => (
                  <li key={index} className="text-sm">{req}</li>
                ))}
              </ul>
            </div>

            {formData.type === 'group_buying' && (
              <div>
                <Label htmlFor="searchQuery">
                  {language === 'en' ? 'Supplier Search Query' : 'استعلام البحث عن الموردين'}
                </Label>
                <Input
                  id="searchQuery"
                  value={formData.searchQuery}
                  onChange={(e) => setFormData(prev => ({ ...prev, searchQuery: e.target.value }))}
                  placeholder={language === 'en' ? 'e.g., office chairs wholesale' : 'مثال: كراسي مكتب بالجملة'}
                />
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => setStep(prev => Math.max(1, prev - 1))}
            disabled={step === 1}
          >
            {language === 'en' ? 'Previous' : 'السابق'}
          </Button>
          
          {step < 3 ? (
            <Button onClick={() => setStep(prev => prev + 1)}>
              {language === 'en' ? 'Next' : 'التالي'}
            </Button>
          ) : (
            <Button onClick={handleCreateGroup}>
              {language === 'en' ? 'Create Group' : 'إنشاء المجموعة'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
