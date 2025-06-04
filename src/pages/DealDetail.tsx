
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabaseService } from '@/services/supabase-service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Users, Calendar, DollarSign } from 'lucide-react';

const DealDetail = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [group, setGroup] = useState<any>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && user) {
      fetchDealDetails();
    }
  }, [id, user]);

  const fetchDealDetails = async () => {
    setLoading(true);
    try {
      // For now, create mock data since we need to implement the full group system
      const mockGroup = {
        id: id,
        name: language === 'en' ? 'Medical Equipment Group Purchase' : 'مجموعة شراء المعدات الطبية',
        description: language === 'en' 
          ? 'Collaborative purchase of medical equipment for healthcare facilities'
          : 'شراء تعاوني للمعدات الطبية للمرافق الصحية',
        type: 'group_contract',
        service_gateway: 'cooperative_buying',
        business_objective: 'Aggregated Procurement',
        legal_framework: 'Framework Agreements',
        jurisdiction: 'EG',
        status: 'active',
        target_amount: 50000,
        current_amount: 35000,
        target_members: 15,
        current_members: 8,
        deadline: '2024-02-15',
        created_at: '2024-01-15'
      };

      setGroup(mockGroup);

      const mockMembers = [
        { id: '1', name: 'أحمد محمد', role: 'creator', joined_at: '2024-01-15' },
        { id: '2', name: 'فاطمة أحمد', role: 'member', joined_at: '2024-01-16' },
        { id: '3', name: 'محمد علي', role: 'member', joined_at: '2024-01-17' }
      ];

      setMembers(mockMembers);
    } catch (error) {
      console.error('Error fetching deal details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinGroup = async () => {
    if (!user || !group) return;

    try {
      // Check if user is already a member
      const isAlreadyMember = members.some(member => member.user_id === user.id);
      
      if (isAlreadyMember) {
        alert(language === 'en' ? 'You are already a member of this group' : 'أنت عضو بالفعل في هذه المجموعة');
        return;
      }

      // In a real implementation, this would call the API
      const newMember = {
        id: Date.now().toString(),
        name: user.email,
        role: 'member',
        joined_at: new Date().toISOString()
      };

      setMembers([...members, newMember]);
      alert(language === 'en' ? 'Successfully joined the group!' : 'تم الانضمام للمجموعة بنجاح!');
    } catch (error) {
      console.error('Error joining group:', error);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">
            {language === 'en' ? 'Loading...' : 'جاري التحميل...'}
          </div>
        </div>
      </Layout>
    );
  }

  if (!group) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-4">
            {language === 'en' ? 'Deal not found' : 'الصفقة غير موجودة'}
          </h2>
          <Button onClick={() => navigate('/deals')}>
            {language === 'en' ? 'Back to Deals' : 'العودة للصفقات'}
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/deals')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {language === 'en' ? 'Back to Deals' : 'العودة للصفقات'}
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{group.name}</CardTitle>
                    <p className="text-gray-600 mt-2">{group.description}</p>
                  </div>
                  <Badge variant={group.status === 'active' ? 'default' : 'secondary'}>
                    {group.status === 'active' 
                      ? (language === 'en' ? 'Active' : 'نشط')
                      : (language === 'en' ? 'Inactive' : 'غير نشط')
                    }
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      {language === 'en' ? 'Business Objective' : 'الهدف التجاري'}
                    </label>
                    <p>{group.business_objective}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      {language === 'en' ? 'Legal Framework' : 'الإطار القانوني'}
                    </label>
                    <p>{group.legal_framework}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>{language === 'en' ? 'Target Amount' : 'المبلغ المستهدف'}</span>
                    <span>${group.current_amount?.toLocaleString()} / ${group.target_amount?.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${((group.current_amount || 0) / (group.target_amount || 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>{language === 'en' ? 'Members' : 'الأعضاء'}</span>
                    <span>{group.current_members} / {group.target_members}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${((group.current_members || 0) / (group.target_members || 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Members List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'Group Members' : 'أعضاء المجموعة'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {members.map((member) => (
                    <div key={member.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-600">
                          {language === 'en' ? 'Joined' : 'انضم في'}: {new Date(member.joined_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={member.role === 'creator' ? 'default' : 'secondary'}>
                        {member.role === 'creator' 
                          ? (language === 'en' ? 'Creator' : 'المنشئ')
                          : (language === 'en' ? 'Member' : 'عضو')
                        }
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'en' ? 'Deal Information' : 'معلومات الصفقة'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">
                      {language === 'en' ? 'Deadline' : 'الموعد النهائي'}
                    </p>
                    <p className="font-medium">
                      {new Date(group.deadline).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">
                      {language === 'en' ? 'Target Savings' : 'التوفير المستهدف'}
                    </p>
                    <p className="font-medium">25%</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">
                      {language === 'en' ? 'Spots Left' : 'المقاعد المتبقية'}
                    </p>
                    <p className="font-medium">
                      {(group.target_members || 0) - (group.current_members || 0)}
                    </p>
                  </div>
                </div>

                <Button onClick={handleJoinGroup} className="w-full">
                  {language === 'en' ? 'Join This Group' : 'انضم لهذه المجموعة'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DealDetail;
