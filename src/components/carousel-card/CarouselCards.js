import React from 'react'
import { View } from "react-native"
import Carousel, {Pagination } from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardContent'
import data from './CarouselCardData'

const CarouselCards = () => {
  const [index, setIndex] = React.useState(0)
  const isCarousel = React.useRef(null)

  return (
    <View>
      <Carousel
        layout="default"
        layoutCardOffset={9}
        loop={true}
        ref={isCarousel}
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView={true}
        onSnapToItem={(index) => setIndex(index)}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 7,
          height: 7,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: 'rgba(255, 0, 234, 1)'
        }}
        inactiveDotStyle={{
          backgroundColor: 'rgba(196, 196, 196, 1)'
        }}
        dotContainerStyle={{ marginHorizontal: 5 }}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
        tappableDots={true}
      />
    </View>
  )
}


export default CarouselCards