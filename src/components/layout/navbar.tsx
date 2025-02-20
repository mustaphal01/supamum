import Link from 'next/link';
import { ShoppingCartIcon, HeartIcon, MenuIcon } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-grey-600">
              Super Mom's Store
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <ShoppingCartIcon className="h-6 w-6 text-gray-600" />
            </Link>
            <Link href="/wishlist" className="relative">
              <HeartIcon className="h-6 w-6 text-gray-600" />
            </Link>
            <button className="sm:hidden">
              <MenuIcon className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}