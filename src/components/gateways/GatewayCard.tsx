
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface GatewayCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  route: string;
  status?: 'active' | 'beta' | 'coming_soon';
  features: string[];
  memberCount?: number;
  recentActivity?: string;
}

export const GatewayCard: React.FC<GatewayCardProps> = ({
  title,
  description,
  icon: Icon,
  route,
  status = 'active',
  features,
  memberCount,
  recentActivity
}) => {
  const navigate = useNavigate();

  const getStatusColor = () => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'beta': return 'bg-blue-100 text-blue-800';
      case 'coming_soon': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'active': return 'Active';
      case 'beta': return 'Beta';
      case 'coming_soon': return 'Coming Soon';
      default: return 'Unknown';
    }
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Icon className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <Badge className={getStatusColor()}>
            {getStatusText()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600 text-sm">{description}</p>
        
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Key Features:</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {memberCount && (
          <div className="text-xs text-gray-500">
            <span className="font-medium">{memberCount}</span> active members
          </div>
        )}

        {recentActivity && (
          <div className="text-xs text-gray-500">
            <span className="font-medium">Recent:</span> {recentActivity}
          </div>
        )}

        <Button 
          className="w-full mt-4" 
          onClick={() => navigate(route)}
          disabled={status === 'coming_soon'}
        >
          {status === 'coming_soon' ? 'Coming Soon' : 'Enter Gateway'}
        </Button>
      </CardContent>
    </Card>
  );
};
