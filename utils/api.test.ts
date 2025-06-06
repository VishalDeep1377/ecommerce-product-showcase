import { getAllProducts, getProductById } from './api';

describe('API Utility Functions', () => {
  // Mock the global fetch function
  global.fetch = jest.fn();

  // Reset the mock before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllProducts', () => {
    it('fetches products successfully', async () => {
      const mockProducts = [
        { id: 1, title: 'Product 1', price: 10, description: 'Desc 1', category: 'cat1', image: 'img1.jpg', rating: { rate: 4, count: 5 } },
        { id: 2, title: 'Product 2', price: 20, description: 'Desc 2', category: 'cat2', image: 'img2.jpg', rating: { rate: 3, count: 8 } },
      ];

      // Mock the fetch response
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts,
      });

      const products = await getAllProducts();

      // Check if fetch was called with the correct URL
      expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products');
      // Check if the correct products were returned
      expect(products).toEqual(mockProducts);
    });

    it('throws an error if fetching products fails', async () => {
      // Mock a failed fetch response
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      // Expect the function to throw an error
      await expect(getAllProducts()).rejects.toThrow('Failed to fetch products');
      // Check if fetch was still called
      expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products');
    });
  });

  describe('getProductById', () => {
    it('fetches a product by ID successfully', async () => {
      const mockProduct = { id: 1, title: 'Product 1', price: 10, description: 'Desc 1', category: 'cat1', image: 'img1.jpg', rating: { rate: 4, count: 5 } };
      const productId = 1;

      // Mock the fetch response
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProduct,
      });

      const product = await getProductById(productId);

      // Check if fetch was called with the correct URL
      expect(fetch).toHaveBeenCalledWith(`https://fakestoreapi.com/products/${productId}`);
      // Check if the correct product was returned
      expect(product).toEqual(mockProduct);
    });

    it('throws an error if fetching a product by ID fails', async () => {
      const productId = 999;

      // Mock a failed fetch response
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      // Expect the function to throw an error
      await expect(getProductById(productId)).rejects.toThrow('Failed to fetch product');
      // Check if fetch was still called
      expect(fetch).toHaveBeenCalledWith(`https://fakestoreapi.com/products/${productId}`);
    });
  });
}); 