import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, ImageBackground } from "react-native"

export const SLIDER_WIDTH = Dimensions.get('window').width * 0.9
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1)

const image = require("../../assets/images/amazon_logo.png");
const { height } = Dimensions.get('window');



const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <View style={styles.logo_content}>
        <Image
          source={item.companyLogo()}
        />
        <Text style={styles.desp}>{item.body}</Text>
      </View>
      <View style={styles.circle_content}>
        <View style={[styles.circle, {backgroundColor : item.color}]}>
        </View>
        <Image
          source={item.sideImage()}
        />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 25,
    width: ITEM_WIDTH,
    shadowColor: "#000",
    flexDirection: 'row',
    overflow: 'hidden',
    // marginBottom : 200,
    alignItems : 'center',
    shadowOffet: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  logo_content: {
    width: SLIDER_WIDTH * 0.5,
    paddingLeft: SLIDER_WIDTH * 0.05,
    paddingVertical: height * 0.04,
  },
  desp :{
    marginVertical : 5,
    fontSize : SLIDER_WIDTH * 0.040,
    width: SLIDER_WIDTH * 0.4,
    color : 'black',
    justifyContent : 'center',
  },
  circle_content: {
    width: SLIDER_WIDTH * 0.5,
    alignItems : 'flex-end',
    paddingVertical: height * 0.025,
    paddingRight: SLIDER_WIDTH * 0.06,
    position : 'relative',
    height : height * 0.25,
  },
  circle :{
    position : 'absolute',
    height : height * 0.35,
    width : SLIDER_WIDTH * 0.70,
    top : height * -0.049,
    right : SLIDER_WIDTH * -0.2,
    borderRadius : 300,
    zIndex : 0
  },
})

export default CarouselCardItem