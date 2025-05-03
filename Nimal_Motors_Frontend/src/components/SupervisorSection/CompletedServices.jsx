import React, { useEffect, useState } from "react";
import axios from "axios";

const sections = ["mechanical", "electrical", "bodyshop"];

const CompletedServices = () => {
  const [completedAppointments, setCompletedAppointments] = useState([]);

  useEffect(() => {
    fetchAllCompletedAppointments();
  }, []);

  const fetchAllCompletedAppointments = async () => {
    try {
      const allData = await Promise.all(
        sections.map((section) =>
          axios.get(`http://localhost:5001/api/${section}`)
        )
      );

      const combinedCompleted = allData.flatMap((res, index) =>
        res.data
          .filter((appointment) => appointment.status === "Completed")
          .map((item) => ({
            ...item,
            section: sections[index], // Add section label to each
          }))
      );

      setCompletedAppointments(combinedCompleted);
    } catch (error) {
      console.error("Error fetching completed appointments", error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">All Completed Services</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-separate border-spacing-0">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">Section</th>
              <th className="border px-4 py-2">Service ID</th>
              <th className="border px-4 py-2">Customer Name</th>
              <th className="border px-4 py-2">Vehicle Number</th>
              <th className="border px-4 py-2">Service Date</th>
              <th className="border px-4 py-2">Phone</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {completedAppointments.map((appointment) => (
              <tr
                key={`${appointment.section}-${appointment._id}`}
                className="hover:bg-gray-100"
              >
                <td className="border px-4 py-2 capitalize">
                  {appointment.section}
                </td>
                <td className="border px-4 py-2">{appointment.displayID}</td>
                <td className="border px-4 py-2">{appointment.customerName}</td>
                <td className="border px-4 py-2">
                  {appointment.vehicleNumber}
                </td>
                <td className="border px-4 py-2">
                  {new Date(appointment.serviceDate).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  {appointment.contact?.phone || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedServices;
