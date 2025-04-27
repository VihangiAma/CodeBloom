import React, { useEffect, useState } from "react";

const NotificationBar = () => {
  const [notifications, setNotifications] = useState({
    appointments: 0,
    servicesAvailable: 0,
    unreadMessages: 0,
  });

  // Simulate real-time updates (Replace with API calls)
  useEffect(() => {
    const fetchNotifications = () => {
      // Replace this with actual API calls
      setNotifications({
        appointments: Math.floor(Math.random() * 10), // Example dynamic count
        servicesAvailable: Math.floor(Math.random() * 5),
        unreadMessages: Math.floor(Math.random() * 15),
      });
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000); // Refresh every 5 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
      <span>📅 Appointments: {notifications.appointments}</span>
      <span>🛠️ Services Available: {notifications.servicesAvailable}</span>
      <span>📩 Unread Messages: {notifications.unreadMessages}</span>
    </div>
  );
};

export default NotificationBar;
