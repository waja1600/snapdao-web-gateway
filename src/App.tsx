
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
import HowItWorks from "./pages/HowItWorks";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import FAQ from "./pages/FAQ";

// New paths for ForGPO
const newRoutes = [
  { path: "/invoices", element: <ClientExpenses /> }, // Reusing ClientExpenses for invoices
  { path: "/verification", element: <Members /> }, // Temporarily reusing Members for verification
  { path: "/notifications", element: <Proposals /> }, // Temporarily reusing Proposals for notifications
  { path: "/groups", element: <Members /> }, // Temporarily reusing Members for groups
  { path: "/cooperative-buying", element: <Projects /> }, // Temporarily reusing Projects for cooperative buying
  { path: "/freelancers", element: <Explore /> }, // Temporarily reusing Explore for freelancers
  { path: "/suppliers", element: <Explore /> }, // Temporarily reusing Explore for suppliers
  { path: "/how-it-works", element: <HowItWorks /> }, // New How It Works page
  { path: "/about", element: <AboutUs /> }, // New About Us page
  { path: "/contact", element: <ContactUs /> }, // New Contact Us page
  { path: "/faq", element: <FAQ /> }, // New FAQ page
];

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
                
                {/* Add the new routes */}
                {newRoutes.map((route) => (
                  <Route key={route.path} path={route.path} element={route.element} />
                ))}

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
