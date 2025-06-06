'use client';

import Link from 'next/link';
import CartIcon from './CartIcon';

export default function HeaderContent() {
  return (
    <div className="container mx-auto flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold">
        My E-Commerce Store
      </Link>
      {/* Future Navigation/Search could go here */}
      <div className="flex items-center space-x-4">
        {/* Search Bar Placeholder (if needed in header) */}
        {/* <input type="text" placeholder="Search..." className="p-1 rounded text-gray-800" /> */}
        <CartIcon />
      </div>
    </div>
  );
} 