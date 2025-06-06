'use client';

import { useState, useMemo } from 'react';
import ProductGrid from './ProductGrid';
import { Product } from '../types/product';

interface ClientProductDisplayProps {
  initialProducts: Product[];
  selectedCategory: string | null;
}

const PRODUCTS_PER_PAGE = 8; // Define how many products per page

export default function ClientProductDisplay({
  initialProducts,
  selectedCategory,
}: ClientProductDisplayProps) {
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);

  const sortedAndFilteredProducts = useMemo(() => {
    let products = selectedCategory
      ? initialProducts.filter((product) => product.category === selectedCategory)
      : initialProducts;

    // Apply search filter
    if (searchTerm) {
      products = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    if (sortBy === 'price-asc') {
      products = [...products].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      products = [...products].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'title-asc') {
      products = [...products].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'title-desc') {
      products = [...products].sort((a, b) => b.title.localeCompare(a.title));
    }

    // Reset page to 1 when filters/sort/search change
    setCurrentPage(1);

    return products;
  }, [initialProducts, selectedCategory, sortBy, searchTerm]);

  // Calculate products for the current page
  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
  const currentProducts = sortedAndFilteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculate total pages
  const totalPages = Math.ceil(sortedAndFilteredProducts.length / PRODUCTS_PER_PAGE);

  // Handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center">
        <div className="flex-1 w-full">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 sr-only">
            Search by Title:
          </label>
          <input
            type="text"
            id="search"
            name="search"
            className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for products..."
          />
        </div>
        <div className="w-full sm:w-auto">
          <label htmlFor="sort" className="block text-sm font-medium text-gray-700 sr-only">
            Sort by:
          </label>
          <select
            id="sort"
            name="sort"
            className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            defaultValue="null"
            onChange={(e) => setSortBy(e.target.value === 'null' ? null : e.target.value)}
          >
            <option value="null">Sort by:</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="title-asc">Title: A-Z</option>
            <option value="title-desc">Title: Z-A</option>
          </select>
        </div>
      </div>
      <ProductGrid products={currentProducts} />

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                currentPage === index + 1
                  ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
} 