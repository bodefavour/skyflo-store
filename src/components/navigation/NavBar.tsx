import React, { useState } from "react";
import {
  MenuIcon,
  XIcon,
  SearchIcon,
  ShoppingBagIcon,
  ArrowLeftIcon,
  UserCircleIcon
} from "@heroicons/react/outline";
import { HeartIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import SearchOverlay from "./SearchOverlay";
import LocaleSwitcher from "./LocaleSwitcher";

const NavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { getCartCount } = useCart();
  const { count: wishlistCount } = useWishlist();

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

  const subMenus: Record<string, { name: string; image: string; path: string }[]> = {
    "Gift Section": [
      { name: "For Women", image: "/images/31343C.svg", path: "birthday-gifts" },
      { name: "For Children", image: "/images/31343C.svg", path: "birthday-gifts" },
      { name: "For Men", image: "/images/31343C.svg", path: "birthday-gifts" },
    ],
    "Jewellries and Beaded Bracelets": [
      { name: "Tarnish Silver", image: "/images/31343C.svg", path: "Jewellries-Beads" },
      { name: "Tarnish Gold", image: "/images/31343C.svg", path: "Jewellries-Beads" },
      { name: "Already Vade Collections", image: "/images/31343C.svg", path: "Jewellries-Beads" },
      { name: "Beaded Section", image: "/images/31343C.svg", path: "Jewellries-Beads" },
    ],
    "Fashion Section": [
      { name: "Caps", image: "/images/31343C.svg", path: "Fashion" },
      { name: "Veils", image: "/images/31343C.svg", path: "Fashion" },
    ],
    "Travel Section": [
      { name: "For Women", image: "/images/31343C.svg", path: "travel-section" },
      { name: "For Men", image: "/images/31343C.svg", path: "travel-section" },
      { name: "For Kids", image: "/images/31343C.svg", path: "travel-section" },
    ],
    "Tote Bag Section": [
      { name: "For Men", image: "/images/31343C.svg", path: "tote-bags" },
      { name: "For Women", image: "/images/31343C.svg", path: "tote-bags" },
    ],
    "Lip Gloss": [
      { name: "For Men", image: "/images/31343C.svg", path: "Lip-gloss" },
      { name: "For Women", image: "/images/31343C.svg", path: "Lip-gloss" },
    ],
    "Décor": [
      { name: "Already Made Booth", image: "/images/31343C.svg", path: "Decor" },
      { name: "Baloon Pieces", image: "/images/31343C.svg", path: "Decor" },
      { name: "Mode Of Purchase", image: "/images/31343C.svg", path: "Decor" },
    ],
    "Events": [
      { name: "Birthday Planning", image: "/images/31343C.svg", path: "Events" },
      { name: "Wedding Planning", image: "/images/31343C.svg", path: "Events" },
      { name: "Anniversary", image: "/images/31343C.svg", path: "Events" },
      { name: "Gender Reveal", image: "/images/31343C.svg", path: "Events" },
      { name: "Proposal Planning", image: "/images/31343C.svg", path: "Events" },
    ],
    "Holiday Specials": [
      { name: "For Men", image: "/images/31343C.svg", path: "Holiday-Specials" },
      { name: "For Women", image: "/images/31343C.svg", path: "Holiday-Specials" },
    ],
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full text-white z-50">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-transparent backdrop-blur" />
          <div className="relative flex items-center justify-between px-4 sm:px-6 lg:px-10 py-4">
            <Link to="/" className="text-lg font-semibold tracking-[0.4em] uppercase">
              SKYFLO
            </Link>

            <div className="flex items-center space-x-3 sm:space-x-4">
              <LocaleSwitcher />

              <Link
                to="/login"
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 hover:border-[#d4af37] hover:text-[#d4af37] transition"
                aria-label="Sign in or manage your account"
              >
                <UserCircleIcon className="w-5 h-5" />
                <span className="text-sm font-medium uppercase tracking-[0.2em]">Sign in</span>
              </Link>

              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-full hover:bg-white/10 transition"
                aria-label="Search products"
              >
                <SearchIcon className="w-6 h-6" />
              </button>

              <Link
                to="/wishlist"
                className="relative p-2 rounded-full hover:bg-white/10 transition"
                aria-label="Open wishlist"
              >
                <HeartIcon className="w-6 h-6" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#d4af37] text-black text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                className="relative p-2 rounded-full hover:bg-white/10 transition"
                aria-label="Open cart"
              >
                <ShoppingBagIcon className="w-6 h-6" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#d4af37] text-black text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setMenuOpen(true)}
                className="p-2 rounded-full hover:bg-white/10 transition focus:outline-none"
                aria-label="Open navigation menu"
              >
                <MenuIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {menuOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-lg z-[998] flex justify-end">
          <div className="relative bg-white w-full sm:w-[420px] lg:w-[480px] h-full shadow-2xl p-6 flex flex-col">
            <button
              onClick={() => {
                setMenuOpen(false);
                setActiveSection(null);
              }}
              className="absolute top-4 right-4 focus:outline-none"
              aria-label="Close navigation"
            >
              <XIcon className="w-6 h-6 text-black" />
            </button>

            {!activeSection ? (
              <div className="mt-12 flex-1 overflow-y-auto">
                <h2 className="text-2xl font-semibold text-black text-center tracking-[0.3em] uppercase mb-6">
                  Categories
                </h2>
                <ul className="space-y-4">
                  {menuItems.map((item) => (
                    <li key={item}>
                      <button
                        onClick={() => setActiveSection(item)}
                        className="w-full text-left text-lg uppercase tracking-[0.2em] text-black/80 hover:text-black transition"
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-10 border-t border-black/10 pt-6 space-y-3">
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block text-base font-medium text-black/80 hover:text-black transition"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="block text-base font-medium text-black/80 hover:text-black transition"
                  >
                    Create account
                  </Link>
                </div>
              </div>
            ) : (
              <div className="mt-12 flex-1 overflow-y-auto space-y-6">
                <button
                  onClick={() => setActiveSection(null)}
                  className="flex items-center gap-2 text-black/60 hover:text-black transition"
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                  Back
                </button>

                <h2 className="text-2xl font-semibold text-black">{activeSection}</h2>

                <div className="grid grid-cols-1 gap-5">
                  {subMenus[activeSection]?.map((subItem) => (
                    <div key={subItem.name} className="flex items-center gap-4">
                      <img
                        src={subItem.image}
                        alt={subItem.name}
                        className="w-20 h-20 object-cover rounded-xl shadow-md"
                      />
                      <Link
                        to={`/${subItem.path}`}
                        onClick={() => setMenuOpen(false)}
                        className="text-base font-medium text-black/80 hover:text-black transition"
                      >
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
    </>
  );
};

export default NavBar;