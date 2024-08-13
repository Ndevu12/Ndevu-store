import { Product } from './productTypes';

export type SearchResponse = {
  status: string;
  data: {
    products: Product[];
  };
  message?: string;
  pagination: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
  };
};

export interface SearchProductParams {
  name?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  page?: number;
  limit?: number;
}
