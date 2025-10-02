import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductFilter from "./ProductFilter";
import { Product } from "../../types/types";
import LoadingSpinner from "../common/LoadingSpinner";
import { fetchProductsByCollection } from "../../services/api/products.service";
import { useWishlist } from "../../context/WishlistContext";
import { useLocale } from "../../context/LocaleContext";

interface ProductGridProps {
  collectionName: string; // e.g. "birthdayGifts", "jewelry"
  defaultSort?: "priceAsc" | "priceDesc" | "nameAsc";
  showFilter?: boolean;
  theme?: "light" | "dark";
}

const ProductGrid: React.FC<ProductGridProps> = ({
  collectionName,
  defaultSort = "priceAsc",
  showFilter = true,
  theme = "light"
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isDark = theme === "dark";
  const { formatCurrency } = useLocale();

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await fetchProductsByCollection(collectionName);
        setProducts(productsData);
        setFilteredProducts(productsData);
        applyDefaultSort(productsData, defaultSort);
      } catch (err) {
        setError("Failed to fetch products");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [collectionName, defaultSort]);

  const applyDefaultSort = (products: Product[], sortOption: string) => {
    let sorted = [...products];
    switch (sortOption) {
      case "priceAsc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "nameAsc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    setFilteredProducts(sorted);
  };

  interface Filters {
    sort?: "priceAsc" | "priceDesc" | "nameAsc";
    priceRange?: [number, number];
    category?: string;
  }

  const handleFilterChange = (filters: Filters) => {
    let updatedProducts = [...products];

    // Apply price range filter
    if (filters.priceRange) {
      updatedProducts = updatedProducts.filter(
        p => p.price >= filters.priceRange![0] && p.price <= filters.priceRange![1]
      );
    }

    // Apply category filter
    if (filters.category) {
      updatedProducts = updatedProducts.filter(
        p => p.category === filters.category
      );
    }

    // Apply sorting
    if (filters.sort) {
      applyDefaultSort(updatedProducts, filters.sort);
    } else {
      setFilteredProducts(updatedProducts);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <section
      className={`py-12 sm:py-16 ${isDark ? "bg-transparent text-white" : "bg-white text-gray-900"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showFilter && (
          <ProductFilter
            onFilterChange={handleFilterChange}
            defaultSort={defaultSort}
            theme={theme}
          />
        )}

        {filteredProducts.length === 0 ? (
          <div
            className={`text-center py-20 rounded-3xl border ${isDark
              ? "border-white/10 bg-[#0f0f0f]/80 backdrop-blur-sm"
              : "border-gray-200 bg-white"
              }`}
          >
            <h3
              className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-800"
                }`}
            >
              No products match your criteria yet
            </h3>
            <p className={`mt-3 ${isDark ? "text-white/60" : "text-gray-500"}`}>
              Try adjusting the filters or exploring another collection.
            </p>
            <button
              onClick={() => setFilteredProducts(products)}
              className="mt-6 px-8 py-3 bg-[#d4af37] text-black rounded-full font-semibold hover:bg-[#c99b3f] transition shadow-lg shadow-[#d4af37]/30"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} theme={theme} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// Separate ProductCard component for better reusability
const HeartOutlineIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.172 5.172a4.5 4.5 0 0 1 6.364 0L12 7.637l2.464-2.465a4.5 4.5 0 1 1 6.364 6.364L12 20.364l-8.828-8.828a4.5 4.5 0 0 1 0-6.364z"
    />
  </svg>
);

const ProductCard: React.FC<{ product: Product; theme: "light" | "dark" }> = ({
  product,
  theme
}) => {
  const isDark = theme === "dark";
  const [isHovered, setIsHovered] = useState(false);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { formatCurrency } = useLocale();
  const inWishlist = isInWishlist(product.id);
  const productImage = product.image || "/images/placeholder.jpg";

  const handleWishlistClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className={`relative group block overflow-hidden rounded-2xl border transition-all duration-500 ${isDark
        ? "bg-[#111111] border-white/10 shadow-xl shadow-black/40 hover:border-[#d4af37]/60 hover:shadow-[#d4af37]/20"
        : "bg-white border-gray-100 hover:shadow-xl"
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={handleWishlistClick}
        className={`absolute top-4 right-4 z-20 w-11 h-11 rounded-full flex items-center justify-center transition ${inWishlist
            ? "bg-[#d4af37] text-black"
            : "bg-black/60 text-white hover:bg-black/80"
          }`}
        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        {inWishlist ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M11.998 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.416 3 7.488 3c1.74 0 3.412.81 4.51 2.09A5.907 5.907 0 0116.509 3C19.58 3 22 5.42 22 8.5c0 3.78-3.408 6.86-8.54 11.54l-1.462 1.31z" />
          </svg>
        ) : (
          <HeartOutlineIcon className="w-5 h-5" />
        )}
      </button>

      <div className="aspect-square overflow-hidden bg-black/20">
        <img
          src={productImage}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`}
        />
      </div>

      <div
        className={`absolute inset-0 bg-gradient-to-t opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 ${isDark
          ? "from-black via-black/60 to-transparent"
          : "from-black/70 via-black/30 to-transparent"
          }`}
      >
        <h3 className="text-white text-lg font-semibold mb-1">{product.name}</h3>
        <p className="text-[#d4af37] text-md font-semibold">
          {formatCurrency(product.price)}
        </p>
      </div>

      <div className={`p-5 ${isDark ? "text-white" : "text-gray-900"}`}>
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-[#d4af37] font-semibold mt-1">
          {formatCurrency(product.price)}
        </p>
        {product.category && (
          <span
            className={`inline-block mt-3 px-3 py-1 text-xs font-semibold tracking-wide rounded-full ${isDark
              ? "bg-white/10 text-white/70"
              : "bg-gray-100 text-gray-600"
              }`}
          >
            {product.category}
          </span>
        )}
      </div>
    </Link>
  );
};

export default ProductGrid;