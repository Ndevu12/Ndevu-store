import { createSlice } from '@reduxjs/toolkit';

interface Banner {
  rate: number;
  time: string;
  title: string;
  id: string;
  image: string;
}

interface InitialState {
  banners: Banner[];
  currentBanner: number;
}

const initialState: InitialState = {
  banners: [],
  currentBanner: 0
};

const bannerSlice = createSlice({
  name: 'banner',
  initialState: initialState,
  reducers: {
    setBanners: (state, action) => {
      state.banners = action.payload;
    },
    setCurrentBanner: (state, action) => {
      state.currentBanner = action.payload;
    }
  }
});

export const { setBanners, setCurrentBanner } = bannerSlice.actions;
export default bannerSlice.reducer;
