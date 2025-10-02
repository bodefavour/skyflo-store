import React, { useState } from "react";
import { MenuIcon, XIcon, SearchIcon, ShoppingBagIcon, ArrowLeftIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const NavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { getCartCount } = useCart();

  const menuItems = [
    "Gift Section",
    "Jewellries and Beaded Bracelets",
    "Fashion Section",
    "Travel Section",
    "Tote Bag Section",
    "Lip Gloss",
    "Décor",
    "Events",
    "Holiday Specials",
  ];

  // Dummy submenu items for each menu item.
  const subMenus: { [key: string]: { name: string; image: string; path: string }[] } = {
    "Gift Section": [
      { name: "For Women", image: "/images/31343C.svg", path: "./birthday-gifts"},
      { name: "For Children", image: "/images/31343C.svg", path: "./birthday-gifts"},
      { name: "For Men", image: "/images/31343C.svg", path: "./birthday-gifts"},
    ],
    "Jewellries and Beaded Bracelets": [
      { name: "Tarnish Silver", image: "/images/31343C.svg", path: "./Jewellries-Beads"},
      { name: "Tarnish Gold", image: "/images/31343C.svg", path: "./Jewellries-Beads"},
      { name: "Already Vade Collections", image: "/images/31343C.svg", path: "./Jewellries-Beads"},
      { name: "Beaded Section", image: "/images/31343C.svg", path: "./Jewellries-Beads"},
    ],
    "Fashion Section": [
      { name: "Caps", image: "/images/31343C.svg", path: "./Fashion"},
      { name: "Veils", image: "/images/31343C.svg", path: "./Fashion"},
    ], 
    "Travel Section": [
      { name: "For Women", image: "/images/31343C.svg", path: "./travel-section"},
      { name: "For Men", image: "/images/31343C.svg", path: "./travel-section"}, 
      { name: "For Kids", image: "/images/31343C.svg", path: "./travel-section"},
    ], 
    "Tote Bag Section": [
      { name: "For Men", image: "/images/31343C.svg", path: "./tote-bags"}, 
      { name: "For Women", image: "/images/31343C.svg", path: "./tote-bags"},
    ], 
    "Lip Gloss": [
      { name: "For Men", image: "/images/31343C.svg", path: "./Lip-gloss"}, 
      { name: "For Women", image: "/images/31343C.svg", path: "./Lip-gloss"},
    ],
    "Decor": [
      { name: "Already Made Booth", image: "/images/31343C.svg", path: "./Decor"}, 
      { name: "Baloon Pieces", image: "/images/31343C.svg", path: "./Decor"},
      { name: "Mode Of Purchase", image: "/images/31343C.svg", path: "./Decor"},
    ],
    "Events": [
      { name: "Birthday Planning", image: "/images/31343C.svg", path: "./Events"}, 
      { name: "Wedding Planning", image: "/images/31343C.svg", path: "./Events"},
      { name: "Anniversary", image: "/images/31343C.svg", path: "./Events"},
      { name: "Gender Reveal", image: "/images/31343C.svg", path: "./Events"},
      { name: "Proposal Planning", image: "/images/31343C.svg", path: "./Events"},
    ],
    "Holiday Specials": [
      { name: "For Men", image: "/images/31343C.svg", path: "./Holiday-Specials"}, 
      { name: "For Woven", image: "/images/31343C.svg", path: "./Holiday-Specials"}, ],
    "Hampers": [
      { name: "For Men", image: "/images/31343C.svg", path: "./birthday-gifts"}, 
      { name: "For Women", image: "/images/31343C.svg", path: "./birthday-gifts"},
    ],
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-0 text-white py-4 px-6 z-50 flex justify-end">
      {/* Right Section: Icons */}
      <div className="flex items-center space-x-4">
        <SearchIcon className="w-6 h-6 cursor-pointer text-white" />
        <Link to="/cart" className="relative">
          <ShoppingBagIcon className="w-6 h-6 cursor-pointer text-white" />
          {getCartCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#d4af37] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {getCartCount()}
            </span>
          )}
        </Link>
        <button onClick={() => setMenuOpen(true)} className="focus:outline-none">
          <MenuIcon className="w-6 h-6 cursor-pointer text-white" />
        </button>
      </div>

      {/* Overlay with Blur Effect */}
      {menuOpen && (
        <div className={'fixed inset-0 bg-black bg-opacity-40 backdrop-blur-lg z-50 flex justify-end transition-opacity duration-500 ${menuOPen ? "opacity-100" : "opacity-0 pointer-events-none"}'}>
          {/* Popup Panel – 43% of the screen width */}
          <div className={'relative bg-white w-[43%] h-full shadow-lg p-6 flex flex-col transform transition-all duration-1200 ease-in-out ${menuOpen ? "translate-x-0 opacity-100 scale-100" : "translate-x-full opacity-0 scale-95"}'}>
            
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
              <div className={'flex flex-col space-y-4 transform transition-all duration-500 ease-out ${activeSection ? "translate-x-0 opacity-100 scale-100" : "translate-x-10 opacity-0 scale-95"}'}>
                {/* Back Button */}
                <button onClick={() => setActiveSection(null)} className="flex items-center text-black hover:text-gray-500 transition">
                  <ArrowLeftIcon className="w-5 h-5 mr-2" />
                  Back
                </button>

                <h2 className="text-2xl font-phudu text-black">{activeSection}</h2>

                {/* Submenu List with Images */}
                <div className="grid grid-cols-1 gap-4">
                  {subMenus[activeSection]?.map((subItem, idx) => (
                    <div key={idx} className="flex items-center space-x-4">
                      <img
                        src={subItem.image}
                        alt={subItem.name}
                        className="w-20 h-20 object-cover rounded-lg shadow-md"
                      />
                      <Link to={`/${subItem.path}`} onClick={() => setMenuOpen(false)} className="text-lg font-phudu text-black hover:text-gray-500 transition">
                      {subItem.name}
                      </Link>
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