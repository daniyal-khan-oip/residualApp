import React from "react";
import { Text, View, Image } from 'react-native';
import style from './card_style'



const PromotionCard = (props) => {
    return (
        <View style={style.promotion_card}>
            <Image source={props.img} />
        </View>
    )
}

export default PromotionCard