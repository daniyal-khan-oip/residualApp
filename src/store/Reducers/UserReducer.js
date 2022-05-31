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
  GET_CURRENT_LOC,
  GET_USER_PRODUCTS,
  UPDATE_PROFILE,
  GET_CUSTOMERS,
  GET_INVOICES_BY_EMAIL,
  GET_CREDENTIALS,
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
  totalAmazon: 0,
  totalWalmart: 0,
  customers: [],
  invoiceLastPage: 0,
  credentials: null,
};

export function UserReducer(state = INITIAL_STATE, action) {
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
        isUserLogin: false,
        userData: null,
        totalInvestments: 0,
        totalEarnings: 0,
        accessToken: '',
        invoices: [],
        productsArray: [],
        products: [],
        totalAmazon: 0,
        totalWalmart: 0,
        customers: [],
      };

    case UPDATE_USER_DATA:
      return {
        ...state,
        userData: {...action.payload},
      };

    case GET_INVEST_EARN:
      return {
        ...state,
        totalInvestments: action.payload.investment,
        totalEarnings: action.payload.earning,
        totalAmazon: action.payload.amazone_investment,
        totalWalmart: action.payload.wallmart,
      };

    case GET_INVOICES:
      return {
        ...state,
        invoices: action.payload.array,
        invoiceLastPage: action.payload.last_page,
      };

    case GET_USER_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    case GET_USER_PRODUCT_ARRAY:
      return {
        ...state,
        productsArray: action.payload,
      };

    case UPDATE_PROFILE:
      return {
        ...state,
        userData: {
          ...state.userData,
          ...action.payload,
        },
      };

    case GET_CUSTOMERS:
      return {
        ...state,
        customers: action.payload,
      };

    case GET_CREDENTIALS:
      return {
        ...state,
        credentials: action.payload,
      };

    default:
      return state;
  }
}
