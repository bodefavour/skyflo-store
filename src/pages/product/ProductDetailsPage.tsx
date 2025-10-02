import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '../../types/types';
import { fetchProductById } from '../../services/api/products.service';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ProductDetailsPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        const loadProduct = async () => {
            if (!productId) {
                setError('Product ID not provided');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const data = await fetchProductById(productId);
                setProduct(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load product');
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [productId]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, quantity);
            setAddedToCart(true);
            setTimeout(() => setAddedToCart(false), 2000);
        }
    };

    const handleBuyNow = () => {
        if (product) {
            addToCart(product, quantity);
            navigate('/cart');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
                <p className="text-gray-600 mb-6">{error || 'The product you are looking for does not exist.'}</p>
                <button
                    onClick={() => navigate(-1)}
                    className="bg-[#d4af37] hover:bg-[#c99b3f] text-black px-6 py-3 rounded-lg font-medium transition"
                >
                    Go Back
                </button>
            </div>
        );
    }

    const productImages = product.image ? [product.image] : [];
    const inWishlist = isInWishlist(product.id);

    const handleToggleWishlist = () => {
        toggleWishlist(product);
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                {/* Breadcrumb */}
                <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
                    <button onClick={() => navigate('/')} className="hover:text-[#d4af37]">
                        Home
                    </button>
                    <span>/</span>
                    {product.category && (
                        <>
                            <span className="hover:text-[#d4af37] cursor-pointer">{product.category}</span>
                            <span>/</span>
                        </>
                    )}
                    <span className="text-gray-900 font-medium">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="aspect-square rounded-2xl overflow-hidden bg-gray-100"
                        >
                            <img
                                src={productImages[selectedImage] || product.image || '/images/placeholder.jpg'}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        {productImages.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {productImages.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`aspect-square rounded-lg overflow-hidden ${selectedImage === index
                                            ? 'ring-2 ring-[#d4af37]'
                                            : 'ring-1 ring-gray-200'
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6"
                    >
                        {product.category && (
                            <span className="inline-block px-4 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                                {product.category}
                            </span>
                        )}

                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                            {product.name}
                        </h1>

                        <div className="flex items-baseline space-x-4">
                            <span className="text-4xl font-bold text-[#d4af37]">
                                ${product.price.toFixed(2)}
                            </span>
                        </div>

                        {product.description && (
                            <div className="prose prose-gray max-w-none">
                                <p className="text-gray-600 leading-relaxed">{product.description}</p>
                            </div>
                        )}

                        {/* Stock Status */}
                        <div className="flex items-center space-x-2">
                            {product.stock && product.stock > 0 ? (
                                <>
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-green-600 font-medium">In Stock ({product.stock} available)</span>
                                </>
                            ) : (
                                <>
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                    <span className="text-red-600 font-medium">Out of Stock</span>
                                </>
                            )}
                        </div>

                        {/* Quantity Selector */}
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700">Quantity</label>
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition"
                                    disabled={quantity <= 1}
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-20 text-center border border-gray-300 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                                    min="1"
                                    max={product.stock || 999}
                                />
                                <button
                                    onClick={() => setQuantity(Math.min((product.stock || 999), quantity + 1))}
                                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition"
                                    disabled={quantity >= (product.stock || 999)}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3 pt-6">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleBuyNow}
                                disabled={!product.stock || product.stock <= 0}
                                className="w-full bg-[#d4af37] hover:bg-[#c99b3f] text-black py-4 rounded-lg font-bold text-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Buy Now
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleAddToCart}
                                disabled={!product.stock || product.stock <= 0}
                                className="w-full bg-black hover:bg-gray-800 text-white py-4 rounded-lg font-bold text-lg transition disabled:opacity-50 disabled:cursor-not-allowed relative"
                            >
                                {addedToCart ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Added to Cart!
                                    </span>
                                ) : (
                                    'Add to Cart'
                                )}
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleToggleWishlist}
                                className={`w-full border border-[#d4af37]/60 py-4 rounded-lg font-semibold text-lg transition flex items-center justify-center gap-2 ${inWishlist ? 'bg-[#d4af37] text-black' : 'bg-transparent text-gray-900 hover:bg-[#d4af37]/10'
                                    }`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className={`w-5 h-5 ${inWishlist ? 'fill-current' : 'fill-none stroke-current'}`}
                                    strokeWidth={1.6}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.172 5.172a4.5 4.5 0 0 1 6.364 0L12 7.637l2.464-2.465a4.5 4.5 0 1 1 6.364 6.364L12 20.364l-8.828-8.828a4.5 4.5 0 0 1 0-6.364z"
                                    />
                                </svg>
                                {inWishlist ? 'Saved to wishlist' : 'Save to wishlist'}
                            </motion.button>
                        </div>

                        {/* Additional Info */}
                        <div className="border-t border-gray-200 pt-6 space-y-4">
                            <div className="flex items-start space-x-3">
                                <svg className="w-6 h-6 text-[#d4af37] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                </svg>
                                <div>
                                    <h4 className="font-medium text-gray-900">Free Shipping</h4>
                                    <p className="text-sm text-gray-600">On orders over $50</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <svg className="w-6 h-6 text-[#d4af37] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <div>
                                    <h4 className="font-medium text-gray-900">Secure Payment</h4>
                                    <p className="text-sm text-gray-600">100% secure transaction</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <svg className="w-6 h-6 text-[#d4af37] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                <div>
                                    <h4 className="font-medium text-gray-900">Easy Returns</h4>
                                    <p className="text-sm text-gray-600">30-day return policy</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
