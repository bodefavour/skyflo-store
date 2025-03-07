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
      {/* Left Icons */}
      <div className="flex items-center gap-4">
        <SearchIcon className="w-6 h-6 cursor-pointer text-white" />
        <ShoppingBagIcon className="w-6 h-6 cursor-pointer text-white" />
      </div>

      {/* Brand Logo */}
      <h1 className="text-3xl font-phudu tracking-wider uppercase">Skyflo</h1>

      {/* Right - Menu Icon */}
      <button onClick={() => setMenuOpen(true)} className="focus:outline-none">
        <MenuIcon className="w-6 h-6 text-white" />
      </button>

      {/* Full-screen Menu Popup Overlay */}
      {menuOpen && (
        <div className="absolute inset-0 z-40 bg-white flex flex-col justify-center items-center space-y-6">
          {/* Close Button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-4 focus:outline-none"
          >
            <XIcon className="w-8 h-8 text-black" />
          </button>

          {/* Menu Items */}
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-4xl font-phudu uppercase tracking-widest transition-transform duration-300 hover:scale-105 text-black"
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
