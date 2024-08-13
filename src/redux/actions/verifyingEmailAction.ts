import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

// Thunk for posting a new product
export const verifyUser = createAsyncThunk('products/createProduct', async (token: string, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/user/verify/${token}`);
    return response.data;
  } catch (err) {
    // Return a rejected action containing the error message if the request fails
    const error = err as AxiosError;
    return rejectWithValue(error.response?.data || 'An error occurred');
  }
});
