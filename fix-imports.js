const fs = require('fs');
const path = require('path');

const importMappings = {
  // Component mappings
  "from './components/LoadingSpinner'": "from './components/common/LoadingSpinner'",
  "from '../components/LoadingSpinner'": "from '../components/common/LoadingSpinner'",
  "from '../../components/LoadingSpinner'": "from '../../components/common/LoadingSpinner'",
  "from '../../../components/LoadingSpinner'": "from '../../../components/common/LoadingSpinner'",
  
  "from './components/HeroSection'": "from './components/common/HeroSection'",
  "from '../components/HeroSection'": "from '../components/common/HeroSection'",
  "from '../../components/HeroSection'": "from '../../components/common/HeroSection'",
  "from '../../../components/HeroSection'": "from '../../../components/common/HeroSection'",
  
  "from './components/Layout'": "from './components/common/Layout'",
  "from '../components/Layout'": "from '../components/common/Layout'",
  "from '../../components/Layout'": "from '../../components/common/Layout'",
  "from '../../../components/Layout'": "from '../../../components/common/Layout'",
  
  "from './components/NavBar'": "from './components/navigation/NavBar'",
  "from '../components/NavBar'": "from '../components/navigation/NavBar'",
  "from '../../components/NavBar'": "from '../../components/navigation/NavBar'",
  
  "from './components/Footer'": "from './components/navigation/Footer'",
  "from '../components/Footer'": "from '../components/navigation/Footer'",
  "from '../../components/Footer'": "from '../../components/navigation/Footer'",
  
  "from './components/ProductCarousel'": "from './components/products/ProductCarousel'",
  "from '../components/ProductCarousel'": "from '../components/products/ProductCarousel'",
  "from '../../components/ProductCarousel'": "from '../../components/products/ProductCarousel'",
  
  "from './components/ProductDetails'": "from './components/products/ProductDetails'",
  "from '../components/ProductDetails'": "from '../components/products/ProductDetails'",
  "from '../../components/ProductDetails'": "from '../../components/products/ProductDetails'",
  
  "from './components/ProductFilter'": "from './components/products/ProductFilter'",
  "from '../components/ProductFilter'": "from '../components/products/ProductFilter'",
  "from '../../components/ProductFilter'": "from '../../components/products/ProductFilter'",
  
  "from './components/ProductGrid'": "from './components/products/ProductGrid'",
  "from '../components/ProductGrid'": "from '../components/products/ProductGrid'",
  "from '../../components/ProductGrid'": "from '../../components/products/ProductGrid'",
  
  "from './components/ProductImages'": "from './components/products/ProductImages'",
  "from '../components/ProductImages'": "from '../components/products/ProductImages'",
  "from '../../components/ProductImages'": "from '../../components/products/ProductImages'",
  
  "from './components/productpage'": "from './components/products/ProductPage'",
  "from '../components/productpage'": "from '../components/products/ProductPage'",
  "from '../../components/productpage'": "from '../../components/products/ProductPage'",
  
  "from './components/LandingBody'": "from './pages/home/LandingBody'",
  "from '../components/LandingBody'": "from '../pages/home/LandingBody'",
  "from '../../components/LandingBody'": "from '../../pages/home/LandingBody'",
  
  // Service mappings
  "from './services/productsService'": "from './services/api/products.service'",
  "from '../services/productsService'": "from '../services/api/products.service'",
  "from '../../services/productsService'": "from '../../services/api/products.service'",
  "from '../../../services/productsService'": "from '../../../services/api/products.service'",
  
  "from './services/categoriesService'": "from './services/api/categories.service'",
  "from '../services/categoriesService'": "from '../services/api/categories.service'",
  "from '../../services/categoriesService'": "from '../../services/api/categories.service'",
  "from '../../../services/categoriesService'": "from '../../../services/api/categories.service'",
  
  "from './services/ordersService'": "from './services/api/orders.service'",
  "from '../services/ordersService'": "from '../services/api/orders.service'",
  "from '../../services/ordersService'": "from '../../services/api/orders.service'",
  "from '../../../services/ordersService'": "from '../../../services/api/orders.service'",
  
  "from './services/usersService'": "from './services/api/users.service'",
  "from '../services/usersService'": "from '../services/api/users.service'",
  "from '../../services/usersService'": "from '../../services/api/users.service'",
  "from '../../../services/usersService'": "from '../../../services/api/users.service'",
  
  "from './services/dashboardService'": "from './services/api/dashboard.service'",
  "from '../services/dashboardService'": "from '../services/api/dashboard.service'",
  "from '../../services/dashboardService'": "from '../../services/api/dashboard.service'",
  "from '../../../services/dashboardService'": "from '../../../services/api/dashboard.service'",
  
  "from './services/authService'": "from './services/auth/auth.service'",
  "from '../services/authService'": "from '../services/auth/auth.service'",
  "from '../../services/authService'": "from '../../services/auth/auth.service'",
  "from '../../../services/authService'": "from '../../../services/auth/auth.service'",
  
  // Config mappings
  "from './Supabase/supabaseClient'": "from './config/supabase'",
  "from '../Supabase/supabaseClient'": "from '../config/supabase'",
  "from '../../Supabase/supabaseClient'": "from '../../config/supabase'",
  "from '../../../Supabase/supabaseClient'": "from '../../../config/supabase'",
};

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;
  
  Object.entries(importMappings).forEach(([oldPath, newPath]) => {
    const singleQuotePattern = oldPath.replace(/'/g, "'");
    const doubleQuotePattern = oldPath.replace(/'/g, '"');
    
    if (content.includes(oldPath) || content.includes(doubleQuotePattern)) {
      content = content.replace(new RegExp(oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newPath);
      content = content.replace(new RegExp(doubleQuotePattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newPath.replace(/'/g, '"'));
      updated = true;
    }
  });
  
  if (updated) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!filePath.includes('node_modules') && !filePath.includes('.git')) {
        walkDir(filePath, callback);
      }
    } else if (filePath.match(/\.(ts|tsx)$/)) {
      callback(filePath);
    }
  });
}

console.log('Starting import update...');
walkDir(path.join(__dirname, 'src'), updateFile);
console.log('Import update complete!');
