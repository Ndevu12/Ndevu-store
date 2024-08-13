import React from 'react';
import { Product } from './productTypes';
export interface FormPopupProps {
  title: string;
  submitText?: string;
  closeText?: string;
  body: React.ReactNode;
  trigger: React.ReactNode;
  onSubmit?: (data: FormPayload) => void;
  onClose?: () => void;
}
export interface FormPayload {
  code: string;
  discountType: 'percentage' | 'amount' | any;
  discountRate: string | number;
  expirationDate: string;
  maxUsageLimit: number;
  product: string;
}

export interface PopupProps {
  title: string;
  subtitle: string;
  responseType: 'success' | 'fail';
  duration: number;
  onClose: () => void;
}
export interface CreateCouponArgs {
  data: FormPayload;
  vendorid: string;
}
export interface getCouponArgs {
  vendorId: string;
}
export interface updateCouponArgs {
  vendorId: string;
  code: string;
  data: FormPayload;
}
export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'amount';
  discountRate: number;
  expirationDate: string;
  usageTimes: number;
  maxUsageLimit: number;
  usedBy: string[];
  createdAt: string;
  updatedAt: string;
  product: Product;
}

export interface Data {
  [key: string]: Coupon | string | number;
  code: string;
  message: string;
}

export interface ApiResponse {
  status: string;
  data: Data;
}
export interface CouponFormProps {
  title: string;
  onSubmit: (data: FormPayload) => void;
  product: string;
  updateData?: Coupon;
}
export interface DecodedToken {
  id: string;
  email: string;
  userType: string;
  iat: number;
  exp: number;
}
export interface decodedTokenProps {
  testData?: DecodedToken;
}
