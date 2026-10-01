export interface ProductRating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRating;
}

export type SortOrder = 'asc' | 'desc';

export interface FilterState {
  category: string;
  search: string;
  minPrice: string;
  maxPrice: string;
  sort: SortOrder;
  page: number;
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
