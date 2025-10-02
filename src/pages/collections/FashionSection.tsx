import React from "react";
import CollectionPageLayout from "../../components/products/CollectionPageLayout";

const FashionSection: React.FC = () => {
  return (
    <CollectionPageLayout
      title="Statement Pieces Crafted for Effortless Luxury"
      subtitle="Fashion Section"
      description="Build a wardrobe that moves with you. Explore tailored silhouettes, couture-inspired detailing, and elevated essentials curated for modern icons."
      collectionName="fashion"
      backgroundImage="/images/hero-bg.jpg"
      stats={[
        { label: "New Arrivals", value: "Weekly Drops" },
        { label: "Curated Designers", value: "35+ Labels" },
        { label: "Premium Fabrics", value: "100% Authenticated" }
      ]}
      highlights={[
        {
          title: "Editorial-Level Styling",
          description:
            "Layered looks designed by in-house stylists featuring sculpted tailoring, satin finishes, and refined proportions."
        },
        {
          title: "Made to Move",
          description:
            "Adaptive fits, breathable linings, and temperature balancing textiles ensure comfort without compromising polish."
        },
        {
          title: "Iconic Accessories",
          description:
            "Complete your look with sculptural jewelry, artisan belts, and limited edition handbags in signature finishes."
        }
      ]}
    />
  );
};

export default FashionSection;