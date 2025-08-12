import React, { useState, useEffect } from "react";
import ProductFilter from "./ProductFilter";
import { Product } from "../types/types";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";
import LoadingSpinner from "./LoadingSpinner";

interface ProductGridProps {
  collectionName: string; // e.g. "birthdayGifts", "jewelry"
  defaultSort?: "priceAsc" | "priceDesc" | "nameAsc";
  showFilter?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  collectionName, 
  defaultSort = "priceAsc",
  showFilter = true 
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from Firebase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, collectionName));
        const querySnapshot = await getDocs(q);
        const productsData: Product[] = [];
        
        querySnapshot.forEach((doc) => {
          productsData.push({ 
            id: doc.id, 
            ...doc.data() 
          } as Product);
        });

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
    switch(sortOption) {
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
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {showFilter && (
        <ProductFilter 
          onFilterChange={handleFilterChange} 
          defaultSort={defaultSort}
        />
      )}

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-xl font-medium text-gray-700">No products found matching your criteria</h3>
          <button 
            onClick={() => setFilteredProducts(products)}
            className="mt-4 px-6 py-2 bg-[#d4af37] text-black rounded-md hover:bg-[#c99b3f] transition"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

// Separate ProductCard component for better reusability
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`}
        />
      </div>
      
      <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4`}>
        <h3 className="text-white text-lg font-medium mb-1">{product.name}</h3>
        <p className="text-[#d4af37] text-md font-semibold">
          ${product.price.toFixed(2)}
        </p>
      </div>
      
      <div className="p-4">
        <h3 className="text-gray-900 font-medium">{product.name}</h3>
        <p className="text-[#d4af37] font-semibold mt-1">
          ${product.price.toFixed(2)}
        </p>
        {product.category && (
          <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded">
            {product.category}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;