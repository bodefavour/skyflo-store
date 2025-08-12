import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../Firebase/firebaseConfig';
import AdminLayout from '../../../components/admin/AdminLayout';

interface Order {
  id: string;
  customerName: string;
  email: string;
  total: number;
  status: string;
  date: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'orders'));
        const ordersData: Order[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        } as Order));
        setOrders(ordersData);
      } catch (err) {
        setError('Failed to fetch orders');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'completed':
        return 'bg-green-500/10 text-green-500';
      case 'cancelled':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Order Management</h1>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">Loading orders...</div>
        ) : (
          <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] overflow-hidden">
            <div className="grid grid-cols-12 p-4 border-b border-[#2a2a2a] font-medium text-[#d4af37]">
              <div className="col-span-2">Order ID</div>
              <div className="col-span-3">Customer</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-2">Total</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1">Actions</div>
            </div>
            
            {orders.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No orders found</div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="grid grid-cols-12 p-4 border-b border-[#2a2a2a] hover:bg-[#2a2a2a]/50">
                  <div className="col-span-2 truncate">{order.id.slice(0, 8)}...</div>
                  <div className="col-span-3">
                    <div>{order.customerName}</div>
                    <div className="text-sm text-gray-400">{order.email}</div>
                  </div>
                  <div className="col-span-2">{new Date(order.date).toLocaleDateString()}</div>
                  <div className="col-span-2">${order.total.toFixed(2)}</div>
                  <div className="col-span-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <button className="text-[#d4af37] hover:text-[#c99b3f]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default OrdersPage;