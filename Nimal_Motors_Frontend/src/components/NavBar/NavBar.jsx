import { NavLink, useNavigate } from "react-router-dom";
import logoImage from "../../assets/images/logo.png";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center w-full p-4 bg-white">
      {/* Logo */}
      <img src={logoImage} alt="Logo" className="w-16 md:w-20 object-contain" />

      {/* Navigation Links */}
      <div className="nav-links flex justify-center">
        <ul className="flex gap-6 font-medium text-gray-800 text-sm md:text-base">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `cursor-pointer transition-colors duration-200 ${
                isActive ? "text-red-500" : "hover:text-red-400"
              }`
            }
          >
            <li>Home</li>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `cursor-pointer transition-colors duration-200 ${
                isActive ? "text-red-500" : "hover:text-red-400"
              }`
            }
          >
            <li>About</li>
          </NavLink>
          <NavLink
            to="/packages"
            className={({ isActive }) =>
              `cursor-pointer transition-colors duration-200 ${
                isActive ? "text-red-500" : "hover:text-red-400"
              }`
            }
          >
            <li>Packages</li>
          </NavLink>
          <NavLink
            to="/sections"
            className={({ isActive }) =>
              `cursor-pointer transition-colors duration-200 ${
                isActive ? "text-red-500" : "hover:text-red-400"
              }`
            }
          >
            <li>Sections</li>
          </NavLink>
        </ul>
      </div>

      {/* Right Section: Button and Icon */}
      <div className="flex items-center gap-8">
        <button
          className="cursor-pointer bg-red-500 px-4 py-2 rounded-md text-white uppercase tracking-wide font-medium text-xs md:text-sm hover:bg-red-400 transition-colors duration-200"
          onClick={() => navigate("/book-appointment", { replace: true })}
        >
          Book Now
        </button>
        <i
          className="fa-solid fa-circle-user text-2xl md:text-4xl text-gray-800 hover:text-red-400 transition-colors duration-200"
          onClick={() => navigate("/login", { replace: true })}
        ></i>
      </div>
    </header>
  );
}
