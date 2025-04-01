import { FaBoxOpen, FaExclamationTriangle, FaCheckCircle, FaTruck } from "react-icons/fa";

const StatsCards = () => {
  const stats = [
    { title: "Total Products", value: 9, icon: <FaBoxOpen className="text-green-500" /> },
    { title: "Low Stock", value: 4, icon: <FaExclamationTriangle className="text-yellow-500" /> },
    { title: "Out of Stock", value: 1, icon: <FaCheckCircle className="text-red-500" /> },
    { title: "Suppliers", value: 5, icon: <FaTruck className="text-blue-500" /> },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      {stats.map((stat, index) => (
        <div key={index} className="p-4 bg-white shadow-md rounded-lg flex items-center space-x-4">
          <div className="text-3xl">{stat.icon}</div>
          <div>
            <h3 className="text-gray-600">{stat.title}</h3>
            <p className="text-xl font-semibold">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
