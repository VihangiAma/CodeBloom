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

  const handleAddRepair = async (pkg) => {
    if (!newRepairText.trim()) return;

    const updatedRepairs = [...pkg.repairs, newRepairText];
    try {
      await axios.put(`http://localhost:5001/api/repair-packages/${pkg._id}`, {
        packageName: pkg.packageName,
        repairs: updatedRepairs,
      });
      fetchPackages();
      setNewRepairText("");
      setSelectedPackageId(null);
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

  const handleAddPackage = async () => {
    if (!newPackageName.trim()) return;
    try {
      await axios.post("http://localhost:5001/api/repair-packages", {
        packageName: newPackageName,
        repairs: [],
      });
      fetchPackages();
      setNewPackageName("");
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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Repair Packages</h1>

      <div className="space-y-8">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className="bg-white p-5 rounded shadow-md border border-gray-300"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {pkg.packageName}
              </h2>
              <button
                onClick={() => handleDeletePackage(pkg._id)}
                className="text-red-500 hover:underline text-sm"
              >
                Delete Package
              </button>
            </div>

            <ul className="list-disc ml-6 mt-2">
              {pkg.repairs.map((repair, i) => (
                <li key={i} className="flex justify-between items-center">
                  <span>{repair}</span>
                  <button
                    onClick={() => handleDeleteRepair(pkg, i)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>

            {selectedPackageId === pkg._id ? (
              <div className="flex gap-2 mt-3">
                <input
                  type="text"
                  value={newRepairText}
                  onChange={(e) => setNewRepairText(e.target.value)}
                  className="border rounded p-2 flex-grow"
                  placeholder="Enter new repair"
                />
                <button
                  onClick={() => handleAddRepair(pkg)}
                  className="bg-blue-600 text-white px-4 rounded"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setSelectedPackageId(null);
                    setNewRepairText("");
                  }}
                  className="bg-gray-400 text-white px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSelectedPackageId(pkg._id)}
                className="text-blue-600 text-sm mt-2"
              >
                Add Repair
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add New Package */}
      <div className="mt-10 border-t pt-6">
        <h3 className="text-lg font-semibold mb-2">Add New Package</h3>
        <div className="flex gap-2">
          <input
            value={newPackageName}
            onChange={(e) => setNewPackageName(e.target.value)}
            placeholder="New package name"
            className="p-2 border rounded flex-grow"
          />
          <button
            onClick={handleAddPackage}
            className="bg-green-600 text-white px-4 rounded"
          >
            Add
          </button>
        </div>
        <button
          onClick={() =>
            (window.location.href = "/service-supervisor-dashboard")
          }
          className="mt-4 bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default RepairPackagesPage;
