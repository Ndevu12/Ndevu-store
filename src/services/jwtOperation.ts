import { jwtDecode } from 'jwt-decode';
import { DecodedToken, decodedTokenProps } from '../types/CouponTypes';

// Define interface for the decoded token

export const decodedToken = ({ testData }: decodedTokenProps = {}): DecodedToken | null => {
  // If test data is provided, return it as-is
  if (testData) {
    return testData;
  }

  // Fetch token from localStorage
  const userToken: string | null = localStorage.getItem('userToken');

  if (!userToken) {
    console.error('No user token found in localStorage');
    return null;
  }

  try {
    const parsedToken = JSON.parse(userToken);
    if (!parsedToken || !parsedToken.token) {
      console.error('Invalid token structure');
      return null;
    }
    const decoded: DecodedToken = jwtDecode(parsedToken.token as string);
    return decoded;
  } catch (error) {
    console.error('Error decoding token', error);
    return null;
  }
};
