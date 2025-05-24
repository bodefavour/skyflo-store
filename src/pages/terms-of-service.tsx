import React from 'react';

const TermsOfService : React.FC = () => {
    return (
        <div className="contact-us-page">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
                
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                ></textarea>
                            </div>
                            
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                    
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                        <div className="space-y-3">
                            <div>
                                <h3 className="font-medium">Address</h3>
                                <p className="text-gray-600">123 Store Street, City, State 12345</p>
                            </div>
                            
                            <div>
                                <h3 className="font-medium">Phone</h3>
                                <p className="text-gray-600">+1 (555) 123-4567</p>
                            </div>
                            
                            <div>
                                <h3 className="font-medium">Email</h3>
                                <p className="text-gray-600">contact@skyflostore.com</p>
                            </div>
                            
                            <div>
                                <h3 className="font-medium">Business Hours</h3>
                                <p className="text-gray-600">
                                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                                    Saturday: 10:00 AM - 4:00 PM<br />
                                    Sunday: Closed
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;