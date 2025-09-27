import React from 'react';
import { View, Text, Image, ViewStyle, StyleProp, TouchableOpacity } from 'react-native';
import { Colors } from '../../../constants/theme';
import { styles } from './styles';

export interface ProductCardProps {
    id: string;
    title: string;
    image: string;
    description?: string;
    username?: string;
    onPress: () => void;
    status: 'disponivel' | 'negociacao' | 'efetuada' | 'indisponivel';
    style?: StyleProp<ViewStyle>; // Adicione esta linha
}

const ProductCard: React.FC<ProductCardProps> = ({ title, image, description, onPress, status, style, username, id }) => {
    const getStatusLabel = (status: ProductCardProps['status']) => {
        switch (status) {
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
            {username && <Text style={styles.username}>Troca com: {username}</Text>}
            {description ? <Text style={styles.description}>{description}</Text> : null}
            <View style={[styles.statusContainer, { backgroundColor: statusInfo.color }]}>
                <Text style={styles.statusText}>{statusInfo.text}</Text>
            </View>
        </TouchableOpacity>
    );
}


export default ProductCard;
