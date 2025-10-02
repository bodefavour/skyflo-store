import React from "react";
import CollectionPageLayout from "../../components/products/CollectionPageLayout";

const EventsPae: React.FC = () => {
  return (
    <CollectionPageLayout
      title="Event Concepts Curated for Iconic Moments"
      subtitle="Event Packages"
      description="Choose immersive styling kits, floral edits, and experiential décor designed by our planners to transform every celebration."
      collectionName="events"
      backgroundImage="/images/hero-bg.jpg"
      stats={[
        { label: "Event Styles", value: "15 Signature Themes" },
        { label: "Setup Support", value: "Concierge Ready" },
        { label: "Custom Builds", value: "48 Hour Turnaround" }
      ]}
      highlights={[
        {
          title: "Complete Atmosphere Kits",
          description:
            "Luxe backdrops, statement arrangements, and table styling delivered with an intuitive setup guide."
        },
        {
          title: "Personal Planner Notes",
          description:
            "Styling tips from our events team, including layout diagrams, lighting cues, and playlist inspiration."
        },
        {
          title: "On-Demand Customization",
          description:
            "Swap color palettes, add signage, or integrate branded elements to ensure your celebration feels personal."
        }
      ]}
    />
  );
};

export default EventsPae;