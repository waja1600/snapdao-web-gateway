
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ShoppingCart, Heart, Star, Eye, Filter, Grid, List, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  seller: string;
  location: string;
  stock: number;
  images: string[];
  featured: boolean;
  discount?: number;
  tags: string[];
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Professional Laptop Stand',
    category: 'Electronics',
    description: 'Adjustable aluminum laptop stand for ergonomic working',
    price: 89.99,
    originalPrice: 109.99,
    rating: 4.7,
    reviews: 234,
    seller: 'TechStore Pro',
    location: 'New York, USA',
    stock: 45,
    images: ['/placeholder.svg'],
    featured: true,
    discount: 18,
    tags: ['ergonomic', 'aluminum', 'adjustable']
  },
  {
    id: '2',
    name: 'Wireless Bluetooth Headphones',
    category: 'Electronics',
    description: 'High-quality noise-canceling wireless headphones',
    price: 199.99,
    rating: 4.8,
    reviews: 567,
    seller: 'AudioWorld',
    location: 'California, USA',
    stock: 23,
    images: ['/placeholder.svg'],
    featured: false,
    tags: ['wireless', 'bluetooth', 'noise-canceling']
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    category: 'Clothing',
    description: 'Comfortable organic cotton t-shirt in various colors',
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.5,
    reviews: 89,
    seller: 'EcoFashion',
    location: 'London, UK',
    stock: 156,
    images: ['/placeholder.svg'],
    featured: true,
    discount: 29,
    tags: ['organic', 'cotton', 'eco-friendly']
  }
];

const ProductListings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [products] = useState<Product[]>(mockProducts);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const categories = ['all', 'Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books'];
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'featured':
        return b.featured ? 1 : -1;
      default:
        return 0;
    }
  });

  const handleAddToCart = (productId: string) => {
    toast.success('Product added to cart!');
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
    toast.success(wishlist.includes(productId) ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <CardHeader className="p-0 relative">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.discount && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
              -{product.discount}%
            </Badge>
          )}
          {product.featured && (
            <Badge className="absolute top-2 right-2 bg-purple-500 text-white">
              Featured
            </Badge>
          )}
          <Button
            variant="outline"
            size="sm"
            className={`absolute top-2 right-12 opacity-0 group-hover:opacity-100 transition-opacity ${
              wishlist.includes(product.id) ? 'bg-red-50 text-red-500' : ''
            }`}
            onClick={() => handleToggleWishlist(product.id)}
          >
            <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? 'fill-red-500' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{product.rating}</span>
              <span className="text-sm text-gray-500">({product.reviews})</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {product.seller}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-x-2">
              <span className="text-xl font-bold text-green-600">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <div className="text-sm text-gray-500">
              {product.stock} in stock
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {product.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 flex items-center gap-1"
            >
              <Eye className="h-4 w-4" />
              View
            </Button>
            <Button 
              size="sm" 
              className="flex-1 flex items-center gap-1"
              onClick={() => handleAddToCart(product.id)}
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ProductListItem = ({ product }: { product: Product }) => (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="relative">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            {product.discount && (
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
                -{product.discount}%
              </Badge>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {product.seller}
                  </Badge>
                  <span className="text-sm text-gray-500">{product.stock} in stock</span>
                </div>
              </div>
              <div className="text-right space-y-2">
                <div className="space-x-2">
                  <span className="text-xl font-bold text-green-600">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleWishlist(product.id)}
                  >
                    <Heart className={`h-4 w-4 ${
                      wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : ''
                    }`} />
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => handleAddToCart(product.id)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add to Cart
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
            <h1 className="text-3xl font-bold">Product Listings</h1>
            <p className="text-gray-600 mt-2">Discover amazing products from verified sellers</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            List Your Product
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
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
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            </div>
          </CardContent>
        </Card>

        {/* Results Counter */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Showing {sortedProducts.length} of {products.length} products
          </p>
          <div className="text-sm text-gray-600">
            {wishlist.length} items in wishlist
          </div>
        </div>

        {/* Products */}
        <div className="space-y-4">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedProducts.map(product => (
                <ProductListItem key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* Featured Products */}
        <Card>
          <CardHeader>
            <CardTitle>Featured Products</CardTitle>
            <p className="text-gray-600">Hand-picked products from our top sellers</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.filter(p => p.featured).map(product => (
                <div key={product.id} className="border rounded-lg p-4 bg-gradient-to-r from-purple-50 to-blue-50">
                  <div className="flex gap-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{product.name}</h3>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-green-600">${product.price}</span>
                        <Button size="sm" onClick={() => handleAddToCart(product.id)}>
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600">10k+</div>
              <div className="text-sm text-gray-600">Products Listed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600">1.2k+</div>
              <div className="text-sm text-gray-600">Active Sellers</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600">50k+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
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

export default ProductListings;
