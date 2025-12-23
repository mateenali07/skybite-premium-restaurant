import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await register(username, password);
        if (res.success) {
            navigate('/');
        } else {
            setError(res.error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh]">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Join SkyBite</h2>
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded font-bold hover:bg-orange-700 transition">
                        Sign Up
                    </button>
                    <p className="text-center text-sm text-gray-600 mt-4">
                        Already have an account? <Link to="/login" className="text-orange-600 font-bold">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
