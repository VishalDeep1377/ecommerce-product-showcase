'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function CartIcon() {
  const { getCartItemCount } = useCart();
  const itemCount = getCartItemCount();

  return (
    <Link href="/cart" className="text-white hover:text-blue-200 flex items-center">
      {/* Placeholder Icon (you can replace with an SVG cart icon) */}
      🛒
      {itemCount > 0 && (
        <span className="ml-1 text-sm font-semibold">
          ({itemCount})
        </span>
      )}
    </Link>
  );
} 