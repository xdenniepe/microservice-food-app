import { getLocalStorageItem } from "../service/helper";

export const initialState = {
  user : getLocalStorageItem('user'),
  token: getLocalStorageItem('token')
}

const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user
      };

    case 'LOGOUT':
      return {
        ...state,
        user: undefined,
        token: undefined
      };

    default:
      throw new Error(`Unhandled action type:  ${action.type}`);
  }
}

export default AuthReducer;