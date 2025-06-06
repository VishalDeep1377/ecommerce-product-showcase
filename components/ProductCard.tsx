import Image from 'next/image';
import Link from 'next/link';
import { ProductCardProps } from '../types/product';

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="group relative bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full flex flex-col">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8 flex items-center justify-center p-4">
          <Image
            src={product.image}
            alt={product.title}
            width={500}
            height={500}
            className="h-full w-full object-contain group-hover:opacity-75"
          />
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="mt-1 text-sm text-gray-700 font-medium flex-grow line-clamp-2" title={product.title}>{product.title}</h3>
          <p className="mt-1 text-sm font-medium text-gray-900">
            ${product.price.toFixed(2)}
          </p>
          <p className="mt-1 text-xs text-gray-500 capitalize">{product.category}</p>
        </div>
      </div>
    </Link>
  );
} 