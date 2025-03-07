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

  // Dummy submenu items for each menu item.
  const subMenus: { [key: string]: string[] } = {
    "Gift Section": ["Birthday Gifts", "Anniversary Gifts", "Seasonal Gifts"],
    "Jewellries and Beaded Bracelets": ["Necklaces", "Rings", "Bracelets"],
    "Fashion Section": ["Clothing", "Footwear", "Accessories"],
    "Travel Section": ["Luggage", "Travel Accessories"],
    "Tote Bag Section": ["Casual Tote", "Designer Tote"],
    "Lip Gloss": ["Matte", "Shiny", "Glossy"],
    "Decor": ["Home Decor", "Office Decor"],
    "Events": ["Weddings", "Corporate", "Private Parties"],
    "Holiday Specials": ["Christmas", "New Year", "Valentine's Day"],
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-30 text-white py-4 px-6 z-70 flex justify-end">
      {/* Right Section: All Icons */}
      <div className="flex items-center space-x-4">
        <SearchIcon className="w-6 h-6 cursor-pointer text-white" />
        <ShoppingBagIcon className="w-6 h-6 cursor-pointer text-white" />
        <button onClick={() => setMenuOpen(true)} className="focus:outline-none">
          <MenuIcon className="w-6 h-6 cursor-pointer text-white" />
        </button>
      </div>

      {/* Popup Panel – appears in the upper-right corner */}
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 z-50">
          {/* Close Button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-2 right-2 focus:outline-none"
          >
            <XIcon className="w-6 h-6 text-black" />
          </button>

          {/* Menu Items List */}
          <ul className="space-y-4">
            {menuItems.map((item, index) => (
              <li key={index} className="group relative">
                <a
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-xl font-phudu uppercase tracking-wider text-black block"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
                {/* Submenu appears on hover */}
                {subMenus[item] && (
                  <div className="absolute left-full top-0 ml-2 hidden group-hover:block bg-white shadow-md p-2 rounded">
                    <ul className="space-y-2">
                      {subMenus[item].map((subItem, idx) => (
                        <li key={idx}>
                          <a
                            href={`#${subItem.toLowerCase().replace(/\s+/g, "-")}`}
                            className="text-sm font-phudu text-black uppercase"
                          >
                            {subItem}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
