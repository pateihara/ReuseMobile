// src/components/Carousel.tsx
import React from 'react';
import { StyleSheet, Dimensions, Image, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { Colors } from '../constants/theme';

const { width } = Dimensions.get('window');

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

const styles = StyleSheet.create({
carouselWrapper: {
    width: width - 32,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'center',
    marginVertical: 16,
},
bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
},
dot: {
    backgroundColor: Colors.light.backgroundPrimary,
    width: 6,
    height: 6,
    borderRadius: 100,
    marginHorizontal: 3,
},
activeDot: {
    backgroundColor: Colors.light.secondary,
    width: 8,
    height: 8,
    borderRadius: 100,
    marginHorizontal: 3,
},
});

export default Carousel;
