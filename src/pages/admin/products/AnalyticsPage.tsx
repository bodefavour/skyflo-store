import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../Firebase/firebaseConfig';
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

const AnalyticsPage = () => {
  const [loading, setLoading] = useState(true);
  const [salesData, setSalesData] = useState<any[]>([]);
  const [productData, setProductData] = useState<any[]>([]);
  const [timeRange, setTimeRange] = useState('month');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch orders data
        const ordersQuery = query(collection(db, 'orders'));
        const ordersSnapshot = await getDocs(ordersQuery);
        const orders = ordersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: new Date(doc.data().date)
        }));

        // Process sales data
        const monthlySales = processSalesData(orders, timeRange);
        setSalesData(monthlySales);

        // Process product data
        const topProducts = processProductData(orders);
        setProductData(topProducts);

      } catch (err) {
        console.error('Error fetching analytics data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange]);

  const processSalesData = (orders: any[], range: string) => {
    // Group orders by time period
    const now = new Date();
    const groups: {[key: string]: number} = {};

    orders.forEach(order => {
      let key;
      if (range === 'week') {
        key = `Week ${Math.ceil((now.getTime() - order.date.getTime()) / (7 * 24 * 60 * 60 * 1000))}`;
      } else if (range === 'day') {
        key = order.date.toLocaleDateString();
      } else {
        key = order.date.toLocaleString('default', { month: 'short' });
      }

      if (!groups[key]) {
        groups[key] = 0;
      }
      groups[key] += order.total;
    });

    return Object.entries(groups).map(([name, value]) => ({ name, value }));
  };

  const processProductData = (orders: any[]) => {
    const productCounts: {[key: string]: number} = {};

    orders.forEach(order => {
      order.items.forEach((item: any) => {
        if (!productCounts[item.productId]) {
          productCounts[item.productId] = 0;
        }
        productCounts[item.productId] += item.quantity;
      });
    });

    return Object.entries(productCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, value]) => ({ name, value }));
  };

  const COLORS = ['#d4af37', '#c99b3f', '#bf8b47', '#b47c4f', '#a96e57'];

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