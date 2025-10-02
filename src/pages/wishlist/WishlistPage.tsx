import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

const WishlistPage: React.FC = () => {
  const { items, removeFromWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleMoveToCart = (productId: string) => {
    const product = items.find((item) => item.id === productId);
    if (!product) return;

    addToCart(product, 1);
    removeFromWishlist(productId);
    navigate('/cart');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-black/90 to-[#0d0d0d] flex flex-col items-center justify-center px-4 py-16 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="mb-6">
            <svg
              className="w-24 h-24 mx-auto text-white/20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.293 2.586a1 1 0 00.894 1.414H17m-6 0a2 2 0 104 0m-4 0a2 2 0 11-4 0"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
          <p className="text-white/60 mb-8">
            Tap the heart icon on any product to save it for later. When you're ready, move items straight into your cart.
          </p>
          <Link
            to="/"
            className="inline-block bg-[#d4af37] text-black px-8 py-3 rounded-full font-semibold shadow-lg shadow-[#d4af37]/30 hover:bg-[#c99b3f] transition"
          >
            Start exploring
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black/95 to-[#080808] py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold">Wishlist</h1>
            <p className="mt-2 text-sm text-white/60">
              {items.length} {items.length === 1 ? 'item saved' : 'items saved for later'}
            </p>
          </div>
          <Link
            to="/collections"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-sm font-medium transition"
          >
            Continue shopping
            <span aria-hidden className="text-lg">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/5 via-white/0 to-white/5 backdrop-blur"
            >
              <button
                onClick={() => toggleWishlist(item)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition"
                aria-label="Remove from wishlist"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M11.998 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.416 3 7.488 3c1.74 0 3.412.81 4.51 2.09A5.907 5.907 0 0116.509 3C19.58 3 22 5.42 22 8.5c0 3.78-3.408 6.86-8.54 11.54l-1.462 1.31z" />
                </svg>
              </button>

              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={item.image || '/images/placeholder.jpg'}
                  alt={item.name}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  {item.category && (
                    <p className="text-sm text-white/50 mt-1">{item.category}</p>
                  )}
                </div>
                <p className="text-xl font-semibold text-[#d4af37]">
                  ${item.price.toFixed(2)}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <button
                    onClick={() => handleMoveToCart(item.id)}
                    className="flex-1 inline-flex items-center justify-center px-4 py-3 rounded-full bg-[#d4af37] text-black font-medium shadow-lg shadow-[#d4af37]/30 hover:bg-[#c99b3f] transition"
                  >
                    Move to cart
                  </button>
                  <Link
                    to={`/product/${item.id}`}
                    className="flex-1 inline-flex items-center justify-center px-4 py-3 rounded-full border border-white/20 text-white font-medium hover:border-white/40 transition"
                  >
                    View details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
