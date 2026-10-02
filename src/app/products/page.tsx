import React from 'react';
import { Metadata } from 'next';
import { productService } from '@/services/productService';
import { Product, SortOrder } from '@/types/product';
import { ProductClientView } from '@/components/products/ProductClientView';

export const metadata: Metadata = {
  title: 'Products Catalog',
  description: 'Explore and filter our complete catalog of electronics, jewelry, and apparel with live search and price filtering.',
};

export const revalidate = 300;

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = await searchParams;
  const sortParam = resolvedSearchParams.sort;
  const sort: SortOrder = sortParam === 'desc' ? 'desc' : 'asc';

  let products: Product[] = [];
  let categories: string[] = [];

  try {
    [products, categories] = await Promise.all([
      productService.getProducts(sort),
      productService.getCategories(),
    ]);
  } catch (error) {
    console.error('[ProductsPage] Error loading products catalog:', error);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Products Catalog
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Server-fetched product dataset with real-time client filtering, search, and URL synchronization.
        </p>
      </div>

      <ProductClientView
        initialProducts={products}
        categories={categories}
        initialSort={sort}
      />
    </div>
  );
}
