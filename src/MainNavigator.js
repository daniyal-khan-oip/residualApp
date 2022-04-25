import React, {useState, useEffect} from 'react';
import AuthStack from './AuthStack';
import {connect} from 'react-redux';
import {PermissionsAndroid, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './MainStack';

const MainNavigator = ({UserReducer}) => {
  return (
    <>
      <NavigationContainer>
        {UserReducer?.accessToken ? <MainStack /> : <AuthStack />}
      </NavigationContainer>
    </>
  );
};

const mapStatetoProps = ({UserReducer}) => {
  return {UserReducer};
};

export default connect(mapStatetoProps, null)(MainNavigator);
