// screens/UserReview/FeedbackUserReview/index.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Image } from 'react-native';
import Header from '../../../src/components/Header';
import Card from '../../../src/components/Cards/Card';
import Button from '../../../src/components/Button';
import { Colors } from '../../../src/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';

import { AppStackParamList } from '../../../src/types/navigation';

type Nav = NativeStackNavigationProp<AppStackParamList, 'FeedbackUserReview'>;

interface ReviewData {
  userName: string;
  images?: string[];
  rating: number;
  location: string;
  comment: string;
}

const FeedbackUserReview: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReview = async () => {
      try {
        const storedReview = await AsyncStorage.getItem('@userReview');
        if (storedReview) {
          setReviewData(JSON.parse(storedReview));
        } else {
          console.warn('Nenhuma avaliação encontrada no AsyncStorage');
        }
      } catch (error) {
        console.error('Erro ao carregar avaliação:', error);
      } finally {
        setLoading(false);
      }
    };

    loadReview();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
        <Text style={{ marginTop: 10, color: Colors.light.textSecondary }}>
          Carregando avaliação...
        </Text>
      </View>
    );
  }

  if (!reviewData) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.title}>Nenhuma avaliação encontrada.</Text>
        <Button
          title="Voltar à tela inicial"
          variant="success"
          onPress={() => navigation.navigate('MainApp', { screen: 'Início' })}
        />
      </View>
    );
  }

  const { userName, rating, location, comment, images } = reviewData;

  return (
    <View style={styles.container}>
      <Header type="page" pageTitle="Avaliação concluída" />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Sua avaliação de usuário foi enviada com sucesso!</Text>
        <Text style={styles.description}>
          Com cada avaliação, a comunidade Re Use fica mais segura e colaborativa.
        </Text>

        <View style={styles.divider} />

        <Card style={styles.card}>
          <Text style={styles.itemName}>Avaliação para {userName}</Text>

          {/* Avaliação em estrelas */}
          <View style={styles.ratingRow}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Ionicons
                key={index}
                name={index < rating ? 'star' : 'star-outline'}
                size={20}
                color={Colors.light.primary}
              />
            ))}
            <Text style={styles.ratingText}>{rating}/5</Text>
          </View>

          {/* Localização */}
          <View style={styles.locationRow}>
            <Ionicons name="location-sharp" size={16} color={Colors.light.textPrimary} />
            <Text style={styles.itemDetail}>{location}</Text>
          </View>

          {/* Imagens da avaliação */}
          {images && images.length > 0 && (
            <ScrollView horizontal style={{ marginVertical: 10 }}>
              {images.map((uri, index) => (
                <Image
                  key={index}
                  source={{ uri }}
                  style={{ width: 100, height: 100, borderRadius: 6, marginRight: 8 }}
                />
              ))}
            </ScrollView>
          )}

          {/* Descrição da avaliação */}
          <Text style={styles.itemDetail}>{comment}</Text>

          {/* Botão de retorno */}
          <View style={styles.buttonsRow}>
            <Button
              title="Voltar à tela inicial"
              variant="success"
              onPress={() => navigation.navigate('MainApp', { screen: 'Início' })}
            />
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

export default FeedbackUserReview;
