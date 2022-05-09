import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Button,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  RefreshControl,Platform,StatusBar
} from 'react-native';
import ProductCard from '../components/products-card/card';
import {connect} from 'react-redux';
import * as actions from '../store/Actions/index';
import LottieView from 'lottie-react-native';
import { themePurple } from '../assets/colors/colors';

const image = require('../assets/images/login_bg.png');
const {height, width} = Dimensions.get('window');
const STATUS_BAR_HEIGHT =
    Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const prdctImg1 = require('../assets/images/prdct_1.png');
const prdctImg2 = require('../assets/images/prdct_2.png');
const prdctImg3 = require('../assets/images/prdct_3.png');
const prdctImg4 = require('../assets/images/prdct_4.png');

const Products = ({navigation, getUserProducts, UserReducer}) => {
  const accessToken = UserReducer?.accessToken;
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  useEffect(() => {
    getProductsData();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1500).then(() => {
      setRefreshing(false);
      getProductsData();
    });
  }, []);

  useEffect(() => {
    if (UserReducer?.products?.length > 0) {
      setProducts(UserReducer?.products);
    }
  }, [UserReducer?.products]);

  const getProductsData = async () => {
    let data = {
      email: UserReducer?.userData?.email,
    };
    setIsLoading(true);
    await getUserProducts(data, accessToken);
    setIsLoading(false);
  };
  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={{flex: 1, alignItems: 'center'}}>
      <View style={{height: STATUS_BAR_HEIGHT, backgroundColor: themePurple}}>
        <StatusBar
          translucent
          backgroundColor={themePurple}
          barStyle="light-content"
        />
      </View>
      <View style={{}}>
        <Text style={style.main_title}>My Products</Text>

        {isLoading ? (
          <View
            style={{
              marginTop: height * 0.35,
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
              borderRadius: width * 0.03,
              width: width * 0.63,
            }}>
            <LottieView
              speed={1}
              style={style.lottieStyle}
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
            data={products}
            keyExtractor={item => item?.id?.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({item, index}) => {
              return (
                <ProductCard
                  img={item?.type === 'Amazon' ? prdctImg1 : prdctImg2}
                  msg="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat"
                  title="Your Investment"
                  sales="Total Sales"
                  number={`$${item?.value}`}
                  navigation={navigation}
                  type={item?.type}
                />
              );
            }}
            ListFooterComponent={() => {
              return (
                products?.length === 0 && (
                  <View style={style.notFoundContainer}>
                    <Text style={style.noRecFound}>No Products Found!</Text>
                    <Text style={style.swipeText}>Swipe down to refresh</Text>
                  </View>
                )
              );
            }}
          />
        )}
      </View>
      {/* </ScrollView> */}
    </ImageBackground>
  );
};

const style = StyleSheet.create({
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
    marginTop: height * 0.35,
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
});

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};
export default connect(mapStateToProps, actions)(Products);
