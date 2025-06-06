'use client';

import { getAllProducts, getAllCategories } from '../utils/api';
import ClientProductDisplay from '../components/ClientProductDisplay';
import LoadingSpinner from '../components/LoadingSpinner';
import ProductSkeleton from '../components/ProductSkeleton';
import { Suspense, useState, useEffect } from 'react';
import { Product } from '../types/product';

// This page component is a client component now to manage state

async function fetchProducts() {
  // This function is called client-side now
  return getAllProducts();
}

async function fetchCategories() {
  // This function is called client-side now
  return getAllCategories();
}

function CategoryFilter({ categories, onSelectCategory }: { categories: string[], onSelectCategory: (category: string | null) => void }) {
  return (
    <div className="mb-8">
      <label htmlFor="category" className="block text-sm font-medium text-gray-700">Filter by Category:</label>
      <select
        id="category"
        name="category"
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        defaultValue="all"
        onChange={(e) => onSelectCategory(e.target.value === 'all' ? null : e.target.value)}
      >
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [productData, categoryData] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);
        setProducts(productData);
        setCategories(categoryData);
        setError(null);
      } catch (err: unknown) {
        let errorMessage = 'Failed to load products or categories.';
        if (err instanceof Error) {
          errorMessage += ' ' + err.message;
        } else if (typeof err === 'string') {
          errorMessage += ' ' + err;
        }
        setError(errorMessage);
        setProducts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    // Import PRODUCTS_PER_PAGE from ClientProductDisplay to show the correct number of skeletons
    const PRODUCTS_PER_PAGE = 8; // Keep this in sync with ClientProductDisplay.tsx
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {[...Array(PRODUCTS_PER_PAGE)].map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto px-4 py-8 text-red-600">
        <h1 className="text-3xl font-bold mb-8">Error</h1>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section Placeholder */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-16 rounded-lg shadow-md mb-8 flex items-center justify-center">
        <h2 className="text-4xl font-bold">Welcome to Our Store</h2>
        {/* You could add images, a call to action, etc. here */}
      </div>

      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <CategoryFilter
        categories={categories}
        onSelectCategory={setSelectedCategory}
      />
      <ClientProductDisplay
        initialProducts={products}
        selectedCategory={selectedCategory}
      />
    </main>
  );
} 