import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchVendorProducts } from '../actions/productAction';
import { VendorProduct } from '../../types/productTypes';

interface ProductState {
  loading: boolean;
  products: VendorProduct | null;
  error: string | null;
}

const initialState: ProductState = {
  loading: false,
  products: null,
  error: null
};

const productSlice = createSlice({
  name: 'vendorProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVendorProducts.fulfilled, (state, action: PayloadAction<VendorProduct>) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchVendorProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  }
});

export default productSlice.reducer;
