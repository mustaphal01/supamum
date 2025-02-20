// src/app/page.tsx
import { getProducts } from '../lib/db';
import ProductGrid from '../components/products/ProductGrid';
import Navbar from '../components/layout/navbar';
import CategoryBar from '../components/layout/CategoryBar';

export default async function Home() {
  const products = await getProducts();
  
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Navbar />
      <CategoryBar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProductGrid products={products} />
      </main>
    </div>
  );
}