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
const cardMargin = 16;
const cardWidth = width - cardMargin * 2; // largura total da tela menos margin lateral

const mockTradesItems: ProductCardProps[] = [
    {
        id: 'troca-1',
        title: 'Produto 1',
        image: 'https://media.istockphoto.com/id/1308599972/pt/vetorial/goods-returnable-icon-return-parcel-sign-vector-logo-template.jpg?s=170667a&w=0&k=20&c=dRQwosZycTDbBFHZ3Ec0ARFrKS0dcBgXcZ2PKV3x-RA=',
        status: 'negociacao',
        username: 'João Silva',
        onPress: () => { },
    },
    {
        id: 'troca-2',
        title: 'Produto 2',
        image: 'https://media.istockphoto.com/id/1308599972/pt/vetorial/goods-returnable-icon-return-parcel-sign-vector-logo-template.jpg?s=170667a&w=0&k=20&c=dRQwosZycTDbBFHZ3Ec0ARFrKS0dcBgXcZ2PKV3x-RA=',
        status: 'negociacao',
        username: 'Maria Oliveira',
        onPress: () => { },
    },
    {
        id: 'troca-3',
        title: 'Produto 3',
        image: 'https://media.istockphoto.com/id/1308599972/pt/vetorial/goods-returnable-icon-return-parcel-sign-vector-logo-template.jpg?s=170667a&w=0&k=20&c=dRQwosZycTDbBFHZ3Ec0ARFrKS0dcBgXcZ2PKV3x-RA=',
        status: 'negociacao',
        username: 'Carlos Pereira',
        onPress: () => { },
    },
    {
        id: 'troca-4',
        title: 'Produto 4',
        image: 'https://media.istockphoto.com/id/1308599972/pt/vetorial/goods-returnable-icon-return-parcel-sign-vector-logo-template.jpg?s=170667a&w=0&k=20&c=dRQwosZycTDbBFHZ3Ec0ARFrKS0dcBgXcZ2PKV3x-RA=',
        status: 'negociacao',
        username: 'Ana Costa',
        onPress: () => { },
    },
    {
        id: 'troca-5',
        title: 'Produto 5',
        image: 'https://media.istockphoto.com/id/1308599972/pt/vetorial/goods-returnable-icon-return-parcel-sign-vector-logo-template.jpg?s=170667a&w=0&k=20&c=dRQwosZycTDbBFHZ3Ec0ARFrKS0dcBgXcZ2PKV3x-RA=',
        status: 'negociacao',
        username: 'Rafael Souza',
        onPress: () => { },
    },
    {
        id: 'troca-6',
        title: 'Produto 6',
        image: 'https://media.istockphoto.com/id/1308599972/pt/vetorial/goods-returnable-icon-return-parcel-sign-vector-logo-template.jpg?s=170667a&w=0&k=20&c=dRQwosZycTDbBFHZ3Ec0ARFrKS0dcBgXcZ2PKV3x-RA=',
        status: 'negociacao',
        username: 'Fernanda Lima',
        onPress: () => { },
    },
];

const TradesScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const renderItem = ({ item }) => (
        <ProductCard
            id={item.id}
            title={item.title}
            image={item.image}
            status={item.status}
            username={item.username}
            onPress={() => navigation.navigate('Item', { id: item.id })}
            style={{ width: cardWidth, marginHorizontal: cardMargin / 2, marginBottom: cardMargin }}
        />
    );

    const EmptyTrades = () => (
        <View style={styles.emptyContainer}>
            <Ionicons name="swap-horizontal-outline" size={80} color={Colors.light.textSecondary} />
            <Text style={styles.emptyText}>Você ainda não tem trocas em andamento.</Text>
            <TouchableOpacity onPress={() => navigation.navigate('MainApp')}>
                <Text style={styles.emptySubtitle}>Explore a página inicial para iniciar uma troca!</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Header type='page' pageTitle="Trocas em Andamento" />
            <FlatList
                data={mockTradesItems}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={1} // apenas 1 card por linha
                ListEmptyComponent={EmptyTrades}
                contentContainerStyle={mockTradesItems.length === 0 ? styles.listEmpty : styles.listContent}
            />
        </View>
    );
};

export default TradesScreen;