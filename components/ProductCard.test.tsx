import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';
import { Product } from '../types/product';
import '@testing-library/jest-dom';
import React from 'react';

// Mock the next/image component to avoid optimization errors in tests
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ComponentProps<'img'>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || ''} />;
  },
}));

// Mock the next/link component to avoid navigation errors in tests
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('ProductCard', () => {
  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 100.00,
    description: 'This is a test product description.',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/test.jpg',
    rating: { rate: 4.5, count: 10 },
  };

  it('renders product details correctly', () => {
    render(<ProductCard product={mockProduct} />);

    // Check if the product title is rendered
    expect(screen.getByText('Test Product')).toBeInTheDocument();

    // Check if the product price is rendered with correct formatting
    expect(screen.getByText('$100.00')).toBeInTheDocument();

    // Check if the product category is rendered
    expect(screen.getByText('electronics', { exact: false })).toBeInTheDocument();

    // Check if the product image is rendered with the correct alt text
    const imageElement = screen.getByAltText('Test Product');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', mockProduct.image);

    // Check if the link to the product detail page is correct
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', '/products/1');
  });
}); 