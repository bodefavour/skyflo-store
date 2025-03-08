import React from "react";
import NavBar from "../components/NavBar";
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
    <NavBar />
    <HeroSection backgroundImage="/images/1001631204_enhanced.jpg.avif" brandName="Birthday" />
    <ProductGrid products={sampleProducts} />
  </main>
);
};

export default BirthdayGifts;
