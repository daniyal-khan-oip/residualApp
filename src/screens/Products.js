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
} from 'react-native';
import ProductCard from '../components/products-card/card';
import {connect} from 'react-redux';
import * as actions from '../store/Actions/index';

const image = require('../assets/images/login_bg.png');
const {height, width} = Dimensions.get('window');

const prdctImg1 = require('../assets/images/prdct_1.png');
const prdctImg2 = require('../assets/images/prdct_2.png');
const prdctImg3 = require('../assets/images/prdct_3.png');
const prdctImg4 = require('../assets/images/prdct_4.png');

const Products = ({navigation, getUserProducts, UserReducer}) => {
  const accessToken = UserReducer?.accessToken;
  const [products, setProducts] = useState([]);
  useEffect(() => {
    let data = {
      email: UserReducer?.userData?.email,
    };
    getUserProducts(data,accessToken);
  }, []);

  useEffect(() => {
    if (UserReducer?.products?.length > 0) {
      setProducts(UserReducer?.products);
    }
  }, [UserReducer?.products]);


  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={{flex: 1, alignItems: 'center'}}>
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
        > */}
        <View style={{}}>
          <Text style={style.main_title}>My Products</Text>

          <FlatList
            data={products}
            keyExtractor={item => item?.id?.toString()}
            renderItem={({item, index}) => {
              return(
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
          />
        </View>
      {/* </ScrollView> */}
    </ImageBackground>
  );
};

const style = StyleSheet.create({
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
