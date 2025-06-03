
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import { DAOProvider } from "./contexts/DAOContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyGroups from "./pages/MyGroups";
import CreateGroup from "./pages/CreateGroup";
import GroupRoom from "./pages/GroupRoom";
import ServiceLanding from "./pages/ServiceLanding";
import SupplierOffer from "./pages/SupplierOffer";
import FreelancerOffer from "./pages/FreelancerOffer";
import Voting from "./pages/Voting";
import ProjectManagement from "./pages/ProjectManagement";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <DAOProvider>
            <Router>
              <div className="min-h-screen">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/groups" element={<MyGroups />} />
                  <Route path="/create-group" element={<CreateGroup />} />
                  <Route path="/group-room/:id" element={<GroupRoom />} />
                  <Route path="/group-details/:id" element={<Navigate to="/group-room/:id" replace />} />
                  
                  {/* Project Management */}
                  <Route path="/project-management" element={<ProjectManagement />} />
                  <Route path="/projects" element={<Navigate to="/project-management" replace />} />
                  
                  {/* Service Landing Pages */}
                  <Route path="/cooperative-buying" element={<ServiceLanding />} />
                  <Route path="/cooperative-marketing" element={<ServiceLanding />} />
                  <Route path="/freelancers" element={<ServiceLanding />} />
                  <Route path="/suppliers" element={<ServiceLanding />} />
                  
                  {/* Offer Pages */}
                  <Route path="/supplier-offer/:id" element={<SupplierOffer />} />
                  <Route path="/freelancer-offer/:id" element={<FreelancerOffer />} />
                  
                  {/* Voting */}
                  <Route path="/voting" element={<Voting />} />
                  <Route path="/voting/:groupId" element={<Voting />} />
                  
                  {/* Catch all route */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
              <Toaster position="top-center" />
            </Router>
          </DAOProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
