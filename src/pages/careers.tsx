import React from 'react';

const Careers: React.FC = () => {
    return (
        <div className="careers-page">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-8">Careers</h1>
                
                <div className="max-w-4xl mx-auto">
                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4">Join Our Team</h2>
                        <p className="text-gray-600 mb-6">
                            We're always looking for talented individuals to join our growing team. 
                            Explore opportunities to make an impact and grow your career with us.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-6">Open Positions</h2>
                        <div className="space-y-6">
                            <div className="border rounded-lg p-6">
                                <h3 className="text-xl font-medium mb-2">Frontend Developer</h3>
                                <p className="text-gray-600 mb-4">
                                    Join our development team to build amazing user experiences.
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">React</span>
                                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">TypeScript</span>
                                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Full-time</span>
                                </div>
                                <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                                    Apply Now
                                </button>
                            </div>

                            <div className="border rounded-lg p-6">
                                <h3 className="text-xl font-medium mb-2">Product Manager</h3>
                                <p className="text-gray-600 mb-4">
                                    Lead product strategy and work with cross-functional teams.
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Strategy</span>
                                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Leadership</span>
                                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Full-time</span>
                                </div>
                                <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Why Work With Us?</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-medium mb-2">Competitive Benefits</h3>
                                <p className="text-gray-600">Health insurance, retirement plans, and more.</p>
                            </div>
                            <div>
                                <h3 className="font-medium mb-2">Flexible Work</h3>
                                <p className="text-gray-600">Remote-friendly with flexible hours.</p>
                            </div>
                            <div>
                                <h3 className="font-medium mb-2">Growth Opportunities</h3>
                                <p className="text-gray-600">Professional development and career advancement.</p>
                            </div>
                            <div>
                                <h3 className="font-medium mb-2">Great Culture</h3>
                                <p className="text-gray-600">Collaborative and inclusive work environment.</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Careers;