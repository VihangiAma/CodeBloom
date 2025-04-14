import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { CalendarDays, Users, Wrench, DollarSign, Bell, Settings } from "lucide-react";

export default function AdminDashboard() {
  const overviewStats = [
    { label: "Customers", value: 120, icon: <Users className="text-blue-500" /> },
    { label: "Vehicles", value: 80, icon: <Wrench className="text-green-500" /> },
    { label: "Appointments", value: 25, icon: <CalendarDays className="text-orange-500" /> },
    { label: "Mechanics", value: 15, icon: <Users className="text-purple-500" /> },
    { label: "Revenue", value: "$14,300", icon: <DollarSign className="text-yellow-500" /> },
  ];

  const chartData = [
    { name: 'Week 1', services: 10 },
    { name: 'Week 2', services: 14 },
    { name: 'Week 3', services: 6 },
    { name: 'Week 4', services: 8 },
  ];

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-gray-100 to-white min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {overviewStats.map((item, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition rounded-2xl">
            <CardContent className="flex flex-col items-center justify-center p-4 space-y-2">
              {item.icon}
              <div className="text-lg font-semibold text-gray-700">{item.label}</div>
              <div className="text-xl font-bold text-gray-900">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Monthly Service Summary</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="services" fill="#3b82f6" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Button className="w-full">➕ Add New User</Button>
              <Button className="w-full">📅 Schedule Appointment</Button>
              <Button className="w-full">🚗 Register Vehicle</Button>
              <Button className="w-full">🛠 Assign Job</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Notifications</h2>
            <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
              <li>5 parts low in inventory</li>
              <li>3 overdue payments</li>
              <li>2 appointments need confirmation</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Finance Overview</h2>
            <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
              <li>Total Revenue: $14,300</li>
              <li>Collected Payments: $12,000</li>
              <li>Pending Invoices: $2,300</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">System Settings</h2>
            <div className="text-sm text-gray-600">
              <p>Working Hours: 9AM - 6PM</p>
              <p>Service Types: Basic, Premium, Emergency</p>
              <p>Tax: 8%</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
