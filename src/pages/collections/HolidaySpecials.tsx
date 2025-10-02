import React from "react";
import ProductGrid from "../../components/products/ProductGrid";

const HolidaySpecials: React.FC = () => {
  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Holiday Specials
          </h1>
          <p className="text-lg text-gray-600">
            Celebrate the season with our exclusive holiday collection.
          </p>
        </div>

        <ProductGrid
          collectionName="holidaySpecials"
          defaultSort="priceAsc"
          showFilter={true}
        />
      </div>
    </main>
  );
};

export default HolidaySpecials;