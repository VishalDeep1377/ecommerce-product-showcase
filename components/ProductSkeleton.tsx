import React from 'react';

export default function ProductSkeleton() {
  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        {/* Placeholder for image */}
        <div className="h-full w-full bg-gray-300"></div>
      </div>
      <div className="p-4">
        {/* Placeholder for title */}
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        {/* Placeholder for price */}
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        {/* Placeholder for category */}
        <div className="h-3 bg-gray-300 rounded w-1/2 mt-2"></div>
      </div>
    </div>
  );
} 