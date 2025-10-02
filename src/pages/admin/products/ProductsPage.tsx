import { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  deleteProduct,
  fetchAllProductsAdmin,
} from '../../../services/api/products.service';
import { Product } from '../../../types/types';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const records = await fetchAllProductsAdmin();
        setProducts(records);
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((product) => product.id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      setError('Failed to delete product');
      console.error('Error deleting product:', err);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.category ?? '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">Loading products...</div>
      </div>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-[#d4af37]">Product Management</h1>
          <Link to="/admin/products/add">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#d4af37] hover:bg-[#c99b3f] text-black px-6 py-3 rounded font-medium shadow-lg"
            >
              Add New Product
            </motion.button>
          </Link>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search products by name or category..."
            className="w-full p-3 bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-lg focus:outline-none focus:border-[#d4af37] transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] overflow-hidden">
          <div className="grid grid-cols-12 p-4 border-b border-[#2a2a2a] font-medium text-[#d4af37]">
            <div className="col-span-2">Image</div>
            <div className="col-span-3">Name</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-3">Actions</div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              {products.length === 0 ? 'No products found' : 'No matching products found'}
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="grid grid-cols-12 p-4 border-b border-[#2a2a2a] hover:bg-[#2a2a2a]/50 transition-colors"
              >
                <div className="col-span-2 flex items-center">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-[#2a2a2a]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/path-to-fallback-image.jpg';
                      }}
                    />
                  </div>
                </div>
                <div className="col-span-3 flex items-center font-medium text-white">
                  {product.name}
                </div>
                <div className="col-span-2 flex items-center text-gray-400">
                  {product.category ?? 'Unassigned'}
                </div>
                <div className="col-span-2 flex items-center text-[#d4af37]">
                  ${product.price.toFixed(2)}
                </div>
                <div className="col-span-3 flex items-center space-x-3">
                  <Link to={`/admin/products/edit/${product.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-[#d4af37]/10 hover:bg-[#d4af37]/20 text-[#d4af37] px-4 py-2 rounded-lg flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </motion.button>
                  </Link>

                  {deleteConfirm === product.id ? (
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-2 rounded-lg flex items-center"
                      >
                        Confirm
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setDeleteConfirm(null)}
                        className="bg-gray-500/10 hover:bg-gray-500/20 text-gray-400 px-4 py-2 rounded-lg flex items-center"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setDeleteConfirm(product.id)}
                      className="bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-2 rounded-lg flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </motion.button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProductsPage;