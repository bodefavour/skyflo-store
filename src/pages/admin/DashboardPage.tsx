import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { fetchDashboardStats } from '../../services/dashboardService';
import { DashboardStats } from '../../types/types';

const DashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const dashboardStats = await fetchDashboardStats();
        setStats(dashboardStats);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard');
      }
    };

    load();
  }, []);

  if (error) {
    return (
      <AdminLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-900/20 border border-red-700 text-red-200 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!stats) {
    return (
      <AdminLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-400">Loading dashboard...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Total Products" value={stats.totalProducts} icon="📦" />
          <StatCard title="Total Orders" value={stats.totalOrders} icon="🛒" />
          <StatCard title="Total Revenue" value={`$${stats.totalRevenue.toFixed(2)}`} icon="💰" />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          {stats.recentOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">Order ID</th>
                    <th className="text-left py-2 px-4">Customer</th>
                    <th className="text-left py-2 px-4">Amount</th>
                    <th className="text-left py-2 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.map(order => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{order.id.slice(0, 8)}...</td>
                      <td className="py-3 px-4">{order.customer_name || 'N/A'}</td>
                      <td className="py-3 px-4">${order.total?.toFixed(2) || '0.00'}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                          }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No recent orders found</p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

const StatCard = ({ title, value, icon }: { title: string; value: string | number; icon: string }) => (
  <div className="bg-white rounded-lg shadow p-6 flex items-center">
    <div className="text-3xl mr-4">{icon}</div>
    <div>
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

export default DashboardPage;