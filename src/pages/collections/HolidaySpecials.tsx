import React from "react";
import CollectionPageLayout from "../../components/products/CollectionPageLayout";

const HolidaySpecials: React.FC = () => {
  return (
    <CollectionPageLayout
      title="Festive Statements Wrapped in Signature Skyflo Glow"
      subtitle="Holiday Specials"
      description="Limited-edition décor, gifting, and party accents drenched in metallic hues, lush textures, and celebratory sparkle."
      collectionName="holidaySpecials"
      backgroundImage="/images/hero-bg.jpg"
      stats={[
        { label: "Limited Runs", value: "Seasonal Drops" },
        { label: "Gift Bundles", value: "45 Curated Sets" },
        { label: "Packaging", value: "Ready-to-Gift" }
      ]}
      highlights={[
        {
          title: "Glimmering Finishes",
          description:
            "Metallic ornaments, velvet ribbons, and glassware designed to layer instant holiday drama into your space."
        },
        {
          title: "Party-Ready Essentials",
          description:
            "Tablescape edit featuring centerpiece accents, candle trios, and serveware primed for gatherings."
        },
        {
          title: "Curated Gifting",
          description:
            "Pre-wrapped sets with handwritten note cards, seasonal scents, and luxe keepsakes for effortless giving."
        }
      ]}
    />
  );
};

export default HolidaySpecials;