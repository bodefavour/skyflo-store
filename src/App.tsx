// import React from "react";
import { ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import Layout from './components/Layout';
import LandingBody from './components/LandingBody';
import ProductPage from './components/productpage';
import BirthdayGifts from './pages/BirthdayGiftPage';
import TravelSection from './pages/TravelSection';
import ToteBag from './pages/ToteBaSec';
import FashionSection from './pages/FashionSection';
import LipGloss from './pages/LipGloss';
import Décor from './pages/Décor';
import EventsPae from './pages/EventsPae';
import HolidaySpecials from './pages/HolidaySpecials';
import ProductsPage from './pages/admin/products/ProductsPage';
import ProductForm from './pages/admin/products/ProductsForm';
import AdminAuth from './pages/admin/AdminAuth';
import DashboardPage from './pages/admin/DashboardPage';
import OrdersPage from './pages/admin/products/OrdersPage';
import AnalyticsPage from './pages/admin/products/AnalyticsPage';
import CategoriesPage from './pages/admin/products/CategoriesPage';
import UsersPage from './pages/admin/products/UsersPage';
import JewellriesBeads from './pages/BirthdayGiftPage';
import UserLogin from './pages/auth/UserLogin';
import UserSignup from './pages/auth/UserSignup';
import AccountDashboard from './pages/account/AccountDashboard';

const withLayout = (content: ReactNode) => <Layout>{content}</Layout>;

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={withLayout(
            <>
              <HeroSection backgroundImage="/images/1001631204_enhanced.jpg.avif" brandName="SKYFLO" />
              <LandingBody />
            </>
          )}
        />
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
  );
}

export default App;