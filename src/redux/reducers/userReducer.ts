import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: ''
};

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload;
    },
    clearUser: (state) => {
      state.email = '';
    }
  }
});

export const { setUser, clearUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
