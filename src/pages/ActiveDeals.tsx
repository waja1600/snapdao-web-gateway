
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Users, CircleDollarSign, Tag, CircleCheck } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Dummy data for active deals
const activeDeals = [
  {
    id: "1",
    title: "توريد أثاث مكتبي",
    description: "مطلوب توريد 100 كرسي و50 مكتب لخمس شركات",
    network: "مجموعات الشراء الجماعي",
    members: 5,
    budget: "50,000 ريال",
    votes: { yes: 4, no: 0, abstain: 1 },
    category: "أثاث",
    deadline: "2025-06-15",
    status: "active"
  },
  {
    id: "2",
    title: "خدمات تطوير مواقع",
    description: "تطوير موقع إلكتروني متكامل مع نظام إدارة محتوى",
    network: "بوابة التوظيف",
    members: 3,
    budget: "25,000 ريال",
    votes: { yes: 3, no: 0, abstain: 0 },
    category: "تكنولوجيا",
    deadline: "2025-06-30",
    status: "active"
  },
  {
    id: "3",
    title: "تمويل مشروع زراعي",
    description: "تمويل مشروع زراعي بمساحة 10 هكتار",
    network: "بوابات تمويل المشروعات",
    members: 8,
    budget: "200,000 ريال",
    votes: { yes: 6, no: 1, abstain: 1 },
    category: "زراعة",
    deadline: "2025-07-15",
    status: "active"
  }
];

// Dummy data for network requests
const networkRequests = [
  {
    id: "1",
    title: "مصمم جرافيك",
    description: "مطلوب مصمم جرافيك لتصميم هوية بصرية كاملة",
    network: "بوابة التوظيف",
    budget: "5,000 ريال",
    deadline: "2025-06-10",
    status: "active"
  },
  {
    id: "2",
    title: "خبير تسويق رقمي",
    description: "مطلوب خبير تسويق رقمي لإدارة حملات إعلانية",
    network: "بوابة التوظيف",
    budget: "7,000 ريال",
    deadline: "2025-06-20",
    status: "active"
  }
];

const ActiveDeals = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [networkFilter, setNetworkFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter deals based on selected filters
  const filteredDeals = activeDeals.filter(deal => {
    const matchesNetwork = networkFilter === "all" || deal.network === networkFilter;
    const matchesCategory = categoryFilter === "all" || deal.category === categoryFilter;
    const matchesSearch = !searchQuery || 
      deal.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      deal.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesNetwork && matchesCategory && matchesSearch;
  });

  // Filter network requests based on search query
  const filteredRequests = networkRequests.filter(request => {
    return !searchQuery || 
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      request.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold">
            {language === 'en' ? 'Active Deals & Requests' : 'الصفقات والطلبات النشطة'}
          </h1>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => navigate('/proposals')}>
              {language === 'en' ? 'View Proposals' : 'عرض المقترحات'}
            </Button>
            <Button onClick={() => navigate('/proposals/new')}>
              {language === 'en' ? 'Create Proposal' : 'إنشاء مقترح'}
            </Button>
          </div>
        </div>

        {/* Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6">
          <div className="space-y-6 bg-white p-6 rounded-lg border">
            <h2 className="font-semibold text-lg">
              {language === 'en' ? 'Filters' : 'تصفية'}
            </h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {language === 'en' ? 'Search' : 'بحث'}
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder={language === 'en' ? "Search deals..." : "البحث عن صفقات..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {language === 'en' ? 'Network' : 'الشبكة'}
                </label>
                <Select value={networkFilter} onValueChange={setNetworkFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'en' ? "Select Network" : "اختر الشبكة"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{language === 'en' ? "All Networks" : "جميع الشبكات"}</SelectItem>
                    <SelectItem value="مجموعات الشراء الجماعي">مجموعات الشراء الجماعي</SelectItem>
                    <SelectItem value="بوابات تمويل المشروعات">بوابات تمويل المشروعات</SelectItem>
                    <SelectItem value="بوابة التوظيف">بوابة التوظيف</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {language === 'en' ? 'Category' : 'الفئة'}
                </label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'en' ? "Select Category" : "اختر الفئة"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{language === 'en' ? "All Categories" : "جميع الفئات"}</SelectItem>
                    <SelectItem value="أثاث">أثاث</SelectItem>
                    <SelectItem value="تكنولوجيا">تكنولوجيا</SelectItem>
                    <SelectItem value="زراعة">زراعة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="space-y-6">
            {/* Active Deals Section */}
            <section>
              <h2 className="text-xl font-semibold mb-4">
                {language === 'en' ? 'Active Group Deals' : 'صفقات المجموعات النشطة'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDeals.map((deal) => (
                  <Card key={deal.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{deal.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {deal.description}
                          </CardDescription>
                        </div>
                        <Badge variant="outline">{deal.network}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex flex-wrap gap-2 my-2">
                        <Badge variant="secondary">{deal.category}</Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Users className="h-3 w-3" /> {deal.members}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <CircleDollarSign className="h-3 w-3" /> {deal.budget}
                        </Badge>
                      </div>
                      
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">التصويت:</span>
                          <span className="text-green-600 text-sm flex items-center">
                            <CircleCheck className="h-4 w-4 mr-1" /> {deal.votes.yes}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {language === 'en' ? 'Deadline: ' : 'الموعد النهائي: '} 
                          {new Date(deal.deadline).toLocaleDateString(language === 'en' ? 'en-US' : 'ar-SA')}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Button 
                        className="w-full"
                        onClick={() => navigate(`/deals/${deal.id}`)}
                      >
                        {deal.network === "بوابة التوظيف" 
                          ? (language === 'en' ? "Submit Offer" : "تقديم عرض") 
                          : deal.network === "بوابات تمويل المشروعات"
                          ? (language === 'en' ? "Join Funding" : "انضم للتمويل")
                          : (language === 'en' ? "Submit Supply Offer" : "تقديم عرض توريد")}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {filteredDeals.length === 0 && (
                <div className="text-center p-8 border border-dashed rounded-lg">
                  <p className="text-gray-500">
                    {language === 'en' ? 'No deals matching your filters' : 'لا توجد صفقات تطابق عوامل التصفية'}
                  </p>
                </div>
              )}
            </section>
            
            {/* Network Requests Section */}
            <section className="mt-8">
              <h2 className="text-xl font-semibold mb-4">
                {language === 'en' ? 'Freelance Service Requests' : 'طلبات خدمات المستقلين'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredRequests.map((request) => (
                  <Card key={request.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle>{request.title}</CardTitle>
                        <Badge>{request.network}</Badge>
                      </div>
                      <CardDescription className="mt-1">
                        {request.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <CircleDollarSign className="h-3 w-3" /> {request.budget}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {language === 'en' ? 'Deadline: ' : 'الموعد النهائي: '} 
                          {new Date(request.deadline).toLocaleDateString(language === 'en' ? 'en-US' : 'ar-SA')}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Button 
                        variant="outline"
                        className="w-full"
                        onClick={() => navigate(`/requests/${request.id}`)}
                      >
                        {language === 'en' ? "Submit Proposal" : "تقديم اقتراح"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {filteredRequests.length === 0 && (
                <div className="text-center p-8 border border-dashed rounded-lg">
                  <p className="text-gray-500">
                    {language === 'en' ? 'No service requests matching your search' : 'لا توجد طلبات خدمات تطابق بحثك'}
                  </p>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ActiveDeals;
