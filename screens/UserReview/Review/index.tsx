//screens/UserReview/Review/index.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Header from '../../../src/components/Header';
import Card from '../../../src/components/Cards/Card';
import Button from '../../../src/components/Button';
import { Colors } from '../../../src/constants/theme';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../src/types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Step = {
    title: string;
    question: string;
    description: string;
    type: 'stars' | 'text' | 'camera';
};

const steps: Step[] = [
    { title: 'Passo 1 de 3', question: 'Quantas estrelas o usuário merece?', description: 'Sua avaliação ajuda a comunidade a ser mais segura e confiável.', type: 'stars' },
    { title: 'Passo 2 de 3', question: 'Quer deixar um comentário sobre a troca? (opcional)', description: 'Texto livre, limite de 200 caracteres.', type: 'text' },
    { title: 'Passo 3 de 3', question: 'Adicione fotos do item', description: 'Até 5 imagens, em boa iluminação.', type: 'camera' },
];

const UserReview: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const step = steps[currentStep];

    const pickImage = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão necessária', 'Precisamos da permissão para acessar sua câmera.');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            if (images.length >= 5) {
                Alert.alert('Limite atingido', 'Você pode adicionar no máximo 5 imagens.');
                return;
            }
            setImages([...images, result.assets[0].uri]);
        }
    };

    const handleNext = () => {
        if (currentStep === steps.length - 1) {
            handleSubmit();
        } else {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async () => {
        try {
            const reviewData = {
                userName: 'Mariana', // aqui você pode colocar dinamicamente
                rating,
                comment,
                images,
                location: 'São Paulo – Vila Mariana', // aqui também pode ser dinâmica
            };

            await AsyncStorage.setItem('@userReview', JSON.stringify(reviewData));

            console.log('Avaliação salva:', reviewData);

            navigation.navigate('FeedbackUserReview'); // agora a tela de feedback lê do AsyncStorage
        } catch (error) {
            console.error('Erro ao salvar avaliação:', error);
            Alert.alert('Erro', 'Não foi possível salvar a avaliação.');
        }
    };

    return (
        <View style={styles.container}>
            <Header type="page" pageTitle="Avaliar Usuário" />

            <ScrollView contentContainerStyle={styles.content}>
                <Card style={styles.card}>
                    <Text style={styles.stepTitle}>{step.title}</Text>
                    <Text style={styles.question}>{step.question}</Text>
                    <Text style={styles.description}>{step.description}</Text>

                    {step.type === 'stars' && (
                        <View style={styles.starsContainer}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                                    <Ionicons
                                        name={rating >= star ? 'star' : 'star-outline'}
                                        size={40}
                                        color={Colors.light.primary}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    {step.type === 'text' && (
                        <TextInput
                            style={styles.input}
                            placeholder="Escreva aqui..."
                            maxLength={200}
                            value={comment}
                            onChangeText={setComment}
                            multiline
                        />
                    )}

                    {step.type === 'camera' && (
                        <View style={styles.cameraContainer}>
                            <TouchableOpacity onPress={pickImage} style={styles.cameraButton}>
                                <Ionicons name="camera-outline" size={40} color={Colors.light.primary} />
                                <Text style={styles.cameraButtonText}>Tirar foto</Text>
                            </TouchableOpacity>
                            <View style={styles.imagePreviewContainer}>
                                {images.map((imageUri, index) => (
                                    <Image key={index} source={{ uri: imageUri }} style={styles.imagePreview} />
                                ))}
                            </View>
                        </View>
                    )}
                </Card>
            </ScrollView>

            <View style={styles.footer}>
                {currentStep > 0 && (
                    <Button title="Voltar" variant="secondary" onPress={handleBack} style={styles.footerButton} />
                )}
                <Button
                    title={currentStep === steps.length - 1 ? 'Concluir Avaliação' : 'Continuar'}
                    variant={currentStep === steps.length - 1 ? 'success' : 'primary'}
                    onPress={handleNext}
                    style={styles.footerButton}
                />
            </View>
        </View>
    );
};

export default UserReview;
