# E-Commerce Product Showcase

A modern e-commerce product showcase built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Product listing page with grid layout
- Product detail page
- Responsive design for all screen sizes
- Loading states and error handling
- Optimized images using next/image
- TypeScript for better type safety
- Tailwind CSS for styling

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- FakeStore API (https://fakestoreapi.com/products)

## Data Fetching Strategy

The application uses a combination of data fetching strategies:

- **Product Listing Page**: Uses `getServerSideProps` to fetch products server-side, ensuring SEO benefits and fresh data on each request.
- **Product Detail Page**: Uses `getServerSideProps` to fetch individual product data, allowing for dynamic routes and SEO optimization.

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── page.tsx                 # Product listing page
│   ├── products/
│   │   └── [id]/
│   │       └── page.tsx        # Product detail page
│   └── layout.tsx              # Root layout
├── components/
│   ├── ProductCard.tsx         # Product card component
│   ├── ProductGrid.tsx         # Product grid component
│   └── LoadingSpinner.tsx      # Loading state component
├── types/
│   └── product.ts              # TypeScript interfaces
└── utils/
    └── api.ts                  # API utility functions
```

## Styling

The project uses Tailwind CSS for styling, providing:
- Utility-first CSS framework
- Responsive design
- Dark mode support
- Custom animations and transitions

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
