// screens/Favorites/index.tsx
import React from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import Header from '../../src/components/Header';
import ProductCard from '../../src/components/Cards/ProductCard';
import { Colors } from '../../src/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { ListRenderItem } from 'react-native';
import type { ProductCardProps } from '../../src/components/Cards/ProductCard';
import { styles } from './styles';

import { AppStackParamList, BottomTabParamList } from '../../src/types/navigation';

const { width } = Dimensions.get('window');
const cardMargin = 8;
const numColumns = 2;
const cardWidth = width / numColumns - cardMargin * 2;

// Para garantir id obrigatório na lista e evitar erro no keyExtractor
type FavoriteItem = ProductCardProps & { id: string };

const mockFavoriteItems: FavoriteItem[] = [...Array(6)].map((_, i) => ({
  id: `alta-${i}`,
  title: `Produto Favorito ${i + 1}`,
  image:
    'https://media.istockphoto.com/id/1308599972/pt/vetorial/goods-returnable-icon-return-parcel-sign-vector-logo-template.jpg?s=170667a&w=0&k=20&c=dRQwosZycTDbBFHZ3Ec0ARFrKS0dcBgXcZ2PKV3x-RA=',
  description: 'Breve descrição do produto.',
  onPress: () => {},
  status:
    i % 4 === 0
      ? 'disponivel'
      : i % 4 === 1
      ? 'negociacao'
      : i % 4 === 2
      ? 'efetuada'
      : 'indisponivel',
}));

// Navegação: estamos dentro de uma Tab, mas vamos navegar para rotas do AppStack (Item, MainApp)
type Nav = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Favoritos'>,
  NativeStackNavigationProp<AppStackParamList>
>;

const FavoritesScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();

  const renderItem: ListRenderItem<FavoriteItem> = ({ item }) => (
    <ProductCard
      id={item.id}
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
      <TouchableOpacity onPress={() => navigation.navigate('MainApp', { screen: 'Início' })}>
        <Text style={styles.emptySubtitle}>
          Explore a página inicial para encontrar algo que te interesse!
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header type="page" pageTitle="Meus Favoritos" />
      <FlatList<FavoriteItem>
        data={mockFavoriteItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id ?? String(index)}
        numColumns={numColumns}
        columnWrapperStyle={styles.gridRow}
        ListEmptyComponent={EmptyFavorites}
        contentContainerStyle={
          mockFavoriteItems.length === 0 ? styles.listEmpty : styles.listContent
        }
      />
    </View>
  );
};

export default FavoritesScreen;
