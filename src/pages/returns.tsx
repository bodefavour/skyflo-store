import React from 'react';

const ReturnsPage: React.FC = () => {
    return (
        <div className="returns-page">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Returns & Exchanges</h1>
                
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="returns-policy">
                        <h2 className="text-2xl font-semibold mb-4">Return Policy</h2>
                        <div className="space-y-4">
                            <p>We accept returns within 30 days of purchase.</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Items must be in original condition</li>
                                <li>Original packaging required</li>
                                <li>Receipt or proof of purchase needed</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="return-form">
                        <h2 className="text-2xl font-semibold mb-4">Start a Return</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Order Number</label>
                                <input 
                                    type="text" 
                                    className="w-full p-2 border border-gray-300 rounded"
                                    placeholder="Enter your order number"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <input 
                                    type="email" 
                                    className="w-full p-2 border border-gray-300 rounded"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <button 
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                            >
                                Submit Return Request
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReturnsPage;