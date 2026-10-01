'use client';

import React from 'react';
import { FilterState, SortOrder } from '@/types/product';

interface ProductFiltersProps {
  categories: string[];
  filters: FilterState;
  onFilterChange: (updates: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalResults: number;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
}) => {
  const hasActiveFilters =
    filters.category !== '' ||
    filters.search !== '' ||
    filters.minPrice !== '' ||
    filters.maxPrice !== '';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm mb-8 space-y-5">
      {/* Top Bar: Search + Server Sort + Results Count */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Search Bar Input */}
        <div className="relative flex-1">
          <label htmlFor="product-search-input" className="sr-only">
            Search products by name or description
          </label>
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            id="product-search-input"
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value, page: 1 })}
            placeholder="Search products by title or keyword..."
            className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange({ search: '', page: 1 })}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              aria-label="Clear search text"
            >
              ✕
            </button>
          )}
        </div>

        {/* Controls Right Group: Server Sort & Categories */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Dropdown */}
          <div className="relative">
            <label htmlFor="category-select-dropdown" className="sr-only">
              Filter by Category
            </label>
            <select
              id="category-select-dropdown"
              value={filters.category}
              onChange={(e) => onFilterChange({ category: e.target.value, page: 1 })}
              className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="">All Categories ({categories.length})</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Server Sort Dropdown */}
          <div className="relative">
            <label htmlFor="sort-select-dropdown" className="sr-only">
              Sort Order
            </label>
            <select
              id="sort-select-dropdown"
              value={filters.sort}
              onChange={(e) => onFilterChange({ sort: e.target.value as SortOrder, page: 1 })}
              className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="asc">Price: Low to High (ASC)</option>
              <option value="desc">Price: High to Low (DESC)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Second Row: Price Range Filter & Active Badges */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
        {/* Price Range Inputs */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            Price Range ($):
          </span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => onFilterChange({ minPrice: e.target.value, page: 1 })}
              className="w-24 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Minimum Price"
            />
            <span className="text-slate-400 text-xs">–</span>
            <input
              type="number"
              min="0"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => onFilterChange({ maxPrice: e.target.value, page: 1 })}
              className="w-24 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Maximum Price"
            />
          </div>
        </div>

        {/* Results Badge */}
        <div className="text-xs font-semibold text-slate-500">
          Showing <span className="text-indigo-600 font-bold">{totalResults}</span> products
        </div>
      </div>

      {/* Active Filter Chips / Clear All */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap pt-3 border-t border-slate-100">
          <span className="text-xs text-slate-400 font-medium">Active filters:</span>

          {filters.category && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-lg border border-indigo-200">
              Category: {filters.category}
              <button
                onClick={() => onFilterChange({ category: '', page: 1 })}
                className="hover:text-indigo-950"
                aria-label="Remove category filter"
              >
                ✕
              </button>
            </span>
          )}

          {filters.search && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-lg border border-indigo-200">
              Search: &quot;{filters.search}&quot;
              <button
                onClick={() => onFilterChange({ search: '', page: 1 })}
                className="hover:text-indigo-950"
                aria-label="Remove search filter"
              >
                ✕
              </button>
            </span>
          )}

          {(filters.minPrice || filters.maxPrice) && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-lg border border-indigo-200">
              Price: ${filters.minPrice || '0'} - ${filters.maxPrice || '∞'}
              <button
                onClick={() => onFilterChange({ minPrice: '', maxPrice: '', page: 1 })}
                className="hover:text-indigo-950"
                aria-label="Remove price filter"
              >
                ✕
              </button>
            </span>
          )}

          <button
            onClick={onResetFilters}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 underline underline-offset-2 ml-auto"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};
