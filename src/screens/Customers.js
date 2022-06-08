import {
  StyleSheet,
  ImageBackground,
  Text,
  FlatList,
  View,
  StatusBar,
  Dimensions,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {themePurple} from '../assets/colors/colors';
import {connect} from 'react-redux';
import * as actions from '../store/Actions/index';
import CustomersRender from '../components/CustomersRender';
const image = require('../assets/images/login_bg.png');
const {width, height} = Dimensions?.get('window');

const Customers = ({UserReducer, getCustomers, navigation}) => {
  const STATUS_BAR_HEIGHT =
    Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
  const accessToken = UserReducer?.accessToken;
  const [customers, setCustomers] = useState(UserReducer?.customers);

  useEffect(() => {
    getCustomers(accessToken);
  }, []);

  useEffect(() => {
    setCustomers(UserReducer?.customers);
  }, [UserReducer?.customers]);

  const _onPressCustomer = item => {
    navigation.navigate('customerDetail', {item: item});
  };

  return (
    <ImageBackground source={image} resizeMode="cover" style={{flex: 1}}>
      <View style={{height: STATUS_BAR_HEIGHT, backgroundColor: themePurple}}>
        <StatusBar
          translucent
          backgroundColor={themePurple}
          barStyle="light-content"
        />
      </View>

      <FlatList
        ListHeaderComponent={() => (
          <>
            <View style={[styles.headerStyle]}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  width: width * 0.15,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {navigation.navigate("profile")}}>
                <Image
                  style={{height: 30, width: 30, resizeMode: 'contain'}}
                  source={require('../assets/images/menu.png')}
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
                  onRefresh();
                }}>
                <Image
                  style={{
                    height: 22,
                    width: 22,
                    tintColor: 'white',
                  }}
                  source={require('../assets/images/refresh.png')}
                />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                color: 'white',
                fontSize: width * 0.055,
                fontFamily: 'Poppins-Bold',
                alignSelf: 'center',
                paddingVertical:height * 0.01,
              }}>
              Customers
            </Text>
          </>
        )}
        ListHeaderComponentStyle={{
          // marginVertical: height * 0.04,
          // marginTop: 20,
        }}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        data={customers}
        renderItem={({item, index}) => {
          return (
            item?.role_id === 3 && (
              <CustomersRender
                item={item}
                index={index}
                onPress={_onPressCustomer}
              />
            )
          );
        }}
      />
    </ImageBackground>
  );
};

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};
export default connect(mapStateToProps, actions)(Customers);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerStyle: {
    flexDirection: 'row',
    width: width,
    marginTop: height * 0.05,
    paddingTop: height * 0.01,
    justifyContent: 'space-between',
  },
});
