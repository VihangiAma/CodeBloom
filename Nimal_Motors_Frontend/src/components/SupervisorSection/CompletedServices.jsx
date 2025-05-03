import React, { useEffect, useState } from "react";
import axios from "axios";

const CompletedServices = ({ sectionPrefix, section }) => {
  const [completedAppointments, setCompletedAppointments] = useState([]);

  useEffect(() => {
    fetchCompletedAppointments();
  }, [section, sectionPrefix]);

  const fetchCompletedAppointments = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/${section}`);
      const completed = response.data.filter(
        (appointment) =>
          appointment.status === "Completed" &&
          appointment.displayID.startsWith(sectionPrefix)
      );
      setCompletedAppointments(completed);
    } catch (error) {
      console.error("Error fetching completed appointments", error);
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4 capitalize">
        {section} - Completed Services
      </h2>
      {completedAppointments.length === 0 ? (
        <p className="text-gray-500">No completed services found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2">Service ID</th>
                <th className="border px-3 py-2">Customer Name</th>
                <th className="border px-3 py-2">Vehicle No</th>
                <th className="border px-3 py-2">Service Date</th>
              </tr>
            </thead>
            <tbody>
              {completedAppointments.map((appointment) => (
                <tr key={appointment._id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{appointment.displayID}</td>
                  <td className="border px-3 py-2">{appointment.customerName}</td>
                  <td className="border px-3 py-2">{appointment.vehicleNumber}</td>
                  <td className="border px-3 py-2">
                    {new Date(appointment.serviceDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CompletedServices;
