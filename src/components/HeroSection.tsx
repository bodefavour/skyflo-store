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
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.section 
      className={`relative w-full min-h-screen flex flex-col items-center overflow-hidden ${className}`}
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/40"></div>
      
      {/* Floating Elements */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-[#d4af37]/10 to-transparent rounded-full blur-xl"
        variants={floatingVariants}
        animate="float"
      />
      <motion.div 
        className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-gradient-to-b from-[#d4af37]/10 to-transparent rounded-full blur-xl"
        variants={floatingVariants}
        animate="float"
        style={{ animationDelay: "2s" }}
      />
      
      {/* Brand Name */}
      {brandName && (
        <motion.div 
          className="absolute top-[15%] left-1/2 transform -translate-x-1/2 text-center z-10"
          variants={childVariants}
        >
          <motion.div 
            className="border-t border-b border-[#d4af37] py-2 px-8 mb-4 text-sm tracking-widest text-[#d4af37]"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            LUXURY GIFTING EXPERIENCE
          </motion.div>
          <motion.h1 
            className="font-serif font-light text-white text-5xl md:text-7xl lg:text-8xl tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            {brandName}
          </motion.h1>
        </motion.div>
      )}
      
      {/* Tagline */}
      {tagline && (
        <motion.div 
          className="absolute top-[35%] left-1/2 transform -translate-x-1/2 text-center z-10 max-w-3xl px-4"
          variants={childVariants}
        >
          <motion.p 
            className="text-xl md:text-2xl font-light text-white leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            {tagline}
          </motion.p>
        </motion.div>
      )}
      
      {/* Primary CTA */}
      <motion.div 
        className="absolute bottom-[25%] left-1/2 transform -translate-x-1/2 z-10 text-center"
        variants={childVariants}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <a 
            href={ctaLink}
            className="inline-block bg-[#d4af37] hover:bg-[#c99b3f] text-black px-8 py-4 font-medium tracking-wider text-lg transition-all duration-300 shadow-lg rounded-full"
          >
            {ctaText}
          </a>
        </motion.div>
      </motion.div>
      
      {/* Custom Content */}
      <motion.div 
        className="absolute bottom-[15%] left-1/2 transform -translate-x-1/2 text-center text-white z-10 w-full px-4"
        variants={childVariants}
      >
        {children}
      </motion.div>
      
      {/* Scrolling Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div className="flex flex-col items-center">
          <span className="text-white text-sm mb-2">Scroll to Discover</span>
          <div className="w-6 h-10 rounded-full border-2 border-[#d4af37] flex justify-center p-1">
            <motion.div
              className="w-2 h-2 bg-[#d4af37] rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;