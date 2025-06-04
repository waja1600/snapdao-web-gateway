
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { supplierService, SupplierLead, RFQTemplate } from '@/services/supplier-outreach-service';
import { Search, Send, Star, Globe, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface SupplierOffersProps {
  groupId: string;
}

export const SupplierOffers: React.FC<SupplierOffersProps> = ({ groupId }) => {
  const { language } = useLanguage();
  const [suppliers, setSuppliers] = useState<SupplierLead[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);

  const handleSearch = async () => {
    if (!searchQuery) {
      toast.error(language === 'en' ? 'Please enter search query' : 'يرجى إدخال استعلام البحث');
      return;
    }

    setIsSearching(true);
    try {
      const results = await supplierService.findSuppliers(searchQuery);
      setSuppliers(results);
      toast.success(`${language === 'en' ? 'Found' : 'تم العثور على'} ${results.length} ${language === 'en' ? 'suppliers' : 'مورد'}`);
    } catch (error) {
      toast.error(language === 'en' ? 'Search failed' : 'فشل البحث');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectSupplier = (supplierId: string) => {
    setSelectedSuppliers(prev => 
      prev.includes(supplierId) 
        ? prev.filter(id => id !== supplierId)
        : [...prev, supplierId]
    );
  };

  const handleSendRFQ = async () => {
    if (selectedSuppliers.length === 0) {
      toast.error(language === 'en' ? 'Please select suppliers' : 'يرجى اختيار الموردين');
      return;
    }

    const rfq = supplierService.generateRFQTemplate({
      name: 'Group Purchase Request',
      requirements: ['High quality products', 'Competitive pricing', 'Reliable delivery'],
      estimatedBudget: 50000
    });

    const success = await supplierService.sendRFQ(selectedSuppliers, rfq);
    if (success) {
      toast.success(`${language === 'en' ? 'RFQ sent to' : 'تم إرسال طلب عرض السعر إلى'} ${selectedSuppliers.length} ${language === 'en' ? 'suppliers' : 'مورد'}`);
      setSelectedSuppliers([]);
    }
  };

  const getComplianceColor = (rating: number) => {
    if (rating >= 90) return 'text-green-600';
    if (rating >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getResponseStatusColor = (status: string) => {
    switch (status) {
      case 'responded': return 'bg-green-100 text-green-800';
      case 'interested': return 'bg-blue-100 text-blue-800';
      case 'declined': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          {language === 'en' ? 'Supplier Management' : 'إدارة الموردين'}
        </h3>
      </div>

      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            {language === 'en' ? 'Find Suppliers' : 'البحث عن الموردين'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="search">
                {language === 'en' ? 'Search Query' : 'استعلام البحث'}
              </Label>
              <Input
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'en' ? 'e.g., office furniture suppliers USA' : 'مثال: موردو أثاث المكاتب السعودية'}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="self-end">
              <Button onClick={handleSearch} disabled={isSearching}>
                <Search className="h-4 w-4 mr-2" />
                {isSearching ? (language === 'en' ? 'Searching...' : 'جاري البحث...') : (language === 'en' ? 'Search' : 'بحث')}
              </Button>
            </div>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-blue-700 text-sm">
              {language === 'en' 
                ? 'Our AI will search global suppliers and automatically send RFQ emails to the top 5 matches.'
                : 'سيبحث الذكي الاصطناعي عن الموردين العالميين ويرسل تلقائياً رسائل طلب عروض الأسعار لأفضل 5 نتائج.'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Suppliers List */}
      {suppliers.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>
                {language === 'en' ? 'Found Suppliers' : 'الموردون المكتشفون'}
              </CardTitle>
              {selectedSuppliers.length > 0 && (
                <Button onClick={handleSendRFQ}>
                  <Send className="h-4 w-4 mr-2" />
                  {language === 'en' ? `Send RFQ (${selectedSuppliers.length})` : `إرسال طلب عرض سعر (${selectedSuppliers.length})`}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {suppliers.map((supplier) => (
                <div key={supplier.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <input
                          type="checkbox"
                          checked={selectedSuppliers.includes(supplier.id)}
                          onChange={() => handleSelectSupplier(supplier.id)}
                          className="w-4 h-4"
                        />
                        <h4 className="font-semibold text-lg">{supplier.name}</h4>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          {supplier.country}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div>
                          <span className="text-sm text-gray-600">
                            {language === 'en' ? 'Email:' : 'البريد الإلكتروني:'}
                          </span>
                          <p className="text-sm font-medium">{supplier.email}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">
                            {language === 'en' ? 'Specialization:' : 'التخصص:'}
                          </span>
                          <div className="flex gap-1 mt-1">
                            {supplier.specialization.map((spec, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">
                            {language === 'en' ? 'Compliance:' : 'الامتثال:'}
                          </span>
                          <div className="flex items-center gap-2 mt-1">
                            <div className={`font-semibold ${getComplianceColor(supplier.complianceRating)}`}>
                              {supplier.complianceRating}%
                            </div>
                            {supplier.complianceRating >= 90 && (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">
                            {language === 'en' ? 'Verified Supplier' : 'مورد موثق'}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {supplier.contactedAt && (
                            <span className="text-xs text-gray-500">
                              {language === 'en' ? 'Contacted:' : 'تم التواصل:'} {supplier.contactedAt.toLocaleDateString()}
                            </span>
                          )}
                          <Badge className={getResponseStatusColor(supplier.responseStatus)}>
                            {supplier.responseStatus}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Supplier Responses */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'en' ? 'Supplier Responses' : 'ردود الموردين'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Send className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {language === 'en' ? 'No responses yet' : 'لا توجد ردود بعد'}
            </h3>
            <p className="text-gray-600">
              {language === 'en' 
                ? 'Supplier responses will appear here once they reply to your RFQ'
                : 'ستظهر ردود الموردين هنا بمجرد ردهم على طلب عرض السعر'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
