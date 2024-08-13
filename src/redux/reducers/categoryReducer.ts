import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: {
    Women: 0,
    Men: 0,
    Kids: 0,
    Electronics: 0,
    Fashion: 0,
    Accessories: 0,
    Jewelries: 0
  },
  currentCategory: ''
};

const categorySlice = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {
    setCategoryObj: (state, action) => {
      state.categories = action.payload;
    },
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    }
  }
});

export const { setCategoryObj, setCurrentCategory } = categorySlice.actions;
export default categorySlice.reducer;
