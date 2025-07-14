import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function CompletedBodyshopHistory() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5001/api/bodyshop/completed", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (error) {
        console.error("Error loading history:", error);
      }
    };

    fetchBookings();
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Completed Bodyshop Service History", 14, 15);
    const tableData = bookings.map((b, index) => [
      index + 1,
      b.serviceID,
      b.customerName,
      b.vehicleType,
      b.vehicleNumber,
      b.serviceDate?.split("T")[0],
      b.presentMeter,
      b.contact.phone,
    ]);

    doc.autoTable({
      startY: 20,
      head: [["#", "Service ID", "Name", "Type", "Number", "Date", "Meter", "Phone"]],
      body: tableData,
    });

    doc.save("Bodyshop_Service_History.pdf");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Completed Bodyshop Services</h2>

      <button
        onClick={downloadPDF}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Download PDF
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border">
          <thead className="bg-gray-200">
            <tr>
              <th>#</th>
              <th>Service ID</th>
              <th>Name</th>
              <th>Vehicle Type</th>
              <th>Vehicle No</th>
              <th>Date</th>
              <th>Meter</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, i) => (
              <tr key={b._id} className="text-center border-t">
                <td>{i + 1}</td>
                <td>{b.serviceID}</td>
                <td>{b.customerName}</td>
                <td>{b.vehicleType}</td>
                <td>{b.vehicleNumber}</td>
                <td>{new Date(b.serviceDate).toLocaleDateString()}</td>
                <td>{b.presentMeter}</td>
                <td>{b.contact.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
