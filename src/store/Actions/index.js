import * as types from './actionType';
import axios from 'axios';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {apiUrl} from '../../config/config';

// Auth Action
export const userSignup = (data, _onSignUpFailed) => async dispatch => {
  console.log('data: ', data);
  try {
    const response = await axios.post(`${apiUrl}/register`, data);
    if (response?.data?.status) {
      dispatch({
        type: types.USER_SIGNUP,
        payload: response?.data?.data,
      });
      console.log('Signuppp Success!!!');
    } else {
      dispatch({
        type: types.ERROR_MODAL,
        payload: {
          msg:
            response?.data?.errors?.email[0] ||
            response?.data?.errors?.phone[0] ||
            'Something went wrong.',
          status: true,
          title: 'Sign-Up Failed!',
        },
      });
      _onSignUpFailed();
    }
  } catch (error) {
    console.log(
      'CATCH ERROR RESPONSE STATUS: ',
      JSON.stringify(error?.response?.data, null, 2),
    );
    _onSignUpFailed();
    dispatch({
      type: types.ERROR_MODAL,
      payload: {
        msg:
          error?.response?.data?.errors?.email[0] ||
          error?.response?.data?.errors?.phone[0] ||
          'Something went wrong',
        status: true,
        title: 'Sign-Up Failed!',
      },
    });
    // console.log(error?.response?.data?.errors?.email[0])
  }
};

export const userLogin = (email, password) => async dispatch => {
  try {
    let data = {
      email: email,
      password: password,
    };
    // console.log('data: ', data);
    const URL = `${apiUrl}/login`;
    const response = await axios.post(URL, data);
    console.log('-----------', response?.data);
    if (response.data.success) {
      // console.log('....');
      dispatch({
        type: types.USER_LOGIN,
        payload: {
          userData: response?.data?.data,
          accessToken: response.data?.data.token,
        },
      });
    } else {
      showMessage({
        message: 'Login Failed!',
        description: 'Invalid Credentials.',
        danger: 'error',
      });
      _onLoginFailed();
    }
  } catch (error) {
    // _onLoginFailed();
    showMessage({
      message: 'Network Failure!',
      description: 'Check Internet Connection.',
      danger: 'error',
    });
    console.log('Network Error', error.message);
  }
};

export const setErrorModal = () => dispatch => {
  try {
    dispatch({
      type: types.ERROR_MODAL,
      payload: {
        msg: '',
        title: '',
        status: false,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const user_logout = () => async dispatch => {
  try {
    dispatch({
      type: types.USER_LOGOUT,
    });
  } catch (error) {
    console.log('Network Error');
  }
};

export const is_walk_thorugh_seen = () => async dispatch => {
  try {
    dispatch({
      type: types.SEEN_WALK_THROUGH,
      payload: {isWalkThroughSeen: true},
    });
  } catch (error) {
    console.log('Network Error');
  }
};

export const getTotalInvestmentAndEarning = (data, token) => async dispatch => {
  try {
    // console.log(data, token);
    const URL = `${apiUrl}/count`;
    // console.log(`${apiUrl}/count`)
    const res = await axios.post(URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    // console.log("RESPOSE: ",res.data)
    if (res.data.success) {
      dispatch({
        type: types.GET_INVEST_EARN,
        payload: res.data.data,
      });
    }
  } catch (error) {
    console.log('Investments and Earnings Fetching Failed: ' + error.message);
    console.log('Investments and Earnings Fetching Failed: ' + error);
  }
};

export const getUserInvoices = (data, token, isAdmin) => async dispatch => {
  try {
    console.log(data, token);
    const URL = `${apiUrl}/getInvoice`;
    const res = await axios.post(URL, isAdmin ? {} : data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    console.log(res.data.data, '===========');
    if (res.data.success) {
      console.log(res.data.data);
      dispatch({
        type: types.GET_INVOICES,
        payload: res.data.data,
      });
    }
  } catch (error) {
    console.log('Invoices Fetching Failed: ' + error.message);
  }
};

export const getInvoicesByEmail = (data, token) => async dispatch => {
  try {
    console.log(data, 'data``````````````````````````````');
    const URL = `${apiUrl}/getInvoiceEmail`;
    const res = await axios.post(URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    console.log(res.data);
    if (res.data.success) {
      console.log(
        res.data.data?.length,
        'INVOICES BY EMAIL ------------------------------------------ length',
      );
      dispatch({
        type: types.GET_INVOICES,
        payload: res.data.data,
      });
    } else {
      console.log('=====================');
      showMessage({
        message: 'No Record Found!',
        // description: 'Invalid Cre÷dentials.',
        danger: 'error',
      });
      dispatch({
        type: types.GET_INVOICES,
        payload: [],
      });
    }
  } catch (error) {
    dispatch({
      type: types.GET_INVOICES,
      payload: [],
    });
    showMessage({
      message: 'Network Failure!',
      // description: 'Invalid Cre÷dentials.',
      danger: 'error',
    });
    console.log('Invoices Fetching Failed By Email: ' + error.message);
    console.log('Invoices Fetching Failed By Email: ' + error);
  }
};

export const getInvoicesByDate = (data, token) => async dispatch => {
  try {
    const URL = `${apiUrl}/getInvoiceFilter`;

    const res = await axios.post(
      URL,
      {start: data.start, end: data.end},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      },
    );
    console.log(res);
    if (res.data.success) {
      console.log(
        res.data.data?.length,
        'events ------------------------------------------ length',
      );
      dispatch({
        type: types.GET_INVOICES,
        payload: res.data.data,
      });
    } else {
      console.log('=====================');
      showMessage({
        message: 'No Record Found!',
        danger: 'error',
      });
      dispatch({
        type: types.GET_INVOICES,
        payload: [],
      });
    }
  } catch (error) {
    dispatch({
      type: types.GET_INVOICES,
      payload: [],
    });
    showMessage({
      message: 'Something went wrong.',
      // description: 'Invalid Cre÷dentials.',
      danger: 'error',
    });
    console.log('Invoices Fetching of Events Failed Catcedddddd: ' + error.message);
  }
};

export const getInvoicesByType = (data, token) => async dispatch => {
  try {
    const URL = `${apiUrl}/getInvoiceType`;
    // console.log(URL);
    const res = await axios.post(URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    console.log(res), '[[[[[[[[[[[[[[[[[[[';
    if (res.data.success) {
      console.log(
        res.data.data?.length,
        'events ------------------------------------------ length',
      );
      dispatch({
        type: types.GET_INVOICES,
        payload: res.data.data,
      });
    } else {
      console.log('=====================');
      showMessage({
        message: 'No Record Found!',
        danger: 'error',
      });
      dispatch({
        type: types.GET_INVOICES,
        payload: [],
      });
    }
  } catch (error) {
    dispatch({
      type: types.GET_INVOICES,
      payload: [],
    });
    showMessage({
      message: 'Network Failure!',
      // description: 'Invalid Cre÷dentials.',
      danger: 'error',
    });
    console.log('Invoices Fetching of Type Failed: ' + error.message);
  }
};

export const getUserProductsArray = (data, token) => async dispatch => {
  try {
    const URL = `${apiUrl}/getUserAgainstType`;
    const res = await axios.post(URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    if (res.data.success) {
      console.log(
        res.data.data?.length,
        'products array ------------------------------------------ length',
      );
      dispatch({
        type: types.GET_USER_PRODUCT_ARRAY,
        payload: res.data.data?.length > 0 ? res.data.data : [],
      });
    } else {
      showMessage({
        message: 'No Record Found!',
        danger: 'error',
      });
      dispatch({
        type: types.GET_USER_PRODUCT_ARRAY,
        payload: [],
      });
    }
  } catch (error) {
    dispatch({
      type: types.GET_USER_PRODUCT_ARRAY,
      payload: [],
    });
    showMessage({
      message: 'Network Failure!',
      // description: 'Invalid Cre÷dentials.',
      danger: 'error',
    });
    console.log('Products array Fetching Failed: ' + error.message);
  }
};

export const getUserProducts = (data, token) => async dispatch => {
  try {
    const URL = `${apiUrl}/getUserAgainstEmail`;
    const res = await axios.post(URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    // console.log(res.data.data)
    if (res.data.success) {
      dispatch({
        type: types.GET_USER_PRODUCTS,
        payload: res.data.data,
      });
    } else {
      showMessage({
        message: 'No Record Found!',
        danger: 'error',
      });
      dispatch({
        type: types.GET_USER_PRODUCTS,
        payload: [],
      });
    }
  } catch (error) {
    dispatch({
      type: types.GET_USER_PRODUCTS,
      payload: [],
    });
    showMessage({
      message: 'Network Failure!',
      danger: 'error',
    });
    console.log('Products Fetching Failed: ' + error.message);
  }
};

export const updateProfile = (data, id, token) => async dispatch => {
  // console.log(data.first_name)
  // console.log(data.last_name)
  // console.log(data.phone)
  console.log(token);
  try {
    // const FormData = require('form-data');
    // let formData = new FormData();

    // formData.append('first_name', 'Super');
    // formData.append('last_name', 'Admin');
    // formData.append('phone', '+9853843747373');
    // formData.append('status', '1');
    // formData.append('image', {
    //   type: 'image/jpeg',
    //   name: 'profilePicture.jpeg',
    //   uri: data.image.path,
    // });
    const apiData = {
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      status: '1',
      image: data.image,
    };

    const URL = `${apiUrl}/updated/${id}`;
    const response = await axios.post(URL, apiData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        // 'Content-Type':
        //   'multipart/form-data; boundary=<calculated when request is sent>',
      },
    });
    console.log('-----------', response?.data);
    if (response.data.success) {
      showMessage({
        message: 'Updated Successfully!',
        type: 'success',
      });
      dispatch({
        type: types.UPDATE_PROFILE,
        payload: {
          first_name: data.first_name,
          last_name: data.last_name,
          phone: data.phone,
          profile_image: data.image,
        },
      });
    } else {
      showMessage({
        message: 'Failed to update!',
        danger: 'error',
      });
    }
  } catch (error) {
    // _onLoginFailed();
    showMessage({
      message: 'Something went wrong.',
      danger: 'error',
    });
    console.log('Network Error', error.message);
    console.log('Network Error', error.response.data);
  }
};
