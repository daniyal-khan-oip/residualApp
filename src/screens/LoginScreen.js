import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import * as actions from '../store/Actions/index';

const image = require('../assets/images/login_bg.png');
const logo = require('../assets/images/logo.png');

const {height, width} = Dimensions.get('window');

// const Login = ({ navigation }) => {
const Login = ({navigation, userLogin}) => {
  const [showPassword, setShowPassword] = useState(true);
  const [userChange, setUserChange] = useState('');
  const [password, setPassword] = useState('');

  const _onPressLogin = () => {
    userLogin(userChange, password);
  };
  return (
    <ImageBackground source={image} resizeMode="cover" style={style.login_bg}>
      <View style={style.logo}>
        <Image source={logo} />
      </View>
      <View style={style.login_detail}>
        <Text style={style.login_text}>Login</Text>
        <Text style={style.welcome_text}>Welcome Back!</Text>
        <View style={style.form_field}>
          <Icon name="user-circle" color="#A557F2" style={style.icon} />
          <TextInput
            placeholder="Username"
            placeholderTextColor="#565B66"
            style={[style.inputfield, {marginBottom: width * 0.04}]}
            onChangeText={e => setUserChange(e)}
            value={userChange}
          />
        </View>
        <View style={style.form_field}>
          <Icon name="lock" color="#A557F2" style={style.icon} />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#565B66"
            style={style.inputfield}
            value={password}
            onChangeText={e => setPassword(e)}
            secureTextEntry={showPassword}
          />
          <Icon
            name={showPassword ? 'eye-slash' : 'eye'}
            color="#ABACB3"
            style={style.icon2}
            onPress={() => {
              // alert('You tapped the button!');
              setShowPassword(!showPassword);
            }}
          />
        </View>
        <Text style={style.recover_password}>Recover password</Text>
        <TouchableOpacity
          onPress={
            () =>
              // userChange === 'product'
              _onPressLogin()
            //   ? navigation.navigate('Product')
            //   : userChange === 'promotion'
            //   ? navigation.navigate('Promotion')
            //   : navigation.navigate('Dashboard')
            //   ? navigation.navigate('invoice')
            //   : navigation.navigate('Invoices')
          }>
          <LinearGradient
            colors={['#7124BC', '#437AD8', '#05F0FF']}
            style={style.button}
            start={{y: 0.0, x: -0.05}}
            angleCenter={{x: 5, y: 0}}
            end={{y: 0.0, x: 1.2}}>
            <Text style={style.button_text}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={style.logo}>
        <Text style={style.people_first}>
          Putting People First, Profits Second
        </Text>
      </View>
    </ImageBackground>
  );
};

const style = StyleSheet.create({
  login_bg: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  logo: {},
  login_detail: {
    margin: 'auto',
    width: width * 0.8,
  },
  login_text: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    fontFamily: 'Poppins-Bold',
  },
  welcome_text: {
    fontSize: width * 0.037,
    fontWeight: 'bold',
    color: '#ffffff',
    // color: 'red',
    opacity: 0.7,
    marginBottom: 25,
    fontFamily: 'Poppins-Light',
  },
  form_field: {
    position: 'relative',
    zIndex: 0,
  },
  inputfield: {
    backgroundColor: 'white',
    width: width * 0.8,
    borderRadius: 10,
    paddingLeft: 50,
    height: height * 0.07,
  },
  icon: {
    position: 'absolute',
    fontSize: 20,
    top: height * 0.022,
    left: 10,
    width: 30,
    textAlign: 'center',
    zIndex: 1,
  },
  icon2: {
    position: 'absolute',
    fontSize: 15,
    top: height * 0.026,
    right: 10,
    zIndex: 1,
  },
  recover_password: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#ffffff',
    opacity: 0.7,
    marginBottom: 25,
    marginTop: 25,
  },
  people_first: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#ffffff',
  },
  button: {
    width: width * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    height: height * 0.07,
    color: 'white',
  },
  button_text: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default connect(null, actions)(Login);
