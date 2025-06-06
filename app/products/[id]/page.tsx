import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { getProductById } from '../../../utils/api';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { notFound } from 'next/navigation';
import AddToCartButton from '../../../components/AddToCartButton';

export const revalidate = 3600; // Revalidate every hour

// This is now a Server Component
async function ProductDetail({ product }: { product: any }) { // Simplified to receive product data
  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-block mb-6 text-blue-600 hover:text-blue-800 text-sm font-medium"
      >
        ← Back to Products
      </Link>
      
      <div className="flex flex-col md:flex-row gap-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="md:w-1/2 relative aspect-square flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden p-8 border border-gray-200">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>
        
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-gray-900">{product.title}</h1>
            <p className="text-blue-700 text-sm font-semibold mb-4 capitalize">
              Category: {product.category}
            </p>
            <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              ${product.price.toFixed(2)}
            </p>
            
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold mb-3 text-gray-800">Description</h2>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4">
            <div className="flex items-center">
              <span className="text-yellow-400 text-xl mr-1">★</span>
              <span className="text-gray-800 font-semibold mr-2">{product.rating.rate}</span>
              <span className="text-gray-600 text-sm">({product.rating.count} reviews)</span>
            </div>
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Main page component is now async Server Component
export default async function Page({ params }: { params: { id: string } }) {
  try {
    const productId = params.id;

    // Explicitly check if productId is a string before parsing
    if (typeof productId !== 'string') {
        console.error('Invalid product ID type:', productId);
        notFound(); // Or handle this case appropriately
    }

    const idAsNumber = parseInt(productId);
    
    // Check if parsing resulted in a valid number
    if (isNaN(idAsNumber)) {
        console.error('Invalid product ID format:', productId);
        notFound(); // Or handle this case for non-numeric IDs
    }

    const product = await getProductById(idAsNumber);
    
    // Handle case where product is not found after API call
    if (!product) {
      notFound();
    }

    return (
      <main>
        <ProductDetail product={product} /> {/* Pass fetched product data */}
      </main>
    );
  } catch (error) {
    console.error('Error fetching product details:', error);
    notFound(); // Or render an error message
  }
} 