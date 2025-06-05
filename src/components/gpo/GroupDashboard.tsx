
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { GPOGroup } from '@/services/gpo-core-service';
import { VotingPanel } from './VotingPanel';
import { ContractNegotiation } from './ContractNegotiation';
import { ArbitrationPanel } from './ArbitrationPanel';
import { SupplierOffers } from './SupplierOffers';
import { Users, Vote, FileText, Gavel, MessageCircle } from 'lucide-react';

interface GroupDashboardProps {
  group: GPOGroup;
}

export const GroupDashboard: React.FC<GroupDashboardProps> = ({ group }) => {
  const { language } = useLanguage();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'forming': return 'bg-yellow-100 text-yellow-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'negotiating': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Group Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{group.name}</CardTitle>
              <p className="text-gray-600 mt-2">
                {language === 'en' ? 'Type:' : 'النوع:'} {group.type}
              </p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{group.members.length}/15 {language === 'en' ? 'members' : 'عضو'}</span>
                </div>
                <Badge className={getStatusColor(group.status)}>
                  {group.status}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">
            {language === 'en' ? 'Overview' : 'نظرة عامة'}
          </TabsTrigger>
          <TabsTrigger value="members">
            <Users className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Members' : 'الأعضاء'}
          </TabsTrigger>
          <TabsTrigger value="voting">
            <Vote className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Voting' : 'التصويت'}
          </TabsTrigger>
          <TabsTrigger value="contracts">
            <FileText className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Contracts' : 'العقود'}
          </TabsTrigger>
          <TabsTrigger value="suppliers">
            {language === 'en' ? 'Suppliers' : 'الموردون'}
          </TabsTrigger>
          <TabsTrigger value="arbitration">
            <Gavel className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Arbitration' : 'التحكيم'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{group.members.length}</div>
                  <div className="text-sm text-gray-600">
                    {language === 'en' ? 'Active Members' : 'الأعضاء النشطون'}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {group.votingActive ? '1' : '0'}
                  </div>
                  <div className="text-sm text-gray-600">
                    {language === 'en' ? 'Active Votes' : 'التصويتات النشطة'}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {group.contractDrafted ? '1' : '0'}
                  </div>
                  <div className="text-sm text-gray-600">
                    {language === 'en' ? 'Contracts' : 'العقود'}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'en' ? 'Group Requirements' : 'متطلبات المجموعة'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {group.requirements.map((req, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members">
          <Card>
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Group Members' : 'أعضاء المجموعة'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {group.members.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="font-semibold">{member.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-gray-600">{member.role}</div>
                      </div>
                    </div>
                    <Badge variant={member.verificationStatus === 'verified' ? 'default' : 'secondary'}>
                      {member.verificationStatus}
                    </Badge>
                  </div>
                ))}
                
                {group.members.length < 15 && (
                  <Button variant="outline" className="w-full">
                    {language === 'en' ? 'Invite Members' : 'دعوة أعضاء'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="voting">
          <VotingPanel groupId={group.id} />
        </TabsContent>

        <TabsContent value="contracts">
          <ContractNegotiation groupId={group.id} />
        </TabsContent>

        <TabsContent value="suppliers">
          <SupplierOffers groupId={group.id} />
        </TabsContent>

        <TabsContent value="arbitration">
          <ArbitrationPanel groupId={group.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
