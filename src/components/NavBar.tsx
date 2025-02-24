import React from "react";
import { SearchIcon, ShoppingBagIcon, MenuIcon } from "@heroicons/react/outline";

const NavBar: React.FC = () => {
  return (
    <nav className="absolute top-0 w-full flex items-center justify-end p-4 z-40">
      <ul className="flex space-x-4">
        <li>
          <button aria-label="Search">
            <SearchIcon className="w-6 h-6 text-white hover:text-gray-300 transition-colors" />
          </button>
        </li>
        <li>
          <button aria-label="Cart">
            <ShoppingBagIcon className="w-6 h-6 text-white hover:text-gray-300 transition-colors" />
          </button>
        </li>
        <li>
          <button aria-label="Menu">
            <MenuIcon className="w-6 h-6 text-white hover:text-gray-300 transition-colors" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
