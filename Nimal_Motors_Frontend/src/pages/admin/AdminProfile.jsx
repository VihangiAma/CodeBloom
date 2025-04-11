import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, logout } from '../api/userApi';

const AdminProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const data = await getProfile();
            if (data.role !== 'admin') {
                navigate('/profile');
                return;
            }
            setProfile(data);
        } catch (err) {
            setError('Failed to fetch profile');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!profile) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="text-center">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Administrator Dashboard</h3>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                            >
                                Logout
                            </button>
                        </div>

                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 mx-6" role="alert">
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}

                        <div className="border-t border-gray-200">
                            <dl>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profile.name}</dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profile.email}</dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Role</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                                            {profile.role}
                                        </span>
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        {/* Administrative Actions */}
                        <div className="px-4 py-5 sm:px-6">
                            <h4 className="text-lg font-medium text-gray-900 mb-4">Administrative Actions</h4>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                                    <i className="fas fa-users-cog mr-2"></i>
                                    Manage Users
                                </button>
                                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                                    <i className="fas fa-user-shield mr-2"></i>
                                    Role Management
                                </button>
                                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                                    <i className="fas fa-cogs mr-2"></i>
                                    System Settings
                                </button>
                                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                                    <i className="fas fa-shield-alt mr-2"></i>
                                    Security Settings
                                </button>
                            </div>
                        </div>

                        {/* Department Overview */}
                        <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
                            <h4 className="text-lg font-medium text-gray-900 mb-4">Department Overview</h4>
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                                <div className="bg-white overflow-hidden shadow rounded-lg">
                                    <div className="px-4 py-5 sm:p-6">
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Total Users
                                        </dt>
                                        <dd className="mt-1 text-3xl font-semibold text-indigo-600">124</dd>
                                    </div>
                                </div>
                                <div className="bg-white overflow-hidden shadow rounded-lg">
                                    <div className="px-4 py-5 sm:p-6">
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Active Services
                                        </dt>
                                        <dd className="mt-1 text-3xl font-semibold text-green-600">45</dd>
                                    </div>
                                </div>
                                <div className="bg-white overflow-hidden shadow rounded-lg">
                                    <div className="px-4 py-5 sm:p-6">
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            System Health
                                        </dt>
                                        <dd className="mt-1 text-3xl font-semibold text-blue-600">98%</dd>
                                    </div>
                                </div>
                                <div className="bg-white overflow-hidden shadow rounded-lg">
                                    <div className="px-4 py-5 sm:p-6">
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Pending Approvals
                                        </dt>
                                        <dd className="mt-1 text-3xl font-semibold text-yellow-600">7</dd>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* System Logs */}
                        <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
                            <h4 className="text-lg font-medium text-gray-900 mb-4">Recent System Logs</h4>
                            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                                <ul className="divide-y divide-gray-200">
                                    <li className="px-4 py-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    <i className="fas fa-user-plus text-green-500"></i>
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-900">New user registration</p>
                                                    <p className="text-sm text-gray-500">User ID: 12345</p>
                                                </div>
                                            </div>
                                            <div className="text-sm text-gray-500">5 minutes ago</div>
                                        </div>
                                    </li>
                                    <li className="px-4 py-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    <i className="fas fa-shield-alt text-yellow-500"></i>
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-900">Security alert</p>
                                                    <p className="text-sm text-gray-500">Failed login attempt</p>
                                                </div>
                                            </div>
                                            <div className="text-sm text-gray-500">15 minutes ago</div>
                                        </div>
                                    </li>
                                    <li className="px-4 py-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    <i className="fas fa-cog text-blue-500"></i>
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-900">System update</p>
                                                    <p className="text-sm text-gray-500">Version 2.0.1 deployed</p>
                                                </div>
                                            </div>
                                            <div className="text-sm text-gray-500">1 hour ago</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
