import React from "react";

const Sidebar = () => {
  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-5">
      <h2 className="text-lg font-bold">Inventory Management</h2>
      <ul className="mt-5 space-y-3">
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Dashboard</li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Stock</li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Suppliers</li>
      </ul>
    </div>
  );
};

export default Sidebar;
