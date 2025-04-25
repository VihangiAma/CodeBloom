import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { CalendarDays, Users, Wrench, DollarSign, Bell, Settings } from 'lucide-react';

export default function AdminDashboard() {
  const chartData = [
    { name: 'Week 1', services: 10 },
    { name: 'Week 2', services: 14 },
    { name: 'Week 3', services: 6 },
    { name: 'Week 4', services: 8 },
  ];

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-blue-50 to-white min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl shadow-lg bg-white">
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Monthly Service Summary</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="services" fill="#3b82f6" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl shadow-lg bg-white">
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                <Users className="inline-block mr-2" /> ➕ Add New User
              </button>
              <button className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600">
                <CalendarDays className="inline-block mr-2" /> 📅 Schedule Appointment
              </button>
              <button className="w-full py-2 px-4 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
                <Wrench className="inline-block mr-2" /> 🚗 Register Vehicle
              </button>
              <button className="w-full py-2 px-4 bg-purple-500 text-white rounded-md hover:bg-purple-600">
                <DollarSign className="inline-block mr-2" /> 🛠 Assign Job
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Notifications */}
        <div className="rounded-2xl shadow-lg bg-white">
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Notifications</h2>
            <ul className="text-sm text-gray-600 list-disc pl-5 space-y-2">
              <li>5 parts low in inventory</li>
              <li>3 overdue payments</li>
              <li>2 appointments need confirmation</li>
            </ul>
          </div>
        </div>

        {/* Finance Overview */}
        <div className="rounded-2xl shadow-lg bg-white">
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Finance Overview</h2>
            <ul className="text-sm text-gray-600 list-disc pl-5 space-y-2">
              <li>Total Revenue: $14,300</li>
              <li>Collected Payments: $12,000</li>
              <li>Pending Invoices: $2,300</li>
            </ul>
          </div>
        </div>

        {/* System Settings */}
        <div className="rounded-2xl shadow-lg bg-white">
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">System Settings</h2>
            <div className="text-sm text-gray-600 space-y-2">
              <p>⏰ Working Hours: 9AM - 6PM</p>
              <p>🛠 Service Types: Basic, Premium, Emergency</p>
              <p>💰 Tax: 8%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="rounded-2xl shadow-lg bg-white p-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
          <ul className="text-sm text-gray-600 list-disc pl-5 space-y-2">
            <li>User John Doe updated profile</li>
            <li>Vehicle registration for BMW completed</li>
            <li>New service request for vehicle inspection</li>
          </ul>
        </div>

        <div className="rounded-2xl shadow-lg bg-white p-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Upcoming Appointments</h2>
          <ul className="text-sm text-gray-600 list-disc pl-5 space-y-2">
            <li>09:30 AM - Oil Change for Ford Mustang</li>
            <li>11:00 AM - Tire Replacement for Toyota Corolla</li>
            <li>02:00 PM - Brake Inspection for Honda Civic</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
