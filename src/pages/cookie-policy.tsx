import React from 'react';

const CookiePolicy: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>
            
            <div className="prose max-w-none">
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
                    <p className="mb-4">
                        Cookies are small text files that are stored on your device when you visit our website. 
                        They help us provide you with a better browsing experience and allow certain features to function properly.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
                    <ul className="list-disc pl-6 mb-4">
                        <li>Essential cookies for website functionality</li>
                        <li>Analytics cookies to understand how you use our site</li>
                        <li>Preference cookies to remember your settings</li>
                        <li>Marketing cookies for personalized advertising</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
                    <p className="mb-4">
                        You can control and manage cookies through your browser settings. 
                        Please note that disabling certain cookies may affect the functionality of our website.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                    <p>
                        If you have any questions about our Cookie Policy, please contact us at privacy@skyflostore.com
                    </p>
                </section>
            </div>
        </div>
    );
};

export default CookiePolicy;