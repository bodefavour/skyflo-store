import React from "react";
import CollectionPageLayout from "../../components/products/CollectionPageLayout";

const TravelSection: React.FC = () => {
  return (
    <CollectionPageLayout
      title="Travel Companions Built for Long Hauls & Spontaneous Escapes"
      subtitle="Travel Collection"
      description="Navigate every journey with modular luggage, organized carryalls, and weather-ready accessories engineered for movement."
      collectionName="travel"
      backgroundImage="/images/HP_Hero-FullBleed-Desktop_Gucci-SOFTBIT-Mar25-GUCCI-PREFALL-DETAILS-29-INDIGO-LEWIN_001_Default.avif"
      stats={[
        { label: "Featherlight Builds", value: "< 2.1 kg" },
        { label: "Storage Modules", value: "12 Configurations" },
        { label: "Weatherproof Rating", value: "IPX4+" }
      ]}
      highlights={[
        {
          title: "Smart Organization",
          description:
            "Interchangeable packing cubes, hidden tech sleeves, and easy-access compartments keep essentials within reach."
        },
        {
          title: "Durability Standards",
          description:
            "Aircraft-grade aluminum frames, recycled ballistic nylon shells, and stress-tested hardware withstand the toughest itineraries."
        },
        {
          title: "Journey-Ready Details",
          description:
            "360° glide wheels, silent zippers, and QR-enabled tags make every transfer seamless and elevated."
        }
      ]}
    />
  );
};

export default TravelSection;