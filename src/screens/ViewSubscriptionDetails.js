import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  StatusBar,
  Platform,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {themePurple} from '../assets/colors/colors';
import moment from 'moment';
import IconComp from '../components/IconComp';
const image = require('../assets/images/login_bg.png');
const {width, height} = Dimensions.get('window');

const ViewSubscriptionDetails = ({route, navigation}) => {
  const ITEM = route?.params?.item;

  const STATUS_BAR_HEIGHT =
    Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
  return (
    <ImageBackground source={image} resizeMode="cover" style={{flex: 1}}>
      <View style={{height: STATUS_BAR_HEIGHT, backgroundColor: themePurple}}>
        <StatusBar
          translucent
          backgroundColor={themePurple}
          barStyle="light-content"
        />
      </View>
      {/* ScrollView  */}
      <ScrollView nestedScrollEnabled={true}>
        {/* Header  */}
        <View style={styles.headerStyle}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              width: width * 0.15,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              navigation.goBack();
            }}>
            <IconComp
              iconName={'arrow-left'}
              type="Feather"
              passedStyle={{color: 'white', fontSize: width * 0.052}}
            />
          </TouchableOpacity>

          <Image
            style={{height: 50, width: 50}}
            source={require('../assets/images/app-logo.png')}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              width: width * 0.15,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              //   onRefresh();
            }}>
            {/* <Image
              style={{
                height: 22,
                width: 22,
                tintColor: 'white',
              }}
              source={require('../assets/images/refresh.png')}
            /> */}
          </TouchableOpacity>
        </View>
        <Text style={styles.main_title}>{`Subscription Request Details`}</Text>

        <View style={styles.cardStyle}>
          <View style={styles.textViewStyle}>
            <Text style={styles.headingStyle}>Customer Name </Text>
            <Text style={styles.valueStyle}>{`${
              ITEM?.customer ? ITEM?.customer : 'No Name'
            }`}</Text>
          </View>

          <View style={styles.textViewStyle}>
            <Text style={styles.headingStyle}>Product</Text>
            <Text style={styles.valueStyle}>{ITEM?.type}</Text>
          </View>

          <View style={styles.textViewStyle}>
            <Text style={styles.headingStyle}>Status</Text>
            <Text style={styles.valueStyle}>
              {ITEM?.Status === null ? 'Inactive' : 'Active'}
            </Text>
          </View>

          <View style={styles.textViewStyle}>
            <Text style={styles.headingStyle}>Date</Text>
            <Text style={styles.valueStyle}>{`${moment(ITEM?.created_at).format(
              'MMM-DD-YYYY',
            )}`}</Text>
          </View>
          <Text style={styles.headingStyle}>Customer Email:</Text>
          <Text style={styles.valueStyle}>{`${ITEM?.email}`}</Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default ViewSubscriptionDetails;

const styles = StyleSheet.create({
  contentContainerStyle: {justifyContent: 'center', alignItems: 'center'},
  btnTextStyle: {
    color: 'white',
    fontSize: width * 0.04,
    fontFamily: 'Poppins-Medium',
  },
  btnStyle: {
    backgroundColor: 'purple',
    borderRadius: width * 0.02,
    paddingVertical: height * 0.007,
    paddingHorizontal: width * 0.02,
    marginRight: width * 0.03,
  },
  cardStyle: {
    width: width * 0.9,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: width * 0.03,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.04,
  },
  flatHeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: width * 0.9,
  },
  main_title: {
    fontSize: width * 0.055,
    color: 'white',
    marginBottom: 25,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginTop: 20,
  },
  main_title_sec: {
    fontSize: width * 0.065,
    color: 'white',
    fontFamily: 'Poppins-Bold',
    flexWrap: 'wrap',
    lineHeight: width * 0.075,
  },
  textViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headingStyle: {
    fontFamily: 'Poppins-Bold',
    color: 'purple',
    fontSize: width * 0.045,
  },
  valueStyle: {
    fontFamily: 'Poppins-Medium',
    fontSize: width * 0.04,
  },
  lottieStyle: {
    height: height * 0.4,
    // width:width * 0.3,
    // marginTop:100,
    position: 'absolute',
    // backgroundColor: 'red',
    // bottom: height * 0.032,
    top: height * 0.14,
    zIndex: 9999,
    // left: width * 0.01,
  },
  main_title: {
    marginVertical: height * 0.05,
    fontSize: width * 0.06,
    color: 'white',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    textTransform: 'capitalize',
    alignSelf: 'center',
    width: width * 0.8,
    // borderWidth: 1,
    paddingHorizontal: width * 0.02,
    // borderColor: 'white',
    borderRadius: width * 0.04,
  },
  headerStyle: {
    flexDirection: 'row',
    width: width,
    marginTop: height * 0.05,
    paddingVertical: height * 0.01,
    paddingBottom: height * 0.03,
    justifyContent: 'space-between',
  },
});
