import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Calendar, Shield, Mail } from 'lucide-react';

const Dashboard = () => {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-500/20 p-2 rounded-lg">
                        <Shield className="w-6 h-6 text-blue-400" />
                    </div>
                    <h1 className="text-xl font-bold">SecureDashboard</h1>
                </div>
                <button
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </nav>

            <main className="container mx-auto px-6 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-xl mb-8">
                        <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
                        <p className="text-gray-400">Here's your account overview.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-green-500/20 p-3 rounded-full">
                                    <User className="w-6 h-6 text-green-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">User ID</p>
                                    <p className="text-lg font-mono">{user?.id}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-purple-500/20 p-3 rounded-full">
                                    <Mail className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Email Address</p>
                                    <p className="text-lg font-medium">{user?.email}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 md:col-span-2">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-orange-500/20 p-3 rounded-full">
                                    <Calendar className="w-6 h-6 text-orange-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Member Since</p>
                                    <p className="text-lg font-medium">
                                        {new Date(user?.created_at).toLocaleDateString(undefined, {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
