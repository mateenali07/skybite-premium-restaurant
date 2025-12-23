import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ adminOnly = false }) => {
    const { user, token } = useAuth();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && user?.role !== 'admin') {
        return <div className="p-8 text-center text-red-600 font-bold">Access Denied: Admins Only</div>;
    }

    return <Outlet />;
};

export default ProtectedRoute;
