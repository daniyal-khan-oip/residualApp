import {
  StyleSheet,
  ImageBackground,
  Text,
  FlatList,
  View,
  StatusBar,
  Dimensions,
  Platform,
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
          <Text
            style={{
              color: 'white',
              fontSize: width * 0.055,
              fontFamily: 'Poppins-Bold',
            }}>
            CUSTOMERS
          </Text>
        )}
        ListHeaderComponentStyle={{marginVertical: height * 0.04}}
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
});
