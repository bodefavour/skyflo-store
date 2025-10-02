import { supabase } from '../Supabase/supabaseClient';
import { DashboardStats } from '../types/types';
import { fetchRecentOrders } from './ordersService';

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const [{ count: productsCount, error: productsError }, { count: ordersCount, error: ordersError }] = await Promise.all([
    supabase.from('products').select('id', { count: 'exact', head: true }),
    supabase.from('orders').select('id', { count: 'exact', head: true }),
  ]);

  if (productsError) {
    throw new Error(productsError.message);
  }
  if (ordersError) {
    throw new Error(ordersError.message);
  }

  const { data: revenueRows, error: revenueError } = await supabase
    .from('orders')
    .select('total');

  if (revenueError) {
    throw new Error(revenueError.message);
  }

  const totalRevenue = (revenueRows ?? []).reduce((sum, row) => sum + Number(row.total ?? 0), 0);
  const recentOrdersRaw = await fetchRecentOrders(5);

  return {
    totalProducts: productsCount ?? 0,
    totalOrders: ordersCount ?? 0,
    totalRevenue,
    recentOrders: recentOrdersRaw.map((order) => ({
      id: order.id,
      customer_name: order.customer_name ?? 'N/A',
      total: order.total,
      status: order.status,
      placed_at: order.placed_at,
    })),
  };
}
