import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import Proposals from "@/pages/Proposals";
import ProposalDetail from "@/pages/ProposalDetail";
import Projects from "@/pages/Projects";
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

// New Gateway Pages
import GroupBuying from "@/pages/GroupBuying";
import CooperativeMarketing from "@/pages/CooperativeMarketing";
import CompanyIncorporation from "@/pages/CompanyIncorporation";
import SuppliersFreelancers from "@/pages/SuppliersFreelancers";

// New Management Pages
import Invoices from "@/pages/Invoices";
import FreelancerManagement from "@/pages/FreelancerManagement";

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <DAOProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create-group" element={<CreateGroup />} />
              <Route path="/groups" element={<MyGroups />} />
              <Route path="/group-room/:id" element={<GroupRoom />} />
              <Route path="/supplier-offer/:groupId" element={<SupplierOffer />} />
              <Route path="/freelancer-offer/:groupId" element={<FreelancerOffer />} />
              <Route path="/proposals" element={<Proposals />} />
              <Route path="/proposals/:id" element={<ProposalDetail />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/project-management" element={<ProjectManagement />} />
              <Route path="/deals" element={<ActiveDeals />} />
              <Route path="/deals/:id" element={<DealDetail />} />
              <Route path="/members" element={<Members />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/arbitration" element={<Arbitration />} />
              <Route path="/expenses" element={<ClientExpenses />} />
              <Route path="/voting" element={<Voting />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/project-workflow" element={<ProjectWorkflow />} />
              <Route path="/collective-agreement" element={<CollectiveAgreement />} />
              <Route path="/contract/:id" element={<ContractPage />} />
              
              {/* Gateway Routes */}
              <Route path="/group-buying" element={<GroupBuying />} />
              <Route path="/cooperative-marketing" element={<CooperativeMarketing />} />
              <Route path="/company-incorporation" element={<CompanyIncorporation />} />
              <Route path="/suppliers-freelancers" element={<SuppliersFreelancers />} />
              
              {/* Management Routes */}
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/freelancer-management" element={<FreelancerManagement />} />
              
              {/* GPO Platform - Main Hub */}
              <Route path="/gpo-platform" element={<GPOPlatform />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
          <Toaster />
        </DAOProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
