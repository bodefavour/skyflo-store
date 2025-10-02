import React from "react";
import CollectionPageLayout from "../../components/products/CollectionPageLayout";

const BirthdayGifts: React.FC = () => {
  return (
    <CollectionPageLayout
      title="Curated Birthday Gifts for Every Milestone"
      subtitle="Birthday Collection"
      description="Celebrate the people you love with elevated gifting experiences. From handcrafted keepsakes to luxe celebration kits, every piece is thoughtfully assembled to make the big day unforgettable."
      collectionName="birthdayGifts"
      backgroundImage="/images/HP_Hero-FullBleed-Desktop_Gucci-SOFTBIT-Mar25-GUCCI-PREFALL-DETAILS-29-INDIGO-LEWIN_001_Default.jpg"
      stats={[
        { label: "Express Delivery", value: "Within 48 Hours" },
        { label: "Personalized Bundles", value: "120+ Options" },
        { label: "Gift Wrapping", value: "Complimentary" }
      ]}
      highlights={[
        {
          title: "Curated Celebration Sets",
          description:
            "Pre-styled gift boxes featuring artisanal chocolates, florals, and keepsakes to match any personality or theme."
        },
        {
          title: "Personal Notes & Engraving",
          description:
            "Add a heartfelt message or signature etching to elevate the unboxing experience and make it uniquely theirs."
        },
        {
          title: "Seasonal Limited Releases",
          description:
            "Discover exclusive drops crafted with premium materials, available only for a limited time each season."
        }
      ]}
    />
  );
};

export default BirthdayGifts;