import React from "react";
import CollectionPageLayout from "../../components/products/CollectionPageLayout";

const Décor: React.FC = () => {
  return (
    <CollectionPageLayout
      title="Atmospheric Décor to Reimagine Every Corner"
      subtitle="Home Décor"
      description="Layer sculptural silhouettes, artisanal textures, and ambient lighting to create spaces that feel tailored to your story."
      collectionName="decor"
      backgroundImage="/images/hero-bg.jpg"
      stats={[
        { label: "Artisan Studios", value: "18 Collaborators" },
        { label: "Sustainable Materials", value: "80% Sourced" },
        { label: "Mood Lighting", value: "12 Signature Palettes" }
      ]}
      highlights={[
        {
          title: "Layered Textures",
          description:
            "Handwoven textiles, marble accents, and rich woods invite depth and warmth into every living space."
        },
        {
          title: "Modular Styling",
          description:
            "Mix-and-match décor capsules designed to refresh shelves, consoles, and tabletops through the seasons."
        },
        {
          title: "Artful Illumination",
          description:
            "Curated lighting moments featuring diffused glass, brass finishes, and adjustable glow for perfect ambience."
        }
      ]}
    />
  );
};

export default Décor;