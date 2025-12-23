import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import MenuPage from './components/MenuPage';
import Dashboard from './components/Dashboard';
import FloatingChatbot from './components/FloatingChatbot';
import CartDrawer from './components/CartDrawer';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/dashboard" element={<div className="p-8 flex justify-center"><Dashboard /></div>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Protected Admin Route */}
              <Route element={<ProtectedRoute adminOnly={true} />}>
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>
            </Routes>
            <CartDrawer />
            <FloatingChatbot />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  style: {
                    background: '#10B981',
                  },
                },
                error: {
                  style: {
                    background: '#EF4444',
                  },
                },
              }}
            />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
