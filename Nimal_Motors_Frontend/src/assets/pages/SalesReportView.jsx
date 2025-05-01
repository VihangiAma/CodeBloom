import React, { useEffect, useState } from "react";
import axios from "axios";

const SalesReportView = () => {
  const [salesReports, setSalesReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch sales reports from the backend
    axios
      .get("http://localhost:5000/api/SalesReports")
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
   
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">All Sales Reports</h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading sales data...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
<<<<<<< Updated upstream
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
=======
          <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-600">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Item ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Item Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Net Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Profit
                  </th>
>>>>>>> Stashed changes
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {salesReports.length > 0 ? (
<<<<<<< Updated upstream
                  salesReports.map((report) => (
                    <tr key={report.itemId} className="text-center">
                      <td className="border border-gray-300 p-3">{report.itemId}</td>
                      <td className="border border-gray-300 p-3">{report.itemName}</td>
                      <td className="border border-gray-300 p-3">Rs{report.price}</td>
                      <td className="border border-gray-300 p-3">Rs{report.net_price_for_item}</td>
                      <td className="border border-gray-300 p-3">{report.Sales_Quntity}</td>
                      <td className="border border-gray-300 p-3">{report.profite}</td>
                    </tr>
                  ))
=======
                  salesReports.map((report) => {
                    const profit = report.net_price_for_item * report.Sales_Quntity;

                    return (
                      <tr key={report.itemId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {report.itemId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {report.itemName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          Rs {report.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          Rs {report.net_price_for_item}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {report.Sales_Quntity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          Rs {profit.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })
>>>>>>> Stashed changes
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-sm text-center text-gray-500">
                      No sales reports available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
   
  );
};

export default SalesReportView;