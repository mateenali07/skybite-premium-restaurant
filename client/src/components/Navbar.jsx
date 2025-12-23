import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, UtensilsCrossed } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { cart, toggleCart } = useCart();
    const { user, logout } = useAuth();
    const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="flex items-center gap-2 text-orange-600 font-bold text-xl">
                        <UtensilsCrossed />
                        SkyBite
                    </Link>

                    <div className="flex items-center gap-6">
                        <Link to="/" className="text-gray-600 hover:text-orange-600 font-medium">Menu</Link>
                        {user && user.role === 'admin' && (
                            <Link to="/admin" className="text-gray-600 hover:text-orange-600 font-medium">Admin</Link>
                        )}
                        <Link to="/dashboard" className="text-gray-600 hover:text-orange-600 font-medium">Dashboard</Link>

                        <button onClick={toggleCart} className="relative p-2 text-gray-600 hover:text-orange-600">
                            <ShoppingCart />
                            {itemCount > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-orange-600 rounded-full">
                                    {itemCount}
                                </span>
                            )}
                        </button>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-semibold text-gray-800">Hi, {user.username}</span>
                                <button onClick={logout} className="text-sm text-red-600 hover:text-red-800 font-medium">Logout</button>
                            </div>
                        ) : (
                            <Link to="/login" className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-700 transition">Login</Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
