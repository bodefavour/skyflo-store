import React from "react";
import CollectionPageLayout from "../../components/products/CollectionPageLayout";

const LipGloss: React.FC = () => {
  return (
    <CollectionPageLayout
      title="High-Shine Lip Stories with Skin-Loving Ingredients"
      subtitle="Lip Gloss Collection"
      description="Swipe on cushiony textures infused with botanical oils, glass-like finishes, and longwear pigments designed to flatter every tone."
      collectionName="lipGloss"
      backgroundImage="/images/HP_Hero-FullBleed-Desktop_Gucci-SOFTBIT-Mar25-GUCCI-PREFALL-DETAILS-29-INDIGO-LEWIN_001_Default.jpg"
      stats={[
        { label: "Wear Time", value: "Up to 12H" },
        { label: "Hydration Boost", value: "+48% Moisture" },
        { label: "Clean Shades", value: "30 Vegan Tones" }
      ]}
      highlights={[
        {
          title: "Cushion Comfort",
          description:
            "Silky balms enriched with hyaluronic acid and jojoba to plump and smooth without stickiness."
        },
        {
          title: "Editorial Finishes",
          description:
            "From holographic sheen to soft-focus tints, customize your signature reflective moment any time of day."
        },
        {
          title: "Universal Shades",
          description:
            "Studio-tested on every undertone to ensure the perfect wash of color—from sheer neutrals to bold statement gloss."
        }
      ]}
    />
  );
};

export default LipGloss;