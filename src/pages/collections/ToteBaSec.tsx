import React from "react";
import CollectionPageLayout from "../../components/products/CollectionPageLayout";

const ToteBag: React.FC = () => {
  return (
    <CollectionPageLayout
      title="Carryall Totes Refined for Daily Momentum"
      subtitle="Tote Bag Section"
      description="From boardroom polish to weekend ease, discover structured totes, convertible carryalls, and textured statements built to keep up."
      collectionName="toteBags"
      backgroundImage="/images/hero-bg.jpg"
      stats={[
        { label: "Capacity", value: "Up to 24L" },
        { label: "Laptop Ready", value: "Fits 16\" Screens" },
        { label: "Material Mix", value: "Leather & Vegan" }
      ]}
      highlights={[
        {
          title: "Organized Interiors",
          description:
            "Segmented pockets, padded tech sleeves, and detachable pouches keep essentials sorted and scuff-free."
        },
        {
          title: "Weather Guard",
          description:
            "Water-resistant coatings and wipe-clean linings protect valuables from unpredictable commutes."
        },
        {
          title: "Day-to-Night Versatility",
          description:
            "Convertible straps and sculpted silhouettes transition seamlessly from work settings to evening plans."
        }
      ]}
    />
  );
};

export default ToteBag;