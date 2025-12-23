import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../config';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { StripeCheckout } from './StripeCheckout';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
    const { isCartOpen, toggleCart, cart, updateQuantity, removeFromCart, total, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [status, setStatus] = useState('idle');
    const [showPayment, setShowPayment] = useState(false);

    const handleCheckout = async () => {
        try {
            const orderData = {
                items: JSON.stringify(cart.map(item => ({ id: item.id, qty: item.quantity, name: item.name }))),
                total_amount: total,
                user_detail: user ? user.username : 'Guest'
            };

            await axios.post(`${API_URL}/order`, orderData);
            setStatus('success');
            clearCart();
            setTimeout(() => {
                setStatus('idle');
                toggleCart();
                setShowPayment(false);
            }, 3000);
        } catch (error) {
            console.error("Checkout failed", error);
            setStatus('error');
        }
    };

    const handleCheckoutClick = () => {
        if (!user) {
            toggleCart();
            navigate('/login');
            return;
        }
        setShowPayment(true);
    };

    return (
        <>
            {isCartOpen && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={toggleCart}></div>

                    {/* Drawer */}
                    <div className="relative w-full max-w-md bg-white shadow-2xl h-full flex flex-col transform transition-transform duration-300 ease-in-out">

                        {/* Header */}
                        <div className="p-4 border-b flex justify-between items-center bg-orange-50">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <ShoppingBag className="text-orange-600" /> Your Cart
                            </h2>
                            <button onClick={toggleCart} className="p-2 hover:bg-orange-100 rounded-full transition-colors">
                                <X className="text-gray-600" />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-60">
                                    <ShoppingBag size={64} className="mb-4" />
                                    <p className="text-lg font-medium">Your cart is empty</p>
                                </div>
                            ) : (
                                cart.map(item => (
                                    <div key={item.id} className="flex items-center gap-4 p-3 bg-white border rounded-lg shadow-sm">
                                        <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                                            {/* Ideally real image here, using placeholder logic or color */}
                                            <div className="w-full h-full bg-orange-100 flex items-center justify-center text-orange-500 font-bold">
                                                <img src={item.image_url || 'https://placehold.co/100x100?text=Food'} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-800">{item.name}</h3>
                                            <p className="text-orange-600 font-medium">${item.price}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 text-gray-500 hover:text-red-500 bg-gray-100 rounded"><Minus size={16} /></button>
                                            <span className="font-bold w-6 text-center">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 text-gray-500 hover:text-green-500 bg-gray-100 rounded"><Plus size={16} /></button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t bg-gray-50">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-gray-600 font-medium">Total Amount</span>
                                <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
                            </div>

                            {status === 'success' ? (
                                <div className="bg-green-100 text-green-800 p-3 rounded text-center font-bold animate-pulse">
                                    🎉 Order Placed Successfully!
                                </div>
                            ) : showPayment ? (
                                <div>
                                    <button onClick={() => setShowPayment(false)} className="mb-2 text-sm text-gray-500 hover:underline">Back to Cart</button>
                                    <StripeCheckout onSuccess={handleCheckout} />
                                </div>
                            ) : (
                                <button
                                    onClick={handleCheckoutClick}
                                    disabled={cart.length === 0}
                                    className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 transition-all"
                                >
                                    Checkout Now
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CartDrawer;
