
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ProtectedRoute } from '@/components/navigation/ProtectedRoute';

import Index from '@/pages/Index';
import Dashboard from '@/pages/Dashboard';
import UserProfile from '@/pages/UserProfile';
import Gpos from '@/pages/GPOPlatform';
import GroupRoom from '@/pages/GroupRoom';
import Suppliers from '@/pages/Suppliers';
import Freelancers from '@/pages/Freelancers';
import InvestmentGateway from '@/pages/InvestmentGateway';
import InvestmentGroups from '@/pages/InvestmentGroups';
import MyWallet from '@/pages/MyWallet';
import KYCVerification from '@/pages/KYCVerification';
import MCPExamPage from '@/pages/MCPExamPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <Toaster />
          <ErrorBoundary>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
                <Route path="/gpos" element={<ProtectedRoute><Gpos /></ProtectedRoute>} />
                <Route path="/group-room" element={<ProtectedRoute><GroupRoom /></ProtectedRoute>} />
                <Route path="/suppliers" element={<ProtectedRoute><Suppliers /></ProtectedRoute>} />
                <Route path="/freelancers" element={<ProtectedRoute><Freelancers /></ProtectedRoute>} />
                <Route path="/investment-gateway" element={<ProtectedRoute><InvestmentGateway /></ProtectedRoute>} />
                <Route path="/investment-groups" element={<ProtectedRoute><InvestmentGroups /></ProtectedRoute>} />
                <Route path="/my-wallet" element={<ProtectedRoute><MyWallet /></ProtectedRoute>} />
                <Route path="/kyc-verification" element={<ProtectedRoute><KYCVerification /></ProtectedRoute>} />
                <Route path="/mcp-exam" element={<ProtectedRoute><MCPExamPage /></ProtectedRoute>} />
              </Routes>
            </BrowserRouter>
          </ErrorBoundary>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
