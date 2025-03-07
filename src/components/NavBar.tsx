import React, { useState } from "react";
import { MenuIcon, XIcon, SearchIcon, ShoppingBagIcon } from "@heroicons/react/outline";

const NavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    console.log("Toggling menu:", !menuOpen);
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-90 text-white flex justify-between items-center px-6 py-4 z-50">
      {/* Left Section - Other Icons */}
      <div className="flex items-center gap-4">
        <SearchIcon className="w-6 h-6 cursor-pointer text-white" />
        <ShoppingBagIcon className="w-6 h-6 cursor-pointer text-white" />
      </div>

      {/* Center - Brand Logo */}
      <h1 className="text-3xl font-phudu tracking-wider uppercase">SKYFLO</h1>

      {/* Right Section - Menu Icon */}
      <button onClick={toggleMenu} className="focus:outline-none">
        {menuOpen ? (
          <XIcon className="w-6 h-6 text-white" />
        ) : (
          <MenuIcon className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Menu Popup */}
      {menuOpen && (
        <div className="absolute top-16 right-4 w-48 bg-black bg-opacity-90 shadow-lg rounded-lg p-4">
          <ul className="space-y-3 text-lg font-phudu">
            <li className="cursor-pointer" onClick={() => setMenuOpen(false)}>For Men</li>
            <li className="cursor-pointer" onClick={() => setMenuOpen(false)}>For Women</li>
            <li className="cursor-pointer" onClick={() => setMenuOpen(false)}>For Kids</li>
            <li className="cursor-pointer" onClick={() => setMenuOpen(false)}>Gifts</li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
