import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const res = await login(username, password);
        if (res.success) {
            navigate('/');
        } else {
            setError(res.error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
            {/* Background Gradient/Pattern Fallback since Image Gen failed */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-black opacity-90 z-0"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 z-0 mix-blend-overlay"></div>

            <div className="relative z-10 bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
                <h2 className="text-4xl font-extrabold text-white mb-2 text-center tracking-tight">Welcome Back</h2>
                <p className="text-gray-300 text-center mb-8">Sign in to continue to SkyBite</p>

                {error && <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded mb-4 text-sm text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Username</label>
                        <input
                            type="text"
                            className="w-full bg-white/5 border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all placeholder-gray-500"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full bg-white/5 border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all placeholder-gray-500"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-[1.02] shadow-lg"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-center text-gray-400 text-sm">
                    Don't have an account? <Link to="/signup" className="text-orange-400 hover:text-orange-300 font-semibold underline">Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
