import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import Header from '../../../src/components/Header/index';
import Button from '../../../src/components/Button/index';
import Feedback from '../../../src/components/Feedback';
import ProductGallery from '../../../src/components/Gallery/ProductGallery/index';
import { Colors } from '../../../src/constants/theme';
import ProductCard from '../../../src/components/Cards/ProductCard/index';
import type { ProductCardProps } from '../../../src/components/Cards/ProductCard/index';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../src/types/types';
import { styles } from './styles';

const { width } = Dimensions.get('window');

const itemData = {
    category: 'Eletrônicos',
    name: 'Smartphone XYZ',
    user: 'João Silva',
    images: [
        'https://t2.tudocdn.net/712032?w=1200&h=1200',
        'https://t2.tudocdn.net/712032?w=1200&h=1200',
        'https://t2.tudocdn.net/712032?w=1200&h=1200',
    ],
    description: 'Este é um smartphone de última geração com todas as funcionalidades que você precisa.',
};

// Itens Relacionados
const itensRelacionados: ProductCardProps[] = [...Array(4)].map((_, i) => ({
    title: `Produto ${i + 1}`,
    image: 'https://media.istockphoto.com/id/1308599972/pt/vetorial/goods-returnable-icon-return-parcel-sign-vector-logo-template.jpg?s=170667a&w=0&k=20&c=dRQwosZycTDbBFHZ3Ec0ARFrKS0dcBgXcZ2PKV3x-RA=',
    description: 'Breve descrição do produto.',
    onPress: () => {},
    status: 'disponivel',
}));

const Item: React.FC = () => {
    const { user } = useAuth();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const cardWidth = (width - 48) / 2;

    // Adicione um estado para controlar se o item está favoritado
    const [isFavorited, setIsFavorited] = useState(false);

    const handleFavoritePress = () => {
        if (!user) {
            navigation.navigate('Login'); 
        } else {
            // Alterna o estado de favorito
            setIsFavorited(!isFavorited);
            // Lógica para favoritar/desfavoritar o item no backend
            console.log('Item favoritado/desfavoritado:', !isFavorited);
        }
    };
    
    const handleTrocarAgoraPress = () => {
        if (user) {
            navigation.navigate('Chat');
        } else {
            navigation.navigate('Login');
        }
    };

    const handlePublishItemPress = () => {
        if (user) {
            navigation.navigate('AddItem');
        } else {
            navigation.navigate('Login');
        }
    };

    return (
        <View style={styles.container}>
            <Header type="page" pageTitle="Detalhes do Produto" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <View style={styles.content}>
                    <TouchableOpacity>
                        <Text style={styles.category}>{itemData.category}</Text>
                    </TouchableOpacity>

                    <Text style={styles.productName}>{itemData.name}</Text>

                    <View style={styles.userContainer}>
                        <Text style={styles.user}>Publicado por: {itemData.user}</Text>
                        <TouchableOpacity onPress={handleFavoritePress}>
                            <Ionicons 
                                // O ícone muda com base no estado 'isFavorited'
                                name={isFavorited ? 'heart' : 'heart-outline'}
                                size={24}
                                // A cor do ícone muda se o usuário estiver logado
                                color={user ? Colors.light.secondary : Colors.light.textSecondary}
                            />
                        </TouchableOpacity>
                    </View>

                    <ProductGallery images={itemData.images.map(uri => ({ uri }))} />

                    <Text style={styles.description}>{itemData.description}</Text>

                    <Feedback
                        type="warning"
                        message="Nunca transfira dinheiro ou se comunique fora do site ou aplicativo."
                    />

                    {/* Produtos relacionados */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Produtos Relacionados</Text>
                        <Text style={styles.sectionSubtitle}>Produtos da mesma categoria</Text>
                        <View style={styles.grid}>
                            {itensRelacionados.map((product, i) => (
                                <ProductCard
                                    key={i}
                                    title={product.title}
                                    image={product.image}
                                    description={product.description}
                                    onPress={() => navigation.navigate('Item', { id: 1})}
                                    status={product.status}
                                    style={{ width: cardWidth }}
                                />
                            ))}
                        </View>
                    </View>

                    {/* Estatísticas + CTA */}
                    <View style={styles.statsBox}>
                        <View style={{ flex: 1, borderRadius: 8, overflow: 'hidden' }}>
                            <ImageBackground
                                source={require('../../../src/assets/background-stats.jpg')}
                                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}
                                resizeMode="cover"
                            >
                                <Text style={styles.statsText}>Já são +3.000 itens trocados pela comunidade!</Text>
                                <Button
                                    title="Publique um item"
                                    onPress={handlePublishItemPress}
                                    variant="primary"
                                />
                            </ImageBackground>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Botão fixo embaixo */}
            <View style={styles.bottomBar}>
                <Button
                    title="Trocar agora"
                    onPress={handleTrocarAgoraPress}
                    variant="primary"
                    style={{ width: '95%', maxWidth: 500 }}
                />
            </View>
        </View>
    );
};


export default Item;