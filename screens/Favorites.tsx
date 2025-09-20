import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import Header from '../src/components/Header';
import ProductCard from '../src/components/ProductCard';
import { Colors } from '../src/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../src/types/types';
import type { ProductCardProps } from '../src/components/ProductCard';

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
    // A navegação agora está dentro do componente para ser acessada corretamente
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const renderItem = ({ item }) => (
        <ProductCard
            title={item.title}
            image={item.image}
            status={item.status}
            description={item.description}
            // Passa a função de navegação, que utiliza a navegação do componente pai
            onPress={() => navigation.navigate('Item', { id: item.id })}
            // Garante que o card tenha a largura calculada
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
                // Aplica margem nas colunas, criando o espaçamento correto
                columnWrapperStyle={styles.gridRow}
                ListEmptyComponent={EmptyFavorites}
                contentContainerStyle={mockFavoriteItems.length === 0 ? styles.listEmpty : styles.listContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.backgroundPrimary,
    },
    listContent: {
        paddingHorizontal: cardMargin,
        paddingTop: cardMargin,
    },
    listEmpty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridRow: {
        justifyContent: 'space-between',
        marginBottom: cardMargin,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        color: Colors.light.textPrimary,
    },
    emptySubtitle: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 8,
        color: Colors.light.textSecondary,
    },
});

export default FavoritesScreen;