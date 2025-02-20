'use client';

import { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../../lib/db';
import { uploadImageToCloudinary } from '../../lib/cloudinaryClient';
import { Product } from '../../types/product';
import ProtectedRoute from '../../components/ProtectedRoute';

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
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
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      setLoading(false);
    };
    fetchProducts();
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
    return <div>Loading...</div>;
  }

  return (
    <ProtectedRoute>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Add New Product</h2>
          <div className="mt-2">
            <input
              type="text"
              placeholder="Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Category"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="file"
              onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
              className="border p-2 rounded"
            />
            <button onClick={handleAddProduct} className="ml-2 p-2 bg-blue-500 text-white rounded">
              Add Product
            </button>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Manage Products</h2>
          <div className="mt-2">
            {products.map((product) => (
              <div key={product.id} className="border p-2 rounded mb-2">
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p>{product.description}</p>
                <p>{product.price}</p>
                <p>{product.category}</p>
                <button
                  onClick={() => handleUpdateProduct(product.id, { ...product, price: product.price + 1 })}
                  className="mr-2 p-2 bg-yellow-500 text-white rounded"
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
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;