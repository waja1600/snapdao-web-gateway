
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MCPAssistant } from "@/components/mcp/MCPAssistant";
import { Plus, Search, Users, Calendar, MessageCircle, Settings, UserPlus } from "lucide-react";
import { toast } from "sonner";

// Mock data for groups
const mockGroups = [
  {
    id: "1",
    name: "Office Supplies Buyers",
    nameAr: "مشتري المستلزمات المكتبية",
    description: "Group for bulk buying office supplies",
    descriptionAr: "مجموعة للشراء بالجملة للمستلزمات المكتبية",
    memberCount: 15,
    status: "active",
    createdAt: "2024-01-15",
    category: "Office Supplies",
    totalSavings: 2500,
    activeDeals: 3,
    nextMeeting: "2024-02-15"
  },
  {
    id: "2",
    name: "Tech Equipment Group",
    nameAr: "مجموعة المعدات التقنية",
    description: "Collective buying for technology and equipment",
    descriptionAr: "الشراء الجماعي للتكنولوجيا والمعدات",
    memberCount: 25,
    status: "active",
    createdAt: "2024-01-10",
    category: "Technology",
    totalSavings: 5200,
    activeDeals: 5,
    nextMeeting: "2024-02-12"
  },
  {
    id: "3",
    name: "Marketing Services Collective",
    nameAr: "مجموعة خدمات التسويق",
    description: "Group for marketing and advertising services",
    descriptionAr: "مجموعة لخدمات التسويق والإعلان",
    memberCount: 8,
    status: "planning",
    createdAt: "2024-01-20",
    category: "Services",
    totalSavings: 1800,
    activeDeals: 1,
    nextMeeting: "2024-02-18"
  }
];

const MyGroups = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredGroups = mockGroups.filter(group => {
    const matchesSearch = searchTerm === "" || 
      (language === 'en' ? group.name : group.nameAr).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || group.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return language === 'en' ? 'Active' : 'نشط';
      case 'planning': return language === 'en' ? 'Planning' : 'تخطيط';
      case 'completed': return language === 'en' ? 'Completed' : 'مكتمل';
      default: return status;
    }
  };

  const handleJoinGroup = (groupId: string) => {
    toast.success(language === 'en' ? 'Joined group successfully!' : 'تم الانضمام للمجموعة بنجاح!');
  };

  const handleInviteFreelancer = (groupId: string) => {
    toast.info(language === 'en' ? 'Invite feature coming soon' : 'ميزة الدعوة قريباً');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            {language === 'en' ? 'My Groups' : 'مجموعاتي'}
          </h1>
          <Button onClick={() => navigate('/create-group')}>
            <Plus className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Create Group' : 'إنشاء مجموعة'}
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder={language === 'en' ? 'Search groups...' : 'البحث في المجموعات...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="all">{language === 'en' ? 'All Categories' : 'كل الفئات'}</option>
            <option value="Office Supplies">{language === 'en' ? 'Office Supplies' : 'المستلزمات المكتبية'}</option>
            <option value="Technology">{language === 'en' ? 'Technology' : 'التكنولوجيا'}</option>
            <option value="Services">{language === 'en' ? 'Services' : 'الخدمات'}</option>
          </select>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <Card key={group.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">
                      {language === 'en' ? group.name : group.nameAr}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      {language === 'en' ? group.description : group.descriptionAr}
                    </p>
                  </div>
                  <Badge className={getStatusColor(group.status)}>
                    {getStatusText(group.status)}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Group Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>{group.memberCount} {language === 'en' ? 'members' : 'عضو'}</span>
                  </div>
                  <div className="text-green-600 font-medium">
                    ${group.totalSavings} {language === 'en' ? 'saved' : 'مدخر'}
                  </div>
                  <div>
                    {group.activeDeals} {language === 'en' ? 'active deals' : 'صفقة نشطة'}
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Calendar className="h-3 w-3" />
                    <span className="text-xs">{group.nextMeeting}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => navigate(`/group-room/${group.id}`)}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {language === 'en' ? 'Enter' : 'دخول'}
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleInviteFreelancer(group.id)}
                  >
                    <UserPlus className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => toast.info('Settings coming soon')}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>

                {/* Recent Members */}
                <div>
                  <p className="text-xs text-gray-500 mb-2">
                    {language === 'en' ? 'Recent members:' : 'الأعضاء الحديثون:'}
                  </p>
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <Avatar key={i} className="h-6 w-6 border-2 border-white">
                        <AvatarFallback className="text-xs">
                          {String.fromCharCode(65 + i)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {group.memberCount > 4 && (
                      <div className="h-6 w-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                        <span className="text-xs text-gray-600">+{group.memberCount - 4}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {language === 'en' ? 'No groups found' : 'لم يتم العثور على مجموعات'}
            </h3>
            <p className="text-gray-500 mb-4">
              {language === 'en' 
                ? 'Try adjusting your search criteria or create a new group'
                : 'جرب تعديل معايير البحث أو إنشاء مجموعة جديدة'}
            </p>
            <Button onClick={() => navigate('/create-group')}>
              <Plus className="h-4 w-4 mr-2" />
              {language === 'en' ? 'Create Your First Group' : 'إنشاء مجموعتك الأولى'}
            </Button>
          </div>
        )}

        {/* MCP Assistant */}
        <MCPAssistant />
      </div>
    </Layout>
  );
};

export default MyGroups;
