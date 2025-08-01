
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Star, MapPin, Package, Factory, Award, Users, Filter, Grid, List, Plus, Phone, Mail } from 'lucide-react';
import { toast } from 'sonner';

interface Supplier {
  id: string;
  companyName: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  location: string;
  yearEstablished: number;
  employees: string;
  products: string[];
  verified: boolean;
  certification: string[];
  image: string;
  contactEmail: string;
  contactPhone: string;
  minimumOrder: string;
  deliveryTime: string;
  paymentTerms: string;
}

const mockSuppliers: Supplier[] = [
  {
    id: '1',
    companyName: 'GlobalTech Manufacturing',
    category: 'Electronics',
    description: 'Leading manufacturer of electronic components and consumer electronics with 20+ years experience',
    rating: 4.8,
    reviews: 342,
    location: 'Shenzhen, China',
    yearEstablished: 2003,
    employees: '500-1000',
    products: ['Smartphones', 'Tablets', 'Accessories', 'Components'],
    verified: true,
    certification: ['ISO 9001', 'CE', 'FCC'],
    image: '/placeholder.svg',
    contactEmail: 'info@globaltech.com',
    contactPhone: '+86-755-12345678',
    minimumOrder: '$10,000',
    deliveryTime: '15-20 days',
    paymentTerms: 'T/T, L/C'
  },
  {
    id: '2',
    companyName: 'Premium Textiles Ltd',
    category: 'Textiles',
    description: 'High-quality textile manufacturer specializing in organic cotton and sustainable fabrics',
    rating: 4.6,
    reviews: 189,
    location: 'Mumbai, India',
    yearEstablished: 1998,
    employees: '200-500',
    products: ['Cotton Fabrics', 'Organic Materials', 'Denim', 'Knits'],
    verified: true,
    certification: ['GOTS', 'OEKO-TEX', 'ISO 14001'],
    image: '/placeholder.svg',
    contactEmail: 'export@premiumtextiles.com',
    contactPhone: '+91-22-12345678',
    minimumOrder: '$5,000',
    deliveryTime: '20-25 days',
    paymentTerms: 'T/T, L/C at sight'
  },
  {
    id: '3',
    companyName: 'Industrial Solutions Inc',
    category: 'Machinery',
    description: 'Advanced industrial machinery and automation solutions for manufacturing industries',
    rating: 4.9,
    reviews: 156,
    location: 'Hamburg, Germany',
    yearEstablished: 1985,
    employees: '1000+',
    products: ['CNC Machines', 'Automation Systems', 'Industrial Tools', 'Parts'],
    verified: true,
    certification: ['ISO 9001', 'CE', 'TUV'],
    image: '/placeholder.svg',
    contactEmail: 'sales@industrialsolutions.de',
    contactPhone: '+49-40-12345678',
    minimumOrder: '$50,000',
    deliveryTime: '30-45 days',
    paymentTerms: 'T/T, Bank Guarantee'
  }
];

const Suppliers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [suppliers] = useState<Supplier[]>(mockSuppliers);

  const categories = ['all', 'Electronics', 'Textiles', 'Machinery', 'Chemicals', 'Food & Beverage', 'Construction'];
  const locations = ['all', 'China', 'India', 'Germany', 'USA', 'Turkey', 'Vietnam'];

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.products.some(product => product.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || supplier.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || supplier.location.includes(selectedLocation);
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const handleContactSupplier = (supplierId: string) => {
    toast.success('Contact request sent successfully!');
  };

  const handleRequestQuote = (supplierId: string) => {
    toast.success('Quote request submitted!');
  };

  const SupplierCard = ({ supplier }: { supplier: Supplier }) => (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start gap-3">
          <img
            src={supplier.image}
            alt={supplier.companyName}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              {supplier.companyName}
              {supplier.verified && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Verified
                </Badge>
              )}
            </CardTitle>
            <p className="text-sm text-gray-600">{supplier.category}</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{supplier.rating}</span>
              <span className="text-sm text-gray-600">({supplier.reviews})</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-700 line-clamp-3">{supplier.description}</p>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">{supplier.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Factory className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">Est. {supplier.yearEstablished}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">{supplier.employees} employees</span>
          </div>
          <div className="flex items-center gap-1">
            <Package className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">Min: {supplier.minimumOrder}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm">
            <span className="font-medium">Delivery: </span>
            <span className="text-gray-600">{supplier.deliveryTime}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium">Payment: </span>
            <span className="text-gray-600">{supplier.paymentTerms}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {supplier.products.slice(0, 3).map((product) => (
            <Badge key={product} variant="outline" className="text-xs">
              {product}
            </Badge>
          ))}
          {supplier.products.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{supplier.products.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap gap-1">
          {supplier.certification.map((cert) => (
            <Badge key={cert} className="text-xs bg-blue-100 text-blue-800">
              <Award className="h-3 w-3 mr-1" />
              {cert}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => handleContactSupplier(supplier.id)}
          >
            Contact
          </Button>
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => handleRequestQuote(supplier.id)}
          >
            Request Quote
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const SupplierListItem = ({ supplier }: { supplier: Supplier }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <img
            src={supplier.image}
            alt={supplier.companyName}
            className="w-20 h-20 rounded-lg object-cover"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div>
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    {supplier.companyName}
                    {supplier.verified && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Verified
                      </Badge>
                    )}
                  </h3>
                  <p className="text-gray-600">{supplier.category}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{supplier.rating}</span>
                  <span className="text-sm text-gray-600">({supplier.reviews} reviews)</span>
                </div>
                <p className="text-gray-700">{supplier.description}</p>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{supplier.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Factory className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Est. {supplier.yearEstablished}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{supplier.employees}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Min Order: </span>
                    <span className="text-gray-600">{supplier.minimumOrder}</span>
                  </div>
                  <div>
                    <span className="font-medium">Delivery: </span>
                    <span className="text-gray-600">{supplier.deliveryTime}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {supplier.products.map((product) => (
                    <Badge key={product} variant="outline" className="text-xs">
                      {product}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {supplier.certification.map((cert) => (
                    <Badge key={cert} className="text-xs bg-blue-100 text-blue-800">
                      <Award className="h-3 w-3 mr-1" />
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="text-right space-y-2">
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{supplier.contactEmail}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{supplier.contactPhone}</span>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleContactSupplier(supplier.id)}
                  >
                    Contact
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => handleRequestQuote(supplier.id)}
                  >
                    Request Quote
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Suppliers</h1>
            <p className="text-gray-600 mt-2">Connect with verified manufacturers and suppliers worldwide</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Register as Supplier
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-2 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search suppliers, products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>
                      {location === 'all' ? 'All Locations' : location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-600">
                {filteredSuppliers.length} suppliers found
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Featured Suppliers */}
        <Card>
          <CardHeader>
            <CardTitle>Featured Suppliers</CardTitle>
            <p className="text-gray-600">Top-rated suppliers recommended by our platform</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suppliers.filter(s => s.rating >= 4.8).map(supplier => (
                <div key={supplier.id} className="border rounded-lg p-4 bg-gradient-to-r from-green-50 to-blue-50">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={supplier.image}
                      alt={supplier.companyName}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{supplier.companyName}</h3>
                      <p className="text-sm text-gray-600">{supplier.category}</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{supplier.rating}</span>
                        <Badge className="bg-green-100 text-green-800 ml-2">Featured</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Min: {supplier.minimumOrder}</span>
                    <Button size="sm" onClick={() => handleRequestQuote(supplier.id)}>
                      Request Quote
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Suppliers */}
        <div className="space-y-4">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSuppliers.map(supplier => (
                <SupplierCard key={supplier.id} supplier={supplier} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredSuppliers.map(supplier => (
                <SupplierListItem key={supplier.id} supplier={supplier} />
              ))}
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600">5k+</div>
              <div className="text-sm text-gray-600">Verified Suppliers</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600">50+</div>
              <div className="text-sm text-gray-600">Countries</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600">100k+</div>
              <div className="text-sm text-gray-600">Products Listed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-orange-600">4.7</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Suppliers;
