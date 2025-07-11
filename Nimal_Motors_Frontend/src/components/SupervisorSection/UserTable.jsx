import React, { useEffect, useState } from "react";

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllSections = async () => {
      try {
        const [mechRes, bodyRes, elecRes, appRes] = await Promise.all([
          fetch("http://localhost:5001/api/mechanical"),
          fetch("http://localhost:5001/api/bodyshop"),
          fetch("http://localhost:5001/api/electrical"),
          fetch("http://localhost:5001/api/appointments"),
        ]);

        const [mechData, bodyData, elecData, appData] = await Promise.all([
          mechRes.json(),
          bodyRes.json(),
          elecRes.json(),
          appRes.json(),
        ]);

        const formatData = (data, section) =>
          data.map((item) => ({
            customerName: item.customerName || "N/A",
            displayID: item.displayID || "N/A",
            contact: item.contact?.phone || item.contact || "N/A",
            vehicleNumber: item.vehicleNumber || "N/A",
            serviceDate: item.serviceDate
              ? item.serviceDate.slice(0, 10)
              : "N/A",
            section,
          }));

        const allUsers = [
          ...formatData(mechData, "Mechanical"),
          ...formatData(bodyData, "BodyShop"),
          ...formatData(elecData, "Electrical"),
          ...formatData(appData, "Appointments"),
        ];

        setUsers(allUsers);
      } catch (err) {
        console.error("Error fetching section data:", err);
      }
    };

    fetchAllSections();
  }, []);

  return (
    <div className="p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        All Customers Summary
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Customer Name</th>
              <th className="border px-4 py-2 text-left">Display ID</th>
              <th className="border px-4 py-2 text-left">Contact</th>
              <th className="border px-4 py-2 text-left">Vehicle Number</th>
              <th className="border px-4 py-2 text-left">Service Date</th>
              <th className="border px-4 py-2 text-left">Section</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  Loading or No Data Found...
                </td>
              </tr>
            ) : (
              users.map((user, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{user.customerName}</td>
                  <td className="border px-4 py-2">{user.displayID}</td>
                  <td className="border px-4 py-2">{user.contact}</td>
                  <td className="border px-4 py-2">{user.vehicleNumber}</td>
                  <td className="border px-4 py-2">{user.serviceDate}</td>
                  <td className="border px-4 py-2">{user.section}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
