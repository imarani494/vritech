import { apiClient } from '@/lib/api/client';
import { Product, SortOrder } from '@/types/product';
import { ApiError } from '@/types/api';

export const productService = {
  /**
   * Fetch all products, optionally sorted on the server ('asc' | 'desc')
   */
  async getProducts(sort?: SortOrder): Promise<Product[]> {
    try {
      const params: Record<string, string> = {};
      if (sort) {
        params.sort = sort;
      }
      return await apiClient<Product[]>('/products', {
        params,
        revalidate: 300, // Revalidate every 5 minutes in Next.js ISR
      });
    } catch (error) {
      console.error('[productService.getProducts] Error:', error);
      throw error;
    }
  },

  /**
   * Fetch a single product by ID
   */
  async getProductById(id: number | string): Promise<Product | null> {
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    if (isNaN(numericId) || numericId <= 0) {
      return null;
    }

    try {
      const product = await apiClient<Product>(`/products/${numericId}`, {
        revalidate: 300,
      });

      // FakeStore API returns null or empty response if item ID doesn't exist
      if (!product || !product.id) {
        return null;
      }

      return product;
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return null;
      }
      console.error(`[productService.getProductById] Error fetching product ${id}:`, error);
      throw error;
    }
  },

  /**
   * Fetch all product categories
   */
  async getCategories(): Promise<string[]> {
    try {
      const categories = await apiClient<string[]>('/products/categories', {
        revalidate: 600, // Revalidate categories every 10 minutes
      });
      return categories || [];
    } catch (error) {
      console.error('[productService.getCategories] Error:', error);
      return [];
    }
  },

  /**
   * Fetch products by category with optional server sorting
   */
  async getProductsByCategory(category: string, sort?: SortOrder): Promise<Product[]> {
    try {
      const params: Record<string, string> = {};
      if (sort) {
        params.sort = sort;
      }
      const encodedCategory = encodeURIComponent(category);
      return await apiClient<Product[]>(`/products/category/${encodedCategory}`, {
        params,
        revalidate: 300,
      });
    } catch (error) {
      console.error(`[productService.getProductsByCategory] Error for category "${category}":`, error);
      throw error;
    }
  },
};
