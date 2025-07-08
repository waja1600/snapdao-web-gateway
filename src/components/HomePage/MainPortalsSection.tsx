
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShoppingCart, Megaphone, Building, TrendingUp, Truck, User, Users, 
  Briefcase, Package, Scale, Gavel, Brain, ArrowRight, Eye, UserPlus, MessageCircle
} from "lucide-react";
import { PlatformService } from "@/services/platform-service";
import { PortalType } from "@/types/platform";
import { useNavigate } from "react-router-dom";

const iconMap = {
  ShoppingCart, Megaphone, Building, TrendingUp, Truck, User, Users,
  Briefcase, Package, Scale, Gavel, Brain
};

export const MainPortalsSection = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [selectedPortal, setSelectedPortal] = useState<PortalType | null>(null);
  const portals = PlatformService.getPortalConfigs();

  const handlePortalClick = (portalId: PortalType) => {
    setSelectedPortal(portalId);
  };

  const handleJoinGroup = (groupId: string) => {
    navigate('/register');
  };

  const handleSubmitOffer = (groupId: string) => {
    navigate('/register');
  };

  const handleContactGroup = (groupId: string) => {
    navigate('/register');
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      seeking_members: { 
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        text: language === 'ar' ? 'البحث عن أعضاء' : 'Seeking Members'
      },
      awaiting_supply: { 
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        text: language === 'ar' ? 'في انتظار العرض' : 'Awaiting Supply'
      },
      in_negotiation: { 
        color: 'bg-purple-100 text-purple-800 border-purple-200',
        text: language === 'ar' ? 'في التفاوض' : 'In Negotiation'
      },
      active: { 
        color: 'bg-green-100 text-green-800 border-green-200',
        text: language === 'ar' ? 'نشط' : 'Active'
      },
      completed: { 
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        text: language === 'ar' ? 'مكتمل' : 'Completed'
      }
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.active;
  };

  return (
    <section className="section-spacing bg-gradient-to-br from-background to-muted/30">
      <div className="container-responsive">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 gradient-text">
            {language === 'ar' ? 'بوابات المنصة الرئيسية' : 'Main Platform Portals'}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {language === 'ar' 
              ? 'اكتشف 12 بوابة متخصصة تغطي جميع احتياجات الأعمال التعاونية والشراء الجماعي'
              : 'Discover 12 specialized portals covering all cooperative business and group purchasing needs'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {portals.map((portal) => {
            const IconComponent = iconMap[portal.icon as keyof typeof iconMap];
            
            return (
              <Dialog key={portal.id}>
                <DialogTrigger asChild>
                  <Card 
                    className="group cursor-pointer card-hover border-2 hover:border-primary/20 transition-all duration-300"
                    onClick={() => handlePortalClick(portal.id)}
                  >
                    <CardHeader className="text-center pb-4">
                      <div className={`w-16 h-16 ${portal.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-lg leading-tight">
                        {language === 'ar' ? portal.nameAr : portal.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center pt-0">
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {language === 'ar' ? portal.descriptionAr : portal.description}
                      </p>
                      
                      <div className="flex flex-wrap justify-center gap-1 mb-4">
                        {portal.requiresKYC && (
                          <Badge variant="outline" className="text-xs">
                            {language === 'ar' ? 'توثيق الهوية' : 'KYC'}
                          </Badge>
                        )}
                        {portal.requiresPoints && (
                          <Badge variant="outline" className="text-xs">
                            {language === 'ar' ? 'نقاط' : 'Points'}
                          </Badge>
                        )}
                        {portal.requiresMCPExam && (
                          <Badge variant="outline" className="text-xs">
                            {language === 'ar' ? 'اختبار MCP' : 'MCP Test'}
                          </Badge>
                        )}
                      </div>
                      
                      <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {language === 'ar' ? 'استكشاف البوابة' : 'Explore Portal'}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </DialogTrigger>

                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-3 text-2xl">
                      <div className={`w-12 h-12 ${portal.color} rounded-xl flex items-center justify-center`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      {language === 'ar' ? portal.nameAr : portal.name}
                    </DialogTitle>
                  </DialogHeader>

                  <Tabs defaultValue="groups" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="groups">
                        {language === 'ar' ? 'المجموعات النشطة' : 'Active Groups'}
                      </TabsTrigger>
                      <TabsTrigger value="workflow">
                        {language === 'ar' ? 'سير العمل' : 'Workflow'}
                      </TabsTrigger>
                      <TabsTrigger value="requirements">
                        {language === 'ar' ? 'المتطلبات' : 'Requirements'}
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="groups" className="space-y-4">
                      <div className="grid gap-4">
                        {PlatformService.getMockGroupCards(portal.id).map((group) => {
                          const statusInfo = getStatusBadge(group.status);
                          
                          return (
                            <Card key={group.id} className="border border-border hover:shadow-md transition-shadow">
                              <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                  <div className="flex-1">
                                    <h3 className="font-semibold text-lg mb-2">
                                      {language === 'ar' ? group.nameAr : group.name}
                                    </h3>
                                    <p className="text-muted-foreground text-sm mb-3">
                                      {language === 'ar' ? group.descriptionAr : group.description}
                                    </p>
                                  </div>
                                  <Badge className={statusInfo.color}>
                                    {statusInfo.text}
                                  </Badge>
                                </div>

                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <Users className="h-4 w-4" />
                                      {group.memberCount}/{group.maxMembers}
                                    </span>
                                    <span>
                                      {language === 'ar' ? 'المرحلة:' : 'Phase:'} {language === 'ar' ? group.currentPhaseAr : group.currentPhase}
                                    </span>
                                  </div>
                                  {group.joinFee && (
                                    <Badge variant="secondary">
                                      {group.joinFee} {language === 'ar' ? 'نقطة' : 'points'}
                                    </Badge>
                                  )}
                                </div>

                                <div className="flex gap-2">
                                  <Button 
                                    size="sm" 
                                    onClick={() => handleJoinGroup(group.id)}
                                    className="flex-1"
                                  >
                                    <UserPlus className="h-4 w-4 mr-2" />
                                    {language === 'ar' ? 'انضمام' : 'Join'}
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleSubmitOffer(group.id)}
                                    className="flex-1"
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    {language === 'ar' ? 'تقديم عرض' : 'Submit Offer'}
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="ghost"
                                    onClick={() => handleContactGroup(group.id)}
                                  >
                                    <MessageCircle className="h-4 w-4" />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </TabsContent>

                    <TabsContent value="workflow" className="space-y-4">
                      <div className="bg-muted/30 rounded-lg p-6">
                        <h3 className="font-semibold mb-4">
                          {language === 'ar' ? 'خطوات الانضمام للبوابة' : 'Portal Entry Workflow'}
                        </h3>
                        <div className="space-y-3">
                          {PlatformService.getWorkflowSteps(portal.id).map((step, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                                {index + 1}
                              </div>
                              <span className="text-sm">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="requirements" className="space-y-4">
                      <div className="grid gap-4">
                        <Card>
                          <CardContent className="p-6">
                            <h3 className="font-semibold mb-4">
                              {language === 'ar' ? 'متطلبات الدخول' : 'Entry Requirements'}
                            </h3>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span>{language === 'ar' ? 'توثيق الهوية (KYC)' : 'KYC Verification'}</span>
                                <Badge variant={portal.requiresKYC ? "default" : "secondary"}>
                                  {portal.requiresKYC ? (language === 'ar' ? 'مطلوب' : 'Required') : (language === 'ar' ? 'غير مطلوب' : 'Not Required')}
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>{language === 'ar' ? 'نقاط الدفع' : 'Points Payment'}</span>
                                <Badge variant={portal.requiresPoints ? "default" : "secondary"}>
                                  {portal.requiresPoints ? (language === 'ar' ? 'مطلوب' : 'Required') : (language === 'ar' ? 'غير مطلوب' : 'Not Required')}
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>{language === 'ar' ? 'اختبار MCP' : 'MCP Exam'}</span>
                                <Badge variant={portal.requiresMCPExam ? "default" : "secondary"}>
                                  {portal.requiresMCPExam ? (language === 'ar' ? 'مطلوب' : 'Required') : (language === 'ar' ? 'غير مطلوب' : 'Not Required')}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-card p-6 rounded-2xl shadow-sm">
            <div className="text-3xl font-bold text-primary mb-2">12</div>
            <div className="text-sm text-muted-foreground">
              {language === 'ar' ? 'بوابة متخصصة' : 'Specialized Portals'}
            </div>
          </div>
          <div className="bg-card p-6 rounded-2xl shadow-sm">
            <div className="text-3xl font-bold text-dao-green mb-2">500+</div>
            <div className="text-sm text-muted-foreground">
              {language === 'ar' ? 'مجموعة نشطة' : 'Active Groups'}
            </div>
          </div>
          <div className="bg-card p-6 rounded-2xl shadow-sm">
            <div className="text-3xl font-bold text-dao-blue mb-2">10k+</div>
            <div className="text-sm text-muted-foreground">
              {language === 'ar' ? 'عضو مسجل' : 'Registered Members'}
            </div>
          </div>
          <div className="bg-card p-6 rounded-2xl shadow-sm">
            <div className="text-3xl font-bold text-purple-600 mb-2">85%</div>
            <div className="text-sm text-muted-foreground">
              {language === 'ar' ? 'توفير في التكاليف' : 'Cost Savings'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
