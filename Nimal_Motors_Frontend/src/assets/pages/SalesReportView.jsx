import React, { useEffect, useState } from "react";
import axios from "axios";

const SalesReportView = () => {
  const [salesReports, setSalesReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch sales reports from the backend
    axios
      .get("http://localhost:5001/api/SalesReports")
      .then((response) => {
        setSalesReports(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Error fetching sales reports:", error);
        setError("Failed to fetch sales reports.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">All Financial Details</h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading sales data...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="border border-gray-300 p-3">Item ID</th>
                  <th className="border border-gray-300 p-3">Item Name</th>
                  <th className="border border-gray-300 p-3">Price</th>
                  <th className="border border-gray-300 p-3">Net Price</th>
                  <th className="border border-gray-300 p-3">Quantity</th>
                  <th className="border border-gray-300 p-3">Profit</th>
                </tr>
              </thead>
              <tbody>
                {salesReports.length > 0 ? (
                  salesReports.map((report) => {
                    const profit = report.net_price_for_item * report.Sales_Quntity;

                    return (
                      <tr key={report.itemId} className="text-center">
                        <td className="border border-gray-300 p-3">{report.itemId}</td>
                        <td className="border border-gray-300 p-3">{report.itemName}</td>
                        <td className="border border-gray-300 p-3">Rs {report.price}</td>
                        <td className="border border-gray-300 p-3">Rs {report.net_price_for_item}</td>
                        <td className="border border-gray-300 p-3">{report.Sales_Quntity}</td>
                        <td className="border border-gray-300 p-3">Rs {profit.toFixed(2)}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-gray-500 p-4">
                      No sales reports available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesReportView;
