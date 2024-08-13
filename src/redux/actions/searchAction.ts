import { createAsyncThunk } from '@reduxjs/toolkit';
import { SearchProductParams, SearchResponse } from '../../types/searchTypes';
import axios, { AxiosError } from 'axios';

export const searchProducts = createAsyncThunk(
  '/search',
  async ({ name, sortBy, sortOrder, page, limit }: SearchProductParams, { rejectWithValue }) => {
    if (!name || !sortBy || !sortOrder || !page || !limit) return rejectWithValue('No search parameters provided');
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/product/search`, {
        params: {
          name,
          sortBy,
          sortOrder,
          page,
          limit
        }
      });
      return response.data as SearchResponse;
    } catch (err) {
      const error = err as AxiosError;
      console.error('Error fetching products:', err); // Debugging line
      return rejectWithValue(error.response?.data || 'Failed to fetch products');
    }
  }
);
