import { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from '../../../services/categoriesService';
import { Category } from '../../../types/types';

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState('');

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;

    try {
      setSaving(true);
      const category = await createCategory(newCategory.trim());
      setCategories((prev) => [...prev, category]);
      setNewCategory('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add category');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      setSaving(true);
      await deleteCategory(id);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setEditingValue('');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete category');
    } finally {
      setSaving(false);
    }
  };

  const startEditing = (category: Category) => {
    setEditingId(category.id);
    setEditingValue(category.name);
  };

  const handleUpdateCategory = async () => {
    if (!editingId || !editingValue.trim()) {
      return;
    }

    try {
      setSaving(true);
      const updated = await updateCategory(editingId, editingValue.trim());
      setCategories((prev) => prev.map((cat) => (cat.id === updated.id ? updated : cat)));
      setEditingId(null);
      setEditingValue('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update category');
    } finally {
      setSaving(false);
    }
  };

  const handleEditKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleUpdateCategory();
    } else if (event.key === 'Escape') {
      setEditingId(null);
      setEditingValue('');
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Product Categories</h1>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-500 text-red-200 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#2a2a2a] text-gray-400">
            Loading categories...
          </div>
        ) : (
          <>
            <div className="max-w-2xl bg-[#1a1a1a] p-6 rounded-lg border border-[#2a2a2a] mb-8">
              <h2 className="text-xl font-medium mb-4 text-[#d4af37]">Add New Category</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="flex-grow bg-[#0a0a0a] border border-[#2a2a2a] text-white p-3 rounded focus:border-[#d4af37] focus:outline-none"
                  placeholder="Category name"
                  disabled={saving}
                />
                <button
                  onClick={handleAddCategory}
                  disabled={saving || !newCategory.trim()}
                  className="bg-[#d4af37] hover:bg-[#c99b3f] text-black px-6 py-3 rounded font-medium disabled:opacity-50"
                >
                  {saving && !editingId ? 'Saving...' : 'Add'}
                </button>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] overflow-hidden">
              <h2 className="text-xl font-medium p-6 border-b border-[#2a2a2a] text-[#d4af37]">
                Existing Categories
              </h2>
              <ul className="divide-y divide-[#2a2a2a]">
                {categories.length === 0 ? (
                  <li className="p-6 text-center text-gray-400">No categories found</li>) : (
                  categories.map((category) => (
                    <li key={category.id} className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-[#2a2a2a]/30 transition-colors">
                      <div className="flex-1 min-w-0">
                        {editingId === category.id ? (
                          <div className="flex flex-col sm:flex-row gap-3">
                            <input
                              value={editingValue}
                              onChange={(e) => setEditingValue(e.target.value)}
                              onKeyDown={handleEditKeyDown}
                              autoFocus
                              className="flex-grow bg-[#0a0a0a] border border-[#2a2a2a] text-white p-2 rounded focus:border-[#d4af37]"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={handleUpdateCategory}
                                disabled={saving}
                                className="bg-[#d4af37] text-black px-4 py-2 rounded font-medium disabled:opacity-50"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => {
                                  setEditingId(null);
                                  setEditingValue('');
                                }}
                                className="px-4 py-2 rounded border border-[#2a2a2a] text-sm"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <span className="text-lg font-medium text-white">{category.name}</span>
                            {category.slug && (
                              <p className="text-xs text-gray-400 uppercase tracking-wide">Slug: {category.slug}</p>
                            )}
                          </div>
                        )}
                      </div>
                      {editingId !== category.id && (
                        <div className="flex gap-3 justify-end">
                          <button
                            onClick={() => startEditing(category)}
                            className="text-[#d4af37] hover:text-[#c99b3f]"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(category.id)}
                            disabled={saving}
                            className="text-red-500 hover:text-red-400"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </li>
                  ))
                )}
              </ul>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default CategoriesPage;