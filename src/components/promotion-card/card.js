import React from 'react';
import {Text, View, Image, TouchableOpacity,Linking} from 'react-native';
import style from './card_style';

const PromotionCard = props => {
  return (
    <TouchableOpacity style={style.promotion_card} onPress={() => {
        Linking.canOpenURL(props?.link).then(supported => {
            if (supported) {
              Linking.openURL(props?.link);
            } else {
              console.log("Don't know how to open URI: " + props?.link);
            }
          });
    }}>
      <Image source={props.img} />
    </TouchableOpacity>
  );
};

export default PromotionCard;
