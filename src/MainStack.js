import React from 'react';
import Dashboard from './screens/Dasboard';
import Promotion from './screens/promotion';
import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';
import Profile from './screens/Profile';
import Products from './screens/Products';
import Invoices from './screens/Invoices';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import ProductsStack from './ProductsStack';
import {connect} from 'react-redux';
import ProfileStack from './screens/ProfileStack';
import CustomersStack from './screens/CustomersStack';

const Tabs = AnimatedTabBarNavigator();

const MainStack = ({UserReducer}) => {
  return (
    <Tabs.Navigator
      initialRouteName="dashboard"
      tabBarOptions={{
        activeTintColor: 'white',
        tabBarStyle: {
          backgroundColor: 'red',
        },
        activeBackgroundColor: '#7124BC',
      }}
      appearance={{
        tabBarBackground: '#F1F4F7',
      }}>
      <Tabs.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <MaterialCommunityIcons
              name="view-dashboard-outline"
              size={size ? size : 26}
              color={focused ? color : '#A1A2AB'}
              focused={focused}
            />
          ),
        }}
      />
      {UserReducer?.userData?.role_id !== 1 && (
        <Tabs.Screen
          name="Productss"
          component={ProductsStack}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <Feather
                name="box"
                size={size ? size : 26}
                color={focused ? color : '#A1A2AB'}
                focused={focused}
              />
            ),
          }}
        />
      )}
      {UserReducer?.userData?.role_id !== 1 && (
        <Tabs.Screen
          name="Promotions"
          component={Promotion}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <Foundation
                name="clipboard-notes"
                size={size ? size : 26}
                color={focused ? color : '#A1A2AB'}
                focused={focused}
              />
            ),
          }}
        />
      )}

      {UserReducer?.userData?.role_id === 1 && (
        <Tabs.Screen
          name="Customers"
          component={CustomersStack}
          options={({navigation}) => {
            return {
              tabBarIcon: ({focused, color, size}) => (
                <FontAwesome
                  onPress={() =>
                    navigation.navigate('customers', {
                      screen: 'customers',
                      initial: false,
                    })
                  }
                  name="users"
                  size={size ? size : 26}
                  color={focused ? color : '#A1A2AB'}
                  focused={focused}
                />
              ),
            };
          }}
        />
      )}

      <Tabs.Screen
        name="Invoices"
        component={Invoices}
        options={({navigation}) => {
          return {
            tabBarIcon: ({focused, color, size}) => (
              <MaterialCommunityIcons
                name="bell-outline"
                size={size ? size : 26}
                color={focused ? color : '#A1A2AB'}
                focused={focused}
              />
            ),
          };
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <FontAwesome
              name="user-circle-o"
              size={size ? size : 26}
              color={focused ? color : '#A1A2AB'}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};
const mapStateToProps = ({UserReducer}) => {
  return {
    UserReducer,
  };
};
export default connect(mapStateToProps, null)(MainStack);
