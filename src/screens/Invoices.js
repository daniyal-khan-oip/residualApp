import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import paidInvoiceData from '../components/invoice-card/paid_invoice_data';
import PaidInvoice from '../components/invoice-card/paid_invoice_card';
import moment from 'moment';
import * as actions from '../store/Actions/index';
import {connect} from 'react-redux';
import {themePurple} from '../assets/colors/colors';
import {showMessage, hideMessage} from 'react-native-flash-message';

const image = require('../assets/images/login_bg.png');
const {height, width} = Dimensions.get('window');

const Invoices = ({
  getInvoicesByDate,
  UserReducer,
  getUserInvoices,
  getInvoicesByEmail,
  getInvoicesByType,
}) => {
  const STATUS_BAR_HEIGHT =
    Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
  const [invoices, setInvoices] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [productType, setProductType] = useState('Amazon');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  );
  const isAdmin = UserReducer?.userData?.role_id === 1 ? true : false;
  const [isLoading, setIsLoading] = useState(false);
  let API_DATA = {
    user_id: UserReducer?.userData?.id,
  };
  const accessToken = UserReducer?.accessToken;

  useEffect(() => {
    getUserInvoices(API_DATA, accessToken, isAdmin);
  }, []);

  useEffect(() => {
    if (UserReducer?.invoices?.length > 0) {
      setInvoices(UserReducer?.invoices);
    }
  }, [UserReducer?.invoices]);

  const _onPressSearch = async () => {
    if (searchText.length === 0) {
      showMessage({
        message: 'Search field is empty.',
        danger: 'error',
      });
      return;
    }
    setIsLoading(true);
    let data = {
      email: searchText,
    };
    await getInvoicesByEmail(data, accessToken);
    setIsLoading(false);
  };

  const _onPressDateSearch = async () => {
    setIsLoading(true);
    let data = {
      start: moment(startDate).format('YYYY-MM-DD'),
      end: moment(endDate).format('YYYY-MM-DD'),
    };
    console.log(data);
    await getInvoicesByDate(data, accessToken);
    setIsLoading(false);
  };

  const _onPressTypeSearch = async () => {
    setIsLoading(true);
    let data = {
      type: productType,
    };
    console.log(data);
    await getInvoicesByType(data, accessToken);
    setIsLoading(false);
  };

  const _onPressGetAllInvoices =async () => {
    setIsLoading(true);
    let data = {
      email: UserReducer?.userData?.email,
    };
    await   getUserInvoices(API_DATA, accessToken, isAdmin);
    setIsLoading(false);
  };
  // This useEffect will be used if getting data on type change buttons
  // useEffect(() => {
  //   _onPressTypeSearch();
  // }, [productType]);

  return (
    <ImageBackground source={image} resizeMode="cover" style={{flex: 1}}>
      <View style={{height: STATUS_BAR_HEIGHT, backgroundColor: themePurple}}>
        <StatusBar
          translucent
          backgroundColor={themePurple}
          barStyle="light-content"
        />
      </View>
      <View style={{alignItems: 'center'}}>
        {invoices?.length > 0 && (
          <PaidInvoice
            data={invoices}
            isLoading={isLoading}
            searchText={searchText}
            setSearchText={setSearchText}
            _onPressSearch={_onPressSearch}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            _onPressDateSearch={_onPressDateSearch}
            setProductType={setProductType}
            productType={productType}
            _onPressTypeSearch={_onPressTypeSearch}
            _onPressGetAllInvoices={_onPressGetAllInvoices}
          />
        )}
      </View>
    </ImageBackground>
  );
};

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};

export default connect(mapStateToProps, actions)(Invoices);
