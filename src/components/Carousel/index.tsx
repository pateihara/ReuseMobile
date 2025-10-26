// src/components/Carousel/index.tsx
import React from 'react';
import { Image, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { styles } from './styles'

interface CarouselProps {
    images: any[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
return (
    <View style={styles.carouselWrapper}>
    <Swiper
        autoplay
        autoplayTimeout={3}
        loop
        showsPagination
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
    >
        {images.map((img: any, index: number) => (
        <Image key={index} source={img} style={styles.bannerImage} />
        ))}
    </Swiper>
    </View>
);
};

export default Carousel;
