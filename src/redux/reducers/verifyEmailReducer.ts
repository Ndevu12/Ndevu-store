import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { verifyUser } from '../actions/verifyingEmailAction';
import { VerifyEmailResponse } from '../../types/verifyEmailType';

interface VerifyEmailState {
  verify: VerifyEmailResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: VerifyEmailState = {
  verify: null,
  loading: false,
  error: null
};

const verifyEmailSlice = createSlice({
  name: 'verifyEmail',
  initialState,
  reducers: {
    resetState: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyUser.fulfilled, (state, action: PayloadAction<VerifyEmailResponse>) => {
        state.loading = false;
        state.verify = action.payload;
      })
      .addCase(verifyUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.error || 'Something went wrong, please try again.';
      });
  }
});

export const { resetState } = verifyEmailSlice.actions;
export default verifyEmailSlice.reducer;
