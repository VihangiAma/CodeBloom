import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, logout } from '../api/userApi';

const BodyshopSupervisorProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    const fetchProfile = async () => {
        try {
            const data = await getProfile();
            if (data.role !== 'bodyshop') {
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
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Bodyshop Supervisor Dashboard</h3>
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
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {profile.role}
                                        </span>
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        {/* Bodyshop-specific functionality */}
                        <div className="px-4 py-5 sm:px-6">
                            <h4 className="text-lg font-medium text-gray-900 mb-4">Bodyshop Actions</h4>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                                    <i className="fas fa-car mr-2"></i>
                                    View Paint Jobs
                                </button>
                                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                                    <i className="fas fa-spray-can mr-2"></i>
                                    Manage Paint Inventory
                                </button>
                                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                                    <i className="fas fa-tools mr-2"></i>
                                    Equipment Status
                                </button>
                                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                                    <i className="fas fa-calendar-alt mr-2"></i>
                                    Schedule Jobs
                                </button>
                            </div>
                        </div>

                        {/* Statistics Section */}
                        <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
                            <h4 className="text-lg font-medium text-gray-900 mb-4">Department Statistics</h4>
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                                <div className="bg-white overflow-hidden shadow rounded-lg">
                                    <div className="px-4 py-5 sm:p-6">
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Jobs in Progress
                                        </dt>
                                        <dd className="mt-1 text-3xl font-semibold text-indigo-600">12</dd>
                                    </div>
                                </div>
                                <div className="bg-white overflow-hidden shadow rounded-lg">
                                    <div className="px-4 py-5 sm:p-6">
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Completed This Week
                                        </dt>
                                        <dd className="mt-1 text-3xl font-semibold text-green-600">8</dd>
                                    </div>
                                </div>
                                <div className="bg-white overflow-hidden shadow rounded-lg">
                                    <div className="px-4 py-5 sm:p-6">
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Paint Stock Items
                                        </dt>
                                        <dd className="mt-1 text-3xl font-semibold text-yellow-600">45</dd>
                                    </div>
                                </div>
                                <div className="bg-white overflow-hidden shadow rounded-lg">
                                    <div className="px-4 py-5 sm:p-6">
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Team Members
                                        </dt>
                                        <dd className="mt-1 text-3xl font-semibold text-blue-600">6</dd>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BodyshopSupervisorProfile;
