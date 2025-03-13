import React, { useState } from "react";

const ProductFilter = ({ onFilterChange }: { onFilterChange: (filters: any) => void }) => {
  const [filters, setFilters] = useState({
    priceRange: "",
    category: "",
    sort: "newest",
    line: "",
    color: "",
    material: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-wrap gap-4 p-6 bg-gray-100 rounded-lg shadow-md">
      <select name="sort" value={filters.sort} onChange={handleChange} className="p-2 border rounded">
        <option value="newest">Sort by Newest</option>
        <option value="lowToHigh">Price: Low to High</option>
        <option value="highToLow">Price: High to Low</option>
      </select>

      <input type="text" name="category" placeholder="Category" value={filters.category} onChange={handleChange} className="p-2 border rounded" />

      <input type="text" name="line" placeholder="Line" value={filters.line} onChange={handleChange} className="p-2 border rounded" />

      <input type="text" name="color" placeholder="Color" value={filters.color} onChange={handleChange} className="p-2 border rounded" />

      <input type="text" name="material" placeholder="Material" value={filters.material} onChange={handleChange} className="p-2 border rounded" />

      <input type="number" name="priceRange" placeholder="Max Price" value={filters.priceRange} onChange={handleChange} className="p-2 border rounded" />
    </div>
  );
};

export default ProductFilter;
