import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createCoupon, deleteCoupon, fetchProducts, getCoupon, updateCoupon } from '../actions/productAction';
import { ProductsResponse } from '../../types/productTypes';
import { Coupon } from '../../types/CouponTypes';

interface ProductState {
  products: ProductsResponse | null;
  loading: boolean;
  message: string;
  coupons: Coupon[];
  error: string | null;
}

const initialState: ProductState = {
  products: null,
  message: '',
  coupons: [],
  loading: false,
  error: null
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.coupons = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductsResponse>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(createCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCoupon.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.message = action.payload.message || 'Success!';
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any) || 'Something went wrong';
      })
      .addCase(updateCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCoupon.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.message = action.payload.message || 'Success!';
      })
      .addCase(updateCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any) || 'Something went wrong';
      })
      .addCase(deleteCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCoupon.fulfilled, (state, action: any) => {
        state.loading = false;
        state.message = action.payload.message || 'Success!';
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any) || 'Something went wrong';
      })
      .addCase(getCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCoupon.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const coupons: Coupon[] = Object.keys(action.payload)
          .filter((key) => !isNaN(parseInt(key)))
          .map((key) => action.payload[key] as Coupon); // Cast to Coupon type

        state.coupons = coupons;
      })
      .addCase(getCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any) || 'Something went wrong';
      });
  }
});

export const { resetState } = productSlice.actions;
export default productSlice.reducer;
