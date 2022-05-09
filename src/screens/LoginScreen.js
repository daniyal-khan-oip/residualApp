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
  Keyboard,
  Platform,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import * as actions from '../store/Actions/index';
import {showMessage, hideMessage} from 'react-native-flash-message';
import LottieView from 'lottie-react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {themePurple} from '../assets/colors/colors';

const image = require('../assets/images/login_bg.png');
const logo = require('../assets/images/logo.png');

const {height, width} = Dimensions.get('window');
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

// const Login = ({ navigation }) => {
const Login = ({navigation, userLogin}) => {
  const [showPassword, setShowPassword] = useState(true);
  const [userChange, setUserChange] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const _onPressLogin = async () => {
    if (userChange.length == 0 || password.length == 0) {
      showMessage({
        message: 'Fields Left Empty',
        description: 'Enter both fields.',
        error: 'danger',
      });
      return;
    }
    setLoading(true);
    await userLogin(userChange, password, _onLoginFailed);
  };

  const _onLoginFailed = () => {
    setLoading(false);
  };
  return (
    <ImageBackground source={image} resizeMode="cover" style={style.login_bg}>
      <View style={{height: STATUS_BAR_HEIGHT, backgroundColor: themePurple}}>
        <StatusBar
          translucent
          backgroundColor={themePurple}
          barStyle="light-content"
        />
      </View>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        style={{marginTop: height * -0.2}}>
        <Image source={logo} />

        <View style={style.login_detail}>
          <Text style={style.login_text}>Login</Text>
          <Text style={style.welcome_text}>Welcome Back!</Text>
          <View style={style.form_field}>
            <Icon name="user-circle" color="#A557F2" style={style.icon} />
            <TextInput
              placeholder="Username"
              placeholderTextColor="#565B66"
              style={[style.inputfield, {marginBottom: width * 0.04}]}
              onChangeText={e => {
                if (e == ' ') {
                  return;
                }
                setUserChange(e);
              }}
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
              onChangeText={e => {
                if (e == ' ') {
                  return;
                }
                setPassword(e);
              }}
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
          {/* <Text style={style.recover_password}>Recover password</Text> */}
          {loading ? (
            <View style={{marginTop: height * 0.055}}>
             <LinearGradient
             colors={['#7124BC', '#437AD8', '#05F0FF']}
             style={style.button}
             start={{y: 0.0, x: -0.05}}
             angleCenter={{x: 5, y: 0}}
             end={{y: 0.0, x: 1.2}}>
             <Text style={style.loggingIn}>Logging In..</Text>
           </LinearGradient>
           </View>
            // <LottieView
            //   speed={1}
            //   style={style.lottieStyle}
            //   autoPlay
            //   loop
            //   source={require('../assets/lottie/purple-loading-2.json')}
            // />
          ) : (
            <TouchableOpacity
              style={{marginTop: height * 0.055}}
              onPress={() => _onPressLogin()}>
              <LinearGradient
                colors={['#7124BC', '#437AD8', '#05F0FF']}
                style={style.button}
                start={{y: 0.0, x: -0.05}}
                angleCenter={{x: 5, y: 0}}
                end={{y: 0.0, x: 1.2}}>
                <Text style={style.button_text}>Login</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
        <Text style={style.people_first}>
          Putting People First, Profits Second
        </Text>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

const style = StyleSheet.create({
  lottieStyle: {
    height: height * 0.25,
    // backgroundColor: 'red',
    position: 'absolute',
    top: height * 0.155,
    zIndex: 99999,
    left: width * 0.04,
  },
  login_bg: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  logo: {},
  login_detail: {
    // margin: 'auto',
    width: width * 0.8,
  },
  login_text: {
    fontSize: width * 0.08,
    // fontWeight: 'bold',
    color: 'white',
    // marginBottom: 8,
    fontFamily: 'Poppins-Bold',
  },
  welcome_text: {
    fontSize: width * 0.037,
    fontFamily:'Poppins-Bold',
    color: '#ffffff',
    // color: 'red',
    opacity: 0.7,
    marginBottom: 25,
    // fontFamily: 'Poppins-Light',
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
    fontFamily:'Poppins-Bold',
    color: '#ffffff',
    opacity: 0.7,
    marginBottom: 25,
    marginTop: 25,
  },
  people_first: {
    marginTop: height * 0.02,
    fontSize: width * 0.04,
    fontFamily:'Poppins-Italic',
    // fontStyle: 'italic',
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
    fontFamily:'Poppins-Bold',
    color: '#ffffff',
  },
  loggingIn:{
    fontSize: width * 0.045,
    color: '#ffffff',
    fontFamily:'Poppins-Bold'
  }
});

export default connect(null, actions)(Login);
