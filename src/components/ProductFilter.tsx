import React, { useState } from "react";

interface Filters {
  sort?: "priceAsc" | "priceDesc" | "nameAsc";
  priceRange?: [number, number];
  category?: string;
}

interface ProductFilterProps {
  onFilterChange: (filters: Filters) => void;
  defaultSort?: "priceAsc" | "priceDesc" | "nameAsc";
  availableCategories?: string[];
}

const ProductFilter: React.FC<ProductFilterProps> = ({ 
  onFilterChange,
  defaultSort = "priceAsc",
  availableCategories = []
}) => {
  const [sortOption, setSortOption] = useState(defaultSort);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [category, setCategory] = useState<string>("");

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
    <div className="bg-gray-50 p-4 rounded-lg mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#d4af37] focus:border-[#d4af37]"
          >
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="nameAsc">Name: A-Z</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Price: ${priceRange[1]}
          </label>
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={handlePriceChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
          />
        </div>

        {availableCategories.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={category}
              onChange={handleCategoryChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#d4af37] focus:border-[#d4af37]"
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