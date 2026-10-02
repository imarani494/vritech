import { apiClient } from '@/lib/api/client';
import { Product, SortOrder } from '@/types/product';
import { ApiError } from '@/types/api';
import { mockProducts, mockCategories } from '@/data/mockProducts';

function sortProducts(products: Product[], sort?: SortOrder): Product[] {
  const result = [...products];
  if (!sort) return result;
  return result.sort((a, b) => (sort === 'asc' ? a.price - b.price : b.price - a.price));
}

const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build';

export const productService = {
  async getProducts(sort?: SortOrder): Promise<Product[]> {
    if (isBuildTime) {
      return sortProducts(mockProducts, sort);
    }

    try {
      const params: Record<string, string> = {};
      if (sort) {
        params.sort = sort;
      }
      const data = await apiClient<Product[]>('/products', {
        params,
        revalidate: 300,
      });
      return data && Array.isArray(data) ? data : sortProducts(mockProducts, sort);
    } catch (error) {
      console.warn('[productService.getProducts] External API unavailable, using local product data:', error);
      return sortProducts(mockProducts, sort);
    }
  },

  async getProductById(id: number | string): Promise<Product | null> {
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    if (isNaN(numericId) || numericId <= 0) {
      return null;
    }

    if (isBuildTime) {
      return mockProducts.find((p) => p.id === numericId) || null;
    }

    try {
      const product = await apiClient<Product>(`/products/${numericId}`, {
        revalidate: 300,
      });

      if (!product || !product.id) {
        return mockProducts.find((p) => p.id === numericId) || null;
      }

      return product;
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return null;
      }
      console.warn(`[productService.getProductById] External API error for ID ${id}, using local fallback:`, error);
      return mockProducts.find((p) => p.id === numericId) || null;
    }
  },

  async getCategories(): Promise<string[]> {
    if (isBuildTime) {
      return mockCategories;
    }

    try {
      const categories = await apiClient<string[]>('/products/categories', {
        revalidate: 600,
      });
      return categories && categories.length > 0 ? categories : mockCategories;
    } catch (error) {
      console.warn('[productService.getCategories] External API unavailable, using local categories:', error);
      return mockCategories;
    }
  },

  async getProductsByCategory(category: string, sort?: SortOrder): Promise<Product[]> {
    if (isBuildTime) {
      const filtered = mockProducts.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
      return sortProducts(filtered, sort);
    }

    try {
      const params: Record<string, string> = {};
      if (sort) {
        params.sort = sort;
      }
      const encodedCategory = encodeURIComponent(category);
      const data = await apiClient<Product[]>(`/products/category/${encodedCategory}`, {
        params,
        revalidate: 300,
      });
      return data && Array.isArray(data)
        ? data
        : sortProducts(
            mockProducts.filter((p) => p.category.toLowerCase() === category.toLowerCase()),
            sort
          );
    } catch (error) {
      console.warn(`[productService.getProductsByCategory] API error for "${category}", using local fallback:`, error);
      const filtered = mockProducts.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
      return sortProducts(filtered, sort);
    }
  },
};
