import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            // Optionally fetch user profile here if not stored
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    const login = async (username, password) => {
        try {
            const res = await axios.post(`${API_URL}/login`, { username, password });
            setToken(res.data.token);
            setUser(res.data.user);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.response?.data?.error || "Login failed" };
        }
    };

    const register = async (username, password) => {
        try {
            const res = await axios.post(`${API_URL}/register`, { username, password });
            setToken(res.data.token);
            setUser(res.data.user);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.response?.data?.error || "Registration failed" };
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
