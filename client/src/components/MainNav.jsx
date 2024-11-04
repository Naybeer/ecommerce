import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import logo from "../assets/logo.png";
import { ChevronDown } from "lucide-react";

function MainNav() {
  const carts = useEcomStore((s) => s.carts);
  const location = useLocation();
  const user = useEcomStore((s) => s.user);
  const logout = useEcomStore((s) => s.Logout);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-sm w-full">
      <div className="flex justify-between items-center border-orange-500 relative">
        {/* Left Side: Logo with Bouncing Effect */}
        <div className="flex items-center gap-20">
          <Link to="/">
            <img
              className="w-full h-auto max-h-[100px] object-contain animate-bounce" // Add bouncing animation
              src={logo}
              alt="EASYEAT Logo"
            />
          </Link>
        </div>

        {/* Center Links with Active Underline */}
        <div className="flex items-center gap-8 text-lg font-medium text-gray-700">
          <Link
            to="/"
            className={`relative inline-block hover:text-orange-500 border border-transparent rounded-md px-3 py-1 transition-colors duration-300 ${
              location.pathname === "/"
                ? "text-orange-500 font-bold border-orange-500"
                : "border hover:border-orange-500"
            }`}
          >
            HOME
          </Link>
          <Link
            to="/shop"
            className={`relative inline-block hover:text-orange-500 border border-transparent rounded-md px-3 py-1 transition-colors duration-300 ${
              location.pathname === "/shop"
                ? "text-orange-500 font-bold border-orange-500"
                : "border hover:border-orange-500"
            }`}
          >
            SHOP
          </Link>
          <Link
            to="/cart"
            className={`relative inline-block hover:text-orange-500 border border-transparent rounded-md px-3 py-1 transition-colors duration-300 ${
              location.pathname === "/cart"
                ? "text-orange-500 font-bold border-orange-500"
                : "border hover:border-orange-500"
            }`}
          >
            CART
            {carts.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full px-2 text-xs font-bold">
                {carts.length}
              </span>
            )}
          </Link>
        </div>

        {/* Conditional Rendering based on user login status */}
        {user ? (
          <div className="relative flex items-center gap-4 mr-4">
            <button
              onClick={toggleDropdown}
              className={`flex items-center gap-2 hover:bg-gray-200 px-2 py-3 rounded-md transition-all duration-200 ${isOpen ? 'shadow-lg' : 'shadow'}`}
            >
              <img
                className="w-8 h-8 rounded-full border border-gray-300"
                src="https://cdn.iconscout.com/icon/free/png-256/free-ironman-icon-download-in-svg-png-gif-file-formats--marvel-logo-super-hero-earth-superhero-pack-avatars-icons-28699.png?f=webp&w=256"
                alt="Profile"
              />
              <ChevronDown className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown */}
            {isOpen && (
              <div className="absolute top-20 bg-white shadow-lg rounded-lg z-50 transition-opacity duration-200 ease-in-out opacity-100">
                <Link
                  to={"/user/history"}
                  className="block px-4 py-2 hover:bg-gray-200 transition-colors duration-200 rounded-md"
                >
                  History
                </Link>
                <button
                  onClick={() => logout()}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200 transition-colors duration-200 rounded-md"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-6 mr-5">
            <Link
              to="/register"
              className={`relative inline-block hover:bg-orange-100 hover:text-orange-500 border border-transparent rounded-md px-3 py-1 transition-all duration-300 transform hover:scale-105 shadow-md ${
                location.pathname === "/register"
                  ? "text-orange-500 font-bold border-orange-500"
                  : "border hover:border-orange-500"
              }`}
            >
              REGISTER
            </Link>
            <Link
              to="/login"
              className={`relative inline-block hover:bg-orange-100 hover:text-orange-500 border border-transparent rounded-md px-3 py-1 transition-all duration-300 transform hover:scale-105 shadow-md ${
                location.pathname === "/login"
                  ? "text-orange-500 font-bold border-orange-500"
                  : "border hover:border-orange-500"
              }`}
            >
              LOGIN
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default MainNav;
