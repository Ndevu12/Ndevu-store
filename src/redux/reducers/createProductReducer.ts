import { ProductActionTypes, ProductActions } from '../types/productTypes';

export interface ProductState {
  loading: boolean;
  product: any | null; // Adjust according to your product data type
  error: string | null;
}

const initialState: ProductState = {
  loading: false,
  product: null,
  error: null
};

export const productCreateReducer = (state = initialState, action: ProductActions): ProductState => {
  switch (action.type) {
    case ProductActionTypes.CREATE_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case ProductActionTypes.CREATE_PRODUCT_SUCCESS:
      return { loading: false, product: action.payload, error: null };
    case ProductActionTypes.CREATE_PRODUCT_FAIL:
      return { loading: false, error: action.payload, product: null };
    case ProductActionTypes.RESET_PRODUCT_STATE:
      return initialState;
    default:
      return state;
  }
};
