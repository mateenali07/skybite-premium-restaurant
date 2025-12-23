import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import API_URL from '../config';
import { Plus, Search, Filter } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const MenuPage = () => {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const { addToCart } = useCart();

    useEffect(() => {
        setLoading(true);
        axios.get(`${API_URL}/menu`)
            .then(res => {
                setMenu(res.data.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                toast.error('Failed to load menu');
                setLoading(false);
            });
    }, []);

    const categories = ['All', ...new Set(menu.map(item => item.category))];

    const filteredMenu = menu.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleAddToCart = (item) => {
        addToCart(item);
        toast.success(`${item.name} added to cart!`);
    };

    const SkeletonCard = () => (
        <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-6">
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="flex justify-between items-center">
                    <div className="h-8 w-16 bg-gray-200 rounded"></div>
                    <div className="h-10 w-20 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-black text-gray-900 mb-4">
                        Our <span className="gradient-text">Menu</span>
                    </h1>
                    <p className="text-xl text-gray-600">Delicious dishes crafted with passion</p>
                </motion.div>

                {/* Search and Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8 space-y-4"
                >
                    {/* Search Bar */}
                    <div className="relative max-w-md mx-auto">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search for dishes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex justify-center gap-3 flex-wrap">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${selectedCategory === cat
                                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg scale-105'
                                    : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Menu Items */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                ) : filteredMenu.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20"
                    >
                        <div className="text-6xl mb-4">🍽️</div>
                        <h3 className="text-2xl font-bold text-gray-700 mb-2">No dishes found</h3>
                        <p className="text-gray-500">Try adjusting your search or filter</p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredMenu.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -8 }}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col"
                            >
                                <div className="relative h-48 w-full bg-gray-200 overflow-hidden group">
                                    <img
                                        src={item.image_url}
                                        alt={item.name}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop';
                                        }}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                                    <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-2">{item.description}</p>

                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                        <span className="text-2xl font-bold gradient-text">${item.price}</span>
                                        <button
                                            onClick={() => handleAddToCart(item)}
                                            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2.5 rounded-full flex items-center gap-2 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 font-semibold"
                                        >
                                            <Plus size={18} /> Add
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MenuPage;
