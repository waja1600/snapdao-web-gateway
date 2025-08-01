
import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { DAOProvider } from "@/contexts/DAOContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "@/pages/Index";
import EnhancedIndex from "@/pages/EnhancedIndex";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Profile from "@/pages/Profile";
import UserProfile from "@/pages/UserProfile";
import Proposals from "@/pages/Proposals";
import ProposalDetail from "@/pages/ProposalDetail";
import Voting from "@/pages/Voting";
import Projects from "@/pages/Projects";
import ProjectManagement from "@/pages/ProjectManagement";
import ProjectWorkflow from "@/pages/ProjectWorkflow";
import Members from "@/pages/Members";
import MyGroups from "@/pages/MyGroups";
import CreateGroup from "@/pages/CreateGroup";
import GroupRoom from "@/pages/GroupRoom";
import Arbitration from "@/pages/Arbitration";
import MyWallet from "@/pages/MyWallet";
import KYCVerification from "@/pages/KYCVerification";
import MCPExamPage from "@/pages/MCPExamPage";
import Freelancers from "@/pages/Freelancers";
import FreelancerOffer from "@/pages/FreelancerOffer";
import FreelancerManagement from "@/pages/FreelancerManagement";
import Suppliers from "@/pages/Suppliers";
import SupplierOffer from "@/pages/SupplierOffer";
import SuppliersFreelancers from "@/pages/SuppliersFreelancers";
import ServiceProviders from "@/pages/ServiceProviders";
import ProductListings from "@/pages/ProductListings";
import GroupBuying from "@/pages/GroupBuying";
import CooperativeMarketing from "@/pages/CooperativeMarketing";
import CompanyIncorporation from "@/pages/CompanyIncorporation";
import InvestmentGroups from "@/pages/InvestmentGroups";
import InvestmentGateway from "@/pages/InvestmentGateway";
import SmartNegotiation from "@/pages/SmartNegotiation";
import GPOPlatform from "@/pages/GPOPlatform";
import ActiveDeals from "@/pages/ActiveDeals";
import DealDetail from "@/pages/DealDetail";
import Explore from "@/pages/Explore";
import HowItWorks from "@/pages/HowItWorks";
import AboutUs from "@/pages/AboutUs";
import ContactUs from "@/pages/ContactUs";
import FAQ from "@/pages/FAQ";
import Invoices from "@/pages/Invoices";
import ClientExpenses from "@/pages/ClientExpenses";
import CollectiveAgreement from "@/pages/CollectiveAgreement";
import ContractPage from "@/pages/ContractPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    // Set page title
    document.title = "MCP Platform - Complete Business Solutions";
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Complete business platform for group purchasing, freelancing, supplier connections, and project management');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <DAOProvider>
            <TooltipProvider>
              <div className="min-h-screen bg-background">
                <Toaster />
                <BrowserRouter>
                  <Routes>
                    {/* Main Pages */}
                    <Route path="/" element={<EnhancedIndex />} />
                    <Route path="/home" element={<Index />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    
                    {/* Authentication */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                    {/* Profile & User Management */}
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/user-profile" element={<UserProfile />} />
                    <Route path="/my-wallet" element={<MyWallet />} />
                    <Route path="/kyc-verification" element={<KYCVerification />} />
                    <Route path="/mcp-exam" element={<MCPExamPage />} />
                    
                    {/* Governance & Voting */}
                    <Route path="/proposals" element={<Proposals />} />
                    <Route path="/proposals/:id" element={<ProposalDetail />} />
                    <Route path="/voting" element={<Voting />} />
                    <Route path="/arbitration" element={<Arbitration />} />
                    
                    {/* Projects & Management */}
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/project-management" element={<ProjectManagement />} />
                    <Route path="/project-workflow" element={<ProjectWorkflow />} />
                    
                    {/* Groups & Communities */}
                    <Route path="/members" element={<Members />} />
                    <Route path="/my-groups" element={<MyGroups />} />
                    <Route path="/create-group" element={<CreateGroup />} />
                    <Route path="/group-room" element={<GroupRoom />} />
                    
                    {/* Talent & Services */}
                    <Route path="/freelancers" element={<Freelancers />} />
                    <Route path="/freelancer-offer" element={<FreelancerOffer />} />
                    <Route path="/freelancer-management" element={<FreelancerManagement />} />
                    <Route path="/suppliers" element={<Suppliers />} />
                    <Route path="/supplier-offer" element={<SupplierOffer />} />
                    <Route path="/suppliers-freelancers" element={<SuppliersFreelancers />} />
                    <Route path="/service-providers" element={<ServiceProviders />} />
                    <Route path="/product-listings" element={<ProductListings />} />
                    
                    {/* Business Solutions */}
                    <Route path="/group-buying" element={<GroupBuying />} />
                    <Route path="/cooperative-buying" element={<GroupBuying />} />
                    <Route path="/cooperative-marketing" element={<CooperativeMarketing />} />
                    <Route path="/company-incorporation" element={<CompanyIncorporation />} />
                    <Route path="/investment-groups" element={<InvestmentGroups />} />
                    <Route path="/investment-gateway" element={<InvestmentGateway />} />
                    <Route path="/smart-negotiation" element={<SmartNegotiation />} />
                    <Route path="/gpo-platform" element={<GPOPlatform />} />
                    
                    {/* Deals & Marketplace */}
                    <Route path="/active-deals" element={<ActiveDeals />} />
                    <Route path="/deal/:id" element={<DealDetail />} />
                    <Route path="/explore" element={<Explore />} />
                    
                    {/* Finance & Legal */}
                    <Route path="/invoices" element={<Invoices />} />
                    <Route path="/expenses" element={<ClientExpenses />} />
                    <Route path="/collective-agreement" element={<CollectiveAgreement />} />
                    <Route path="/contract/:id" element={<ContractPage />} />
                    
                    {/* Information Pages */}
                    <Route path="/how-it-works" element={<HowItWorks />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/faq" element={<FAQ />} />
                    
                    {/* 404 Page */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </div>
            </TooltipProvider>
          </DAOProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
