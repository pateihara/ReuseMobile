// screens/Home/index.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, ImageBackground } from 'react-native';
import Carousel from '../../src/components/Carousel';
import Header from '../../src/components/Header';
import { Colors } from '../../src/constants/theme';
import ProductCard from '../../src/components/Cards/ProductCard';
import Button from '../../src/components/Button';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import CategoryCard from '../../src/components/Cards/CategoryCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { styles } from './styles';

import type { ProductCardProps } from '../../src/components/Cards/ProductCard';
import type {
  BottomTabParamList,
  AppStackParamList,
  PublicStackParamList,
} from '../../src/types/navigation';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 16px padding em cada lado + 16px gap entre cards

// Tipagem da navegação: Tab + (AppStack e/ou PublicStack)
type TabsNav = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Início'>,
  CompositeNavigationProp<
    NativeStackNavigationProp<AppStackParamList>,
    NativeStackNavigationProp<PublicStackParamList>
  >
>;

const HomePage: React.FC = () => {
  const navigation = useNavigation<TabsNav>();

  // Em Alta
  const productsEmAlta: ProductCardProps[] = [...Array(6)].map((_, i) => ({
    id: `alta-${i}`,
    title: `Produto ${i + 1}`,
    image:
      'https://media.istockphoto.com/id/1308599972/pt/vetorial/goods-returnable-icon-return-parcel-sign-vector-logo-template.jpg?s=170667a&w=0&k=20&c=dRQwosZycTDbBFHZ3Ec0ARFrKS0dcBgXcZ2PKV3x-RA=',
    description: 'Breve descrição do produto.',
    onPress: () => navigation.navigate('Item'), // params opcionais: { id?: string }
    status:
      i % 4 === 0 ? 'disponivel' : i % 4 === 1 ? 'negociacao' : i % 4 === 2 ? 'efetuada' : 'indisponivel',
  }));

  // Perto de você
  const produtosPerto: ProductCardProps[] = [...Array(4)].map((_, i) => ({
    id: `perto-${i}`,
    title: `Produto ${i + 1}`,
    image:
      'https://media.istockphoto.com/id/1308599972/pt/vetorial/goods-returnable-icon-return-parcel-sign-vector-logo-template.jpg?s=170667a&w=0&k=20&c=dRQwosZycTDbBFHZ3Ec0ARFrKS0dcBgXcZ2PKV3x-RA=',
    description: 'Breve descrição do produto.',
    onPress: () => navigation.navigate('Item'),
    status: 'disponivel',
  }));

  const categories = [
    { title: 'Eletrônicos', icon: <MaterialIcons name="devices" size={24} color="#fff" /> },
    { title: 'Roupas', icon: <MaterialIcons name="checkroom" size={24} color="#fff" /> },
    { title: 'Livros', icon: <MaterialIcons name="menu-book" size={24} color="#fff" /> },
    { title: 'Móveis', icon: <MaterialIcons name="weekend" size={24} color="#fff" /> },
    { title: 'Brinquedos', icon: <MaterialIcons name="toys" size={24} color="#fff" /> },
  ];

  return (
    <View style={styles.container}>
      <Header type="home" />

      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
        <Carousel
          images={[
            require('../../src/assets/banner-1.jpg'),
            require('../../src/assets/banner-2.jpg'),
            require('../../src/assets/banner-3.jpg'),
          ]}
        />

        {/* Em Alta */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Em alta</Text>
          <Text style={styles.sectionSubtitle}>Dê uma nova vida aos seus objetos</Text>
          <View style={styles.grid}>
            {productsEmAlta.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                image={product.image}
                description={product.description}
                onPress={product.onPress}
                status={product.status}
                style={{ width: cardWidth }}
              />
            ))}
          </View>
        </View>

        {/* Categorias */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categorias</Text>
          <Text style={styles.sectionSubtitle}>Procure o que precisa por categorias</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            {categories.map((cat, i) => (
              <CategoryCard key={i} title={cat.title} icon={cat.icon} backgroundColor={Colors.light.secondary} />
            ))}
          </ScrollView>
        </View>

        {/* Perto de você */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perto de você</Text>
          <Text style={styles.sectionSubtitle}>Encontre o que precisa na sua vizinhança</Text>
          <View style={styles.grid}>
            {produtosPerto.map((product, i) => (
              <ProductCard
                key={product.id}
                title={product.title}
                image={product.image}
                description={product.description}
                onPress={product.onPress}
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
              source={require('../../src/assets/background-stats.jpg')}
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}
              resizeMode="cover"
            >
              <Text style={styles.statsText}>Já são +3.000 itens trocados pela comunidade!</Text>
              <Button title="Publique um item" onPress={() => navigation.navigate('AddItem')} variant="primary" />
            </ImageBackground>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomePage;
