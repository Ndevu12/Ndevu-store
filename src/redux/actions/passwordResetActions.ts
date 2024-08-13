import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

export interface PasswordResetData {
  userId: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
}

export const requestPasswordReset = createAsyncThunk(
  '/user/password/reset/link',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/user/password/reset/link?email=${email}`);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data || 'Failed to send reset password link');
    }
  }
);

export const resetPassword = createAsyncThunk(
  '/user/password/reset',
  async ({ userId, email, newPassword, confirmPassword }: PasswordResetData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/user/password/reset`,
        {
          newPassword,
          confirmPassword
        },
        {
          params: { userid: userId, email }
        }
      );

      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data || 'Failed to reset password');
    }
  }
);
