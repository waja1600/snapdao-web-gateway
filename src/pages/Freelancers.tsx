
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Star, MapPin, Clock, DollarSign, User, Filter, Grid, List, Plus, Award } from 'lucide-react';
import { toast } from 'sonner';

interface Freelancer {
  id: string;
  name: string;
  title: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  hourlyRate: number;
  location: string;
  availability: string;
  skills: string[];
  verified: boolean;
  level: 'Beginner' | 'Intermediate' | 'Expert' | 'Top Rated';
  image: string;
  completedJobs: number;
  responseTime: string;
  languages: string[];
}

const mockFreelancers: Freelancer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'Full Stack Developer',
    category: 'Development',
    description: 'Experienced full-stack developer specializing in React, Node.js, and cloud technologies',
    rating: 4.9,
    reviews: 157,
    hourlyRate: 75,
    location: 'San Francisco, USA',
    availability: 'Available',
    skills: ['React', 'Node.js', 'Python', 'AWS', 'MongoDB'],
    verified: true,
    level: 'Top Rated',
    image: '/placeholder.svg',
    completedJobs: 89,
    responseTime: '< 1 hour',
    languages: ['English', 'Spanish']
  },
  {
    id: '2',
    name: 'Ahmed Hassan',
    title: 'UI/UX Designer',
    category: 'Design',
    description: 'Creative designer with 5+ years experience in mobile and web design',
    rating: 4.8,
    reviews: 203,
    hourlyRate: 55,
    location: 'Dubai, UAE',
    availability: 'Busy',
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
    verified: true,
    level: 'Expert',
    image: '/placeholder.svg',
    completedJobs: 134,
    responseTime: '< 2 hours',
    languages: ['Arabic', 'English']
  },
  {
    id: '3',
    name: 'Maria Rodriguez',
    title: 'Digital Marketing Specialist',
    category: 'Marketing',
    description: 'Results-driven marketing professional with expertise in social media and PPC',
    rating: 4.7,
    reviews: 89,
    hourlyRate: 45,
    location: 'Madrid, Spain',
    availability: 'Available',
    skills: ['SEO', 'Google Ads', 'Facebook Ads', 'Content Marketing', 'Analytics'],
    verified: true,
    level: 'Intermediate',
    image: '/placeholder.svg',
    completedJobs: 67,
    responseTime: '< 3 hours',
    languages: ['Spanish', 'English', 'Portuguese']
  }
];

const Freelancers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [minRate, setMinRate] = useState('');
  const [maxRate, setMaxRate] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [freelancers] = useState<Freelancer[]>(mockFreelancers);

  const categories = ['all', 'Development', 'Design', 'Marketing', 'Writing', 'Translation', 'Data Entry'];
  const levels = ['all', 'Beginner', 'Intermediate', 'Expert', 'Top Rated'];

  const filteredFreelancers = freelancers.filter(freelancer => {
    const matchesSearch = freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         freelancer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         freelancer.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || freelancer.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || freelancer.level === selectedLevel;
    const matchesRate = (!minRate || freelancer.hourlyRate >= parseInt(minRate)) &&
                       (!maxRate || freelancer.hourlyRate <= parseInt(maxRate));
    
    return matchesSearch && matchesCategory && matchesLevel && matchesRate;
  });

  const handleHireFreelancer = (freelancerId: string) => {
    toast.success('Hire request sent successfully!');
  };

  const handleContactFreelancer = (freelancerId: string) => {
    toast.success('Message sent to freelancer!');
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Top Rated': return 'bg-purple-100 text-purple-800';
      case 'Expert': return 'bg-blue-100 text-blue-800';
      case 'Intermediate': return 'bg-green-100 text-green-800';
      case 'Beginner': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const FreelancerCard = ({ freelancer }: { freelancer: Freelancer }) => (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start gap-3">
          <img
            src={freelancer.image}
            alt={freelancer.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">{freelancer.name}</CardTitle>
              {freelancer.verified && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-600 font-medium">{freelancer.title}</p>
            <Badge className={getLevelColor(freelancer.level)}>
              {freelancer.level}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-700 line-clamp-3">{freelancer.description}</p>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{freelancer.rating}</span>
            <span className="text-sm text-gray-600">({freelancer.reviews})</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{freelancer.location}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4 text-gray-400" />
            <span className="font-semibold text-green-600">${freelancer.hourlyRate}/hr</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className={`text-sm ${
              freelancer.availability === 'Available' ? 'text-green-600' : 'text-orange-600'
            }`}>
              {freelancer.availability}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-gray-600">
            <Award className="h-4 w-4 inline mr-1" />
            {freelancer.completedJobs} jobs completed
          </div>
          <div className="text-sm text-gray-600">
            Response time: {freelancer.responseTime}
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {freelancer.skills.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {freelancer.skills.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{freelancer.skills.length - 4} more
            </Badge>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => handleContactFreelancer(freelancer.id)}
          >
            Contact
          </Button>
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => handleHireFreelancer(freelancer.id)}
          >
            Hire Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const FreelancerListItem = ({ freelancer }: { freelancer: Freelancer }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <img
            src={freelancer.image}
            alt={freelancer.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div>
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    {freelancer.name}
                    {freelancer.verified && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Verified
                      </Badge>
                    )}
                    <Badge className={getLevelColor(freelancer.level)}>
                      {freelancer.level}
                    </Badge>
                  </h3>
                  <p className="text-gray-600 font-medium">{freelancer.title}</p>
                </div>
                <p className="text-gray-700">{freelancer.description}</p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{freelancer.rating}</span>
                    <span className="text-sm text-gray-600">({freelancer.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{freelancer.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{freelancer.completedJobs} jobs</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {freelancer.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="text-right space-y-2">
                <div className="text-2xl font-bold text-green-600">
                  ${freelancer.hourlyRate}/hr
                </div>
                <div className={`text-sm ${
                  freelancer.availability === 'Available' ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {freelancer.availability}
                </div>
                <div className="text-sm text-gray-600">
                  Responds in {freelancer.responseTime}
                </div>
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleContactFreelancer(freelancer.id)}
                  >
                    Contact
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => handleHireFreelancer(freelancer.id)}
                  >
                    Hire Now
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
            <h1 className="text-3xl font-bold">Freelancers</h1>
            <p className="text-gray-600 mt-2">Find skilled professionals for your projects</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Join as Freelancer
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="lg:col-span-2 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search freelancers..."
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
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map(level => (
                    <SelectItem key={level} value={level}>
                      {level === 'all' ? 'All Levels' : level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="Min Rate"
                value={minRate}
                onChange={(e) => setMinRate(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Max Rate"
                value={maxRate}
                onChange={(e) => setMaxRate(e.target.value)}
              />
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
                {filteredFreelancers.length} freelancers found
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Freelancers */}
        <div className="space-y-4">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFreelancers.map(freelancer => (
                <FreelancerCard key={freelancer.id} freelancer={freelancer} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFreelancers.map(freelancer => (
                <FreelancerListItem key={freelancer.id} freelancer={freelancer} />
              ))}
            </div>
          )}
        </div>

        {/* Top Rated Freelancers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Rated Freelancers</CardTitle>
            <p className="text-gray-600">Our highest-rated professionals</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {freelancers.filter(f => f.level === 'Top Rated').map(freelancer => (
                <div key={freelancer.id} className="border rounded-lg p-4 bg-gradient-to-r from-purple-50 to-blue-50">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={freelancer.image}
                      alt={freelancer.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{freelancer.name}</h3>
                      <p className="text-sm text-gray-600">{freelancer.title}</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{freelancer.rating}</span>
                        <Badge className="bg-purple-100 text-purple-800 ml-2">Top Rated</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-green-600">${freelancer.hourlyRate}/hr</span>
                    <Button size="sm" onClick={() => handleHireFreelancer(freelancer.id)}>
                      Hire Now
                    </Button>
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
              <div className="text-2xl font-bold text-blue-600">2.5k+</div>
              <div className="text-sm text-gray-600">Active Freelancers</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600">15k+</div>
              <div className="text-sm text-gray-600">Projects Completed</div>
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
              <div className="text-2xl font-bold text-orange-600">95%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Freelancers;
