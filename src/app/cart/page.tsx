'use client';

import { useCart } from '../../lib/cartContext';
import CartItem from '../../components/cart/CartItem';
import { Phone } from 'lucide-react';

export default function CartPage() {
  const { state } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(price);
  };

  const createWhatsAppMessage = () => {
    const itemsList = state.items
      .map(item => `*${item.name}*\nQuantity: ${item.quantity}\nPrice: ${formatPrice(item.price * item.quantity)}`)
      .join('\n\n');

    const paymentDetails = `
Payment Details:
Account Name: Maryam Gambo Lawal
Account Number: 1234567890
Bank: GTBank
    `;

    const message = `Hello! I would like to order:\n\n${itemsList}\n\n*Total: ${formatPrice(state.totalAmount)}*\n\n${paymentDetails}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/+2348119772223?text=${encodedMessage}`;
    window.open(whatsappLink, '_blank');
  };

  if (state.items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <p className="mt-2 text-gray-600">Start shopping to add items to your cart.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold">Shopping Cart</h1>
      
      <div className="mt-8">
        {state.items.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="mt-8 border-t border-gray-200 pt-8">
        <div className="flex justify-between text-lg font-medium">
          <span>Total</span>
          <span>{formatPrice(state.totalAmount)}</span>
        </div>

        <button
          onClick={createWhatsAppMessage}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-white shadow-sm hover:bg-green-700"
        >
          <Phone size={20} />
          Order via WhatsApp
        </button>
      </div>
    </div>
  );
}