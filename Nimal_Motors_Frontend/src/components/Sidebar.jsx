import { FaBoxes, FaChartLine, FaShoppingCart, FaWarehouse } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-blue-900 text-white p-5">
      <h1 className="text-2xl font-bold mb-6">Nimal Motors</h1>
      <ul>
        <li className="mb-4 flex items-center cursor-pointer">
          <FaChartLine className="mr-3" /> Dashboard
        </li>
        <li className="mb-4 flex items-center cursor-pointer">
          <FaBoxes className="mr-3" /> Inventory
        </li>
        <li className="mb-4 flex items-center cursor-pointer">
          <FaShoppingCart className="mr-3" /> Orders
        </li>
        <li className="flex items-center cursor-pointer">
          <FaWarehouse className="mr-3" /> Suppliers
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
