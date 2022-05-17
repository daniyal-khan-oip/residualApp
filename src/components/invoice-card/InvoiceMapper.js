import React, {useState} from 'react';
import {Text, StyleSheet, View, Dimensions} from 'react-native';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
const {height, width} = Dimensions.get('window');

const InvoiceMapper = ({item, index}) => {
  return (
    <View key={index}>
      <LinearGradient
        colors={['#7124BC', '#437AD8', '#05F0FF']}
        style={style.gradient_btn}
        start={{y: 0.0, x: 0.001}}
        angleCenter={{x: 5, y: 0}}
        end={{y: 0.0, x: 1.1}}>
        {/* <MaterialIcon
            name={
              item.status === 'paid' ? 'arrow-top-right' : 'arrow-bottom-right'
            }
            style={style.icon}
            color={item.status === 'paid' ? '#5FB971' : '#D50101'}
          /> */}
        <View style={style.titles_view}>
          <Text style={style.main_title}>{item?.type}</Text>
          <Text style={style.sub_title}>
            {moment(item?.date).format('MMMM-DD-yyy')}
          </Text>
        </View>
        <Text style={style.main_title}>{`$${item?.amount?.toFixed(2)}`}</Text>
      </LinearGradient>
    </View>
  );
};
export default InvoiceMapper;

const style = StyleSheet.create({
  gradient_btn: {
    width: width * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: width * 0.05,
    borderRadius: 25,
    paddingHorizontal: width * 0.05,
    paddingVertical: width * 0.045,
  },
  titles_view: {
    flex: 1,
    paddingLeft: width * 0.03,
  },
  main_title: {
    fontSize: width * 0.04,
    textTransform: 'uppercase',
    color: '#fff',
    fontFamily: 'Poppins-Bold',
  },
  sub_title: {
    fontSize: width * 0.035,
    color: '#fff',
    marginTop: width * 0.001,
    fontFamily: 'Poppins-Bold',
  },
});
