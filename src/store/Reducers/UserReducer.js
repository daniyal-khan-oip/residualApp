import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_SIGNUP,
  UPDATE_USER_DATA,
  SEEN_WALK_THROUGH,
  ERROR_MODAL,
  GET_INVEST_EARN,
  GET_INVOICES,
  GET_USER_PRODUCT_ARRAY,
  GET_CURRENT_LOC,GET_USER_PRODUCTS
} from '../Actions/actionType';

const INITIAL_STATE = {
  isUserLogin: false,
  userData: null,
  totalInvestments: 0,
  totalEarnings: 0,
  accessToken: '',
  invoices: [],
  productsArray: [],
  products: [],
};

export function UserReducer(state = INITIAL_STATE, action) {
  // console.log('Payload: ', action.payload);
  switch (action.type) {
    case USER_SIGNUP:
      return {
        ...state,
        userData: action.payload.userData,
        accessToken: action.payload.accessToken,
        isUserLogin: true,
      };

    case USER_LOGIN:
      return {
        ...state,
        isUserLogin: true,
        ...action.payload,
      };

    case USER_LOGOUT:
      return {
        ...state,
        accessToken: '',
        userData: null,
        isUserLogin: false,
      };

    case UPDATE_USER_DATA:
      console.log('---------------------------');
      console.log(action.payload);
      return {
        ...state,
        userData: {...action.payload},
      };

    case GET_INVEST_EARN:
      return {
        ...state,
        totalInvestments: action.payload.investment,
        totalEarnings: action.payload.earning,
      };

    case GET_INVOICES:
      return {
        ...state,
        invoices: action.payload,
      };

    case GET_USER_PRODUCTS:
      console.log(action.payload,"..................s")
      return {
        ...state,
        products: action.payload,
      };

    case GET_USER_PRODUCT_ARRAY:
      return {
        ...state,
        productsArray: action.payload,
      };
    default:
      return state;
  }
}
