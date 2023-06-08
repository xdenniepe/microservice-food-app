import { getLocalStorageItem } from "../service/helper";

export const initialState = {
    order   : getLocalStorageItem('order'),
    invoices: getLocalStorageItem('invoices'),
}

export const CREATE_ORDER    = 'CREATE_ORDER';
export const DELETE_ORDER    = 'DELETE_ORDER';
export const DELETE_INVOICES = 'DELETE_INVOICES';
export const UPDATE_INVOICES = 'UPDATE_INVOICES';

const OrderReducer = (state, action) => {
    switch (action.type) {
        case CREATE_ORDER:
            return {
                ...state,
                order: action.payload
            };
        case UPDATE_INVOICES:
            return {
                ...state,
                invoices: action.payload
            };

        case DELETE_INVOICES:
            return {
                ...state,
                invoices: null
            };
        case DELETE_ORDER:
            return {
                ...state,
                order: null
            };

        default:
            throw new Error(`Unhandled action type:  ${action.type}`);
    }
}

export default OrderReducer;