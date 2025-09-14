import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Colors } from '../constants/theme'; // ajuste para seu arquivo de cores

export interface ProductCardProps {
title: string;
image: string; // URL ou require() se RN
description: string;
status: 'disponivel' | 'negociacao' | 'efetuada' | 'indisponivel';
}

const ProductCard: React.FC<ProductCardProps> = ({ title, image, description, status }) => {

const getStatusLabel = (status: ProductCardProps['status']) => {
    switch(status) {
    case 'disponivel': return { text: 'Disponível para troca', color: Colors.light.success };
    case 'negociacao': return { text: 'Em negociação', color: Colors.light.attention };
    case 'efetuada': return { text: 'Troca efetuada', color: Colors.light.secondary };
    case 'indisponivel': return { text: 'Não disponível', color: Colors.light.textSecondary };
    default: return { text: '', color: Colors.light.textPrimary };
    }
}

const statusInfo = getStatusLabel(status);

return (
    <View style={styles.card}>
    <Image source={{ uri: image }} style={styles.image} />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
    <View style={[styles.statusContainer, { backgroundColor: statusInfo.color }]}>
        <Text style={styles.statusText}>{statusInfo.text}</Text>
    </View>
    </View>
);
}

const styles = StyleSheet.create({
card: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 8,
    padding: 16,
    width: 180,
    backgroundColor: Colors.light.backgroundSecondary,
    marginBottom: 16
},
image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
    resizeMode: 'cover'
},
title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4
},
description: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 8
},
statusContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start'
},
statusText: {
    color: Colors.light.backgroundSecondary,
    fontSize: 12,
    fontWeight: 'bold'
}
});

export default ProductCard;
