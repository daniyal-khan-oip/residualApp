import React from 'react';
import { ImageBackground, StyleSheet, Text, View, Dimensions, ScrollView, Image } from 'react-native';

import PromotionCard from '../components/promotion-card/card'

const { height, width } = Dimensions.get('window');

const image = require("../assets/images/login_bg.png");
const promotionImg1 = require("../assets/images/promotion_page/card-1.png");
const promotionImg2 = require("../assets/images/promotion_page/card-2.png");
const promotionImg3 = require("../assets/images/promotion_page/card-3.png");
const promotionImg4 = require("../assets/images/promotion_page/card-4.png");




const Promotion = () => {

    return (
        <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, alignItems: 'center' }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View style={{}}>
                    <Text style={style.main_title}>
                        Promotions
                    </Text>
                    <View>
                        <PromotionCard
                            img={promotionImg1}
                        />
                        <PromotionCard
                            img={promotionImg2}
                        />
                        <PromotionCard
                            img={promotionImg3}
                        />
                        <PromotionCard
                            img={promotionImg4}
                        />
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    )
}

const style = StyleSheet.create({
    main_title: {
        fontSize: width * 0.06,
        color: 'white',
        marginBottom: 25,
        fontFamily: 'Poppins-Bold',
        textAlign: 'center',
        marginTop: 20
    }
});

export default Promotion