
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
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
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { DAOProvider } from "@/contexts/DAOContext";
import DealDetail from "@/pages/DealDetail";
import ProjectWorkflow from "@/pages/ProjectWorkflow";
import CollectiveAgreement from "@/pages/CollectiveAgreement";
import ContractPage from "@/pages/ContractPage";

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <DAOProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/proposals" element={<Proposals />} />
              <Route path="/proposals/:id" element={<ProposalDetail />} />
              <Route path="/projects" element={<Projects />} />
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
