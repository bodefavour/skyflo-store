#!/bin/bash

# Restructure script for Skyflo Store
# This script moves files to their new organized locations

cd "$(dirname "$0")/src"

echo "Starting file restructure..."

# Move common components
echo "Moving common components..."
mv components/LoadingSpinner.tsx components/common/ 2>/dev/null
mv components/HeroSection.tsx components/common/ 2>/dev/null
mv components/Layout.tsx components/common/ 2>/dev/null

# Move navigation components
echo "Moving navigation components..."
mv components/NavBar.tsx components/navigation/ 2>/dev/null
mv components/Footer.tsx components/navigation/ 2>/dev/null

# Move product components
echo "Moving product components..."
mv components/ProductCarousel.tsx components/products/ 2>/dev/null
mv components/ProductDetails.tsx components/products/ 2>/dev/null
mv components/ProductFilter.tsx components/products/ 2>/dev/null
mv components/ProductGrid.tsx components/products/ 2>/dev/null
mv components/ProductImages.tsx components/products/ 2>/dev/null
mv components/productpage.tsx components/products/ProductPage.tsx 2>/dev/null

# Move home/landing page
echo "Moving home page..."
mv components/LandingBody.tsx pages/home/ 2>/dev/null

# Move collection pages
echo "Moving collection pages..."
mv pages/BirthdayGiftPage.tsx pages/collections/ 2>/dev/null
mv pages/FashionSection.tsx pages/collections/ 2>/dev/null
mv pages/TravelSection.tsx pages/collections/ 2>/dev/null
mv pages/JewellriesBeadsPage.tsx pages/collections/ 2>/dev/null
mv pages/LipGloss.tsx pages/collections/ 2>/dev/null
mv pages/Décor.tsx pages/collections/ 2>/dev/null
mv pages/ToteBaSec.tsx pages/collections/ 2>/dev/null
mv pages/EventsPae.tsx pages/collections/ 2>/dev/null
mv pages/HolidaySpecials.tsx pages/collections/ 2>/dev/null

# Move legal pages
echo "Moving legal pages..."
mv pages/privacy-policy.tsx pages/legal/ 2>/dev/null
mv pages/terms-of-service.tsx pages/legal/ 2>/dev/null
mv pages/cookie-policy.tsx pages/legal/ 2>/dev/null
mv pages/returns.tsx pages/legal/ 2>/dev/null
mv pages/shipping.tsx pages/legal/ 2>/dev/null

# Move info pages
echo "Moving info pages..."
mv pages/our-story.tsx pages/info/ 2>/dev/null
mv pages/careers.tsx pages/info/ 2>/dev/null
mv pages/contact-us.tsx pages/info/ 2>/dev/null
mv pages/faq.tsx pages/info/ 2>/dev/null
mv pages/accessibility.tsx pages/info/ 2>/dev/null
mv pages/sustainability.tsx pages/info/ 2>/dev/null

# Move and rename services
echo "Moving services..."
mv services/productsService.ts services/api/products.service.ts 2>/dev/null
mv services/categoriesService.ts services/api/categories.service.ts 2>/dev/null
mv services/ordersService.ts services/api/orders.service.ts 2>/dev/null
mv services/usersService.ts services/api/users.service.ts 2>/dev/null
mv services/dashboardService.ts services/api/dashboard.service.ts 2>/dev/null
mv services/authService.ts services/auth/auth.service.ts 2>/dev/null

# Move config files
echo "Moving config files..."
mv Supabase/supabaseClient.ts config/supabase.ts 2>/dev/null

echo "File restructure complete!"
echo "Please run the update-imports script next to fix all import paths."
