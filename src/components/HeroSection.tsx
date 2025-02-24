import React from "react";

interface HeroSectionProps {
  backgroundImage: string;
  brandName?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundImage,
  brandName = "SKYFLO",
}) => {
  return (
    <section
      className="absolute inset-0 w-full h-full bg-cover bg-top"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
      }}
    >
      {/* Dark overlay to make text stand out */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* Main hero text */}
      <h1
        className="relative z-10 text-[10rem] md:text-[14rem] font-extralight uppercase tracking-[0.4em] leading-[1.2] font-phudu text-center"
        style={{
          position: "absolute",
          top: "15%", // Adjusted to be in upper 1/3rd
          left: "50%",
          transform: "translateX(-50%)",
          whiteSpace: "nowrap",
        }}
      >
        {brandName}
      </h1>
    </section>
  );
};

export default HeroSection;