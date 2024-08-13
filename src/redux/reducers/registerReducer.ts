import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registerUser } from '../actions/registerAction';
import { RegisterResponse } from '../../types/registerType';

interface RegisterState {
  register: RegisterResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: RegisterState = {
  register: null,
  loading: false,
  error: null
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    resetState: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<RegisterResponse>) => {
        state.loading = false;
        state.register = action.payload;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message || 'Something went wrong, please try again.';
      });
  }
});

export const { resetState } = registerSlice.actions;
export default registerSlice.reducer;
