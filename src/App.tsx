import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import { motion, AnimatePresence } from 'motion/react';

function ProtectedRoute({ children, requireOnboarded = true }: { children: React.ReactNode, requireOnboarded?: boolean }) {
  const { user, userData, loading } = useAuth();
  
  if (loading) return <div className="flex items-center justify-center h-screen bg-neutral-50">
    <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
  </div>;

  if (!user) return <Navigate to="/login" />;
  
  if (requireOnboarded && userData && !userData.onboarded) {
    return <Navigate to="/onboarding" />;
  }

  if (!requireOnboarded && userData && userData.onboarded) {
      return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
}

function AppContent() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/onboarding" element={
          <ProtectedRoute requireOnboarded={false}>
            <Onboarding />
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
          <AppContent />
        </div>
      </AuthProvider>
    </Router>
  );
}
