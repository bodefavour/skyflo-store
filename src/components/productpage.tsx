import React from "react";
import ProductImages from "../components/ProductImages";
import ProductDetails from "../components/ProductDetails";
import Footer from "../components/Footer";

const ProductPage = () => {
  return (
    <div className="bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left - Product Images */}
          <ProductImages />

          {/* Right - Product Details */}
          <ProductDetails />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
