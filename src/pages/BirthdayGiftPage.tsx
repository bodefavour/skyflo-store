import React from "react";
import HeroSection from "../components/HeroSection";
import ProductGrid from "../components/ProductGrid";

const BirthdayGifts: React.FC = () => {
  const sampleProducts = [
    { id: 1, name: "Luxury Necklace", price: 499.99, image: "/images/31343C.svg" },
    { id: 2, name: "Elegant Watch", price: 899.99, image: "/images/31343C.svg" },
    { id: 3, name: "Gift Box Set", price: 299.99, image: "/images/31343C.svg" },
  ];

  return (
    <main>
      {/* Customized Hero Section */}
      <HeroSection
        backgroundImage="/images/1001631204_enhanced.jpg.avif"
        className="h-[70vh] flex flex-col justify-end pb-16 text-center text-white"
      >
        <div className="max-w-[60%] mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold">
            Shop from our birthday catalogue and get genuine gifts
          </h2>
          <button className="mt-6 px-6 py-3 bg-black text-white text-lg rounded-lg hover:bg-gray-800 transition">
            Explore Birthday Gifts
          </button>
        </div>
      </HeroSection>

      <ProductGrid products={sampleProducts} />
    </main>
  );
};

export default BirthdayGifts;