import React from "react";
import NavBar from "./NavBar";
import Footer from './Footer';
const ProductPage: React.FC = () => {
    return (
        <div className="product-page">
            <header className="product-header">
                <h1>Product Name</h1>
                <p className="product-tagline">Discover the best products for your needs</p>
            </header>

            <section className="product-details">
                <div className="product-image">
                    <img src="/path/to/product-image.jpg" alt="Product" />
                </div>
                <div className="product-info">
                    <h2>Product Title</h2>
                    <p className="product-description">
                        This is a detailed description of the product. Highlight its features, benefits, and why it stands out.
                    </p>
                    <p className="product-price">$99.99</p>
                    <button className="add-to-cart-btn">Add to Cart</button>
                </div>
            </section>

            <section className="related-products">
                <h3>Related Products</h3>
                <div className="related-products-list">
                    <div className="related-product-item">
                        <img src="/path/to/related-product1.jpg" alt="Related Product 1" />
                        <p>Related Product 1</p>
                    </div>
                    <div className="related-product-item">
                        <img src="/path/to/related-product2.jpg" alt="Related Product 2" />
                        <p>Related Product 2</p>
                    </div>
                    <div className="related-product-item">
                        <img src="/path/to/related-product3.jpg" alt="Related Product 3" />
                        <p>Related Product 3</p>
                    </div>
                </div>
            </section>

            <footer className="product-footer">
                <p>&copy; 2023 Skyflo Store. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default ProductPage;