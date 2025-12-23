import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';
import { useAuth } from '../context/AuthContext';
import { Trash, Plus, Edit, DollarSign, ShoppingBag, TrendingUp, Package } from 'lucide-react';

const AdminDashboard = () => {
    const { user, token } = useAuth();
    const [menu, setMenu] = useState([]);
    const [orders, setOrders] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState({ name: '', category: '', price: '', description: '', image_url: '' });

    // Axios instance with Auth header
    const api = axios.create({
        baseURL: API_URL,
        headers: { Authorization: `Bearer ${token}` }
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [menuRes, ordersRes] = await Promise.all([
                api.get('/menu'),
                api.get('/orders')
            ]);
            setMenu(menuRes.data.data);
            setOrders(ordersRes.data.data || []);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            await api.delete(`/menu/${id}`);
            fetchData();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentItem.id) {
                await api.put(`/menu/${currentItem.id}`, currentItem);
            } else {
                await api.post('/menu', currentItem);
            }
            setIsEditing(false);
            setCurrentItem({ name: '', category: '', price: '', description: '', image_url: '' });
            fetchData();
        } catch (error) {
            alert("Error saving item");
        }
    };

    // Stats Calculation
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
    const totalOrders = orders.length;
    const totalItems = menu.length;

    return (
        <div className="max-w-7xl mx-auto p-8 space-y-8">

            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Dashboard</h1>
                    <p className="text-gray-500">Overview of your restaurant performance</p>
                </div>
                <button
                    onClick={() => { setIsEditing(true); setCurrentItem({}); }}
                    className="bg-orange-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-orange-700 shadow-lg transform hover:scale-105 transition-all"
                >
                    <Plus size={20} /> Add New Item
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-4 bg-green-100 text-green-600 rounded-xl">
                        <DollarSign size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
                        <h3 className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-4 bg-blue-100 text-blue-600 rounded-xl">
                        <ShoppingBag size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Total Orders</p>
                        <h3 className="text-2xl font-bold text-gray-900">{totalOrders}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-4 bg-purple-100 text-purple-600 rounded-xl">
                        <Package size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Menu Items</p>
                        <h3 className="text-2xl font-bold text-gray-900">{totalItems}</h3>
                    </div>
                </div>
            </div>

            {/* Menu Management */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h2 className="text-lg font-bold text-gray-800">Menu Inventory</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-medium">
                            <tr>
                                <th className="px-6 py-4 text-left">Product</th>
                                <th className="px-6 py-4 text-left">Category</th>
                                <th className="px-6 py-4 text-left">Price</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {menu.map(item => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-4">
                                            <img src={item.image_url || 'https://placehold.co/100?text=Food'} alt={item.name} className="h-12 w-12 rounded-lg object-cover bg-gray-100" />
                                            <div>
                                                <div className="font-bold text-gray-900">{item.name}</div>
                                                <div className="text-xs text-gray-500 truncate max-w-[200px]">{item.description}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">${item.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => { setCurrentItem(item); setIsEditing(true); }} className="text-indigo-600 hover:text-indigo-900 mr-4 p-2 hover:bg-indigo-50 rounded-full transition-colors"><Edit size={18} /></button>
                                        <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-full transition-colors"><Trash size={18} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-8 rounded-2xl w-full max-w-lg shadow-2xl transform transition-all scale-100">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">{currentItem.id ? 'Edit Item' : 'Add New Item'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Name</label>
                                    <input className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" value={currentItem.name || ''} onChange={e => setCurrentItem({ ...currentItem, name: e.target.value })} required />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Category</label>
                                    <input className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" value={currentItem.category || ''} onChange={e => setCurrentItem({ ...currentItem, category: e.target.value })} required />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Price</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-3 text-gray-400">$</span>
                                    <input type="number" step="0.01" className="w-full pl-8 p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" value={currentItem.price || ''} onChange={e => setCurrentItem({ ...currentItem, price: e.target.value })} required />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                                <textarea className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" rows="3" value={currentItem.description || ''} onChange={e => setCurrentItem({ ...currentItem, description: e.target.value })} />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Image URL</label>
                                <input className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" value={currentItem.image_url || ''} onChange={e => setCurrentItem({ ...currentItem, image_url: e.target.value })} />
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">Cancel</button>
                                <button type="submit" className="bg-orange-600 text-white px-8 py-2 rounded-lg font-bold shadow hover:bg-orange-700 transition-all">Save Item</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
