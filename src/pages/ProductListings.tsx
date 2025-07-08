import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Package, Star, MapPin, DollarSign, Truck, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  supplier: string;
  location: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  minOrder: number;
  images: string[];
  specifications: Record<string, string>;
  shipping: string;
}

const ProductListings = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const products: Product[] = [
    {
      id: '1',
      name: language === 'en' ? 'Industrial Laptop Computer' : 'حاسوب محمول صناعي',
      description: language === 'en' 
        ? 'Rugged industrial laptop designed for harsh environments with extended battery life'
        : 'حاسوب محمول صناعي مقاوم مصمم للبيئات القاسية مع عمر بطارية طويل',
      category: 'Electronics',
      price: 1250,
      currency: 'USD',
      supplier: 'TechCorp Solutions',
      location: 'Singapore',
      rating: 4.6,
      reviews: 24,
      inStock: true,
      minOrder: 10,
      images: ['/placeholder.svg'],
      specifications: {
        'Screen Size': '15.6 inches',
        'RAM': '16GB',
        'Storage': '512GB SSD',
        'OS': 'Windows 11 Pro'
      },
      shipping: '5-7 business days'
    },
    {
      id: '2',
      name: language === 'en' ? 'Office Furniture Set' : 'طقم أثاث مكتبي',
      description: language === 'en'
        ? 'Complete ergonomic office furniture set including desk, chair, and storage units'
        : 'طقم أثاث مكتبي مريح شامل يشمل مكتب وكرسي ووحدات تخزين',
      category: 'Furniture',
      price: 899,
      currency: 'USD',
      supplier: 'Furniture Plus',
      location: 'Dubai, UAE',
      rating: 4.8,
      reviews: 67,
      inStock: true,
      minOrder: 5,
      images: ['/placeholder.svg'],
      specifications: {
        'Material': 'Premium Wood',
        'Color': 'Walnut Brown',
        'Warranty': '3 Years',
        'Assembly': 'Required'
      },
      shipping: '3-5 business days'
    }
  ];

  const renderProductCard = (product: Product) => (
    <Card key={product.id} className="hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-2 right-2">
          {product.inStock ? (
            <Badge className="bg-green-100 text-green-800">
              {language === 'en' ? 'In Stock' : 'متوفر'}
            </Badge>
          ) : (
            <Badge className="bg-red-100 text-red-800">
              {language === 'en' ? 'Out of Stock' : 'غير متوفر'}
            </Badge>
          )}
        </div>
      </div>
      
      <CardHeader>
        <CardTitle className="text-lg">{product.name}</CardTitle>
        <p className="text-sm text-gray-600">{product.description}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-green-600">
            {product.currency} {product.price.toLocaleString()}
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="font-medium">{product.rating}</span>
            <span className="text-gray-500">({product.reviews})</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-600">{language === 'en' ? 'Supplier' : 'المورد'}</div>
            <div className="font-semibold">{product.supplier}</div>
          </div>
          <div>
            <div className="text-gray-600">{language === 'en' ? 'Min Order' : 'الحد الأدنى'}</div>
            <div className="font-semibold">{product.minOrder} units</div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>{product.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Truck className="h-4 w-4" />
            <span>{product.shipping}</span>
          </div>
        </div>

        <Badge variant="outline" className="w-fit">
          {product.category}
        </Badge>

        <div className="flex space-x-2 pt-2">
          <Button 
            className="flex-1" 
            onClick={() => navigate(`/products/${product.id}/order`)}
          >
            <Package className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Order Now' : 'اطلب الآن'}
          </Button>
          <Button variant="outline" onClick={() => navigate(`/products/${product.id}`)}>
            <Eye className="h-4 w-4 mr-2" />
            {language === 'en' ? 'View' : 'عرض'}
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
              {language === 'en' ? 'Product Listings' : 'قوائم المنتجات'}
            </h1>
            <p className="text-gray-600 mt-2">
              {language === 'en' 
                ? 'Discover and order products from verified suppliers worldwide'
                : 'اكتشف واطلب المنتجات من موردين موثوقين حول العالم'}
            </p>
          </div>
          <Button onClick={() => navigate('/list-product')}>
            {language === 'en' ? 'List Product' : 'عرض منتج'}
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder={language === 'en' ? 'Search products...' : 'البحث عن المنتجات...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Total Products' : 'إجمالي المنتجات'}
                  </p>
                  <p className="text-2xl font-bold">12,847</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
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
                  <p className="text-2xl font-bold">156</p>
                </div>
                <Eye className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'In Stock' : 'متوفر'}
                  </p>
                  <p className="text-2xl font-bold">9,234</p>
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
                    {language === 'en' ? 'Suppliers' : 'الموردون'}
                  </p>
                  <p className="text-2xl font-bold">1,567</p>
                </div>
                <Truck className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              {language === 'en' ? 'All Products' : 'جميع المنتجات'}
            </TabsTrigger>
            <TabsTrigger value="in-stock">
              {language === 'en' ? 'In Stock' : 'متوفر'}
            </TabsTrigger>
            <TabsTrigger value="featured">
              {language === 'en' ? 'Featured' : 'مميز'}
            </TabsTrigger>
            <TabsTrigger value="my-orders">
              {language === 'en' ? 'My Orders' : 'طلباتي'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(renderProductCard)}
            </div>
          </TabsContent>
          
          <TabsContent value="in-stock" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.filter(p => p.inStock).map(renderProductCard)}
            </div>
          </TabsContent>
          
          <TabsContent value="featured" className="space-y-6">
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {language === 'en' ? 'No featured products yet' : 'لا توجد منتجات مميزة بعد'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Featured products will appear here'
                  : 'ستظهر المنتجات المميزة هنا'}
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="my-orders" className="space-y-6">
            <div className="text-center py-12">
              <Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {language === 'en' ? 'No orders yet' : 'لا توجد طلبات بعد'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Your order history will appear here'
                  : 'سيظهر سجل طلباتك هنا'}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ProductListings;
