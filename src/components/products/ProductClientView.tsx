'use client';

import React, { useMemo, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { FilterState, Product, SortOrder } from '@/types/product';
import { ProductFilters } from './ProductFilters';
import { ProductGrid } from './ProductGrid';
import { Pagination } from '@/components/common/Pagination';
import { EmptyState } from '@/components/common/EmptyState';

interface ProductClientViewProps {
  initialProducts: Product[];
  categories: string[];
  initialSort: SortOrder;
}

const PAGE_SIZE = 8;

export const ProductClientView: React.FC<ProductClientViewProps> = ({
  initialProducts,
  categories,
  initialSort,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters: FilterState = useMemo(() => {
    const sortParam = searchParams.get('sort');
    const pageParam = parseInt(searchParams.get('page') || '1', 10);

    return {
      category: searchParams.get('category') || '',
      search: searchParams.get('search') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      sort: (sortParam === 'desc' ? 'desc' : 'asc') as SortOrder,
      page: isNaN(pageParam) || pageParam < 1 ? 1 : pageParam,
    };
  }, [searchParams]);

  const updateQueryParams = useCallback(
    (updates: Partial<FilterState>) => {
      const params = new URLSearchParams(searchParams.toString());

      const nextFilters = { ...filters, ...updates };

      Object.entries(nextFilters).forEach(([key, val]) => {
        if (
          val === undefined ||
          val === null ||
          val === '' ||
          (key === 'page' && Number(val) === 1) ||
          (key === 'sort' && val === initialSort)
        ) {
          params.delete(key);
        } else {
          params.set(key, String(val));
        }
      });

      const queryString = params.toString();
      router.push(`${pathname}${queryString ? `?${queryString}` : ''}`, { scroll: false });
    },
    [searchParams, filters, initialSort, pathname, router]
  );

  const handleResetFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [pathname, router]);

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    if (filters.category) {
      result = result.filter(
        (p) => p.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters.search.trim()) {
      const term = filters.search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term)
      );
    }

    if (filters.minPrice) {
      const min = parseFloat(filters.minPrice);
      if (!isNaN(min) && min >= 0) {
        result = result.filter((p) => p.price >= min);
      }
    }

    if (filters.maxPrice) {
      const max = parseFloat(filters.maxPrice);
      if (!isNaN(max) && max >= 0) {
        result = result.filter((p) => p.price <= max);
      }
    }

    result.sort((a, b) => {
      return filters.sort === 'asc' ? a.price - b.price : b.price - a.price;
    });

    return result;
  }, [initialProducts, filters]);

  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE) || 1;
  const validCurrentPage = Math.min(filters.page, totalPages);

  const paginatedProducts = useMemo(() => {
    const startIndex = (validCurrentPage - 1) * PAGE_SIZE;
    return filteredProducts.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredProducts, validCurrentPage]);

  return (
    <div>
      <ProductFilters
        categories={categories}
        filters={filters}
        onFilterChange={updateQueryParams}
        onResetFilters={handleResetFilters}
        totalResults={totalItems}
      />

      {paginatedProducts.length > 0 ? (
        <ProductGrid products={paginatedProducts} />
      ) : (
        <EmptyState
          title="No matching products"
          message="No items match your selected filters. Try clearing your search query or adjusting price boundaries."
          onAction={handleResetFilters}
          actionText="Reset All Filters"
        />
      )}

      <Pagination
        currentPage={validCurrentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={PAGE_SIZE}
        onPageChange={(page) => updateQueryParams({ page })}
      />
    </div>
  );
};
