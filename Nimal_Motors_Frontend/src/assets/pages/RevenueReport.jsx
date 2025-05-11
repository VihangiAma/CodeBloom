import React, { useState, useEffect } from "react";
import axios from "axios";

const RevenueReport = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5001/api/revenueReportsNew");
        
        if (!response.data) {
          throw new Error("No data received from server");
        }
        
        if (!Array.isArray(response.data)) {
          console.warn("API response is not an array:", response.data);
          setReports([response.data]);
        } else {
          setReports(response.data);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("API Error Details:", {
          message: err.message,
          response: err.response?.data,
          stack: err.stack
        });
        setError(`Failed to load reports: ${err.message}`);
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const formatCurrency = (amount) => {
    if (isNaN(amount)) return "N/A";
    
    // Format as Sri Lankan Rupees (Rs)
    return 'Rs ' + amount.toLocaleString('en-LK', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-4 text-gray-700">Loading revenue reports...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border-l-4 border-red-500 text-red-700">
        <p className="font-bold">Error Loading Data</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        
      </div>

      {reports.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No revenue reports found</p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-600">
              <tr>
                {["Section ID", "Section Name", "Amount (Rs)"].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((report, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">
                    {report.SectionId || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">
                    {report.SectionName || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700 font-medium">
                    {formatCurrency(report.amount) || "N/A"}
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

export default RevenueReport;