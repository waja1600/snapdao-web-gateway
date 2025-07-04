import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import EnhancedIndex from "@/pages/EnhancedIndex";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import Proposals from "@/pages/Proposals";
import ProposalDetail from "@/pages/ProposalDetail";
import Projects from "@/pages/Projects";
import PWAInstaller from "@/components/pwa/PWAInstaller";
import QuickNavigation from "@/components/navigation/QuickNavigation";
import ActiveDeals from "@/pages/ActiveDeals";
import Members from "@/pages/Members";
import Explore from "@/pages/Explore";
import Arbitration from "@/pages/Arbitration";
import ClientExpenses from "@/pages/ClientExpenses";
import Voting from "@/pages/Voting";
import HowItWorks from "@/pages/HowItWorks";
import AboutUs from "@/pages/AboutUs";
import FAQ from "@/pages/FAQ";
import ContactUs from "@/pages/ContactUs";
import CreateGroup from "@/pages/CreateGroup";
import MyGroups from "@/pages/MyGroups";
import GroupRoom from "@/pages/GroupRoom";
import SupplierOffer from "@/pages/SupplierOffer";
import FreelancerOffer from "@/pages/FreelancerOffer";
import ProjectManagement from "@/pages/ProjectManagement";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { DAOProvider } from "@/contexts/DAOContext";
import DealDetail from "@/pages/DealDetail";
import ProjectWorkflow from "@/pages/ProjectWorkflow";
import CollectiveAgreement from "@/pages/CollectiveAgreement";
import ContractPage from "@/pages/ContractPage";
import GPOPlatform from "@/pages/GPOPlatform";
import { ProtectedRoute } from "@/components/navigation/ProtectedRoute";
import InvestmentGateway from "@/pages/InvestmentGateway";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Gateway Pages
import GroupBuying from "@/pages/GroupBuying";
import CooperativeMarketing from "@/pages/CooperativeMarketing";
import CompanyIncorporation from "@/pages/CompanyIncorporation";
import SuppliersFreelancers from "@/pages/SuppliersFreelancers";

// Management Pages
import Invoices from "@/pages/Invoices";
import FreelancerManagement from "@/pages/FreelancerManagement";

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <AuthProvider>
          <DAOProvider>
          <Router>
            <Routes>
              <Route path="/" element={<EnhancedIndex />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/create-group" element={
                <ProtectedRoute>
                  <CreateGroup />
                </ProtectedRoute>
              } />
              <Route path="/groups" element={
                <ProtectedRoute>
                  <MyGroups />
                </ProtectedRoute>
              } />
              <Route path="/group-room/:id" element={
                <ProtectedRoute>
                  <GroupRoom />
                </ProtectedRoute>
              } />
              <Route path="/supplier-offer/:groupId" element={
                <ProtectedRoute>
                  <SupplierOffer />
                </ProtectedRoute>
              } />
              <Route path="/freelancer-offer/:groupId" element={
                <ProtectedRoute>
                  <FreelancerOffer />
                </ProtectedRoute>
              } />
              <Route path="/proposals" element={
                <ProtectedRoute>
                  <Proposals />
                </ProtectedRoute>
              } />
              <Route path="/proposals/:id" element={
                <ProtectedRoute>
                  <ProposalDetail />
                </ProtectedRoute>
              } />
              <Route path="/projects" element={
                <ProtectedRoute>
                  <Projects />
                </ProtectedRoute>
              } />
              <Route path="/project-management" element={
                <ProtectedRoute>
                  <ProjectManagement />
                </ProtectedRoute>
              } />
              <Route path="/deals" element={
                <ProtectedRoute>
                  <ActiveDeals />
                </ProtectedRoute>
              } />
              <Route path="/deals/:id" element={
                <ProtectedRoute>
                  <DealDetail />
                </ProtectedRoute>
              } />
              <Route path="/members" element={
                <ProtectedRoute>
                  <Members />
                </ProtectedRoute>
              } />
              <Route path="/explore" element={
                <ProtectedRoute>
                  <Explore />
                </ProtectedRoute>
              } />
              <Route path="/arbitration" element={
                <ProtectedRoute>
                  <Arbitration />
                </ProtectedRoute>
              } />
              <Route path="/expenses" element={
                <ProtectedRoute>
                  <ClientExpenses />
                </ProtectedRoute>
              } />
              <Route path="/voting" element={
                <ProtectedRoute>
                  <Voting />
                </ProtectedRoute>
              } />
              <Route path="/project-workflow" element={
                <ProtectedRoute>
                  <ProjectWorkflow />
                </ProtectedRoute>
              } />
              <Route path="/collective-agreement" element={
                <ProtectedRoute>
                  <CollectiveAgreement />
                </ProtectedRoute>
              } />
              <Route path="/contract/:id" element={
                <ProtectedRoute>
                  <ContractPage />
                </ProtectedRoute>
              } />
              
              {/* Enhanced Gateway Routes */}
              <Route path="/cooperative-buying" element={
                <ProtectedRoute>
                  <GroupBuying />
                </ProtectedRoute>
              } />
              <Route path="/cooperative-marketing" element={
                <ProtectedRoute>
                  <CooperativeMarketing />
                </ProtectedRoute>
              } />
              <Route path="/company-formation" element={
                <ProtectedRoute>
                  <CompanyIncorporation />
                </ProtectedRoute>
              } />
              <Route path="/supplier-sourcing" element={
                <ProtectedRoute>
                  <SuppliersFreelancers />
                </ProtectedRoute>
              } />
              <Route path="/freelancer-management" element={
                <ProtectedRoute>
                  <FreelancerManagement />
                </ProtectedRoute>
              } />
              <Route path="/arbitration-ipfs" element={
                <ProtectedRoute>
                  <Arbitration />
                </ProtectedRoute>
              } />
              
              {/* Management Routes */}
              <Route path="/invoices" element={
                <ProtectedRoute>
                  <Invoices />
                </ProtectedRoute>
              } />
              
              {/* GPO Platform - Main Hub */}
              <Route path="/gpo-platform" element={
                <ProtectedRoute>
                  <GPOPlatform />
                </ProtectedRoute>
              } />
              
              {/* Investment Gateway Route - New addition */}
              <Route path="/investment-gateway" element={
                <ProtectedRoute>
                  <InvestmentGateway />
                </ProtectedRoute>
              } />
              
              {/* Public Pages */}
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<ContactUs />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
            
            <Toaster />
            
            {/* PWA Install Button */}
            <PWAInstaller />
            
            {/* Quick Navigation */}
            <QuickNavigation />
          </Router>
        </DAOProvider>
      </AuthProvider>
    </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
