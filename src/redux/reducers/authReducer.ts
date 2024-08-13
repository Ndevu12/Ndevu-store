import { createSlice } from '@reduxjs/toolkit';

const isTokenExpired = () => {
  if (localStorage.getItem('userToken')) {
    const userToken = JSON.parse(localStorage.getItem('userToken')!);
    if (userToken.expirationTime < Date.now()) {
      localStorage.removeItem('userToken');
      return;
    }
    return userToken.token;
  }
  return null;
};

const initialState = {
  userToken: isTokenExpired()
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      if (action.payload) {
        localStorage.setItem(
          'userToken',
          JSON.stringify({
            token: action.payload,
            expirationTime: Date.now() + 24 * 60 * 60 * 1000
          })
        );
        state.userToken = action.payload;
      } else {
        localStorage.removeItem('userToken');
      }
    },
    clearCredentials: (state) => {
      state.userToken = null;
      localStorage.removeItem('userToken');
    }
  }
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;
