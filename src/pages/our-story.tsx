import React from 'react';

const OurStory: React.FC = () => {
    return (
        <div className="our-story-page">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-8">Our Story</h1>
                
                <div className="max-w-4xl mx-auto">
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">About Skyflo Store</h2>
                        <p className="text-lg leading-relaxed mb-4">
                            Welcome to Skyflo Store, where innovation meets excellence. Our journey began with a simple vision: 
                            to create exceptional products that enhance everyday life.
                        </p>
                        <p className="text-lg leading-relaxed">
                            Founded by a team of passionate entrepreneurs, we've grown from a small startup to a trusted brand 
                            that serves customers worldwide.
                        </p>
                    </section>
                    
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                        <p className="text-lg leading-relaxed">
                            We're committed to delivering high-quality products while maintaining sustainable practices 
                            and fostering meaningful connections with our community.
                        </p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Looking Forward</h2>
                        <p className="text-lg leading-relaxed">
                            As we continue to grow, we remain dedicated to innovation, customer satisfaction, 
                            and making a positive impact in the world.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default OurStory;