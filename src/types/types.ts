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
  name?: string;
  image?: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface PaymentDetails {
  method: 'card' | 'bank' | 'cod';
  status: 'pending' | 'paid' | 'failed';
  reference?: string;
}

export interface Order {
  id: string;
  customer_name?: string;
  email?: string;
  phone?: string;
  total: number;
  status: string;
  items: OrderItem[];
  shipping_address?: ShippingAddress;
  payment?: PaymentDetails;
  subtotal?: number;
  shipping_fee?: number;
  tax?: number;
  placed_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateOrderPayload {
  customer_name: string;
  email: string;
  phone: string;
  shipping_address: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  shipping_fee: number;
  tax: number;
  total: number;
  payment: PaymentDetails;
  notes?: string;
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