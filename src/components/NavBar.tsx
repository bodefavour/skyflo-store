import React, { useState } from "react";
import { MenuIcon, XIcon, SearchIcon, ShoppingBagIcon, ArrowLeftIcon } from "@heroicons/react/outline";

const NavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

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
  const subMenus: { [key: string]: { name: string; image: string }[] } = {
    "Gift Section": [
      { name: "Birthday Gifts", image: "/images/birthday.jpg" },
      { name: "Anniversary Gifts", image: "/images/anniversary.jpg" },
      { name: "Seasonal Gifts", image: "/images/seasonal.jpg" },
    ],
    "Jewellries and Beaded Bracelets": [
      { name: "Necklaces", image: "/images/necklace.jpg" },
      { name: "Rings", image: "/images/rings.jpg" },
      { name: "Bracelets", image: "/images/bracelets.jpg" },
    ],
    "Fashion Section": [
      { name: "Clothing", image: "/images/clothing.jpg" },
      { name: "Footwear", image: "/images/footwear.jpg" },
      { name: "Accessories", image: "/images/accessories.jpg" },
    ],
    // Add images for the other categories...
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-90 text-white py-4 px-6 z-50 flex justify-end">
      {/* Right Section: All Icons */}
      <div className="flex items-center space-x-4">
        <SearchIcon className="w-6 h-6 cursor-pointer text-white" />
        <ShoppingBagIcon className="w-6 h-6 cursor-pointer text-white" />
        <button onClick={() => setMenuOpen(true)} className="focus:outline-none">
          <MenuIcon className="w-6 h-6 cursor-pointer text-white" />
        </button>
      </div>

      {/* Popup Panel - Bigger size, centered */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative bg-white w-[80%] max-w-[700px] h-[80vh] rounded-lg shadow-lg p-6 flex flex-col transition-transform">
            
            {/* Close Button */}
            <button
              onClick={() => {
                setMenuOpen(false);
                setActiveSection(null);
              }}
              className="absolute top-4 right-4 focus:outline-none"
            >
              <XIcon className="w-6 h-6 text-black" />
            </button>

            {/* Main Menu */}
            {!activeSection ? (
              <div className="flex flex-col space-y-4">
                <h2 className="text-2xl font-phudu text-black text-center">Categories</h2>
                <ul className="space-y-3">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <button
                        onClick={() => setActiveSection(item)}
                        className="text-xl font-phudu uppercase tracking-wider text-black block w-full text-left hover:text-gray-500 transition"
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              // Submenu View with Transition Effect
              <div className="flex flex-col space-y-4 transition-transform animate-slideIn">
                {/* Back Button */}
                <button onClick={() => setActiveSection(null)} className="flex items-center text-black hover:text-gray-500 transition">
                  <ArrowLeftIcon className="w-5 h-5 mr-2" />
                  Back
                </button>

                <h2 className="text-2xl font-phudu text-black">{activeSection}</h2>

                {/* Submenu List with Images */}
                <div className="grid grid-cols-2 gap-4">
                  {subMenus[activeSection]?.map((subItem, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center">
                      <img
                        src={subItem.image}
                        alt={subItem.name}
                        className="w-24 h-24 object-cover rounded-lg shadow-md"
                      />
                      <p className="text-sm font-phudu text-black mt-2">{subItem.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
