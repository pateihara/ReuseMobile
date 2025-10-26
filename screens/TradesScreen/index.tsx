// screens/TradesScreen/index.tsx
import React from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import Header from '../../src/components/Header';
import ProductCard from '../../src/components/Cards/ProductCard';
import { Colors } from '../../src/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ListRenderItem } from 'react-native';
import type { ProductCardProps } from '../../src/components/Cards/ProductCard';
import { styles } from './styles';
import { AppStackParamList } from '../../src/types/navigation';

const { width } = Dimensions.get('window');
const cardMargin = 16;
const cardWidth = width - cardMargin * 2;

type TradeItem = ProductCardProps & { id: string };

const mockTradesItems: TradeItem[] = [
  {
    id: 'troca-1',
    title: 'Produto 1',
    image:
      'https://media.istockphoto.com/id/1308599972/pt/vetorial/goods-returnable-icon-return-parcel-sign-vector-logo-template.jpg?s=170667a&w=0&k=20&c=dRQwosZycTDbBFHZ3Ec0ARFrKS0dcBgXcZ2PKV3x-RA=',
    status: 'negociacao',
    username: 'João Silva',
    onPress: () => {},
  },
];

type Nav = NativeStackNavigationProp<AppStackParamList>;

const TradesScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();

  const renderItem: ListRenderItem<TradeItem> = ({ item }) => (
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
      <TouchableOpacity onPress={() => navigation.navigate('MainApp', { screen: 'Início' })}>
        <Text style={styles.emptySubtitle}>Explore a página inicial para iniciar uma troca!</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header type="page" pageTitle="Trocas em Andamento" />
      <FlatList<TradeItem>
        data={mockTradesItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id ?? String(index)} // ✅ sempre string
        numColumns={1}
        ListEmptyComponent={EmptyTrades}
        contentContainerStyle={mockTradesItems.length === 0 ? styles.listEmpty : styles.listContent}
      />
    </View>
  );
};

export default TradesScreen;
