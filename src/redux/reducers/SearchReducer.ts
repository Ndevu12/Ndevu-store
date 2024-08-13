import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchResponse } from '../../types/searchTypes';
import { searchProducts } from '../actions/searchAction';

interface ProductState {
  products: SearchResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: null,
  loading: false,
  error: null
};

const SearchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action: PayloadAction<SearchResponse>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  }
});

export default SearchSlice.reducer;
