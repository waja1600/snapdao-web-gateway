
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { gpoService, ArbitrationCase } from '@/services/gpo-core-service';
import { Gavel, FileText, Clock, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface ArbitrationPanelProps {
  groupId: string;
}

export const ArbitrationPanel: React.FC<ArbitrationPanelProps> = ({ groupId }) => {
  const { language } = useLanguage();
  const [cases, setCases] = useState<ArbitrationCase[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCase, setNewCase] = useState({
    type: 'dispute' as const,
    description: '',
    evidence: ''
  });

  useEffect(() => {
    setCases(gpoService.getArbitrationCases().filter(c => c.groupId === groupId));
  }, [groupId]);

  const handleFileArbitration = () => {
    if (!newCase.description) {
      toast.error(language === 'en' ? 'Please provide case description' : 'يرجى تقديم وصف القضية');
      return;
    }

    const arbitrationCase = gpoService.fileArbitration({
      groupId,
      type: newCase.type,
      evidence: newCase.evidence ? [newCase.evidence] : [],
      filedBy: 'current-user'
    });

    setCases(prev => [arbitrationCase, ...prev]);
    setShowCreateForm(false);
    setNewCase({ type: 'dispute', description: '', evidence: '' });
    toast.success(language === 'en' ? 'Arbitration case filed successfully' : 'تم تقديم قضية التحكيم بنجاح');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'filed': return 'bg-yellow-100 text-yellow-800';
      case 'review': return 'bg-blue-100 text-blue-800';
      case 'hearing': return 'bg-orange-100 text-orange-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'dispute': return <AlertTriangle className="h-4 w-4" />;
      case 'compliance': return <FileText className="h-4 w-4" />;
      case 'breach': return <Gavel className="h-4 w-4" />;
      default: return <Gavel className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          {language === 'en' ? 'ORDA Arbitration System' : 'نظام تحكيم ORDA'}
        </h3>
        <Button onClick={() => setShowCreateForm(true)} variant="outline">
          <Gavel className="h-4 w-4 mr-2" />
          {language === 'en' ? 'File Arbitration' : 'تقديم طلب تحكيم'}
        </Button>
      </div>

      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Gavel className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <h4 className="font-semibold text-blue-900">
                {language === 'en' ? 'WTO-Compliant Arbitration Process' : 'عملية التحكيم المتوافقة مع منظمة التجارة العالمية'}
              </h4>
              <p className="text-blue-700 text-sm mt-1">
                {language === 'en' 
                  ? 'Our arbitration system follows World Trade Organization dispute resolution guidelines for fair and transparent resolution.'
                  : 'يتبع نظام التحكيم لدينا إرشادات منظمة التجارة العالمية لحل النزاعات للوصول إلى حلول عادلة وشفافة.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'en' ? 'File Arbitration Case' : 'تقديم قضية تحكيم'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="type">
                {language === 'en' ? 'Case Type' : 'نوع القضية'}
              </Label>
              <Select 
                value={newCase.type} 
                onValueChange={(value: any) => setNewCase(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dispute">
                    {language === 'en' ? 'Contract Dispute' : 'نزاع تعاقدي'}
                  </SelectItem>
                  <SelectItem value="compliance">
                    {language === 'en' ? 'Compliance Issue' : 'مشكلة امتثال'}
                  </SelectItem>
                  <SelectItem value="breach">
                    {language === 'en' ? 'Contract Breach' : 'خرق العقد'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">
                {language === 'en' ? 'Case Description' : 'وصف القضية'}
              </Label>
              <Textarea
                id="description"
                value={newCase.description}
                onChange={(e) => setNewCase(prev => ({ ...prev, description: e.target.value }))}
                placeholder={language === 'en' ? 'Describe the issue in detail' : 'اوصف المشكلة بالتفصيل'}
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="evidence">
                {language === 'en' ? 'Supporting Evidence' : 'الأدلة الداعمة'}
              </Label>
              <Textarea
                id="evidence"
                value={newCase.evidence}
                onChange={(e) => setNewCase(prev => ({ ...prev, evidence: e.target.value }))}
                placeholder={language === 'en' ? 'Provide relevant evidence, documents, or references' : 'قدم الأدلة أو المستندات أو المراجع ذات الصلة'}
                rows={3}
              />
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-2">
                {language === 'en' ? 'Arbitration Process' : 'عملية التحكيم'}
              </h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>
                  {language === 'en' 
                    ? '1. Case filed and reviewed by ORDA panel'
                    : '1. تقديم القضية ومراجعتها من قبل لجنة ORDA'}
                </li>
                <li>
                  {language === 'en' 
                    ? '2. Evidence collection and party responses'
                    : '2. جمع الأدلة وردود الأطراف'}
                </li>
                <li>
                  {language === 'en' 
                    ? '3. Virtual hearing (if required)'
                    : '3. جلسة استماع افتراضية (إذا لزم الأمر)'}
                </li>
                <li>
                  {language === 'en' 
                    ? '4. Final decision and resolution'
                    : '4. القرار النهائي والحل'}
                </li>
              </ul>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleFileArbitration}>
                {language === 'en' ? 'File Case' : 'تقديم القضية'}
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                {language === 'en' ? 'Cancel' : 'إلغاء'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {cases.map((arbitrationCase) => (
          <Card key={arbitrationCase.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {getTypeIcon(arbitrationCase.type)}
                    {language === 'en' ? 'Case' : 'القضية'} #{arbitrationCase.id}
                  </CardTitle>
                  <p className="text-gray-600 mt-1 capitalize">
                    {arbitrationCase.type} - {language === 'en' ? 'Filed by' : 'مقدمة من'} {arbitrationCase.filedBy}
                  </p>
                </div>
                <Badge className={getStatusColor(arbitrationCase.status)}>
                  {arbitrationCase.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">
                  {language === 'en' ? 'Case Timeline' : 'جدول زمني للقضية'}
                </h4>
                <div className="space-y-2">
                  {arbitrationCase.timeline.map((event) => (
                    <div key={event.id} className="flex items-center gap-3 text-sm">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">
                        {event.date.toLocaleDateString()} - {event.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {arbitrationCase.evidence.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">
                    {language === 'en' ? 'Evidence' : 'الأدلة'}
                  </h4>
                  <div className="space-y-1">
                    {arbitrationCase.evidence.map((evidence, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{evidence}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {arbitrationCase.resolution && (
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-1">
                    {language === 'en' ? 'Resolution' : 'القرار'}
                  </h4>
                  <p className="text-green-700 text-sm">{arbitrationCase.resolution}</p>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'View Details' : 'عرض التفاصيل'}
                </Button>
                {arbitrationCase.status === 'resolved' && (
                  <Button variant="outline" size="sm">
                    {language === 'en' ? 'Download Report' : 'تحميل التقرير'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {cases.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Gavel className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {language === 'en' ? 'No arbitration cases' : 'لا توجد قضايا تحكيم'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'All group activities are proceeding smoothly without disputes'
                  : 'جميع أنشطة المجموعة تسير بسلاسة دون نزاعات'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
