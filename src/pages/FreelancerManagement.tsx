
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { freelancerService, FreelancerProfile, FreelancerProject } from '@/services/paypal-freelancer-service';
import { Search, User, Star, DollarSign, Clock, CheckCircle } from 'lucide-react';

const FreelancerManagement: React.FC = () => {
  const { language } = useLanguage();
  const [freelancers] = useState<FreelancerProfile[]>(freelancerService.getAllFreelancers());
  const [projects] = useState<FreelancerProject[]>(freelancerService.getAllProjects());
  const [searchTerm, setSearchTerm] = useState('');

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'unavailable': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityText = (availability: string) => {
    const availabilityMap = {
      'available': language === 'en' ? 'Available' : 'متاح',
      'busy': language === 'en' ? 'Busy' : 'مشغول',
      'unavailable': language === 'en' ? 'Unavailable' : 'غير متاح'
    };
    return availabilityMap[availability as keyof typeof availabilityMap] || availability;
  };

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'open': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProjectStatusText = (status: string) => {
    const statusMap = {
      'open': language === 'en' ? 'Open' : 'مفتوح',
      'in_progress': language === 'en' ? 'In Progress' : 'قيد التنفيذ',
      'completed': language === 'en' ? 'Completed' : 'مكتمل',
      'cancelled': language === 'en' ? 'Cancelled' : 'ملغي'
    };
    return statusMap[status as keyof typeof statusMap] || status;
  };

  const filteredFreelancers = freelancers.filter(freelancer =>
    freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    freelancer.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            {language === 'en' ? 'Freelancer Management' : 'إدارة المستقلين'}
          </h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Total Freelancers' : 'إجمالي المستقلين'}
                  </p>
                  <p className="text-2xl font-bold">{freelancers.length}</p>
                </div>
                <User className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Available' : 'متاح'}
                  </p>
                  <p className="text-2xl font-bold">
                    {freelancers.filter(f => f.availability === 'available').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Active Projects' : 'المشاريع النشطة'}
                  </p>
                  <p className="text-2xl font-bold">
                    {projects.filter(p => p.status === 'in_progress').length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Total Budget' : 'الميزانية الإجمالية'}
                  </p>
                  <p className="text-2xl font-bold">
                    ${projects.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="freelancers" className="space-y-6">
          <TabsList>
            <TabsTrigger value="freelancers">
              {language === 'en' ? 'Freelancers' : 'المستقلين'}
            </TabsTrigger>
            <TabsTrigger value="projects">
              {language === 'en' ? 'Projects' : 'المشاريع'}
            </TabsTrigger>
            <TabsTrigger value="payments">
              {language === 'en' ? 'Payments' : 'المدفوعات'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="freelancers" className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder={language === 'en' ? 'Search freelancers...' : 'البحث عن مستقلين...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFreelancers.map((freelancer) => (
                <Card key={freelancer.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{freelancer.name}</CardTitle>
                      <Badge className={getAvailabilityColor(freelancer.availability)}>
                        {getAvailabilityText(freelancer.availability)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="font-medium">{freelancer.rating.toFixed(1)}</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {freelancer.completedProjects} {language === 'en' ? 'projects' : 'مشروع'}
                      </span>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        {language === 'en' ? 'Skills:' : 'المهارات:'}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {freelancer.skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {freelancer.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{freelancer.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-medium">
                        {freelancer.currency} {freelancer.hourlyRate}/hr
                      </span>
                      {freelancer.isVerified && (
                        <Badge className="bg-blue-100 text-blue-800 text-xs">
                          {language === 'en' ? 'Verified' : 'موثق'}
                        </Badge>
                      )}
                    </div>

                    <Button className="w-full" size="sm">
                      {language === 'en' ? 'View Profile' : 'عرض الملف الشخصي'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            <div className="grid gap-4">
              {projects.map((project) => (
                <Card key={project.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-medium text-lg">{project.title}</h3>
                          <Badge className={getProjectStatusColor(project.status)}>
                            {getProjectStatusText(project.status)}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{project.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">
                              {language === 'en' ? 'Budget:' : 'الميزانية:'}
                            </span>
                            <p>{project.currency} {project.budget.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">
                              {language === 'en' ? 'Created:' : 'تاريخ الإنشاء:'}
                            </span>
                            <p>{project.createdDate.toLocaleDateString()}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">
                              {language === 'en' ? 'Milestones:' : 'المراحل:'}
                            </span>
                            <p>{project.milestones.length}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">
                              {language === 'en' ? 'Skills:' : 'المهارات:'}
                            </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {project.requiredSkills.slice(0, 2).map((skill, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          {language === 'en' ? 'View Details' : 'عرض التفاصيل'}
                        </Button>
                        {project.status === 'open' && (
                          <Button size="sm">
                            {language === 'en' ? 'Assign' : 'تعيين'}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="payments">
            <div className="text-center py-8">
              <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {language === 'en' ? 'Payment Management' : 'إدارة المدفوعات'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'PayPal integration for secure freelancer payments'
                  : 'تكامل PayPal للمدفوعات الآمنة للمستقلين'}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default FreelancerManagement;
