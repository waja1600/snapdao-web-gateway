
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useDAO } from '@/contexts/DAOContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, FileText, Clock, AlertCircle, CheckCircle, Users, Plus, Eye, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

interface Dispute {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'in_review' | 'under_arbitration' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  amount: number;
  currency: string;
  plaintiff: string;
  defendant: string;
  arbitrator?: string;
  createdAt: string;
  updatedAt: string;
  deadline?: string;
  evidence: string[];
  messages: number;
}

const mockDisputes: Dispute[] = [
  {
    id: '1',
    title: 'Contract Breach - Software Development',
    description: 'Developer failed to deliver project within agreed timeline and specifications',
    category: 'Contract Dispute',
    status: 'under_arbitration',
    priority: 'high',
    amount: 25000,
    currency: 'USD',
    plaintiff: 'TechCorp Inc.',
    defendant: 'DevStudio Pro',
    arbitrator: 'John Smith (Certified Arbitrator)',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
    deadline: '2024-02-15',
    evidence: ['contract.pdf', 'screenshots.zip', 'communications.pdf'],
    messages: 12
  },
  {
    id: '2',
    title: 'Payment Dispute - Consulting Services',
    description: 'Client refusing to pay final invoice despite completed deliverables',
    category: 'Payment Dispute',
    status: 'pending',
    priority: 'medium',
    amount: 8500,
    currency: 'USD',
    plaintiff: 'ConsultPro LLC',
    defendant: 'Global Industries',
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20',
    evidence: ['invoice.pdf', 'deliverables.zip'],
    messages: 3
  },
  {
    id: '3',
    title: 'Quality Issues - Product Delivery',
    description: 'Received products do not meet the agreed specifications and quality standards',
    category: 'Quality Dispute',
    status: 'resolved',
    priority: 'low',
    amount: 15000,
    currency: 'USD',
    plaintiff: 'Retail Solutions',
    defendant: 'Manufacturing Plus',
    arbitrator: 'Sarah Johnson (Senior Arbitrator)',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-25',
    evidence: ['quality_report.pdf', 'photos.zip', 'specifications.pdf'],
    messages: 18
  }
];

const Arbitration = () => {
  const { createDispute, updateDisputeStatus } = useDAO();
  const [disputes] = useState<Dispute[]>(mockDisputes);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newDispute, setNewDispute] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    amount: '',
    currency: 'USD',
    defendant: ''
  });

  const filteredDisputes = disputes.filter(dispute => {
    const matchesSearch = dispute.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dispute.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || dispute.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_review': return 'bg-blue-100 text-blue-800';
      case 'under_arbitration': return 'bg-orange-100 text-orange-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateDispute = () => {
    if (!newDispute.title || !newDispute.description || !newDispute.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    const dispute = {
      ...newDispute,
      amount: parseFloat(newDispute.amount) || 0,
      plaintiff: 'Current User', // This would come from auth context
      createdAt: new Date().toISOString(),
      status: 'pending' as const,
      evidence: [],
      messages: 0
    };

    createDispute(dispute);
    toast.success('Dispute created successfully');
    setShowCreateForm(false);
    setNewDispute({
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      amount: '',
      currency: 'USD',
      defendant: ''
    });
  };

  const handleViewDispute = (disputeId: string) => {
    toast.info(`Opening dispute details for ${disputeId}`);
  };

  const stats = {
    total: disputes.length,
    pending: disputes.filter(d => d.status === 'pending').length,
    active: disputes.filter(d => d.status === 'under_arbitration').length,
    resolved: disputes.filter(d => d.status === 'resolved').length
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Arbitration Center</h1>
            <p className="text-gray-600 mt-2">Resolve disputes fairly and efficiently</p>
          </div>
          <Button 
            className="flex items-center gap-2"
            onClick={() => setShowCreateForm(true)}
          >
            <Plus className="h-4 w-4" />
            File New Dispute
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Disputes</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <div className="text-sm text-gray-600">Pending Review</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.active}</div>
              <div className="text-sm text-gray-600">Under Arbitration</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
              <div className="text-sm text-gray-600">Resolved</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search disputes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_review">In Review</SelectItem>
                  <SelectItem value="under_arbitration">Under Arbitration</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="disputes" className="w-full">
          <TabsList>
            <TabsTrigger value="disputes">All Disputes</TabsTrigger>
            <TabsTrigger value="my-disputes">My Disputes</TabsTrigger>
            <TabsTrigger value="arbitrator">As Arbitrator</TabsTrigger>
          </TabsList>

          <TabsContent value="disputes" className="space-y-4">
            {filteredDisputes.map((dispute) => (
              <Card key={dispute.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{dispute.title}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(dispute.status)}>
                          {dispute.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                        <Badge className={getPriorityColor(dispute.priority)}>
                          {dispute.priority.toUpperCase()}
                        </Badge>
                        <span className="text-sm text-gray-600">
                          {dispute.currency} {dispute.amount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <div>Created: {new Date(dispute.createdAt).toLocaleDateString()}</div>
                      {dispute.deadline && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Deadline: {new Date(dispute.deadline).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">{dispute.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm">
                        <span className="font-medium">Plaintiff: </span>
                        <span>{dispute.plaintiff}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Defendant: </span>
                        <span>{dispute.defendant}</span>
                      </div>
                      {dispute.arbitrator && (
                        <div className="text-sm">
                          <span className="font-medium">Arbitrator: </span>
                          <span>{dispute.arbitrator}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-sm">
                        <span className="font-medium">Category: </span>
                        <span>{dispute.category}</span>
                      </div>
                      <div className="text-sm flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        <span>{dispute.evidence.length} evidence files</span>
                      </div>
                      <div className="text-sm flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{dispute.messages} messages</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <div className="text-sm text-gray-600">
                      Last updated: {new Date(dispute.updatedAt).toLocaleDateString()}
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => handleViewDispute(dispute.id)}
                      className="flex items-center gap-1"
                    >
                      <Eye className="h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="my-disputes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Disputes</CardTitle>
                <p className="text-gray-600">Disputes where you are involved as plaintiff or defendant</p>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No disputes found</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Disputes where you are listed as plaintiff or defendant will appear here
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="arbitrator" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Arbitration Cases</CardTitle>
                <p className="text-gray-600">Cases assigned to you as an arbitrator</p>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No arbitration cases assigned</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Cases where you serve as arbitrator will appear here
                  </p>
                  <Button variant="outline" className="mt-4">
                    Apply to Become Arbitrator
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Create Dispute Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>File New Dispute</CardTitle>
                <p className="text-gray-600">Provide details about your dispute</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Dispute Title *</label>
                  <Input
                    value={newDispute.title}
                    onChange={(e) => setNewDispute({...newDispute, title: e.target.value})}
                    placeholder="Brief description of the dispute"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Category *</label>
                  <Select value={newDispute.category} onValueChange={(value) => setNewDispute({...newDispute, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select dispute category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contract">Contract Dispute</SelectItem>
                      <SelectItem value="payment">Payment Dispute</SelectItem>
                      <SelectItem value="quality">Quality Issues</SelectItem>
                      <SelectItem value="delivery">Delivery Issues</SelectItem>
                      <SelectItem value="intellectual_property">Intellectual Property</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Defendant *</label>
                  <Input
                    value={newDispute.defendant}
                    onChange={(e) => setNewDispute({...newDispute, defendant: e.target.value})}
                    placeholder="Name of the other party"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Priority</label>
                    <Select value={newDispute.priority} onValueChange={(value) => setNewDispute({...newDispute, priority: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Dispute Amount</label>
                    <div className="flex gap-2">
                      <Select value={newDispute.currency} onValueChange={(value) => setNewDispute({...newDispute, currency: value})}>
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        type="number"
                        value={newDispute.amount}
                        onChange={(e) => setNewDispute({...newDispute, amount: e.target.value})}
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description *</label>
                  <Textarea
                    value={newDispute.description}
                    onChange={(e) => setNewDispute({...newDispute, description: e.target.value})}
                    placeholder="Provide detailed description of the dispute, including timeline and relevant facts"
                    rows={4}
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowCreateForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateDispute}>
                    File Dispute
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Arbitration;
