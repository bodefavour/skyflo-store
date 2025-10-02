import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../../components/admin/AdminLayout';
import {
  createProduct,
  fetchProductById,
  SaveProductPayload,
  updateProduct,
  uploadProductImage,
} from '../../../services/productsService';
import { fetchCategories } from '../../../services/categoriesService';
import { Category, Product } from '../../../types/types';

const emptyProduct: Partial<Product> = {
  name: '',
  price: 0,
  description: '',
  category: '',
  image: '',
  is_published: true,
  featured: false,
  stock: 0,
};

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Partial<Product>>(emptyProduct);
  const [categories, setCategories] = useState<Category[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [cats, existingProduct] = await Promise.all([
          fetchCategories(),
          id ? fetchProductById(id) : Promise.resolve(null),
        ]);

        setCategories(cats);

        if (existingProduct) {
          setProduct({
            ...existingProduct,
            category: existingProduct.category ?? existingProduct.collection_slug ?? '',
          });
        }
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Failed to load product data');
      } finally {
        setInitializing(false);
      }
    };

    loadData();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    let nextValue: unknown;

    if (type === 'checkbox') {
      nextValue = checked;
    } else if (name === 'price') {
      nextValue = parseFloat(value) || 0;
    } else if (name === 'stock') {
      nextValue = parseInt(value, 10) || 0;
    } else if (name === 'collection_slug') {
      nextValue = value.trim();
    } else {
      nextValue = value;
    }

    setProduct((prev) => ({
      ...prev,
      [name]: nextValue,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const buildPayload = async (): Promise<SaveProductPayload> => {
    const selectedCategory = categories.find((cat) => cat.name === product.category);
    const imageUrl = imageFile ? await uploadProductImage(imageFile) : product.image;

    const slugSource = (product.collection_slug && product.collection_slug.length > 0)
      ? product.collection_slug
      : product.category ?? '';

    const slugFromCategory = slugSource
      ? slugSource
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
      : undefined;

    return {
      name: product.name ?? '',
      price: Number(product.price ?? 0),
      description: product.description,
      image: imageUrl,
      category_id: selectedCategory?.id,
      category_name: product.category ?? selectedCategory?.name,
      collection_slug: slugFromCategory ?? undefined,
      featured: product.featured ?? false,
      is_published: product.is_published ?? true,
      stock: product.stock ?? 0,
      metadata: product.metadata,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const payload = await buildPayload();

      if (id) {
        await updateProduct(id, payload);
      } else {
        await createProduct(payload);
      }

      navigate('/admin/products');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  if (initializing) {
    return (
      <AdminLayout>
        <div className="container mx-auto px-4 py-8 text-gray-400">Loading product...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">{id ? 'Edit Product' : 'Add New Product'}</h1>

        {error && <div className="mb-4 p-3 bg-red-900/30 border border-red-700 text-red-200 rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name ?? ''}
              onChange={handleInputChange}
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] text-white rounded px-4 py-3 focus:border-[#d4af37]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Price ($)</label>
            <input
              type="number"
              name="price"
              value={product.price ?? 0}
              onChange={handleInputChange}
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] text-white rounded px-4 py-3 focus:border-[#d4af37]"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
            <select
              name="category"
              value={product.category ?? ''}
              onChange={handleInputChange}
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] text-white rounded px-4 py-3 focus:border-[#d4af37]"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Collection Slug</label>
            <input
              type="text"
              name="collection_slug"
              value={product.collection_slug ?? ''}
              onChange={handleInputChange}
              placeholder="auto-generated from category if left blank"
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] text-white rounded px-4 py-3 focus:border-[#d4af37]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center space-x-2 text-sm text-gray-300">
              <input
                type="checkbox"
                name="featured"
                checked={product.featured ?? false}
                onChange={handleInputChange}
                className="w-4 h-4 border border-[#2a2a2a] bg-[#0a0a0a]"
              />
              <span>Featured product</span>
            </label>
            <label className="flex items-center space-x-2 text-sm text-gray-300">
              <input
                type="checkbox"
                name="is_published"
                checked={product.is_published ?? true}
                onChange={handleInputChange}
                className="w-4 h-4 border border-[#2a2a2a] bg-[#0a0a0a]"
              />
              <span>Visible in storefront</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Inventory</label>
            <input
              type="number"
              name="stock"
              min="0"
              value={product.stock ?? 0}
              onChange={handleInputChange}
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] text-white rounded px-4 py-3 focus:border-[#d4af37]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              name="description"
              value={product.description ?? ''}
              onChange={handleInputChange}
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] text-white rounded px-4 py-3 focus:border-[#d4af37]"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] text-white rounded px-4 py-2"
            />
            {product.image && !imageFile && (
              <div className="mt-3">
                <img
                  src={product.image}
                  alt="Current product"
                  className="w-32 h-32 object-cover rounded border border-[#2a2a2a]"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#d4af37] hover:bg-[#c99b3f] text-black font-medium px-6 py-3 rounded disabled:opacity-60"
          >
            {loading ? 'Saving…' : id ? 'Update Product' : 'Add Product'}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ProductForm;