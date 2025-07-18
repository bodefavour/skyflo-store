import React, { ReactNode, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface HeroSectionProps {
  backgroundImage: string;
  brandName?: string; 
  tagline?: string;
  children?: ReactNode;
  className?: string;
  ctaText?: string;
  ctaLink?: string;
  logo?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundImage,
  brandName,
  tagline,
  children,
  className = "",
  ctaText = "Explore Collections",
  ctaLink = "/collections",
  logo
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

  return (
    <motion.section 
      className={`relative w-full min-h-screen flex items-center overflow-hidden ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Background Image - Full Bleed */}
      <div className="absolute inset-0 w-full h-full">
        <motion.div 
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>

      {/* Minimal Overlay - Only when needed */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/5"></div>
      
      {/* Logo in Corner - Gucci Style */}
      {logo && (
        <motion.div 
          className="absolute top-8 left-8 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <img 
            src={logo} 
            alt="Brand Logo" 
            className="h-12 w-auto opacity-90"
          />
        </motion.div>
      )}
      
      {/* Main Content - Left Aligned */}
      <div className="relative z-10 max-w-6xl w-full px-8 ml-[8%] mt-[-5%]">
        {/* Brand Name - Bold Statement */}
        {brandName && (
          <motion.div 
            className="mb-6 overflow-hidden"
            variants={childVariants}
          >
            <motion.h1 
              className="font-serif font-normal text-white text-7xl md:text-8xl lg:text-9xl tracking-tight"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {brandName}
            </motion.h1>
          </motion.div>
        )}
        
        {/* Tagline - Minimalist */}
        {tagline && (
          <motion.div 
            className="mb-10 max-w-2xl"
            variants={childVariants}
          >
            <motion.p 
              className="text-xl md:text-2xl font-light text-white leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {tagline}
            </motion.p>
          </motion.div>
        )}
        
        {/* Primary CTA - Subtle Button */}
        <motion.div 
          className="mb-16"
          variants={childVariants}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <a 
              href={ctaLink}
              className="inline-block bg-white hover:bg-gray-100 text-black px-10 py-4 font-medium tracking-wider text-lg transition-all duration-300"
            >
              {ctaText}
            </a>
          </motion.div>
        </motion.div>
        
        {/* Custom Content - Minimal */}
        {children && (
          <motion.div 
            className="text-white"
            variants={childVariants}
          >
            {children}
          </motion.div>
        )}
      </div>
      
      {/* Scrolling Indicator - Minimalist */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <div className="flex flex-col items-center">
          <motion.div
            className="w-6 h-10 flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;