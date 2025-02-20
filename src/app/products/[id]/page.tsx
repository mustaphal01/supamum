"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getProductById } from '../../../lib/db';
import { Phone, Share2, ShoppingCart } from 'lucide-react';
import { useCart } from '../../../lib/cartContext';
import { Product } from '../../../types/product';

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const { dispatch } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { id } = await params;
        const fetchedProduct = await getProductById(id);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProduct();
  }, [params]);

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!product) {
    return <div className="p-4">Product not found</div>;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(price);
  };

  const createWhatsAppMessage = () => {
    const message = `Hello! I'm interested in buying:\n\n*${product.name}*\nPrice: ${formatPrice(product.price)}\n\nCan you help me with this order?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/+2349099933360?text=${encodedMessage}`;
    window.open(whatsappLink, '_blank');
  };

  const shareProductViaWhatsApp = () => {
    const message = `Check out this product:\n\n*${product.name}*\nPrice: ${formatPrice(product.price)}\n\n${window.location.href}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappLink, '_blank');
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    dispatch({ type: 'ADD_ITEM', payload: product });
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <div className="aspect-square overflow-hidden rounded-lg">
            {product.images[selectedImage] ? (
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                width={500}
                height={500}
                className="h-full w-full object-cover"
                priority
              />
            ) : (
              <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                <span>No Image Available</span>
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 
                    ${selectedImage === index ? 'border-purple-600' : 'border-transparent'}`}
                >
                  {image ? (
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                      <span>No Image</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-2 text-xl font-medium text-gray-900">
            {formatPrice(product.price)}
          </p>
          <div className="mt-4">
            <h2 className="text-sm font-medium text-gray-900">Description</h2>
            <p className="mt-2 text-sm text-gray-600">{product.description}</p>
          </div>
          {product.features && (
            <div className="mt-4">
              <h2 className="text-sm font-medium text-gray-900">Features</h2>
              <ul className="mt-2 list-inside list-disc text-sm text-gray-600">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={handleAddToCart}
              className={`flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-white shadow-sm transition-all duration-300 transform
                ${isAdding 
                  ? 'scale-95 bg-green-600' 
                  : 'bg-purple-600 hover:bg-purple-700'
                }`}
            >
              <ShoppingCart size={20} />
              <span>{isAdding ? '✓ Added to Cart' : 'Add to Cart'}</span>
            </button>
            <button
              onClick={createWhatsAppMessage}
              className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-white shadow-sm hover:bg-green-700"
            >
              <Phone size={20} />
              <span>Order via WhatsApp</span>
            </button>
            <button
              onClick={shareProductViaWhatsApp}
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white shadow-sm hover:bg-blue-700"
            >
              <Share2 size={20} />
              <span>Share via WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}