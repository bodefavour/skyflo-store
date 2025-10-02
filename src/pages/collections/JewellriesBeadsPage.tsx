import React from "react";
import CollectionPageLayout from "../../components/products/CollectionPageLayout";

const JewellriesBeads: React.FC = () => {
  return (
    <CollectionPageLayout
      title="Handcrafted Jewellery with Modern Heirloom Energy"
      subtitle="Jewellery & Beaded Bracelets"
      description="Discover luminous metals, hand-strung beadwork, and customizable stacks that transition from daytime ease to evening glow."
      collectionName="jewelry"
      backgroundImage="/images/31343C.svg"
      stats={[
        { label: "Artisans", value: "25 Studio Makers" },
        { label: "Gem Cuts", value: "40+ Variations" },
        { label: "Hypoallergenic", value: "Nickel-Free" }
      ]}
      highlights={[
        {
          title: "Layering Sets",
          description:
            "Curated trios of chains, charms, and beads designed to stack effortlessly while maintaining balanced proportions."
        },
        {
          title: "Materials You Can Trust",
          description:
            "Recycled gold-plated brass, sterling silver, and premium crystals sourced from responsible partners."
        },
        {
          title: "Personal Symbolism",
          description:
            "Add initials, celestial motifs, or birthstones to create a signature piece with story-worthy meaning."
        }
      ]}
    />
  );
};

export default JewellriesBeads;