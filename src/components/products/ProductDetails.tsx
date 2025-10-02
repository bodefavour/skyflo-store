import React from "react";

const ProductDetails = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Small GG Crossbody Bag</h1>
      <p className="text-xl text-gray-700">$1,290</p>
      
      <p className="text-gray-600">
        A structured crossbody bag made from GG Supreme canvas, featuring the Web stripe detail.
      </p>

      <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition">
        Add to Cart
      </button>

      <button className="w-full border border-black py-3 rounded-md hover:bg-gray-100 transition">
        Add to Wishlist
      </button>
    </div>
  );
};

export default ProductDetails;
