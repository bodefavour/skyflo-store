import React, { useState } from "react";
import { MenuIcon, XIcon, SearchIcon, ShoppingBagIcon } from "@heroicons/react/outline";

const NavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    "Gift Section",
    "Jewellries and Beaded Bracelets",
    "Fashion Section",
    "Travel Section",
    "Tote Bag Section",
    "Lip Gloss",
    "Decor",
    "Events",
    "Holiday Specials",
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-90 text-white py-4 px-6 flex justify-between items-center z-50">
      {/* Left Hero Icons */}
      <div className="flex items-center gap-4">
        <SearchIcon className="w-6 h-6 cursor-pointer text-white" />
        <ShoppingBagIcon className="w-6 h-6 cursor-pointer text-white" />
      </div>

      {/* Brand Logo */}
      <h1 className="text-3xl font-phudu tracking-wider uppercase">Skyflo</h1>

      {/* Menu Icon Button */}
      <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
        {menuOpen ? (
          <XIcon className="w-6 h-6 text-white" />
        ) : (
          <MenuIcon className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Full-screen Menu Popup */}
      {menuOpen && (
        <div className="absolute inset-0 z-40 bg-black bg-opacity-90 flex flex-col justify-center items-center space-y-6">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-4xl font-phudu uppercase tracking-widest transition-transform duration-300 hover:scale-105"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
