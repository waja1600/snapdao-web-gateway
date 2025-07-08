import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Truck, Star, MapPin, Phone, Mail, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Supplier {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  rating: number;
  reviews: number;
  verified: boolean;
  minOrder: number;
  deliveryTime: string;
  specialties: string[];
  contact: {
    phone: string;
    email: string;
  };
}

const Suppliers = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const suppliers: Supplier[] = [
    {
      id: '1',
      name: language === 'en' ? 'Tech Solutions Ltd' : 'شركة الحلول التقنية المحدودة',
      description: language === 'en' 
        ? 'Leading supplier of IT equipment and software solutions for businesses'
        : 'مورد رائد لمعدات تقنية المعلومات وحلول البرمجيات للشركات',
      category: 'Technology',
      location: 'Dubai, UAE',
      rating: 4.8,
      reviews: 152,
      verified: true,
      minOrder: 1000,
      deliveryTime: '3-5 days',
      specialties: ['Hardware', 'Software', 'Cloud Services'],
      contact: {
        phone: '+971-4-123-4567',
        email: 'info@techsolutions.ae'
      }
    },
    {
      id: '2',
      name: language === 'en' ? 'Global Manufacturing Co' : 'شركة التصنيع العالمية',
      description: language === 'en'
        ? 'Industrial manufacturing and custom production services'
        : 'خدمات التصنيع الصناعي والإنتاج المخصص',
      category: 'Manufacturing',
      location: 'Riyadh, KSA',
      rating: 4.6,
      reviews: 89,
      verified: true,
      minOrder: 5000,
      deliveryTime: '7-14 days',
      specialties: ['Custom Parts', 'Bulk Production', 'Quality Control'],
      contact: {
        phone: '+966-11-987-6543',
        email: 'orders@globalmanuf.sa'
      }
    }
  ];

  const renderSupplierCard = (supplier: Supplier) => (
    <Card key={supplier.id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <CardTitle className="text-lg">{supplier.name}</CardTitle>
              {supplier.verified && (
                <Badge className="bg-green-100 text-green-800">
                  {language === 'en' ? 'Verified' : 'موثق'}
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1">{supplier.description}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="font-medium">{supplier.rating}</span>
            <span className="text-gray-500">({supplier.reviews})</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{supplier.location}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600">
              {language === 'en' ? 'Min Order' : 'الحد الأدنى للطلب'}
            </div>
            <div className="font-semibold">${supplier.minOrder.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">
              {language === 'en' ? 'Delivery' : 'التسليم'}
            </div>
            <div className="font-semibold">{supplier.deliveryTime}</div>
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-600 mb-2">
            {language === 'en' ? 'Specialties' : 'التخصصات'}
          </div>
          <div className="flex flex-wrap gap-1">
            {supplier.specialties.map((specialty, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center space-x-1">
            <Phone className="h-4 w-4 text-gray-500" />
            <span>{supplier.contact.phone}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Mail className="h-4 w-4 text-gray-500" />
            <span>{supplier.contact.email}</span>
          </div>
        </div>

        <Badge variant="outline" className="w-fit">
          {supplier.category}
        </Badge>

        <div className="flex space-x-2 pt-2">
          <Button 
            className="flex-1" 
            onClick={() => navigate(`/suppliers/${supplier.id}`)}
          >
            <Truck className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Request Quote' : 'طلب عرض سعر'}
          </Button>
          <Button variant="outline" onClick={() => navigate(`/suppliers/${supplier.id}/profile`)}>
            {language === 'en' ? 'View Profile' : 'عرض الملف'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">
              {language === 'en' ? 'Suppliers Directory' : 'دليل الموردين'}
            </h1>
            <p className="text-gray-600 mt-2">
              {language === 'en' 
                ? 'Connect with verified suppliers for your business needs'
                : 'تواصل مع الموردين الموثقين لاحتياجات عملك'}
            </p>
          </div>
          <Button onClick={() => navigate('/become-supplier')}>
            {language === 'en' ? 'Become a Supplier' : 'كن مورد'}
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder={language === 'en' ? 'Search suppliers...' : 'البحث عن الموردين...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>{language === 'en' ? 'Filters' : 'الفلاتر'}</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Total Suppliers' : 'إجمالي الموردين'}
                  </p>
                  <p className="text-2xl font-bold">1,247</p>
                </div>
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Verified' : 'موثق'}
                  </p>
                  <p className="text-2xl font-bold">892</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Categories' : 'الفئات'}
                  </p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <Filter className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Avg Rating' : 'متوسط التقييم'}
                  </p>
                  <p className="text-2xl font-bold">4.6</p>
                </div>
                <Star className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              {language === 'en' ? 'All Suppliers' : 'جميع الموردين'}
            </TabsTrigger>
            <TabsTrigger value="verified">
              {language === 'en' ? 'Verified' : 'موثق'}
            </TabsTrigger>
            <TabsTrigger value="featured">
              {language === 'en' ? 'Featured' : 'مميز'}
            </TabsTrigger>
            <TabsTrigger value="my-requests">
              {language === 'en' ? 'My Requests' : 'طلباتي'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suppliers.map(renderSupplierCard)}
            </div>
          </TabsContent>
          
          <TabsContent value="verified" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suppliers.filter(s => s.verified).map(renderSupplierCard)}
            </div>
          </TabsContent>
          
          <TabsContent value="featured" className="space-y-6">
            <div className="text-center py-12">
              <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {language === 'en' ? 'No featured suppliers yet' : 'لا يوجد موردون مميزون حتى الآن'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Featured suppliers will be displayed here'
                  : 'سيتم عرض الموردين المميزين هنا'}
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="my-requests" className="space-y-6">
            <div className="text-center py-12">
              <Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {language === 'en' ? 'No requests submitted yet' : 'لم يتم تقديم أي طلبات حتى الآن'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Your submitted requests will appear here'
                  : 'ستظهر طلباتك المقدمة هنا'}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Suppliers;
