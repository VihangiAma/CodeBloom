import React from "react";

const DashboardCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg flex items-center space-x-4">
      <div className={`p-3 rounded-full ${color}`}>
        {icon}
      </div>
      <div>
        <h4 className="text-gray-500 text-sm">{title}</h4>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
