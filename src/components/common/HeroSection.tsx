import React, { ReactNode, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface HeroSectionProps {
  backgroundImage: string;
  brandName?: string;
  tagline?: string;
  children?: ReactNode;
  className?: string;
  brandNameStyle?: React.CSSProperties;
  ctaText?: string;
  ctaLink?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundImage,
  brandName,
  tagline,
  children,
  className = "",
  ctaText = "Explore Collections",
  ctaLink = "/collections"
}) => {
  const [loaded, setLoaded] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const loadImage = () => {
      const img = new Image();
      img.src = backgroundImage;
      img.onload = () => {
        setLoaded(true);
        controls.start("visible");
      };
    };

    loadImage();
  }, [backgroundImage, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const childVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    float: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.section
      className={`relative w-full min-h-screen flex items-center justify-center overflow-hidden ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <motion.div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/40"></div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-[20%] left-[15%] w-48 h-48 bg-gradient-to-r from-[#d4af37]/10 to-transparent rounded-full blur-xl"
        variants={floatingVariants}
        animate="float"
      />
      <motion.div
        className="absolute bottom-[30%] right-[15%] w-32 h-32 bg-gradient-to-b from-[#d4af37]/10 to-transparent rounded-full blur-xl"
        variants={floatingVariants}
        animate="float"
        style={{ animationDelay: "2s" }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-6xl w-full px-6 sm:px-8 flex flex-col items-center text-center">
        {/* Brand Name */}
        {brandName && (
          <motion.div
            className="text-center mb-6"
            variants={childVariants}
          >
            <motion.div
              className="border-t border-b border-[#d4af37] py-2 px-8 mb-6 text-sm tracking-[0.3em] text-[#d4af37]"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              LUXURY GIFTING
            </motion.div>
            <motion.h1
              className="font-serif font-light text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {brandName}
            </motion.h1>
          </motion.div>
        )}

        {/* Tagline */}
        {tagline && (
          <motion.div
            className="text-center max-w-2xl mb-10"
            variants={childVariants}
          >
            <motion.p
              className="text-lg sm:text-xl md:text-2xl font-light text-gray-200 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              {tagline}
            </motion.p>
          </motion.div>
        )}

        {/* Primary CTA */}
        <motion.div
          className="mb-16"
          variants={childVariants}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <a
              href={ctaLink}
              className="inline-block bg-[#d4af37] hover:bg-[#c99b3f] text-black px-8 py-4 sm:px-10 sm:py-5 font-medium tracking-wider text-base sm:text-lg transition-all duration-300 shadow-xl rounded-full"
            >
              {ctaText}
            </a>
          </motion.div>
        </motion.div>

        {/* Custom Content */}
        {children && (
          <motion.div
            className="text-center text-white"
            variants={childVariants}
          >
            {children}
          </motion.div>
        )}
      </div>

    </motion.section>
  );
};

export default HeroSection;