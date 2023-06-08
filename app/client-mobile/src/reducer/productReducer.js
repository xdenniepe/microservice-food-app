import { getLocalStorageItem } from "../service/helper";

export const initialState = {
  products: getLocalStorageItem('products')
}

export const ADD_PRODUCTS  = 'ADD_PRODUCTS';
export const HIDE_MODAL   = 'HIDE_MODAL';
export const SHOW_MODAL   = 'SHOW_MODAL';

const OrderReducer = (state, action) => {
  switch (action.type) {
    case ADD_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
      case HIDE_MODAL:
        return {
            ...state,
            showModal: action.payload
        };

    case SHOW_MODAL:
        return {
            ...state,
            showModal: action.payload
        };

    default:
      throw new Error(`Unhandled action type:  ${action.type}`);
  }
}

export default OrderReducer;