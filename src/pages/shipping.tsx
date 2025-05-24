import React from 'react';

const Shipping: React.FC = () => {
    return (
        <div className="shipping-page">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Shipping Information</h1>
                
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="shipping-policy">
                        <h2 className="text-2xl font-semibold mb-4">Shipping Policy</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-medium">Standard Shipping</h3>
                                <p className="text-gray-600">5-7 business days - Free on orders over $50</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium">Express Shipping</h3>
                                <p className="text-gray-600">2-3 business days - $9.99</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium">Overnight Shipping</h3>
                                <p className="text-gray-600">1 business day - $19.99</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="shipping-calculator">
                        <h2 className="text-2xl font-semibold mb-4">Calculate Shipping</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">ZIP Code</label>
                                <input 
                                    type="text" 
                                    className="w-full border rounded-md px-3 py-2"
                                    placeholder="Enter ZIP code"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Weight (lbs)</label>
                                <input 
                                    type="number" 
                                    className="w-full border rounded-md px-3 py-2"
                                    placeholder="Package weight"
                                />
                            </div>
                            <button 
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                            >
                                Calculate
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shipping;