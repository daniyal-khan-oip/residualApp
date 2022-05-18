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
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  RefreshControl,
} from 'react-native';
import * as actions from '../store/Actions/index';
import {connect} from 'react-redux';
import {themePurple} from '../assets/colors/colors';
import {showMessage, hideMessage} from 'react-native-flash-message';
import IconComp from '../components/IconComp';
import Button from '../components/Button';
import Heading from '../components/Heading';
import moment from 'moment';
import LottieView from 'lottie-react-native';
import DatePicker from 'react-native-date-picker';
import colors from '../assets/colors';
import InvoiceMapper from '../components/invoice-card/InvoiceMapper';
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
  const [refreshing, setRefreshing] = useState(false);
  const [productType, setProductType] = useState('Amazon');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  );
  const isAdmin = UserReducer?.userData?.role_id !== 3 ? true : false;
  const [isLoading, setIsLoading] = useState(false);
  let API_DATA = {
    user_id: UserReducer?.userData?.id,
  };
  const accessToken = UserReducer?.accessToken;

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [searchChoice, setSearchChoice] = useState('all');

  useEffect(() => {
    _onPressGetAllInvoices();
  }, []);

  useEffect(() => {
    // if (UserReducer?.invoices?.length) {
    setInvoices(UserReducer?.invoices);
    // }
  }, [UserReducer?.invoices]);

  const _onPressSearch = async () => {
    Keyboard.dismiss();
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
    Keyboard.dismiss();
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
    Keyboard.dismiss();
    setIsLoading(true);
    let data = {
      type: productType,
    };
    console.log(data);
    await getInvoicesByType(data, accessToken);
    setIsLoading(false);
  };

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1500).then(() => {
      setRefreshing(false);
      _onPressGetAllInvoices();
    });
  }, []);

  const _onPressGetAllInvoices = async () => {
    Keyboard.dismiss();
    setIsLoading(true);
    await getUserInvoices(API_DATA, accessToken, isAdmin);
    setIsLoading(false);
  };
  // This useEffect will be used if getting data on type change buttons
  // useEffect(() => {
  //   _onPressTypeSearch();
  // }, [productType]);

  const ButtonsComp = ({item}) => {
    return (
      <Button
        title={item.btnName}
        onBtnPress={() => setSearchChoice(item?.btnChoice)}
        btnStyle={[
          styles.btnStyle,
          searchChoice === item?.btnChoice && {
            backgroundColor: 'orange',
          },
        ]}
        isBgColor={false}
        btnTextStyle={{
          fontFamily: 'Poppins-SemiBold',
          color: 'white',
          fontSize: width * 0.04,
        }}
      />
    );
  };
  const Buttons = [{
    id: 2,
    btnName: 'Get All Invoices',
    btnChoice: 'all',
  },
    {
      id: 1,
      btnName: 'Search By Email',
      btnChoice: 'email',
    },
    
    {
      id: 3,
      btnName: 'Search By Date',
      btnChoice: 'date',
    },
  ];
  return (
    <ImageBackground source={image} resizeMode="cover" style={{flex: 1}}>
      <View style={{height: STATUS_BAR_HEIGHT, backgroundColor: themePurple}}>
        <StatusBar
          translucent
          backgroundColor={themePurple}
          barStyle="light-content"
        />
      </View>
      <ScrollView
        nestedScrollEnabled={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={{alignItems: 'center'}}>
            <>
              <>
                <Text style={styles.main_title}>Invoices</Text>

                <FlatList
                  // ListHeaderComponentStyle={{width: width}}

                  // data={Buttons}
                  data={Buttons}
                  horizontal={true}
                  renderItem={({item, index}) => {
                    console.log(item);
                    return <ButtonsComp item={item} />;
                  }}
                  // ListHeaderComponent={({item}) => {
                  //   return (
                  //     <View style={styles.btnContainers}>
                  //       {UserReducer?.userData?.role_id !== 3 && (
                  //         <>
                  //           <Button
                  //             title="Search By Email"
                  //             onBtnPress={() => setSearchChoice('email')}
                  //             btnStyle={[
                  //               styles.btnStyle,
                  //               searchChoice === 'email' && {
                  //                 backgroundColor: 'orange',
                  //               },
                  //             ]}
                  //             isBgColor={false}
                  //             btnTextStyle={{
                  //               fontFamily: 'Poppins-SemiBold',
                  //               color: 'white',
                  //               fontSize: width * 0.04,
                  //             }}
                  //           />

                  //           <Button
                  //             title="Search By Date"
                  //             onBtnPress={() => setSearchChoice('date')}
                  //             btnStyle={[
                  //               styles.btnStyle,
                  //               {marginLeft: width * 0.04},
                  //               searchChoice === 'date' && {
                  //                 backgroundColor: 'orange',
                  //               },
                  //             ]}
                  //             isBgColor={false}
                  //             btnTextStyle={{
                  //               fontFamily: 'Poppins-SemiBold',
                  //               color: 'white',
                  //               fontSize: width * 0.04,
                  //             }}
                  //           />

                  //           <Button
                  //             title="Get All Invoices"
                  //             onBtnPress={() => {
                  //               setSearchChoice('all');
                  //               _onPressGetAllInvoices();
                  //             }}
                  //             btnStyle={[
                  //               styles.btnStyle,
                  //               {marginLeft: width * 0.04},
                  //               searchChoice === 'all' && {
                  //                 backgroundColor: 'orange',
                  //               },
                  //             ]}
                  //             isBgColor={false}
                  //             btnTextStyle={{
                  //               fontFamily: 'Poppins-SemiBold',
                  //               color: 'white',
                  //               fontSize: width * 0.04,
                  //             }}
                  //           />
                  //         </>
                  //       )}
                  //     </View>
                  //   );
                  // }}
                />

                {searchChoice === 'email' && isAdmin ? (
                  <>
                    <TextInput
                      placeholder="Search by email"
                      value={searchText}
                      style={styles.searchBox}
                      onChangeText={text => setSearchText(text)}
                    />
                  </>
                ) : (
                  searchChoice === 'date' && (
                    <>
                      <View
                        style={[
                          styles.rowView,
                          {justifyContent: 'flex-start'},
                        ]}>
                        <Heading
                          title={'Start Date:'}
                          passedStyle={styles.dateLabel}
                        />
                        <Heading
                          title={'End Date:'}
                          passedStyle={[
                            styles.dateLabel,
                            {marginLeft: width * 0.25},
                          ]}
                        />
                      </View>
                      <View
                        style={[styles.rowView, {marginBottom: height * 0.03}]}>
                        <View style={styles.rowView}>
                          <TouchableOpacity
                            style={styles.datePickerView}
                            activeOpacity={0.7}
                            onPress={() => {
                              setShowStartDatePicker(true);
                            }}>
                            <Heading
                              title={moment(startDate).format('DD-MMM-YYYY')}
                              passedStyle={styles.additionalInfoText}
                            />
                          </TouchableOpacity>
                          <IconComp
                            type="Ionicons"
                            iconName="calendar"
                            passedStyle={styles.eventStyle}
                          />
                        </View>

                        <View style={styles.rowView}>
                          <TouchableOpacity
                            style={styles.datePickerView}
                            activeOpacity={0.7}
                            onPress={() => {
                              setShowEndDatePicker(true);
                            }}>
                            <Heading
                              title={moment(endDate).format('DD-MMM-YYYY')}
                              passedStyle={styles.additionalInfoText}
                            />
                          </TouchableOpacity>
                          <IconComp
                            type="Ionicons"
                            iconName="calendar"
                            passedStyle={styles.eventStyle}
                          />
                        </View>
                      </View>
                    </>
                  )
                )}
                {(searchChoice == 'email' || searchChoice === 'date') &&
                  isAdmin && (
                    <TouchableOpacity
                      onPress={
                        searchChoice === 'email'
                          ? _onPressSearch
                          : _onPressDateSearch
                      }
                      style={styles.btnContainer}>
                      <Text style={styles.btnText}>Search</Text>
                    </TouchableOpacity>
                  )}
              </>
              {isLoading ? (
                <View
                  style={{
                    marginTop: isAdmin ? height * 0.1 : height * 0.28,
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    borderRadius: width * 0.03,
                    width: width * 0.63,
                  }}>
                  <LottieView
                    speed={1}
                    style={styles.lottieStyle}
                    autoPlay
                    loop
                    source={require('../assets/lottie/purple-loading-2.json')}
                  />
                  <Text
                    style={{
                      marginTop: height * -0.15,
                      color: 'white',
                      fontSize: width * 0.07,
                      fontFamily: 'Poppins-Bold',
                    }}>
                    Fetching Data..
                  </Text>
                </View>
              ) : (
                <FlatList
                  data={isLoading ? [] : invoices}
                  renderItem={({item, index}) => (
                    <InvoiceMapper item={item} index={index} />
                  )}
                  nestedScrollEnabled={true}
                  keyExtractor={item => item?.id?.toString()}
                  ListFooterComponent={() => {
                    return (
                      // []?.length === 0 && (
                      invoices?.length === 0 ? (
                        <View
                          style={[
                            styles.notFoundContainer,
                            {marginTop: isAdmin ? height * 0.1 : height * 0.35},
                          ]}>
                          <Text style={styles.noRecFound}>
                            No Invoices Found!
                          </Text>
                          {/* <Text style={styles.swipeText}>Swipe down to refresh</Text> */}
                        </View>
                      ) : (
                        <View style={{marginBottom: 200}} />
                      )
                    );
                  }}
                />
              )}

              {/* Start Date Picker  */}
              <DatePicker
                modal
                mode="date"
                open={showStartDatePicker}
                // minimumDate={startDate}
                date={startDate}
                onConfirm={date => {
                  var tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000);
                  setShowStartDatePicker(false);
                  setStartDate(date);
                  setEndDate(tomorrow);
                }}
                onCancel={() => {
                  setShowStartDatePicker(false);
                }}
              />
              {/* End Date Picker  */}
              <DatePicker
                modal
                mode="date"
                minimumDate={endDate}
                open={showEndDatePicker}
                date={endDate}
                onConfirm={date => {
                  setShowEndDatePicker(false);
                  setEndDate(date);
                }}
                onCancel={() => {
                  setShowEndDatePicker(false);
                }}
              />
            </>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  swipeText: {
    color: 'white',
    fontSize: width * 0.045,
    fontFamily: 'Poppins-Regular',
  },
  noRecFound: {
    color: 'white',
    fontSize: width * 0.05,
    fontFamily: 'Poppins-Bold',
  },
  notFoundContainer: {
    width: width * 0.6,
    height: height * 0.17,
    borderRadius: width * 0.04,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  lottieStyle: {
    height: height * 0.38,
    // backgroundColor: 'red',
    // position: 'absolute',
    // top:100,
    marginTop: height * -0.055,
    // zIndex: 99999,
    // left: width * 0.04,
  },
  btnContainers: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // flexWrap: 'wrap',
    width: width * 0.9,
  },
  btnStyle: {
    backgroundColor: 'purple',
    borderRadius: width * 0.07,
    width: width * 0.43,
    margin: 0,
    borderRadius: 10,
    marginVertical: height * 0.01,
    marginHorizontal: width * 0.02,
  },
  typeBtnStyle: {
    backgroundColor: 'white',
    borderRadius: width * 0.1,
    width: width * 0.35,
    margin: 0,
    // borderRadius: 10,
    marginVertical: height * 0.01,
  },
  // lottieStyle: {
  //   height: height * 0.4,
  //   // width:width * 0.3,
  //   // marginTop:100,
  //   position: 'absolute',
  //   // backgroundColor: 'red',
  //   // bottom: height * 0.032,
  //   top: height * 0.21,
  //   zIndex: 9999,
  //   // left: width * 0.01,
  // },
  main_title: {
    fontSize: width * 0.06,
    color: 'white',
    marginBottom: 30,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginTop: 20,
  },
  eventStyle: {
    color: 'white',
    fontSize: width * 0.07,
    alignSelf: 'center',
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.02,
    // backgroundColor: 'rgba(0,0,0,0.03)',
  },
  main_title_sec: {
    fontSize: width * 0.06,
    color: 'white',
    fontFamily: 'Poppins-Bold',
    flexWrap: 'wrap',
    textAlign: 'left',
    marginBottom: 15,
    paddingLeft: width * 0.1,
  },
  btnContainer: {
    width: width * 0.3,
    height: height * 0.06,
    backgroundColor: '#5BBBF2',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 0.04,
    marginBottom: height * 0.02,
    marginRight: width * 0.05,
  },
  btnText: {
    color: 'white',
    fontSize: width * 0.045,
    alignSelf: 'center',
  },
  searchBox: {
    width: width * 0.9,
    paddingHorizontal: width * 0.03,
    height: height * 0.07,
    backgroundColor: 'white',
    borderRadius: width * 0.03,
    alignSelf: 'center',
    marginVertical: height * 0.02,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  additionalInfoText: {
    color: 'rgba(0,0,0,0.4)',
    fontSize: width * 0.04,
  },
  dateLabel: {
    color: 'white',
    fontSize: width * 0.04,
  },
  datePickerView: {
    // marginVertical: height * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.34,
    borderRadius: width * 0.04,
    borderWidth: 1.2,
    height: height * 0.06,
    backgroundColor: 'white',
    borderColor: colors.themePurple1,
  },
});

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};

export default connect(mapStateToProps, actions)(Invoices);
