import React from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import Header from '../../src/components/Header/index';
import ProductCard from '../../src/components/Cards/ProductCard/index';
import { Colors } from '../../src/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../src/types/types';
import type { ProductCardProps } from '../../src/components/Cards/ProductCard/index';
import { styles } from './styles';

const { width } = Dimensions.get('window');
// Os mesmos cálculos de largura e margem do HomePage.tsx para manter a consistência
const cardMargin = 8;
const numColumns = 2;
const cardWidth = (width / numColumns) - (cardMargin * 2);

const mockFavoriteItems: ProductCardProps[] = [...Array(6)].map((_, i) => ({
    id: `alta-${i}`,
    title: `Produto Favorito ${i + 1}`,
    image: 'https://media.istockphoto.com/id/1308599972/pt/vetorial/goods-returnable-icon-return-parcel-sign-vector-logo-template.jpg?s=170667a&w=0&k=20&c=dRQwosZycTDbBFHZ3Ec0ARFrKS0dcBgXcZ2PKV3x-RA=',
    description: 'Breve descrição do produto.',
    onPress: () => { /* A navegação será feita pelo componente renderItem */ },
    status:
        i % 4 === 0
            ? 'disponivel'
            : i % 4 === 1
                ? 'negociacao'
                : i % 4 === 2
                    ? 'efetuada'
                    : 'indisponivel',
}));

const FavoritesScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const renderItem = ({ item }) => (
        <ProductCard
            title={item.title}
            image={item.image}
            status={item.status}
            description={item.description}
            onPress={() => navigation.navigate('Item', { id: item.id })}
            style={{ width: cardWidth }}
        />
    );

    const EmptyFavorites = () => (
        <View style={styles.emptyContainer}>
            <Ionicons name="heart-outline" size={80} color={Colors.light.textSecondary} />
            <Text style={styles.emptyText}>Você ainda não favoritou nenhum item.</Text>
            <TouchableOpacity onPress={() => navigation.navigate('MainApp')}>
                <Text style={styles.emptySubtitle}>Explore a página inicial para encontrar algo que te interesse!</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Header type='page' pageTitle="Meus Favoritos" />
            <FlatList
                data={mockFavoriteItems}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={numColumns}
                columnWrapperStyle={styles.gridRow}
                ListEmptyComponent={EmptyFavorites}
                contentContainerStyle={mockFavoriteItems.length === 0 ? styles.listEmpty : styles.listContent}
            />
        </View>
    );
};

export default FavoritesScreen;