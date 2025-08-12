import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../Firebase/firebaseConfig';
import AdminLayout from '../../../components/admin/AdminLayout';
import { Link, useNavigate } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsData: Product[] = [];
        querySnapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() } as Product);
        });
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      setProducts(products.filter(product => product.id !== id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Product Management</h1>
          <Link to="/admin/products/add">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Add New Product
            </button>
          </Link>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full p-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="py-4 px-4">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/path-to-fallback-image.jpg';
                      }}
                    />
                  </td>
                  <td className="py-4 px-4 font-medium">{product.name}</td>
                  <td className="py-4 px-4">{product.category}</td>
                  <td className="py-4 px-4">${product.price.toFixed(2)}</td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <Link to={`/admin/products/edit/${product.id}`}>
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">
                          Edit
                        </button>
                      </Link>
                      {deleteConfirm === product.id ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(product.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProductsPage;