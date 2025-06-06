import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { CartProvider } from '../context/CartContext';
import HeaderContent from '../components/HeaderContent';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'E-Commerce Product Showcase',
  description: 'A modern e-commerce product showcase built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 flex flex-col min-h-screen`}>
        <CartProvider>
          <header className="bg-blue-600 text-white p-4 shadow-md">
            <HeaderContent />
          </header>
          <main className="flex-grow">
            {children}
          </main>
          <footer className="bg-gray-800 text-white p-8 mt-auto">
            <div className="container mx-auto text-center">
              <p>&copy; {new Date().getFullYear()} My E-Commerce Store. All rights reserved.</p>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
} 