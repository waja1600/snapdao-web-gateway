import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { QueryClient } from 'react-query';

import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ProtectedRoute } from '@/components/ProtectedRoute';

import Home from '@/pages/Home';
import Profile from '@/pages/Profile';
import Gpos from '@/pages/Gpos';
import GroupRoom from '@/pages/GroupRoom';
import Suppliers from '@/pages/Suppliers';
import Freelancers from '@/pages/Freelancers';
import InvestmentGateway from '@/pages/InvestmentGateway';
import InvestmentGroups from '@/pages/InvestmentGroups';
import CreateInvestmentGroup from '@/pages/CreateInvestmentGroup';
import MyWallet from '@/pages/MyWallet';

function App() {
  return (
    <QueryClient>
      <AuthProvider>
        <LanguageProvider>
          <Toaster />
          <ErrorBoundary>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/gpos" element={<ProtectedRoute><Gpos /></ProtectedRoute>} />
                <Route path="/group-room" element={<ProtectedRoute><GroupRoom /></ProtectedRoute>} />
                <Route path="/suppliers" element={<ProtectedRoute><Suppliers /></ProtectedRoute>} />
                <Route path="/freelancers" element={<ProtectedRoute><Freelancers /></ProtectedRoute>} />
                <Route path="/investment-gateway" element={<ProtectedRoute><InvestmentGateway /></ProtectedRoute>} />
                <Route path="/investment-groups" element={<ProtectedRoute><InvestmentGroups /></ProtectedRoute>} />
                <Route path="/create-investment-group" element={<ProtectedRoute><CreateInvestmentGroup /></ProtectedRoute>} />
                <Route path="/my-wallet" element={<ProtectedRoute><MyWallet /></ProtectedRoute>} />
              </Routes>
            </BrowserRouter>
          </ErrorBoundary>
        </LanguageProvider>
      </AuthProvider>
    </QueryClient>
  );
}

export default App;
