//screens/UserReview/Form/index.tsx

import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import Button from '../../../src/components/Button';
import { submitUserReview } from '../../../src/services/reviews';
import { useNavigation } from '@react-navigation/native';

export default function UserReviewForm() {
  const nav = useNavigation<any>();
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState('5');
  const [location, setLocation] = useState('');
  const [comment, setComment] = useState('');

  async function onSubmit() {
    await submitUserReview({
      userName,
      rating: Number(rating) || 0,
      location,
      comment,
      images: [],
    });
    nav.navigate('FeedbackUserReview'); // sua tela de confirmação
  }

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text>Nome do usuário</Text>
      <TextInput value={userName} onChangeText={setUserName} style={{ borderWidth: 1, padding: 8 }} />
      <Text>Nota (0–5)</Text>
      <TextInput value={rating} onChangeText={setRating} keyboardType="numeric" style={{ borderWidth: 1, padding: 8 }} />
      <Text>Localização</Text>
      <TextInput value={location} onChangeText={setLocation} style={{ borderWidth: 1, padding: 8 }} />
      <Text>Comentário</Text>
      <TextInput value={comment} onChangeText={setComment} multiline style={{ borderWidth: 1, padding: 8, minHeight: 80 }} />
      <Button title="Enviar avaliação" variant="success" onPress={onSubmit} />
    </View>
  );
}
