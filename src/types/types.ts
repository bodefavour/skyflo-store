export interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
  category?: string;
  category_id?: string;
  featured?: boolean;
  collection_slug?: string;
  is_published?: boolean;
  stock?: number;
  metadata?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug?: string;
  created_at?: string;
  updated_at?: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customer_name?: string;
  email?: string;
  phone?: string;
  total: number;
  status: string;
  items: OrderItem[];
  placed_at?: string;
  created_at?: string;
  updated_at?: string;
}

export type UserRole = 'admin' | 'staff' | 'user';

export interface UserProfile {
  id: string;
  email: string;
  display_name?: string;
  role: UserRole;
  last_login?: string;
  created_at?: string;
  updated_at?: string;
}

export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  recentOrders: Array<{
    id: string;
    customer_name: string;
    total: number;
    status: string;
    placed_at?: string;
  }>;
}