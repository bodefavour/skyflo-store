import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { searchProducts } from '../../services/api/products.service';
import type { Product } from '../../types/types';

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isOpen) {
            setQuery('');
            setResults([]);
            setLoading(false);
            setError(null);
        }
    }, [isOpen]);

    const debouncedSearch = useMemo(() => {
        let timeout: ReturnType<typeof setTimeout>;
        return (value: string) => {
            const trimmed = value.trim();
            clearTimeout(timeout);
            if (trimmed.length < 2) {
                setResults([]);
                setLoading(false);
                setError(null);
                return;
            }
            timeout = setTimeout(async () => {
                try {
                    setLoading(true);
                    setError(null);
                    const data = await searchProducts(trimmed, 30);
                    setResults(data);
                } catch (err) {
                    setError(err instanceof Error ? err.message : 'Unable to search products');
                } finally {
                    setLoading(false);
                }
            }, 300);
        };
    }, []);

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            setQuery(value);
            debouncedSearch(value);
        },
        [debouncedSearch]
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex flex-col"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="relative max-w-4xl w-full mx-auto px-4 sm:px-6 pt-16">
                        <div className="flex items-center gap-3 bg-white/10 border border-white/15 rounded-full px-5 py-4 text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1.5}
                                className="w-5 h-5 text-white/70"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M18 10.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0z" />
                            </svg>
                            <input
                                autoFocus
                                type="search"
                                value={query}
                                onChange={handleChange}
                                placeholder="Search for products, categories, collections..."
                                className="flex-1 bg-transparent text-white placeholder-white/40 focus:outline-none text-base sm:text-lg"
                            />
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
                                aria-label="Close search"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="mt-6 rounded-3xl bg-black/60 border border-white/10 text-white max-h-[60vh] overflow-y-auto">
                            {loading && (
                                <div className="py-10 text-center text-white/60">Searching products...</div>
                            )}

                            {!loading && error && (
                                <div className="py-10 text-center text-red-300">{error}</div>
                            )}

                            {!loading && !error && query && results.length === 0 && (
                                <div className="py-10 text-center text-white/60">No products found. Try a different keyword.</div>
                            )}

                            {!loading && !error && !query && (
                                <div className="py-10 text-center text-white/60">
                                    Start typing to discover products instantly.
                                </div>
                            )}

                            {!loading && !error && results.length > 0 && (
                                <ul className="divide-y divide-white/5">
                                    {results.map((product) => (
                                        <li key={product.id}>
                                            <Link
                                                to={`/product/${product.id}`}
                                                className="flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition"
                                                onClick={onClose}
                                            >
                                                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white/10 flex-shrink-0">
                                                    <img src={product.image || '/images/placeholder.jpg'} alt={product.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-base font-medium">{product.name}</p>
                                                    {product.category && <p className="text-sm text-white/50 mt-1">{product.category}</p>}
                                                </div>
                                                <div className="text-[#d4af37] font-semibold">
                                                    ${product.price.toFixed(2)}
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SearchOverlay;
