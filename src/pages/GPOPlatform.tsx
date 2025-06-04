
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GroupCreationWizard } from '@/components/gpo/GroupCreationWizard';
import { GroupDashboard } from '@/components/gpo/GroupDashboard';
import { FreelancerAssessment } from '@/components/gpo/FreelancerAssessment';
import { gpoService, GPOGroup } from '@/services/gpo-core-service';
import { Users, Building, Handshake, Award } from 'lucide-react';

const GPOPlatform = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('groups');
  const [selectedGroup, setSelectedGroup] = useState<GPOGroup | null>(null);
  const [groups] = useState<GPOGroup[]>(gpoService.getGroups());

  const handleGroupCreated = (groupId: string) => {
    const newGroup = gpoService.getGroups().find(g => g.id === groupId);
    if (newGroup) {
      setSelectedGroup(newGroup);
      setActiveTab('group-dashboard');
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {language === 'en' ? 'GPO Platform – Unified Smart Collaboration Hub' : 'منصة GPO - مركز التعاون الذكي الموحد'}
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            {language === 'en' 
              ? 'Production-ready intelligent business collaboration platform for collective purchasing, cooperative marketing, freelancer hiring, and global company formation'
              : 'منصة تعاون تجاري ذكية جاهزة للإنتاج للشراء الجماعي والتسويق التعاوني وتوظيف المستقلين وتأسيس الشركات العالمية'}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="groups" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              {language === 'en' ? 'Groups' : 'المجموعات'}
            </TabsTrigger>
            <TabsTrigger value="create-group" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              {language === 'en' ? 'Create Group' : 'إنشاء مجموعة'}
            </TabsTrigger>
            <TabsTrigger value="freelancer-vetting" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              {language === 'en' ? 'Freelancer Vetting' : 'فحص المستقلين'}
            </TabsTrigger>
            <TabsTrigger value="group-dashboard" className="flex items-center gap-2" disabled={!selectedGroup}>
              <Handshake className="h-4 w-4" />
              {language === 'en' ? 'Group Dashboard' : 'لوحة المجموعة'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="groups">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map((group) => (
                <div 
                  key={group.id} 
                  className="p-6 border rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => {
                    setSelectedGroup(group);
                    setActiveTab('group-dashboard');
                  }}
                >
                  <h3 className="font-semibold text-lg mb-2">{group.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {language === 'en' ? 'Type:' : 'النوع:'} {group.type}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">
                      {group.members.length} {language === 'en' ? 'members' : 'عضو'}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      group.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {group.status}
                    </span>
                  </div>
                </div>
              ))}
              
              {groups.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {language === 'en' ? 'No groups yet' : 'لا توجد مجموعات بعد'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'en' ? 'Create your first group to get started' : 'أنشئ مجموعتك الأولى للبدء'}
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="create-group">
            <GroupCreationWizard onGroupCreated={handleGroupCreated} />
          </TabsContent>

          <TabsContent value="freelancer-vetting">
            <FreelancerAssessment 
              freelancerId="demo-freelancer" 
              onComplete={(assessment) => {
                console.log('Assessment completed:', assessment);
              }}
            />
          </TabsContent>

          <TabsContent value="group-dashboard">
            {selectedGroup ? (
              <GroupDashboard group={selectedGroup} />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">
                  {language === 'en' ? 'Select a group to view dashboard' : 'اختر مجموعة لعرض لوحة التحكم'}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default GPOPlatform;
