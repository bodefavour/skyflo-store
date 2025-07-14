import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  backgroundImage: string;
  children?: ReactNode;
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundImage,
  children,
  className = "",
}) => {
  return (
    <section
      className={`relative w-full min-h-screen flex items-center justify-center ${className}`}
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center text-white px-4">
        <motion.h1
          className="text-5xl md:text-7xl font-serif tracking-widest uppercase mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          Discover True Luxury
        </motion.h1>
        <motion.p
          className="text-lg md:text-2xl mb-6 font-light max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          Skyflo delivers timeless pieces and curated collections, made to impress.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="px-8 py-3 bg-white text-black font-medium rounded-full transition duration-300 hover:bg-gray-200"
        >
          Explore the Collection
        </motion.button>
        {children}
      </div>
    </section>
  );
};

export default HeroSection;