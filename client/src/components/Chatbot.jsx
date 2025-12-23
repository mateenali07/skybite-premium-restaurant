import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import API_URL from '../config';
import { Send, ShoppingCart, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        {
            sender: 'bot',
            text: 'Welcome to SkyBite! 🍽️\n\nI can help you:\n• Browse our menu\n• Place orders directly\n• Track your orders\n\nTry saying "show menu" or "I want a burger"!'
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const messagesEndRef = useRef(null);
    const { addToCart } = useCart();

    useEffect(() => {
        // Load menu for quick suggestions
        axios.get(`${API_URL}/menu`)
            .then(res => setMenuItems(res.data.data))
            .catch(err => console.error(err));
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleAddToCart = (item) => {
        addToCart(item);
        toast.success(`${item.name} added to cart!`);
        setMessages(prev => [...prev, {
            sender: 'bot',
            text: `Great choice! I've added ${item.name} to your cart. 🛒\n\nWould you like anything else?`
        }]);
    };

    const clearChat = () => {
        setMessages([
            {
                sender: 'bot',
                text: 'Welcome to SkyBite! 🍽️\n\nI can help you:\n• Browse our menu\n• Place orders directly\n• Track your orders\n\nTry saying "show menu" or "I want a burger"!'
            }
        ]);
    };

    const sendMessage = async (customText) => {
        const messageText = customText || input;
        if (!messageText.trim()) return;

        const userMsg = { sender: 'user', text: messageText };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        try {
            const res = await axios.post(`${API_URL}/chat`, { message: messageText });

            setTimeout(() => {
                const botMsg = { sender: 'bot', text: res.data.response };
                setMessages(prev => [...prev, botMsg]);
                setIsTyping(false);

                // If response mentions menu items, show them
                if (res.data.response.toLowerCase().includes('menu') || res.data.response.toLowerCase().includes('available')) {
                    const featuredItems = menuItems.slice(0, 3);
                    if (featuredItems.length > 0) {
                        setMessages(prev => [...prev, {
                            sender: 'bot',
                            type: 'menu-cards',
                            items: featuredItems
                        }]);
                    }
                }
            }, 1000);
        } catch (error) {
            console.error(error);
            setIsTyping(false);
            setMessages(prev => [...prev, {
                sender: 'bot',
                text: "Sorry, I'm having trouble connecting right now. Please try again! 😔"
            }]);
        }
    };

    const quickReplies = [
        { text: 'Show Menu', icon: '📋' },
        { text: 'Popular Items', icon: '⭐' },
        { text: 'Track Order', icon: '📍' }
    ];

    return (
        <div className="flex flex-col h-[600px] w-full max-w-md rounded-2xl shadow-2xl bg-white overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-5 text-white">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <span className="text-2xl">🤖</span>
                    </div>
                    <div>
                        <div className="font-bold text-lg">SkyBite Assistant</div>
                        <div className="text-xs text-orange-100">Always here to help</div>
                    </div>
                    <button
                        onClick={clearChat}
                        className="ml-auto text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition-colors"
                    >
                        Clear
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
                <AnimatePresence>
                    {messages.map((msg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {msg.type === 'menu-cards' ? (
                                <div className="w-full space-y-2">
                                    <div className="text-sm text-gray-600 mb-2">Here are some popular items:</div>
                                    {msg.items.map(item => (
                                        <motion.div
                                            key={item.id}
                                            whileHover={{ scale: 1.02 }}
                                            className="bg-white rounded-lg shadow-md p-3 border border-gray-200"
                                        >
                                            <div className="flex gap-3">
                                                <img
                                                    src={item.image_url || 'https://placehold.co/80x80'}
                                                    alt={item.name}
                                                    className="w-16 h-16 rounded-lg object-cover"
                                                />
                                                <div className="flex-1">
                                                    <div className="font-bold text-gray-900">{item.name}</div>
                                                    <div className="text-sm text-gray-600">${item.price}</div>
                                                </div>
                                                <button
                                                    onClick={() => handleAddToCart(item)}
                                                    className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg transition-colors"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.sender === 'user'
                                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-br-none'
                                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                                    }`}>
                                    <div className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 text-gray-500 text-sm mb-4"
                    >
                        <div className="flex gap-1">
                            <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                            <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                            <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                        </div>
                        <span>SkyBite is typing...</span>
                    </motion.div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
                <div className="flex gap-2 flex-wrap">
                    {quickReplies.map((reply, i) => (
                        <button
                            key={i}
                            onClick={() => sendMessage(reply.text)}
                            className="px-3 py-1.5 bg-white border border-gray-300 rounded-full text-xs hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600 transition-colors flex items-center gap-1"
                        >
                            <span>{reply.icon}</span>
                            <span>{reply.text}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        className="flex-1 border-2 border-gray-200 px-4 py-2.5 rounded-full focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                        placeholder="Type your message..."
                    />
                    <button
                        onClick={() => sendMessage()}
                        className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 rounded-full hover:shadow-lg transition-all disabled:opacity-50"
                        disabled={!input.trim()}
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
