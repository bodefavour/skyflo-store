import React from "react";
import NavBar from "../src/components/NavBar";
import HeroSection from "../src/components/HeroSection";
import ProductGrid from "../src/components/ProductGrid";

export default function Home() {
  const sampleProducts = [
    { id: 1, name: "Red Gown", price: 599.99, image: "/images/red-gown.jpg" },
    { id: 2, name: "Royal Crown", price: 299.99, image: "/images/crown.jpg" },
    // ... add more
  ];

  return (
    <main>
      <NavBar />
      <HeroSection backgroundImage="/images/hero-bg.jpg" brandName="SKYFLO" />
      <ProductGrid products={sampleProducts} />
    </main>
  );
}