import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import type { Product } from '../types/types';

export interface WishlistItem extends Product { }

interface WishlistContextValue {
    items: WishlistItem[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: string) => void;
    toggleWishlist: (product: Product) => void;
    isInWishlist: (productId: string) => boolean;
    clearWishlist: () => void;
    count: number;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

const STORAGE_KEY = 'skyflo_wishlist';

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<WishlistItem[]>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? (JSON.parse(stored) as WishlistItem[]) : [];
        } catch (error) {
            console.error('Failed to parse wishlist from storage', error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items]);

        const addToWishlist = useCallback((product: Product) => {
        setItems((prev) => {
            if (prev.some((item) => item.id === product.id)) {
                return prev;
            }
            return [...prev, product];
        });
        }, []);

        const removeFromWishlist = useCallback((productId: string) => {
        setItems((prev) => prev.filter((item) => item.id !== productId));
        }, []);

        const toggleWishlist = useCallback((product: Product) => {
        setItems((prev) => {
            if (prev.some((item) => item.id === product.id)) {
                return prev.filter((item) => item.id !== product.id);
            }
            return [...prev, product];
        });
        }, []);

        const isInWishlist = useCallback(
            (productId: string) => items.some((item) => item.id === productId),
            [items]
        );

        const clearWishlist = useCallback(() => setItems([]), []);

    const value = useMemo(
        () => ({
            items,
            addToWishlist,
            removeFromWishlist,
            toggleWishlist,
            isInWishlist,
            clearWishlist,
            count: items.length,
        }),
            [items, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist, clearWishlist]
    );

    return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
