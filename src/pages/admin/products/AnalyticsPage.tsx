import { useEffect, useMemo, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { fetchOrders } from '../../../services/ordersService';
import { Order, OrderItem } from '../../../types/types';

const COLORS = ['#d4af37', '#c99b3f', '#bf8b47', '#b47c4f', '#a96e57'];

const AnalyticsPage = () => {
  const [loading, setLoading] = useState(true);
  const [salesData, setSalesData] = useState<any[]>([]);
  const [productData, setProductData] = useState<any[]>([]);
  const [timeRange, setTimeRange] = useState('month');
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchOrders();
        setOrders(data);
      } catch (err) {
        console.error('Error fetching analytics data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const parsedOrders = useMemo(() => {
    return orders.map((order) => {
      const dateValue = order.placed_at ?? order.created_at ?? order.updated_at;
      const parsedDate = dateValue ? new Date(dateValue) : null;

      return {
        ...order,
        parsedDate,
      };
    });
  }, [orders]);

  useEffect(() => {
    const monthlySales = processSalesData(parsedOrders, timeRange);
    setSalesData(monthlySales);

    const topProducts = processProductData(parsedOrders);
    setProductData(topProducts);
  }, [parsedOrders, timeRange]);

  const processSalesData = (ordersWithDate: Array<Order & { parsedDate: Date | null }>, range: string) => {
    // Group orders by time period
    const now = new Date();
    const groups: {[key: string]: { total: number; referenceDate: Date }} = {};

    ordersWithDate.forEach(order => {
      if (!order.parsedDate) {
        return;
      }

      let key;
      let referenceDate = order.parsedDate;
      if (range === 'week') {
        const diffWeeks = Math.floor((now.getTime() - order.parsedDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
        key = diffWeeks <= 0 ? 'This week' : `${diffWeeks}w ago`;
        referenceDate = new Date(order.parsedDate);
        referenceDate.setDate(referenceDate.getDate() - referenceDate.getDay());
      } else if (range === 'day') {
        key = order.parsedDate.toLocaleDateString();
      } else {
        key = order.parsedDate.toLocaleString('default', { month: 'short', year: 'numeric' });
        referenceDate = new Date(order.parsedDate.getFullYear(), order.parsedDate.getMonth(), 1);
      }

      if (!groups[key]) {
        groups[key] = { total: 0, referenceDate };
      }
      groups[key].total += order.total;
    });

    return Object.entries(groups)
      .map(([name, { total, referenceDate }]) => ({ name, value: total, reference: referenceDate }))
      .sort((a, b) => a.reference.getTime() - b.reference.getTime())
      .map(({ name, value }) => ({ name, value }));
  };

  const processProductData = (ordersWithDate: Array<Order & { parsedDate: Date | null }>) => {
    const productCounts: {[key: string]: number} = {};

    ordersWithDate.forEach((order) => {
      order.items.forEach((item: OrderItem) => {
        const productKey = item.productId || 'unknown';
        productCounts[productKey] = (productCounts[productKey] ?? 0) + item.quantity;
      });
    });

    return Object.entries(productCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, value]) => ({ name, value }));
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Sales Analytics</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setTimeRange('day')}
              className={`px-4 py-2 rounded ${timeRange === 'day' ? 'bg-[#d4af37] text-black' : 'bg-[#1a1a1a]'}`}
            >
              Daily
            </button>
            <button
              onClick={() => setTimeRange('week')}
              className={`px-4 py-2 rounded ${timeRange === 'week' ? 'bg-[#d4af37] text-black' : 'bg-[#1a1a1a]'}`}
            >
              Weekly
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`px-4 py-2 rounded ${timeRange === 'month' ? 'bg-[#d4af37] text-black' : 'bg-[#1a1a1a]'}`}
            >
              Monthly
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading analytics...</div>
        ) : (
          <div className="space-y-12">
            <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#2a2a2a]">
              <h2 className="text-xl font-medium mb-6 text-[#d4af37]">Sales Overview</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                    <XAxis dataKey="name" stroke="#d4af37" />
                    <YAxis stroke="#d4af37" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#2a2a2a' }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#d4af37"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                      name="Sales ($)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#2a2a2a]">
                <h2 className="text-xl font-medium mb-6 text-[#d4af37]">Top Products</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={productData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                      <XAxis dataKey="name" stroke="#d4af37" />
                      <YAxis stroke="#d4af37" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#2a2a2a' }}
                      />
                      <Bar dataKey="value" name="Units Sold">
                        {productData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#2a2a2a]">
                <h2 className="text-xl font-medium mb-6 text-[#d4af37]">Sales Distribution</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={productData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                      >
                        {productData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#2a2a2a' }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AnalyticsPage;