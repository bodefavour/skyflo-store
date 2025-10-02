// import React from "react";
import { ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/common/HeroSection';
import Layout from './components/common/Layout';
import LandingBody from './pages/home/LandingBody';
import ProductPage from './components/products/ProductPage';
import BirthdayGifts from './pages/collections/BirthdayGiftPage';
import TravelSection from './pages/collections/TravelSection';
import ToteBag from './pages/collections/ToteBaSec';
import FashionSection from './pages/collections/FashionSection';
import LipGloss from './pages/collections/LipGloss';
import Décor from './pages/collections/Décor';
import EventsPae from './pages/collections/EventsPae';
import HolidaySpecials from './pages/collections/HolidaySpecials';
import ProductsPage from './pages/admin/products/ProductsPage';
import ProductForm from './pages/admin/products/ProductsForm';
import AdminAuth from './pages/admin/AdminAuth';
import DashboardPage from './pages/admin/DashboardPage';
import OrdersPage from './pages/admin/products/OrdersPage';
import AnalyticsPage from './pages/admin/products/AnalyticsPage';
import CategoriesPage from './pages/admin/products/CategoriesPage';
import UsersPage from './pages/admin/products/UsersPage';
import JewellriesBeads from './pages/collections/JewellriesBeadsPage';
import UserLogin from './pages/auth/UserLogin';
import UserSignup from './pages/auth/UserSignup';
import AccountDashboard from './pages/account/AccountDashboard';
import ProductDetailsPage from './pages/product/ProductDetailsPage';
import CartPage from './pages/cart/CartPage';
import WishlistPage from './pages/wishlist/WishlistPage';
import CheckoutPage from './pages/cart/CheckoutPage';
import OrderConfirmationPage from './pages/cart/OrderConfirmationPage';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { LocaleProvider } from './context/LocaleContext';

const withLayout = (content: ReactNode) => <Layout>{content}</Layout>;

function App() {
  return (
    <LocaleProvider>
      <WishlistProvider>
        <CartProvider>
          <Router>
          <Routes>
            <Route
              path="/"
              element={withLayout(
                <>
                  <HeroSection backgroundImage="/images/1001631204_enhanced.jpg.avif" />
                  <LandingBody />
                </>
              )}
            />
            <Route path="/product/:productId" element={withLayout(<ProductDetailsPage />)} />
            <Route path="/cart" element={withLayout(<CartPage />)} />
            <Route path="/checkout" element={withLayout(<CheckoutPage />)} />
            <Route path="/order-confirmation/:orderId" element={withLayout(<OrderConfirmationPage />)} />
            <Route path="/wishlist" element={withLayout(<WishlistPage />)} />
            <Route path="/birthday-gifts" element={withLayout(<BirthdayGifts />)} />
            <Route path="/Jewellries-Beads" element={withLayout(<JewellriesBeads />)} />
            <Route path="/jewelry-%26-accessories" element={withLayout(<JewellriesBeads />)} />
            <Route path="/Fashion" element={withLayout(<FashionSection />)} />
            <Route path="/fashion-essentials" element={withLayout(<FashionSection />)} />
            <Route path="/travel-collections" element={withLayout(<TravelSection />)} />
            <Route path="/travel-section" element={withLayout(<TravelSection />)} />
            <Route path="/tote-bags" element={withLayout(<ToteBag />)} />
            <Route path="/Lip-gloss" element={withLayout(<LipGloss />)} />
            <Route path="/Decor" element={withLayout(<Décor />)} />
            <Route path="/home-decor" element={withLayout(<Décor />)} />
            <Route path="/event-packages" element={withLayout(<EventsPae />)} />
            <Route path="/Events" element={withLayout(<EventsPae />)} />
            <Route path="/Holiday-Specials" element={withLayout(<HolidaySpecials />)} />
            <Route path="/Product-page" element={withLayout(<ProductPage />)} />
            <Route path="/login" element={withLayout(<UserLogin />)} />
            <Route path="/signup" element={withLayout(<UserSignup />)} />
            <Route path="/account" element={withLayout(<AccountDashboard />)} />

            <Route path="/admin/login" element={<AdminAuth />} />
            <Route path="/admin/dashboard" element={<DashboardPage />} />
            <Route path="/admin/products" element={<ProductsPage />} />
            <Route path="/admin/products/add" element={<ProductForm />} />
            <Route path="/admin/products/edit/:id" element={<ProductForm />} />
            <Route path="/admin/categories" element={<CategoriesPage />} />
            <Route path="/admin/orders" element={<OrdersPage />} />
            <Route path="/admin/analytics" element={<AnalyticsPage />} />
            <Route path="/admin/users" element={<UsersPage />} />
          </Routes>
        </Router>
        </CartProvider>
      </WishlistProvider>
    </LocaleProvider>
  );
}

export default App;