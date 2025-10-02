import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';

const CartPage: React.FC = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (cartItems.length > 0) {
            navigate('/checkout');
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-6 py-16">
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
                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold text-white mb-4">Your cart is empty</h2>
                    <p className="text-white/60 mb-8">
                        Looks like you haven't added anything to your cart yet. Explore our collections and find something special!
                    </p>
                    <Link
                        to="/"
                        className="inline-block bg-[#d4af37] hover:bg-[#c99b3f] text-black px-8 py-3 rounded-full font-semibold transition"
                    >
                        Continue Shopping
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white py-10 sm:py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]">Your bag</p>
                        <h1 className="text-3xl sm:text-4xl font-light">Shopping cart</h1>
                    </div>
                    <button
                        onClick={clearCart}
                        className="text-sm text-red-400 hover:text-red-300 font-medium"
                    >
                        Clear Cart
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                className="bg-[#0c0c0c]/80 border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row gap-6 backdrop-blur"
                            >
                                {/* Product Image */}
                                <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                                    <img
                                        src={item.image || '/images/placeholder.jpg'}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Product Details */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <Link
                                            to={`/product/${item.id}`}
                                            className="text-lg font-semibold text-white hover:text-[#d4af37] transition"
                                        >
                                            {item.name}
                                        </Link>
                                        {item.category && (
                                            <p className="text-sm text-white/40 mt-1">{item.category}</p>
                                        )}
                                        <p className="text-lg font-semibold text-[#d4af37] mt-2">
                                            ${item.price.toFixed(2)}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        {/* Quantity Controls */}
                                        <div className="flex items-center space-x-3">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-8 h-8 rounded-md border border-white/20 flex items-center justify-center hover:border-white/40 transition"
                                            >
                                                -
                                            </button>
                                            <span className="w-12 text-center font-medium">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 rounded-md border border-white/20 flex items-center justify-center hover:border-white/40 transition"
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-400 hover:text-red-300 font-medium text-sm"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>

                                {/* Item Total */}
                                <div className="text-right sm:pl-6 flex flex-col justify-between">
                                    <p className="text-lg font-semibold text-white">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-[#0c0c0c]/80 border border-white/10 rounded-2xl p-6 sticky top-8 backdrop-blur"
                        >
                            <h2 className="text-xl font-semibold text-white mb-6">Order summary</h2>

                            <div className="space-y-4">
                                <div className="flex justify-between text-white/60">
                                    <span>Subtotal</span>
                                    <span>${getCartTotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-white/60">
                                    <span>Shipping</span>
                                    <span>{getCartTotal() > 50 ? 'Free' : '$10.00'}</span>
                                </div>
                                <div className="flex justify-between text-white/60">
                                    <span>Tax (estimated)</span>
                                    <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
                                </div>

                                <div className="border-t border-white/10 pt-4">
                                    <div className="flex justify-between text-lg font-semibold text-white">
                                        <span>Total</span>
                                        <span>
                                            ${(getCartTotal() + (getCartTotal() > 50 ? 0 : 10) + getCartTotal() * 0.08).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleCheckout}
                                className="w-full bg-[#d4af37] hover:bg-[#c99b3f] text-black py-4 rounded-full font-semibold text-lg mt-6 transition"
                            >
                                Proceed to Checkout
                            </motion.button>

                            <Link
                                to="/"
                                className="block text-center text-white/60 hover:text-white mt-4 font-medium"
                            >
                                Continue Shopping
                            </Link>

                            {/* Trust Badges */}
                            <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                                <div className="flex items-center space-x-3 text-sm text-white/60">
                                    <svg className="w-5 h-5 text-[#d4af37]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Secure Checkout</span>
                                </div>
                                <div className="flex items-center space-x-3 text-sm text-white/60">
                                    <svg className="w-5 h-5 text-[#d4af37]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Free Returns</span>
                                </div>
                                <div className="flex items-center space-x-3 text-sm text-white/60">
                                    <svg className="w-5 h-5 text-[#d4af37]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Fast Delivery</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
