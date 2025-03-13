import React, { useState } from "react";
import ProductFilter from "./ProductFilter";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);

  interface Filters {
    sort?: "lowToHigh" | "highToLow";
    priceRange?: string;
  }

  const handleFilterChange = (filters: Filters) => {
    let updatedProducts = products;

    if (filters.sort === "lowToHigh") {
      updatedProducts = [...products].sort((a, b) => a.price - b.price);
    } else if (filters.sort === "highToLow") {
      updatedProducts = [...products].sort((a, b) => b.price - a.price);
    }

    if (filters.priceRange) {
      updatedProducts = updatedProducts.filter((p) => p.price <= Number(filters.priceRange));
    }

    setFilteredProducts(updatedProducts);
  };

  return (
    <section className="py-12 px-6">
      <ProductFilter onFilterChange={handleFilterChange} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 mt-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="relative group bg-white shadow-lg rounded-lg p-4">
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-lg group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center">
              <h3 className="text-white text-lg font-semibold">{product.name}</h3>
              <p className="text-white text-md font-bold">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
