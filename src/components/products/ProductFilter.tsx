import React, { useState } from "react";
import { useLocale } from "../../context/LocaleContext";

interface Filters {
  sort?: "priceAsc" | "priceDesc" | "nameAsc";
  priceRange?: [number, number];
  category?: string;
}

interface ProductFilterProps {
  onFilterChange: (filters: Filters) => void;
  defaultSort?: "priceAsc" | "priceDesc" | "nameAsc";
  availableCategories?: string[];
  theme?: "light" | "dark";
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  onFilterChange,
  defaultSort = "priceAsc",
  availableCategories = [],
  theme = "light"
}) => {
  const [sortOption, setSortOption] = useState(defaultSort);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [category, setCategory] = useState<string>("");

  const isDark = theme === "dark";
  const { formatCurrency } = useLocale();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "priceAsc" | "priceDesc" | "nameAsc";
    setSortOption(value);
    onFilterChange({ sort: value, priceRange, category });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPriceRange = [0, Number(e.target.value)] as [number, number];
    setPriceRange(newPriceRange);
    onFilterChange({ sort: sortOption, priceRange: newPriceRange, category });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCategory(value);
    onFilterChange({ sort: sortOption, priceRange, category: value });
  };

  return (
    <div
      className={`p-5 md:p-6 rounded-2xl mb-10 border transition-colors duration-300 ${isDark
        ? "bg-[#0c0c0c]/80 border-white/10 backdrop-blur-md shadow-lg shadow-black/40"
        : "bg-gray-50 border-gray-100"
        }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label
            className={`block text-xs font-semibold tracking-[0.24em] uppercase mb-2 ${isDark ? "text-white/60" : "text-gray-500"
              }`}
          >
            Sort By
          </label>
          <select
            value={sortOption}
            onChange={handleSortChange}
            className={`w-full p-3 rounded-xl transition-colors duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-[#d4af37] focus:ring-offset-transparent ${isDark
              ? "bg-[#151515] border border-white/10 text-white placeholder-white/40"
              : "border border-gray-300 text-gray-900"
              }`}
          >
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="nameAsc">Name: A-Z</option>
          </select>
        </div>

        <div>
          <label
            className={`flex items-center justify-between text-xs font-semibold tracking-[0.24em] uppercase mb-2 ${isDark ? "text-white/60" : "text-gray-500"
              }`}
          >
            <span>Max Price</span>
            <span
              className={`tracking-normal text-sm font-medium ${isDark ? "text-white" : "text-gray-900"
                }`}
            >
              {formatCurrency(priceRange[1])}
            </span>
          </label>
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={handlePriceChange}
            className={`w-full h-2 rounded-full appearance-none cursor-pointer accent-[#d4af37] ${isDark ? "bg-white/10" : "bg-gray-200"
              }`}
          />
        </div>

        {availableCategories.length > 0 && (
          <div>
            <label
              className={`block text-xs font-semibold tracking-[0.24em] uppercase mb-2 ${isDark ? "text-white/60" : "text-gray-500"
                }`}
            >
              Category
            </label>
            <select
              value={category}
              onChange={handleCategoryChange}
              className={`w-full p-3 rounded-xl transition-colors duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-[#d4af37] focus:ring-offset-transparent ${isDark
                ? "bg-[#151515] border border-white/10 text-white placeholder-white/40"
                : "border border-gray-300 text-gray-900"
                }`}
            >
              <option value="">All Categories</option>
              {availableCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFilter;