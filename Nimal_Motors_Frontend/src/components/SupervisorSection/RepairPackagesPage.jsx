import React, { useEffect, useState } from "react";
import axios from "axios";

const RepairPackagesPage = () => {
  const [packages, setPackages] = useState([]);
  const [newPackageName, setNewPackageName] = useState("");
  const [newRepairText, setNewRepairText] = useState("");
  const [selectedPackageId, setSelectedPackageId] = useState(null);

  const fetchPackages = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/repair-packages");
      setPackages(res.data);
    } catch (err) {
      console.error("Error fetching packages:", err);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleAddPackage = async () => {
    if (!newPackageName.trim()) return;
    try {
      await axios.post("http://localhost:5001/api/repair-packages", {
        packageName: newPackageName,
        repairs: [],
      });
      setNewPackageName("");
      fetchPackages();
    } catch (err) {
      console.error("Error adding package:", err);
      alert("Package name might already exist.");
    }
  };

  const handleDeletePackage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?"))
      return;
    try {
      await axios.delete(`http://localhost:5001/api/repair-packages/${id}`);
      fetchPackages();
    } catch (err) {
      console.error("Error deleting package:", err);
    }
  };

  const handleAddRepair = async (pkg) => {
    if (!newRepairText.trim()) return;
    const updatedRepairs = [...pkg.repairs, newRepairText];
    try {
      await axios.put(`http://localhost:5001/api/repair-packages/${pkg._id}`, {
        packageName: pkg.packageName,
        repairs: updatedRepairs,
      });
      setNewRepairText("");
      setSelectedPackageId(null);
      fetchPackages();
    } catch (err) {
      console.error("Error adding repair:", err);
    }
  };

  const handleDeleteRepair = async (pkg, index) => {
    const updatedRepairs = pkg.repairs.filter((_, i) => i !== index);
    try {
      await axios.put(`http://localhost:5001/api/repair-packages/${pkg._id}`, {
        packageName: pkg.packageName,
        repairs: updatedRepairs,
      });
      fetchPackages();
    } catch (err) {
      console.error("Error deleting repair:", err);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-red-50 to-gray-100">
      <h1 className="text-4xl font-bold text-center text-red-600 mb-10 underline underline-offset-8">
        Repair Packages
      </h1>

      <div className="overflow-x-auto bg-white shadow-xl rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-red-100">
            <tr>
              <th className="p-3 text-left text-sm font-bold text-red-800">
                Package
              </th>
              <th className="p-3 text-left text-sm font-bold text-red-800">
                Repair
              </th>
              <th className="p-3 text-center text-sm font-bold text-red-800">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {packages.map((pkg) =>
              pkg.repairs.length ? (
                pkg.repairs.map((repair, idx) => (
                  <tr key={`${pkg._id}-${idx}`} className="hover:bg-gray-50">
                    {idx === 0 ? (
                      <td
                        className="p-3 font-medium text-gray-800 align-top"
                        rowSpan={pkg.repairs.length}
                      >
                        <div className="flex justify-between items-start">
                          <span>{pkg.packageName}</span>
                          <button
                            onClick={() => handleDeletePackage(pkg._id)}
                            className="ml-2 text-xs text-red-500 hover:text-red-700 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    ) : null}
                    <td className="p-3 text-gray-700">{repair}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleDeleteRepair(pkg, idx)}
                        className="text-xs text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr key={pkg._id}>
                  <td className="p-3 font-medium text-gray-800">
                    {pkg.packageName}
                  </td>
                  <td className="p-3 italic text-gray-500">(no repairs)</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDeletePackage(pkg._id)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Add Repair */}
      {selectedPackageId && (
        <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center">
          <input
            type="text"
            value={newRepairText}
            onChange={(e) => setNewRepairText(e.target.value)}
            className="flex-grow p-2 border rounded shadow-sm"
            placeholder="Enter new repair"
          />
          <button
            onClick={() =>
              handleAddRepair(packages.find((p) => p._id === selectedPackageId))
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          >
            Add
          </button>
          <button
            onClick={() => {
              setSelectedPackageId(null);
              setNewRepairText("");
            }}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded shadow"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Select package to add repair */}
      {!selectedPackageId && (
        <div className="mt-6">
          <label className="mr-2 text-sm font-medium">Add repair to:</label>
          <select
            value=""
            onChange={(e) => setSelectedPackageId(e.target.value)}
            className="p-2 border rounded shadow-sm"
          >
            <option value="" disabled>
              Select package
            </option>
            {packages.map((pkg) => (
              <option key={pkg._id} value={pkg._id}>
                {pkg.packageName}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Add Package */}
      <div className="mt-10 border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Add New Package
        </h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={newPackageName}
            onChange={(e) => setNewPackageName(e.target.value)}
            placeholder="New package name"
            className="p-2 border rounded shadow-sm flex-grow"
          />
          <button
            onClick={handleAddPackage}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
          >
            Add Package
          </button>
        </div>

        <button
          onClick={() =>
            (window.location.href = "/service-supervisor-dashboard")
          }
          className="mt-6 inline-block bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded shadow"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default RepairPackagesPage;
