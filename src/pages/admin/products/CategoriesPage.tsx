import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../Firebase/firebaseConfig';
import AdminLayout from '../../../components/admin/AdminLayout';

const CategoriesPage = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'categories'));
        const categoriesData = querySnapshot.docs.map(doc => doc.data().name);
        setCategories(categoriesData);
      } catch (err) {
        setError('Failed to fetch categories');
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    
    try {
      setLoading(true);
      await addDoc(collection(db, 'categories'), { name: newCategory.trim() });
      setCategories([...categories, newCategory.trim()]);
      setNewCategory('');
    } catch (err) {
      setError('Failed to add category');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (category: string) => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'categories'));
      const docToDelete = querySnapshot.docs.find(doc => doc.data().name === category);
      
      if (docToDelete) {
        await deleteDoc(doc(db, 'categories', docToDelete.id));
        setCategories(categories.filter(cat => cat !== category));
      }
    } catch (err) {
      setError('Failed to delete category');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Product Categories</h1>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="max-w-2xl bg-[#1a1a1a] p-6 rounded-lg border border-[#2a2a2a] mb-8">
          <h2 className="text-xl font-medium mb-4 text-[#d4af37]">Add New Category</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="flex-grow bg-[#0a0a0a] border border-[#2a2a2a] text-white p-3 rounded focus:border-[#d4af37] focus:outline-none"
              placeholder="Category name"
            />
            <button
              onClick={handleAddCategory}
              disabled={loading || !newCategory.trim()}
              className="bg-[#d4af37] hover:bg-[#c99b3f] text-black px-6 py-3 rounded font-medium disabled:bg-[#d4af37]/50"
            >
              {loading ? 'Adding...' : 'Add'}
            </button>
          </div>
        </div>

        <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] overflow-hidden">
          <h2 className="text-xl font-medium p-6 border-b border-[#2a2a2a] text-[#d4af37]">
            Existing Categories
          </h2>
          <ul className="divide-y divide-[#2a2a2a]">
            {categories.map((category, index) => (
              <li key={index} className="p-6 flex justify-between items-center">
                <span className="text-lg">{category}</span>
                <button
                  onClick={() => handleDeleteCategory(category)}
                  disabled={loading}
                  className="text-red-500 hover:text-red-400 p-2 rounded-full hover:bg-red-500/10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </li>
            ))}
            {categories.length === 0 && (
              <li className="p-6 text-center text-gray-500">No categories found</li>
            )}
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CategoriesPage;