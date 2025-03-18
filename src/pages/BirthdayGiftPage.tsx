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

      <ProductGrid products={sampleProducts} />
    </main>
  );
};

export default BirthdayGifts;
//     //The  BirthdayGifts  component is a page that displays a hero section and a grid of products.
//     //The  ProductGrid  component is a reusable component that displays a grid of products.
//     //The  HeroSection  component is a reusable component that displays a hero section with a background image and content.
//     //The  sampleProducts  array contains sample product data that is passed to the  ProductGrid  component.