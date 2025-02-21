'use client';

import { useState, useEffect } from 'react';
import { getProducts, getProductsByCategory } from '../lib/db';
import ProductGrid from '../components/products/ProductGrid';
import Navbar from '../components/layout/Navbar';
import CategoryBar from '../components/layout/CategoryBar';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts(); // Get all products
      setProducts(fetchedProducts);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const handleCategorySelect = async (category: string) => {
    setLoading(true);
    const fetchedProducts = category ? await getProductsByCategory(category) : await getProducts();
    setProducts(fetchedProducts);
    setLoading(false);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Navbar />
      <CategoryBar onCategorySelect={handleCategorySelect} />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProductGrid products={products} />
      </main>
    </div>
  );
}