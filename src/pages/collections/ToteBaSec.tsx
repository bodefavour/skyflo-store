import React from "react";
import HeroSection from "../../components/common/HeroSection";
import ProductGrid from "../../components/products/ProductGrid";

const BirthdayGifts: React.FC = () => {
  return (
    <main className="bg-white">
      {/* Customized Hero Section */}
      <HeroSection
        backgroundImage="/images/1001631204_enhanced.jpg.avif"
        className="h-[20vh]"
      >
        <div className="max-w-[70%] mx-auto p-6 rounded-lg">
          <h2 className="text-3xl md:text-5xl font-bold">
            Thoughtfully curated gifts to make every moment special.
          </h2>
          <button className="mt-6 px-6 py-3 bg-white text-black text-lg rounded-lg hover:bg-gray-300 transition">
            Explore Birthday Gifts
          </button>
        </div>
      </HeroSection>

      {/* Updated ProductGrid usage */}
      <ProductGrid 
        collectionName="birthdayGifts" 
        defaultSort="priceAsc"
        showFilter={true}
      />
    </main>
  );
};

export default BirthdayGifts;