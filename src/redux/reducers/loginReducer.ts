import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginResponse } from '../../types/registerType';
import { loginUser } from '../actions/loginAction';

interface loginState {
  login: LoginResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: loginState = {
  login: null,
  loading: false,
  error: null
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    resetState: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.login = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message || 'Something went wrong, please try again.';
      });
  }
});

export const { resetState } = loginSlice.actions;
export default loginSlice.reducer;
