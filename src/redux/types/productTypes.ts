export enum ProductActionTypes {
  CREATE_PRODUCT_REQUEST = 'CREATE_PRODUCT_REQUEST',
  CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS',
  CREATE_PRODUCT_FAIL = 'CREATE_PRODUCT_FAIL',
  RESET_PRODUCT_STATE = 'RESET_PRODUCT_STATE'
}

export interface CreateProductRequestAction {
  type: ProductActionTypes.CREATE_PRODUCT_REQUEST;
}

export interface CreateProductSuccessAction {
  type: ProductActionTypes.CREATE_PRODUCT_SUCCESS;
  payload: any;
}

export interface CreateProductFailAction {
  type: ProductActionTypes.CREATE_PRODUCT_FAIL;
  payload: string;
}
export interface ResetProductStateAction {
  type: ProductActionTypes.RESET_PRODUCT_STATE;
}

export type ProductActions =
  | CreateProductRequestAction
  | CreateProductSuccessAction
  | CreateProductFailAction
  | ResetProductStateAction;
