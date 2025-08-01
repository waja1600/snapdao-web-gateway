
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Star, MapPin, Clock, Users, Filter, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface ServiceProvider {
  id: string;
  name: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  location: string;
  priceRange: string;
  availability: string;
  services: string[];
  verified: boolean;
  image: string;
}

const mockServiceProviders: ServiceProvider[] = [
  {
    id: '1',
    name: 'TechSolutions Pro',
    category: 'IT Services',
    description: 'Professional IT consulting and software development services',
    rating: 4.8,
    reviews: 127,
    location: 'New York, USA',
    priceRange: '$50-100/hr',
    availability: 'Available',
    services: ['Web Development', 'Mobile Apps', 'Cloud Services'],
    verified: true,
    image: '/placeholder.svg'
  },
  {
    id: '2',
    name: 'Creative Design Studio',
    category: 'Design',
    description: 'Full-service design agency specializing in branding and digital design',
    rating: 4.6,
    reviews: 89,
    location: 'London, UK',
    priceRange: '$40-80/hr',
    availability: 'Busy',
    services: ['Graphic Design', 'Branding', 'UI/UX Design'],
    verified: true,
    image: '/placeholder.svg'
  },
  {
    id: '3',
    name: 'Marketing Masters',
    category: 'Marketing',
    description: 'Digital marketing experts helping businesses grow online',
    rating: 4.9,
    reviews: 203,
    location: 'Dubai, UAE',
    priceRange: '$30-70/hr',
    availability: 'Available',
    services: ['SEO', 'Social Media', 'Content Marketing'],
    verified: true,
    image: '/placeholder.svg'
  }
];

const ServiceProviders = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [providers] = useState<ServiceProvider[]>(mockServiceProviders);

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || provider.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'IT Services', 'Design', 'Marketing', 'Legal', 'Finance', 'Healthcare'];

  const handleContactProvider = (providerId: string) => {
    toast.success('Contact request sent successfully!');
  };

  const handleBookService = (providerId: string) => {
    toast.success('Service booking initiated!');
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Service Providers</h1>
            <p className="text-gray-600 mt-2">Find professional service providers for your business needs</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Become a Provider
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search service providers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
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
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="grid" className="w-full">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
            </TabsList>
            <p className="text-sm text-gray-600">
              Showing {filteredProviders.length} providers
            </p>
          </div>

          <TabsContent value="grid" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProviders.map((provider) => (
                <Card key={provider.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={provider.image}
                          alt={provider.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {provider.name}
                            {provider.verified && (
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                Verified
                              </Badge>
                            )}
                          </CardTitle>
                          <p className="text-sm text-gray-600">{provider.category}</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-700">{provider.description}</p>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{provider.rating}</span>
                        <span className="text-sm text-gray-600">({provider.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{provider.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className={`text-sm ${
                          provider.availability === 'Available' ? 'text-green-600' : 'text-orange-600'
                        }`}>
                          {provider.availability}
                        </span>
                      </div>
                      <span className="font-semibold text-blue-600">{provider.priceRange}</span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {provider.services.slice(0, 3).map((service) => (
                        <Badge key={service} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                      {provider.services.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{provider.services.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleContactProvider(provider.id)}
                      >
                        Contact
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleBookService(provider.id)}
                      >
                        Book Service
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list" className="space-y-4">
            {filteredProviders.map((provider) => (
              <Card key={provider.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold flex items-center gap-2">
                            {provider.name}
                            {provider.verified && (
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                Verified
                              </Badge>
                            )}
                          </h3>
                          <p className="text-gray-600">{provider.category}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{provider.rating}</span>
                            <span className="text-sm text-gray-600">({provider.reviews})</span>
                          </div>
                          <p className="font-semibold text-blue-600">{provider.priceRange}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mt-2 mb-3">{provider.description}</p>
                      
                      <div className="flex items-center gap-6 mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{provider.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className={`text-sm ${
                            provider.availability === 'Available' ? 'text-green-600' : 'text-orange-600'
                          }`}>
                            {provider.availability}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{provider.reviews} reviews</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {provider.services.map((service) => (
                            <Badge key={service} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleContactProvider(provider.id)}
                          >
                            Contact
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleBookService(provider.id)}
                          >
                            Book Service
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="featured" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Featured Service Providers</CardTitle>
                <p className="text-gray-600">Top-rated providers recommended by our platform</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredProviders.filter(p => p.rating >= 4.8).map((provider) => (
                    <div key={provider.id} className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-purple-50">
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={provider.image}
                          alt={provider.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-lg">{provider.name}</h3>
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{provider.rating}</span>
                            <Badge className="bg-purple-100 text-purple-800">Featured</Badge>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{provider.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-blue-600">{provider.priceRange}</span>
                        <Button size="sm" onClick={() => handleBookService(provider.id)}>
                          Book Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600">500+</div>
              <div className="text-sm text-gray-600">Service Providers</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600">15k+</div>
              <div className="text-sm text-gray-600">Services Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600">4.8</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-orange-600">24/7</div>
              <div className="text-sm text-gray-600">Support Available</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ServiceProviders;
