'use client';

import { Product } from '../types/product';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    // Optional: Add a slight delay or a state to show a confirmation message
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isAdding ? 'Adding...' : 'Add to Cart'}
    </button>
  );
} 