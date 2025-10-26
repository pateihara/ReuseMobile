// screens/UserReview/UserReviewForm/index.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import Header from '../../../src/components/Header';
import Button from '../../../src/components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { submitUserReview } from '../../../src/services/reviews';
import { Colors } from '../../../src/constants/theme';

export default function UserReviewForm() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const defaultUser = route.params?.userName ?? 'Usuário';

  const [userName, setUserName] = useState(defaultUser);
  const [rating, setRating] = useState('5');
  const [location, setLocation] = useState('São Paulo, SP');
  const [comment, setComment] = useState('');

  async function onSubmit() {
    await submitUserReview({
      userName,
      rating: Math.max(0, Math.min(5, Number(rating) || 0)),
      location,
      comment,
      images: [],
    });
    nav.navigate('FeedbackUserReview');
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.light.backgroundPrimary }}>
      <Header type="page" pageTitle="Avaliar usuário" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        <Text>Nome do usuário</Text>
        <TextInput
          value={userName}
          onChangeText={setUserName}
          style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10 }}
        />

        <Text>Nota (0–5)</Text>
        <TextInput
          value={rating}
          onChangeText={setRating}
          keyboardType="numeric"
          style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10 }}
        />

        <Text>Localização</Text>
        <TextInput
          value={location}
          onChangeText={setLocation}
          style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10 }}
        />

        <Text>Comentário</Text>
        <TextInput
          value={comment}
          onChangeText={setComment}
          multiline
          style={{
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 8,
            padding: 10,
            minHeight: 100,
            textAlignVertical: 'top',
          }}
        />

        <Button title="Enviar avaliação" variant="success" onPress={onSubmit} />
      </ScrollView>
    </View>
  );
}
