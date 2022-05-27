import * as types from './actionType';
import axios from 'axios';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {apiUrl} from '../../config/config';

// Auth Action

export const userLogin =
  (email, password, _onLoginFailed) => async dispatch => {
    try {
      let data = {
        email: email,
        password: password,
      };
      // console.log('data: ', data);
      const URL = `${apiUrl}/login`;
      console.log(URL);
      const response = await axios.post(URL, data);
      // console.log('-----------', response?.data);
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
      _onLoginFailed();
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

export const getUserInvoices =
  (data, token, isAdmin, pageNo) => async dispatch => {
    try {
      // console.log(data, token);
      const URL = `${apiUrl}/getInvoice?page=${pageNo}`;
      const res = await axios.post(URL, isAdmin ? {} : data, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      // console.log(res.data.data, '===========');
      if (res.data.success) {
        const arrayy = res.data.data.data;
        // console.log(JSON.stringify(arrayy,null,2),"-----------------");
        dispatch({
          type: types.GET_INVOICES,
          payload: {
            array: arrayy,
            last_page: res.data.data.last_page,
          },
        });
      }
    } catch (error) {
      console.log('Invoices Fetching Failed: ' + error.message);
    }
  };

export const getInvoicesByEmail = (data, token) => async dispatch => {
  try {
    const URL = `${apiUrl}/getInvoiceEmail`;
    const res = await axios.post(URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    // console.log(res.data);
    if (res.data.success) {
      dispatch({
        type: types.GET_INVOICES,
        payload: {
          array: res.data.data,
          invoiceLastPage: 0,
        },
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

    if (res.data.success) {
      dispatch({
        type: types.GET_INVOICES,
        payload: {
          array: res.data.data,
          invoiceLastPage: 0,
        },
      });
    } else {
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
    console.log(
      'Invoices Fetching of Events Failed Catcedddddd: ' + error.message,
    );
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

export const updateProfile =
  (data, id, token, onSuccess, _onFailed) => async dispatch => {
    // console.log(data.first_name)
    // console.log(data.last_name)
    // console.log(data.phone)
    // console.log(token);
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

      const URL = `${apiUrl}/update/${id}`;
      const response = await axios.post(URL, apiData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          // 'Content-Type':
          //   'multipart/form-data; boundary=<calculated when request is sent>',
        },
      });
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
        onSuccess();
      } else {
        _onFailed();
        showMessage({
          message: 'Failed to update!',
          danger: 'error',
        });
      }
    } catch (error) {
      // _onLoginFailed();
      _onFailed();
      showMessage({
        message: 'Something went wrong.',
        danger: 'error',
      });
      console.log('Network Error', error.message);
      console.log('Network Error', error.response.data);
    }
  };

export const getCustomers = token => async dispatch => {
  try {
    const URL = `${apiUrl}/getCustomersForReactNative`;
    const res = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    if (res.data.success) {
      console.log('fetched');

      dispatch({
        type: types.GET_CUSTOMERS,
        // payload: res.data.data.filter(ele => {
        //   console.log(ele.role_id,": role_id")
        //   ele?.role_id == 3;
        // }),
        payload: res.data.data,
      });
    }
  } catch (error) {
    console.log('Customers Fetching Failed: ' + error.message);
  }
};

export const changePassword =
  (data, onSuccess, accessToken) => async dispatch => {
    console.log(accessToken);
    console.log(`${apiUrl}/api/password-change`);
    try {
      const response = await axios.post(`${apiUrl}/password-change`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data.success);
      if (response.data.success) {
        showMessage({
          message: 'Password Changed!',
          type: 'success',
          // description: 'Can not change password at the moment, try again.',
          // danger: 'error',
        });

        onSuccess();
      } else {
        showMessage({
          message: 'Oh Snap!',
          description: 'Can not change password at the moment, try again.',
          type: 'danger',
        });
      }
    } catch (error) {
      showMessage({
        message: 'Oh Snap!',
        description: 'Can not change password at the moment, try again.',
        type: 'danger',
      });
      console.log('FAILED Changin Password.', error.response.data);
    }
  };
