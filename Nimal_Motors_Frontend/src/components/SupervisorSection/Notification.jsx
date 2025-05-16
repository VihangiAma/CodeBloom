import React, { useEffect, useState } from "react";
import axios from "axios";

const NotificationBar = () => {
  const [notifications, setNotifications] = useState({
    appointments: 0,
    servicesAvailable: 0,
    unreadMessages: 0,
    bodyShopPending: 0,
    mechanicalPending: 0,
    electricalPending: 0,
    allPendingAppointments: 0,
    allAppointments: [],
  });

  // Fetching notifications from multiple APIs
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Fetch all appointments (pending)
        const allappointmentsResponse = await axios.get("http://localhost:5001/api/appointments/all"); // Replace with actual endpoint
        const allAppointments = allappointmentsResponse.data;
        const pendingAppointments = allAppointments.filter(appointment => appointment.status === 'pending');

        // Fetch pending services
        const servicesResponse = await axios.get("/api/services/pending");
        const pendingServices = servicesResponse.data.length;

        // Fetch unread messages
        const messagesResponse = await axios.get("/api/messages/unread");
        const unreadMessages = messagesResponse.data.length;

        // Fetch pending appointments by section (BodyShop, Mechanical, Electrical)
        const bodyShopResponse = await axios.get("http://localhost:5001/api/appointments/bodyShop");
        const bodyShopPending = bodyShopResponse.data.length;

        const mechanicalResponse = await axios.get("http://localhost:5001/api/appointments/mechanical");
        const mechanicalPending = mechanicalResponse.data.length;

        const electricalResponse = await axios.get("http://localhost:5001/api/appointments/electrical");
        const electricalPending = electricalResponse.data.length;

        setNotifications({
          appointments: pendingAppointments.length,
          servicesAvailable: pendingServices,
          unreadMessages: unreadMessages,
          bodyShopPending: bodyShopPending,
          mechanicalPending: mechanicalPending,
          electricalPending: electricalPending,
          allPendingAppointments: pendingAppointments.length,
          allAppointments: allAppointments,
        });
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000); // Refresh every 5 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full p-4 bg-blue-700 text-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center space-x-6">
        {/* Appointments Notification */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl">📅</span>
          <div className="font-semibold text-lg">Appointments</div>
          <div className="text-xl font-bold">{notifications.appointments}</div>
        </div>

        {/* Services Notification */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🛠️</span>
          <div className="font-semibold text-lg">Services Available</div>
          <div className="text-xl font-bold">{notifications.servicesAvailable}</div>
        </div>

        {/* Unread Messages */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl">📩</span>
          <div className="font-semibold text-lg">Unread Messages</div>
          <div className="text-xl font-bold">{notifications.unreadMessages}</div>
        </div>
      </div>

      {/* Section-specific Pending Appointments */}
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <span className="text-lg">BodyShop Pending</span>
          <span className="text-xl font-bold">{notifications.bodyShopPending}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-lg">Mechanical Pending</span>
          <span className="text-xl font-bold">{notifications.mechanicalPending}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-lg">Electrical Pending</span>
          <span className="text-xl font-bold">{notifications.electricalPending}</span>
        </div>
      </div>

      {/* All Appointments Section */}
      <div className="mt-4">
        <h3 className="font-semibold text-lg">All Pending Appointments</h3>
        {notifications.allAppointments.map((appointment, index) => (
          <div key={index} className="flex justify-between items-center mt-2">
            <span>{appointment.customerName} - {appointment.vehicleNumber}</span>
            <span className="text-xl font-bold">{appointment.serviceDate}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationBar;
