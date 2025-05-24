import React from 'react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="privacy-policy">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
                
                <div className="prose max-w-none">
                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                        <p className="mb-4">
                            We collect information you provide directly to us, such as when you create an account,
                            make a purchase, or contact us for support.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                        <p className="mb-4">
                            We use the information we collect to provide, maintain, and improve our services,
                            process transactions, and communicate with you.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
                        <p className="mb-4">
                            We do not sell, trade, or otherwise transfer your personal information to third parties
                            without your consent, except as described in this policy.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at
                            privacy@skyflostore.com
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;