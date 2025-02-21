'use client';

import { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct, getCategories } from '../../lib/db';
import { uploadImageToCloudinary } from '../../lib/cloudinaryClient';
import { Product } from '../../types/product';
import ProtectedRoute from '../../components/ProtectedRoute';
import PopularProducts from '../../components/PopularProducts';
import CategoryManagement from '../../components/CategoryManagement';

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ id: string, name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    category: '',
    images: [],
    inStock: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      const fetchedProducts = await getProducts();
      const fetchedCategories = await getCategories();
      setProducts(fetchedProducts);
      setCategories(fetchedCategories);
      setLoading(false);
    };
    fetchProductsAndCategories();
  }, []);

  const handleAddProduct = async () => {
    if (imageFile) {
      try {
        const imageUrl = await uploadImageToCloudinary(imageFile);
        newProduct.images = [imageUrl];
        console.log('Image URL:', imageUrl); // Log the image URL
      } catch (error) {
        console.error('Error uploading image:', error); // Log the error
      }
    }
    await addProduct(newProduct as Product);
    setNewProduct({
      name: '',
      description: '',
      price: 0,
      category: '',
      images: [],
      inStock: true,
    });
    setImageFile(null);
    const fetchedProducts = await getProducts();
    setProducts(fetchedProducts);
  };

  const handleUpdateProduct = async (id: string, updatedProduct: Partial<Product>) => {
    await updateProduct(id, updatedProduct);
    const fetchedProducts = await getProducts();
    setProducts(fetchedProducts);
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id);
    const fetchedProducts = await getProducts();
    setProducts(fetchedProducts);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <ProtectedRoute>
      <div className="p-4 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                className="w-full border p-2 rounded"
              />
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              <input
                type="file"
                onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                className="w-full border p-2 rounded"
              />
              <button onClick={handleAddProduct} className="w-full p-2 bg-blue-500 text-white rounded">
                Add Product
              </button>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="border p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold">{product.name}</h3>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                    <p>{product.category}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleUpdateProduct(product.id, { ...product, price: product.price + 1 })}
                      className="p-2 bg-yellow-500 text-white rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-2 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8">
          <PopularProducts />
        </div>
        <div className="mt-8">
          <CategoryManagement />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;