
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '../lib/cartContext';

import Navbar from '../components/layout/navbar';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Super Mom's Store",
  description: 'Quality products for Nigerian customers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen pt-16 bg-gray-50">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
