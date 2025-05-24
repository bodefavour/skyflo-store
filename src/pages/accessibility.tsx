import React from 'react';

const Accessibility: React.FC = () => {
    return (
        <div className="accessibility-page">
            <header>
                <h1>Accessibility Statement</h1>
            </header>
            
            <main>
                <section>
                    <h2>Our Commitment</h2>
                    <p>
                        Skyflo Store is committed to ensuring digital accessibility for people with disabilities. 
                        We are continually improving the user experience for everyone.
                    </p>
                </section>

                <section>
                    <h2>Accessibility Features</h2>
                    <ul>
                        <li>Keyboard navigation support</li>
                        <li>Screen reader compatibility</li>
                        <li>High contrast mode</li>
                        <li>Scalable text and images</li>
                        <li>Alternative text for images</li>
                    </ul>
                </section>

                <section>
                    <h2>Contact Us</h2>
                    <p>
                        If you encounter any accessibility barriers, please contact us at:
                    </p>
                    <address>
                        Email: <a href="mailto:accessibility@skyflostore.com">accessibility@skyflostore.com</a>
                    </address>
                </section>
            </main>
        </div>
    );
};

export default Accessibility;