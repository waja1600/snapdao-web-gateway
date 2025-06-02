
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import { DAOProvider } from "./contexts/DAOContext";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Proposals from "./pages/Proposals";
import ProposalDetail from "./pages/ProposalDetail";
import Projects from "./pages/Projects";
import Voting from "./pages/Voting";
import Members from "./pages/Members";
import CollectiveAgreement from "./pages/CollectiveAgreement";
import Explore from "./pages/Explore";
import Arbitration from "./pages/Arbitration";
import ClientExpenses from "./pages/ClientExpenses";
import ProjectWorkflow from "./pages/ProjectWorkflow";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <DAOProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/proposals" element={<Proposals />} />
                <Route path="/proposals/:id" element={<ProposalDetail />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/voting" element={<Voting />} />
                <Route path="/members" element={<Members />} />
                <Route path="/agreement" element={<CollectiveAgreement />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/arbitration" element={<Arbitration />} />
                <Route path="/expenses" element={<ClientExpenses />} />
                <Route path="/workflow" element={<ProjectWorkflow />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </DAOProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
