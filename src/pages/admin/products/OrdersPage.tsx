import { useEffect, useMemo, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { fetchOrders } from '../../../services/api/orders.service';
import { Order } from '../../../types/types';

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const data = await fetchOrders();
        setOrders(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    if (statusFilter === 'all') {
      return orders;
    }
    return orders.filter((order) => (order.status ?? '').toLowerCase() === statusFilter);
  }, [orders, statusFilter]);

  const getStatusColor = (status: string | undefined) => {
    switch ((status ?? '').toLowerCase()) {
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'processing':
        return 'bg-blue-500/10 text-blue-500';
      case 'completed':
        return 'bg-green-500/10 text-green-500';
      case 'cancelled':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const formatDate = (value?: string) => {
    if (!value) return '—';
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? '—' : date.toLocaleDateString();
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-2xl font-bold">Order Management</h1>
          <div className="flex items-center gap-3">
            <label htmlFor="status-filter" className="text-sm text-gray-300 uppercase tracking-wider">
              Status
            </label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="bg-[#0a0a0a] border border-[#2a2a2a] text-white rounded px-3 py-2 focus:border-[#d4af37]"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-500 text-red-200 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading orders...</div>
        ) : (
          <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] overflow-hidden">
            <div className="grid grid-cols-12 p-4 border-b border-[#2a2a2a] font-medium text-[#d4af37]">
              <div className="col-span-2">Order ID</div>
              <div className="col-span-3">Customer</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-2">Total</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No orders found</div>
            ) : (
              filteredOrders.map((order) => {
                const orderDate = order.placed_at ?? order.created_at;

                return (
                  <div
                    key={order.id}
                    className="grid grid-cols-12 gap-2 p-4 border-b border-[#2a2a2a] hover:bg-[#2a2a2a]/40 transition"
                  >
                    <div className="col-span-2 truncate">{order.id.slice(0, 8)}…</div>
                    <div className="col-span-3 space-y-1">
                      <div>{order.customer_name || 'Guest'}</div>
                      <div className="text-sm text-gray-400">{order.email || '—'}</div>
                    </div>
                    <div className="col-span-2">{formatDate(orderDate)}</div>
                    <div className="col-span-2 font-medium">${order.total.toFixed(2)}</div>
                    <div className="col-span-2">
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                        {order.status ?? 'Pending'}
                      </span>
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <button className="text-[#d4af37] hover:text-[#c99b3f]" aria-label="View order details">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default OrdersPage;