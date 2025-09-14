// src/components/ProductGallery.tsx
import React from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../constants/theme';

const { width } = Dimensions.get('window');

interface ProductGalleryProps {
images: any[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
return (
    <View style={styles.galleryWrapper}>
    <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
    >
        {images.map((img, index) => (
        <Image key={index} source={img} style={styles.image} />
        ))}
    </ScrollView>
    </View>
);
};

const styles = StyleSheet.create({
galleryWrapper: {
    marginVertical: 16,
},
scrollContent: {
    paddingHorizontal: 1,
},
image: {
    width: width * 0.8, // imagem maior
    height: width * 1, // deixa quadrada, mas pode ajustar
    borderRadius: 5,
    resizeMode: 'cover',
    marginRight: 16,
},
});

export default ProductGallery;
