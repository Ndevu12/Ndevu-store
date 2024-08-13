import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { RegisterData } from '../../types/registerType';

// Thunk for posting a new product
export const registerUser = createAsyncThunk(
  'products/createProduct',
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/user/register`, userData);
      return response.data;
    } catch (err) {
      // Return a rejected action containing the error message if the request fails
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);
