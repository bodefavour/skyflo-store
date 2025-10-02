#!/bin/bash

# Update imports script for Skyflo Store
# This script updates all import paths to match the new structure

cd "$(dirname "$0")/src"

echo "Updating import paths..."

# Function to update imports in files
update_imports() {
    local file="$1"
    
    # Update component imports
    sed -i "s|from ['\"]\.\.\/components\/LoadingSpinner['\"]|from '@/components/common'|g" "$file"
    sed -i "s|from ['\"]\.\.\/components\/HeroSection['\"]|from '@/components/common'|g" "$file"
    sed -i "s|from ['\"]\.\.\/components\/Layout['\"]|from '@/components/common'|g" "$file"
    
    sed -i "s|from ['\"]\.\.\/components\/NavBar['\"]|from '@/components/navigation'|g" "$file"
    sed -i "s|from ['\"]\.\.\/components\/Footer['\"]|from '@/components/navigation'|g" "$file"
    
    sed -i "s|from ['\"]\.\.\/components\/Product|from '@/components/products/Product|g" "$file"
    sed -i "s|from ['\"]\.\.\/components\/productpage['\"]|from '@/components/products/ProductPage'|g" "$file"
    
    sed -i "s|from ['\"]\.\.\/components\/LandingBody['\"]|from '@/pages/home/LandingBody'|g" "$file"
    
    # Update service imports
    sed -i "s|from ['\"]\.\.\/services\/productsService['\"]|from '@/services/api/products.service'|g" "$file"
    sed -i "s|from ['\"]\.\.\/\.\.\/services\/productsService['\"]|from '@/services/api/products.service'|g" "$file"
    sed -i "s|from ['\"]\.\.\/\.\.\/\.\.\/services\/productsService['\"]|from '@/services/api/products.service'|g" "$file"
    
    sed -i "s|from ['\"]\.\.\/services\/categoriesService['\"]|from '@/services/api/categories.service'|g" "$file"
    sed -i "s|from ['\"]\.\.\/\.\.\/services\/categoriesService['\"]|from '@/services/api/categories.service'|g" "$file"
    sed -i "s|from ['\"]\.\.\/\.\.\/\.\.\/services\/categoriesService['\"]|from '@/services/api/categories.service'|g" "$file"
    
    sed -i "s|from ['\"]\.\.\/services\/ordersService['\"]|from '@/services/api/orders.service'|g" "$file"
    sed -i "s|from ['\"]\.\.\/\.\.\/services\/ordersService['\"]|from '@/services/api/orders.service'|g" "$file"
    sed -i "s|from ['\"]\.\.\/\.\.\/\.\.\/services\/ordersService['\"]|from '@/services/api/orders.service'|g" "$file"
    
    sed -i "s|from ['\"]\.\.\/services\/usersService['\"]|from '@/services/api/users.service'|g" "$file"
    sed -i "s|from ['\"]\.\.\/\.\.\/services\/usersService['\"]|from '@/services/api/users.service'|g" "$file"
    sed -i "s|from ['\"]\.\.\/\.\.\/\.\.\/services\/usersService['\"]|from '@/services/api/users.service'|g" "$file"
    
    sed -i "s|from ['\"]\.\.\/services\/dashboardService['\"]|from '@/services/api/dashboard.service'|g" "$file"
    sed -i "s|from ['\"]\.\.\/\.\.\/services\/dashboardService['\"]|from '@/services/api/dashboard.service'|g" "$file"
    
    sed -i "s|from ['\"]\.\.\/services\/authService['\"]|from '@/services/auth/auth.service'|g" "$file"
    sed -i "s|from ['\"]\.\.\/\.\.\/services\/authService['\"]|from '@/services/auth/auth.service'|g" "$file"
    
    # Update Supabase config imports
    sed -i "s|from ['\"]\.\.\/Supabase\/supabaseClient['\"]|from '@/config/supabase'|g" "$file"
    sed -i "s|from ['\"]\.\.\/\.\.\/Supabase\/supabaseClient['\"]|from '@/config/supabase'|g" "$file"
    sed -i "s|from ['\"]\.\.\/\.\.\/\.\.\/Supabase\/supabaseClient['\"]|from '@/config/supabase'|g" "$file"
}

# Find and update all TypeScript/TSX files
find . -type f \( -name "*.ts" -o -name "*.tsx" \) -not -path "*/node_modules/*" | while read file; do
    update_imports "$file"
done

echo "Import paths updated!"
echo "Note: Some imports may need manual adjustment. Please run 'npm run build' to check for errors."
