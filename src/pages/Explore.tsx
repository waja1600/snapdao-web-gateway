
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDAO } from "@/contexts/DAOContext";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Search, FileText } from "lucide-react";

const Explore = () => {
  const { t } = useLanguage();
  const { proposals, protocolOptions, networkOptions, categoryOptions, filterProposals } = useDAO();
  const navigate = useNavigate();
  
  const [protocol, setProtocol] = useState<string>("");
  const [network, setNetwork] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const filteredProposals = filterProposals(protocol || undefined, network || undefined, category || undefined)
    .filter(p => 
      searchQuery ? 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) 
      : true
    );
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t('explore')}</h1>
          <Button onClick={() => navigate('/proposals')}>
            {t('proposals')}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6">
          {/* Filters Section */}
          <div className="space-y-6 bg-white p-6 rounded-lg border">
            <h2 className="font-semibold text-lg mb-4">فلترة</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">البحث</label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="عن ماذا تبحث..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">البروتوكول</label>
                <Select value={protocol} onValueChange={setProtocol}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر البروتوكول" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">جميع البروتوكولات</SelectItem>
                    {protocolOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">الشبكة</label>
                <Select value={network} onValueChange={setNetwork}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الشبكة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">جميع الشبكات</SelectItem>
                    {networkOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">الفئة</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الفئة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">جميع الفئات</SelectItem>
                    {categoryOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setProtocol("");
                  setNetwork("");
                  setCategory("");
                  setSearchQuery("");
                }}
              >
                إعادة تعيين الفلاتر
              </Button>
            </div>
          </div>
          
          {/* Results Section */}
          <div className="space-y-4">
            {filteredProposals.length > 0 ? (
              filteredProposals.map((proposal) => (
                <Card 
                  key={proposal.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/proposals/${proposal.id}`)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-lg">{proposal.title}</h3>
                        <p className="text-gray-500 mt-1 line-clamp-2">{proposal.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mt-3">
                          {proposal.protocol && (
                            <Badge variant="outline">{proposal.protocol}</Badge>
                          )}
                          {proposal.network && (
                            <Badge variant="secondary">{proposal.network}</Badge>
                          )}
                          {proposal.category && (
                            <Badge variant="outline" className="bg-blue-50">{proposal.category}</Badge>
                          )}
                        </div>
                      </div>
                      
                      <Badge variant={proposal.status === 'active' ? 'default' : 'secondary'}>
                        {proposal.status === 'active' ? 'نشط' : 'مغلق'}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <FileText className="mr-2 h-4 w-4" />
                        <span>تم الإنشاء في {format(new Date(proposal.createdAt), 'MMM d, yyyy')}</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        {Object.values(proposal.votes || {}).reduce((sum, count) => sum + count, 0)} أصوات
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center p-12 bg-gray-50 border border-dashed rounded-lg">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-xl font-medium">لم يتم العثور على مقترحات</h3>
                <p className="mt-2 text-gray-500">
                  جرب تعديل معايير البحث أو إنشاء مقترح جديد.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Explore;
