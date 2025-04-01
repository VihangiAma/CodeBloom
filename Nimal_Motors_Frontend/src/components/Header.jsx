import { FaBell, FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <div className="flex justify-between p-4 bg-white shadow-md">
      <h2 className="text-xl font-semibold">Inventory Management</h2>
      <div className="flex items-center space-x-4">
        <FaBell className="text-gray-600 text-xl" />
        <FaUserCircle className="text-gray-600 text-2xl" />
      </div>
    </div>
  );
};

export default Header;
