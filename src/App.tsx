import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Products } from './pages/Products';
import { Cart } from './pages/Cart';
import { Wishlist } from './pages/Wishlist';
import { CarbonReport } from './pages/CarbonReport';
import { Tips } from './pages/Tips';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Leaderboard } from './pages/Leaderboard';
import { Badges } from './pages/Badges';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <Router>
            <Routes>
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Main App Routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Products />} />
                <Route path="dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="leaderboard" element={
                  <ProtectedRoute>
                    <Leaderboard />
                  </ProtectedRoute>
                } />
                <Route path="badges" element={
                  <ProtectedRoute>
                    <Badges />
                  </ProtectedRoute>
                } />
                <Route path="cart" element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                } />
                <Route path="wishlist" element={
                  <ProtectedRoute>
                    <Wishlist />
                  </ProtectedRoute>
                } />
                <Route path="report" element={
                  <ProtectedRoute>
                    <CarbonReport />
                  </ProtectedRoute>
                } />
                <Route path="tips" element={<Tips />} />
              </Route>
            </Routes>
            
            {/* Toast Notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: 'var(--toast-bg)',
                  color: 'var(--toast-color)',
                  borderRadius: '12px',
                  padding: '16px',
                  fontSize: '14px',
                  fontWeight: '500',
                },
                success: {
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#ffffff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#ffffff',
                  },
                },
              }}
            />
          </Router>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;