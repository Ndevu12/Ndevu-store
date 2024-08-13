import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { requestPasswordReset, resetPassword } from '../actions/passwordResetActions';
import { RegisterResponse } from '../../types/registerType';

interface PasswordState {
  loading: boolean;
  error: string | null;
  resetPassword: RegisterResponse | null;
}

const initialState: PasswordState = {
  loading: false,
  error: null,
  resetPassword: null
};

const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.resetPassword = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestPasswordReset.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.resetPassword = null;
      })
      .addCase(requestPasswordReset.fulfilled, (state, action: PayloadAction<RegisterResponse>) => {
        state.loading = false;
        state.resetPassword = action.payload;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to request password reset';
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.resetPassword = null;
      })
      .addCase(resetPassword.fulfilled, (state, action: PayloadAction<RegisterResponse>) => {
        state.loading = false;
        state.resetPassword = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to reset password';
      });
  }
});

export const { resetState } = passwordSlice.actions;
export default passwordSlice.reducer;
