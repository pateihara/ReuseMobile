import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle, StyleProp, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/theme';

export interface ProductCardProps {
title: string;
image: string;
description: string;
onPress: () => void;
status: 'disponivel' | 'negociacao' | 'efetuada' | 'indisponivel';
style?: StyleProp<ViewStyle>; // Adicione esta linha
}

const ProductCard: React.FC<ProductCardProps> = ({ title, image, description, onPress, status, style }) => {
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
    <TouchableOpacity style={[styles.card, style]} onPress={onPress}>
    <Image source={{ uri: image }} style={styles.image} />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
    <View style={[styles.statusContainer, { backgroundColor: statusInfo.color }]}>
        <Text style={styles.statusText}>{statusInfo.text}</Text>
    </View>
    </TouchableOpacity>
);
}

const styles = StyleSheet.create({
card: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 8,
    padding: 16,
    width: 180, // largura padrão
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
title: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
description: { fontSize: 14, color: Colors.light.textSecondary, marginBottom: 8 },
statusContainer: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 4, alignSelf: 'flex-start' },
statusText: { color: Colors.light.backgroundSecondary, fontSize: 12, fontWeight: 'bold' }
});

export default ProductCard;
