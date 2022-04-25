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
} from 'react-native';
import paidInvoiceData from '../components/invoice-card/paid_invoice_data';
import PaidInvoice from '../components/invoice-card/paid_invoice_card';
import moment from 'moment';
import * as actions from '../store/Actions/index';
import {connect} from 'react-redux';

const image = require('../assets/images/login_bg.png');
const {height, width} = Dimensions.get('window');

const Invoices = ({
  getInvoicesByDate,
  UserReducer,
  getUserInvoices,
  getInvoicesByEmail,getInvoicesByType
}) => {
  const [invoices, setInvoices] = useState([]);
  const [searchText, setSearchText] = useState('super@demo.co');
  const [productType, setProductType] = useState('Amazon');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  );

  const [isLoading, setIsLoading] = useState(false);
  let API_DATA = {
    user_id: UserReducer?.userData?.id,
  };
  const accessToken = UserReducer?.accessToken;

  useEffect(() => {
    getUserInvoices(API_DATA, accessToken);
  }, []);

  useEffect(() => {
    if (UserReducer?.invoices?.length > 0) {
      console.log(UserReducer?.invoices, '.....');
      setInvoices(UserReducer?.invoices);
    }
  }, [UserReducer?.invoices]);

  const _onPressSearch = async () => {
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

  useEffect(() => {
    _onPressTypeSearch();
  }, [productType]);
  return (
    <ImageBackground source={image} resizeMode="cover" style={{flex: 1}}>
      <View>
        {/* <Text style={style.main_title_sec}>
                        Paid Invoices
                    </Text> */}
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
            />
          )}
        </View>
        {/* <Text style={style.main_title_sec}>
                        Pending Invoices
                    </Text>
                    <View style={{ alignItems: 'center' }}>
                        <PaidInvoice
                            data={pendingInvoice}
                        />
                    </View> */}
      </View>
    </ImageBackground>
  );
};

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};

export default connect(mapStateToProps, actions)(Invoices);
