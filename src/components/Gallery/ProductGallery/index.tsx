// src/components/ProductGallery.tsx
import React from 'react';
import { View, ScrollView, Image } from 'react-native';
import { styles } from './styles';

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

export default ProductGallery;
