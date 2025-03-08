import React from "react";
import HeroSection from "../components/HeroSection";
import ProductGrid from "../components/ProductGrid";

const birthdayGifts = [
  { id: 1, name: "Luxury Watch", price: 1299.99, image: "/images/watch.jpg" },
  { id: 2, name: "Elegant Necklace", price: 899.99, image: "/images/necklace.jpg" },
  // Add more birthday gift products
];

function BirthdayGiftPage() {
  return (
    <main>
      <HeroSection backgroundImage="/images/birthday-hero.jpg" brandName="Birthday Gifts" />
      <ProductGrid products={birthdayGifts} />
    </main>
  );
}

export default BirthdayGiftPage;
