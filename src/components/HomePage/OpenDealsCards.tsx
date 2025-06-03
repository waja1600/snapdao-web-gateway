
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar, MapPin, Users } from "lucide-react";

export const OpenDealsCards = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleViewDetails = (id: string) => {
    if (user) {
      navigate(`/group-details/${id}`);
    } else {
      navigate("/login");
    }
  };

  // Mock data for demonstration
  const openDeals = [
    {
      id: "1",
      name: language === 'en' ? 'Medical Equipment Group' : 'مجموعة المعدات الطبية',
      type: 'buying',
      activity: language === 'en' ? 'Medical Equipment Purchase' : 'شراء معدات طبية',
      country: language === 'en' ? 'Saudi Arabia' : 'السعودية',
      status: 'seeking_members',
      currentMembers: 8,
      targetMembers: 15,
      createdAt: '2024-01-15',
      votingStatus: 'pending'
    },
    {
      id: "2", 
      name: language === 'en' ? 'Marketing Campaign Group' : 'مجموعة الحملة التسويقية',
      type: 'marketing',
      activity: language === 'en' ? 'Digital Marketing Campaign' : 'حملة تسويق رقمي',
      country: language === 'en' ? 'UAE' : 'الإمارات',
      status: 'seeking_suppliers',
      currentMembers: 12,
      targetMembers: 12,
      createdAt: '2024-01-10',
      votingStatus: 'active'
    },
    {
      id: "3",
      name: language === 'en' ? 'Software Development Task' : 'مهمة تطوير البرمجيات',
      type: 'freelancer',
      activity: language === 'en' ? 'Mobile App Development' : 'تطوير تطبيق موبايل',
      country: language === 'en' ? 'Egypt' : 'مصر',
      status: 'seeking_freelancers',
      currentMembers: 1,
      targetMembers: 3,
      createdAt: '2024-01-12',
      votingStatus: 'not_started'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'seeking_members': return 'bg-blue-100 text-blue-800';
      case 'seeking_suppliers': return 'bg-green-100 text-green-800';
      case 'seeking_freelancers': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap = {
      seeking_members: { en: 'Seeking Members', ar: 'تبحث عن أعضاء' },
      seeking_suppliers: { en: 'Seeking Suppliers', ar: 'تبحث عن موردين' },
      seeking_freelancers: { en: 'Seeking Freelancers', ar: 'تطلب مستقلين' }
    };
    return statusMap[status as keyof typeof statusMap]?.[language] || status;
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          {language === 'en' ? 'Open Opportunities' : 'الفرص المفتوحة'}
        </h2>
        <p className="text-gray-600 text-center mb-12">
          {language === 'en' 
            ? 'Join active groups or submit your offers'
            : 'انضم إلى المجموعات النشطة أو قدم عروضك'
          }
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {openDeals.map((deal) => (
            <Card key={deal.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg leading-tight">{deal.name}</CardTitle>
                  <Badge className={getStatusColor(deal.status)}>
                    {getStatusText(deal.status)}
                  </Badge>
                </div>
                <CardDescription>{deal.activity}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {deal.country}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    {deal.currentMembers}/{deal.targetMembers} {language === 'en' ? 'members' : 'عضو'}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(deal.createdAt).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={() => handleViewDetails(deal.id)}
                  >
                    {language === 'en' ? 'View Details' : 'عرض التفاصيل'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
